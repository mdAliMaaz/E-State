import { useState, useEffect } from "react";
import logo from "../assets/profile.jpeg";
import { updateProfile } from "../redux/features/userSlice";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { intialStateUserTypes } from "../types";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";

const Profile = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    _id: "",
    avatar: { public_Id: "", url: "" },
  });

  const { isLoading } = useSelector(
    (state: intialStateUserTypes) => state.user
  );
  let myProfile = logo;

  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState("");

  const [image, setImage] = useState([]);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as ArrayLike<File>);
    // @ts-ignore
    setImage(files);
    // @ts-ignore
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    for (let i = 0; i < image.length; i++) {
      // @ts-ignore
      formData.append("images", image[i]);
    }

    // @ts-ignore
    dispatch(updateProfile(formData));
  };

  if (input.avatar.url !== "") {
    myProfile = input.avatar.url;
  }

  useEffect(() => {
    const getDetails = (async () => {
      setLoading(true);
      try {
        const response = await axios.get("/user/getProfile", {
          withCredentials: true,
        });
        setInput(response.data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.log(error.message);
        console.log("Unable to get profile");
      }
    })();
  }, []);

  if (loading) {
    return <span className='loading loading-spinner text-success'></span>;
  }

  return (
    <form
      className=' w-full h-screen flex items-center justify-center '
      onSubmit={handleSubmit}
      encType='multipart/form-data'
    >
      <div className=' flex items-center justify-center flex-col gap-5 shadow-lg w-1/2 h-1/2 p-1 rounded-md relative'>
        <Link
          to={"myListing"}
          typeof='button'
          className='link-success absolute top-1 right-3 uppercase hover:link-info transition-colors'
        >
          my Listings
        </Link>
        <label htmlFor='image'>
          <img
            src={!imagePreview ? myProfile : imagePreview}
            alt='profile'
            className=' w-28 md:w-40 rounded-full'
          />
        </label>
        <input
          type='file'
          id='image'
          className='hidden'
          accept='image/*'
          onChange={handleImage}
        />
        <div>
          <input
            type='text'
            placeholder='Name'
            className='input input-bordered w-full max-w-xs'
            onChange={handleChange}
            value={input.name}
            name='name'
          />
        </div>
        <div>
          <input
            type='email'
            placeholder='email'
            className='input input-bordered w-full max-w-xs'
            onChange={handleChange}
            value={input.email}
            name='email'
          />
        </div>
        <div>
          <button
            disabled={isLoading}
            className='a btn btn-primary'
            type='submit'
          >
            {isLoading && <span className='loading loading-spinner'></span>}
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Profile;
