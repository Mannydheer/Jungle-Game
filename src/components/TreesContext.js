import React from 'react';
import { createContext } from 'react';


export const TreeContext = createContext();


const InitialStatePosition = {
    treePositions: [

    ],
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'update-tree-positions': {
            let treePosArray = [...state.treePositions];
            treePosArray.push(action.treePositions)

            return {
                treePositions: treePosArray,
            }
        }

        default:

    }


}

//--------------------
export const TreeProvider = ({ children }) => {

    const [treeState, dispatch] = React.useReducer(reducer, InitialStatePosition)
    const updatePositions = (treePositions) => {
        dispatch({
            type: 'update-tree-positions',
            treePositions
        })


    }





    return (
        <TreeContext.Provider value={{
            treeState,
            actions: { updatePositions },
        }}>

            {children}



        </TreeContext.Provider>
    )



}


