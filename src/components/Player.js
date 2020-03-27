import React from 'react';
import styled from 'styled-components';
import Trees from './Trees';
import { Engine } from './Engine';
import Stampede from './Stampede';
import useInterval from './use-interval.hook';
import useTimeout from './useTimeout-hook';


const Player = () => {


    const { setStopDmg, stopDmg, playerArea, sethitColor, SetCharacter, character, setFireCollision, fireCollision } = React.useContext(Engine)
    const offset = { top: 0, left: 0 } //controlling png file. 
    const [facing, setFacing] = React.useState({
        current: 0,
        previous: 0,
    });
    const [step, setStep] = React.useState(0);
    const [power, setpowerUp] = React.useState(false);
    //shields
    const [shield, setShield] = React.useState(false);
    const [barrier, setBarrier] = React.useState(false);

    const [stampedeAttack, setstampedeAttack] = React.useState(false);
    let [moveStampede, setmoveStampede] = React.useState(0)



    const HOP_LENGTH = 15;
    const MAXSTEPS = 3;

    //BARRIER CHECKER.



    React.useEffect(() => {

        if (barrier === true) {
            const timer = setTimeout(() => {
                setBarrier(false);
                setStopDmg(false)
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [barrier]);




    //FOR STAMPEDE ABILITY. 
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
    }, 5000);

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
    console.log(character)
    //---------------------POWER BOOST -------------------------
    const handlePowerShield = () => {
        let randomLeft = Math.round((Math.random() * (980) + 0) / 10) * 10
        let randomTop = Math.round((Math.random() * (650 - 1) + 1) / 10) * 10
        let shieldLeft = randomLeft + 50;
        let shieldTop = randomTop + 50;
        let boost = '💥';
        let shield = '🛡';


        SetCharacter({
            ...character,
            power: { boost, randomLeft, randomTop },
            shield: { shield, shieldLeft, shieldTop }
        })
        setpowerUp(true);
        setShield(true);
    }

    //---------------------SHEILD -------------------------

    React.useEffect(() => {
        //calls shield and powerBoost
        (handlePowerShield())

    }, []);





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
                {barrier ? <div
                    style={{
                        backgroundColor: 'transparent',
                        width: '35px', height: '35px',
                        borderRadius: '50%',
                        border: 'solid 2px black'
                    }}>

                </div> : <></>}
            </StyledPlayer>

            <Trees setBarrier={setBarrier}
                moveStampede={moveStampede}
                power={power} setpowerUp={setpowerUp}
                character={character}
                setShield={setShield}
                shield={shield}
                stopDmg={stopDmg}
                setStopDmg={setStopDmg}
            >
            </Trees>
            {
                power ? <div style={{ position: 'absolute', left: character.power.randomLeft, top: character.power.randomTop }}>
                    {character.power.boost}</div> : <span></span>
            }
            {
                shield ? <div style={{ position: 'absolute', left: character.shield.shieldLeft, top: character.shield.shieldTop }}>
                    {character.shield.shield}</div> : <span></span>
            }

            {
                stampedeAttack && fireCollision ? <StyleStampede style={{ position: 'absolute', left: moveStampede }}>

                    <Stampede></Stampede>
                </StyleStampede> : <span></span>
            }

        </React.Fragment >



    )

}

export default Player;


const StyledPlayer = styled.div`



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



