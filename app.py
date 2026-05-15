from flask import Flask, send_from_directory
import os

BASE = os.path.dirname(os.path.abspath(__file__))
LESSON_APP = os.path.join(BASE, 'ui_kits', 'lesson-app')

app = Flask(__name__, static_folder=None)


@app.route('/')
def index():
    return send_from_directory(LESSON_APP, 'index.html')


@app.route('/colors_and_type.css')
def colors_and_type():
    return send_from_directory(BASE, 'colors_and_type.css')


@app.route('/assets/<path:filename>')
def assets(filename):
    return send_from_directory(os.path.join(BASE, 'assets'), filename)


@app.route('/<path:filename>')
def lesson_app_files(filename):
    return send_from_directory(LESSON_APP, filename)


if __name__ == '__main__':
    app.run(debug=True, port=5002)
