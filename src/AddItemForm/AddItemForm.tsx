import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    titleForButtons:string
}


export function AddItemForm (props:AddItemFormPropsType) {
    const [newItemTitle, setNewItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value)
    }


    const isAddTaskNotPossible = newItemTitle.length === 0 || newItemTitle.trim().length > 15
    const onKeyPressHandler =
        isAddTaskNotPossible ? undefined
            : (e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                    if (newItemTitle.trim() === '') {
                        setError('Title is required')
                    } else {
                        props.addItem(newItemTitle.trim())
                        setNewItemTitle('')
                        setError(null)
                    }

                }
            }


    const onClickHandler = () => {
        if (newItemTitle.trim() === '') {
            setError('Title is required')
        } else {
            props.addItem(newItemTitle.trim())
            setNewItemTitle('')
        }
    }

    const titleTooLongWarning = newItemTitle.trim().length > 15 && <div>title should be shorter</div>
    return (
        <div className={'inp-btn'}>
            <input placeholder={'enter your text'}
                   value={newItemTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? 'error' : ''}/>
            <button
                disabled={isAddTaskNotPossible}
                onClick={() => {
                    onClickHandler()
                }}>{props.titleForButtons}
            </button>
            {error && <div className={'error-message'}>{error}</div>}
            {titleTooLongWarning}
        </div>
    )
}