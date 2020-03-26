import React from 'react';
import { Engine } from './Engine';



const EachTree = ({ tree }) => {

    const { setFireCollision, treePos, settreePos, } = React.useContext(Engine)
    return (
        <div style={{ position: 'absolute', left: treePos.treePositions[tree].randomLeft, top: treePos.treePositions[tree].randomTop }}>
            {treePos.treePositions[tree].palmTree}
        </div>
    )


}


export default EachTree;