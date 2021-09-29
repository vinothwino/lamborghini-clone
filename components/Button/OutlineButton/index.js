import React from 'react';

const Button = ({ children, theme }) => {
    return (
        <a
            href="#"
            className={`btn custom-btn-outline theme-${theme}`}
        >
            {children}
        </a>
    );
}

Button.defaultProps = {
    theme: "light"
}

export default Button;