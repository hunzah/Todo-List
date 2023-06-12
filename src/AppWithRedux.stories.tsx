import {Meta} from '@storybook/react';
import AppWithRedux from './AppWithRedux';
import {Provider} from 'react-redux';
import {store} from './store';

const meta: Meta = {
    title: 'AppWithRedux span Component',
    component: AppWithRedux,
    decorators: [
        (Story) => (
            <Provider store={store}><Story/></Provider>
        ),
    ],
}
export default meta

export const AppWithReduxExample = () => {
    return <AppWithRedux/>
}
