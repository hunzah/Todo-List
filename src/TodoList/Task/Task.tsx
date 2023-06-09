import React, {useCallback} from 'react';
import s from '../TodoList.module.css';
import {SuperCheckBox} from '../../SuperCheckBox/SuperCheckBox';
import {EditableSpan} from '../../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from '../TodoList';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask:(taskId:string,todolistId:string)=>void
    changeTaskStatus:(taskId:string,todolistId:string,isDone:boolean)=>void
    changeTaskTitle:(taskId:string,todolistId:string,newValue:string)=>void

}
export const Task = React.memo((props: TaskPropsType) => {


    const onClickRemoveHandler = () => props.removeTask(props.task.id, props.todolistId)

    const onChangeCheckBoxHandler = (taskId: string, isDone: boolean,) => {

        props.changeTaskStatus(props.task.id, props.todolistId, isDone)
    };

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, props.todolistId, newValue)
    }, [props.task.id, props.todolistId,])

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
})