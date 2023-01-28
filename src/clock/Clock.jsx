import React from "react";
import Timer from "./timer/Timer"
import { useClockState } from "./useClockState";
import "./Clock.css";

const Clock = () => {
    const {
        state,
        decreaseBreakLength,
        decreaseSessionLength,
        increaseBreakLength,
        increaseSessionLength
    } = useClockState()

    return (
        <div className="container">
            <Timer />

            <div className="second_row">
                <div className="break">
                    <button id="break-decrement" onClick={decreaseBreakLength}>-</button>
                    <div className="label_and_length_break">
                        <div id="break-label">Break Length</div>
                        <div id="break-length">{state.breakLength}</div>
                    </div>
                    <button id="break-increment" onClick={increaseBreakLength}>+</button>
                </div>
                <div className="session">
                    <button id="session-decrement" onClick={decreaseSessionLength}>-</button>
                    <div className="label_and_length_session">
                        <div id="session-label">Session Length</div>
                        <div id="session-length">{state.sessionLength}</div>
                    </div>
                    <button id="session-increment" onClick={increaseSessionLength}>+</button>
                </div>
            </div>
        </div>
    );
}

export default Clock;
