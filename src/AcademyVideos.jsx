import { useEffect, useRef, useState } from 'react';
import SiteIcon from './SiteIcon.jsx';

const CLIPS = [
  { id: 0, title: 'Movement & footwork.', copy: 'Getting into position for the next ball.' },
  { id: 4, title: 'Finding the next shot.', copy: 'Small adjustments. Purposeful practice.' },
  { id: 7, title: 'Practice, point by point.', copy: 'Time on court, together.' },
];

function PracticeClip({ clip }) {
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const stopped = () => { setPlaying(false); setBusy(false); };
  const toggle = async () => {
    const player = video.current;
    if (!player) return;
    if (!player.paused) { player.pause(); return; }
    setError(''); setBusy(true);
    if (player.error) player.load();
    if (player.ended) player.currentTime = 0;
    try { await player.play(); }
    catch (issue) {
      if (issue.name !== 'AbortError') setError('This clip couldn’t start. Select Play to try again.');
      setBusy(false);
    }
  };
  return <figure className="academy-film">
    <div className={`practice-video-frame ${playing ? 'is-playing' : ''} ${busy ? 'is-loading' : ''}`} onContextMenu={event => event.preventDefault()}>
      <video ref={video} playsInline muted preload="none" controlsList="nodownload noremoteplayback" disablePictureInPicture disableRemotePlayback width="540" height="960" poster={`/images/enhanced/video-practice-${clip.id}.jpg`} aria-label={`${clip.title} ATB academy practice clip, without audio`} onPlay={() => setPlaying(true)} onPlaying={() => { setPlaying(true); setBusy(false); }} onWaiting={() => { if (!video.current.paused) setBusy(true); }} onPause={stopped} onEnded={stopped} onError={() => { stopped(); setError('This clip couldn’t start. Select Play to try again.'); }}>
        <source src={`/videos/practice-${clip.id}.mp4`} type="video/mp4" />
        Your browser does not support this video.
      </video>
      <button type="button" className="film-play-surface" onClick={toggle} aria-label={`${playing ? 'Pause' : 'Play'} ${clip.title}`} aria-pressed={playing} aria-busy={busy} aria-describedby={error ? `clip-error-${clip.id}` : undefined}>
        <span className="film-play-icon"><SiteIcon name={playing ? 'pause' : 'play'} size={28} /></span>
        {busy && <span className="film-buffering" role="status">Loading…</span>}
      </button>
    </div>
    {error && <p id={`clip-error-${clip.id}`} className="film-error" role="alert">{error}</p>}
    <figcaption><h3>{clip.title}</h3><p>{clip.copy}</p></figcaption>
  </figure>;
}

export default function AcademyVideos() {
  const section = useRef(null);
  useEffect(() => {
    const videos = [...section.current.querySelectorAll('video')];
    const observer = new IntersectionObserver(entries => entries.forEach(({ target, isIntersecting }) => { if (!isIntersecting) target.pause(); }), { threshold: 0.1 });
    videos.forEach(video => observer.observe(video));
    const stopOthers = event => videos.forEach(video => { if (video !== event.target) video.pause(); });
    const hidden = () => { if (document.hidden) videos.forEach(video => video.pause()); };
    videos.forEach(video => video.addEventListener('play', stopOthers));
    document.addEventListener('visibilitychange', hidden);
    return () => { observer.disconnect(); videos.forEach(video => video.removeEventListener('play', stopOthers)); document.removeEventListener('visibilitychange', hidden); };
  }, []);
  return <section id="academy-films" ref={section} className="academy-films section-wrap" aria-labelledby="films-heading">
    <div className="films-intro"><h2 id="films-heading">Real practice.<br />Real progress.</h2><p>A closer look at everyday tennis at ATB. The movement, the focus, and the joy of another rally.</p><a className="text-link" href="#booking">Come be part of it <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" /></svg></a><span className="films-note">Practice clips · sound off</span></div>
    <div className="films-grid">{CLIPS.map(clip => <PracticeClip clip={clip} key={clip.id} />)}</div>
  </section>;
}
