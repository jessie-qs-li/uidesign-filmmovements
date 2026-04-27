// Quiz screen — drag a camera to Bob's outstretched hand
const { useState: useQState } = React;

const QUIZ_QUESTIONS = [
  { id: 1, scene: 'A character delivers an emotional monologue. The focus stays entirely on her face.',
    correct: 'Static', video: '/assets/videos/static-video.mp4' },
  { id: 2, scene: 'A character sprints through a crowded market. You should feel the chaos.',
    correct: 'Handheld', video: '/assets/videos/handheld-video.mp4' },
  { id: 3, scene: 'A character walks down a city street. The camera follows her smoothly.',
    correct: 'Tracking', video: '/assets/videos/tracking-video.mp4' },
];

const BOB_BY_WRONG = ['/assets/bob-happy.png','/assets/bob-smirk.png','/assets/bob-neutral.png','/assets/bob-angry.png'];

function QuizScreen({ onFinish }) {
  const [qIdx, setQIdx] = useQState(0);
  const [dragging, setDragging] = useQState(null);
  const [dragOver, setDragOver] = useQState(false);
  const [picked, setPicked] = useQState(null);
  const [revealed, setRevealed] = useQState(false);
  const [answers, setAnswers] = useQState([]);

  const q = QUIZ_QUESTIONS[qIdx];
  const wrongCount = answers.filter((a, i) => a !== QUIZ_QUESTIONS[i].correct).length;
  const bob = BOB_BY_WRONG[Math.min(wrongCount, 3)];

  function submit(title) {
    if (revealed) return;
    setPicked(title);
    setRevealed(true);
    setTimeout(() => {
      const next = [...answers, title];
      setAnswers(next);
      if (qIdx + 1 >= QUIZ_QUESTIONS.length) onFinish(next, QUIZ_QUESTIONS);
      else { setQIdx(qIdx + 1); setPicked(null); setRevealed(false); }
    }, 1100);
  }

  function onDragStart(title) { setDragging(title); }
  function onDragEnd() { setDragging(null); setDragOver(false); }
  function onDragOver(e) { e.preventDefault(); setDragOver(true); }
  function onDragLeave(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) setDragOver(false);
  }
  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (dragging && !revealed) submit(dragging);
    setDragging(null);
  }

  const dzState = revealed
    ? (picked === q.correct ? 'correct' : 'wrong')
    : dragOver ? 'drag-over' : '';

  return (
    <main className="quiz">

      <div className="quiz-header">
        <div>
          <Eyebrow>Quiz · Question {qIdx + 1} of {QUIZ_QUESTIONS.length}</Eyebrow>
          <h2>Help Bob make a movie. Drag the right camera to his hand.</h2>
        </div>
        <span className="quiz-pill">
          {wrongCount === 0 ? 'Perfect run' : `${wrongCount} wrong so far`}
        </span>
      </div>

      <div className="quiz-main">

        {/* Col 1 — Bob + drop zone */}
        <div className="bob-col">
          <div className="bob-hand-row">
            <img src={bob} alt="Bob" className="bob-img" />
            <div
              className={`drop-zone ${dzState}`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              {revealed ? (
                <img
                  src={ICON_BY_TITLE[picked]}
                  className={`dz-cam${picked !== q.correct ? ' dz-cam--wrong' : ''}`}
                  alt={picked}
                />
              ) : (
                <span className="dz-label">{dragOver ? 'Drop!' : 'Drop here'}</span>
              )}
            </div>
          </div>
          <div className="bubble">"I want to recreate this scene. Pass me the right camera!"</div>
        </div>

        {/* Col 2 — draggable camera options */}
        <div className="cameras-col">
          <span className="col-eyebrow">Drag to Bob →</span>
          {LESSONS.map(l => {
            const state = revealed
              ? (l.title === q.correct ? 'correct' : l.title === picked ? 'wrong' : '')
              : (dragging === l.title ? 'is-dragging' : '');
            return (
              <div
                key={l.id}
                className={`cam-option ${state}`}
                draggable={!revealed}
                onDragStart={() => onDragStart(l.title)}
                onDragEnd={onDragEnd}
              >
                <img src={ICON_BY_TITLE[l.title]} alt={l.title} />
                <span>{l.title}</span>
              </div>
            );
          })}
        </div>

        {/* Col 3 — film clip + scene */}
        <div className="film-col">
          <span className="col-eyebrow">The scene</span>
          <FilmFrame src={q.video} hud={`SCENE ${qIdx + 1}`} />
          <p className="scene-line">{q.scene}</p>
        </div>

      </div>
    </main>
  );
}
window.QuizScreen = QuizScreen;
window.QUIZ_QUESTIONS = QUIZ_QUESTIONS;
