import React, {ChangeEvent} from 'react';
import {FilterValueType} from '../App';
import s from './TodoList.module.css'
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';


type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void,
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTasks: (id:string, title: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle:string, todoListId: string)=> void
    filter: FilterValueType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle:(id:string,newTitle:string) => void

}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

const TodoList = (props: TodoListPropsType) => {


    const onClickAllHandler = () => props.changeFilter('all', props.id)
    const onClickActiveHandler = () => props.changeFilter('active', props.id)
    const onClickCompletedHandler = () => props.changeFilter('completed', props.id)


    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = (newTitle:string) =>{
props.changeTodoListTitle(props.id, newTitle)
    }

const addItem = (title:string) => {
    props.addTasks(props.id,title)
}

    return (
        <div className={s.todolist}>

            <div className={s.closeButtonAndTitle}>
                <h3> <EditableSpan title={props.title} onChangeTitleHandler={changeTodoListTitle}/></h3>
                <button className={s.closeButton} onClick={removeTodoListHandler}>X</button>
            </div>
            <AddItemForm addItem={addItem} titleForButtons={'Add Task'}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickRemoveHandler = () => props.removeTask(t.id, props.id)

                        const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)

                        }
                        const onChangeTitleHandler = (newValue:string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)

                        }


                        return (
                            <li className={t.isDone ? s.isDone : ''} key={t.id}>
                                <div className={s.checkboxTitle}><input className={s.checkbox} type="checkbox" onChange={onChangeCheckBoxHandler}
                                                                         checked={t.isDone}/>
                                    <EditableSpan title={t.title} onChangeTitleHandler = {onChangeTitleHandler}/>
                                </div>
                                <div className={s.deleteButtons}>
                                    <button
                                        onClick={onClickRemoveHandler}>Delete
                                    </button>
                                </div>
                            </li>
                        )
                    })}

            </ul>
            <div className={s.filterButtons}>
                <button className={props.filter === 'all' ? s.activeFilter : ''} onClick={onClickAllHandler}>All
                </button>
                <button className={props.filter === 'active' ? s.activeFilter : ''}
                        onClick={onClickActiveHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? s.activeFilter : ''}
                        onClick={onClickCompletedHandler}>Completed
                </button>
            </div>
        </div>
    )
}


export default TodoList;