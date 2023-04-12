import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import Puzzle from '../Puzzle/Puzzle.js'
import './layoutSignUp.css';

const SignInForm = ({ currentId, setCurrentId }) => {
   const [postData, setPostData] = useState({ username: '' });
   const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
   const classes = useStyles();
   const dispatch = useDispatch();

   useEffect(() => {
      if (post) setPostData(post);
   }, [post]);

   const clear = () => {
      // setCurrentId(0);
      setPostData({ username: '' });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (currentId === 0) {
         dispatch(createPost(postData));
         clear();
      } else {
         dispatch(updatePost(currentId, postData));
         clear();
      }
   };

   const [showImages, setShowImages] = useState(false);
   const [showForm, setShowForm] = useState(true);

   const handleClickSubmit = () => {
      setShowImages(true);
      setShowForm(false);
   };
    
   return (
      <div class="layout">
         {showForm && (<Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
               <Typography variant="h6">Secure Authentication</Typography>
               <TextField name="username" variant="outlined" label="Username" fullWidth value={postData.username}onChange={(e) => setPostData({ ...postData, username: e.target.value })} />
               <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" onClick={handleClickSubmit} fullWidth>Submit</Button>
               {/* <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> */}
            </form>
         </Paper>)}

         {showImages && <Puzzle />}
      </div>
   );
}

export default SignInForm;


