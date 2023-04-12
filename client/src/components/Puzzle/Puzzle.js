import React from 'react';


import './styles.css';
import { getPosts } from '../../actions/posts';

import first from './Images/1.png'
import second from './Images/2.png'
import third from './Images/3.png'
import fourth from './Images/4.png'
import fifth from './Images/5.png'
import sixth from './Images/6.png'
import seventh from './Images/7.png'
import eight from './Images/8.png'
import ninth from './Images/9.png'
import tenth from './Images/10.jpeg'
import eleventh from './Images/11.jpeg'
import twelvth from './Images/12.jpeg'
import thirteen from './Images/13.jpeg'
import fourteen from './Images/14.jpeg'
import fifteen from './Images/15.jpeg'
import sixteen from './Images/16.jpeg'
import seventeen from './Images/17.jpeg'
import eighteen from './Images/18.jpeg'
import nineteen from './Images/19.jpeg'
import twenty from './Images/10.jpeg'
import twentyone from './Images/21.jpeg'
import twentytwo from './Images/22.jpeg'
import twentythree from './Images/23.jpeg'
import twnetyfour from './Images/24.jpeg'

var urls = [first, second, third, fourth, fifth, sixth, seventh, eight, ninth,tenth,eleventh,twelvth,thirteen,fourteen,fifteen,sixteen,seventeen,eighteen,nineteen,twenty,twentyone,twentytwo,twentythree,twnetyfour];

const password = "XXXXXIXXX";
//take Image as tile with number 6

var designatedPositionX = 1;
var designatedPositionY = 1;

var passwordImageX = 0;
var passwordImageY = 0;

var n = 0;
//const response = await fetch(`http://localhost:5000/`)
//console.log(response)
// Grid of size (n X n).
const getShuffledPuzzle = () => {
    const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 , 13 ,14,15,16,17,18,19,20,21,22,23,24];

    const rowOne = [];
    const rowTwo = [];
    const rowThree = [];
    const rowFour=[];
    const rowFive=[];

    n = Math.sqrt(values.length);

    while (values.length) {
        const random = Math.floor(Math.random() * values.length);

        if (rowOne.length < 5) {
            rowOne.push(values.splice(random, 1)[0]);
        } else if (rowTwo.length < 5) {
            rowTwo.push(values.splice(random, 1)[0]);
        } else if(rowThree.length<5){
            rowThree.push(values.splice(random, 1)[0]);
        }
        else if(rowFour.length<5){
            rowFour.push(values.splice(random, 1)[0]);
        }
        else{
            rowFive.push(values.splice(random,1)[0]);
        }
    }
    
    return [rowOne, rowTwo, rowThree, rowFour, rowFive];
};

const flattenArray = (arr) => {
    return arr.reduce((flatArr, subArr) => flatArr.concat(subArr), []);
};

const getPuzzle = () => {
    let puzzle = getShuffledPuzzle();

    while(puzzle[1][2] === 5)
        puzzle = getShuffledPuzzle();

    for(var i=0 ; i<n ; i++){
        for(var j=0 ; j<n ; j++){
            console.log(puzzle[i][j])
            if(puzzle[i][j] === 6){
                passwordImageX = i;
                console.log("Hey")
                console.log(passwordImageX)
                console.log(passwordImageY)
                passwordImageY = j;
            }
        }
    }

    return puzzle;
};

