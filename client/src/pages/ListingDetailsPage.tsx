import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { ImageSlider } from "../components";
import { CiLocationOn } from "react-icons/ci";
import { FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";

const ListingDetailsPage = () => {
  const [details, setDetails] = useState({
    address: "",
    bathrooms: "",
    bedrooms: "",
    images: [{ public_Id: "", url: "" }],
    name: "",
    offer: "",
    parking: "",
    regularPrice: "",
    updatedAt: "",
    description: "",
    user: "",
    __v: "",
    type: "",
    _id: "",
    furnished: "",
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async function () {
      setLoading(true);
      const response = await axios.get(`/listing/${id}`, {
        withCredentials: true,
      });
      setDetails(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className=' w-screen h-screen items-center justify-center'>
        <span className='loading loading-spinner text-success'></span>
      </div>
    );
  }
  return (
    <>
      <div className=' w-full h-screen '>
        <div className=' w-full h-1/2'>
          <ImageSlider count={details.images.length} images={details.images} />
        </div>
        <div className='w-full  flex items-start flex-col  gap-5 mt-10 md:px-32'>
          <h1 className=' text-2xl'>
            {details.name} - $ {details.regularPrice} / month
          </h1>
          <h1 className=' flex justify-center items-center gap-2'>
            <span>
              <CiLocationOn className=' text-green-500' />
            </span>
            {details.address}
          </h1>
          <span className=' uppercase btn btn-error btn-sm rounded-md'>
            For {details.type}
          </span>
          <div>
            <p>
              <span className=' font-bold'>Description-</span>{" "}
              {details.description}
            </p>
          </div>
          <div className=' flex items-center gap-3 text-green-500'>
            <span className=' flex items-center gap-2 md:text-lg justify-center'>
              <FaBath />
              <span>{details.bedrooms}</span>
            </span>
            <span className=' flex items-center gap-2 md:text-lg justify-center'>
              <FaBath />
              <span>{details.bathrooms}</span>
            </span>
            <span className=' flex items-center gap-2  justify-center'>
              <FaParking />
              <span>
                {!details.parking ? "No Parking" : "Parking Avaliable"}
              </span>
            </span>
            <span className=' flex items-center gap-2 md:text-lg justify-center'>
              <FaChair />
              <span>{!details.furnished ? "Not furnished" : "furnished"}</span>
            </span>
          </div>
          <div>
            <p className=' text-2xl font-semibold mb-5'>Contact Landlord</p>
            <form className=' w-full flex flex-col justify-center gap-5 py-3'>
              <textarea
                className='textarea textarea-accent w-full lg:w-[45rem] md:w-[30rem]'
                placeholder='Message....'
              ></textarea>
              <button className='btn btn-wide btn-success'>Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetailsPage;
