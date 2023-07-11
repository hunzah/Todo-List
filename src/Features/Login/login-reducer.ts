import {AppThunk} from '../../store';
import {authAPI, loginParamsType} from '../../api/todolistsAPI';
import {RequestStatusType, SetStatusAC} from '../../AppWithRedux/app.reducer';
import {handleServerNetworkError} from '../../utils/ErrorUtils';


const initialState: loginParamsType = {
    email: '',
    password: '',
    rememberMe: false,
    captcha: ''
}
export type LogInActionTypes = ReturnType<typeof logInAC>

export const loginReducer = (state: loginParamsType = initialState, action: LogInActionTypes): loginParamsType => {

    switch (action.type) {
        case 'LOG-IN':
            return {
                ...state, ...action.params
            }
        default:
            return state

    }
}
type LogInACType = {
    type: 'LOG-IN',
    params: loginParamsType
}

export const logInAC = (params: loginParamsType): LogInACType => {
    return {type: 'LOG-IN', params: params} as const
}
export const logInTC = (params: loginParamsType): AppThunk => (dispatch) => {
    dispatch(SetStatusAC('loading'))
    return authAPI.logIn(params)
        .then((res) => {
            dispatch(SetStatusAC('succeeded'))
        })
        .catch((error) => {
            alert('Error')
            dispatch(SetStatusAC('failed'))
            handleServerNetworkError(error, dispatch)
        })
}




