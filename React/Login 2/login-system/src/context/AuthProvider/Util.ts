import { Api } from "../../services/API"
import { IUser } from "./Types"

export function setUserLocalStorage(user: IUser | null){
    localStorage.setItem('u', JSON.stringify(user))
}

export function getUserLocalStorage(){
    const json = localStorage.getItem('u')
    if(!json){
        return null
    }

    const user = JSON.stringify(json)
    return user ?? null
}

export async function LoginRequest(email: string, password: string){
    try{
        const request = await Api.post('login', {email, password})

        return request.data
    }
    catch (error){
        return null
    }
}