import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import signupImg from "../assets/images/signupImg.png";
import { Link } from "react-router-dom";
import { setCredentials } from "../slices/userAuthSlice.js";
import {toast} from 'react-toastify';
import { useDispatch,useSelector} from 'react-redux';
import { BASE_URL } from "../config.js";
// import Loader from "../components/Loader/Loader.jsx";
const Signup = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const formData = {
    name,
    email,
    mobile,
    password,
    confirmPassword
  }
  console.log(email);

  const dispatch = useDispatch();
const navigate = useNavigate();


const {userInfo} = useSelector((state) => state.auth);

 useEffect(() => {
   if (userInfo) {
     navigate('/home');
   }
 }, [navigate, userInfo]);


 const handleSubmit = async (e) => {
   e.preventDefault();
   if (
     !name.trim() ||
     !email.trim() ||
     !mobile ||
     !password ||
     !confirmPassword
   ) {
     toast.error("All fields are required");
     return;
   }

   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if (!emailRegex.test(email)) {
     toast.error("Invalid email format");
     return;
   }

   if (password.length < 6) {
     toast.error("Password must be at least 6 characters long");
     return;
   }

   if (password.trim() !== confirmPassword.trim()) {
     toast.error("Passwords do not match");
     return; // Added this return statement
   }

   try {
     const res = await fetch(`${BASE_URL}/register`, {
       method: "post",
       headers: {
         "Content-Type": "application/json",
       },
       credentials: "include",
       body: JSON.stringify(formData),
     });

     const result = await res.json();
     console.log("result", result);

     if (!res.ok) {
       throw new Error(result.message);
     }

     dispatch(setCredentials(result));
     toast.success(
       "Registration successful! Please check your email for the OTP."
     );
     navigate("/home");
   } catch (err) {
     toast.error(err?.data?.message || err.error || "An error occurred");
   }
 };

  

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* img box */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="" className="w-full rounded-l-lg" />
            </figure>
          </div>
          {/* signup form */}

          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>
            <form className="py-4 md:py-0" onSubmit={handleSubmit}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
           placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
           placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="Number"
                  placeholder="Mobile Number"
                  name="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
           placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  name="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
           placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
           placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className="mt-7">
                <button
                  type="submit"
                  onSubmit={() => handleSubmit()}
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  Signup
                </button>
              </div>
              <p className="mt-5 text-textColor text-center">
                Already have an account?
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-l"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
