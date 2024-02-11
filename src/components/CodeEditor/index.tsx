import { useState } from 'react';

import Editor from '@monaco-editor/react';

export default (props: {
  codeBack: string;
  lang: string;
  value: string;
  onValueChange: (arg0: string) => void;
}) => {
  const [value, setValue] = useState(props.value as string);
  const template = {
    Java: 'java',
    Golang: 'Golang',
    CPlusPlus: 'C++',
  };
  return (
    <Editor
      height="70vh"
      value={value}
      defaultLanguage="Java"
      language={props.lang}
      defaultValue={template.Java}
      theme={props.codeBack}
      onChange={(value) => {
        props.onValueChange(value as string);
      }}
    />
  );
};
