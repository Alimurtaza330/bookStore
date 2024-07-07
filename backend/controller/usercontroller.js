import User from "../model/userScheme.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import randomString from "randomstring";
dotenv.config();

const Port = process.env.GMAIL_PORT;
const gmail = process.env.GMAIL;
const gmailPassword = process.env.GMAIL_PASSWORD;
const gmailHost = process.env.HOST;


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
