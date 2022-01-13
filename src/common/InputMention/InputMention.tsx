/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState, useRef } from 'react';

import { MentionsInput, Mention } from 'react-mentions';
import useSWR from 'swr';

import { replaceTagBr, convertReplyTagInit } from '../../utilities/helper';
// import { APIservice } from './services';

const InputMention = ({
  handleSubmit,
  initialText,
  submitLabel,
  handleCancel,
  idUserReply,
}: any) => {
  const [content, setContent] = useState<any>(initialText);
  const [users, setUsers] = useState<any>([]);
  const [tags, setTags] = useState<any>([]);
  // const [tagNames, setTagNames] = useState<any>([]);
  const myInput = useRef<any>();

  const { data: allUsers } = useSWR('http://localhost:3100/api/v1/user', {
    revalidateOnFocus: false,
  });

  const { data: allTag } = useSWR('http://localhost:3100/api/v1/tags', {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    getActors();
    getTags();
  }, [allUsers, allTag]);
  const addContent = (input: string | any[]) => {
    if (input.length <= 350) {
      setContent(input);
    }
  };

  async function getActors(): Promise<void> {
    const usersArr: any = [];
    allUsers?.data.map((item: any) => {
      usersArr.push({
        id: item.id,
        display: item.lastName,
      });
    });
    setUsers(usersArr);
  }

  async function getTags(): Promise<void> {
    const tagsArr: any = [];
    allTag?.data.map((item: any) => {
      tagsArr.push({
        id: item.id,
        display: item.name,
      });
    });
    setTags(tagsArr);
  }

  function savePost(e: any) {
    e.preventDefault();

    let newContent = content;

    newContent = newContent.split('@@@__').join('<a href="/user/');
    newContent = newContent.split('^^^__').join('" style="color:#ADE3FF; font-weight: 500;">@');
    newContent = newContent.split('@@@^^^').join('</a>');

    newContent = newContent.split('$$$__').join('<a href="/tag/');
    newContent = newContent
      .split('~~~__')
      .join('" style="background-color:#63B3ED; font-weight: 500;">#');
    newContent = newContent.split('$$$~~~').join('</a>');
    if (newContent !== '') {
      const body = newContent.trim();
      if (submitLabel === 'Comment') {
        handleSubmit(replaceTagBr(body));
        setContent('');
      } else if (submitLabel === 'Reply') {
        handleSubmit(replaceTagBr(convertReplyTagInit(body, idUserReply)));
        setContent('');
      }
    }
  }

  const clearFormInput = () => {
    setContent('');
  };

  return (
    <div className="w-full rounded-md text-gray-700">
      {/* {submitLabel === 'Comment' ? (
        <div className="heading text-left font-bold text-2xl ml-5 mt-5 text-gray-800">Comment</div>
      ) : (
        ''
      )} */}

      <form
        onSubmit={savePost}
        // className="editor mx-auto w-full flex flex-col text-gray-800 border border-gray-300 p-4 shadow-sm rounded"
        className="editor items-center border-gray-400 bg-white flex-col pt-1 pb-2 pl-2 pr-5 w-full h-auto mb-8 mt-3 border focus:outline-none rounded-md"
      >
        <div className="description outline-none px-5 py-2 rounded-full">
          <MentionsInput
            className="mentions text-base rounded-md border-transparent"
            inputRef={myInput}
            spellCheck="false"
            placeholder="Enter your thoughts on this post."
            value={content}
            onChange={(event) => addContent(event.target.value)}
          >
            <Mention
              trigger="@"
              data={users}
              markup="@@@____id__^^^____display__@@@^^^"
              displayTransform={(_id, display) => `@${display}`}
              style={{
                backgroundColor: '#daf4fa',
              }}
              appendSpaceOnAdd={true}
            />
            <Mention
              trigger="#"
              data={tags}
              markup="$$$____id__~~~____display__$$$~~~"
              displayTransform={(_id, display) => `#${display}`}
              style={{
                backgroundColor: '#0091F7',
              }}
              appendSpaceOnAdd
            />
          </MentionsInput>
        </div>

        <div className="icons flex text-gray-700 m-2">
          <div className="count ml-auto text-gray-700 text-[10px] font-semibold">
            {350 - content.length}
            /350
          </div>
        </div>
        <div className="buttons flex justify-end">
          <button
            className="py-2 px-4 font-medium pr-6  rounded-md"
            onClick={(e) => {
              e.preventDefault();
              if (submitLabel === 'Comment') {
                clearFormInput();
              } else {
                handleCancel();
              }
            }}
          >
            {submitLabel === 'Comment' ? 'Clear' : 'Cancel'}
          </button>
          <button className="px-3 font-medium border text-blue-600 border-blue-600 rounded-md">
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputMention;
