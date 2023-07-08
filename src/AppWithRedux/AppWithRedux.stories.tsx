import {Meta} from '@storybook/react';
import AppWithRedux from './AppWithRedux';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator.stories';

const meta: Meta = {
    title: 'AppWithRedux span Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
}
export default meta

export const AppWithReduxExample = () => {
    return <AppWithRedux demo={true}/>
}
