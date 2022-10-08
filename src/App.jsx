import React, { useReducer, useState, useRef } from "react";
import "./App.scss";
import TimeController from "./Components/TimeController";
import Display from "./Components/Display";

function Reducer(state, action) {
  switch (action.type) {
    case "increment": return state + 1;
    case "decrement": return Math.max(state - 1, 1);
    default: return action.value;
  }
}


const App = () => {

  const [CurrentTime, setCurrentTime] = useState({ Time: 25 * 60, Type: "Session" });
  const [isTurned, ChangePosition] = useState(false);
  const [BreakTime, BreakDispatch] = useReducer(Reducer, 5);
  const [SessionTime, SessionDispatch] = useReducer(Reducer, 25);

  const ControllerFunction = (Object) => {

    switch (Object.Key) {
      case "Break": {
        BreakDispatch({ type: Object.type })
        if (CurrentTime.Type == "Break") {
          setCurrentTime((prev) => {
            return (
              {
                Time: (Object.type == "decrement") ? (Math.max(BreakTime * 60 - 60, 60)) : (BreakTime * 60 + 60),
                Type: prev.Type
              }
            );
          })
        }
        break;
      }
      case "Session": {
        SessionDispatch({ type: Object.type });
        if (CurrentTime.Type == "Session") {
          setCurrentTime((prev) => {
            return (
              {
                Time: (Object.type == "decrement") ? (Math.max(SessionTime * 60 - 60, 60)) : (SessionTime * 60 + 60),
                Type: prev.Type
              }
            );
          })
        }
        break;
      }
      default: {
        SessionDispatch({ type: "error" })
      }
    }
  }

  const resetTimes = () => {
    setCurrentTime({ Time: 25 * 60, Type: "Session" });
    BreakDispatch({ type: "restart", value: 5 })
    SessionDispatch({ type: "restart", value: 25 })
  }

  return (
    <div className="Clock">
      <div className='ControllersDiv'>
        <TimeController
          isTurned={isTurned}
          name={"Break Length"}
          type={"Break"}
          value={BreakTime}
          Controller={ControllerFunction}
        />
        <TimeController
          isTurned={isTurned}
          name={"Session Length"}
          type={"Session"}
          value={SessionTime}
          Controller={ControllerFunction}
        />
      </div>

      <Display
        CurrentTime={CurrentTime}
        ChangePosition={ChangePosition}
        isTurned={isTurned}
        setCurrentTime={setCurrentTime}
        resetTimes={resetTimes}
        BreakTime={BreakTime}
        SessionTime={SessionTime}
      />
    </div>
  );
}

export default App;