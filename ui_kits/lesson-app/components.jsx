// Shared atomic components for the VibeLens lesson-app UI kit
const { useState } = React;

const ICON_BY_TITLE = {
  'Static':     '/assets/cam-tripod.png',
  'Handheld':   '/assets/cam-handheld.png',
  'Tracking':   '/assets/cam-tracking.png',
  'Dolly Zoom': '/assets/cam-dolly-zoom.png',
};
const VIDEO_BY_TITLE = {
  'Static':     '/assets/videos/static-video.mp4',
  'Handheld':   '/assets/videos/handheld-video.mp4',
  'Tracking':   '/assets/videos/tracking-video.mp4',
  'Dolly Zoom': '/assets/videos/dollyzoom-video.mp4',
};

const LESSONS = [
  { id: 1, title: 'Static',    feels: "the world stops, and you're forced to listen.",
    def: 'A static shot keeps the camera completely still. No tilt, no track — the frame becomes a stage and the performance carries you.',
    ref: 'Ex. Fargo, 1996 — 0:42' },
  { id: 2, title: 'Handheld',  feels: "you're running with them — every step, every breath.",
    def: 'A handheld shot is held in the operator\'s hands. The natural shake puts you inside the action instead of watching it.',
    ref: 'Ex. The Bourne Ultimatum, 2007 — 1:08' },
  { id: 3, title: 'Tracking',  feels: "you're being walked through a memory.",
    def: 'A tracking shot follows the subject smoothly — usually on a dolly. Your eye is locked to theirs; the world slides past.',
    ref: 'Ex. Goodfellas, 1990 — 2:12' },
  { id: 4, title: 'Dolly Zoom', feels: "the room is shrinking around you.",
    def: 'A dolly zoom keeps the subject the same size while the background warps. Vertigo invented it; horror inherited it.',
    ref: 'Ex. Jaws, 1975 — 0:54' },
];

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>;
}

function Btn({ kind = 'primary', children, ...rest }) {
  return <button className={`btn btn-${kind}`} {...rest}>{children}</button>;
}

function ProgressBar({ value }) {
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  );
}

function NavRail({ current, onPick, completed }) {
  return (
    <aside className="nav-rail">
      <div className="rail-title">Lessons · 04</div>
      {LESSONS.map(l => {
        const cls = l.id === current ? 'active'
                  : completed.has(l.id) ? 'done' : '';
        return (
          <div key={l.id} className={`rail-item ${cls}`} onClick={() => onPick(l.id)}>
            <span className="num">{String(l.id).padStart(2, '0')}</span>
            <span>{l.title}</span>
          </div>
        );
      })}
      <hr />
      <div className="rail-item" onClick={() => onPick('quiz')}>
        <span className="num">→</span><span>Take the quiz</span>
      </div>
    </aside>
  );
}

function FilmFrame({ src, hud, caption }) {
  return (
    <div className="film-frame">
      <video src={src} autoPlay muted loop playsInline />
      {hud && (
        <div className="hud">
          <span className="dot"></span>{hud}
        </div>
      )}
      {caption && <div className="ref">{caption}</div>}
    </div>
  );
}

function AnswerTile({ title, state, onClick }) {
  return (
    <div className={`answer-tile ${state || ''}`} onClick={onClick}>
      <img src={ICON_BY_TITLE[title]} alt="" />
      <span className="lbl">{title}</span>
    </div>
  );
}

Object.assign(window, {
  LESSONS, ICON_BY_TITLE, VIDEO_BY_TITLE,
  Eyebrow, Btn, ProgressBar, NavRail, FilmFrame, AnswerTile,
});
