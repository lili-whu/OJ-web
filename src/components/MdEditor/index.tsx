import gfm from '@bytemd/plugin-gfm';
import { Editor } from '@bytemd/react';
const plugins = [
  gfm(),
  // Add more plugins here
];

const MdEditor = (props: { value: string; onValueChange: (arg0: string) => void }) => {
  // const [value, setValue] = useState(props.value as string);

  return (
    <div>
      <Editor
        value={props.value}
        plugins={plugins}
        onChange={(v) => {
          // setValue(v);
          props.onValueChange(v);
        }}
      />
    </div>
  );
};
export default MdEditor;
