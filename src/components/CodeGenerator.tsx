
import React, { useState } from 'react';
import { Code, Play, Download, Copy, Zap } from 'lucide-react';

const CodeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState('');

  const languages = [
    { value: 'javascript', label: 'JavaScript', color: 'text-yellow-400' },
    { value: 'python', label: 'Python', color: 'text-blue-400' },
    { value: 'react', label: 'React', color: 'text-cyan-400' },
    { value: 'html', label: 'HTML', color: 'text-orange-400' },
    { value: 'css', label: 'CSS', color: 'text-purple-400' },
    { value: 'nodejs', label: 'Node.js', color: 'text-green-400' },
    { value: 'cpp', label: 'C++', color: 'text-red-400' },
    { value: 'java', label: 'Java', color: 'text-orange-500' }
  ];

  const generateCode = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate code generation
    setTimeout(() => {
      const codeExamples = {
        javascript: `// ${prompt}
function calculateResult(a, b) {
  return a + b;
}

// Example usage
const result = calculateResult(5, 3);
console.log('Result:', result);

// Advanced functionality
const advancedCalculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b !== 0 ? a / b : 'Error: Division by zero'
};`,
        python: `# ${prompt}
def calculate_result(a, b):
    return a + b

# Example usage
result = calculate_result(5, 3)
print(f"Result: {result}")

# Advanced functionality
class AdvancedCalculator:
    @staticmethod
    def add(a, b):
        return a + b
    
    @staticmethod
    def subtract(a, b):
        return a - b
    
    @staticmethod
    def multiply(a, b):
        return a * b
    
    @staticmethod
    def divide(a, b):
        return a / b if b != 0 else "Error: Division by zero"`,
        react: `// ${prompt}
import React, { useState } from 'react';

const Calculator = () => {
  const [result, setResult] = useState(0);
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');

  const calculateResult = () => {
    setResult(Number(num1) + Number(num2));
  };

  return (
    <div className="calculator">
      <h2>Calculator</h2>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="First number"
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Second number"
      />
      <button onClick={calculateResult}>Calculate</button>
      <div>Result: {result}</div>
    </div>
  );
};

export default Calculator;`
      };

      setGeneratedCode(codeExamples[language as keyof typeof codeExamples] || codeExamples.javascript);
      setIsGenerating(false);
    }, 2000);
  };

  const runCode = () => {
    if (language === 'javascript') {
      try {
        // Create a safe execution environment
        const logs: string[] = [];
        const mockConsole = {
          log: (...args: any[]) => logs.push(args.join(' '))
        };
        
        // Replace console.log calls and execute
        const codeToRun = generatedCode.replace(/console\.log/g, 'mockConsole.log');
        const func = new Function('mockConsole', codeToRun);
        func(mockConsole);
        
        setOutput(logs.join('\n') || 'Code executed successfully!');
      } catch (error) {
        setOutput(`Error: ${error}`);
      }
    } else {
      setOutput(`Preview not available for ${language}. Code generated successfully!`);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  const downloadCode = () => {
    const extension = language === 'javascript' ? 'js' : language === 'python' ? 'py' : language;
    const element = document.createElement('a');
    const file = new Blob([generatedCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `generated-code.${extension}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Zap className="w-6 h-6 text-cyan-400" />
        <h3 className="text-xl font-semibold text-white">AI Code Generator</h3>
      </div>

      {/* Language Selection */}
      <div className="space-y-3">
        <label className="text-white font-medium">Programming Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          {languages.map(lang => (
            <option key={lang.value} value={lang.value} className="bg-slate-800">
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Code Prompt */}
      <div className="space-y-3">
        <label className="text-white font-medium">Describe what you want to code:</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Create a function that calculates the sum of two numbers"
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none h-24"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={generateCode}
        disabled={!prompt.trim() || isGenerating}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 disabled:opacity-50"
      >
        {isGenerating ? 'Generating Code...' : 'Generate Code'}
      </button>

      {/* Generated Code */}
      {generatedCode && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-medium">Generated Code:</h4>
            <div className="flex space-x-2">
              <button
                onClick={copyCode}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                title="Copy code"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={runCode}
                className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 transition-colors"
                title="Run code"
              >
                <Play className="w-4 h-4" />
              </button>
              <button
                onClick={downloadCode}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                title="Download code"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="bg-slate-900/50 border border-white/20 rounded-lg p-4 max-h-80 overflow-y-auto">
            <pre className="text-sm text-white font-mono leading-relaxed">
              <code>{generatedCode}</code>
            </pre>
          </div>

          {/* Output */}
          {output && (
            <div className="space-y-2">
              <h5 className="text-white font-medium">Output:</h5>
              <div className="bg-green-900/20 border border-green-400/30 rounded-lg p-4">
                <pre className="text-green-300 text-sm font-mono whitespace-pre-wrap">
                  {output}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeGenerator;
