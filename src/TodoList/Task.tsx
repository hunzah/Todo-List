import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './tasks-reducer';
import React, {useCallback} from 'react';
import s from './TodoList.module.css';
import {SuperCheckBox} from '../SuperCheckBox/SuperCheckBox';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from './TodoList';

type TaskPropsType = {
    task: TaskType
    todolistId: string

}
export const Task = (props: TaskPropsType) => {
    const dispatch = useDispatch()

    const onClickRemoveHandler = () => dispatch(removeTaskAC(props.task.id, props.todolistId))

    const onChangeCheckBoxHandler = (taskId: string, isDone: boolean,) => {
        dispatch(changeTaskStatusAC(props.task.id, props.todolistId, isDone))
    };

    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.todolistId, props.task.id, newValue))
    }, [props.task.id, props.todolistId])

    return (
        <div className={props.task.isDone ? s.isDone : ''} key={props.task.id}>
            <div className={s.checkboxTitle}>
                <SuperCheckBox checked={props.task.isDone}
                               callback={() => onChangeCheckBoxHandler(props.task.id, !props.task.isDone)}/>
                <EditableSpan title={props.task.title} onChangeTitleHandler={onChangeTitleHandler}/>
            </div>
            <div className={s.deleteButtons}>
                <IconButton onClick={onClickRemoveHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        </div>
    )
}