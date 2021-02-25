import React, {useState} from "react";
import {Box, Button, OutlinedInput } from '@material-ui/core';
import { evaluate } from 'mathjs';
import firebase from "firebase";
import app from "../firebase";
import { useAuth } from "../context/AuthContext";

function Keypad() {
    const { user } = useAuth();
    const [equation, setEquation] = useState("");

    function handleChange(e) {
        setEquation(e.target.value);
    }

    function handleClick(char) {
        setEquation(equation + char);
    }

    function submit() {
        const submissionRef = app.database().ref("/submissions");
        const newSubmissionRef = submissionRef.push();
        const result = evaluate(equation);
        newSubmissionRef.set({
            answer: result,
            equation: equation,
            user: user.username,
            date: firebase.database.ServerValue.TIMESTAMP
        });
        setEquation(result);
    }

    return (
        <Box justifyContent={"center"}>
            <Box maxWidth={256} mx="auto">
                <OutlinedInput
                  fullWidth={true}
                  value={equation}
                  onChange={handleChange}
                  onKeyPress={event => {
                      if (event.key === 'Enter') {
                          submit();
                      }
                  }}
                />
            </Box>
            <Box display="flex" flexDirection="row" justifyContent={"center"}>
                <Button onClick={() => handleClick("7")} >
                    7
                </Button>
                <Button onClick={() => handleClick("8")} >
                    8
                </Button>
                <Button onClick={() => handleClick("9")} >
                    9
                </Button>
                <Button onClick={() => handleClick("/")} >
                    ÷
                </Button>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent={"center"}>
                <Button onClick={() => handleClick("4")} >
                    4
                </Button>
                <Button onClick={() => handleClick("5")} >
                    5
                </Button>
                <Button onClick={() => handleClick("6")} >
                    6
                </Button>
                <Button onClick={() => handleClick("*")} >
                    ×
                </Button>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent={"center"}>
                <Button onClick={() => handleClick("1")} >
                    1
                </Button>
                <Button onClick={() => handleClick("2")} >
                    2
                </Button>
                <Button onClick={() => handleClick("3")} >
                    3
                </Button>
                <Button onClick={() => handleClick("-")} >
                    -
                </Button>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent={"center"}>
                <Button onClick={() => handleClick("0")} >
                    0
                </Button>
                <Button onClick={() => handleClick(".")} >
                    .
                </Button>
                <Button onClick={submit} >
                    =
                </Button>
                <Button onClick={() => handleClick("+")} >
                    +
                </Button>
            </Box>
        </Box>
    )
}

export default Keypad;
