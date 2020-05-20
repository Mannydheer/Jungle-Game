// import React from "react";
// import useInterval from "./use-interval.hook";

// let Lion = {
//   hp: 100,
//   randomLeft: 0,
//   randomTop: 300,
// };

// const LionBoss = ({ allowFire, bananaMovement, setbananaMovement }) => {
//   const [offSet, setoffSet] = React.useState(0);
//   const [maxMovement, setmaxMovement] = React.useState(1);
//   const [lionLife, setlionLife] = React.useState(true);
//   //hp color changer.
//   let [lionDanger, setlionDanger] = React.useState(false);
//   let backgroundColor = lionDanger ? "red" : "lightgreen";

//   // banana and lion collsion
//   React.useEffect(() => {
//     //add values to get the full sprite instead of just an x,y point.
//     let lionLeft = Lion.randomLeft - 30;
//     let lionRight = Lion.randomLeft + 30;
//     let lionTop = Lion.randomTop - 25;
//     let lionBottom = Lion.randomTop + 25;

//     console.log(lionLeft, "LIONLEFT");
//     console.log(lionRight, "LIONRIGHT");
//     console.log(bananaMovement.left, "BANADALEFT");

//     if (
//       bananaMovement.left >= lionLeft &&
//       bananaMovement.left <= lionRight &&
//       bananaMovement.top >= lionTop &&
//       bananaMovement.top <= lionBottom &&
//       allowFire === false
//     ) {
//       Lion.hp -= 10;
//       if (Lion.hp === 20) {
//         setlionDanger(true);
//       }
//       if (Lion.hp === 0) {
//         //make div of lion dissapear when dead.
//         setlionLife(false);
//       }
//     }
//   }, [bananaMovement, allowFire]);

//   useInterval(() => {
//     let lionSpriteRight = 96;
//     let lionSpriteLeft = 48;
//     let lionSpriteTop = 144;
//     let lionSpriteBottom = 0;
//     let lionHop = 10;

//     if (maxMovement >= 1 && maxMovement <= 50) {
//       setmaxMovement(maxMovement + 1);
//       Lion.randomLeft += lionHop;
//       setoffSet(lionSpriteRight);
//     }

//     //top movement.-------------------------------------------
//     if (maxMovement >= 51 && maxMovement <= 70) {
//       setmaxMovement(maxMovement + 1);
//       Lion.randomTop -= lionHop;
//       setoffSet(lionSpriteTop);
//     }

//     // //left movement-------------------------------------------
//     if (maxMovement >= 71 && maxMovement <= 120) {
//       setmaxMovement(maxMovement + 1);
//       Lion.randomLeft -= lionHop;
//       setoffSet(lionSpriteLeft);
//     }
//     // //bottom mvoement -------------------------------------------

//     if (maxMovement >= 121 && maxMovement <= 140) {
//       setmaxMovement(maxMovement + 1);
//       Lion.randomTop += lionHop;
//       setoffSet(lionSpriteBottom);
//     }

//     if (maxMovement === 141) {
//       setmaxMovement(1);
//     }
//   }, 100);

//   return (
//     <React.Fragment>
//       <div
//         style={{
//           position: "absolute",
//           left: `${Lion.randomLeft}px`,
//           top: `${Lion.randomTop}px`,
//         }}
//       >
//         <div
//           style={{ width: `${Lion.hp}px`, height: "10px", backgroundColor }}
//         ></div>
//       </div>

//       {lionLife ? (
//         <div
//           style={{
//             position: "absolute",
//             left: `${Lion.randomLeft}px`,
//             top: `${Lion.randomTop}px`,
//             width: 48,
//             height: 48,
//             overflow: "hidden",
//             background: `url(/Lion.png) -${0}px -${offSet}px`,
//             fontSize: "100px",
//           }}
//         ></div>
//       ) : (
//         <></>
//       )}
//     </React.Fragment>
//   );
// };

// export default LionBoss;
