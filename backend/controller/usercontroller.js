import User from "../model/userScheme.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const Port = process.env.GMAIL_PORT;
const gmail = process.env.GMAIL;
const gmailPassword = process.env.GMAIL_PASSWORD;
const gmailHost = process.env.HOST;
const secretKey=process.env.JWTSECRETKEY

// Verify email

const verifyEmail = async (name, email, user_id) => {
    try {
        const transporter = nodemailer.createTransport({
            host: gmailHost,
            port: Port,
            secure: false,
            requireTLS: true,
            auth: {
                user: gmail,
                pass: gmailPassword
            }
        });

        const mailOptions = {
            from: gmail,
            to: email,
            subject: "Verification Mail",
            html: `<p>Hello ${name},</p><p>Please verify your email using the following link:</p><a href="http://localhost:8001/user/verify?user_id=${user_id}">Verify Email</a>`
        };

        await transporter.sendMail(mailOptions);
        console.log("Email has been sent successfully");
    } catch (error) {
        console.error(error.message);
        throw new Error("Failed to send verification email");
    }
};

export const verifyYourMail = async (req, res) => {
    try {
        const updateWithVerif = await User.updateOne({ _id: req.query.user_id }, { $set: { is_verified: 1 } });
        res.status(200).json({ message: "Verification Complete" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User with this email does not exist" });
        }
        
        if (!user.is_verified) {
            return res.status(400).json({ message: "Email is not verified" });
        }

        const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '1d' });

        const transporter = nodemailer.createTransport({
            host: gmailHost,
            port: Port,
            secure: false,
            requireTLS: true,
            auth: {
                user: gmail,
                pass: gmailPassword
            }
        });

        const mailOptions = {
            from: gmail,
            to: email,
            subject: "Password Reset",
            html: `<p>Hi ${user.username},</p><p>Please use the following link to reset your password:</p><a href="http://localhost:8001/user/reset-password?token=${token}">Reset Password</a>`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Password reset link has been sent to your email" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const decoded = jwt.verify(token, secretKey);

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.updateOne({ _id: decoded._id }, { $set: { password: hashedPassword } });

        res.status(200).json({ message: "Password has been reset successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Sign Up 
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already in use" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword, is_verified: 0 });
            await newUser.save();
            res.status(201).json({
                message: "Signup successful! Please verify your email",
                user: {
                    _id: newUser._id,
                    email: newUser.email,
                    is_verified: newUser.is_verified
                }
            });
            if (newUser) {
                verifyEmail(req.body.username, req.body.email, newUser._id).catch(error => console.error(error.message));
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        if (!user.is_verified) {
            return res.status(400).json({ message: "Please verify your email to log in" });
        }
        res.status(200).json({
            message: "Login Successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};
