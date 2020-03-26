import React from 'react';
import styled from 'styled-components';
import Trees from './Trees';
import { Engine } from './Engine';
import Stampede from './Stampede';
import useInterval from './use-interval.hook';



const MAXSTEPS = 3;
const WALKSIZE = 32;
const Player = () => {


    const { playerArea, sethitColor, monkeys, setMonkeys, SetCharacter, character, setFireCollision, fireCollision } = React.useContext(Engine)
    const offset = { top: 0, left: 0 } //controlling png file. 

    const [rotate, setRotate] = React.useState({
        currentRotate: 0,
        previousRotate: 0,
    });
    const [facing, setFacing] = React.useState({
        current: 0,
        previous: 0,
    });
    const [step, setStep] = React.useState(0);
    const [health, setHealth] = React.useState(100);
    const [power, setpowerUp] = React.useState(false);
    const [stampedeAttack, setstampedeAttack] = React.useState(false);
    let [moveStampede, setmoveStampede] = React.useState(0)

    // const [hitBool, sethitBool] = React.useState(false);
    // const [hitColor, sethitColor] = React.useState(false);
    // const backgroundColor = hitColor ? "red" : "blue";


    const HOP_LENGTH = 15;


    useInterval(() => {
        if (stampedeAttack) {
            if (moveStampede < 950) {
                console.log(moveStampede)
                setmoveStampede(moveStampede += 30)
            }
            else {
                setFireCollision(false);
            }
        }
    }, 500);

    const handleMovement = (event) => {
        switch (event.code) {
            case 'ArrowLeft': {
                if (character.left > 0) {
                    let moveLeft = character.left - HOP_LENGTH;
                    SetCharacter({
                        ...character,
                        left: moveLeft,
                        hitradiusLeft: -32,
                        hitradiusTop: 0,
                    })
                    setFacing(prevState => ({
                        current: 32,
                        previous: prevState.current
                    }))
                }
                break;
            }
            case 'ArrowRight': {

                if (character.left < 1180 - 220) {
                    let moveRight = character.left + HOP_LENGTH;
                    SetCharacter({
                        ...character,
                        left: moveRight,
                        hitradiusLeft: 32,
                        hitradiusTop: 0,
                    })
                    setFacing(prevState => ({
                        current: 64,
                        previous: prevState.current
                    }))
                }
                break;
            }
            case 'ArrowUp': {

                if (character.top > 0) {
                    let moveUp = character.top - HOP_LENGTH;
                    SetCharacter({
                        ...character, top: moveUp,
                        hitradiusLeft: 0,
                        hitradiusTop: -32,
                    })
                    setFacing(prevState => ({
                        current: 96,
                        previous: prevState.current,
                    }))
                }
                break;
            }
            case 'ArrowDown': {

                if (character.top < 650) {
                    let moveDown = character.top + HOP_LENGTH;
                    SetCharacter({
                        ...character,
                        top: moveDown,
                        hitradiusLeft: 0,
                        hitradiusTop: 32,
                    })
                    setFacing(prevState => ({
                        current: 0,
                        previous: prevState.current
                    }))
                }
                break;
            }
            case 'Space': {
                sethitColor(true);
                SetCharacter({
                    ...character,
                    playerAction: true
                });
                handleHeadBump();
                break;
            }

            case 'KeyQ': {
                if (fireCollision) {
                    setstampedeAttack(true);
                }
                break
            }

        }
    }
    React.useEffect(() => {
        if (facing.current === facing.previous) {
            setStep(previousState => (
                previousState < MAXSTEPS - 1 ? previousState + 1 : 0))
        } else {
            setStep(0)
        }
    }, [facing]);

    React.useEffect(() => {
        window.addEventListener('keydown', handleMovement);
        return () => {
            window.removeEventListener('keydown', handleMovement);
        }
    }, [character]);

    const handlePowerBoost = () => {
        let randomLeft = Math.round((Math.random() * (980) + 0) / 10) * 10
        let randomTop = Math.round((Math.random() * (650 - 1) + 1) / 10) * 10
        let boost = '💥';
        SetCharacter({
            ...character,
            power: { boost, randomLeft, randomTop }
        })
        setpowerUp(true);
    }

    React.useEffect(() => {
        (handlePowerBoost());
    }, []);

    const handleHeadBump = () => {

    }

    return (
        <React.Fragment>
            <div style={{ width: '100px' }}></div>
            <StyledHp>
                <div style={{ border: 'solid black 5px', backgroundColor: 'lightgreen', width: `${character.health}px`, height: '30px' }}></div>
            </StyledHp>

            {/* rendering player */}
            <StyledPlayer
                ref={playerArea}
                style={{
                    position: 'absolute',
                    left: `${character.left}px`,
                    top: `${character.top}px`,
                    width: 32,
                    height: 32,
                    background: `url(/monkey.png) -${offset.top + step * 32}px -${offset.left + facing.current}px`
                }}
            >
            </StyledPlayer>

            <Trees moveStampede={moveStampede} power={power} setpowerUp={setpowerUp} character={character}></Trees>
            {power ? <div style={{ position: 'absolute', left: character.power.randomLeft, top: character.power.randomTop }}>
                {character.power.boost}</div> : <span></span>}

            {stampedeAttack && fireCollision ? <StyleStampede style={{ position: 'absolute', left: moveStampede }}>

                <Stampede></Stampede>
            </StyleStampede> : <span></span>}

        </React.Fragment>



    )

}

export default Player;


const StyledPlayer = styled.div`
overflow: hidden;



`

const StyleStampede = styled.div`
width: 100px;
height: 200px;

`

const StyledHp = styled.div`
display: flex;
justify-content: flex-end;
font-size: 0.5em;
text-align: center;


`



