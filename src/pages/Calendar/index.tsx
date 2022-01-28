import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { Info } from "../../assets/Icons";
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

interface BodyRequest extends tplotOptions {
    id?: string | number | undefined
    date?: string | undefined
    input?: string | undefined
    lunch_entree?: string | undefined
    out_lunch?: string | undefined
    exit?: string | undefined
    description?: string | undefined
}

type tplotOptions = {
    [key: string]: any
}

const Calendar: React.FC = () => {
    const emptyRequest = {
        date: "",
        id: 0,
        input: "",
        lunch_entree: "",
        out_lunch: "",
        exit: ""
    }

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
    const toast = useRef<any>(null);
    const [modalRequest, setModalRequest] = useState(false)
    const [submitted, setSubmitted] = useState(false);
    const [request, setRequest] = useState<BodyRequest | null>(emptyRequest)

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
        async function loadData() {
            try {
                const response = await Api.get(`/scoreMonth/${user?.id}/${monthCurrent + 1}/${yearCurrent}`);
                const data = response.data

                if (data[data.length - 1].Listed == "true") {

                    setUserData(response.data)
                }

            } catch (e) {
                return null
            }
            document.getElementsByClassName("day-marck active")[0].scrollIntoView({ behavior: 'smooth', block: "center" })
        }

        loadData()
    }, [])

    const converterHoras = (data: string) => {
        if (data === undefined) {
            return null
        }

        let newString = data.slice(13, 19) + data.slice(22, 25)

        if (newString[5] == ":") {
            newString = newString.slice(0, 5) + " " + newString.slice(6, 13)
        }

        return newString
    }

    const newRequest = async (e: MouseEvent<HTMLButtonElement>) => {
        const id: string | any = e.currentTarget.getAttribute("data-id");
        const day: string | any = e.currentTarget.getAttribute("data-day");
        const month: string | any = e.currentTarget.getAttribute("data-month");
        const year: string | any = e.currentTarget.getAttribute("data-year");
        const _request = { ...request }
        _request["id"] = id
        _request["date"] = `${day}-${month.padStart(2, '0')}-${year}`
        setRequest(_request)
        setModalRequest(true)
    }

    const saveRequest = async () => {
        try {
            const response = await Api.post(`/request/${request?.id}`, {
                input: `${request?.date} ${request?.input}:00`,
                out_lunch: `${request?.date} ${request?.out_lunch}:00`,
                lunch_entree: `${request?.date} ${request?.lunch_entree}:00`,
                exit: `${request?.date} ${request?.exit}:00`,
                description: request?.description
            })

            response.data &&
                response.data?.Request == "true" ? (
                toast.current.show({
                    severity: "success",
                    summary: "Tudo certo!",
                    detail: response.data.message,
                    life: 3000,
                })
            )
                :
                (
                    toast.current.show({
                        severity: "error",
                        summary: "Algo deu errado!",
                        detail: response.data.message,
                        life: 3000,
                    })
                )
        } catch (error) {
            return null
        }

        setSubmitted(!submitted);
        setModalRequest(false);
        setRequest(emptyRequest);
    }

    const ListDays: React.FC = () => {

        let listDays: Array<any> = []
        for (let i = 1; i <= daysCurrentMonth; i++) {
            let semana = dayOfWeek(yearCurrent, monthCurrent, i)
            let array: any = userData?.find(Element => Element.day === i)

            listDays.push(
                <li key={i} data-day={array?.id}>
                    <div className={i === today ? "day-marck active" : "day-marck"}>
                        <p className="day-title">{semana}</p>
                        <span className="day-circle">{i}</span>
                    </div>
                    <div className="day-info">
                        {
                            array ? (
                                <>
                                    <div className="day-body">
                                        <div className="card sucess">
                                            <p >{converterHoras(array?.input)}</p>
                                            <span>Entrada</span>
                                        </div>
                                        <div className="card failed">
                                            <p >{converterHoras(array?.out_lunch)}</p>
                                            <span>Saida p/ Almoço</span>
                                        </div>
                                        <div className="card sucess">
                                            <p >{converterHoras(array?.lunch_entree)}</p>
                                            <span>Entrada do Almoço</span>
                                        </div>
                                        <div className="card failed">
                                            <p >{converterHoras(array?.exit)}</p>
                                            <span>Saida</span>
                                        </div>
                                    </div>
                                    <Button
                                        data-id={array?.id}
                                        data-day={array?.day}
                                        data-month={array?.month}
                                        data-year={array?.year}
                                        icon="pi pi-plus"
                                        className="p-button p-mr-2"
                                        onClick={(e) => { newRequest(e) }}
                                    />
                                </>
                            ) :
                                <div className="day-body-flex">
                                    {Info}
                                    <p>Sem informações</p>
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

    const hideDialog = () => {
        setSubmitted(false);
        setModalRequest(false);
    };

    const modalRequestFooter = (
        <>
            <Button
                label="Cancelar"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialog}
            />
            <Button
                label="Salvar"
                icon="pi pi-check"
                className="p-button-text"
                onClick={saveRequest}
            />
        </>
    );

    const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val: any = (e.target && e.target.value) || "";
        const _request = { ...request };
        _request[`${name}`] = val;

        setRequest(_request);
    }

    return (
        <Main>
            <Toast ref={toast} />
            <ListDays />
            <Dialog
                visible={modalRequest}
                style={{ minWidth: "fit-content", minHeight: "fit-content" }}
                header="Solicitar Edição"
                modal
                className="p-fluid"
                footer={modalRequestFooter}
                onHide={hideDialog}
            >
                <div className="p-field">
                    <label htmlFor="input">Entrada</label>
                    <InputText
                        id="input"
                        autoComplete="off"
                        type="time"
                        value={request?.input}
                        onChange={(e) => onInputChange(e, "input")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted,
                        })}
                    />
                    {submitted && (
                        <small className="p-error">Entrada é obrigatório</small>
                    )}
                </div>
                <div className="p-field">
                    <label htmlFor="out_lunch">Saida p/ Almoço</label>
                    <InputText
                        id="out_lunch"
                        autoComplete="off"
                        type="time"
                        value={request?.out_lunch}
                        onChange={(e) => onInputChange(e, "out_lunch")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted,
                        })}
                    />
                    {submitted && (
                        <small className="p-error">Saida p/ Almoço é obrigatorio.</small>
                    )}
                </div>
                <div className="p-field">
                    <label htmlFor="lunch_entree">Entrada do Almoço</label>
                    <InputText
                        id="lunch_entree"
                        autoComplete="off"
                        type="time"
                        value={request?.lunch_entree}
                        onChange={(e) => onInputChange(e, "lunch_entree")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted,
                        })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="exit">Saida</label>
                    <InputText
                        id="exit"
                        autoComplete="off"
                        type="time"
                        value={request?.exit}
                        onChange={(e) => onInputChange(e, "exit")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted,
                        })}
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="description">Descrição</label>
                    <InputTextarea
                        id="description"
                        autoComplete="off"
                        value={request?.description}
                        onChange={(e) => onInputChange(e, "description")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted,
                        })}
                    />
                    {submitted && (
                        <small className="p-error">Descrição é obrigatorio.</small>
                    )}
                </div>
            </Dialog>
        </Main>
    )
}

export default Calendar;