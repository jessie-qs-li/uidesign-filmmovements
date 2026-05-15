from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime

app = Flask(__name__)

lessons = [
    {
        "id": 1,
        "title": "Static",
        "description": "As you can see the camera shots are static and allow viewers to focus on the performances instead.",
        "tip": "The camera stays completely still on a tripod — no movement at all.",
        "video": "static-video.mp4",
        "camera_img": "cam-tripod.png"
    },
    {
        "id": 2,
        "title": "Handheld",
        "description": "Handheld has the camera held while filming to make the viewer feel like they're walking with the character.",
        "tip": "The operator physically holds the camera, creating natural shake and energy.",
        "video": "handheld-video.mp4",
        "camera_img": "cam-handheld.png"
    },
    {
        "id": 3,
        "title": "Tracking",
        "description": "Tracking has the camera follow or find the characters, making the viewers feel like they're in the movie.",
        "tip": "The camera moves on a dolly to smoothly follow alongside the subject.",
        "video": "tracking-video.mp4",
        "camera_img": "cam-tracking.png"
    },
    {
        "id": 4,
        "title": "Dolly Zoom",
        "description": "Dolly Zoom keeps the actor or object the same size while zooming in on the background, disorienting the viewers.",
        "tip": "Also called the Vertigo effect — the background warps while the subject stays the same size.",
        "video": "dollyzoom-video.mp4",
        "camera_img": "cam-dolly-zoom.png"
    }
]

quiz_questions = [
    {
        "id": 1,
        "scene": "The character stands alone delivering an emotional monologue. Focus should be entirely on her face.",
        "correct": "Static",
        "video": "static-video.mp4",
        "cameras": [
            {"label": "Static",     "file": "cam-tripod.png"},
            {"label": "Handheld",   "file": "cam-handheld.png"},
            {"label": "Tracking",   "file": "cam-tracking.png"},
            {"label": "Dolly Zoom", "file": "cam-dolly-zoom.png"},
        ]
    },
    {
        "id": 2,
        "scene": "The character sprints through a crowded market. The viewer should feel the chaos and energy.",
        "correct": "Handheld",
        "video": "handheld-video.mp4",
        "cameras": [
            {"label": "Static",     "file": "cam-tripod.png"},
            {"label": "Handheld",   "file": "cam-handheld.png"},
            {"label": "Tracking",   "file": "cam-tracking.png"},
            {"label": "Dolly Zoom", "file": "cam-dolly-zoom.png"},
        ]
    },
    {
        "id": 3,
        "scene": "The character walks down a city street. The camera should follow her smoothly the whole time.",
        "correct": "Tracking",
        "video": "tracking-video.mp4",
        "cameras": [
            {"label": "Static",     "file": "cam-tripod.png"},
            {"label": "Handheld",   "file": "cam-handheld.png"},
            {"label": "Tracking",   "file": "cam-tracking.png"},
            {"label": "Dolly Zoom", "file": "cam-dolly-zoom.png"},
        ]
    }
]

user_data = {
    "started": False, "start_time": None,
    "practice_visits": [], "quiz_answers": {}, "score": 0
}


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/start", methods=["POST"])
def start():
    user_data.update({"started": True, "start_time": str(datetime.now()),
                       "practice_visits": [], "quiz_answers": {}, "score": 0})
    return redirect(url_for("learn", lesson_id=1))


@app.route("/learn/<int:lesson_id>")
def learn(lesson_id):
    if not 1 <= lesson_id <= len(lessons):
        return redirect(url_for("home"))
    lesson = lessons[lesson_id - 1]
    user_data["practice_visits"].append({"lesson": lesson["title"], "time": str(datetime.now())})
    return render_template("learn.html", lesson=lesson, lessons=lessons,
                           current=lesson_id, total=len(lessons))


@app.route("/quiz")
def quiz_start():
    return redirect(url_for("quiz", question_id=1))


@app.route("/quiz/<int:question_id>", methods=["GET", "POST"])
def quiz(question_id):
    if request.method == "POST":
        answer = request.form.get("answer")
        prev = question_id - 1
        user_data["quiz_answers"][prev] = answer

    if question_id > len(quiz_questions):
        score = sum(1 for q in quiz_questions
                    if user_data["quiz_answers"].get(q["id"]) == q["correct"])
        user_data["score"] = score
        return redirect(url_for("results"))

    question = quiz_questions[question_id - 1]
    wrong_count = sum(1 for q in quiz_questions[:question_id - 1]
                      if user_data["quiz_answers"].get(q["id"]) != q["correct"])
    return render_template("quiz.html", question=question,
                           current=question_id, total=len(quiz_questions),
                           wrong_count=wrong_count)


@app.route("/results")
def results():
    score = user_data["score"]
    total = len(quiz_questions)
    msgs = {0: ("You're Fired!", "bob-angry.png"),
            1: ("Better Luck Next Time!", "bob-neutral.png"),
            2: ("Great!", "bob-smirk.png"),
            3: ("Congrats!", "laura.png")}
    message, bob_img = msgs.get(score, ("Done!", "bob-happy.png"))
    return render_template("results.html", score=score, total=total,
                           message=message, bob_img=bob_img,
                           quiz_questions=quiz_questions, user_data=user_data)


if __name__ == "__main__":
    app.run(debug=True)