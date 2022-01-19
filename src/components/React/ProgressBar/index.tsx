import React, { useEffect, useState, useRef, ReactNode } from 'react';

import "./styles.css"

interface ProgressBarProps {
    size: number,
    progress: number,
    strokeWidth: number,
    circleOneStroke: string,
    circleTwoStroke: string,
    children?: ReactNode | null,
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
    const [offset, setOffset] = useState(0);
    const circleRef = useRef<any>(null);
    const {
        size,
        progress,
        strokeWidth,
        circleOneStroke,
        circleTwoStroke,
        children,
    } = props;

    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const progressOffset = ((100 - progress) / 100) * circumference;
        setOffset(progressOffset);

        circleRef.current.style = 'transition: stroke-dashoffset 850ms ease-in-out';

    }, [setOffset, progress, circumference, offset]);

    return (
        <svg
            className="svg"
            width={size}
            height={size}
        >
            <circle
                className="svg-circle-bg"
                stroke={circleOneStroke}
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
            />
            <circle
                className="svg-circle"
                ref={circleRef}
                stroke={circleTwoStroke}
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
            />
            <text
                x={`${center}`}
                y={`${center}`}
                className="svg-circle-text">
                {children}
            </text>
        </svg>
    );
}
export default ProgressBar;