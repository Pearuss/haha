import React, { ReactElement, useState } from 'react';

export default function FormComment({
  handleSubmit,
  submitLabel,
  handleCancel,
  initialText = '',
}: any): ReactElement {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.trim().length === 0;
  const onSubmit = (event: any) => {
    event.preventDefault();
    handleSubmit(text);

    setText('');
  };

  return (
    <div className="relative flex items-center bg-white flex-col py-2 px-4 w-full h-auto my-8 border  rounded-md">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full min-h-[4vh] h-20 p-3 overflow-y-hidden border-none focus:outline-none resize-none"
        placeholder="Start typing ..."
      ></textarea>
      <div className="w-full flex items-center justify-end text-gray-700 ">
        <button className="py-2 px-4 font-medium pr-6  rounded-md" onClick={handleCancel}>
          Cancel
        </button>
        <button
          className="py-1 px-3 font-medium border text-blue-600 border-blue-600 rounded-md"
          onClick={onSubmit}
          disabled={isTextareaDisabled}
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
