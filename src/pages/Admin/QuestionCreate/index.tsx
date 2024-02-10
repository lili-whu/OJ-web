import MdEditor from '@/components/MdEditor';
import MdViewer from '@/components/MdViewer';
import { useState } from 'react';

export default () => {
  const [description, setDescription] = useState('');

  return (
    <div>
      <MdEditor value={description} onValueChange={setDescription}></MdEditor>
      <MdViewer value={description} />
    </div>
  );
};
