import React from 'react';
import SeasonalTable from './components/seasonalTable/seasonalTable';
// import Seasonal from './components/seasonal/seasonal';
// import ShortTerm from './components/shortterm/shortterm';
import CDM from './components/CDM/CDM';


export const items = [
    {
        key: '1',
        label: 'Seasonal',
        children: <SeasonalTable />,
    },
    // {
    //     key: '2',
    //     label: 'Short Term',
    //     children: <ShortTerm />,
    // },
    {
        key: '2',
        label: 'CDM',
        children: <CDM />,
    },
];