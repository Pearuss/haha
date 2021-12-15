export const getComments = async () => [
  {
    id: '1',
    body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    username: 'Jack',
    userId: '1',
    parentId: null,
    createdAt: '2021-08-16T23:00:33.010+02:00',
  },
  {
    id: '2',
    body: 'Second comment',
    username: 'John',
    userId: '2',
    parentId: null,
    createdAt: '2021-08-16T23:00:33.010+02:00',
  },
  {
    id: '3',
    body: 'First comment first child',
    username: 'John',
    userId: '2',
    parentId: '1',
    createdAt: '2021-08-16T23:00:33.010+02:00',
  },
  {
    id: '4',
    body: 'Second comment second child',
    username: 'John',
    userId: '2',
    parentId: '2',
    createdAt: '2021-08-16T23:00:33.010+02:00',
  },
];

export const createComment = async (text: any, parentId = null) => ({
  id: Math.random().toString(36).substr(2, 9),
  body: text,
  parentId,
  userId: '1',
  username: 'John',
  createdAt: new Date().toISOString(),
});

export const updateComment = async (text: any) => ({ text });

export const deleteComment = async () => ({});
