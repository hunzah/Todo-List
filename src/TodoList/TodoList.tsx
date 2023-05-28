import React from 'react';
import {FilterValueType} from '../App';
import s from './TodoList.module.css'
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {SuperCheckBox} from '../SuperCheckBox/SuperCheckBox';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './tasks-reducer';
import {v1} from 'uuid';


type TodoListPropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValueType, todoListId: string) => void
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

    const dispatch = useDispatch()
    const tasksObj = useSelector<AppRootStateType, TaskType[]>((state => state.tasks[props.id]))


    // Work With Tasks
    function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(id, todoListId))
    }


    const onClickAllHandler = () => props.changeFilter('all', props.id)
    const onClickActiveHandler = () => props.changeFilter('active', props.id)
    const onClickCompletedHandler = () => props.changeFilter('completed', props.id)


    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    const addItem = (title: string,) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        dispatch(addTaskAC(newTask, props.id))
    }
    let tasksForTodoList = tasksObj;

    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList?.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList?.filter(t => !t.isDone)
    }

    return (
        <div className={s.todolist}>

            <div className={s.closeButtonAndTitle}>
                <h3><EditableSpan title={props.title} onChangeTitleHandler={changeTodoListTitle}/></h3>
                <IconButton onClick={removeTodoListHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addItem} titleForButtons={'Add Task'}/>
            <div>
                {
                    tasksForTodoList.map(t => {
                        const onClickRemoveHandler = () => removeTask(t.id, props.id)

                        const onChangeCheckBoxHandler = (taskId: string, isDone: boolean,) => {
                            dispatch(changeTaskStatusAC(taskId, props.id, isDone))
                        };
                        const onChangeTitleHandler = (newValue: string) => {
                            dispatch(changeTaskTitleAC(t.id, props.id, newValue))
                        }


                        return (
                            <div className={t.isDone ? s.isDone : ''} key={t.id}>
                                <div className={s.checkboxTitle}>
                                    <SuperCheckBox checked={t.isDone}
                                                   callback={() => onChangeCheckBoxHandler(t.id, !t.isDone)}/>
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
                >All
                </Button>

                <Button
                    variant={props.filter === 'active' ? 'contained' : 'text'}
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