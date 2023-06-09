import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './AddItem.module.css'
import {TextField} from '@mui/material';
import ControlPoint from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    // titleForButtons: string
}


export const AddItemForm = React.memo((props: AddItemFormPropsType)=> {
    console.log('item form was called')
    const [newItemTitle, setNewItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value)
    }


    const isAddTaskNotPossible = newItemTitle.length === 0 || newItemTitle.trim().length > 20
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

    return (
        <>
            <div className={s.inpBtn}>
                <TextField id="outlined-basic" label="Type value" variant="outlined" error={!!error}
                           helperText={!!error}
                           placeholder={'enter your text'}
                           value={newItemTitle}
                           onChange={onNewTitleChangeHandler}
                           onKeyDown={onKeyPressHandler}
                />
                <IconButton
                    color="primary"
                    disabled={isAddTaskNotPossible}
                    onClick={() => {
                        onClickHandler()
                    }}>
                    <ControlPoint/>
                </IconButton>
            </div>
        </>
    )
})