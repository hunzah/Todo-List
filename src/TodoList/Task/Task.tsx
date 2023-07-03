import React, {useCallback, useEffect} from 'react';
import s from '../TodoList.module.css';
import {SuperCheckBox} from '../../SuperCheckBox/SuperCheckBox';
import {EditableSpan} from '../../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskStatus, TaskType} from '../../api/todolistsAPI';
import {deleteTaskTC} from '../tasks-reducer';
import {useDispatch} from 'react-redux';


type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask:(taskId:string,todolistId:string)=>void
    changeTaskStatus:(taskId:string,todolistId:string,status:TaskStatus)=>void
    changeTaskTitle:(taskId:string,todolistId:string,newValue:string)=>void

}
export const Task = React.memo((props: TaskPropsType) => {

const dispatch = useDispatch()
    const onClickRemoveHandler = () => {
            dispatch(deleteTaskTC(props.task.id,props.todolistId))
    }

    const onChangeCheckBoxHandler = (taskId: string, isDone: boolean) => {
        let status = isDone ? TaskStatus.Completed : TaskStatus.New;
        props.changeTaskStatus(props.task.id, props.todolistId, status);
    };

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, props.todolistId, newValue)
    }, [props.task.id, props.todolistId,])

    return (
        <div className={props.task.status === TaskStatus.Completed? s.isDone : ''} key={props.task.id}>
            <div className={s.checkboxTitle}>
                <SuperCheckBox checked={props.task.status === TaskStatus.Completed}
                               callback={(isDone) => onChangeCheckBoxHandler(props.task.id,isDone )}/>
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