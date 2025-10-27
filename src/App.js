import React, { useState } from 'react';
import { Copy, Check, Trash2, Eye, EyeOff } from 'lucide-react';

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

  const [labels, setLabels] = useState({
    taskContext: 'Task Context',
    toneContext: 'Tone Context',
    backgroundData: 'Background Data, Documents & Images',
    taskDescription: 'Detailed Task Description & Rules',
    examples: 'Examples',
    conversationHistory: 'Conversation History',
    immediateTask: 'Immediate Task Description',
    thinkingSteps: 'Thinking Steps / Take a Deep Breath',
    outputFormatting: 'Output Formatting',
    prefilledResponse: 'Prefilled Response (If Any)'
  });

  const [editingLabel, setEditingLabel] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [deletedFields, setDeletedFields] = useState(new Set());
  const [hiddenFields, setHiddenFields] = useState(new Set());
  const [toast, setToast] = useState(null);
  const [hoverField, setHoverField] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);

  const colors = {
    taskContext: '#fef3c7',
    toneContext: '#dbeafe',
    backgroundData: '#dcfce7',
    taskDescription: '#f3e8ff',
    examples: '#fed7aa',
    conversationHistory: '#fce7f3',
    immediateTask: '#e0e7ff',
    thinkingSteps: '#f0fdf4',
    outputFormatting: '#faf5ff',
    prefilledResponse: '#f5f3ff'
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCopyField = async (fieldKey) => {
    await navigator.clipboard.writeText(inputs[fieldKey]);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDeleteField = (fieldKey) => {
    setDeletedFields(prev => {
      const newSet = new Set(prev);
      newSet.add(fieldKey);
      return newSet;
    });
    setToast(fieldKey);
    setTimeout(() => setToast(null), 10000);
  };

  const handleRestoreField = (fieldKey) => {
    setDeletedFields(prev => {
      const newSet = new Set(prev);
      newSet.delete(fieldKey);
      return newSet;
    });
  };

  const handleHideField = (fieldKey) => {
    setHiddenFields(prev => {
      const newSet = new Set(prev);
      newSet.add(fieldKey);
      return newSet;
    });
  };

  const handleShowField = (fieldKey) => {
    setHiddenFields(prev => {
      const newSet = new Set(prev);
      newSet.delete(fieldKey);
      return newSet;
    });
  };

  const generatePrompt = () => {
    const sections = [
      inputs.taskContext && !deletedFields.has('taskContext') && !hiddenFields.has('taskContext') && `${labels.taskContext}:\n${inputs.taskContext}`,
      inputs.toneContext && !deletedFields.has('toneContext') && !hiddenFields.has('toneContext') && `${labels.toneContext}:\n${inputs.toneContext}`,
      inputs.backgroundData && !deletedFields.has('backgroundData') && !hiddenFields.has('backgroundData') && `${labels.backgroundData}:\n${inputs.backgroundData}`,
      inputs.taskDescription && !deletedFields.has('taskDescription') && !hiddenFields.has('taskDescription') && `${labels.taskDescription}:\n${inputs.taskDescription}`,
      inputs.examples && !deletedFields.has('examples') && !hiddenFields.has('examples') && `${labels.examples}:\n${inputs.examples}`,
      inputs.conversationHistory && !deletedFields.has('conversationHistory') && !hiddenFields.has('conversationHistory') && `${labels.conversationHistory}:\n${inputs.conversationHistory}`,
      inputs.immediateTask && !deletedFields.has('immediateTask') && !hiddenFields.has('immediateTask') && `${labels.immediateTask}:\n${inputs.immediateTask}`,
      inputs.thinkingSteps && !deletedFields.has('thinkingSteps') && !hiddenFields.has('thinkingSteps') && `${labels.thinkingSteps}:\n${inputs.thinkingSteps}`,
      inputs.outputFormatting && !deletedFields.has('outputFormatting') && !hiddenFields.has('outputFormatting') && `${labels.outputFormatting}:\n${inputs.outputFormatting}`,
      inputs.prefilledResponse && !deletedFields.has('prefilledResponse') && !hiddenFields.has('prefilledResponse') && `${labels.prefilledResponse}:\n${inputs.prefilledResponse}`
    ].filter(Boolean);
    return sections.join('\n\n');
  };

  const generateColoredPrompt = () => {
    const sections = [
      { key: 'taskContext', text: inputs.taskContext && !deletedFields.has('taskContext') && !hiddenFields.has('taskContext') && `${labels.taskContext}:\n${inputs.taskContext}` },
      { key: 'toneContext', text: inputs.toneContext && !deletedFields.has('toneContext') && !hiddenFields.has('toneContext') && `${labels.toneContext}:\n${inputs.toneContext}` },
      { key: 'backgroundData', text: inputs.backgroundData && !deletedFields.has('backgroundData') && !hiddenFields.has('backgroundData') && `${labels.backgroundData}:\n${inputs.backgroundData}` },
      { key: 'taskDescription', text: inputs.taskDescription && !deletedFields.has('taskDescription') && !hiddenFields.has('taskDescription') && `${labels.taskDescription}:\n${inputs.taskDescription}` },
      { key: 'examples', text: inputs.examples && !deletedFields.has('examples') && !hiddenFields.has('examples') && `${labels.examples}:\n${inputs.examples}` },
      { key: 'conversationHistory', text: inputs.conversationHistory && !deletedFields.has('conversationHistory') && !hiddenFields.has('conversationHistory') && `${labels.conversationHistory}:\n${inputs.conversationHistory}` },
      { key: 'immediateTask', text: inputs.immediateTask && !deletedFields.has('immediateTask') && !hiddenFields.has('immediateTask') && `${labels.immediateTask}:\n${inputs.immediateTask}` },
      { key: 'thinkingSteps', text: inputs.thinkingSteps && !deletedFields.has('thinkingSteps') && !hiddenFields.has('thinkingSteps') && `${labels.thinkingSteps}:\n${inputs.thinkingSteps}` },
      { key: 'outputFormatting', text: inputs.outputFormatting && !deletedFields.has('outputFormatting') && !hiddenFields.has('outputFormatting') && `${labels.outputFormatting}:\n${inputs.outputFormatting}` },
      { key: 'prefilledResponse', text: inputs.prefilledResponse && !deletedFields.has('prefilledResponse') && !hiddenFields.has('prefilledResponse') && `${labels.prefilledResponse}:\n${inputs.prefilledResponse}` }
    ].filter(s => s.text);
    
    return sections;
  };

  const handleCopyOutput = async () => {
    await navigator.clipboard.writeText(generatePrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSavePrompt = () => {
    const timestamp = new Date().toLocaleString();
    const newSavedItem = {
      id: Date.now(),
      timestamp,
      prompt: generatePrompt(),
      inputs,
      labels
    };
    setSavedItems(prev => [newSavedItem, ...prev]);
  };

  const handleLoadPrompt = (id) => {
    const item = savedItems.find(i => i.id === id);
    if (item) {
      setInputs(item.inputs);
      setLabels(item.labels);
      setDeletedFields(new Set());
      setHiddenFields(new Set());
    }
  };

  const handleDeleteSavedItem = (id) => {
    setSavedItems(prev => prev.filter(i => i.id !== id));
  };

  const inputFields = [
    { key: 'taskContext', placeholder: 'Describe the main task...' },
    { key: 'toneContext', placeholder: 'Define the tone and style...' },
    { key: 'backgroundData', placeholder: 'Provide background information...' },
    { key: 'taskDescription', placeholder: 'Detail the task and rules...' },
    { key: 'examples', placeholder: 'Provide examples of expected behavior...' },
    { key: 'conversationHistory', placeholder: 'Paste conversation history...' },
    { key: 'immediateTask', placeholder: 'Describe the immediate request...' },
    { key: 'thinkingSteps', placeholder: 'Instructions for reasoning...' },
    { key: 'outputFormatting', placeholder: 'Specify output format...' },
    { key: 'prefilledResponse', placeholder: 'Optional prefilled response...' }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f9fafb' }}>
      {showSidebar && (
        <div style={{
          width: '200px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e5e7eb',
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '12px',
            marginTop: 0
          }}>Saved Items</h3>
          
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '12px' }}>
            {savedItems.length === 0 ? (
              <p style={{
                fontSize: '12px',
                color: '#9ca3af',
                textAlign: 'center',
                marginTop: '16px'
              }}>No saved items</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {savedItems.map(item => (
                  <div key={item.id} style={{
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    padding: '8px',
                    fontSize: '11px',
                    color: '#374151'
                  }}>
                    <div style={{ marginBottom: '6px' }}>
                      <div style={{ fontWeight: '600', marginBottom: '2px' }}>{item.timestamp}</div>
                      <div style={{ color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.prompt.substring(0, 30)}...
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        onClick={() => handleLoadPrompt(item.id)}
                        style={{
                          flex: 1,
                          padding: '4px 6px',
                          backgroundColor: '#3b82f6',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                      >
                        Load
                      </button>
                      <button
                        onClick={() => handleDeleteSavedItem(item.id)}
                        style={{
                          padding: '4px 6px',
                          backgroundColor: '#fee2e2',
                          color: '#dc2626',
                          border: '1px solid #fecaca',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#fecaca'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#fee2e2'}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowSidebar(false)}
            style={{
              padding: '6px 8px',
              backgroundColor: '#f3f4f6',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          >
            Hide
          </button>
        </div>
      )}

      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          style={{
            position: 'fixed',
            left: '16px',
            top: '16px',
            padding: '8px 12px',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: 1000
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          ☰ Show
        </button>
      )}

      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{
          flex: 1,
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
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '20px' }}>
            {inputFields.map(field => {
              const isDeleted = deletedFields.has(field.key);
              const isHidden = hiddenFields.has(field.key);
              
              if (isHidden) {
                return (
                  <div key={field.key} style={{
                    padding: '12px',
                    backgroundColor: '#fef3c7',
                    border: '1px solid #fcd34d',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: '#92400e', fontSize: '14px', fontWeight: '600' }}>
                      {labels[field.key]} (Hidden)
                    </span>
                    <button
                      onClick={() => handleShowField(field.key)}
                      style={{
                        padding: '6px 6px',
                        backgroundColor: '#f3f4f6',
                        color: '#6b7280',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#e5e7eb';
                        e.target.style.color = '#374151';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#f3f4f6';
                        e.target.style.color = '#6b7280';
                      }}
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                );
              }

              if (isDeleted) {
                return null;
              }

              return (
                <div 
                  key={field.key}
                  onMouseEnter={() => setHoverField(field.key)}
                  onMouseLeave={() => setHoverField(null)}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    {editingLabel === field.key ? (
                      <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          style={{
                            padding: '6px 12px',
                            border: '1px solid #3b82f6',
                            borderRadius: '6px',
                            fontSize: '14px',
                            flex: 1,
                            boxSizing: 'border-box'
                          }}
                          autoFocus
                        />
                        <button
                          onClick={() => {
                            setLabels(prev => ({ ...prev, [field.key]: editValue }));
                            setEditingLabel(null);
                          }}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#10b981',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingLabel(null)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#ef4444',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <label 
                          onDoubleClick={() => {
                            setEditingLabel(field.key);
                            setEditValue(labels[field.key]);
                          }}
                          style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151',
                            cursor: 'pointer',
                            userSelect: 'none'
                          }}
                        >
                          {labels[field.key]}
                        </label>
                        <div style={{ display: 'flex', gap: '6px', visibility: hoverField === field.key ? 'visible' : 'hidden' }}>
                          <button
                            onClick={() => handleCopyField(field.key)}
                            disabled={!inputs[field.key]}
                            title="Copy"
                            style={{
                              padding: '6px 6px',
                              backgroundColor: copiedField === field.key ? '#10b981' : '#f3f4f6',
                              color: copiedField === field.key ? '#ffffff' : '#6b7280',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              cursor: inputs[field.key] ? 'pointer' : 'not-allowed',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => {
                              if (inputs[field.key]) {
                                e.target.style.backgroundColor = '#e5e7eb';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (inputs[field.key] && copiedField !== field.key) {
                                e.target.style.backgroundColor = '#f3f4f6';
                              }
                            }}
                          >
                            {copiedField === field.key ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                          <button
                            onClick={() => handleHideField(field.key)}
                            title="Hide"
                            style={{
                              padding: '6px 6px',
                              backgroundColor: '#f3f4f6',
                              color: '#6b7280',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#e5e7eb';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = '#f3f4f6';
                            }}
                          >
                            <EyeOff size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteField(field.key)}
                            title="Delete"
                            style={{
                              padding: '6px 6px',
                              backgroundColor: '#f3f4f6',
                              color: '#dc2626',
                              border: '1px solid #fecaca',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#fee2e2';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = '#f3f4f6';
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                    <textarea
                    value={inputs[field.key]}
                    onChange={(e) => {
                      handleInputChange(field.key, e.target.value);
                      e.target.style.height = 'auto';
                      const newHeight = Math.min(e.target.scrollHeight, 250);
                      e.target.style.height = newHeight + 'px';
                    }}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'system-ui',
                      resize: 'none',
                      boxSizing: 'border-box',
                      outline: 'none',
                      minHeight: '24px',
                      maxHeight: '250px',
                      overflow: 'hidden',
                      lineHeight: '1.5',
                      backgroundColor: colors[field.key]
                    }}
                    rows="1"
                    onFocus={(e) => e.target.style.outline = '2px solid #3b82f6'}
                    onBlur={(e) => e.target.style.outline = 'none'}
                  />
                </div>
              );
            })}
          </div>

          <button
            onClick={handleSavePrompt}
            style={{
              width: '100%',
              padding: '10px 16px',
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
          >
            Save
          </button>
        </div>

        <div style={{
          flex: 1,
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
              onClick={handleCopyOutput}
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
                fontSize: '14px'
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
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            marginBottom: '16px'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#1f2937',
              fontFamily: 'monospace',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {generateColoredPrompt().length === 0 ? (
                'Your prompt will appear here...'
              ) : (
                generateColoredPrompt().map((section, idx) => (
                  <div key={idx} style={{ backgroundColor: colors[section.key], padding: '4px 0' }}>
                    {section.text}
                  </div>
                ))
              )}
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center'
          }}>
            <a
              href={`https://chatgpt.com/?q=${encodeURIComponent(generatePrompt())}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 16px',
                backgroundColor: '#10a37f',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0d8f6e'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#10a37f'}
            >
              ChatGPT
            </a>
            <a
              href={`https://gemini.google.com/?q=${encodeURIComponent(generatePrompt())}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 16px',
                backgroundColor: '#4285f4',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1f67db'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4285f4'}
            >
              Gemini
            </a>
            <a
              href={`https://claude.ai/?q=${encodeURIComponent(generatePrompt())}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 16px',
                backgroundColor: '#9333ea',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#7e22ce'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#9333ea'}
            >
              Claude
            </a>
            <a
              href={`https://grok.x.com/?q=${encodeURIComponent(generatePrompt())}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 16px',
                backgroundColor: '#000000',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#333333'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#000000'}
            >
              Grok
            </a>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            flex: 1,
            fontSize: '14px',
            color: '#374151',
            fontWeight: '500'
          }}>
            {labels[toast]} deleted
          </div>
          <button
            onClick={() => {
              handleRestoreField(toast);
              setToast(null);
            }}
            style={{
              padding: '6px 12px',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Restore
          </button>
          <button
            onClick={() => setToast(null)}
            style={{
              padding: '6px 8px',
              backgroundColor: '#f3f4f6',
              color: '#6b7280',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}