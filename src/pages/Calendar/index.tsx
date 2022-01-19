import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Api } from "../../services/api";
import { Main } from "./styles";

interface UserScoreProps {
    id: number
    active: boolean
    created_at: string
    day: number
    deleted_at: string
    exit: string
    extra: string
    input: string
    lunch_entree: string
    month: number
    out_lunch: string
    status: string
    year: string
    request_id: string
    users_id: string
}

const Calendar: React.FC = () => {
    const [userData, setUserData] = useState<Array<UserScoreProps> | null>(null)
    const [date] = useState(new Date())
    const [months] = useState(['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'])
    const [weekDays] = useState(['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'])
    const yearCurrent = date.getFullYear()
    const monthCurrent = date.getMonth()
    const today = date.getDate()
    const dayOfWeekToday = dayOfWeek(yearCurrent, monthCurrent, today)
    const daysCurrentMonth = daysOfMonth(yearCurrent, monthCurrent)
    const ElementActive = React.useRef<HTMLLIElement>(null);
    const { user } = useAuth()
    const toast = useRef(null);


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
        document.getElementsByClassName("day-marck active")[0].scrollIntoView({ behavior: 'smooth', block: "center" })

        async function loadData() {
            try {
                let response = await Api.get("/scoreMonth/" + user?.id, { data: { month: 1, year: 2022 } });

                response.data && setUserData(response.data)

                console.log(userData);

            } catch (e) {
                return null
            }
        }

        loadData()
    }, [])


    const ListDays: React.FC = () => {

        let listDays: Array<any> = []
        for (let i = 1; i <= daysCurrentMonth; i++) {
            let semana = dayOfWeek(yearCurrent, monthCurrent, i)
            let array: any = userData?.find(Element => Element.day === i)

            listDays.push(
                <li key={i}>
                    <div className={i === today ? "day-marck active" : "day-marck"}>
                        <p className="day-title">{semana}</p>
                        <span className="day-circle">{i}</span>
                    </div>
                    <div className="day-info">
                        {
                            array ? (
                                <>
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
                                </>
                            ) :
                                <div>
                                    <div className="day-body">
                                        <p>nothing</p>
                                    </div>

                                </div>
                        }

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