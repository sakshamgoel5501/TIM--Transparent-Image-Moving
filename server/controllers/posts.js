import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    // const { title, message, selectedFile, creator, tags } = req.body;
    const { selectedFile1, username, targetPosition1, securityLevels, selectedFile2, targetPosition2, selectedFile3, targetPosition3, selectedFile4, targetPosition4, selectedFile5, targetPosition5} = req.body;

    // const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })
    const newPostMessage = new PostMessage({ selectedFile1, username, targetPosition1, securityLevels, selectedFile2, targetPosition2, selectedFile3, targetPosition3, selectedFile4, targetPosition4, selectedFile5, targetPosition5 })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { username, selectedFile1, targetPosition1, securityLevels, selectedFile2, targetPosition2, selectedFile3, targetPosition3, selectedFile4, targetPosition4, selectedFile5, targetPosition5 } = req.body;
    // const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { username, selectedFile1, targetPosition1, securityLevels, selectedFile2, targetPosition2, selectedFile3, targetPosition3, selectedFile4, targetPosition4, selectedFile5, targetPosition5, _id: id };
    // const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}



export default router;

