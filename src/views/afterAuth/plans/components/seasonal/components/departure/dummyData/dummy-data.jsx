export const columns = [
    { title: 'Flight No.', dataIndex: 'flightNo', key: 'flightNo' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Call Sign', dataIndex: 'callSign', key: 'callSign' },
    { title: 'Nature Code', dataIndex: 'natureCode', key: 'natureCode' },
    { title: 'ORG', dataIndex: 'org', key: 'org' },
    { title: 'VIA', dataIndex: 'via', key: 'via' },
    { title: 'ATD', dataIndex: 'atd', key: 'atd' },
    { title: 'STA', dataIndex: 'sta', key: 'sta' },
    { title: 'ETA', dataIndex: 'eta', key: 'eta' },
    { title: 'TMO', dataIndex: 'tmo', key: 'tmo' },
    { title: 'ATA', dataIndex: 'ata', key: 'ata' },
    { title: 'Stand Code', dataIndex: 'standCode', key: 'standCode' },
    { title: 'AC Type', dataIndex: 'ACType', key: 'ACType' },
    { title: 'REG No.', dataIndex: 'REGNo', key: 'REGNo' },
    { title: 'Action', dataIndex: 'action', key: 'action' },
];

export const dummyData = [
    { key: '1', flightNo: 'UK 642', date: 20240227, callSign: 'ID 333', natureCode: '123', org: 'Delhi', via: '-', atd: '15:00', sta: '15:00', eta: '15:00', tmo: '15:00', ata: '15:00', standCode: 'Stand 1', ACType: 'A12', REGNo: 'SS213', action: {} },
    { key: '2', flightNo: '5D 234', date: 20240227, callSign: 'XYZ 346', natureCode: '123', org: 'Mumbai', via: 'IST', atd: '15:00', sta: '15:00', eta: '15:00', tmo: '15:00', ata: '15:00', standCode: 'Stand 1', ACType: 'A12', REGNo: 'SS213' },
    { key: '3', flightNo: 'AI 812', date: 20240227, callSign: 'ID 111', natureCode: '123', org: 'Lucknow', via: 'IST', atd: '15:00', sta: '15:00', eta: '15:30', tmo: '15:30', ata: '15:30', standCode: 'Stand 1', ACType: 'A12', REGNo: 'SS213' },
    { key: '4', flightNo: 'AI 916', date: 20240227, callSign: 'MI 678', natureCode: '123', org: 'Chicago', via: 'ST | HYD | DEL', atd: '15:00', sta: '15:00', eta: '16:00', tmo: '16:00', ata: '16:00', standCode: 'Stand 1', ACType: 'A12', REGNo: 'SS213' },
   
];