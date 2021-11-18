/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState, useRef } from 'react';

import { MentionsInput, Mention } from 'react-mentions';

import { APIservice } from './services';

const NewPost = () => {
  const [content, setContent] = useState<any>('');
  const [users, setUsers] = useState<any>([]);
  const [tags, setTags] = useState<any>([]);
  const [tagNames, setTagNames] = useState<any>([]);
  const myInput = useRef<any>();

  useEffect(() => {
    getActors();
    getTags();
  }, []);

  function addContent(input: string | any[]) {
    if (input.length <= 350) {
      setContent(input);
    }
  }

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
    newContent = newContent.split('^^^__').join('">@');
    newContent = newContent.split('@@@^^^').join('</a>');

    newContent = newContent.split('$$$__').join('<a href="/tag/');
    newContent = newContent.split('~~~__').join('">#');
    newContent = newContent.split('$$$~~~').join('</a>');
    if (newContent !== '') {
      const body = newContent.trim();
    }
  }

  return (
    <div className="w-full">
      <div className="heading text-left font-bold text-2xl ml-5 mt-5 mb-3 text-gray-800">
        Comment
      </div>
      <form
        onSubmit={savePost}
        className="editor mx-auto w-full flex flex-col text-gray-800 border border-gray-300 p-4 shadow-sm rounded"
      >
        <div className="description outline-none px-5 py-2 rounded-full">
          <MentionsInput
            className="mentions bg-white text-base"
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
              style={{
                backgroundColor: '#daf4fa',
              }}
              appendSpaceOnAdd={true}
            />
            <Mention
              trigger="#"
              data={tags}
              markup="$$$____id__~~~____display__$$$~~~"
              style={{
                backgroundColor: '#daf4fa',
              }}
              onAdd={(display) => setTagNames((tagNames: any) => [...tagNames, display])}
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
        <div className="buttons flex">
          <button
            className="btn border border-none bg-gray-400 p-1 px-6 font-semibold cursor-pointer text-gray-500 ml-auto rounded-sm"
            onClick={(e) => {
              e.preventDefault();
              setContent('');
            }}
          >
            Cancel
          </button>
          <button className="btn border-none p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-blue-400 rounded-sm">
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
