import React from "react";
import { useClockState } from "../useClockState";
import "./BreakAndSession.css"

const BreakAndSession = () => {
    const {
        state,
        decreaseBreakLength,
        decreaseSessionLength,
        increaseBreakLength,
        increaseSessionLength
    } = useClockState()

    return (
        <><div className="break">
            <button id="break-decrement" onClick={decreaseBreakLength}>-</button>
            <div className="label_and_length_break">
                <div id="break-label">Break Length</div>
                <div id="break-length">{state.breakLength}</div>
            </div>
            <button id="break-increment" onClick={increaseBreakLength}>+</button>
        </div><div className="session">
                <button id="session-decrement" onClick={decreaseSessionLength}>-</button>
                <div className="label_and_length_session">
                    <div id="session-label">Session Length</div>
                    <div id="session-length">{state.sessionLength}</div>
                </div>
                <button id="session-increment" onClick={increaseSessionLength}>+</button>
            </div></>
    )
}

export default BreakAndSession;