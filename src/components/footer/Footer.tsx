import React, { useMemo } from 'react';
import styled from 'styled-components';

// Styles
import { beer, heart, black } from '../../theme/colors';

// Components
import { FaGithub, FaBeer, FaHeart } from 'react-icons/fa';

// Constants
const GITHUB_URL = 'https://github.com/juliolpiva';

const Wrapper = styled.footer`
    font-size: 20px;
    position: absolute;
    bottom: 0;
    margin: 1rem;
`;

const Footer = () => {
        const beerIcon = useMemo(() => <FaBeer color={beer} />, []);
        const loveIcon = useMemo(() => <FaHeart color={heart} />, []);
        const githubIcon = useMemo(() => (
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                    <FaGithub color={black} />
                </a>
        ), []);

        return (
        <Wrapper>
            Made with {beerIcon} and {loveIcon} by Júlio L. Piva {githubIcon}
        </Wrapper>
    );
}

export default Footer;
