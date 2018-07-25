const data = {
  username: 'frank',
  users: ['manjeet', 'jonathan', 'mark', 'chris', 'rebecca', 'alex'],
  roomList: [
    'friends and things',
    'food chat',
    'how to train a dragon',
    'codesmith ruined me'
  ],
  fakeTable: [
    {
      room: 1,
      users: [3, 1, 0]
    },
    {
      room: 0,
      users: [5, 0, 3, 4, 2]
    },
    { room: 2, users: [2] },
    { room: 3, users: [1] }
  ],
  messages: [
    {
      user: 1,
      room: 1,
      message: 'hey, I like pasta.'
    },
    {
      user: 2,
      room: 1,
      message: 'pasta sucks, I like tacos!'
    },
    {
      user: 3,
      room: 1,
      message: 'food is for mortals, I prefer to photosynthesize.'
    },
    {
      user: 4,
      room: 0,
      message: `let's all get together to code and drink coffee!`
    },
    {
      user: 0,
      room: 0,
      message: 'can we use react??'
    },
    {
      user: 5,
      room: 0,
      message: 'my react-tion to this is yes.'
    },
    {
      user: 0,
      room: 2,
      message: 'I love this movie!'
    },
    {
      user: 4,
      room: 2,
      message: 'I am IN LOVE with this movie.'
    },
    {
      user: 3,
      room: 2,
      message: 'I am going to ask this movie to marry me.'
    },
    {
      user: 1,
      room: 3,
      message: 'I am good at code.'
    },
    {
      user: 1,
      room: 3,
      message: 'I am coding good.'
    },
    {
      user: 1,
      room: 3,
      message: 'Good coding I am doing.'
    }
  ]
};

export default data;
