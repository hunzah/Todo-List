import {Checkbox} from '@mui/material';
import React from 'react';
import {TaskStatus} from '../api/todolistsAPI';

type PropsType = {
    checked: boolean;
    callback: (status: TaskStatus) => void;
};

export const SuperCheckBox = (props: PropsType) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.InProgress);
    };

    return (
        <Checkbox
            checked={props.checked}
            onChange={onChangeHandler}
            color="primary"
        />
    );
};