import React from 'react';
import styled from 'styled-components';
import { render } from '@testing-library/react';


const ScoreBoard = () => {

    //state that keeps track of all users.
    const [all, setAll] = React.useState();
    const [fetchComplete, setfetchComplete] = React.useState(false);



    const handleScores = () => {


        fetch(`http://localhost:4000/scores`, {
            method: "get",
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })
            .then(data => {
                return data.json();
            })
            .then(allUsers => {
                setAll(allUsers)
                setfetchComplete(true);

            })


    }

    //call function to fetch and aget all users. 
    handleScores();


    return (
        <React.Fragment>
            <StyledScoreBoard>
                {/* only when fetch is complete, true and will render */}
                {fetchComplete ?
                    all.map(element => {
                        return <StyledText key={element.id}>
                            <strong>{element.username} - </strong>
                            {element.time} seconds
                    </StyledText>

                    })
                    : <></>}
            </StyledScoreBoard>



        </React.Fragment>

    )

}


export default ScoreBoard


const StyledScoreBoard = styled.div`
font-size: 2em;
text-align: center;

`

const StyledText = styled.div`
border: solid black 1px;
margin: 0;
padding: 0;

`