import CodeEditor from '@/components/CodeEditor';
import { useState } from 'react';

export default () => {
  const [code, setCode] = useState('');

  return (
    <div>
      <CodeEditor value={code} onValueChange={setCode}></CodeEditor>
    </div>
  );
};
