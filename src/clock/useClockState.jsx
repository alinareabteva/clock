import { useState, useEffect, useMemo, useRef } from "react";
import { MAX_LENGTH, TYPES, TIMER_PHASES, INITIAL_STATE } from "./constant";
import { formatWithLeadingZero, getMilisecondsForMinutes } from "./FormatClock";

export const useClockState = () => {
    const [state, setState] = useState(INITIAL_STATE);
    const beepAudioRef = useRef(null)

    const decreaseBreakLength = () => {
        setState(prevState => {
            return {
                ...prevState,
                breakLength: prevState.breakLength > 1 ? prevState.breakLength - 1 : prevState.breakLength
            }
        })
    }

    const increaseBreakLength = () => {
        setState(prevState => {
            return {
                ...prevState,
                breakLength: prevState.breakLength + 1 <= MAX_LENGTH ? prevState.breakLength + 1 : prevState.breakLength
            }
        })
    }

    const decreaseSessionLength = () => {
        setState(prevState => {
            return {
                ...prevState,
                sessionLength: prevState.sessionLength > 1 ? prevState.sessionLength - 1 : prevState.sessionLength
            }
        })
    }

    const increaseSessionLength = () => {
        setState(prevState => {
            return {
                ...prevState,
                sessionLength: prevState.sessionLength + 1 <= MAX_LENGTH ? prevState.sessionLength + 1 : prevState.sessionLength
            }
        })
    }

    const setTimer = (type, timerPhase) => {
        if (!TYPES[type]) {
            return;
        }

        setState(prevState => {
            const currentTime = new Date().getTime();
            const lengthToUse = type === TYPES.SESSION ? prevState.sessionLength : prevState.breakLength;
            let endTime = currentTime + getMilisecondsForMinutes(lengthToUse) + 1000
            if (prevState.timerPhase === TIMER_PHASES.PAUSED && timerPhase === TIMER_PHASES.RUNNING) {
                endTime = currentTime + prevState.timer;
            }

            return {
                ...prevState,
                type,
                timerPhase,
                endTime
            }
        })
    }

    const onClickStartStop = () => {
        let timerPhase;
        let type = state.type;
        switch (state.timerPhase) {
            case TIMER_PHASES.INITIAL:
                timerPhase = TIMER_PHASES.RUNNING;
                type = TYPES.SESSION;
                break;
            case TIMER_PHASES.RUNNING:
                timerPhase = TIMER_PHASES.PAUSED;
                break;
            case TIMER_PHASES.PAUSED:
                timerPhase = TIMER_PHASES.RUNNING;
                break;
        }

        setTimer(type, timerPhase)
    }

    const onClickReset = () => {
        if (beepAudioRef?.current) {
            beepAudioRef.current.pause();
            beepAudioRef.current.currentTime = 0;
        }
        setState(INITIAL_STATE);
    }

    useEffect(() => {
        if (state.endTime === null || state.timerPhase === TIMER_PHASES.PAUSED) {
            return;
        }

        const interval = setInterval(() => {
            setState(prevState => ({
                ...prevState,
                timer: prevState.endTime - new Date().getTime()
            }))
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [state.endTime, state.timerPhase])

    useEffect(() => {
        if (state.timer !== null && state.timer < 1000) {
            const typeToSet = state.type === TYPES.SESSION ? TYPES.BREAK : TYPES.SESSION;
            setTimer(typeToSet, state.phase);
            beepAudioRef?.current?.play();
        }
    }, [state.timer])

    const displayTime = useMemo(() => {
        const date = new Date(state.timer);
        return `${formatWithLeadingZero(date.getMinutes())}:${formatWithLeadingZero(date.getSeconds())}`
    }, [state.timer])

    const timerTitle = useMemo(() => {
        switch (state.type) {
            case '':
            case TYPES.SESSION:
                return "Session";
            default:
                return "Break";
        }
    }, [state.type]);

    return {
        onClickStartStop,
        state,
        timerTitle,
        displayTime,
        onClickReset,
        beepAudioRef,
        decreaseBreakLength,
        decreaseSessionLength,
        increaseBreakLength,
        increaseSessionLength
    }
}