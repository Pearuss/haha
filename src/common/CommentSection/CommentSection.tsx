import React, { ReactElement, useEffect, useState } from 'react';
import useCall from '../../hooks/use-call';
import useFetch from '../../hooks/use-fetch';

// import FormComment from './FormComment';
import InputMention from '../InputMention/InputMention';
import { getComments as getCommentsApi, createComment as createCommentApi } from './api';
import Comment from './Comment';

function CommentSection({ showForm, postId }: any): ReactElement {
  const [backendComments, setBackendComments] = useState<any[]>([]);
  const [activeComment, setActiveComment] = useState(null);

  useEffect(() => {
    useFetch(`http://localhost:3001/allComments?postId=${postId}`).then((data: any) => {
      setBackendComments(data);
    });
  }, [postId]);
  // const { loading, error, value } = useCall(`http://localhost:3001/allComments?postId=${postId}`);
  // console.log(value);

  const rootComments = backendComments?.filter(
    (backendComment) => backendComment.parentId === 'root'
  );
  const getReplies = (commentId: any) =>
    backendComments
      ?.filter((backendComment) => backendComment.parentId === commentId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const addComment = (text: any, parentId: any) => {
    // createCommentApi(text, parentId).then((comment) => {
    //   setBackendComments([comment, ...backendComments]);
    //   setActiveComment(null);
    // });
    if (typeof parentId === 'undefined') {
      parentId = 'root';
    }
    console.log(parentId);

    useFetch(`http://localhost:3001/allComments`, {
      method: 'POST',
      body: JSON.stringify({
        id: Math.random().toString(36).substr(2, 9),
        body: text,
        parentId: parentId,
        userId: '2',
        username: 'Paine',
        postId: postId,
      }),
    }).then((comment) => {
      console.log(comment);

      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  return (
    <div className="w-full relative mb-2">
      {showForm && <InputMention handleSubmit={addComment} initialText="" submitLabel="Comment" />}
      {rootComments.map((rootComment) => {
        return (
          <Comment
            key={rootComment.id}
            userId={rootComment.userId}
            commentContent={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            addComment={addComment}
            setActiveComment={setActiveComment}
          />
        );
      })}
    </div>
  );
}

export default CommentSection;
