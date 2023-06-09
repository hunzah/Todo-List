import {Meta} from '@storybook/react';
import {AppWithRedux} from './AppWithRedux';
import {action} from '@storybook/addon-actions';

const meta: Meta = {
    title: 'AppWithRedux span Component',
    component: AppWithRedux
}
export default meta

const TitleChanged = action('title was changed')


export const AppWithReduxExample = () => {
    return (
        <>
            <AppWithRedux title={'title'} onChangeTitleHandler={TitleChanged}/>
        </>
    )
}
