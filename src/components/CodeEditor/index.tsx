import Editor from '@monaco-editor/react';

export default (props: {
  codeBack: string;
  lang: number;
  value: string;
  onValueChange: (arg0: string) => void;
}) => {
  const template = ['Java', 'Golang', 'C++'];
  return (
    <Editor
      height="50vh"
      value={props.value}
      defaultLanguage="Java"
      language={template[props.lang + 1]}
      defaultValue=""
      theme={props.codeBack}
      onChange={(value) => {
        props.onValueChange(value as string);
      }}
    />
  );
};
