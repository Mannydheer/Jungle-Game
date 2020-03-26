import React from 'react';
import { Engine } from './Engine';
import useInterval from './use-interval.hook';
import Tiger from './Tiger';



let Tigers = {
    tigerHp: 40,
    tigerPos: {
        tiger1: null,
        tiger2: null,
        tiger3: null,
        tiger4: null,
        tiger5: null,


    }

}


const Enemy = () => {


    const { SetCharacter, character, enemy, setEnemy } = React.useContext(Engine)





    const [enemyPos, setenemyPos] = React.useState(20)
    const [maxMovement, setmaxMovement] = React.useState(1)
    const [tigerLife, settigerLife] = React.useState(true)
    const [tigerProperties, settigerProperties] = React.useState({ ...Tigers })
    const [tigerAllower, settigerAllower] = React.useState(false);
    const [danger, setDanger] = React.useState(false);
    const [offSet, setoffSet] = React.useState(64)



    console.log(tigerProperties)



    let allTigers = Object.keys(tigerProperties.tigerPos);

    React.useEffect(() => {
        let tigerIcon = '🐅';
        allTigers.forEach(tiger => {
            let randomLeft = Math.round((Math.random() * (980) + 0) / 10) * 10;
            let randomTop = Math.round((Math.random() * (650 - 1) + 1) / 10) * 10;
            let tigerOn = true;
            let tigerHp = 40;
            let dangerZone = false;
            tigerProperties.tigerPos[tiger] = { tigerIcon, randomLeft, randomTop, tigerOn, tigerHp, dangerZone }
        })
        settigerAllower(true)

    }, []);
    //array of list of movements. 

    // let tigerSpriteRight = 288;
    // let tigerSpriteLeft = 240;
    // let maxTigerHop = 10;
    // let animationIndex = 0;

    // const TigerMovements = [
    //     {
    //         sprite: tigerSpriteRight,
    //         moveAmount: maxTigerHop,
    //     },
    //     {
    //         sprite: tigerSpriteRight,
    //         moveAmount: maxTigerHop,
    //     },
    //     {
    //         sprite: tigerSpriteRight,
    //         moveAmount: maxTigerHop,
    //     },
    // ]


    console.log(maxMovement)
    useInterval(() => {
        allTigers.forEach(tiger => {
            let tigerSpriteRight = 288;
            let tigerSpriteLeft = 240;
            let maxTigerHop = 10;
            if (maxMovement === 1) {
                setmaxMovement(2)
                tigerProperties.tigerPos[tiger].randomLeft += maxTigerHop * 2
                setoffSet(tigerSpriteRight)
            }
            else if (maxMovement === 2) {
                setmaxMovement(3)
                tigerProperties.tigerPos[tiger].randomLeft += maxTigerHop
                setoffSet(tigerSpriteRight)
            }
            else if (maxMovement === 3) {
                setmaxMovement(4)
                tigerProperties.tigerPos[tiger].randomLeft += maxTigerHop
                setoffSet(tigerSpriteRight)
            }
            else if (maxMovement === 4) {
                setmaxMovement(5)

                tigerProperties.tigerPos[tiger].randomLeft -= maxTigerHop
                setoffSet(tigerSpriteLeft)
            }
            else if (maxMovement === 5) {
                setmaxMovement(6)
                tigerProperties.tigerPos[tiger].randomLeft -= maxTigerHop
                setoffSet(tigerSpriteLeft)
            }
            else if (maxMovement === 6) {
                setmaxMovement(7)
                tigerProperties.tigerPos[tiger].randomLeft -= maxTigerHop
                setoffSet(tigerSpriteLeft)
            }
            else if (maxMovement === 7) {
                setmaxMovement(1)
                tigerProperties.tigerPos[tiger].randomLeft -= maxTigerHop
                setoffSet(tigerSpriteLeft)
            }
        });
    }, 300);



    //collision for each tiger. 
    React.useEffect(() => {

        console.log(character.playerAction, 'P[LAYERACTION')

        let hitPositionLeft = character.left + character.hitradiusLeft;
        let hitPositionTop = character.top + character.hitradiusTop;



        allTigers.forEach(tiger => {

            let tigerLeft = tigerProperties.tigerPos[tiger].randomLeft - 30;
            let tigerRight = tigerProperties.tigerPos[tiger].randomLeft + 30;
            let tigerTop = tigerProperties.tigerPos[tiger].randomTop - 25;
            let tigerBottom = tigerProperties.tigerPos[tiger].randomTop + 25;
            if (
                hitPositionLeft >= tigerLeft
                && hitPositionLeft <= tigerRight
                && hitPositionTop >= tigerTop
                && hitPositionTop <= tigerBottom
                && character.playerAction === true) {

                tigerProperties.tigerPos[tiger].tigerHp -= 20;

                if (tigerProperties.tigerPos[tiger].tigerHp === 20) {
                    tigerProperties.tigerPos[tiger].dangerZone = true;
                }

                if (tigerProperties.tigerPos[tiger].tigerHp === 0) {
                    tigerProperties.tigerPos[tiger].tigerOn = false;
                }


            }


            //collision for THE PLAYER HP.

            if (
                character.left >= tigerLeft
                && character.left <= tigerRight
                && character.top >= tigerTop
                && character.top <= tigerBottom
            ) {
                character.health -= 20;

                if (character.health === 0) {
                    window.alert("DEAD")
                }
            }

        });
    }, [character])


    return (<div>


        {tigerAllower ?
            Object.keys(tigerProperties.tigerPos).map(tiger => {
                //only show that particular tree
                if (tigerProperties.tigerPos[tiger].tigerOn === true) {
                    return <Tiger offSet={offSet} danger={danger} tiger={tiger} tigerProperties={tigerProperties}></Tiger>
                }
            }) : <div>
            </div>}




    </div>)


}


export default Enemy;