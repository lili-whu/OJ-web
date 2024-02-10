import { useState } from 'react';

import Editor from '@monaco-editor/react';

export default (props: { value: string; onValueChange: (arg0: string) => void }) => {
  const [value, setValue] = useState(props.value as string);
  return (
    <Editor
      height="70vh"
      value={value}
      defaultLanguage="java"
      defaultValue="// some comment"
      theme="vs-dark"
      onChange={(value) => {
        props.onValueChange(value as string);
      }}
    />
  );
};
