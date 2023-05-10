import {TodolistType} from '../App';


export const TodolistReducer = (state: TodolistType[], action: { type: string,id:string  } ) => {

    switch (action.type) {
        case 'REMOVE-TODO-HANDLER':
            return state.filter(tl => tl.id !== action.id)
        default: return state
    }

}
