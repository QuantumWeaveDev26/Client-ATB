import { useState } from 'react';

export default function PlayFormats() {
  const [doubles, setDoubles] = useState(false);
  return <div className="play-formats">
    <h3>One court.<br />More ways to play.</h3>
    <div className="format-toggle" role="group" aria-label="Explore tennis formats"><button type="button" aria-pressed={!doubles} onClick={() => setDoubles(false)}>Singles</button><button type="button" aria-pressed={doubles} onClick={() => setDoubles(true)}>Doubles</button></div>
    <svg className={`format-court ${doubles ? 'is-doubles' : ''}`} viewBox="0 0 260 340" role="img" aria-label={doubles ? 'A doubles court diagram with two players on each side' : 'A singles court diagram with one player on each side'}>
      <rect className="court-active-area" x={doubles ? '25' : '53'} y="26" width={doubles ? '210' : '154'} height="288" />
      <g className="court-lines"><rect x="25" y="26" width="210" height="288" /><path d="M53 26v288M207 26v288M53 99h154M53 241h154M130 99v142M25 170h210" /></g>
      <path className="court-net" d="M17 170h226" />
      <g className="court-players">{doubles ? <><circle cx="86" cy="65" r="9" /><circle cx="173" cy="122" r="9" /><circle cx="86" cy="218" r="9" /><circle cx="173" cy="278" r="9" /></> : <><circle cx="130" cy="61" r="10" /><circle cx="130" cy="279" r="10" /></>}</g>
      <circle className="court-ball" cx={doubles ? '160' : '108'} cy={doubles ? '202' : '140'} r="5" />
    </svg>
    <p className="format-caption" aria-live="polite">{doubles ? 'Two a side. Better together.' : 'One on one. Every point is yours.'}</p>
    <a className="text-link" href="#booking">Make time to play <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" /></svg></a>
  </div>;
}
