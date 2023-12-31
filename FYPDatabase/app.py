from flask import Flask, render_template, Response
from FingerDectection import get_frame
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')

def generate_frames():
    while True:
        frame = get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), content_type='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
        app.run(debug=True)

