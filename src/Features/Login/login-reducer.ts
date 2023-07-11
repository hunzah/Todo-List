import {AppThunk} from '../../store';
import {authAPI, loginParamsType} from '../../api/todolistsAPI';
import {SetStatusAC} from '../../AppWithRedux/app.reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/ErrorUtils';


const initialState: loginParamsType = {
    email: '',
    password: '',
    rememberMe: false,
    captcha: '',
    isAuth: false
}

type LogInACType = {
    type: 'login/LOG-IN',
    isAuth: boolean
}


export type LogInActionTypes = LogInACType

export const loginReducer = (state: loginParamsType = initialState, action: LogInActionTypes): loginParamsType => {

    switch (action.type) {
        case 'login/LOG-IN':
            return {
                ...state, isAuth: action.isAuth,
            }
        // case 'login/LOG-OUT':
        //     return {
        //         ...state, ...action.params, action.isAuth,
        //     }
        default:
            return state

    }
}


export const logInAC = (isAuth: boolean): LogInACType => {
    return {type: 'login/LOG-IN', isAuth: isAuth} as const
}
export const logInTC = (params: loginParamsType): AppThunk => (dispatch) => {
    dispatch(SetStatusAC('loading'))
    return authAPI.logIn(params)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(SetStatusAC('succeeded'))
                dispatch(logInAC(true))
                console.log('Login Successful')
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            dispatch(SetStatusAC('failed'))
            handleServerNetworkError(error, dispatch)
        })
}




