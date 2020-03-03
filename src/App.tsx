import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

import './App.css';

const App = () => {
 const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const startChanfles = async () => {
      await loadModels();
      startCamera(videoRef);
    }

    if (videoRef && videoRef.current) {
      startChanfles();
    }
  });

	return (
		<div>
      <div className="Container">
			  <div> This is your Webcam ! </div>
        <video ref={videoRef} id="video" width="720" height="560" autoPlay muted />
      </div>
		</div>
	);
}

const loadModels = async () => {
  const MODEL_URL = process.env.PUBLIC_URL + '/models';

  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
  await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
}

const startCamera = (videoRef:React.RefObject<HTMLVideoElement>) => {
  if(!videoRef || !videoRef.current) {
    return;
  }

  const video = videoRef.current;

  navigator.getUserMedia(
    { video: {} },
    stream => {
        video.srcObject = stream;
    },
    err => console.error(err)
  )

  video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)

    document.body.append(canvas)
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
