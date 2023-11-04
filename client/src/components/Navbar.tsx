import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { logout, getDetails } from "../redux/features/userSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { intialStateUserTypes } from "../types";
import { useEffect } from "react";
import logo from "../assets/profile.jpeg";
const Navbar = () => {
  const user = useAuth();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { isLoading, myDetails } = useSelector(
    (state: intialStateUserTypes) => state.user
  );

  const handleLogout = () => {
    console.log("Hello");
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(getDetails());
  }, []);

  return (
    <div className='navbar bg-neutral text-primary-content flex items-center justify-between w-full'>
      <NavLink to={"/"} className=' text-white  text-xl uppercase'>
        E State
      </NavLink>

      <div className=' hidden md:block form-control'>
        <div className='input-group'>
          <input
            type='text'
            placeholder='Search…'
            className='input input-bordered'
          />
          <button className='btn btn-square'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </button>
        </div>
      </div>
      {!user ? (
        <div>
          <NavLink to={"/signup"} className=' btn btn-accent btn-sm'>
            Signup
          </NavLink>
        </div>
      ) : (
        <div className=' flex items-center gap-2'>
          <Link to={"/listing/add"} className=' btn btn-success btn-sm'>
            Create
          </Link>
          {!isLoading && (
            <div>
              <div className='dropdown dropdown-end'>
                <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                  <div className='w-10 rounded-full'>
                    <img src={myDetails?.avatar?.url || logo} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'
                >
                  <li className=' mb-5'>
                    <Link
                      className='btn btn-ghost text-success'
                      to={"/profile"}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className=' btn btn-ghost btn-sm text-error'
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
