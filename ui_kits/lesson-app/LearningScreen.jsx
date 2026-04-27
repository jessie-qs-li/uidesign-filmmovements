// Learning screen — nav rail + film frame + Feels-Like definition + Try-it side card
const { useState: useLState } = React;

function LearningScreen({ lessonId, onPick, onAdvance, completed }) {
  const lesson = LESSONS.find(l => l.id === lessonId) || LESSONS[0];
  const idx = LESSONS.findIndex(l => l.id === lesson.id);
  const pct = ((idx + 1) / LESSONS.length) * 100;
  return (
    <main className="learn">
      <NavRail current={lesson.id} onPick={onPick} completed={completed} />

      <section className="stage">
        <div className="lesson-meta">
          <Eyebrow>Lesson {String(lesson.id).padStart(2,'0')} of 04 · Camera Movement</Eyebrow>
          <span className="eyebrow" style={{color: 'var(--vl-highlight)'}}>{Math.round(pct)}% complete</span>
        </div>
        <ProgressBar value={pct} />
        <h1>{lesson.title}</h1>
        <p className="feels-like">{lesson.feels}</p>

        <FilmFrame
          src={VIDEO_BY_TITLE[lesson.title]}
          hud={`${lesson.title.toUpperCase()} · 0:00 / 0:08`}
          caption={lesson.ref}
        />

        <div className="definition"><strong>{lesson.title}.</strong> {lesson.def}</div>

        <div className="stage-footer">
          <Btn kind="ghost" onClick={() => onPick(Math.max(1, lesson.id - 1))}>← Previous</Btn>
          <Btn kind="primary" onClick={onAdvance}>
            {lesson.id < LESSONS.length ? 'Next lesson →' : 'Take the quiz →'}
          </Btn>
        </div>
      </section>

      <aside className="side-panel">
        <div className="side-card">
          <h4>The Tool</h4>
          <div className="cam-thumb"><img src={ICON_BY_TITLE[lesson.title]} alt={lesson.title} /></div>
          <div className="label">{lesson.title}</div>
        </div>
        <div className="side-card">
          <h4>Try it yourself</h4>
          <p style={{margin:0, fontSize:13, lineHeight:1.5, color:'var(--vl-fg-2)'}}>
            Open your camera and {lesson.title === 'Static' ? 'hold completely still' :
              lesson.title === 'Handheld' ? 'walk while you film' :
              lesson.title === 'Tracking' ? 'pan slowly side-to-side' :
              'zoom in while stepping back'}.
          </p>
          <Btn kind="ghost">Open camera</Btn>
        </div>
      </aside>
    </main>
  );
}
window.LearningScreen = LearningScreen;
