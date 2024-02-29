// pages/index.js
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'codemirror/lib/codemirror.css'; // Import the Codemirror styles
import 'codemirror/mode/python/python'; // Import the Python mode for Codemirror

// Import the whole react-codemirror2 library
import 'react-codemirror2/lib/codemirror.css';
import { Controlled as CodeMirror } from 'react-codemirror2';

const Console = dynamic(() => import('../components/Console'), { ssr: false });

const Home = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const runCode = async () => {
    const pyodide = await window.languagePluginLoader;
    const result = pyodide.runPython(code);
    setOutput(result);
  };

  return (
    <div>
      <CodeMirror
        value={code}
        options={{
          mode: 'python',
          theme: 'material',
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
      />
      <button onClick={runCode}>Run</button>
      <div>
        <h2>Output:</h2>
        <Console output={output} />
      </div>
    </div>
  );
};

export default Home;
