import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function PromptBuilder() {
  const [inputs, setInputs] = useState({
    taskContext: '',
    toneContext: '',
    backgroundData: '',
    taskDescription: '',
    examples: '',
    conversationHistory: '',
    immediateTask: '',
    thinkingSteps: '',
    outputFormatting: '',
    prefilledResponse: ''
  });

  const [copied, setCopied] = useState(false);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePrompt = () => {
    const sections = [
      inputs.taskContext && `Task Context:\n${inputs.taskContext}`,
      inputs.toneContext && `Tone Context:\n${inputs.toneContext}`,
      inputs.backgroundData && `Background Data:\n${inputs.backgroundData}`,
      inputs.taskDescription && `Task Description & Rules:\n${inputs.taskDescription}`,
      inputs.examples && `Examples:\n${inputs.examples}`,
      inputs.conversationHistory && `Conversation History:\n${inputs.conversationHistory}`,
      inputs.immediateTask && `Immediate Task:\n${inputs.immediateTask}`,
      inputs.thinkingSteps && `Thinking Steps:\n${inputs.thinkingSteps}`,
      inputs.outputFormatting && `Output Formatting:\n${inputs.outputFormatting}`,
      inputs.prefilledResponse && `Prefilled Response:\n${inputs.prefilledResponse}`
    ].filter(Boolean);

    return sections.join('\n\n');
  };

  const outputText = generatePrompt();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputFields = [
    { key: 'taskContext', label: 'Task Context', placeholder: 'Describe the main task...' },
    { key: 'toneContext', label: 'Tone Context', placeholder: 'Define the tone and style...' },
    { key: 'backgroundData', label: 'Background Data, Documents & Images', placeholder: 'Provide background information...' },
    { key: 'taskDescription', label: 'Detailed Task Description & Rules', placeholder: 'Detail the task and rules...' },
    { key: 'examples', label: 'Examples', placeholder: 'Provide examples of expected behavior...' },
    { key: 'conversationHistory', label: 'Conversation History', placeholder: 'Paste conversation history...' },
    { key: 'immediateTask', label: 'Immediate Task Description', placeholder: 'Describe the immediate request...' },
    { key: 'thinkingSteps', label: 'Thinking Steps / Take a Deep Breath', placeholder: 'Instructions for reasoning...' },
    { key: 'outputFormatting', label: 'Output Formatting', placeholder: 'Specify output format...' },
    { key: 'prefilledResponse', label: 'Prefilled Response (If Any)', placeholder: 'Optional prefilled response...' }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Left Container - Input Fields */}
      <div style={{
        width: '50%',
        overflowY: 'auto',
        padding: '32px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e5e7eb'
      }}>
        <h1 style={{
          fontSize: '30px',
          fontWeight: 'bold',
          marginBottom: '32px',
          color: '#111827'
        }}>Prompt Structure</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {inputFields.map(field => (
            <div key={field.key}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                {field.label}
              </label>
              <textarea
                value={inputs[field.key]}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'system-ui',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
                rows="3"
                onFocus={(e) => e.target.style.outline = '2px solid #3b82f6'}
                onBlur={(e) => e.target.style.outline = 'none'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Container - Output */}
      <div style={{
        width: '50%',
        padding: '32px',
        background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#111827'
          }}>Output Prompt</h2>
          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: copied ? '#10b981' : '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => !copied && (e.target.style.backgroundColor = '#1d4ed8')}
            onMouseLeave={(e) => !copied && (e.target.style.backgroundColor = '#2563eb')}
          >
            {copied ? (
              <>
                <Check size={18} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy
              </>
            )}
          </button>
        </div>

        <div style={{
          flex: 1,
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '24px',
          overflowY: 'auto',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
        }}>
          <pre style={{
            fontSize: '14px',
            color: '#1f2937',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontFamily: 'monospace',
            lineHeight: '1.5',
            margin: 0
          }}>
            {outputText || 'Your prompt will appear here...'}
          </pre>
        </div>
      </div>
    </div>
  );
}