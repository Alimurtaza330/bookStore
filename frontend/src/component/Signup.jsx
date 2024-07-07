import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from 'react-hot-toast';
const Signup = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const userInfo = {
            username: data.username,
            email: data.email,
            password: data.password
        };

        try {
            const res = await axios.post('http://localhost:8001/user/signup', userInfo);
            console.log(res);
            if (res.data) {
                toast.success('Successfully Signup!');
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/')
                window.location.reload()
            }
        } catch (err) {
            toast.error('Error!'+err);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-zinc-400 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Signup</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input {...register("username", { required: "Username is required", maxLength: { value: 20, message: "Username must be less than 20 characters" } })} autoComplete="off" id="username" name="username" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Username" />
                                        {errors.username && <p role="alert" className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                                        <label htmlFor="username" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                                    </div>
                                    <div className="relative">
                                        <input {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }, maxLength: { value: 50, message: "Email must be less than 50 characters" } })} autoComplete="off" id="email" name="email" type="email" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Email address" />
                                        {errors.email && <p role="alert" className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                        <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                    </div>
                                    <div className="relative">
                                        <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" }, maxLength: { value: 20, message: "Password must be less than 20 characters" } })} autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600" placeholder="Password" />
                                        {errors.password && <p role="alert" className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div className="relative">
                                        <button type="submit" className="bg-cyan-500 text-white rounded-md px-2 py-1">Signup</button>
                                        <Link className="bg-cyan-500 text-white rounded-md px-2 py-1 ml-5" to="/">Login</Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
