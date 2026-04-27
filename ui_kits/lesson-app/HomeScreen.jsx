// Home screen — Black Bean editorial hero
function HomeScreen({ onStart, onQuiz }) {
  return (
    <main className="home">
      <div className="copy">
        <Eyebrow>VibeLens · Film Literacy 01</Eyebrow>
        <h1>Learn to see what the <em>director</em> sees.</h1>
        <p className="lede">Four lessons. Three quizzes. No filmmaking background required — just the movies you've already loved.</p>
        <div className="ctas">
          <Btn kind="primary" onClick={onStart}>Start practice →</Btn>
          <Btn kind="ghost" onClick={onQuiz}>Skip to quiz</Btn>
        </div>
        <div className="meta-row">
          <div className="item"><span className="num">04</span><span className="lbl">Movements</span></div>
          <div className="item"><span className="num">03</span><span className="lbl">Quiz Rounds</span></div>
          <div className="item"><span className="num">12</span><span className="lbl">Minutes</span></div>
        </div>
      </div>
      <div className="hero">
        <span className="hero-tag">Lesson 00 · Welcome</span>
        <img src="/assets/laura.png" alt="Laura, your guide" />
        <div className="hero-quote">"You already feel it.<br/>I'll just give you the words."</div>
      </div>
    </main>
  );
}
window.HomeScreen = HomeScreen;
