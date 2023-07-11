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
    params: loginParamsType
}


export type LogInActionTypes = LogInACType

export const loginReducer = (state: loginParamsType = initialState, action: LogInActionTypes): loginParamsType => {

    switch (action.type) {
        case 'login/LOG-IN':
            return {
                ...state, ...action.params, isAuth: true
            }
            // case 'login/LOG-OUT':
            // return {
            //     ...state, ...action.params, isAuth: false
            // }
        default:
            return state

    }
}



export const logInAC = (params: loginParamsType): LogInACType => {
    return {type: 'login/LOG-IN', params: params} as const
}
export const logInTC = (params: loginParamsType): AppThunk => (dispatch) => {
    dispatch(SetStatusAC('loading'))
    return authAPI.logIn(params)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(SetStatusAC('succeeded'))
                dispatch(logInAC(params))
                alert('success')
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            dispatch(SetStatusAC('failed'))
            handleServerNetworkError(error, dispatch)
        })
}




