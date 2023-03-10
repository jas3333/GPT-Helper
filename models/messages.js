import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
    {
        name: String,
        message: String,
        _id: String,
    },
    { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
