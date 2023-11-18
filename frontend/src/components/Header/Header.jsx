


import { useEffect, useRef } from 'react';
import logo from "../../assets/images/Logo.png";
import { NavLink, Link } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/userAuthSlice';

const navLinks = [
  { path: '/home', display: 'Home' },
  { path: '/users/blogs', display: 'Blogs' },
  { path: '/users/create-blogs', display: 'Create Blogs' },
];

function Header() {
  const dispatch = useDispatch();

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('userInfo'));
  console.log(user);
  const token = user?.token;

  const handleStickyHeader = () => {
    const handleScroll = () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  };

  useEffect(() => {
    const cleanup = handleStickyHeader();
    return cleanup;
  }, []);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('show__menu');
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch your logout action
    // You may want to clear the user info from localStorage here as well
    localStorage.removeItem('useInfo');
    // Navigate to the login page or any other desired page after logout
    navigate('/login');
  };

  return (
    <>
      <header className="header flex items-center" ref={headerRef}>
        {/* ... (Your existing code) */}

        <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo*/}
          <div>
            <img src={logo} alt="" className="w-20 h-20" />
          </div>

          {/* Menu*/}

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600] "
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-irisBlueColor "
                    }
                  >
                    <span> {link.display}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/*Nav Right*/}

          {/* ==== nav right ==== */}
          <div className="flex items-center gap-4 mt-2 mb-2">
            {token && user ? (
              <div className="flex">
                <Link to={"/userProfile"}>
                  <div className="flex items-center gap-4">
                    {/* <figure className="w-[40px] h-[35px] flex align-middle">
                      <img
                        src={`${path}${user.photo}`}
                        alt=""
                        className="rounded-full"
                      />
                    </figure> */}
                    <h2 className="flex font-semibold">{user?.name}</h2>
                  </div>
                </Link>
                <Link to="/login " className="flex items-center ml-5">
                  <button
                    onClick={handleLogout}
                    className="bg-primaryColor py-2 px-6 text-white font-[600] h-[37px] flex items-center cursor-pointer justify-center rounded-[50px]   "
                  >
                    Logout
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[37px] flex items-center cursor-pointer justify-center rounded-[50px]   ">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[37px] flex items-center cursor-pointer justify-center rounded-[50px]   ">
                    Signup
                  </button>
                </Link>
              </div>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer " />
            </span>
          </div>
        </div>
      </div>
      </header>
    </>
  );
}

export default Header;
