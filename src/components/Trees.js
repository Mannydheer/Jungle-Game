import React from 'react';
import { Engine } from './Engine';
import EachTree from './EachTree';


const Trees = ({ moveStampede, setpowerUp, power, character }) => {

    //Hooks
    const { setFireCollision, treePos, settreePos, } = React.useContext(Engine)

    // const [treePos, settreePos] = React.useState({ ...TreeProperties })
    const [treeAllower, settreeAllower] = React.useState(false)
    let [count, setCount] = React.useState(0);



    //Generate random trees
    React.useEffect(() => {
        let allTrees = Object.keys(treePos.treePositions);
        let palmTree = '🍌';
        allTrees.forEach(tree => {
            let randomLeft = Math.round((Math.random() * (980) + 0) / 10) * 10;
            let randomTop = Math.round((Math.random() * (650 - 1) + 1) / 10) * 10;
            let treeOn = true;
            treePos.treePositions[tree] = { palmTree, randomLeft, randomTop, treeOn }
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
    }, [character]);
    React.useEffect(() => {
        Object.keys(treePos.treePositions).forEach(tree => {
            if (treePos.treePositions[tree].treeOn === false) {
                setCount(count + 1)
            }
        })

    }, [treePos]);


    return (
        <div>
            {treeAllower ?
                Object.keys(treePos.treePositions).map(tree => {
                    //only show that particular tree
                    if (treePos.treePositions[tree].treeOn === true) {
                        return <EachTree tree={tree}></EachTree>
                    }
                }) : <div></div>}

            <div>bananas Collected:
                 {

                } {count}
            </div>



        </div>

    )


}

export default Trees;