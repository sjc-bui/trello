const cards = [
    {
        id: 'card-4',
        title: '仕様変更確認',
    },
    {
        id: 'card-5',
        title: 'テーブル結合の修正',
    }
];

const data = {
    lists: {
        'list-1': {
            id: 'list-1',
            title: 'Todo',
            cards,
        },
    },
    listIds: ['list-1'],
};

export default data;
