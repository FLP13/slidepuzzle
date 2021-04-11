import styled from 'styled-components';

import { shuffle, isSolved } from '../helper';

import { useState, useEffect, useCallback } from 'react';

export const PuzzleArea = ({rows, columns}) => {

    const [puzzle, setPuzzle] = useState([])
    const [solved, setSolved] = useState(false);

    const generatePuzzle = useCallback(() => {
        // Create an array from N to rows*columns
        let generatedPuzzle = Array.from({length: rows*columns}, (_, i) => i+1);

        // replace last number with "X"
        generatedPuzzle = generatedPuzzle.map(number => number === rows*columns ? 'X' : number);

        // Shuffle numbers and X
        generatedPuzzle = shuffle(generatedPuzzle);
        
        // Give each number or X coordinates
        let index = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                generatedPuzzle[index] = { value: generatedPuzzle[index], x: i, y: j }
                index++;
            }
        }

        // Set the puzzle
        setPuzzle(generatedPuzzle);

        // Check if the puzzle is solved, if it is, generate a new puzzle
        if (isSolved(generatedPuzzle)) {
            generatePuzzle(rows, columns);
        }
        setSolved(false);
    }, [rows, columns]) 

    useEffect(() => {
        generatePuzzle();
    }, [generatePuzzle])

    const movePiece = (currentPiece) => {

        // Find the X-piece
        const openPiece = puzzle.find(piece => piece.value === 'X');
        
        // Go through each puzzle piece, find the puzzle pieces which is on the same axis
        // as the piece you clicked and the X-piece, if the pieces between have a bigger bigger X or Y axis
        // than the piece you clicked then increment the X or Y axis, if not then decrement.
        // and then put the X-piece where the piece you clicked was on
        const newPuzzle = puzzle.map(piece => {
            if (piece.x === currentPiece.x && piece.x === openPiece.x) {
                if (piece.y >= currentPiece.y && piece.y < openPiece.y) {
                    return { value: piece.value, x: piece.x, y: piece.y+1 }
                } else if (piece.y <= currentPiece.y && piece.y > openPiece.y) {
                    return { value: piece.value, x: piece.x, y: piece.y-1 }
                } else if (piece.value === 'X') {
                    return {value: 'X', x: piece.x, y: currentPiece.y}
                } else {
                    return piece;
                }
            } else if (piece.y === currentPiece.y && piece.y === openPiece.y) {
                if (piece.x >= currentPiece.x && piece.x < openPiece.x) {
                    return { value: piece.value, x: piece.x+1, y: piece.y }
                } else if (piece.x <= currentPiece.x && piece.x > openPiece.x) {
                    return { value: piece.value, x: piece.x-1, y: piece.y }
                } else if (piece.value === 'X') {
                    return {value: 'X', x: currentPiece.x, y: piece.y}
                } else {
                    return piece;
                }
            } else {
                return piece;
            }
        })
        setPuzzle(newPuzzle);

        // Check if the puzzle is solved
        setSolved(isSolved(newPuzzle));
    }


    return (
        <OutterWrapper>
                <InnerWrapper rows={rows} columns={columns}>
                    {
                        puzzle.map(piece => {
                            if (piece.value === 'X') return <span key={piece.value} />
                            return (
                                    <PuzzlePiece 
                                        key={piece.value} 
                                        onClick={() => movePiece(piece)} 
                                        x={piece.x} 
                                        y={piece.y}
                                        solved={solved}
                                    >
                                        { piece.value }
                                    </PuzzlePiece>
                                )
                        })
                    }
                </InnerWrapper>
                <FooterWrapper>
                        {
                            solved && <p>Grattis du vann! :D</p>
                        }
                    <Button onClick={() => generatePuzzle(rows, columns)}>
                        { solved ? 'Nytt spel' : 'Slumpa' }
                    </Button>
                </FooterWrapper>
        </OutterWrapper>
    )
}

// Styled Components
const OutterWrapper = styled.div`
    font-family: 'Anton', sans-serif;
`

const InnerWrapper = styled.div`
    position: relative;
    background: lightgray;
    width: ${props => `${props.rows}05px` };
    height: ${props => `${props.columns}05px` };;
    margin: 0 auto;
`

const PuzzlePiece = styled.button`
    width: 95px;
    height: 95px;
    background: ${props => props.solved ? 'green' : '#add8e6'}; ;
    color: white;
    border: 1px solid black;
    border-radius: 10px;

    position: absolute;
    left: ${props => props.x === 0 ? '5px' : `${props.x}05px`};
    top: ${props => props.y === 0 ? '5px' : `${props.y}05px`};

    transition: left 0.5s, top 0.5s;
`
const FooterWrapper = styled.div`
    margin-top: 21px;
    text-align: center;
`

const Button = styled.button`
    width: 200px;
    height: 50px;
    background: darkblue;
    color: white;
`