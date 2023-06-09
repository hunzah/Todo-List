import {Meta} from '@storybook/react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';

const meta: Meta = {
    title: 'Task Component',
    component: Task
}
export default meta

const taskTitleChanged = action('task title was changed')
const taskStatusChanged = action('task status was changed')
const taskWasRemoved = action('task  was removed')

export const TaskExample = () => {
    return (
        <><Task task={{id: '1', isDone: true, title: 'Task Title'}} todolistId="todolistId1"
                 changeTaskTitle={taskTitleChanged}
                 changeTaskStatus={taskStatusChanged}
                 removeTask={taskWasRemoved}
        />
            <Task task={{id: '1', isDone: true, title: 'Task2 Title'}} todolistId="todolistId2"
                 changeTaskTitle={taskTitleChanged}
                 changeTaskStatus={taskStatusChanged}
                 removeTask={taskWasRemoved}
        />
        </>
    )
}
