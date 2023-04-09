import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import Puzzle from '../Puzzle/Puzzle.js'
import './layoutSignUp.css';

const SignUpForm = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ username: '', selectedFile: '', targetPosition: 0 });
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const clear = () => {
        // setCurrentId(0);
        setPostData({ username: '', selectedFile: '', targetPosition: 0 });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createPost(postData));
            clear();
        } else {
            dispatch(updatePost(currentId, postData));
            clear();
        }

        setShowImages(true);
        setShowForm(false);
    }

    const [showImages, setShowImages] = useState(false);
    const [showForm, setShowForm] = useState(true);

    // --------------------------Select Target Position-------------------------------------------------------------
    var selectedPosition = 0;

    const getShuffledPuzzle = () => {
        const rowOne = [];
        const rowTwo = [];
        const rowThree = [];

        rowOne.push(0);
        rowOne.push(1);
        rowOne.push(2);

        rowTwo.push(3);
        rowTwo.push(4);
        rowTwo.push(5);

        rowThree.push(6);
        rowThree.push(7);    
        rowThree.push(8);
        
        return [rowOne, rowTwo, rowThree];
    };

    const getPuzzle = () => {
        let puzzle = getShuffledPuzzle();
        return puzzle;
    };

    const ChoosePosition = () => {
        const [puzzle, setPuzzle] = React.useState([]);
        const [complete, setComplete] = React.useState(false);

        React.useEffect(() => {
            setPuzzle(getPuzzle());
        }, []);

        const selectPosition = (x, y) => {
            selectedPosition = (x*3) + y;
            setPostData({ ...postData, targetPosition: selectedPosition });
            setComplete(true);
        };

        return (
            <div className="Grid">
                <div
                    style={{
                        display: "inline-block",
                        backgroundColor: "darkgray",
                        border: `5px solid ${"gray"}`,
                        borderRadius: 5,
                        padding: 5
                    }}
                >
                    {puzzle.map((row, i) => (
                        <div key={i} style={{ display: "flex" }}>
                            {row.map((col, j) => {
                                return (
                                    <div class="positionBlocks"
                                        key={`${i}-${j}`}
                                        onClick={() => selectPosition(i, j)}
                                        style={{
                                            display: "flex", justifyContent: "center", alignItems: "center",
                                            width: 85, height: 85, margin: 2,
                                            borderRadius: 5, userSelect: "none",
                                            cursor: complete ? "not-allowed" : "pointer",
                                        }}
                                    >
                                        <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
                                            {col}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    // -------------------------------------------------------------------------------------------------------------
   
    return (
        <div>
            {showForm && (<Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">Secure Authentication</Typography>
                    <TextField name="username" variant="outlined" label="Username" fullWidth value={postData.username} onChange={(e) => setPostData({ ...postData, username: e.target.value })} />
                    <div className={classes.fileInput}> <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })} /> </div>
                    {/* <ChoosePosition name="targetPosition" value={postData.targetPosition} onChange={() => setPostData({ ...postData, targetPosition: selectedPosition })} /> */}
                    <ChoosePosition />
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                </form>
            </Paper>)}
        
            {showImages && (alert("Signed Up Successfully !!"))}
        </div>
    );
}

export default SignUpForm;




