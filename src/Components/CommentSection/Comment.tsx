/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable import/order */
import React, { useState, useCallback } from 'react';

import parse from 'html-react-parser';
import Image from 'next/image';

// import FormComment from './FormComment';
import { useRouter } from 'next/router';

import InputMention from '../../common/InputMention/InputMention';
import { useAuth } from '../../hooks';
import { formatDate, truncate } from '../../utilities/helper';
import { IComment } from '../../models';

function Comment({
  commentContent,
  replies,
  activeComment,
  setActiveComment,
  addComment,
  parentId = null,
}: any) {
  const { profile } = useAuth();
  const router = useRouter();

  const isReplying =
    activeComment && activeComment.type === 'replying' && activeComment.id === commentContent.id;

  const replyId = parentId || commentContent.id;

  const [isReadMore, setIsReadMore] = useState(true);

  const contentBody = isReadMore
    ? truncate(`${commentContent?.comment}`, 210).toString() // max content length is 210
    : truncate(`${commentContent?.comment}`, 20000).toString(); // see full content

  const ReadMoreHandler = useCallback(() => {
    if (profile?.message === 'You need to login to access') {
      router.replace('/login');
    } else if (profile?.data) {
      setIsReadMore(false);
    } else {
      router.replace('/login');
    }
  }, [profile]);

  return (
    <div className="flex w-full items-center shadow-sm bg-white rounded-lg relative mb-4">
      <div className="absolute top-3 left-2">
        <Image
          src="/images/toc2.jpg"
          width={52}
          height={52}
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <div className="ml-2 pl-16 py-3 w-full">
        <div className="flex justify-between ">
          <span className="text-lg text-blueCyanLogo font-medium">
            {commentContent?.user?.firstName}
          </span>
          <span className="mr-4 text-sm font-medium text-gray-700">
            {formatDate(new Date(commentContent?.createdAt))}
          </span>
        </div>
        <p>{parse(contentBody)}</p>
        {/* <p>{commentContent?.body}</p> */}
        {commentContent?.comment.length > 210 && (
          <button
            className={`mt-2 font-serif font-medium cursor-pointer ${isReadMore ? '' : 'hidden'}`}
            onClick={ReadMoreHandler}
          >
            See more
          </button>
        )}

        <div className="flex items-center justify-between text-gray-700 pt-2">
          <div className="flex items-center mr-6">
            <span className="flex items-center mr-4">
              <Image src="/images/star.png" width={20} height={20} />
              <span className="pl-3 font-medium">
                {commentContent?.liked === 0 ? null : commentContent.liked}
              </span>
            </span>
            {/* <span className="flex items-center">
              <Image src="/images/smile.png" width={20} height={20} />
              <span className="pl-3 font-medium">12</span>
            </span> */}
          </div>
          <div className="flex items-center mr-6">
            <Image src="/images/reply.png" width={20} height={20} />
            <span
              className="pl-3 font-medium"
              onClick={() =>
                setActiveComment({
                  id: commentContent.id,
                  type: 'replying',
                })}
            >
              Reply
            </span>
          </div>
        </div>
        {/* <div className="w-full border-b border-gray-200 pt-4"></div> */}
        {isReplying && (
          <InputMention
            submitLabel="Reply"
            initialText={`${parentId === 0 ? '' : `@${commentContent?.user.firstName}: `}`}
            commentContent={commentContent}
            // initialText={`${
            //   parentId == null
            //     ? ''
            //     : `${parse('<p class="text-darkRed">@${commentContent.username}</p>')} `
            // }`}
            handleSubmit={(text: string) =>
              addComment(
                // `${parentId == null ? '' : `@${commentContent.username}`} ${text}`,
                text,
                replyId,
              )}
            handleCancel={() => setActiveComment(null)}
          />
        )}
        {replies.length > 0 && (
          <div className={replies}>
            <div className="w-full border-b border-gray-200 pt-4" />
            {replies?.map((reply: IComment) => (
              <Comment
                commentContent={reply}
                key={reply.id}
                replies={[]}
                addComment={addComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                parentId={commentContent.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
