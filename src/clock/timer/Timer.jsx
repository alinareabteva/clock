import React from "react";
import { BEEP_SOUND_SRC, TIMER_PHASES } from "../constant";
import { useClockState } from "../useClockState";
import "./Timer.css"

const Timer = () => {
    const {
        onClickStartStop,
        state,
        timerTitle,
        displayTime,
        onClickReset,
        beepAudioRef
    } = useClockState()

    return (
        <div className="timer">
            <button id="start_stop" onClick={onClickStartStop}>{state.timerPhase === TIMER_PHASES.RUNNING ? "STOP" : "START"}</button>
            <div className="label_and_time">
                <div id="timer-label">{timerTitle}</div>
                <div id="time-left" className="current-time">{displayTime}</div>
            </div>
            <button id="reset" onClick={onClickReset}>Reset</button>
            <audio
                id="beep"
                type="audio/mp3"
                src={BEEP_SOUND_SRC}
                ref={beepAudioRef}
            />
        </div>
    )
}

export default Timer;