import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getmyListings } from "../redux/features/listingSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { intialStateListingTypes, myListing } from "../types";
import { Link } from "react-router-dom";
import { deleteListing } from "../redux/features/listingSlice";

const MyListingPage = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { isLoading, myListing } = useSelector(
    (state: intialStateListingTypes) => state.listing
  );

  useEffect(() => {
    dispatch(getmyListings());
  }, []);

  if (isLoading) {
    return <span className='loading loading-spinner text-success'></span>;
  }
  return (
    <main className=' w-full h-full'>
      {!isLoading && (
        <div className=' w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-3 mt-5 p-3'>
          {!myListing ? (
            <div className=' w-full h-screen flex items-center flex-col justify-center gap-5'>
              <p className=' text-2xl'>You Dont have any Listings</p>
              <Link
                className=' btn btn-warning btn-sm animate-bounce'
                to={"/listing/add"}
              >
                Add Listing
              </Link>
            </div>
          ) : (
            myListing.map((item: myListing) => (
              <div
                key={item._id}
                className='card  bg-base-100 shadow-xl image-full w-full lg:w-96'
              >
                <figure>
                  <img src={item?.images[0].url} alt='Shoes' />
                </figure>
                <div className='card-body'>
                  <h3 className='card-title'>Name: {item?.name}</h3>
                  <p>Description: {item?.description}</p>
                  <p>Address: {item?.address}</p>
                  <div className='card-actions flex items-center'>
                    <div>
                      <Link
                        to={`/listing/${item._id}`}
                        className='btn btn-outline btn-success btn-sm mx-2'
                      >
                        View
                      </Link>
                      <button
                        className='btn btn-outline btn-error btn-sm'
                        onClick={() =>
                          // @ts-ignore
                          document.getElementById("my_modal_1").showModal()
                        }
                      >
                        Delete
                      </button>
                      <dialog id='my_modal_1' className='modal'>
                        <div className='modal-box'>
                          <p className='py-2'>Are you sure ?</p>
                          <div className='modal-action flex items-center'>
                            <form method='dialog'>
                              <button className='btn btn-primary btn-xs'>
                                Close
                              </button>
                            </form>
                            <button
                              onClick={() => dispatch(deleteListing(item._id))}
                              className='btn  btn-error btn-xs z-10'
                              disabled={isLoading}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </dialog>
                    </div>
                    <Link
                      to={`/listing/edit/${item?._id}`}
                      className='btn btn-primary btn-sm btn-outline'
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
};

export default MyListingPage;
