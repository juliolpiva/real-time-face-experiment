import React from 'react';
import './App.css';

function App() {
	return (
		<div>
			<div className="Title"> This is your Webcam ! </div>
      <div className="Container">
        <video id="video" width="720" height="560" autoPlay muted />
      </div>
		</div>
	);
}

export default App;
