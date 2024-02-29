// components/CodeEditor.js
import { Controlled as CodeMirror } from 'react-codemirror2';

const CodeEditor = ({ code, onChange }) => {
  return (
    <CodeMirror
      value={code}
      options={{
        mode: 'python',
        theme: 'material',
        lineNumbers: true,
      }}
      onBeforeChange={(editor, data, value) => {
        onChange(value);
      }}
    />
  );
};

export default CodeEditor;
