import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='navbar bg-neutral text-primary-content flex items-center justify-between w-full'>
      <NavLink to={"/"} className='btn btn-ghost  text-xl uppercase'>
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
      <div>
        <NavLink to={"/signup"} className=' btn btn-primary'>
          Signup
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
