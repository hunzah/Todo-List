import React, {useCallback} from 'react';
import {FilterValueType} from '../App';
import s from './TodoList.module.css'
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../store';
import {addTaskAC, removeTaskAC} from './tasks-reducer';
import {v1} from 'uuid';
import {Task} from './Task/Task';


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

const TodoList = React.memo((props: TodoListPropsType) => {

    const dispatch = useDispatch()
    const tasksObj = useSelector<AppRootStateType, TaskType[]>((state => state.tasks[props.id]))


    // Work With Tasks
    function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(id, todoListId))
    }


    const onClickAllHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const onClickActiveHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const onClickCompletedHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])


    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.changeTodoListTitle, props.id])

    const addTask = useCallback((title: string,) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        dispatch(addTaskAC(newTask, props.id))
    }, [props.id])


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
            <AddItemForm addItem={addTask} titleForButtons={'Add Task'}/>
            <div>{
                tasksForTodoList.map(t => {
                    console.log(t.id)
                    return <Task key={t.id} todolistId={props.id} task={t} />
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
                    onClick={onClickCompletedHandler}>Completed
                </Button>

            </div>
        </div>
    )
})



export default TodoList;