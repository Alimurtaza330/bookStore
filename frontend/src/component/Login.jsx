import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from 'react-hot-toast';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const userInfo = {
                email: data.email,
                password: data.password
            };
            const res = await axios.post('http://localhost:8001/user/login', userInfo);
            console.log(res);
            if (res.data) {
                toast.success('Successfully logged In!');
                window.location.reload();
            }
            localStorage.setItem('user', JSON.stringify(res.data.user));
        } catch (err) {
            toast.error('Error! ' + "Please check your email or password or verify your email");
        }
    };

    return (
        <>
            <dialog id="my_modal_1" className="modal">
                <div className="py-6 flex flex-col justify-center sm:py-12 min-h-screen">
                    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
                                <div>
                                    <h1 className="text-2xl font-semibold">Login</h1>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div className="relative">
                                            <input
                                                {...register("email", { required: true })}
                                                autoComplete="off"
                                                id="email"
                                                name="email"
                                                type="email"
                                                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                                placeholder="Email address"
                                            />
                                            {errors.email && (
                                                <p role="alert" className="text-red-500 text-sm mt-1">
                                                    This field is required
                                                </p>
                                            )}
                                            <label
                                                htmlFor="email"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                Email Address
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                {...register("password", { required: true })}
                                                autoComplete="off"
                                                id="password"
                                                name="password"
                                                type="password"
                                                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                                placeholder="Password"
                                            />
                                            {errors.password && (
                                                <p role="alert" className="text-red-500 text-sm mt-1">
                                                    This field is required
                                                </p>
                                            )}
                                            <label
                                                htmlFor="password"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                Password
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <button type="submit" className="bg-cyan-500 text-white rounded-md px-2 py-1">
                                                Login
                                            </button>
                                            <Link to="/signup" className="bg-cyan-500 text-white rounded-md px-2 py-1 ml-5">
                                                Signup
                                            </Link>
                                        </div>
                                        <div className="relative mt-4">
                                            <Link to="/forgot-password" className="text-cyan-500">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Login;
