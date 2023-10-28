import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { signup } from "../redux/features/userSlice";
import { intialStateTypes } from "../types/index";

const SignupPage = () => {
  let [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isLoading } = useSelector((state: intialStateTypes) => state.user);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signup(input));
  };

  return (
    <main className=' w-full h-screen flex items-center justify-center flex-col px-5 md:px-20'>
      <h1 className=' text-2xl md:text-3xl capitalize font-semibold text-center m-5'>
        Sign up
      </h1>
      <form
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
          />
        </div>

        <button className=' btn btn-primary'>
          {isLoading && <span className='loading loading-spinner'></span>}
          Submit
        </button>
      </form>
    </main>
  );
};

export default SignupPage;
