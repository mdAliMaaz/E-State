import { useDispatch, useSelector } from "react-redux";
import { intialStateListingTypes } from "../types";
import { useEffect, useState } from "react";
import { getAllListing } from "../redux/features/listingSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [data, setData] = useState([
    {
      address: "",
      bathrooms: "",
      bedrooms: "",
      createdAt: "",
      description: "",
      furnished: "",
      images: [{ public_Id: "", url: "" }],
      name: "",
      regularPrice: "",
      type: "",
      updatedAt: "",
      _id: "",
    },
  ]);
  const { isLoading, allListings } = useSelector(
    (state: intialStateListingTypes) => state.listing
  );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(getAllListing());
    setTimeout(() => {
      setData(allListings);
    });
  }, []);

  if (isLoading && !data.length) {
    return <span className='loading loading-spinner text-accent'></span>;
  }

  return (
    <div className=' w-full h-screen '>
      <div className='carousel w-full h-1/2'>
        {data[0]?.images?.map(
          (item: { public_Id: string; url: string }, i: number) => (
            <div
              id={`slide${i + 1}`}
              className='carousel-item relative w-full'
              key={crypto.randomUUID()}
            >
              <img src={item.url} className='w-full object-cover' />
              <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
                <a
                  href={i === 0 ? `#slide${2}` : `#slide${1}`}
                  className='btn btn-circle'
                >
                  ❮
                </a>
                <a
                  href={i === 1 ? `#slide${1}` : `#slide${2}`}
                  className='btn btn-circle'
                >
                  ❯
                </a>
              </div>
            </div>
          )
        )}
      </div>
      <div className=' flex flex-col justify-center gap-5'>
        <h1 className=' text-2xl'>
          {data[0]?.name} - $ {data[0]?.regularPrice} / month
        </h1>
        <div className=' flex  items-center gap-2'>
          <CiLocationOn className=' text-green-500' />
          <span>{data[0]?.address}</span>
        </div>
        <span className=' uppercase btn btn-warning btn-sm rounded-md'>
          For {data[0]?.type}
        </span>
        <div>
          <span className=' font-bold'>Description-</span>{" "}
          {data[0]?.description}
        </div>
      </div>
      <div className=' w-full grid gap-3 place-items-center mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {data.map((item, i) => (
          <div key={i} className='card w-full bg-base-100 shadow-xl'>
            <figure className='px-10 pt-10'>
              <img
                src={item.images[0].url}
                alt={item.name}
                className='rounded-xl'
              />
            </figure>
            <div className='card-body items-center text-center'>
              <h2 className='card-title'>{item.name}</h2>
              <p>{item.address}</p>
              <div className='card-actions'>
                <Link to={`/listing/${item._id}`} className='btn btn-primary'>
                  Explore
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
