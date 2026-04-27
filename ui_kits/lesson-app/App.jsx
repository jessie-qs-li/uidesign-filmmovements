// Top-level App — switches between Home / Learning / Quiz / Results
const { useState: useAppState } = React;

function App() {
  const [screen, setScreen] = useAppState('home'); // home | learn | quiz | results
  const [lessonId, setLessonId] = useAppState(1);
  const [completed, setCompleted] = useAppState(new Set());
  const [quizResult, setQuizResult] = useAppState(null);

  function pickLesson(id) {
    if (id === 'quiz') return setScreen('quiz');
    setLessonId(id);
    setScreen('learn');
  }
  function advance() {
    setCompleted(prev => new Set([...prev, lessonId]));
    if (lessonId < LESSONS.length) setLessonId(lessonId + 1);
    else setScreen('quiz');
  }
  function finishQuiz(answers, qs) {
    setQuizResult({ answers, questions: qs });
    setScreen('results');
  }

  const tabs = [
    ['home', 'Home'],
    ['learn', 'Learn'],
    ['quiz', 'Quiz'],
    ['results', 'Results'],
  ];

  return (
    <div className="app-shell" data-screen-label={`${screen}`}>
      <header className="appbar">
        <div className="brand">
          <h1>VibeLens</h1>
          <span className="tag">— Learn to see what the director sees.</span>
        </div>
        <nav>
          {tabs.map(([id, label]) => (
            <button key={id}
              className={screen === id ? 'active' : ''}
              onClick={() => {
                if (id === 'results' && !quizResult) return;
                setScreen(id);
              }}>{label}</button>
          ))}
        </nav>
      </header>
      {screen === 'home' && <HomeScreen onStart={() => { setLessonId(1); setScreen('learn'); }} onQuiz={() => setScreen('quiz')} />}
      {screen === 'learn' && <LearningScreen lessonId={lessonId} onPick={pickLesson} onAdvance={advance} completed={completed} />}
      {screen === 'quiz' && <QuizScreen onFinish={finishQuiz} />}
      {screen === 'results' && quizResult &&
        <ResultsScreen answers={quizResult.answers} questions={quizResult.questions}
          onRetry={() => { setQuizResult(null); setScreen('quiz'); }}
          onHome={() => setScreen('home')} />}
      {screen === 'results' && !quizResult &&
        <main style={{padding: '64px 80px', color: 'var(--vl-fg-2)'}}>Take the quiz first to see results.</main>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
