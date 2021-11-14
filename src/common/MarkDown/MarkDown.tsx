/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { IInstance } from '@uiw/react-markdown-editor/cjs/common/codemirror';
import ReactCodeMirror from '@uiw/react-markdown-editor/cjs/components/CodeMirror';

const MarkdownEditor = dynamic<any>(
  () => import('@uiw/react-markdown-editor').then((mod) => mod.default),
  { ssr: false },
);

function HomePage({ content, setNewPost }: any) {
  const handleChange: any = (_editor: IInstance, _data: ReactCodeMirror, value: string) => {
    setNewPost((state: any) => ({
      ...state,
      content: value,
    }));
  };

  return (
    <div>
      <MarkdownEditor value={content} height={300} onChange={handleChange} />
    </div>
  );
}

export default HomePage;
