import React from 'react';
import { Engine } from './Engine';
import EachTree from './EachTree';
import { TreeContext } from './TreesContext';


const Trees = ({ setStopDmg, stopDmg, setBarrier, moveStampede, setShield, shield, setpowerUp, power, }) => {

    //Hooks
    const { setFireCollision, treePos, settreePos, character } = React.useContext(Engine)
    const { actions: { updatePositions } } = React.useContext(TreeContext)

    // const [treePos, settreePos] = React.useState({ ...TreeProperties })
    const [treeAllower, settreeAllower] = React.useState(false)
    let [count, setCount] = React.useState(0);

    console.log(treePos)
    //Generate random trees
    React.useEffect(() => {
        let allTrees = Object.keys(treePos.treePositions);
        let palmTree = '🍌';
        allTrees.forEach((tree, index) => {
            let randomLeft = Math.round((Math.random() * (980) + 0) / 10) * 10;
            let randomTop = Math.round((Math.random() * (650 - 1) + 1) / 10) * 10;
            let treeOn = true;
            treePos.treePositions[tree] = { palmTree, randomLeft, randomTop, treeOn }
            updatePositions({ id: `tree-${index}`, x: treePos.treePositions[tree].randomLeft, y: treePos.treePositions[tree].randomTop })

        })
        settreeAllower(true)

    }, []);
    //Collision Checker. 

    React.useEffect(() => {
        const bananaCollision = (thisCharacter, theseTrees, move) => {
            theseTrees.forEach(tree => {
                let widthLeft = treePos.treePositions[tree].randomLeft - 30;
                let widthRight = treePos.treePositions[tree].randomLeft + 30;
                let heightTop = treePos.treePositions[tree].randomTop - 25;
                let heightBottom = treePos.treePositions[tree].randomTop + 25;
                if ((thisCharacter.top >= heightTop && thisCharacter.top <= heightBottom && thisCharacter.left >= widthLeft && thisCharacter.left <= widthRight) && (treePos.treePositions[tree].treeOn === true)) {
                    treePos.treePositions[tree].treeOn = false;
                    settreePos({
                        ...treePos,
                    });
                }
            })
        }
        //tree COllision
        let allTrees = Object.keys(treePos.treePositions);
        bananaCollision(character, allTrees, moveStampede)

        //PowerCollision
        if (power) {
            let powerPositionLeft = character.power.randomLeft - 30;
            let powerPositionRight = character.power.randomLeft + 30;
            let powerPositionTop = character.power.randomTop - 25;
            let powerPositionBottom = character.power.randomTop + 25;

            if (character.top >= powerPositionTop
                && character.top <= powerPositionBottom
                && character.left >= powerPositionLeft
                && character.left <= powerPositionRight) {
                setFireCollision(true);
                setpowerUp(false);
            }
        }

        // shield collision
        if (shield) { //if shield is active
            let shieldPositionLeft = character.shield.shieldLeft - 30;
            let shieldPositionRight = character.shield.shieldLeft + 30;
            let shieldPositionTop = character.shield.shieldTop - 25;
            let shieldPositionBottom = character.shield.shieldTop + 25;



            if (character.top >= shieldPositionTop
                && character.top <= shieldPositionBottom
                && character.left >= shieldPositionLeft
                && character.left <= shieldPositionRight) {


                character.shield.shieldLeft = 0;
                character.shield.shieldTop = 0;
                setShield(false)
                setBarrier(true)
                setStopDmg(true)



            }

        }


    }, [character]); //avoid do it on multiple states conditions

    //COUNTER OF BANANAS
    React.useEffect(() => {
        Object.keys(treePos.treePositions).forEach(tree => {
            if (treePos.treePositions[tree].treeOn === false) {
                setCount(count + 1)
            }
        })

    }, [treePos]);
    //COUNT WINNER CHECKER.
    React.useEffect(() => {
        if (count === 10) {
            window.alert('WINNER')
        }
    }, [count]);




    return (
        <div>
            {treeAllower ?
                Object.keys(treePos.treePositions).map(tree => {
                    //only show that particular tree
                    if (treePos.treePositions[tree].treeOn === true) {
                        return <EachTree tree={tree}></EachTree>
                    }
                }) : <div></div>}

            <div>Bananas Collected:
                 {

                } {count}
            </div>



        </div>

    )


}

export default Trees;