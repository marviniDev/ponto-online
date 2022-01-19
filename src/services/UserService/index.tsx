import { Api } from "../api"

export interface User {
    hierarchy?: number
    name?: string
    password?: string
    image?: string
    extras?: number
    active?: number
    created_at?: string
}

async function listAllUsers() {
    try {
        let response = await Api.get("/users");
        return response
    } catch (e) {
        console.error(e)
    }
}
async function listUserId(id: number) {
    try {
        let response = await Api.get("/userId/" + id);
        return response
    } catch (e) {
        console.error(e)
    }
}
async function createUser(data: User) {
    try {
        let response = await Api.post("/user", { ...data });
        return response
    } catch (e) {
        console.error(e)
    }
}
async function deleteUserId(id: number) {
    try {
        let response = await Api.delete("/user/" + id);
        return response
    } catch (e) {
        console.error(e)
    }
}
async function updateUser(data: User) {
    try {
        let response = await Api.post("/user", { ...data });
        return response
    } catch (e) {
        console.error(e)
    }
}
async function forgetPassword(data: User) {
    try {
        let response = await Api.post("/forgotPassword", { ...data });
        return response
    } catch (e) {
        console.error(e)
    }
}

export {
    listAllUsers,
    listUserId,
    createUser,
    deleteUserId,
    updateUser,
    forgetPassword
}

