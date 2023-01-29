import React from "react";
import Timer from "./timer/Timer"
import BreakAndSession from "./break_and_session/BreakAndSession"
import "./Clock.css";

const Clock = () => {
    return (
        <div className="container">
            <Timer />
            <div className="second_row">
                <BreakAndSession />
            </div>
        </div>
    );
}

export default Clock;
