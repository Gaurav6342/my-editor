// pages/index.js
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'codemirror/lib/codemirror.css'; // Import the Codemirror styles
import 'codemirror/mode/python/python'; // Import the Python mode for Codemirror

const CodeMirror = dynamic(() => import('react-codemirror2'), { ssr: false });
const Console = dynamic(() => import('../components/Console'), { ssr: false });

const Home = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const runCode = async () => {
    // Use Pyodide to execute the Python code
    const pyodide = await window.languagePluginLoader;
    const result = pyodide.runPython(code);

    // Set the result to the output state
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
