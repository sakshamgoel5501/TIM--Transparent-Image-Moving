import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    username: String,
    selectedFile1: String,
    targetPosition1: Number,
    selectedFile2: String,
    targetPosition2: Number,
    selectedFile3: String,
    targetPosition3: Number,
    selectedFile4: String,
    targetPosition4: Number,
    selectedFile5: String,
    targetPosition5: Number,
    securityLevels: Number,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;


