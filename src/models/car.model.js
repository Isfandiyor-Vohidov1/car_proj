import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    plateNumber: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Car = mongoose.model('car', carSchema);
export default Car;
