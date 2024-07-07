import { useAuth } from "../context/authProvider"
import Login from "./Login"
import Logout from "./Logout"
const Navbar = () => {
    const [authUser, setAuthUser] = useAuth()
    console.log(authUser)

    return (
        <>
            <div className="navbar bg-zinc-400  container max-w-screen-2xl mx-auto md:px-20 px-4 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-zinc-400 rounded-box z-[1] mt-3 w-52 p-2 shadow font-bold">
                            <li><a href="/">Home</a></li>
                            <li><a href="/course">Course</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/about">About</a></li>
                        </ul>
                    </div>
                    <a className="text-xl font-mono cursor-pointer">BookStore</a>
                </div>
                <div className='navbar-end'>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="text-lg font-bold font-mono menu menu-horizontal px-1">
                            <li><a href="/">Home</a></li>
                            <li><a href="/course">Course</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/about">About</a></li>
                        </ul>
                    </div>
                    <div className='hidden md:block'>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                    </div>

                    {
                        authUser ? <Logout /> : <div><a className="btn bg-black text-white border-none ml-3" onClick={() => document.getElementById('my_modal_1').showModal()}>Login</a>
                            <Login /></div>
                    }

                </div>
            </div>
        </>
    )
}

export default Navbar

