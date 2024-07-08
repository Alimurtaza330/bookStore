import { useForm } from "react-hook-form";
import axios from "axios";
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const onSubmit = async (data) => {
        try {
            if (!token) {
                throw new Error("Token not found");
            }

            const response = await axios.post('http://localhost:8001/user/reset-password', {
                token,
                newPassword: data.newPassword
            });

            toast.success(response.data.message);
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            toast.error(`Error! ${errorMessage}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <h2 className="text-center text-2xl font-semibold">Reset Password</h2>
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                {...register("newPassword", { required: true })}
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                placeholder="Enter your new password"
                            />
                            {errors.newPassword && <p className="mt-2 text-sm text-red-600">This field is required</p>}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
