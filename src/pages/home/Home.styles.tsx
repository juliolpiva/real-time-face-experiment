
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5rem;
`;

export const Header = styled.header``;

export const Title = styled.h1``;

export const Actions = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 1rem;
`;

export const Content = styled.body`
    position: relative;
    display: flex;
    justify-content: center;
`;

export const Video = styled.video`
    position: absolute;
`;

export const CanvasWrapper = styled.div`
    position: absolute;
    margin-top: 2px;
    width: 740px;
    height: 560px;
`;
