import React, { useEffect, useState } from 'react';
import { Container, AppBar, Button, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import SignInForm from './components/Form/SignInForm';
import SignUpForm from './components/Form/SignUpForm';
// import tim from './images/tim.png';
// import useStyles from './styles';
import './fontStyles.css';

const App = () => {
    const [currentId, setCurrentId] = useState(0);
    
    // const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    const [showHome, setShowHome] = useState(true);
    const [showSignIn, setSignIn] = useState(false);
    const [showSignUp, setSignUp] = useState(false);
    
    const handleClickSignIn = () => {
        // 👇️ toggle shown state
        // setShowHome(current => !current);
        setSignIn(true);
        setShowHome(false);
    };

    const handleClickSignUp = () => {
        setSignUp(true);
        setShowHome(false);
    };

    return (
        <Container maxWidth="lg">
            {/* <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center"> TIM </Typography>
                <img className={classes.image} src={tim} alt="TIM" height="60" />
            </AppBar> */}
            <div>
                {showHome && <MainHeading />}
                {/* {showHome && <SubHeading />} */}
            </div>

            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={6}>
                            {showHome && (<Button class="signIn" variant="contained" onClick={handleClickSignIn}> SIGN IN </Button>)}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            {showHome && (<Button class="signUp" variant="contained" onClick={handleClickSignUp}> SIGN UP </Button>)}
                        </Grid>
                    </Grid>

                    <Grid class="form" container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        {/* <Grid item xs={12} sm={7}>
                            {isShown && <Posts />}
                        </Grid> */}
                        <Grid item xs={12} sm={6}>
                            {/* 👇️ show component on click */}
                            {showSignIn && <SignInForm currentId={currentId} setCurrentId={setCurrentId} />}
                            {showSignUp && <SignUpForm currentId={currentId} setCurrentId={setCurrentId} />}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

function MainHeading() {
    return (
        <div>
            {/* <span className="font-link-main">
                <h1>TIM</h1>
            </span> */}

            <div class="text-box">
                <h1 class="heading-primary">
                    <span class="heading-primary-main">TIM</span>
                    <span class="heading-primary-sub">Secure and usable authentication</span>
                </h1>
            </div>
        </div>
    );
}

// function SubHeading() {
//     return (
//         <div>
//             <span className="font-link-sub">
//                 <h1>Secure and usable authentication</h1>
//             </span>
//         </div>
//     );
// } 

export default App;


