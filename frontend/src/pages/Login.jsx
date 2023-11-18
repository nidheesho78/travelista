import {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/userAuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import { BASE_URL } from '../config';


const  Login = () => {
  
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const formData = {
    email,
    password
   }
console.log(email);

const navigate = useNavigate();
const dispatch = useDispatch();

const {userInfo} = useSelector((state) => state.auth);

useEffect( () => {
  if(userInfo) {
    navigate('/home')
  }
},[navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      // Make sure to call the json() method to parse the response body
      const result = await res.json();

      console.log("result", result);


      if (!res.ok) {
        throw new Error(result.message);
      }


    dispatch(setCredentials(result));
navigate("/home");

    } catch(err) {
      // If the error is not in JSON format, handle it accordingly
      toast.error(err?.data?.message || err.error || "An error occurred");
    }
  };

  


  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back
        </h3>
        <form className="py-4 md:py-0" onSubmit={handleSubmit}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
           placeholder:text-textColor rounded-md cursor-pointer"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter Your Password"
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
           placeholder:text-textColor  cursor-pointer"
              required
            />
          </div>
          <div className="mt-7">
            <button
              type="submit"
              onSubmit={() => handleSubmit()}
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              Login
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primaryColor font-medium ml-l">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
export default Login;