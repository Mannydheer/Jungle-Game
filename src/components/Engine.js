import React, { useEffect } from "react";
import Player from "./Player";
import styled from "styled-components";
import Enemy from "./Enemy";
import useInterval from "./use-interval.hook";
import { TreeProvider } from "./TreesContext";
import Modal from "./Modal";

export const Engine = React.createContext();

const EnemyProperties = {
  top: 200,
  left: 200,
};
const PlayerProperties = {
  playerAction: false, //for punch active.
  playerAmmunition: false,
  size: 500,
  top: 250,
  left: 700,
  health: 200,
  bananas: 0,
  //punch
  //will control where the punch will appear.
  hitradiusTop: 32,
  hitradiusLeft: 0,
};
const MonkeyStampede = {
  Monkeys: {
    monkey1: "🐒",
    monkey2: "🐒",
    monkey3: "🐒",
    monkey4: "🐒",
  },
};
let TreeProperties = {
  positionLeft: 900,
  positionTop: 100,
  treePositions: {
    tree1: null,
    tree2: null,
    tree3: null,
    tree4: null,
    tree5: null,
  },
};
const EngineProvider = ({ children, name, password, bestTime }) => {
  const [character, SetCharacter] = React.useState({ ...PlayerProperties });
  const [monkeys, setMonkeys] = React.useState({ ...MonkeyStampede });
  const [treePos, settreePos] = React.useState({ ...TreeProperties });
  const [enemy, setEnemy] = React.useState({ ...EnemyProperties });
  const [fireCollision, setFireCollision] = React.useState(false);
  //can only fire once all the bananas have been collected.
  const [enableBananaBullet, setEnableBananaBullet] = React.useState(false);
  const [restart, setRestart] = React.useState(true);
  let [bananaMovement, setbananaMovement] = React.useState({
    left: 0,
    top: 0,
  });
  const [allowFire, setallowFire] = React.useState(true);
  //no dmg shield active
  const [stopDmg, setStopDmg] = React.useState(false);
  const [hitColor, sethitColor] = React.useState(false);
  //--------BANANA DIRECTIONS---------
  let [bananaPos, setbananaPos] = React.useState({
    bananaLeft: 0,
    bananaTop: 0,
    direction: null,
  });
  //ammunition banana movement.
  let [ammunitionMoveLeft, setammunitionMoveLeft] = React.useState(0);
  let [ammunitionMoveTop, setammunitionMoveTop] = React.useState(0);
  //active punch when only playerAction is true
  useEffect(() => {
    let timer;
    if (character.playerAction) {
      let punchAudio = new Audio();
      punchAudio.src = "./punch.mp3";
      const handlePlay = () => {
        punchAudio.play();
        timer = setInterval(() => {
          SetCharacter({ ...character, playerAction: false });
        }, 300);
        //reset the player action.
      };
      handlePlay();
    }
    return () => {
      clearInterval(timer);
    };
  }, [character]);
  //------------------------------------------------------------------
  //banan ammunition
  useInterval(() => {
    if (bananaPos.direction === 32 && allowFire === false) {
      if (ammunitionMoveLeft > -500) {
        setammunitionMoveLeft((ammunitionMoveLeft -= 20));
        setbananaMovement({
          //VERY IMPORTANT. ensure you whenever you are shooting, L,R,U,D,
          //that you are keeping track of the positions player to update TOP,LEFT for collisions wtih LION
          ...bananaMovement,
          left: ammunitionMoveLeft + character.left,
          top: ammunitionMoveTop + character.top,
        });
      } else {
        character.playerAmmunition = false;
        setammunitionMoveLeft(0);
        //need to reset the left banana pos.
        setbananaPos({
          ...bananaPos,
          bananaLeft: character.left,
          bananaTop: character.top,
        });
        //firing is allowed again when the ifstatement above is completed.
        setallowFire(true);
      }
    }

    if (bananaPos.direction === 64 && allowFire === false) {
      if (ammunitionMoveLeft < 500) {
        setammunitionMoveLeft((ammunitionMoveLeft += 20));
        setbananaMovement({
          ...bananaMovement,
          left: ammunitionMoveLeft + character.left,
          top: ammunitionMoveTop + character.top,
        });
      } else {
        character.playerAmmunition = false;
        setammunitionMoveLeft(0);
        //need to reset the left banana pos.
        setbananaPos({
          ...bananaPos,
          bananaLeft: character.left,
          bananaTop: character.top,
        });
        setallowFire(true);
      }
    }
    if (bananaPos.direction === 96 && allowFire === false) {
      if (ammunitionMoveTop > -500) {
        setammunitionMoveTop((ammunitionMoveTop -= 20));
        setbananaMovement({
          ...bananaMovement,
          top: ammunitionMoveTop + character.top,
          left: ammunitionMoveLeft + character.left,
        });
      } else {
        character.playerAmmunition = false;
        setammunitionMoveTop(0);
        //need to reset the left banana pos.
        setbananaPos({
          ...bananaPos,
          bananaLeft: character.left,
          bananaTop: character.top,
        });
        setallowFire(true);
      }
    }
    if (bananaPos.direction === 0 && allowFire === false) {
      if (ammunitionMoveTop < 500) {
        setammunitionMoveTop((ammunitionMoveTop += 20));
        setbananaMovement({
          ...bananaMovement,
          top: ammunitionMoveTop + character.top,
          left: ammunitionMoveLeft + character.left,
        });
      } else {
        character.playerAmmunition = false;
        setammunitionMoveTop(0);
        //need to reset the left banana pos.
        setbananaPos({
          ...bananaPos,
          bananaLeft: character.left,
          bananaTop: character.top,
        });
        setallowFire(true);
      }
    }
  }, 100);

  //--------------------------------------------------------------------

  //play music on app load.
  useEffect(() => {
    let audio = new Audio();
    audio.src = "./Tribal Jungle Music - Amazon Princess.mp3";
    const handlePlay = () => {
      audio.play();
      audio.currentTime = 0;
      audio.play();
    };
    handlePlay();

    return () => {
      audio.pause();
    };
  }, []);

  return (
    <Engine.Provider
      value={{
        enemy,
        setEnemy,
        treePos,
        settreePos,
        fireCollision,
        monkeys,
        setMonkeys,
        SetCharacter,
        character,
        setFireCollision,
        sethitColor,
        stopDmg,
        setStopDmg,
        name,
        password,
        setbananaMovement,
        bananaMovement,
        allowFire,
        setallowFire,
        enableBananaBullet,
        setEnableBananaBullet,
        bananaPos,
        setbananaPos,
        setammunitionMoveTop,
        setammunitionMoveLeft,
        ammunitionMoveTop,
        ammunitionMoveLeft,
      }}
    >
      {/* healthBar */}
      <StyledHp>
        <StyledHealthText>Health</StyledHealthText>
        <div
          style={{
            border: "solid white 2px",
            backgroundColor: "green",
            width: `${character.health}px`,
            height: "20px",
          }}
        ></div>
        {stopDmg && (
          <StyledAbilities>
            🛡
            <div>
              <strong>Shield is Active.</strong>
            </div>
            <div>
              <strong>Duration:</strong> 10seconds
            </div>
            <div>
              <strong>Damage Taken:</strong> None
            </div>
          </StyledAbilities>
        )}
      </StyledHp>
      <StyledAttacks>
        <div>
          <strong>Game Instructions</strong>
          <div>
            <strong>Movement:</strong>
          </div>
          <div>
            <strong>↕</strong> Up - Down
          </div>
          <div>
            <strong>↔ </strong>Left - Right
          </div>

          <div>
            <strong>Spacebar </strong>- Punch 👊
          </div>
        </div>
      </StyledAttacks>
      {!restart && <Modal />}

      {restart && (
        <StyledGameBoard>
          <Board style={{}}>
            <TreeProvider>
              <Player></Player>
              {character.playerAction && (
                <StyledHit
                  style={{
                    width: 32,
                    height: 32,
                    position: "absolute",
                    left: `${character.left + character.hitradiusLeft}px`,
                    top: `${character.top + character.hitradiusTop}px`,
                  }}
                >
                  <span aria-label="" role="img">
                    👊
                  </span>
                </StyledHit>
              )}
              <Enemy setRestart={setRestart}></Enemy>
            </TreeProvider>
          </Board>
        </StyledGameBoard>
      )}

      {children}
    </Engine.Provider>
  );
};

export default EngineProvider;

const Board = styled.div`
  height: 700px;
  width: 1000px;
  background: url("grass.png");
  overflow: hidden;
`;
const StyledHit = styled.div``;
const StyledGameBoard = styled.div`
  font-size: 2em;
  position: absolute;
  z-index: 100;

  left: 20px;
  top: 20px;
`;
const StyledHealthText = styled.span`
  font-size: 2em;
`;
const StyledAbilities = styled.div`
  margin-top: 10px;
  font-size: 1.1em;
  text-align: center;
  color: white;
`;

const StyledHp = styled.div`
  color: white;
  position: absolute;
  top: 0;
  right: 100px;
`;

const StyledAttacks = styled.div`
  font-size: 24px;
  color: white;
  position: absolute;
  top: 200px;
  right: 100px;
  border-radius: 10px;
  border: solid white 3px;
  padding: 5px;
`;
