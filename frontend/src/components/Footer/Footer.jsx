import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="bg-[#192633] h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20 md:mt-10">
        <div className="p-5 ">
          <ul>
            <p className="text-white font-bold text-3xl pb-6">
              TRAVE<span className="text-blue-600">LISTA</span>
            </p>
            <div className="flex gap-6 pb-5">
              <FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
              <FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
              <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
              <FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
            </div>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-white font-bold text-2xl pb-4">For Users</p>
            <li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Travel Information
            </li>
            <li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Preparing for a Visit
            </li>
            <li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Bloggers Portal
            </li>
            <li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Reports
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-white font-bold text-2xl pb-4">
              Terms of Service
            </p>
            <li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Acceptance of Terms
            </li>
            <li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              User Responsibilities
            </li>
            <li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Intellectual Property
            </li>
            <li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Payment and Billing
            </li>
            <li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Termination of Service
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-white font-bold text-2xl pb-4">Support</p>
            <li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Contact
            </li>
            <li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Support Portals
            </li>
            <li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              List Of Charges
            </li>
            <li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Downloads & Resources
            </li>
            <li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Videos
            </li>

            <Link to="/register">
              <li className="text-gray-600 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
                Signup
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
