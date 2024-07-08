import Signup from "./component/Signup"
import AboutUs from "./Course/AboutUs"
import ContactUs from "./Course/ContactUs"
import Courses from "./Course/Courses"
import Home from "./Course/Home"
import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import { useAuth } from "./context/authProvider"
import ForgotPassword from "./component/ForgetPassword"
import ResetPassword from "./component/ResetPassword"

const App = () => {
  const [authUser, setAuthUser] = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={authUser ? <Courses /> : <Navigate to="/signup" />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
