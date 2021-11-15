/* eslint-disable react/no-children-prop */
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../../common/CodeBlock';

export default function Home() {
  const content = `# Here is some JavaScript code:

  \`\`\`js
  console.log('It works!')
  \`\`\`
  `;
  console.log(content);
  return <ReactMarkdown components={CodeBlock} children={content} />;
}
