import React from 'react';
import { Engine } from './Engine';



const Tiger = ({ offSet, danger, tigerProperties, tiger }) => {

    const backgroundColor = tigerProperties.tigerPos[tiger].dangerZone ? "red" : "lightgreen";

    return (
        <React.Fragment>

            <div style={{ position: 'absolute', left: `${tigerProperties.tigerPos[tiger].randomLeft}px`, top: `${tigerProperties.tigerPos[tiger].randomTop}px`, }}>
                <div style={{ width: `${tigerProperties.tigerPos[tiger].tigerHp}px`, height: '5px', backgroundColor }}></div>
            </div>


            <div
                style={{
                    position: 'absolute',
                    left: `${tigerProperties.tigerPos[tiger].randomLeft}px`,
                    top: `${tigerProperties.tigerPos[tiger].randomTop}px`,
                    width: 48,
                    height: 48,
                    overflow: 'hidden',
                    background: `url(/tigers.png) -${0}px -${offSet}px`
                }}
            >
            </div>
        </React.Fragment>


    )


}


export default Tiger;