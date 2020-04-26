import React from 'react';

import { NativeButton } from './Button.styles';

export type ButtonProps = {
    children: string | string[] | Node
    disabled?: boolean
    onClick(event: Object): void
}

const Button: React.FC<ButtonProps> = ({
    disabled,
    children,
    onClick,
}) => {
    return (
        <NativeButton
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </NativeButton>
    );
}

export default Button;
