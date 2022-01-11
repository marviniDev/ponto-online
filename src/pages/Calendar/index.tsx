import React, { useEffect, useState } from "react";
import Json from "./data.json";
import { Main } from "./styles";

const Calendar: React.FC = () => {
    const [date, setDate] = useState(new Date())
    const [months] = useState(['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'])
    const [weekDays] = useState(['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'])
    const yearCurrent = date.getFullYear()
    const monthCurrent = date.getMonth()
    const today = date.getDate()
    const dayOfWeekToday = dayOfWeek(yearCurrent, monthCurrent, today)
    const daysCurrentMonth = daysOfMonth(yearCurrent, monthCurrent)
    const [userData] = useState(Json.data)
    const ElementActive = React.useRef<HTMLLIElement>(null);

    function daysOfMonth(year: number, month: number) {
        let date = new Date(year, month, 0)
        return date.getDate()
    }

    function dayOfWeek(year: number, month: number, day: number) {
        let date = new Date(year, month, day)
        return weekDays[date.getDay()]
    }

    function getInfoDate(date: Date) {
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()

        const beginDay = new Date(year, month).getDate()
        const endedDay = new Date(year, month, 0).getDate()
        const dayOfWeekToday = weekDays[new Date(year, month, day).getDay()]

        return {
            beginDay: beginDay,
            endedDay: endedDay,
            dayOfWeekToday: dayOfWeekToday,
        }
    }

    useEffect(() => {
        ElementActive.current?.scrollIntoView({ behavior: 'smooth', block: "center" })
    }, [])


    const ListDays: React.FC = () => {

        let listDays: Array<any> = []
        for (let i = 1; i <= daysCurrentMonth; i++) {
            let semana = dayOfWeek(yearCurrent, monthCurrent, i)
            let array: any = userData.find(Element => Element.dia === i)

            listDays.push(
                i === today ?
                    <li ref={ElementActive} key={i}>
                        <div className="day-marck active">
                            <p className="day-title">{semana}</p>
                            <span className="day-circle">{i}</span>
                        </div>
                        <div className="day-info">
                            <div className="day-body">
                                <div>
                                    <p>{array?.entrada1}</p>
                                    <span>Entrada</span>
                                </div>
                                <div>
                                    <p>{array?.saida1}</p>
                                    <span>Saida</span>
                                </div>
                            </div>
                            <div className="day-body">
                                <div>
                                    <p>{array?.entrada2}</p>
                                    <span>Entrada</span>
                                </div>
                                <div>
                                    <p>{array?.saida2}</p>
                                    <span>Saida</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    :
                    <li key={i}>
                        <div className="day-marck">
                            <p className="day-title">{semana}</p>
                            <span className="day-circle">{i}</span>
                        </div>
                        <div className="day-info">
                            <div className="day-body">
                                <div>
                                    <p>{array?.entrada1}</p>
                                    <span>Entrada</span>
                                </div>
                                <div>
                                    <p>{array?.saida1}</p>
                                    <span>Saida</span>
                                </div>
                            </div>
                            <div className="day-body">
                                <div>
                                    <p>{array?.entrada2}</p>
                                    <span>Entrada</span>
                                </div>
                                <div>
                                    <p>{array?.saida2}</p>
                                    <span>Saida</span>
                                </div>
                            </div>
                        </div>
                    </li>
            )
        }
        return (
            <>
                {listDays}
            </>
        )
    }


    return (
        <Main>
            <ListDays />
        </Main>
    )
}

export default Calendar;