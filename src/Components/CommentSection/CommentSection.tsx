/* eslint-disable no-param-reassign */
/* eslint-disable import/order */
import React, { useEffect, useState } from 'react';

import InputMention from '../../common/InputMention/InputMention';
import useFetch from '../../hooks/use-fetch';
import { IComment } from '../../models';

import Comment from './Comment';

// interface CommentSectionProps {
//   showForm: any;
//   postId: number;
// }

function CommentSection({ showForm, postId }: any) {
  const [backendComments, setBackendComments] = useState<any[]>([]);
  const [activeComment, setActiveComment] = useState(null);

  useEffect(() => {
    useFetch(`http://localhost:3100/api/v1/comment/${postId}`).then(
      (data: Record<string, IComment[]>) => {
        if (data?.data) {
          setBackendComments(data.data);
        }
      },
    );
  }, [postId]);

  const rootComments = backendComments?.filter(
    (backendComment) => backendComment.parentId.toString() === '0',
  );
  const getReplies = (commentId: number) => backendComments
    ?.filter((backendComment) => backendComment.parentId.toString() === commentId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const addComment = (text: string, parentId: number) => {
    if (typeof parentId === 'undefined') {
      parentId = 0;
    }
    useFetch('http://localhost:3001/allComments', {
      method: 'POST',
      body: JSON.stringify({
        comment: text,
        parentId,
        userId: '2',
        username: 'Pearuss',
        postId,
      }),
    }).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  return (
    <div className="w-full relative mb-2">
      {showForm && <InputMention handleSubmit={addComment} initialText="" submitLabel="Comment" />}
      {rootComments?.map((rootComment) => (
        <Comment
          key={rootComment.id}
          userId={rootComment.userId}
          commentContent={rootComment}
          replies={getReplies(rootComment.id)}
          activeComment={activeComment}
          addComment={addComment}
          setActiveComment={setActiveComment}
        />
      ))}
    </div>
  );
}

export default CommentSection;
