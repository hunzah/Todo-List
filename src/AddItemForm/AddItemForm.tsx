import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './AddItem.module.css'
import {TextField} from '@mui/material';
import ControlPoint from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';
import {AddItemFormPropsType, useAddItemForm} from './hooks/useAddItemForm';


export const AddItemForm = React.memo((addItem: AddItemFormPropsType) => {

    const {
        newItemTitle,
        error,
        onNewTitleChangeHandler,
        onKeyPressHandler,
        onClickHandler,
        isAddTaskNotPossible
    } = useAddItemForm(addItem)
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