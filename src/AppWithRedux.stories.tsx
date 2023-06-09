import {Meta} from '@storybook/react';
import AppWithRedux from './AppWithRedux';
import {action} from '@storybook/addon-actions';
import {store} from './store';
import {Provider} from 'react-redux';

const meta: Meta = {
    title: 'AppWithRedux span Component',
    component: AppWithRedux
}
export default meta

const TitleChanged = action('title was changed')


export const AppWithReduxExample = () => {
    return (
        <Provider store={store}>
            <AppWithRedux />
        </Provider>
    )
}
