const cards = [
    {
        id: 'card-1',
        title: 'Learning how to cook',
    },
    {
        id: 'card-3',
        title: 'Learning React JS',
    }
];

const data = {
    lists: {
        'list-1': {
            id: 'list-1',
            title: 'Todo',
            cards,
        },
        'list-2': {
            id: 'list-2',
            title: 'Done',
            cards: [
                {
                    id: 'card-4',
                    title: '仕様変更確認',
                },
                {
                    id: 'card-5',
                    title: 'テーブル結合の修正',
                }
            ],
        },
    },
    listIds: ['list-1', 'list-2'],
};

export default data;
