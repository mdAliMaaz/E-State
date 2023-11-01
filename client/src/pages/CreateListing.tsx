import { useState } from "react";

import { addListing } from "../redux/features/listingSlice";
import { useDispatch, useSelector } from "react-redux";
import { intialStateListingTypes } from "../types";

const CreateListing = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    address: "",
    regularPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: "Rent",
    offer: false,
  });

  const { isLoading } = useSelector(
    (state: intialStateListingTypes) => state.listing
  );

  const [imagesPreview, setImagesPreview] = useState([]);

  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "number"
    ) {
      setInput((prev) => ({ ...prev, [name]: value }));
    }

    if (e.target.type === "radio") {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    if (e.target.type === "checkbox") {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as ArrayLike<File>);
    // @ts-ignore
    setImages(e.target.files);
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
    // @ts-ignore
    dispatch(addListing(formData));
  };

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
            />
          </div>
          <div>
            <textarea
              placeholder='Description'
              className='textarea textarea-bordered textarea-md w-full max-w-xs mb-5'
              name='description'
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <input
              type='text'
              placeholder='Address'
              className='input input-bordered w-full max-w-xs mb-5'
              name='address'
              onChange={handleChange}
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
                checked={input.parking}
                onChange={handleChange}
              />
              <label>Parking spot</label>
            </div>
            <div className=' flex items-center gap-2'>
              <input
                type='checkbox'
                className='checkbox checkbox-xs'
                name='furnished'
                checked={input.furnished}
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
              checked={input.offer}
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
              required
            />
          </div>

          {imagesPreview && (
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
            className=' btn btn-success mb-5'
            type='submit'
          >
            {isLoading && <span className='loading loading-spinner'></span>}
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
