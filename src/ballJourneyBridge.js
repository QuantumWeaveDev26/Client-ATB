let projector = null;
let active = false;
let paused = false;
export const journeyBallActive = () => active;
export const journeyMotionPaused = () => paused;
export function setJourneyMotionPaused(value) { paused = value; window.dispatchEvent(new Event('atb:journey-ball')); }
export const registerBallProjector = (callback) => { projector = callback; return () => { if (projector === callback) projector = null; }; };
export const projectJourneyBall = (progress) => projector?.(progress);
export function setJourneyBallActive(value) { active = value; window.dispatchEvent(new Event('atb:journey-ball')); }