export default function Grid() {
    const [puzzle, setPuzzle] = React.useState([]);
    const [complete, setComplete] = React.useState(false);
    const [moves, setMoves] = React.useState(0);

    const [retry, doRetry] = React.useState(false);

    React.useEffect(() => {
        setPuzzle(getPuzzle());
    }, []);

    const movePieceUp = (x, y) => {
        if (!complete) {
            const newPuzzle = puzzle.map(row => row.slice());

            for(var row=0 ; row<n ; row++){
                for(var col=0 ; col<n ; col++){
                    newPuzzle[row][col] = puzzle[(row+1)%n][col];
                }
            }
            
            if(x !== 0)
                passwordImageX = passwordImageX-1;
            else
                passwordImageX = n-1;

            setPuzzle(newPuzzle);

            setMoves(moves + 1);

            if(moves === 7) {
                doRetry(true);
                alert("Too many invalid attempts : Please try again !!");             
            }

            checkCompletion(newPuzzle);
        }
    };

    const movePieceDown = (x, y) => {
        if (!complete) {
            const newPuzzle = puzzle.map(row => row.slice());

            for(var row=0 ; row<n ; row++){
                for(var col=0 ; col<n ; col++){
                    if(row === 0)
                        newPuzzle[row][col] = puzzle[(n-1)%n][col];
                    else
                        newPuzzle[row][col] = puzzle[(row-1)%n][col];
                }
            }
            
            if(x === n-1)
                passwordImageX = 0;
            else
                passwordImageX = passwordImageX+1;

            setPuzzle(newPuzzle);

            setMoves(moves + 1);

            if(moves === 7) {
                doRetry(true);
                alert("Too many invalid attempts : Please try again !!");
            }

            checkCompletion(newPuzzle);
        }
    };

    const movePieceLeft = (x, y) => {
        if (!complete) {
            const newPuzzle = puzzle.map(row => row.slice());

            for(var col=0 ; col<n ; col++){
                for(var row=0 ; row<n ; row++){
                    newPuzzle[row][col] = puzzle[row][(col+1)%n];
                }
            }
            
            if(y !== 0)
                passwordImageY = passwordImageY-1;
            else
                passwordImageY = n-1;

            setPuzzle(newPuzzle);

            setMoves(moves + 1);

            if(moves === 7) {
                doRetry(true);
                alert("Too many invalid attempts : Please try again !!");
            }

            checkCompletion(newPuzzle);
        }
    };

    const movePieceRight = (x, y) => {
        if (!complete) {
            const newPuzzle = puzzle.map(row => row.slice());

            for(var col=0 ; col<n ; col++){
                for(var row=0 ; row<n ; row++){
                    if(col === 0)
                        newPuzzle[row][col] = puzzle[row][n-1];
                    else
                        newPuzzle[row][col] = puzzle[row][col-1];
                }
            }
            
            if(y === n-1)
                passwordImageY = 0;
            else
                passwordImageY = passwordImageY+1;

            setPuzzle(newPuzzle);

            setMoves(moves + 1);

            if(moves === 7) {
                doRetry(true);
                alert("Too many invalid attempts : Please try again !!");
            }

            checkCompletion(newPuzzle);
        }
    };

    const checkCompletion = puzzle => {
        // We need to make it equal to "X X X X X I X X X"
        const checkIdx = (designatedPositionX * n) + designatedPositionY;
        if (flattenArray(puzzle).join("")[checkIdx] === '5') {
            setComplete(true);
        }
    };

    const resetPuzzle = () => {
        setComplete(false);
        setPuzzle(getPuzzle());
        setMoves(0);
        doRetry(false);
    };

    return (
        <div className="Grid">
            {<h3>Moves: {moves}</h3>}
            <div
                style={{
                    display: "inline-block",
                    backgroundColor: "darkgray",
                    border: `5px solid ${complete ? "black" : "gray"}`,
                    borderRadius: 5,
                    padding: 5
                }}
            >
                {puzzle.map((row, i) => (
                    <div key={i} style={{ display: "flex" }}>
                        {row.map((col, j) => {
                            const color = "lightgray";
                            return (
                                <div
                                    key={`${i}-${j}`}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: 100,
                                        height: 100,
                                        margin: 2,
                                        backgroundColor: color,
                                        borderRadius: 5,
                                        userSelect: "none"
                                    }}
                                >
                                    {/* <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
                                        {col}
                                    </span> */}
                                    <span class="my-span" style={{ backgroundImage: `url(${urls[col]})`}}> </span>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            
            {/* Arrow Console Buttons */}
            {!complete && (<div class="up" onClick={() => movePieceUp(passwordImageX, passwordImageY)}> U </div>)}
            {!complete && (<div class="down" onClick={() => movePieceDown(passwordImageX, passwordImageY)}> D </div>)}
            {!complete && (<div class="left" onClick={() => movePieceLeft(passwordImageX, passwordImageY)}> L </div>)}
            {!complete && (<div class="right" onClick={() => movePieceRight(passwordImageX, passwordImageY)}> R </div>)}

            {complete && (<p class="success">LogIn Successful</p>)}
            {retry && resetPuzzle()}
        </div>
    );
}





