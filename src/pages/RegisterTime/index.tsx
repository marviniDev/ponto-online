import React, { useEffect, useState } from "react";
import ProgressBar from '../../components/ProgressBar';
import { FloatingActions, ListPointScore, Main, Timing } from "./styles";


const RegisterTime: React.FC = () => {
    let [progress, setProgress] = useState(0);
    const [color, setColor] = useState('#7ea9e1');
    const [dateTime, setDateTime] = useState(new Date());
    const [employee, setEmployee] = useState({
        startWork: 0,
        totalHoursWork: 10,
        lanchHours: 3600,
    });
    let [totalTimeDay, setTotalTimeDay] = useState(0);
    let [pointScoreArray, setPointScoreArray] = useState([]);

    const dayName = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"]

    const ChangeTime = () => {
        // console.log("hora total do dia ", totalTimeDay);
        // let date = new Date();
        // let hour = date.getHours() * 60 * 60
        // let currentTime = hour + minuts
        // console.log(currentTime);

        // let minuts = date.getMinutes() * 60
        // let percentOnTimeTotal: number = Math.round((minuts * 100) / totalTimeDay)
        // console.log("hora que comecou", employee.startWork);
        // console.log("porcentagem ", percentOnTimeTotal);
        // return percentOnTimeTotal === Infinity ? 0 : percentOnTimeTotal

        return progress + 2
    }

    // const scorePoint = () => {
    //     let date = new Date();

    //     // let hour = date.getHours() * 60 * 60
    //     // let currentTime = hour + minuts
    //     let minuts = date.getMinutes() * 60
    //     console.log("hora atual", minuts);
    //     employee.startWork = minuts;
    //     console.log("hora somada", minuts + employee.totalHoursWork);
    //     setTotalTimeDay(10)
    //     pointScoreArray.push(dateTime.toLocaleTimeString())

    //     console.log(pointScoreArray);

    // }


    // useEffect(() => {
    //     const id = setInterval(() => {
    //         setProgress(ChangeTime())
    //         setDateTime(new Date())
    //     }, 1000)
    //     return () => {
    //         clearInterval(id);
    //     }
    // }, [totalTimeDay, progress, setProgress])

    const hoursMinSecs = { hours: 0, minutes: 0, seconds: 60 }

    const { hours = 0, minutes = 0, seconds = 60 }: any = hoursMinSecs;
    const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);


    const tick = () => {
        let time = (hours * 60 * 60) + (minutes * 60) + seconds
        let currentTime = (hrs * 60 * 60) + (mins * 60) + secs

        if (hrs === 0 && mins === 0 && secs === 0)
            reset()
        else if (mins === 0 && secs === 0) {
            setTime([hrs - 1, 59, 59]);
            setProgress(Math.round((currentTime * 100) / time) - 10)

        } else if (secs === 0) {
            setTime([hrs, mins - 1, 59]);
            setProgress(Math.round((currentTime * 100) / time) - 10)

        } else {
            setTime([hrs, mins, secs - 1]);
            setProgress(Math.round((currentTime * 100) / time) - 10)

        }

        console.log(Math.round((currentTime * 100) / time) - 10);


        setDateTime(new Date())


    };


    const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);


    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    return (
        <Main>
            <p>{dayName[dateTime.getDay()] + ", " + dateTime.toLocaleDateString()}</p>
            <p>{dateTime.toLocaleTimeString()}</p>
            <Timing>
                <ProgressBar
                    progress={progress}
                    size={250}
                    strokeWidth={12}
                    circleOneStroke='#d9edfe'
                    circleTwoStroke={color}
                />
                <p>{`${hrs.toString().padStart(2, '0')}:${mins
                    .toString()
                    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p>
            </Timing>
            <FloatingActions>
                <div>
                    <button type="button" >Marcar ponto</button>
                </div>
            </FloatingActions>
            <ListPointScore>
                {
                    pointScoreArray.map((value, index) => {
                        return <li key={value}>{value}</li>
                    })
                }
            </ListPointScore>
        </Main>
    );
}

export default RegisterTime