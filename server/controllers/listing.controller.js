import Listing from "../models/listing.model.js";
import asynchandler from 'express-async-handler';
import { v2 as cloudinary } from 'cloudinary';



// Add Listing
export const addListing = asynchandler(async (req, res) => {

    let { name, parking, furnished, description, address, regularPrice, bathrooms, bedrooms, type, offer, } = req.body;

    const images = req.files;


    if (!name || !description || !address || !regularPrice || !bathrooms || !bedrooms || !type) {
        res.status(400)
        throw new Error("All fields are required")
    }

    // create an empty array
    let uploadedImages = []

    // checking for images
    if (req.files) {
        // uploading images to cloud
        for (let i = 0; i < images.length; i++) {

            const { public_id, secure_url } = await cloudinary.uploader.upload(images[i].path, { folder: "ESTATE/Images" });
            // push the object t array
            uploadedImages.push({
                public_Id: public_id,
                url: secure_url
            })
        }

    }


    const newListing = await Listing.create({ user: req.user._id, name, description, address, regularPrice, bathrooms, bedrooms, type, offer, parking, furnished, images: uploadedImages })

    if (!newListing) {
        res.status(400)
        throw new Error("Somthing went Wrong")
    }

    res.status(201).json({ success: true, message: "New Listing added successfully" })
})

// Get All Listings
export const getListings = asynchandler(async (req, res) => {

    const listings = await Listing.find();
    if (!listings.length) {
        res.status(404)
        throw new Error("No Listings Found")
    }

    res.status(200).json(listings)

})

// Get Listing By Id
export const getListingById = asynchandler(async (req, res) => {
    const { id } = req.params;

    const singleListing = await Listing.findById(id).select("name description address parking  regularPrice bathrooms bedrooms furnished type offer images -_id");

    if (!singleListing) {
        res.status(404)
        throw new Error("Listing Not Found");
    }
    res.status(200).json(singleListing)
})

// Update Listing
export const updateListing = asynchandler(async (req, res) => {

    const { id } = req.params;

    const images = req.files;

    const uploadedImages = [];

    if (images.length) {
        // deleting old images
        const listing = await Listing.findById(id);
        listing.images.forEach(async (item) => {
            await cloudinary.uploader.destroy(item.public_Id)
        })
        // uploading new  images to cloud
        for (let i = 0; i < images.length; i++) {

            const { public_id, secure_url } = await cloudinary.uploader.upload(images[i].path, { folder: "ESTATE/Images" });
            // push the object t array
            uploadedImages.push({
                public_Id: public_id,
                url: secure_url
            })
        }

        req.body.images = uploadedImages;
    }

    await Listing.findByIdAndUpdate(id, { ...req.body }, { new: true })

    res.status(200).json({ success: true, message: "Listing Updated Successfully" })
})

// Delete Listing
export const deleteListing = asynchandler(async (req, res) => {

    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    deletedListing.images.forEach(async (element) => {
        await cloudinary.uploader.destroy(element.public_Id)
    });

    res.status(200).json({ message: "Listing Deleted Successfully", success: true })
})