import React, { useRef, useLayoutEffect } from 'react';
import './App.css';

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useLayoutEffect(() => {
    if (videoRef && videoRef.current) {
      startCamera(videoRef);
    }
  })


	return (
		<div>
      <div className="Container">
			  <div> This is your Webcam ! </div>
        <video ref={videoRef} id="video" width="720" height="560" autoPlay muted />
      </div>
		</div>
	);
}


const startCamera = (videoRef:React.RefObject<HTMLVideoElement>) => {
  navigator.getUserMedia(
    { video: {} },
    stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    },
    err => console.error(err)
  )
}

export default App;
