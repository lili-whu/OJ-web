import gfm from '@bytemd/plugin-gfm';
import { Viewer } from '@bytemd/react';
const plugins = [
  gfm(),
  // Add more plugins here
];

const MdViewer = (props: { value: string }) => {
  return (
    <div>
      <Viewer value={props.value as string} plugins={plugins} />
    </div>
  );
};
export default MdViewer;
