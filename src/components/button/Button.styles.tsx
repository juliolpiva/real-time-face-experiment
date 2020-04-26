import styled from 'styled-components';

import {
    white,
    black,
    nearBlack,
    disabled
} from '../../theme/colors';

export const NativeButton = styled.button`
    position: relative;
    min-width: 100px;
    min-height: 36px;
    text-align: center;
    border: none;
    transition: all 0.3s;
    appearance: none;
    color: ${white};
    background-color: ${black};
    border: 1px solid transparent;
    font-size: 14px;
    margin: 11px 4px;
    border-radius: 4px;
    letter-spacing: 0.5px;

    :hover {
        background-color: ${nearBlack};
        cursor: pointer;
    }

    :disabled {
        cursor: not-allowed;
    }

    :active {
        color: ${white};
        background-color: ${black};
    }

    :disabled {
        background-color: ${disabled};
        cursor: not-allowed;
    }
`;
