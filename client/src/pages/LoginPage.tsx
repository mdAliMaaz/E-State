import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { intialStateUserTypes } from "../types";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { login } from "../redux/features/userSlice";
const LoginPage = () => {
  let [input, setInput] = useState({
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
    dispatch(login(input));
    console.log(input);
  };

  return (
    <main className=' w-full h-screen flex items-center justify-center flex-col px-5 md:px-20'>
      <h1 className=' text-3xl md:text-4xl capitalize font-semibold text-center m-5 font-mono'>
        Log in
      </h1>
      <form
        onSubmit={handleSubmit}
        className='flex items-center justify-center  gap-5 flex-col'
      >
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
        Don't have an account ?{" "}
        <NavLink to={"/signup"} className=' link-secondary underline'>
          Click here
        </NavLink>{" "}
        to login
      </span>
    </main>
  );
};

export default LoginPage;
