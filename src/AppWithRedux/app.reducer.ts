export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export type AppActionsType = SetErrorACType | SetStatusACType


export type SetErrorACType = ReturnType<typeof SetErrorAC>
export type SetStatusACType = ReturnType<typeof SetStatusAC>


export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}


export const SetStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status: status} as const)
export const SetErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error: error} as const)
