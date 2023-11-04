import express from 'express';
import { addListing, getListings, getListingById, updateListing, deleteListing, getMyListings } from '../controllers/listing.controller.js';
import { Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.route("/add").post(Protect, addListing);

router.route("/").get(Protect, getListings);

router.route("/my").get(Protect, getMyListings);

router.route("/:id").get(Protect, getListingById);

router.route("/:id").put(Protect, updateListing);

router.route("/:id").delete(Protect, deleteListing);


export default router;