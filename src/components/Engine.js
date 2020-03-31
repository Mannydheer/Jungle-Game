import React from 'react';
import Player from './Player';
import styled from 'styled-components';
import Enemy from './Enemy';
import useInterval from './use-interval.hook';
import { TreeProvider } from './TreesContext';


export const Engine = React.createContext();

const EnemyProperties = {
    top: 200,
    left: 200,

}

const PlayerProperties = {
    playerAction: false, //for punch active.
    playerAmmunition: false,
    size: 500,
    top: 250,
    left: 700,
    health: 200,
    bananas: 0,
    //punch
    //will control where the punch will appear. 
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


    }
}


const EngineProvider = ({ children, name, password, bestTime }) => {

    const [character, SetCharacter] = React.useState({ ...PlayerProperties })
    const [monkeys, setMonkeys] = React.useState({ ...MonkeyStampede })
    const [treePos, settreePos] = React.useState({ ...TreeProperties })
    const [enemy, setEnemy] = React.useState({ ...EnemyProperties })
    const [fireCollision, setFireCollision] = React.useState(false);
    //can only fire once all the bananas have been collected. 
    const [enableBananaBullet, setEnableBananaBullet] = React.useState(false);


    let [bananaMovement, setbananaMovement] = React.useState({
        left: 0,
        top: 0,
    })
    const [allowFire, setallowFire] = React.useState(true);



    //no dmg shield active 
    const [stopDmg, setStopDmg] = React.useState(false);


    const [hitColor, sethitColor] = React.useState(false);

    //active punch when only playerAction is true
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
            setStopDmg,
            name,
            password,
            setbananaMovement,
            bananaMovement,
            allowFire,
            setallowFire,
            enableBananaBullet,
            setEnableBananaBullet

        }}>
            <div>
                <strong>{name}</strong>
            </div>
            <div><strong>Record Time:</strong>{bestTime}seconds</div>
            {/* healthBar */}
            <StyledHp>
                <StyledHealthText>Health</StyledHealthText>
                <div style={{ border: 'solid black 5px', backgroundColor: 'lightgreen', width: `${character.health}px`, height: '15px' }}></div>
            </StyledHp>
            <StyledHp>
                <StyledHealthText>Active Abilities:
                     {stopDmg ?
                        <StyledAbilities>🛡:
                            <div><strong>Shield is Active.</strong></div>
                            <div><strong>Duration:</strong> 10seconds</div>
                            <div><strong>Damage Taken:</strong> None</div>
                        </StyledAbilities> : <></>}
                    <StyledAbilities>
                        {fireCollision ?
                            <StyledStampede><strong>Stampede: press Q</strong>🐒🐒🐒🐒

                            </StyledStampede> : <span></span>}
                    </StyledAbilities>


                </StyledHealthText>
            </StyledHp>
            <StyledAttacks>
                <div>
                    <strong>Game Instructions</strong>
                    <div><strong>Movement:</strong></div>
                    <div><strong>↕</strong> Up - Down</div>
                    <div><strong>↔ </strong>Left - Right</div>
                    <div><strong>Press Q</strong> - Stampede</div>
                    <div><strong>Spacebar </strong>- Punch</div>

                </div>

            </StyledAttacks>



            <StyledGameBoard>
                <Board style={{
                }}>

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
                    </StyledHit> : <></>}

                        <Enemy></Enemy>
                    </TreeProvider>



                </Board>

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
font-size: 2em;
position: absolute;
left: 220px;
top: 62px;
`
const StyledHealthText = styled.span`
font-size: 2em;
`
const StyledAbilities = styled.span`
font-size: 0.7em;

`

const StyledStampede = styled.div`
font-size: 1em;

`

const StyledHp = styled.div`
display: flex;
justify-content: flex-end;
margin-right: 3%;
font-size: 0.5em;
text-align: center;


`

const StyledAttacks = styled.div`
display: flex;
justify-content: flex-end;
align-self: flex-end;
margin-top: 10%;
margin-right: 5%;
font-size: 0.8em;
text-align: center;


`



