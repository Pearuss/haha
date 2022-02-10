/* eslint-disable no-param-reassign */
/* eslint-disable import/order */
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';

import InputMention from '../../common/InputMention/InputMention';
import { useAuth } from '../../hooks';
import useFetch from '../../hooks/use-fetch';
// import { IComment } from '../../models';

import Comment from './Comment';
import useSWR from 'swr';

// interface CommentSectionProps {
//   showForm: any;
//   postId: number;
// }
// const TIME_REFRESH = 20 * 1000;

function CommentSection({ showForm, postId }: any) {
  const [backendComments, setBackendComments] = useState<any[]>([]);
  const [activeComment, setActiveComment] = useState(null);
  const { profile } = useAuth();

  const { data } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/comment/${postId}`, {
    revalidateIfStale: true,
  });
  useEffect(() => {
    if (data?.data) {
      setBackendComments(data.data);
    }
  }, [data]);

  const rootComments = backendComments?.filter(
    (backendComment) => backendComment.parentId.toString() === '0',
  );
  const getReplies = (commentId: number) => backendComments
    ?.filter((backendComment) => backendComment.parentId === commentId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const addComment = (text: string, parentId: number, quoteId: number) => {
    if (profile) {
      if (typeof parentId === 'undefined' || parentId === 0) {
        parentId = 0;
        quoteId = 0;
      }
      useFetch('/api/v1/comment', {
        method: 'POST',
        body: JSON.stringify({
          comment: text,
          parentId,
          quoteId,
          articleId: postId,
          status: 1,
          liked: 0,
        }),
      }).then((comment) => {
        comment.data.user = {
          firstName: profile.data.firstName,
        };

        setBackendComments([comment.data, ...backendComments]);
        setActiveComment(null);
      });
    } else {
      Swal.fire('Please try again, profile error!');
    }
  };

  return (
    <div className="w-full relative mb-2">
      {showForm && <InputMention handleSubmit={addComment} initialText="" submitLabel="Comment" />}
      {rootComments?.map((rootComment) => (
        <Comment
          key={rootComment.id}
          UserComment={rootComment.user}
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
