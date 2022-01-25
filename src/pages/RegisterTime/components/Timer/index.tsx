import React, { useEffect, useState } from "react";
import ProgressBar from "../../../../components/React/ProgressBar";
import { TimerContainer, Timing } from "./styles";

const TimerComponent: React.FC = () => {
    const [color] = useState('var(--cor-main)');
    const [dateTime, setDateTime] = useState(new Date());
    const dayName = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]


    const timer = () => {
        setDateTime(new Date())
    };

    useEffect(() => {
        const timerId = setInterval(() => timer(), 1000);
        return () => clearInterval(timerId);
    });

    return (
        <TimerContainer>
            <h3>{dayName[dateTime.getDay()] + ", " + dateTime.toLocaleDateString()}</h3>
            <Timing>
                <ProgressBar
                    progress={100}
                    size={220}
                    strokeWidth={13}
                    circleOneStroke='#d9edfe'
                    circleTwoStroke={color}
                />
                {/* <p>{`${hrs.toString().padStart(2, '0')}:${mins
                    .toString()
                    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> */}
                <p>{dateTime.toLocaleTimeString()}</p>

            </Timing>
        </TimerContainer>
    );
}

export default TimerComponent