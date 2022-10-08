import React, { useRef, useState, useEffect} from "react";
import { MdNotStarted } from "react-icons/md";
import { BiStop } from "react-icons/bi";
import { BiReset } from "react-icons/bi";

const DISPLAYSTYLE = (Value) => {
    return {
        color: (Value) ? "rgb(172, 57, 57)" : "black",
        border: + (Value) ? "5px solid rgb(172, 57, 57)" : "5px solid rgb(223, 217, 217)",
    }
}

const TimeFormat = (Time) => {
    const minutes = Math.floor(Time / 60);
    const seconds = Time % 60;
    return (
        (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
    )
}

const Display = ({ CurrentTime, ChangePosition, isTurned, setCurrentTime, resetTimes, BreakTime,SessionTime }) => {

    const AudioRef = useRef();

    const Hurry = CurrentTime.Time<=60;

    const PlaySound = () => {
        AudioRef.current.play();
    }

    const StartClock = () => {
        if (!isTurned) {
            const Interval = setInterval(() => {
                setCurrentTime((prev) => {
                    if (prev.Time == 0) {
                        PlaySound();
                        if (prev.Type == "Session") {
                            return { Time: BreakTime * 60, Type: "Break" };
                        } else {
                            return { Time: SessionTime * 60, Type: "Session" };
                        }

                    } else {
                        return { Time: prev.Time - 1, Type: prev.Type };
                    }
                })
            }, 1000);
            localStorage.setItem("interval", Interval);
            ChangePosition(true);
        }
    }

    const StopClock = () => {
        clearInterval(localStorage.getItem("interval"));
        localStorage.removeItem("interval");
        ChangePosition(false)
    }

    const ResetClock = () => {
        resetTimes();
        StopClock();
    }

    return (
        <div className='Display' style={DISPLAYSTYLE(Hurry)}>
            <h1>{CurrentTime.Type}</h1>
            <h1 className="CurrentTime">{TimeFormat(CurrentTime.Time)}</h1>
            <div className="ClockController">
                <MdNotStarted
                    onClick={StartClock}
                    size={40}
                />
                <BiStop
                    onClick={StopClock}
                    size={60}
                />

                <BiReset
                    onClick={ResetClock}
                    size={40}
                />
            </div>
            <audio ref={AudioRef} src="https://www.soundjay.com/clock/alarm-clock-01.wav"></audio>
        </div>
    )
}

export default Display;