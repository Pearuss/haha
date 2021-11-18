import React, { ReactElement, useEffect, useState } from 'react';

// import FormComment from './FormComment';
import InputMention from '../InputMention/InputMention';
import { getComments as getCommentsApi, createComment as createCommentApi } from './api';
import Comment from './Comment';

function CommentSection({ showForm }: any): ReactElement {
  const [backendComments, setBackendComments] = useState<any[]>([]);
  const [activeComment, setActiveComment] = useState(null);

  useEffect(() => {
    getCommentsApi().then((data: any) => {
      setBackendComments(data);
    });
  }, []);
  const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null);
  const getReplies = (commentId: any) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const addComment = (text: any, parentId: any) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };
  // console.log(backendComments);
  return (
    <div className="w-full relative mb-2">
      {/* <FormComment submitLabel="Reply" handleSubmit={addComment} /> */}

      {showForm && <InputMention handleSubmit={addComment} />}
      {rootComments.map((rootComment) => (
        <Comment
          key={rootComment.id}
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
