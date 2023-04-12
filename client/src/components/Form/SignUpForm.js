import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import './layoutSignUp.css';
import "./DropDown.css";

var securityRounds = 1;

const SignUpForm = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ username: '', selectedFile1: '', targetPosition1: -1, selectedFile2: '', targetPosition2: -1, selectedFile3: '', targetPosition3: -1, selectedFile4: '', targetPosition4: -1, selectedFile5: '', targetPosition5: -1, securityLevels: 1 });
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const clear = () => {
        // setCurrentId(0);
        setPostData({ username: '', selectedFile1: '', targetPosition1: -1, selectedFile2: '', targetPosition2: -1, selectedFile3: '', targetPosition3: -1, selectedFile4: '', targetPosition4: -1, selectedFile5: '', targetPosition5: -1, securityLevels: 1 });
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

        setShowAlert(true);
        // setShowForm(false);
    }

    const [showAlert, setShowAlert] = useState(false);
    const [showForm, setShowForm] = useState(true);


    // ------------------------------------------DropDown------------------------------------------------------------
    const [selectedValue, setSelectedValue] = useState(null);
    
    const options = [
        { value: "1", label: "1 Security Level" },
        { value: "2", label: "2 Security Levels" },
        { value: "3", label: "3 Security Levels" },
        { value: "4", label: "4 Security Levels" },
        { value: "5", label: "5 Security Levels" }
    ];

    const Icon = () => {
        return (
            <svg height="20" width="20" viewBox="0 0 20 20">
                <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
        );
    };
      
    const DropDown = ({ placeHolder, options }) => {
        const [showMenu, setShowMenu] = useState(false);
      
        useEffect(() => {
            const handler = () => setShowMenu(false);
            window.addEventListener("click", handler);
            return () => {
                window.removeEventListener("click", handler);
            };
        });
      
        const handleInputClick = (e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
        };
      
        const getDisplay = () => {
            if (selectedValue) {
                return selectedValue.label;
            }
            return placeHolder;
        };
      
        const onItemClick = (option) => {
            setSelectedValue(option);
            securityRounds = option.value;
            setPostData({ ...postData, securityLevels: option.value });
        }
      
        const isSelected = (option) => {
            if(!selectedValue) {
                return false;
            }
        
            return selectedValue.value ===option.value;
        };
      
        return (
            <div className="dropdown-container">
                <div onClick={handleInputClick} className="dropdown-input">
                <div className="dropdown-selected-value">{getDisplay()}</div>
                <div className="dropdown-tools">
                    <div className="dropdown-tool">
                        <Icon />
                    </div>
                </div>
                </div>
                {showMenu && (
                <div className="dropdown-menu">
                    {options.map((option) => (
                    <div 
                        onClick={() => onItemClick(option)}
                        key={option.value}
                        className={`dropdown-item ${isSelected(option) && "selected"}`}
                    >
                        {option.label}
                    </div>
                    ))}
                </div>
                )}
            </div>
        );
    };
    // --------------------------------------------------------------------------------------------------------------


    // --------------------------Select Target Position-------------------------------------------------------------
    var selectedPosition = 0;

    const [complete1, setComplete1] = React.useState(false);
    const [complete2, setComplete2] = React.useState(false);
    const [complete3, setComplete3] = React.useState(false);
    const [complete4, setComplete4] = React.useState(false);
    const [complete5, setComplete5] = React.useState(false);

    const getShuffledPuzzle = () => {
        const rowOne = [];
        const rowTwo = [];
        const rowThree = [];
        const rowFour=[];
        const rowFive=[];

        rowOne.push(0);
        rowOne.push(1);
        rowOne.push(2);
        rowOne.push(3);
        rowOne.push(4);
        
        rowTwo.push(5);
        rowTwo.push(6);
        rowTwo.push(7);
        rowTwo.push(8);
        rowTwo.push(9);

        rowThree.push(10);
        rowThree.push(11);    
        rowThree.push(12);
        rowThree.push(13);
        rowThree.push(14);

        rowFour.push(15);
        rowFour.push(16);
        rowFour.push(17);
        rowFour.push(18);
        rowFour.push(19);

        rowFive.push(20);
        rowFive.push(21);
        rowFive.push(22);
        rowFive.push(23);
        rowFive.push(24);
        
        return [rowOne, rowTwo, rowThree,rowFour,rowFive];
    };

    const getPuzzle = () => {
        let puzzle = getShuffledPuzzle();
        return puzzle;
    };

    const ChoosePosition1 = () => {
        const [puzzle, setPuzzle] = React.useState([]);

        React.useEffect(() => {
            setPuzzle(getPuzzle());
        }, []);

        const selectPosition = (x, y) => {
            selectedPosition = (x*5) + y;
            setPostData({ ...postData, targetPosition1: selectedPosition });
            setComplete1(true);
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
                                            width: 60, height: 60, margin: 2,
                                            borderRadius: 5, userSelect: "none",
                                            // cursor: complete ? "not-allowed" : "pointer",
                                            cursor: "pointer",
                                            backgroundColor: (complete1 && (i*5+j) === postData.targetPosition1) ? "yellow" : "default",
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

    const ChoosePosition2 = () => {
        const [puzzle, setPuzzle] = React.useState([]);

        React.useEffect(() => {
            setPuzzle(getPuzzle());
        }, []);

        const selectPosition = (x, y) => {
            selectedPosition = (x*5) + y;
            setPostData({ ...postData, targetPosition2: selectedPosition });
            setComplete2(true);
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
                                            width: 60, height: 60, margin: 2,
                                            borderRadius: 5, userSelect: "none",
                                            cursor: "pointer",
                                            backgroundColor: (complete2 && (i*5+j) === postData.targetPosition2) ? "yellow" : "default",
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

    const ChoosePosition3 = () => {
        const [puzzle, setPuzzle] = React.useState([]);

        React.useEffect(() => {
            setPuzzle(getPuzzle());
        }, []);

        const selectPosition = (x, y) => {
            selectedPosition = (x*5) + y;
            setPostData({ ...postData, targetPosition3: selectedPosition });
            setComplete3(true);
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
                                            width: 60, height: 60, margin: 2,
                                            borderRadius: 5, userSelect: "none",
                                            cursor: "pointer",
                                            backgroundColor: (complete3 && (i*5+j) === postData.targetPosition3) ? "yellow" : "default",
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

    const ChoosePosition4 = () => {
        const [puzzle, setPuzzle] = React.useState([]);

        React.useEffect(() => {
            setPuzzle(getPuzzle());
        }, []);

        const selectPosition = (x, y) => {
            selectedPosition = (x*5) + y;
            setPostData({ ...postData, targetPosition4: selectedPosition });
            setComplete4(true);
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
                                            width: 60, height: 60, margin: 2,
                                            borderRadius: 5, userSelect: "none",
                                            cursor: "pointer",
                                            backgroundColor: (complete4 && (i*5+j) === postData.targetPosition4) ? "yellow" : "default",
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

    const ChoosePosition5 = () => {
        const [puzzle, setPuzzle] = React.useState([]);

        React.useEffect(() => {
            setPuzzle(getPuzzle());
        }, []);

        const selectPosition = (x, y) => {
            selectedPosition = (x*5) + y;
            setPostData({ ...postData, targetPosition5: selectedPosition });
            setComplete5(true);
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
                                            width: 60, height: 60, margin: 2,
                                            borderRadius: 5, userSelect: "none",
                                            cursor: "pointer",
                                            backgroundColor: (complete5 && (i*5+j) === postData.targetPosition5) ? "yellow" : "default",
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



    //-----------------------------Next-----------------------------------------------------------------------------
    const onNext = () => {
        setShowForm(false);
        if(securityRounds === 1){
            setLastLevel(true);
            setLevel1(true);
        }
        else{
            setShowLevels(true);
            setLevel1(true);
            securityRounds = securityRounds - 1;
        }
    }

    const onNextOne = () => {
        if(securityRounds === 1){
            setLevel1(false);
            setLastLevel(true);
            setLevel2(true);
        }
        else{
            setLevel1(false);
            setLevel2(true);
            securityRounds = securityRounds - 1;
        }
    }

    const onNextTwo = () => {
        if(securityRounds === 1){
            setLevel2(false);
            setLastLevel(true);
            setLevel3(true);
        }
        else{
            setLevel2(false);
            setLevel3(true);
            securityRounds = securityRounds - 1;
        }
    }

    const onNextThree = () => {
        if(securityRounds === 1){
            setLevel3(false);
            setLastLevel(true);
            setLevel4(true);
        }
        else{
            setLevel3(false);
            setLevel4(true);
            securityRounds = securityRounds - 1;
        }
    }

    const onNextFour = () => {
        if(securityRounds === 1){
            setLevel4(false);
            setLastLevel(true);
            setLevel5(true);
        }
        else{
            setLevel4(false);
            setLevel5(true);
            securityRounds = securityRounds - 1;
        }
    }

    const onNextFive = () => {
        // Will never be called as maximum security levels = 5
    }

    const [showLevels, setShowLevels] = useState(false);
    const [level1, setLevel1] = useState(false);
    const [level2, setLevel2] = useState(false);
    const [level3, setLevel3] = useState(false);
    const [level4, setLevel4] = useState(false);
    const [level5, setLevel5] = useState(false);
    const [lastLevel, setLastLevel] = useState(false);

    const Next = () => {
        return (
            <div>
                {level1 && (<Paper className={classes.paperOnNext}>
                    <form autoComplete="off" noValidate className={`${classes.rootOnNext} ${classes.formOnNext}`} >
                        <Typography variant="h6">Secure Authentication Level 1</Typography>
                        <div className={classes.fileInputOnNext}> <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile1: base64 })} /> </div>
                        <ChoosePosition1 />
                        {!lastLevel && (<Button className={classes.buttonSubmitOnNext} variant="contained" color="primary" size="large" onClick={onNextOne} fullWidth>Next</Button>)}
                        {lastLevel && (<Button className={classes.buttonSubmitOnNext} variant="contained" color="primary" size="large" onClick={handleSubmit} fullWidth>Submit</Button>)}
                    </form>
                </Paper>)}

                {level2 && (<Paper className={classes.paperOnNext}>
                    <form autoComplete="off" noValidate className={`${classes.rootOnNext} ${classes.formOnNext}`} >
                        <Typography variant="h6">Secure Authentication Level 2</Typography>
                        <div className={classes.fileInputOnNext}> <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile2: base64 })} /> </div>
                        <ChoosePosition2 />
                        {!lastLevel && (<Button className={classes.buttonSubmitOnNext} variant="contained" color="primary" size="large" onClick={onNextTwo} fullWidth>Next</Button>)}
                        {lastLevel && (<Button className={classes.buttonSubmitOnNext} variant="contained" color="primary" size="large" onClick={handleSubmit} fullWidth>Submit</Button>)}
                    </form>
                </Paper>)}

                {level3 && (<Paper className={classes.paperOnNext}>
                    <form autoComplete="off" noValidate className={`${classes.rootOnNext} ${classes.formOnNext}`} >
                        <Typography variant="h6">Secure Authentication Level 3</Typography>
                        <div className={classes.fileInputOnNext}> <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile3: base64 })} /> </div>
                        <ChoosePosition3 />
                        {!lastLevel && (<Button className={classes.buttonSubmitOnNext} variant="contained" color="primary" size="large" onClick={onNextThree} fullWidth>Next</Button>)}
                        {lastLevel && (<Button className={classes.buttonSubmitOnNext} variant="contained" color="primary" size="large" onClick={handleSubmit} fullWidth>Submit</Button>)}
                    </form>
                </Paper>)}

                {level4 && (<Paper className={classes.paperOnNext}>
                    <form autoComplete="off" noValidate className={`${classes.rootOnNext} ${classes.formOnNext}`} >
                        <Typography variant="h6">Secure Authentication Level 4</Typography>
                        <div className={classes.fileInputOnNext}> <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile4: base64 })} /> </div>
                        <ChoosePosition4 />
                        {!lastLevel && (<Button className={classes.buttonSubmitOnNext} variant="contained" color="primary" size="large" onClick={onNextFour} fullWidth>Next</Button>)}
                        {lastLevel && (<Button className={classes.buttonSubmitOnNext} variant="contained" color="primary" size="large" onClick={handleSubmit} fullWidth>Submit</Button>)}
                    </form>
                </Paper>)}

                {level5 && (<Paper className={classes.paperOnNext}>
                    <form autoComplete="off" noValidate className={`${classes.rootOnNext} ${classes.formOnNext}`} >
                        <Typography variant="h6">Secure Authentication Level 5</Typography>
                        <div className={classes.fileInputOnNext}> <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile5: base64 })} /> </div>
                        <ChoosePosition5 />
                        {!lastLevel && (<Button className={classes.buttonSubmitOnNext} variant="contained" color="primary" size="large" onClick={onNextFive} fullWidth>Next</Button>)}
                        {lastLevel && (<Button className={classes.buttonSubmitOnNext} variant="contained" color="primary" size="large" onClick={handleSubmit} fullWidth>Submit</Button>)}
                    </form>
                </Paper>)}
            </div>
        );
    }
    //---------------------------------------------------------------------------------------------------------------


    return (
        <div>
            {showForm && (<Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">Secure Authentication</Typography>
                    <TextField name="username" variant="outlined" label="Username" fullWidth value={postData.username} onChange={(e) => setPostData({ ...postData, username: e.target.value })} />
                    <DropDown placeHolder="Security Levels" options={options} />
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" onClick={onNext} fullWidth>Next</Button>
                    {/* <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button> */}
                </form>
            </Paper>)}

            {showLevels && <Next />}
        
            {showAlert && (alert("Signed Up Successfully !!"))}
        </div>
    );
}

export default SignUpForm;




