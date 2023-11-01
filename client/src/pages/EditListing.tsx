import { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { intialStateListingTypes } from "../types/index";
import { updateListing } from "../redux/features/listingSlice";
import axios from "../axios";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";

const CreateListing = () => {
  const { isLoading } = useSelector(
    (state: intialStateListingTypes) => state.listing
  );

  const { id } = useParams();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    address: "",
    regularPrice: "",
    bathrooms: "",
    bedrooms: "",
    furnished: "",
    parking: "",
    type: "",
    offer: "",
    images: [],
  });

  const [imagesPreview, setImagesPreview] = useState([]);

  const [images, setImages] = useState([]);

  const handleChange = (e: any) => {
    if (e.target.type === "radio") {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    if (
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "number"
    ) {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    if (e.target.type === "checkbox") {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setImages(e.target.files);
    const files = Array.from(e.target.files as ArrayLike<File>);

    files.forEach((file) => {
      const reader: FileReader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          // @ts-ignore
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("address", input.address);
    formData.append("regularPrice", String(input.regularPrice));
    formData.append("bathrooms", String(input.bathrooms));
    formData.append("bedrooms", String(input.bedrooms));
    formData.append("furnished", String(input.furnished));
    formData.append("parking", String(input.parking));
    formData.append("type", String(input.type));
    formData.append("offer", String(input.offer));

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    dispatch(updateListing({ formData, id }));
  };

  const getDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/listing/${id}`, {
        withCredentials: true,
      });
      setInput(response.data);
      setLoading(false);
    } catch (error: any) {
      console.log(error.messsage);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getDetails();
  }, []);

  if (loading) {
    return (
      <div className=' w-full h-screen flex items-center justify-center'>
        <span className='loading loading-spinner text-error'></span>
      </div>
    );
  }

  return (
    <main className=' w-full h-full flex items-center justify-center flex-col gap-5 px-10 py-5'>
      <h1 className='text-center uppercase font-semibold text-2xl md:text-3xl'>
        {" "}
        Create a Listing
      </h1>
      <form
        autoComplete='off'
        onSubmit={handleSubmit}
        className=' flex justify-between flex-col md:flex-row gap-5'
        content='multipart/form-data'
      >
        {/* left div */}
        <div>
          <div>
            <input
              type='text'
              placeholder='Name'
              className='input input-bordered w-full max-w-xs mb-5'
              name='name'
              onChange={handleChange}
              value={input.name}
            />
          </div>
          <div>
            <textarea
              placeholder='Description'
              className='textarea textarea-bordered textarea-md w-full max-w-xs mb-5'
              name='description'
              onChange={handleChange}
              value={input.description}
            ></textarea>
          </div>
          <div>
            <input
              type='text'
              placeholder='Address'
              className='input input-bordered w-full max-w-xs mb-5'
              name='address'
              onChange={handleChange}
              value={input.address}
            />
          </div>
          {/* Check boxes */}
          <div className=' flex items-center gap-3 mb-5'>
            <div className=' flex items-center gap-2'>
              <input
                type='radio'
                className='radio radio-primary radio-xs'
                name='type'
                value='Sell'
                onChange={handleChange}
                checked={input.type === "Sell"}
              />
              <label>Sell</label>
            </div>
            <div className=' flex items-center gap-2'>
              <input
                type='radio'
                className='radio radio-primary radio-xs'
                name='type'
                value='Rent'
                onChange={handleChange}
                checked={input.type === "Rent"}
              />
              <label>Rent</label>
            </div>
            <div className=' flex items-center gap-2'>
              <input
                type='checkbox'
                className='checkbox checkbox-xs'
                name='parking'
                checked={Boolean(input.parking)}
                onChange={handleChange}
              />
              <label>Parking spot</label>
            </div>
            <div className=' flex items-center gap-2'>
              <input
                type='checkbox'
                className='checkbox checkbox-xs'
                name='furnished'
                checked={Boolean(input.furnished)}
                onChange={handleChange}
              />
              <label>Furnished</label>
            </div>
          </div>
          <div className=' flex items-center gap-2 mb-5'>
            <input
              type='checkbox'
              className='checkbox checkbox-xs'
              name='offer'
              onChange={handleChange}
              checked={Boolean(input.offer)}
            />
            <label>Offer</label>
          </div>
          <div className=' flex items-center gap-2 mb-5'>
            <div className=' flex items-center gap-2'>
              <input
                type='number'
                placeholder='beds'
                className='input input-bordered input-sm  max-w-xs w-[80px]'
                onChange={handleChange}
                value={input.bedrooms}
                name='bedrooms'
              />
              <label>Beds</label>
            </div>
            <div className=' flex items-center gap-2'>
              <input
                type='number'
                placeholder='baths'
                className='input input-bordered input-sm  max-w-xs w-[80px]'
                onChange={handleChange}
                value={input.bathrooms}
                name='bathrooms'
              />
              <label>Baths</label>
            </div>
          </div>
          <div className=' flex items-center gap-2 mb-5'>
            <input
              type='number'
              placeholder='price'
              className='input input-bordered input-sm  max-w-xs w-[100px]'
              onChange={handleChange}
              value={input.regularPrice}
              name='regularPrice'
            />
            <label>
              Regulare price
              <span className=' block text-center text-sm'>{`(₹ / month)`}</span>
            </label>
          </div>
        </div>
        {/* right div */}
        <div>
          <div className=' flex  items-center gap-2 mb-5'>
            <input
              type='file'
              className='file-input file-input-bordered file-input-warning w-full max-w-xs'
              name='images'
              onChange={handleImageChange}
              accept='image/*'
              multiple
            />
          </div>

          {!imagesPreview.length ? (
            <div className=' flex items-center gap-5 flex-col flex-wrap md:flex-row mb-5'>
              {input.images?.map((item: { url: string; public_Id: string }) => (
                <img
                  key={crypto.randomUUID()}
                  className='w-[200px]'
                  src={item?.url}
                />
              ))}
            </div>
          ) : (
            <div className=' flex items-center gap-5 flex-col flex-wrap md:flex-row mb-5'>
              {imagesPreview?.map((item) => (
                <img
                  key={crypto.randomUUID()}
                  className='w-[200px]'
                  src={item}
                />
              ))}
            </div>
          )}
          <button
            disabled={isLoading}
            className=' btn btn-accent mb-5'
            type='submit'
          >
            {isLoading && <span className='loading loading-spinner'></span>}
            Update Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
