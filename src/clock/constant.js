import {getMilisecondsForMinutes} from "./FormatClock";

export const BEEP_SOUND_SRC = "https://mp3-ogg.ru/files/3554-zvonok-na-urok.mp3";
export const MAX_LENGTH = 60;

export const TYPES = Object.freeze({
  SESSION: 'SESSION',
  BREAK: 'BREAK'
})

export const TIMER_PHASES = Object.freeze({
  INITIAL: 'INITIAL',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED'
})

export const INITIAL_STATE = {
  timerPhase: TIMER_PHASES.INITIAL,
  breakLength: 5,
  sessionLength: 25,
  endTime: null,
  timer: getMilisecondsForMinutes(25),
  type: ''
}
