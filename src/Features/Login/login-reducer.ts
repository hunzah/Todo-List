import {AppThunk} from '../../store';
import {authAPI, loginParamsType} from '../../api/todolistsAPI';
import {SetStatusAC} from '../../AppWithRedux/app.reducer';

initialStateType

const initialState: loginParamsType = {
    email: '',
    password: '',
    rememberMe: false,
    captcha: ''
}
type ActionTypes = ReturnType<typeof logInAC>

export const loginReducer = (state: loginParamsType = initialState, action: ActionTypes): loginParamsType => {

    switch (action.type) {
        case 'LOG-IN':
            return {
                ...state, ...action.params
            }
        default:
            return state

    }
}


export const logInAC = (params: loginParamsType) => {
    return {type: 'LOG-IN', params: params} as const
}
export const logInTC = (params: loginParamsType): AppThunk => (dispatch) => {
    dispatch(SetStatusAC('loading'))
    return authAPI.logIn().then((res) => {
        dispatch(SetStatusAC('succeeded'))
    })
}




