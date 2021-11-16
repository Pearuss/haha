import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../../common/CodeBlock';

export default function Home() {
  const content = '# Hello\n```js\nconst a = 2;\n```';
  return <ReactMarkdown components={CodeBlock} children={content} />;
}
