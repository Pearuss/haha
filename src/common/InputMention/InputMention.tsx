/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState, useRef } from 'react';

import { MentionsInput, Mention } from 'react-mentions';
import { replaceTagBr } from '../../utilities/helper';

import { APIservice } from './services';

const NewPost = ({ handleSubmit, initialText, submitLabel, handleCancel }: any) => {
  const [content, setContent] = useState<any>(initialText);
  const [users, setUsers] = useState<any>([]);
  const [tags, setTags] = useState<any>([]);
  // const [tagNames, setTagNames] = useState<any>([]);
  const myInput = useRef<any>();

  useEffect(() => {
    getActors();
    getTags();
  }, []);

  const addContent = (input: string | any[]) => {
    if (input.length <= 350) {
      setContent(input);
    }
  };

  async function getActors(): Promise<void> {
    const res = await APIservice.get('/users');
    const usersArr: any = [];
    res.data.map((item: any) => {
      usersArr.push({
        id: item.id,
        display: item.name,
      });
    });
    setUsers(usersArr);
  }

  async function getTags(): Promise<void> {
    const res = await APIservice.get('/tags');
    const tagsArr: any = [];
    res.data.tagsCloud.map((item: any) => {
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
      handleSubmit(replaceTagBr(body));
      setContent('');
    }
  }

  const clearFormInput = () => {
    setContent('');
  };

  return (
    <div className="w-full rounded-md text-gray-700">
      {submitLabel === 'Comment' ? (
        <div className="heading text-left font-bold text-2xl ml-5 mt-5 text-gray-800">Comment</div>
      ) : (
        ''
      )}

      <form
        onSubmit={savePost}
        // className="editor mx-auto w-full flex flex-col text-gray-800 border border-gray-300 p-4 shadow-sm rounded"
        className="editor items-center border-gray-300 bg-white flex-col py-2 px-4 w-full h-auto mb-8 mt-3 border"
      >
        <div className="description outline-none px-5 py-2 rounded-full">
          <MentionsInput
            className="mentions bg-white text-base rounded-md"
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
          <div className="count ml-auto text-gray-700 text-xs font-semibold">
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
          <button className="py-1 px-3 font-medium border text-blue-600 border-blue-600 rounded-md">
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
