// import React, { useState } from "react";
// import styled from "styled-components";

// const TaskContainer = styled.div`
//   ${(props) => {
//     console.log("id: ", props.id);
//     console.log("hovered: ", props.hoovered);
//     console.log("animate: ", props.animate);
//   }}
//   margin-top: 1rem;
//   border: 1px solid rgba(61, 66, 69, 0.85);
//   padding: 1rem;
//   border-radius: 0.5em;
//   display: flex;
//   flex-flow: wrap;

//   align-items: center;
//   width: 100%;
//   ${(props) =>
//     props.id === props.hoovered ? taskAnimationHandler(props) : ""};
// `;
// const TaskImportanceContainer = styled.div`
//   border: 1px solid rgba(61, 66, 69, 0.85);
//   padding: 1rem;
//   border-radius: 0.5em;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   font-size: 2.5em;
//   /* ${(props) =>
//     props.id === props.hooveredTask ? taskAnimationHandler(props) : ""}; */
// `;

// const DoneButton = styled.button`
//   ${(props) =>
//     props.id === props.hooveredTask
//       ? console.log(
//           "doen button rendered because of task hoover: ",
//           props.animate
//         )
//       : ""}
//   background-color: rgba(186, 0, 84, 0.8);
//   border-radius: 3em;
//   height: 3.7em;
//   color: inherit;
//   font-weight: 600;
//   border: none;
//   transition: all 0.3s ease-in-out;
//   &:hover {
//     background-color: rgba(186, 0, 84, 1);
//   }
// `;

// function TaskCard(props) {
//   let { taskId, hooveredTask };
//   return (
//     <TaskContainer
//       key={task._id}
//       id={task._id}
//       hoovered={hooveredTask}
//       onMouseOver={() => setHooveredTask(task._id)}
//       onMouseOut={() => setHooveredTask("")}
//     >
//       <DoneButton
//         animate={animateTask}
//         onClick={() => deleteAndAnimateTaskHandler(task._id)}
//       >
//         Done!
//       </DoneButton>
//       <TaskImportanceContainer>
//         <div style={{ fontSize: "1rem" }}>Importance</div>
//         {task.importance}
//       </TaskImportanceContainer>
//       -{task.description}
//     </TaskContainer>
//   );
// }

// export default TaskCard;
