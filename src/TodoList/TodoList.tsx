import React, {ChangeEvent} from 'react';
import {FilterValueType} from '../App';
import s from './TodoList.module.css'
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void,
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTasks: (id: string, title: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    filter: FilterValueType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void

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
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    const addItem = (title: string) => {
        props.addTasks(props.id, title)
    }

    return (
        <div className={s.todolist}>

            <div className={s.closeButtonAndTitle}>
                <h3><EditableSpan title={props.title} onChangeTitleHandler={changeTodoListTitle}/></h3>
                {/*<button className={s.closeButton} onClick={removeTodoListHandler}>X</button>*/}
                <IconButton onClick={removeTodoListHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addItem} titleForButtons={'Add Task'}/>
            <div>
                {
                    props.tasks.map(t => {
                        const onClickRemoveHandler = () => props.removeTask(t.id, props.id)

                        const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)

                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)

                        }


                        return (
                            <div className={t.isDone ? s.isDone : ''} key={t.id}>
                                <div className={s.checkboxTitle}>
                                    <Checkbox className={s.checkbox}
                                           onChange={onChangeCheckBoxHandler}
                                           checked={t.isDone}/>
                                    <EditableSpan title={t.title} onChangeTitleHandler={onChangeTitleHandler}/>
                                </div>
                                <div className={s.deleteButtons}>
                                    <IconButton onClick={onClickRemoveHandler}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            </div>
                        )
                    })}

            </div>
            <div className={s.filterButtons}>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onClickAllHandler}
                    /*<Button  className={props.filter === 'all' ? s.activeFilter : ''} */
                >All
                </Button>

                <Button
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    // className={props.filter === 'active' ? s.activeFilter : ''}
                    onClick={onClickActiveHandler}
                >Active
                </Button>

                <Button
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    // className={props.filter === 'completed' ? s.activeFilter : ''}
                    onClick={onClickCompletedHandler}>Completed
                </Button>

            </div>
        </div>
    )
}


export default TodoList;