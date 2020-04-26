import styled from 'styled-components';

import {
    primary,
    primaryLight,
    secondary,
    disabled
} from '../../theme/colors';

export const NativeButton = styled.button`
    position: relative;
    min-width: 100px;
    min-height: 36px;
    text-align: center;
    transition: all 0.3s;
    appearance: none;
    background-color: ${primary};
    color: ${secondary};
    border: 1px solid transparent;
    font-size: 14px;
    margin: 11px 4px;
    border-radius: 4px;
    letter-spacing: 0.5px;
    font-family: cursive;

    :hover {
        border: 1px ${primary} solid;
        background-color: ${primaryLight};
        cursor: pointer;
    }

    :disabled {
        cursor: not-allowed;
        border: none;
    }

    :active {
        background-color: ${primary};
        color: ${secondary};
    }

    :disabled {
        background-color: ${disabled};
        cursor: not-allowed;
    }
`;
