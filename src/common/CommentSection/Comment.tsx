import React, { ReactElement, useState, useCallback } from 'react';

import Image from 'next/image';
// import FormComment from './FormComment';
import parse from 'html-react-parser';
import InputMention from '../InputMention/InputMention';
import { truncate } from '../../utilities/helper';
import { useAuth } from '../../hooks';
import { useRouter } from 'next/router';

function Comment({
  commentContent,
  replies,
  activeComment,
  setActiveComment,
  addComment,
  parentId = null,
}: any): ReactElement {
  const { profile } = useAuth();
  const router = useRouter();

  const isReplying =
    activeComment && activeComment.type === 'replying' && activeComment.id === commentContent.id;

  const replyId = parentId ? parentId : commentContent.id;

  const [isReadMore, setIsReadMore] = useState(true);

  let contentBody = isReadMore
    ? truncate(`${commentContent?.body}`, 210).toString() // max content length is 580
    : truncate(`${commentContent?.body}`, 20000).toString(); // see full content

  const ReadMoreHandler = useCallback(() => {
    if (profile?.message == 'You need to login to access') {
      router.replace('/login');
    } else if (profile?.username) {
      setIsReadMore(false);
    } else {
      router.replace('/login');
    }
  }, [profile]);

  // console.log('before', commentContent?.body);
  // console.log('after', parse(commentContent?.body));

  // const options: HTMLReactParserOptions  = {
  //   replace: ({ attribs, children }: any) => {
  //     if (!attribs) {
  //       return;
  //     }

  //     if (attribs.id === 'main') {
  //       return <h1 style={{ fontSize: 42 }}>{domToReact(children, options)}</h1>;
  //     }

  //     if (attribs.class === 'prettify') {
  //       return (
  //         <span style={{ color: 'hotpink' }}>
  //           {domToReact(children, options)}
  //         </span>
  //       );
  //     }
  //   }
  // };

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
          <span className="text-lg text-blue-300 font-medium">{commentContent?.username}</span>
          <span className="mr-4 text-sm font-medium text-gray-700">Feb 12</span>
        </div>
        <p>{parse(contentBody)}</p>
        {/* <p>{commentContent?.body}</p> */}
        {commentContent?.body.length > 210 && (
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
              <span className="pl-3 font-medium">12</span>
            </span>
            <span className="flex items-center">
              <Image src="/images/smile.png" width={20} height={20} />
              <span className="pl-3 font-medium">12</span>
            </span>
          </div>
          <div className="flex items-center mr-6">
            <Image src="/images/reply.png" width={20} height={20} />
            <span
              className="pl-3 font-medium"
              onClick={() =>
                setActiveComment({
                  id: commentContent.id,
                  type: 'replying',
                })
              }
            >
              Reply
            </span>
          </div>
        </div>
        <div className="w-full border-b border-gray-200 pt-4"></div>
        {isReplying && (
          <InputMention
            submitLabel="Reply"
            initialText={`${parentId == null ? '' : `@${commentContent.username}`}`}
            handleSubmit={(text: any) =>
              addComment(
                // `${parentId == null ? '' : `@${commentContent.username}`} ${text}`,
                text,
                replyId
              )
            }
            handleCancel={() => setActiveComment(null)}
          />
        )}
        {replies.length > 0 && (
          <div className={replies}>
            {replies?.map((reply: any) => (
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
