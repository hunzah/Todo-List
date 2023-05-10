import {TodolistType} from '../App';
import removeTodoList from '../App';


export const TodolistReducer = (state: TodolistType, action: { type: string }, id:string) => {

    switch (action.type) {
        case 'REMOVE-TODO-HANDLER':
            return removeTodoList()
    }

}
