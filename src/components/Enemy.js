import React from 'react';
import { Engine } from './Engine';
import useInterval from './use-interval.hook';
import Tiger from './Tiger';
import { TreeContext } from './TreesContext';



let Tigers = {
    tigerHp: 40,
    tigerPos: {
        tiger1: { tigerIcon: null, randomLeft: 0, randomTop: 0 },
        tiger2: { tigerIcon: null, randomLeft: 0, randomTop: 0 },
        tiger3: { tigerIcon: null, randomLeft: 0, randomTop: 0 },
        tiger4: { tigerIcon: null, randomLeft: 0, randomTop: 0 },
        tiger5: { tigerIcon: null, randomLeft: 0, randomTop: 0 },
        tiger6: { tigerIcon: null, randomLeft: 0, randomTop: 0 },
        tiger7: { tigerIcon: null, randomLeft: 0, randomTop: 0 },
        tiger8: { tigerIcon: null, randomLeft: 0, randomTop: 0 },
        tiger9: { tigerIcon: null, randomLeft: 0, randomTop: 0 },
        tiger10: { tigerIcon: null, randomLeft: 0, randomTop: 0 },
    }

}


const Enemy = () => {


    const { stopDmg, treePos, SetCharacter, character, enemy, setEnemy } = React.useContext(Engine)
    const { treeState } = React.useContext(TreeContext)




    const [enemyPos, setenemyPos] = React.useState(20)
    const [maxMovement, setmaxMovement] = React.useState(1)
    const [tigerLife, settigerLife] = React.useState(true)
    const [tigerProperties, settigerProperties] = React.useState({ ...Tigers })
    const [tigerAllower, settigerAllower] = React.useState(false);
    const [danger, setDanger] = React.useState(false);
    const [offSet, setoffSet] = React.useState(288)

    let allTigers = Object.keys(tigerProperties.tigerPos);

    React.useEffect(() => {
        let tigerIcon = '🐅';

        if (treeState.treePositions.length > 0) {
            allTigers.forEach((tiger, index) => {
                let randomLeft = treeState.treePositions[index].x - 20
                let randomTop = treeState.treePositions[index].y + 30
                let tigerOn = true;
                let tigerHp = 40;
                let dangerZone = false;
                tigerProperties.tigerPos[tiger] = { tigerIcon, randomLeft, randomTop, tigerOn, tigerHp, dangerZone }
            })
            settigerAllower(true)
        }


    }, [treeState]);



    useInterval(() => {
        allTigers.forEach(tiger => {
            let tigerSpriteRight = 288;
            let tigerSpriteLeft = 240;
            let tigerSpriteTop = 336
            let tigerSpriteBottom = 192
            let maxTigerHop = 10;

            //right movement.-------------------------------------------
            if (maxMovement >= 1 && maxMovement <= 3) {
                setmaxMovement(maxMovement + 1)
                tigerProperties.tigerPos[tiger].randomLeft += maxTigerHop
                setoffSet(tigerSpriteRight)
            }

            //top movement.-------------------------------------------
            if (maxMovement >= 4 && maxMovement <= 7) {
                setmaxMovement(maxMovement + 1)
                tigerProperties.tigerPos[tiger].randomTop -= maxTigerHop
                setoffSet(tigerSpriteTop)
            }

            // //left movement-------------------------------------------
            if (maxMovement >= 8 && maxMovement <= 10) {
                setmaxMovement(maxMovement + 1)
                tigerProperties.tigerPos[tiger].randomLeft -= maxTigerHop
                setoffSet(tigerSpriteLeft)
            }
            // //bottom mvoement -------------------------------------------

            if (maxMovement >= 11 && maxMovement <= 14) {
                setmaxMovement(maxMovement + 1)
                tigerProperties.tigerPos[tiger].randomTop += maxTigerHop
                setoffSet(tigerSpriteBottom)
            }

            if (maxMovement === 15) {
                setmaxMovement(1)
            }


        });
    }, 100);



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



            //fist hit collision
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
                    tigerProperties.tigerPos[tiger].randomLeft = 0;
                    tigerProperties.tigerPos[tiger].randomTop = 0;
                    tigerProperties.tigerPos[tiger].tigerOn = false;
                }


            }

            //collision for THE PLAYER HP.
            if (stopDmg === false) {
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