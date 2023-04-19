import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './App';



type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void,
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTasks: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValueType
    removeTodoList: (todoListId: string) => void

}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }


    const isAddTaskNotPossible = newTaskTitle.length === 0 || newTaskTitle.length > 15
    const onKeyPressHandler =
        isAddTaskNotPossible ? undefined
            : (e: KeyboardEvent<HTMLInputElement>) => {
                setError(null)
                if (e.key === 'Enter') {
                    props.addTasks(newTaskTitle, props.id)
                    setNewTaskTitle('')
                }

            }


    const onClickHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
        } else {
            props.addTasks(newTaskTitle.trim(), props.id)
            setNewTaskTitle('')
        }
    }

    const titleTooLongWarning = newTaskTitle.trim().length > 15 && <div>title should be shorter</div>


    const onClickAllHandler = () => props.changeFilter('all', props.id)
    const onClickActiveHandler = () => props.changeFilter('active', props.id)
    const onClickCompletedHandler = () => props.changeFilter('completed', props.id)


    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }


    return (
        <div className="todolist">

            <div className="closeButtonAndTitle">
                <h3>{props.title}</h3>
                <button className="closeButton" onClick={removeTodoListHandler}>X</button>
            </div>

            <div className={'inp-btn'}>
                <input placeholder={'enter your text'}
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button
                    disabled={isAddTaskNotPossible}
                    onClick={() => {
                        onClickHandler()
                    }}>Add task
                </button>
                {error && <div className={'error-message'}>{error}</div>}
                {titleTooLongWarning}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickRemoveHandler = () => props.removeTask(t.id, props.id)
                        const onChangeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)

                        }

                        return (
                            <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                                <div className={'checkbox-title'}><input type="checkbox" onChange={onChangeCheckBox}
                                                                         checked={t.isDone}/>
                                    <span>{t.title}</span></div>
                                <button
                                    onClick={onClickRemoveHandler}>Delete
                                </button>
                            </li>
                        )
                    })}

            </ul>
            <div className={'btns'}>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickAllHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onClickActiveHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onClickCompletedHandler}>Completed
                </button>
            </div>
        </div>
    )
}
export default TodoList;