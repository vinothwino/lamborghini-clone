import React from 'react';

const Button = ({ className, children, theme }) => {
    return (
        <a
            href="#"
            className={`btn custom-btn-outline theme-${theme} ${className}`}
        >
            {children}
        </a>
    );
}

Button.defaultProps = {
    theme: "light"
}

export default Button;