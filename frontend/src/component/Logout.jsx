import toast from "react-hot-toast";
import { useAuth } from "../context/authProvider"


const Logout = () => {
    const [authUser,setAuthUser]=useAuth();
    const logout=()=>{
        try {
            setAuthUser({
                ...authUser,
                user:null
            })
            localStorage.removeItem('user');
            toast.success("User logged out successfully")
            window.location.reload()
        } catch (error) {
            toast.error("User logout failed", error.message)
        }
    }
  return (
    <>
     <button className="text-white bg-red-600 px-3 py-2 rounded-md cursor-pointer ml-3" onClick={logout}>Logout</button> 
    </>
  )
}

export default Logout
