// Learning screen — nav rail + film frame + Feels-Like definition + Try-it side card with webcam
const { useState: useLState, useRef, useEffect } = React;

const MODE_BY_TITLE = {
  'Static':     'static',
  'Handheld':   'handheld',
  'Tracking':   'tracking',
  'Dolly Zoom': 'dollyzoom',
};

function LearningScreen({ lessonId, onPick, onAdvance, completed }) {
  const lesson = LESSONS.find(l => l.id === lessonId) || LESSONS[0];
  const idx = LESSONS.findIndex(l => l.id === lesson.id);
  const pct = ((idx + 1) / LESSONS.length) * 100;

  // webcam state
  const [camActive, setCamActive] = useLState(false);
  const [recording, setRecording] = useLState(false);
  const [hasRecording, setHasRecording] = useLState(false);
  const [playingBack, setPlayingBack] = useLState(false);
  const [camError, setCamError] = useLState(null);

  const webcamRef   = useRef(null);
  const canvasRef   = useRef(null);
  const playbackRef = useRef(null);
  const streamRef   = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef   = useRef([]);
  const rafRef      = useRef(null);
  const tRef        = useRef(0);
  const blobUrlRef  = useRef(null);

  const mode = MODE_BY_TITLE[lesson.title] || 'static';

  // stop everything when lesson changes
  useEffect(() => {
    stopAll();
    return () => stopAll();
  }, [lessonId]);

  function stopAll() {
    cancelAnimationFrame(rafRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
    }
    setCamActive(false);
    setRecording(false);
    setHasRecording(false);
    setPlayingBack(false);
    setCamError(null);
  }

  async function openCamera() {
    setCamError(null);
    setHasRecording(false);
    setPlayingBack(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      webcamRef.current.srcObject = stream;
      setCamActive(true);

      if (mode === 'static') {
        webcamRef.current.style.display = 'block';
        canvasRef.current.style.display = 'none';
      } else {
        webcamRef.current.style.display = 'none';
        canvasRef.current.style.display = 'block';
        webcamRef.current.onloadedmetadata = () => {
          webcamRef.current.play();
          canvasRef.current.width  = webcamRef.current.videoWidth  || 640;
          canvasRef.current.height = webcamRef.current.videoHeight || 480;
          tRef.current = 0;
          startEffectLoop();
        };
      }
    } catch (e) {
      setCamError('Camera access denied. Allow camera in your browser settings.');
    }
  }

  function startEffectLoop() {
    cancelAnimationFrame(rafRef.current);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const vid = webcamRef.current;

    function draw() {
      if (!streamRef.current || vid.readyState < 2) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      tRef.current += 0.025;
      const t = tRef.current;

      if (mode === 'handheld') {
        // tilt + jitter
        const angle = Math.sin(t * 3) * 0.045;
        const jx = (Math.random() - 0.5) * 6;
        const jy = (Math.random() - 0.5) * 3;
        ctx.save();
        ctx.translate(W / 2 + jx, H / 2 + jy);
        ctx.rotate(angle);
        ctx.drawImage(vid, -W / 2, -H / 2, W, H);
        ctx.restore();

      } else if (mode === 'tracking') {
        // pan left/right — subject slides in and out of frame
        const shift = Math.sin(t * 0.7) * W * 0.28;
        const drawW = W * 1.35, drawH = H * 1.35;
        ctx.drawImage(vid, -(drawW - W) / 2 + shift, -(drawH - H) / 2, drawW, drawH);

      } else if (mode === 'dollyzoom') {
        // background zooms, face stays same size
        const scale = 1 + 0.4 * Math.abs(Math.sin(t * 0.5));
        ctx.drawImage(vid, (W - W * scale) / 2, (H - H * scale) / 2, W * scale, H * scale);
        // re-stamp center crop at original size
        const subW = W * 0.45, subH = H * 0.72;
        const srcX = (vid.videoWidth  - subW) / 2;
        const srcY = (vid.videoHeight - subH) / 2;
        ctx.drawImage(vid, srcX, srcY, subW, subH,
                          (W - subW) / 2, (H - subH) / 2, subW, subH);
      }

      rafRef.current = requestAnimationFrame(draw);
    }
    draw();
  }

  function startRecording() {
    chunksRef.current = [];
    if (blobUrlRef.current) { URL.revokeObjectURL(blobUrlRef.current); blobUrlRef.current = null; }

    const recStream = mode === 'static'
      ? streamRef.current
      : canvasRef.current.captureStream(30);

    const recorder = new MediaRecorder(recStream, { mimeType: 'video/webm' });
    recorder.ondataavailable = e => { if (e.data.size) chunksRef.current.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      blobUrlRef.current = URL.createObjectURL(blob);
      playbackRef.current.src = blobUrlRef.current;
      setHasRecording(true);
    };
    recorder.start();
    recorderRef.current = recorder;
    setRecording(true);
  }

  function stopRecording() {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop();
    }
    setRecording(false);
  }

  function doPlayback() {
    cancelAnimationFrame(rafRef.current);
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    webcamRef.current.style.display = 'none';
    canvasRef.current.style.display = 'none';
    playbackRef.current.style.display = 'block';
    playbackRef.current.play();
    setPlayingBack(true);
    setCamActive(false);
  }

  function resetCam() {
    stopAll();
    webcamRef.current.style.display = 'none';
    canvasRef.current.style.display = 'none';
    playbackRef.current.style.display = 'none';
  }

  const instructions = {
    static:    'Hold your laptop completely still.',
    handheld:  'Gently wobble your laptop as you film.',
    tracking:  'Slowly pan your laptop left and right.',
    dollyzoom: 'Zoom in while stepping back — watch the Vertigo effect!',
  };

  return (
    <main className="learn">
      <NavRail current={lesson.id} onPick={id => { resetCam(); onPick(id); }} completed={completed} />

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
          <Btn kind="ghost" onClick={() => { resetCam(); onPick(Math.max(1, lesson.id - 1)); }}>← Previous</Btn>
          <Btn kind="primary" onClick={() => { resetCam(); onAdvance(); }}>
            {lesson.id < LESSONS.length ? 'Next lesson →' : 'Take the quiz →'}
          </Btn>
        </div>
      </section>

      {/* RIGHT SIDE PANEL */}
      <aside className="side-panel">
        {/* Camera icon card */}
        <div className="side-card">
          <h4>The Tool</h4>
          <div className="cam-thumb">
            <img src={ICON_BY_TITLE[lesson.title]} alt={lesson.title} />
          </div>
          <div className="label">{lesson.title}</div>
        </div>

        {/* Try it yourself — webcam card */}
        <div className="side-card">
          <h4>Try it yourself</h4>

          {/* hidden video + canvas layers */}
          <video ref={webcamRef} autoPlay muted playsInline
            style={{display:'none', width:'100%', borderRadius:8, background:'#000'}} />
          <canvas ref={canvasRef}
            style={{display:'none', width:'100%', borderRadius:8, background:'#000'}} />
          <video ref={playbackRef} loop playsInline
            style={{display:'none', width:'100%', borderRadius:8, background:'#000'}} />

          {camError && (
            <p style={{fontSize:12, color:'var(--vl-red)', margin:'4px 0'}}>{camError}</p>
          )}

          {!camActive && !playingBack && (
            <>
              <p style={{margin:'0 0 10px', fontSize:13, lineHeight:1.5, color:'var(--vl-fg-2)'}}>
                {instructions[mode]}
              </p>
              <Btn kind="ghost" onClick={openCamera}>Open camera</Btn>
            </>
          )}

          {camActive && (
            <div style={{display:'flex', flexDirection:'column', gap:8, marginTop:8}}>
              {!recording ? (
                <Btn kind="primary" onClick={startRecording}>⏺ Record</Btn>
              ) : (
                <Btn kind="ghost" onClick={stopRecording}>⏹ Stop</Btn>
              )}
              {hasRecording && !recording && (
                <Btn kind="ghost" onClick={doPlayback}>▶ Play back</Btn>
              )}
              <Btn kind="ghost" onClick={resetCam} style={{opacity:0.6}}>↩ Back</Btn>
            </div>
          )}

          {playingBack && (
            <div style={{display:'flex', flexDirection:'column', gap:8, marginTop:8}}>
              {blobUrlRef.current && (
                <a href={blobUrlRef.current}
                   download={`my-${lesson.title.toLowerCase()}-shot.webm`}
                   className="btn btn-ghost"
                   style={{textAlign:'center'}}>
                  ⬇ Download
                </a>
              )}
              <Btn kind="ghost" onClick={resetCam}>↩ Back</Btn>
            </div>
          )}
        </div>
      </aside>
    </main>
  );
}
window.LearningScreen = LearningScreen;