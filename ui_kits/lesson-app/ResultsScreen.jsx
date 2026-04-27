// Results screen — score, character reaction, per-question review
function ResultsScreen({ answers, questions, onRetry, onHome }) {
  const score = answers.filter((a, i) => a === questions[i].correct).length;
  const total = questions.length;
  const pct = score / total;
  const heroImg = pct === 1 ? '/assets/laura.png'
                : pct >= 0.66 ? '/assets/bob-smirk.png'
                : pct >= 0.34 ? '/assets/bob-neutral.png'
                : '/assets/bob-angry.png';
  const headline = pct === 1 ? 'You see it now.'
                 : pct >= 0.66 ? 'Almost — one more pass.'
                 : pct >= 0.34 ? 'Better luck next round.'
                 : "You're fired!";
  return (
    <main className="results">
      <div className="hero">
        <span className="score-stamp">{score} / {total}</span>
        <img src={heroImg} alt="" />
      </div>
      <div className="panel">
        <Eyebrow>Quiz · Results</Eyebrow>
        <h1>{headline}</h1>
        <p className="score-line">You named <strong>{score}</strong> of {total} shots correctly.</p>
        <div className="review">
          {questions.map((q, i) => {
            const a = answers[i];
            const ok = a === q.correct;
            return (
              <div key={q.id} className={`review-row ${ok ? 'ok' : 'bad'}`}>
                <span className="ri">{ok ? '✓' : '✗'}</span>
                <span><strong>Q{i + 1}.</strong> {q.correct}{!ok && <span style={{color:'var(--vl-fg-3)'}}> — you chose {a || '—'}</span>}</span>
                <span className="meta">{q.correct.toUpperCase()}</span>
              </div>
            );
          })}
        </div>
        <div className="actions">
          <Btn kind="primary" onClick={onRetry}>Try again</Btn>
          <Btn kind="ghost" onClick={onHome}>Back to home</Btn>
        </div>
      </div>
    </main>
  );
}
window.ResultsScreen = ResultsScreen;
