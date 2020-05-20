import React from "react";
import { Engine } from "./Engine";
import EachTree from "./EachTree";
import { TreeContext } from "./TreesContext";
import useInterval from "./use-interval.hook";
import LionBoss from "./LionBoss";
import Message from "./Message";
import styled from "styled-components";

const Trees = ({ setStopDmg, setBarrier, moveStampede, setShield, shield }) => {
  //Hooks
  const {
    setEnableBananaBullet,
    allowFire,
    bananaMovement,
    setbananaMovement,
    password,
    name,
    treePos,
    settreePos,
    character,
  } = React.useContext(Engine);
  const {
    actions: { updatePositions },
  } = React.useContext(TreeContext);

  // const [treePos, settreePos] = React.useState({ ...TreeProperties })
  const [treeAllower, settreeAllower] = React.useState(false);
  let [count, setCount] = React.useState(0);
  let [timer, setTimer] = React.useState(0);
  let [stopTimer, setStopTimer] = React.useState(false);
  let [message, setMessage] = React.useState(false);

  //lionboss
  let [triggerLion, settriggerLion] = React.useState(false);

  //Generate random trees
  React.useEffect(() => {
    let allTrees = Object.keys(treePos.treePositions);
    let palmTree = "🍌";

    allTrees.forEach((tree, index) => {
      let randomLeft = Math.round((Math.random() * 980 + 0) / 10) * 10;
      let randomTop = Math.round((Math.random() * (650 - 1) + 1) / 10) * 10;
      let treeOn = true;
      treePos.treePositions[tree] = { palmTree, randomLeft, randomTop, treeOn };
      updatePositions({
        id: `tree-${index}`,
        x: treePos.treePositions[tree].randomLeft,
        y: treePos.treePositions[tree].randomTop,
      });
    });
    settreeAllower(true);
  }, []);
  //Collision Checker.

  React.useEffect(() => {
    const bananaCollision = (thisCharacter, theseTrees, move) => {
      theseTrees.forEach((tree) => {
        let widthLeft = treePos.treePositions[tree].randomLeft - 30;
        let widthRight = treePos.treePositions[tree].randomLeft + 30;
        let heightTop = treePos.treePositions[tree].randomTop - 25;
        let heightBottom = treePos.treePositions[tree].randomTop + 25;
        if (
          thisCharacter.top >= heightTop &&
          thisCharacter.top <= heightBottom &&
          thisCharacter.left >= widthLeft &&
          thisCharacter.left <= widthRight &&
          treePos.treePositions[tree].treeOn === true
        ) {
          treePos.treePositions[tree].treeOn = false;
          settreePos({
            ...treePos,
          });
        }
      });
    };
    //tree COllision
    let allTrees = Object.keys(treePos.treePositions);
    bananaCollision(character, allTrees, moveStampede);

    // shield collision
    if (shield) {
      //if shield is active
      let shieldPositionLeft = character.shield.shieldLeft - 30;
      let shieldPositionRight = character.shield.shieldLeft + 30;
      let shieldPositionTop = character.shield.shieldTop - 25;
      let shieldPositionBottom = character.shield.shieldTop + 25;

      if (
        character.top >= shieldPositionTop &&
        character.top <= shieldPositionBottom &&
        character.left >= shieldPositionLeft &&
        character.left <= shieldPositionRight
      ) {
        character.shield.shieldLeft = 0;
        character.shield.shieldTop = 0;
        setShield(false);
        setBarrier(true);
        setStopDmg(true);
      }
    }
  }, [character]); //avoid do it on multiple states conditions

  //COUNTER OF BANANAS
  React.useEffect(() => {
    Object.keys(treePos.treePositions).forEach((tree) => {
      if (treePos.treePositions[tree].treeOn === false) {
        setCount(count + 1);
      }
    });
  }, [treePos]);
  //GAME END.
  //COUNT WINNER CHECKER.
  React.useEffect(() => {
    if (count === 5) {
      setEnableBananaBullet(true);
      // const updateData = {
      //   username: name,
      //   password: password,
      //   time: timer,
      // };
      //post the new updated time in the collection of the user
      // fetch("http://localhost:4000/handleTimer", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify(updateData),
      // });
      setStopTimer(true);
      setMessage(true);
      settriggerLion(true); //active lion component
    }
  }, [count]);

  //user interval timer.
  useInterval(() => {
    if (stopTimer === false) {
      setTimer(timer + 1);
    }
  }, 1000);

  return (
    <div>
      {treeAllower ? (
        Object.keys(treePos.treePositions).map((tree) => {
          //only show that particular tree
          if (treePos.treePositions[tree].treeOn === true) {
            return <EachTree tree={tree}></EachTree>;
          }
        })
      ) : (
        <div></div>
      )}

      <Score>
        Bananas Collected:
        {} {count}
        <div>Timer: {timer} seconds</div>
      </Score>
      {message && <Message timer={timer} />}
      {/* {triggerLion && (
        <div>
          {message && <Message setMessage={setMessage} />}
          <LionBoss
            allowFire={allowFire}
            bananaMovement={bananaMovement}
            setbananaMovement={setbananaMovement}
          ></LionBoss>
        </div>
      )} */}
    </div>
  );
};

export default Trees;

const Score = styled.div`
  font-size: 14px;
  color: black;
  background-color: white;
  width: 140px;
  height: 40px;
  font-weight: 400;
`;
