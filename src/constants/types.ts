export type RootStackParamList = {
    Home:undefined,
    Detail:{ id: number },
    Login:undefined,
    Register:undefined
}

export type actionType = {
    type: string,
    data: any
}

export type user = {
    displayName:string,
   email:string,
   uid:string
}