import { Api } from "../api"

interface Score {
    user_id: number
    input: string
    out_lunch: string
    lunch_entree: string
    exit: string
    status: number
    active: boolean
    created_at: string
    deleted_at: string
    day: number
    month: number
    year: number
}

async function listScoreId(id: number) {
    let response = await Api.get("/scoreDay/" + id);
    return response.data
}
async function createScore(id: number) {
    let response = await Api.post("/beatTime/" + id);
    return response.data
}

export {
    listScoreId,
    createScore
}

