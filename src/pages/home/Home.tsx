import React, { useRef, useEffect, useState, useCallback } from 'react';

// Video
import * as faceapi from 'face-api.js';
import { loadModels } from '../../utils/video/models';

// Components
import Button from '../../components/button';
import {
    Wrapper,
    Header,
    Title,
    Actions,
    Content,
    Video,
    CanvasWrapper,
} from './Home.styles'

const Home = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [init, setInit] = useState(false);
    const [showCanvas, setShowCanvas] = useState(false);

    useEffect(() => {
        if (videoRef?.current && init) {
            initialize(videoRef, containerRef);
        }
    }, [init]);

    const handleInit = useCallback(
        (event: Object) => setInit(true)
    , []);

    const handleCanvas = useCallback(
        (event: Object) => setShowCanvas(!showCanvas)
    , [showCanvas]);

	return (
        <Wrapper>
            <Header>
                <Title> Hey! Smile! Be Happy! :) </Title>
                <Actions>
                    <Button disabled={init} onClick={handleInit}> { init ? 'Wait a sec' : 'Start' } </Button>
                    <Button disabled={!init} onClick={handleCanvas}> Show Mask </Button>
                </Actions>
            </Header>
            <Content>
                <Video ref={videoRef} id="video" className="video" width="740" height="560" autoPlay muted />
                <CanvasWrapper ref={containerRef} className="canvas" style={{ display: `${showCanvas ? 'inherit' : 'none'}` }}/>
            </Content>
        </Wrapper>
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

const startCamera = (videoRef:React.RefObject<HTMLVideoElement>, containerRef:React.RefObject<HTMLDivElement>) => {
    if(!videoRef || !videoRef.current) {
        return;
    }

    const video = videoRef.current;
    const container = containerRef.current;

    initializeCamera(videoRef);

    const playVideo = () => {
        const canvas = faceapi.createCanvasFromMedia(video)

        canvas.classList.add('canvas')
        container?.append(canvas)

        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            const resizedDetections = faceapi.resizeResults(detections, displaySize)

            let value = null;

            if (detections?.length > 0) {
                value = Object.entries(detections?.[0]?.expressions)?.find(item => item?.[1] >= 0.95)?.[0];
            }

            if (value) {
                console.log(value);
            }

            if (canvas) {
                canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)

                faceapi.draw.drawDetections(canvas, resizedDetections)
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
                faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
            }
        }, 100)
    };

    video.addEventListener('play',playVideo)
}

export default Home;
