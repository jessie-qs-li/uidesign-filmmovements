# Lesson App — UI Kit

High-fidelity recreation of the VibeLens lesson web app, applying the **Black Bean** design system to the four core screens of the Flask prototype: Home, Learning, Quiz, Results.

## Files
- `index.html` — interactive click-thru of the four screens
- `App.jsx` — top-level navigation / state
- `HomeScreen.jsx`, `LearningScreen.jsx`, `QuizScreen.jsx`, `ResultsScreen.jsx`
- `components.jsx` — Buttons, NavRail, FilmFrame, AnswerTile, Pill, Eyebrow, ProgressBar, SpeechBubble

## Recreated from
`uidesign-filmmovements/templates/{home,learn,quiz,results}.html` + `static/style.css` + `app.py` lesson/quiz data. Translated from the original light-blue Sketchbook aesthetic into the dark Black Bean theme defined in `colors_and_type.css`. Real assets (Bob, Laura, camera silhouettes, video clips) are reused unchanged.
