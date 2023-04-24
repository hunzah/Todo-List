import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export function AddItemForm (props:AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }


    const isAddTaskNotPossible = newTaskTitle.length === 0 || newTaskTitle.trim().length > 15
    const onKeyPressHandler =
        isAddTaskNotPossible ? undefined
            : (e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                    if (newTaskTitle.trim() === '') {
                        setError('Title is required')
                    } else {
                        props.addItem(newTaskTitle.trim())
                        setNewTaskTitle('')
                        setError(null)
                    }

                }
            }


    const onClickHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
        } else {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        }
    }

    const titleTooLongWarning = newTaskTitle.trim().length > 15 && <div>title should be shorter</div>
    return (
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
    )
}