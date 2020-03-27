import React from 'react';
import Player from './Player';
import styled from 'styled-components';
import Enemy from './Enemy';
import useInterval from './use-interval.hook';
import {TreeProvider} from './TreesContext';


export const Engine = React.createContext();

const EnemyProperties = {
    top: 200,
    left: 200,

}

const PlayerProperties = {
    playerAction: false,
    size: 500,
    top: 250,
    left: 700,
    health: 200,
    bananas: 0,
    hitradiusTop: 32,
    hitradiusLeft: 0,

}

const MonkeyStampede = {
    Monkeys: {
        monkey1: '🐒',
        monkey2: '🐒',
        monkey3: '🐒',
        monkey4: '🐒'
    }

}
let TreeProperties = {
    positionLeft: 900,
    positionTop: 100,
    treePositions: {
        tree1: null,
        tree2: null,
        tree3: null,
        tree4: null,
        tree5: null,
        tree6: null,
        tree7: null,
        tree8: null,
        tree9: null,
        tree10: null,
    }
}


const EngineProvider = ({ children }) => {

    const [character, SetCharacter] = React.useState({ ...PlayerProperties })
    const [monkeys, setMonkeys] = React.useState({ ...MonkeyStampede })
    const [treePos, settreePos] = React.useState({ ...TreeProperties })
    const [enemy, setEnemy] = React.useState({ ...EnemyProperties })
    const [fireCollision, setFireCollision] = React.useState(false);

    //no dmg shield active 
    const [stopDmg, setStopDmg] = React.useState(false);

    

    const [hitColor, sethitColor] = React.useState(false);

    useInterval(() => {
        if (character.playerAction) {
            character.playerAction = false;
        }
    }, 100);


    return (

        <Engine.Provider value={{
            enemy, setEnemy,
            treePos, settreePos,
            fireCollision,
            monkeys, setMonkeys,
            SetCharacter, character,
            setFireCollision,
            sethitColor,
            stopDmg,
            setStopDmg
        }}>
            <StyledGameBoard>
                <Board style={{
                }}>

{/* provider here. provider has reducers, provider will have initial state. array of tree positions. */}
<TreeProvider>


                    <Player></Player>
                    {character.playerAction ? <StyledHit
                        style={{
                            width: 32,
                            height: 32,
                            position: 'absolute',
                            left: `${character.left + character.hitradiusLeft}px`,
                            top: `${character.top + character.hitradiusTop}px`,
                        }}>
                        👊
                     

                    </StyledHit> : <span></span>}

                    <Enemy></Enemy>
      </TreeProvider>



                </Board>
                {fireCollision ? <StyledStampede>STAMPEDE READY: 🐒</StyledStampede> : <span></span>}

            </StyledGameBoard>

            {children}

        </Engine.Provider>




    )

}

export default EngineProvider;

const Board = styled.div`
height: 700px;
width: 1000px;
background-color: green;
overflow: hidden,

`
const StyledHit = styled.div`


`
const StyledGameBoard = styled.div`
font-size: 40px;
position: absolute;
left: 220px;
top: 0px;

`

const StyledStampede = styled.div`
font-size: 20px;
position: absolute;
left: 0;
`



