import React from 'react';
import { Search } from './search/Search';

import { Provider as StateProvider } from './state/StateContext';
const App = () => {
    return (
        <StateProvider>
            <Search />
        </StateProvider>
    );
};

export default App;
