import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { signup } from "../redux/features/userSlice";
import { intialStateUserTypes } from "../types/index";
import { NavLink } from "react-router-dom";

const SignupPage = () => {
  let [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isLoading } = useSelector(
    (state: intialStateUserTypes) => state.user
  );

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signup(input));
  };

  return (
    <main className=' w-full h-screen flex items-center justify-center flex-col px-5 md:px-20'>
      <h1 className=' text-3xl md:text-4xl capitalize font-semibold text-center m-5 font-mono'>
        Sign up
      </h1>
      <form
        content='application/json'
        onSubmit={handleSubmit}
        className='flex items-center justify-center  gap-5 flex-col'
      >
        <div className=' w-full flex items-center justify-between gap-5 '>
          <FiUser className=' text-2xl' />
          <input
            type='text'
            placeholder='Your name'
            className='input input-bordered w-full max-w-xs'
            onChange={handleChange}
            name='name'
            value={input.name}
            required
          />
        </div>
        <div className=' w-full flex items-center justify-between gap-5 '>
          <AiOutlineMail className=' text-2xl' />
          <input
            type='email'
            placeholder='Your email'
            className='input input-bordered w-full max-w-xs'
            onChange={handleChange}
            name='email'
            value={input.email}
            required
          />
        </div>
        <div className=' w-full flex items-center justify-between gap-5 '>
          <AiOutlineLock className=' text-2xl' />
          <input
            type='password'
            placeholder='Your password'
            className='input input-bordered w-full max-w-xs'
            onChange={handleChange}
            name='password'
            value={input.password}
            required
          />
        </div>

        <button disabled={isLoading} className=' btn btn-primary'>
          {isLoading && <span className='loading loading-spinner'></span>}
          Submit
        </button>
      </form>
      <span className=' m-4'>
        Already a User ?{" "}
        <NavLink to={"/login"} className=' link-secondary underline'>
          Click here
        </NavLink>{" "}
        to login
      </span>
    </main>
  );
};

export default SignupPage;
