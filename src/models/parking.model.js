import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        trim: true,
    },
    slotNumber: {
        type: Number,
        required: true,
    },
    isBooked: {
        type: Boolean,
        required: true,
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "car",
    },
    bookedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

const Parking = mongoose.model("parking", parkingSchema);
export default Parking;
