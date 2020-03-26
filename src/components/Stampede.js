import React from 'react';
import { Engine } from './Engine';






const Stampede = () => {

    const { setMonkeys, monkeys } = React.useContext(Engine)



    let monkeyArray = Object.keys(monkeys.Monkeys);


    return (

        <React.Fragment>

            {monkeyArray.map(monkey => {
                return (
                    <div>
                        {monkeys.Monkeys[monkey]}
                    </div>
                )
            })}
        </React.Fragment>

    )




}

export default Stampede;