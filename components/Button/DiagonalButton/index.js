const svgs = {
    "right-arrow": (<path
        className="foreground right"
        d="M0 0l7.432 5.674L14.864 0"
        transform="rotate(-90 935.432 -711.068)">
    </path>),
    "left-arrow": (
        <path
            className="foreground left"
            d="M0 5.675L7.432 0l7.432 5.675"
            transform="rotate(-90 935.432 -711.068)">
        </path>
    ),
    "plus": (
        <g class="foreground left" transform="translate(627 -5248.5)">
            <path d="M0 0v15" transform="translate(1022.5 5458.5)"></path>
            <path d="M0 0v15" transform="rotate(90 -2218 3248)"></path>
        </g>
    )
}
const DiagonalButton = ({ iconName, href, width, className, height, onClick, theme }) => {
    let svgPath = svgs[iconName]
    return (
        <a
            href={href}
            className={`diagonal-btn ${theme} ${className}`}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50.464 58.271"
                className="exagon"
                width={width}
                height={height}
            >
                <g
                    strokeWidth="1.5"
                    transform="translate(-1624 -187.923)"
                >
                    <path
                        className="background exagon"
                        d="M50.464 43.992L25.732 58.271 1 43.992V15.434L25.732 1.155l24.732 14.279z"
                        transform="translate(1623.5 187.345)"
                    >
                    </path>
                    {svgPath}
                </g>
            </svg>
        </a>
    );
}

DiagonalButton.defaultProps = {
    iconName: 'right-arrow',
    href: 'javascript:void(0)',
    theme: 'light'
}

export default DiagonalButton;