import React from 'react';
import styled from 'styled-components';
import Trees from './Trees';
import { Engine } from './Engine';
import Stampede from './Stampede';
import useInterval from './use-interval.hook';
import { TreeContext } from './TreesContext';



const Player = () => {


    const { setStopDmg, stopDmg,
        playerArea, sethitColor,
        SetCharacter, character,
        setFireCollision, fireCollision,
        setbananaMovement, bananaMovement,
        allowFire, setallowFire,
        enableBananaBullet
    } = React.useContext(Engine)

    const { handleBananaPositions } = React.useContext(TreeContext)

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


    //ammunition banana movement.

    let [ammunitionMoveLeft, setammunitionMoveLeft] = React.useState(0);
    let [ammunitionMoveTop, setammunitionMoveTop] = React.useState(0);


    console.log(bananaMovement, 'BANANAMOVEMENT')


    let [bananaPos, setbananaPos] = React.useState({
        bananaLeft: 0,
        bananaTop: 0,
        direction: null,
    });






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
                        bananaLeft: -32,
                        bananaTop: 0,
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
                        bananaLeft: 32,
                        bananaTop: 0,
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
                        bananaLeft: 0,
                        bananaTop: -32,
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
                        bananaLeft: 0,
                        bananaTop: 32,
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
                    playerAction: true //only when true is there dmg to the tiger(collision.)
                });
                break;
            }

            case 'KeyQ': {

                if (fireCollision) {
                    setstampedeAttack(true);
                }


                break
            }
            case 'KeyE': {


                // only enable shooting when all bananas have been collected...and when lion appears. 
                if (enableBananaBullet) {

                    //when E is pressed, you are allowed to fire
                    //immediately after set it to false... to not allow fireing until its reset back to true.

                    if (allowFire === true) {
                        setallowFire(false)
                        SetCharacter({
                            ...character,
                            playerAmmunition: true
                        });
                        setbananaPos({
                            ...bananaPos,
                            //direction holds the position WHEN E WAS PRESSED. 
                            direction: facing.current,
                            bananaLeft: character.left,
                            bananaTop: character.top
                        })

                    }

                }
            }

        }
    }
    //direction onf banana.....

    //banan ammunition
    useInterval(() => {

        //since this will only fire on false, E will remain 32 because another key cannot be pressed.
        //double check for allowFire condition...?
        if (bananaPos.direction === 32 && allowFire === false) {
            if (ammunitionMoveLeft > -500) {
                setammunitionMoveLeft(ammunitionMoveLeft -= 20)
                setbananaMovement({
                    //VERY IMPORTANT. ensure you whenever you are shooting, L,R,U,D,
                    //that you are keeping track of the positions player to update TOP,LEFT for collisions
                    ...bananaMovement,
                    left: ammunitionMoveLeft + character.left,
                    top: ammunitionMoveTop + character.top
                })
            }
            else {
                character.playerAmmunition = false;
                setammunitionMoveLeft(0);
                //need to reset the left banana pos. 
                setbananaPos({
                    ...bananaPos,
                    bananaLeft: character.left,
                    bananaTop: character.top,
                })
                //firing is allowed again when the ifstatement above is completed. 
                setallowFire(true)
            }
        }

        if (bananaPos.direction === 64 && allowFire === false) {
            if (ammunitionMoveLeft < 500) {
                setammunitionMoveLeft(ammunitionMoveLeft += 20)
                setbananaMovement({
                    ...bananaMovement,
                    left: ammunitionMoveLeft + character.left,
                    top: ammunitionMoveTop + character.top
                })

            }
            else {
                character.playerAmmunition = false;
                setammunitionMoveLeft(0);
                //need to reset the left banana pos. 
                setbananaPos({
                    ...bananaPos,
                    bananaLeft: character.left,
                    bananaTop: character.top,

                })
                setallowFire(true)

            }
        }
        if (bananaPos.direction === 96 && allowFire === false) {
            if (ammunitionMoveTop > -500) {
                setammunitionMoveTop(ammunitionMoveTop -= 20)
                setbananaMovement({
                    ...bananaMovement,
                    top: ammunitionMoveTop + character.top,
                    left: ammunitionMoveLeft + character.left,

                })

            }
            else {
                character.playerAmmunition = false;
                setammunitionMoveTop(0);
                //need to reset the left banana pos. 
                setbananaPos({
                    ...bananaPos,
                    bananaLeft: character.left,
                    bananaTop: character.top,
                })
                setallowFire(true)

            }
        }
        if (bananaPos.direction === 0 && allowFire === false) {
            if (ammunitionMoveTop < 500) {
                setammunitionMoveTop(ammunitionMoveTop += 20)
                setbananaMovement({
                    ...bananaMovement,
                    top: ammunitionMoveTop + character.top,
                    left: ammunitionMoveLeft + character.left,

                })

            }
            else {
                character.playerAmmunition = false;
                setammunitionMoveTop(0);
                //need to reset the left banana pos. 
                setbananaPos({
                    ...bananaPos,
                    bananaLeft: character.left,
                    bananaTop: character.top,
                })
                setallowFire(true)

            }
        }
    }, 100);






    //iterating through sprites.
    React.useEffect(() => {
        if (facing.current === facing.previous) {
            setStep(previousState => (
                previousState < MAXSTEPS - 1 ? previousState + 1 : 0))
        } else {
            setStep(0)
        }
    }, [facing]);

    //listnening for anykeydown - calls function to handle keydowns. 
    React.useEffect(() => {
        window.addEventListener('keydown', handleMovement);
        return () => {
            window.removeEventListener('keydown', handleMovement);
        }
    }, [character]);
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

            {character.playerAmmunition ? <StyledHit
                style={{
                    width: 32,
                    height: 32,
                    position: 'absolute',
                    left: `${bananaPos.bananaLeft + ammunitionMoveLeft}px`,
                    top: `${bananaPos.bananaTop + ammunitionMoveTop}px`,
                }}>
                🍌
                    </StyledHit> : <></>}

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


const StyledHit = styled.div`


`
