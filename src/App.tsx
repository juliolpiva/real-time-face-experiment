import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

import './App.css';

const App = () => {
 const videoRef = useRef<HTMLVideoElement>(null);
 const containerRef = useRef<HTMLDivElement>(null);

 const [init, setInit] = useState(false);
 const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    if (videoRef?.current && init) {
      initialize(videoRef, containerRef);
    }
  }, [init]);

	return (
    <main className="main">
      <header>
        <h1> This is your Webcam ! </h1>
        <div className="actions">
          <button onClick={() => setInit(true)}> Start </button>
          <button onClick={() => setShowCanvas(!showCanvas)}> Show Mask </button>
        </div>
      </header>
      <section className="container">
        <video ref={videoRef} id="video" className="video" width="740" height="560" autoPlay muted />
        <div ref={containerRef} className="canvas" style={{ display: `${showCanvas ? 'inherit' : 'none'}` }}/>
      </section>
    </main>
	);
}

const initialize = async (videoRef:React.RefObject<HTMLVideoElement>, containerRef:React.RefObject<HTMLDivElement>) => {
  await loadModels();
  startCamera(videoRef, containerRef);
}

const initializeCamera = async (videoRef:React.RefObject<HTMLVideoElement>) => {
  const video = videoRef.current;

  if (!video) {
    return null;
  }

  navigator.getUserMedia(
    { video: {} },
    stream => {
        video.srcObject = stream;
    },
    err => console.error(err)
  )
}

const loadModels = async () => {
  const MODEL_URL = process.env.PUBLIC_URL + '/models';

  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
  await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
}

const startCamera = (videoRef:React.RefObject<HTMLVideoElement>, containerRef:React.RefObject<HTMLDivElement>) => {
  if(!videoRef || !videoRef.current) {
    return;
  }

  const video = videoRef.current;
  const container = containerRef.current;

  initializeCamera(videoRef);

  video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    
    canvas.classList.add('canvas')
    container?.append(canvas)

    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)

    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      const resizedDetections = faceapi.resizeResults(detections, displaySize)

      if (canvas) {
        canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)
  
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
      }
    }, 100)
  })
}

export default App;
