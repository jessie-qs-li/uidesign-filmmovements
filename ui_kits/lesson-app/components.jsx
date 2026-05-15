// Shared atomic components for the VibeLens lesson-app UI kit
const { useState } = React;

const ICON_BY_TITLE = {
  'Static':      '/assets/cam-tripod.png',
  'Handheld':    '/assets/cam-handheld.png',
  'Tracking':    '/assets/cam-tracking.png',
  'Dolly Zoom':  '/assets/cam-dolly-zoom.png',
  'Tilt':        '/assets/cam-tilt.png',
  'Dutch Angle': '/assets/cam-dutch.png',
  'Whip Pan':    '/assets/cam-whippan.png',
  'Zoom':        '/assets/cam-zoom.png',
};

const VIDEO_BY_TITLE = {
  'Static':      '/assets/videos/static-video.mp4',
  'Handheld':    '/assets/videos/handheld-video.mp4',
  'Tracking':    '/assets/videos/tracking-video.mp4',
  'Dolly Zoom':  '/assets/videos/dollyzoom-video.mp4',
  'Tilt':        '/assets/videos/tilt-video.mp4',
  'Dutch Angle': '/assets/videos/dutch-video.mp4',
  'Whip Pan':    '/assets/videos/whippan-video.mp4',
  'Zoom':        '/assets/videos/zoom-video.mp4',
};

const LESSONS = [
  { id: 1, title: 'Static',
    feels: "Perfect for talking head YouTube videos or TikTok storytimes. Plant your phone on a tripod, look straight into the lens, and let your words do the work. Creators like Emma Chamberlain built entire careers on the power of a still, direct camera.",
    def: 'A static shot keeps the camera completely still. No tilt, no track — the frame becomes a stage and the performance carries you.',
    ref: 'Ex. Fargo, 1996 — 0:42',
    realExamples: [
      { embedUrl: 'https://www.youtube.com/embed/XKWad939P6E?end=30&rel=0', caption: 'The Grand Budapest Hotel (2016)' },
      { embedUrl: 'https://www.youtube.com/embed/---fLPEVCFM?rel=0', caption: 'First Reformed (2017)' },
    ] },
  { id: 2, title: 'Handheld',
    feels: "Use this for TikTok vlogs or YouTube day-in-my-life videos. Hold your phone naturally as you walk around — the slight shake makes it feel raw, real, and like the viewer is right there with you.",
    def: "A handheld shot is held in the operator's hands. The natural shake puts you inside the action instead of watching it.",
    ref: 'Ex. The Bourne Ultimatum, 2007 — 1:08',
    realExamples: [
      { embedUrl: 'https://www.youtube.com/embed/bjtyXGzRElw?rel=0', caption: 'Inception (2010)' },
      { embedUrl: 'https://www.youtube.com/embed/za5TIKkRCTs?rel=0', caption: 'Saving Private Ryan (1998)' },
    ] },
  { id: 3, title: 'Tracking',
    feels: "Great for YouTube outfit reveals or TikTok walk videos. Have a friend film you as you walk toward or past them — the smooth follow makes you look like you just stepped off a runway.",
    def: 'A tracking shot follows the subject smoothly — usually on a dolly. Your eye is locked to theirs; the world slides past.',
    ref: 'Ex. Goodfellas, 1990 — 2:12',
    realExamples: [
      { embedUrl: 'https://www.youtube.com/embed/mcXBP-1fduY?rel=0', caption: 'Goodfellas (1990)' },
      { embedUrl: 'https://www.youtube.com/embed/F2lU8PnA24A?end=30&rel=0', caption: 'The Shining (1980)' },
    ] },
  { id: 4, title: 'Dolly Zoom',
    feels: "Use this in a YouTube video when revealing something shocking — a plot twist, a big announcement, or a dramatic reaction. The warping background makes the moment feel genuinely unreal and cinematic.",
    def: 'A dolly zoom keeps the subject the same size while the background warps. Vertigo invented it; horror inherited it.',
    ref: 'Ex. Jaws, 1975 — 0:54',
    realExamples: [
      { embedUrl: 'https://www.youtube.com/embed/ca08j8ASdOw?rel=0', caption: 'Documentary' },
      { embedUrl: 'https://www.youtube.com/embed/GUGvG89LH94?rel=0', caption: 'La Haine (1995)' },
    ] },
  { id: 5, title: 'Tilt',
    feels: "Perfect for TikTok outfit checks or YouTube product unboxings. Start at the shoes and slowly tilt up to the face — it builds anticipation and makes even a simple reveal feel like a moment.",
    def: 'A tilt rotates the camera up or down on a fixed axis. It reveals height, scale, or power — who is above, who is below.',
    ref: 'Ex. The Dark Knight, 2008 — 0:32',
    realExamples: [
      { embedUrl: 'https://www.youtube.com/embed/9GDW17nX3CE?rel=0', caption: 'Little Miss Sunshine (2006)' },
      { embedUrl: 'https://www.youtube.com/embed/wG49Htk6D7s?rel=0', caption: 'Blade Runner 2049 (2017)' },
    ] },
  { id: 6, title: 'Dutch Angle',
    feels: "Use this in TikTok skits when playing a villain or a suspicious character. Tilting your camera slightly sideways instantly makes any scene feel tense, creepy, or like something is about to go very wrong.",
    def: 'A dutch angle tilts the camera diagonally. The horizon line is no longer level — it signals unease, tension, or a broken world.',
    ref: 'Ex. The Third Man, 1949 — 1:14',
    realExamples: [
      { embedUrl: 'https://www.youtube.com/embed/cdjdTfDhwBg?rel=0', caption: 'Mission: Impossible (1996)' },
      { embedUrl: 'https://www.youtube.com/embed/bePMvXuyYZ8?rel=0', caption: 'Once Upon a Time in Hollywood (2019)' },
    ] },
  { id: 7, title: 'Whip Pan',
    feels: "One of the most popular TikTok transition techniques. Film one scene, whip the camera fast to the right, then cut — start the next clip with the same whip motion. It makes your edits look incredibly smooth and professional.",
    def: 'A whip pan is an extremely fast horizontal camera rotation that blurs the frame. It is used as a transition or to create disorienting speed.',
    ref: 'Ex. Scott Pilgrim vs. the World, 2010 — 0:18',
    realExamples: [
      { embedUrl: 'https://www.youtube.com/embed/AK7eV_r8f6I?start=35&end=48&rel=0', caption: 'La La Land (2016)' },
      { embedUrl: 'https://www.youtube.com/embed/R93bCGYoHto?rel=0', caption: 'Confessions of a Dangerous Mind (2002)' },
    ] },
  { id: 8, title: 'Zoom',
    feels: "Use a slow zoom in on your face during a YouTube reaction video when something surprises you — it heightens the drama perfectly. Or use a fast snap zoom on TikTok for a comedic punchline moment.",
    def: 'A zoom changes the focal length of the lens, making the subject appear closer or farther without physically moving the camera. It feels more artificial than a dolly.',
    ref: 'Ex. Once Upon a Time in the West, 1968 — 0:28',
    realExamples: [
      { embedUrl: 'https://www.youtube.com/embed/_I6Y-rtiTPc?rel=0', caption: "Ocean's Twelve (2004)" },
      { embedUrl: 'https://www.youtube.com/embed/Q94h0nVnPR0?rel=0', caption: 'Barry Lyndon (1975)' },
    ] },
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
      <div className="rail-title">Lessons · {String(LESSONS.length).padStart(2,'0')}</div>
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