import React, { useState } from 'react';
import { Copy, Check, Trash2, Eye, EyeOff, Download, Upload } from 'lucide-react';

export default function PromptBuilder() {
  const [inputs, setInputs] = useState({ taskContext: '', toneContext: '', backgroundData: '', taskDescription: '', examples: '', conversationHistory: '', immediateTask: '', thinkingSteps: '', outputFormatting: '', prefilledResponse: '' });
  const [labels, setLabels] = useState({ taskContext: 'Task Context', toneContext: 'Tone Context', backgroundData: 'Background Data, Documents & Images', taskDescription: 'Detailed Task Description & Rules', examples: 'Examples', conversationHistory: 'Conversation History', immediateTask: 'Immediate Task Description', thinkingSteps: 'Thinking Steps / Take a Deep Breath', outputFormatting: 'Output Formatting', prefilledResponse: 'Prefilled Response (If Any)' });
  const [editingLabel, setEditingLabel] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [deletedFields, setDeletedFields] = useState(new Set());
  const [hiddenFields, setHiddenFields] = useState(new Set());
  const [toast, setToast] = useState(null);
  const [hoverField, setHoverField] = useState(null);
  const [savedItems, setSavedItems] = useState(() => { try { const saved = localStorage.getItem('promptBuilderItems'); return saved ? JSON.parse(saved) : []; } catch (e) { return []; } });
  const [showSidebar, setShowSidebar] = useState(true);
  const [editingItemName, setEditingItemName] = useState(null);
  const [editingItemValue, setEditingItemValue] = useState('');
  const [editingOutputField, setEditingOutputField] = useState(null);
  const [editingOutputValue, setEditingOutputValue] = useState('');

  const colors = { taskContext: '#fef3c7', toneContext: '#dbeafe', backgroundData: '#dcfce7', taskDescription: '#f3e8ff', examples: '#fed7aa', conversationHistory: '#fce7f3', immediateTask: '#e0e7ff', thinkingSteps: '#f0fdf4', outputFormatting: '#faf5ff', prefilledResponse: '#f5f3ff' };

  const handleInputChange = (field, value) => setInputs(prev => ({ ...prev, [field]: value }));
  const handleCopyField = async (fieldKey) => { await navigator.clipboard.writeText(inputs[fieldKey]); setCopiedField(fieldKey); setTimeout(() => setCopiedField(null), 2000); };
  const handleDeleteField = (fieldKey) => { setDeletedFields(prev => { const newSet = new Set(prev); newSet.add(fieldKey); return newSet; }); setToast(fieldKey); setTimeout(() => setToast(null), 10000); };
  const handleRestoreField = (fieldKey) => { setDeletedFields(prev => { const newSet = new Set(prev); newSet.delete(fieldKey); return newSet; }); };
  const handleHideField = (fieldKey) => { setHiddenFields(prev => { const newSet = new Set(prev); newSet.add(fieldKey); return newSet; }); };
  const handleShowField = (fieldKey) => { setHiddenFields(prev => { const newSet = new Set(prev); newSet.delete(fieldKey); return newSet; }); };

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
    return [
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
  };

  const handleCopyOutput = async () => { await navigator.clipboard.writeText(generatePrompt()); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleSavePrompt = () => { const itemCount = savedItems.length + 1; const newItem = { id: Date.now(), name: `Untitled${itemCount}`, prompt: generatePrompt(), inputs, labels }; const updated = [newItem, ...savedItems]; setSavedItems(updated); try { localStorage.setItem('promptBuilderItems', JSON.stringify(updated)); } catch (e) {} };
  const handleLoadPrompt = (id) => { const item = savedItems.find(i => i.id === id); if (item) { setInputs(item.inputs); setLabels(item.labels); setDeletedFields(new Set()); setHiddenFields(new Set()); } };
  const handleDeleteSavedItem = (id) => { const updated = savedItems.filter(i => i.id !== id); setSavedItems(updated); try { localStorage.setItem('promptBuilderItems', JSON.stringify(updated)); } catch (e) {} };
  const handleRenameSavedItem = (id, newName) => { const updated = savedItems.map(item => item.id === id ? { ...item, name: newName } : item); setSavedItems(updated); try { localStorage.setItem('promptBuilderItems', JSON.stringify(updated)); } catch (e) {} };
  const handleExportItems = () => { const dataStr = JSON.stringify(savedItems, null, 2); const blob = new Blob([dataStr], { type: 'application/json' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = `prompt-builder-${Date.now()}.json`; document.body.appendChild(link); link.click(); document.body.removeChild(link); setTimeout(() => URL.revokeObjectURL(url), 100); };
  const handleImportItems = () => { const input = document.createElement('input'); input.type = 'file'; input.accept = '.json'; input.onchange = (e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onload = (event) => { try { const imported = JSON.parse(event.target.result); const updated = [...imported, ...savedItems]; setSavedItems(updated); localStorage.setItem('promptBuilderItems', JSON.stringify(updated)); } catch (err) { alert('Error importing'); } }; reader.readAsText(file); } }; input.click(); };
  const handleEditOutput = (fieldKey, text) => { setEditingOutputField(fieldKey); const lines = text.split('\n'); setEditingOutputValue(lines.slice(1).join('\n').trim()); };
  const handleSaveOutputEdit = (fieldKey) => { handleInputChange(fieldKey, editingOutputValue); setEditingOutputField(null); };

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
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 shadow-md px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">promptsav</div>
        <a href="https://github.com/nafisadman/promptsav" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold">GitHub</a>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {showSidebar && (
          <div className="w-72 bg-white border-r border-gray-200 overflow-y-auto shadow-xl">
            <div className="p-6 sticky top-0 bg-white border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Saved</h3>
              <div className="flex gap-2">
                <button onClick={handleExportItems} disabled={savedItems.length === 0} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-sm font-semibold rounded-lg transition-colors">
                  <Download size={16} /> Export
                </button>
                <button onClick={handleImportItems} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors">
                  <Upload size={16} /> Import
                </button>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {savedItems.length === 0 && <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">No saved items</div>}
              {savedItems.map(item => (
                <div key={item.id} className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                  {editingItemName === item.id ? (
                    <div className="flex gap-2 mb-2">
                      <input type="text" value={editingItemValue} onChange={(e) => setEditingItemValue(e.target.value)} className="flex-1 px-2 py-1 border border-blue-500 rounded text-sm" autoFocus />
                      <button onClick={() => { handleRenameSavedItem(item.id, editingItemValue); setEditingItemName(null); }} className="px-2 py-1 bg-emerald-600 text-white text-xs rounded font-semibold">OK</button>
                    </div>
                  ) : (
                    <h3 onDoubleClick={() => { setEditingItemName(item.id); setEditingItemValue(item.name); }} className="font-bold text-gray-900 cursor-pointer hover:text-blue-600 mb-1">{item.name}</h3>
                  )}
                  <p className="text-xs text-gray-600 truncate mb-2">{item.prompt.substring(0, 50)}...</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleLoadPrompt(item.id)} className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs rounded font-semibold">Load</button>
                    <button onClick={() => handleDeleteSavedItem(item.id)} className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded font-semibold">X</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <button onClick={() => setShowSidebar(false)} className="w-full px-3 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg">Hide</button>
            </div>
          </div>
        )}

        {!showSidebar && (
          <button onClick={() => setShowSidebar(true)} className="fixed left-4 top-20 z-50 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg">Show</button>
        )}

        <div className="flex-1 flex gap-4 p-4 overflow-hidden">
          <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h1 className="text-2xl font-bold text-gray-900">Input</h1>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {inputFields.map(field => {
                const isDeleted = deletedFields.has(field.key);
                const isHidden = hiddenFields.has(field.key);
                if (isDeleted) return null;
                return (
                  <div key={field.key} onMouseEnter={() => setHoverField(field.key)} onMouseLeave={() => setHoverField(null)} className="space-y-1">
                    <div className="flex items-center justify-between">
                      {editingLabel === field.key ? (
                        <div className="flex gap-2 flex-1">
                          <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="flex-1 px-3 py-1 border border-blue-500 rounded text-sm" autoFocus />
                          <button onClick={() => { setLabels(prev => ({ ...prev, [field.key]: editValue })); setEditingLabel(null); }} className="px-3 py-1 bg-emerald-600 text-white text-xs rounded font-semibold">Save</button>
                          <button onClick={() => setEditingLabel(null)} className="px-3 py-1 bg-red-600 text-white text-xs rounded font-semibold">Cancel</button>
                        </div>
                      ) : (
                        <>
                          <label onDoubleClick={() => { setEditingLabel(field.key); setEditValue(labels[field.key]); }} className={`text-sm font-semibold cursor-pointer ${isHidden ? 'text-gray-400' : 'text-gray-900'}`}>{labels[field.key]}</label>
                          {!isHidden && (
                            <div className={`flex gap-1 transition-opacity ${hoverField === field.key ? 'opacity-100' : 'opacity-0'}`}>
                              <button onClick={() => handleCopyField(field.key)} disabled={!inputs[field.key]} className="p-1 hover:bg-gray-100 rounded" title="Copy">
                                {copiedField === field.key ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                              </button>
                              <button onClick={() => handleHideField(field.key)} className="p-1 hover:bg-gray-100 rounded" title="Hide">
                                <EyeOff size={14} />
                              </button>
                              <button onClick={() => handleDeleteField(field.key)} className="p-1 hover:bg-red-50 rounded" title="Delete">
                                <Trash2 size={14} className="text-red-600" />
                              </button>
                            </div>
                          )}
                          {isHidden && (
                            <button onClick={() => handleShowField(field.key)} className="p-1 hover:bg-gray-100 rounded">
                              <Eye size={14} />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    <textarea disabled={isHidden} value={inputs[field.key]} onChange={(e) => { handleInputChange(field.key, e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 300) + 'px'; }} placeholder={field.placeholder} className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" style={{ backgroundColor: colors[field.key], opacity: isHidden ? 0.5 : 1, cursor: isHidden ? 'not-allowed' : 'auto', minHeight: '40px', maxHeight: '300px', overflow: 'hidden' }} rows="1" />
                  </div>
                );
              })}
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button onClick={handleSavePrompt} className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg">Save</button>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Output</h2>
              <button onClick={handleCopyOutput} className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm">
                {copied ? (<><Check size={16} /> Copied!</>) : (<><Copy size={16} /> Copy</>)}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {generateColoredPrompt().length === 0 ? (
                <div className="h-full flex items-center justify-center p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">Your prompt will appear here...</div>
              ) : (
                generateColoredPrompt().map((section, idx) => {
                  const isEditing = editingOutputField === section.key;
                  return (
                    <div key={idx} onClick={() => handleEditOutput(section.key, section.text)} className={`p-3 rounded-lg cursor-pointer transition-all text-sm ${isEditing ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'}`} style={{ backgroundColor: colors[section.key] }}>
                      {isEditing ? (
                        <div className="space-y-2">
                          <textarea value={editingOutputValue} onChange={(e) => setEditingOutputValue(e.target.value)} className="w-full px-2 py-1 border border-blue-400 rounded text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" style={{ minHeight: '100px' }} autoFocus />
                          <div className="flex gap-2">
                            <button onClick={(e) => { e.stopPropagation(); handleSaveOutputEdit(section.key); }} className="flex-1 px-2 py-1 bg-emerald-600 text-white text-xs rounded font-semibold">Save</button>
                            <button onClick={(e) => { e.stopPropagation(); setEditingOutputField(null); }} className="flex-1 px-2 py-1 bg-red-600 text-white text-xs rounded font-semibold">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-800 font-mono whitespace-pre-wrap break-words">{section.text}</p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-2 justify-center flex-wrap">
              <a href={`https://chatgpt.com/?q=${encodeURIComponent(generatePrompt())}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg font-semibold">ChatGPT</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(generatePrompt())}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg font-semibold">Gemini</a>
              <a href={`https://claude.ai/?q=${encodeURIComponent(generatePrompt())}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-lg font-semibold">Claude</a>
              <a href={`https://grok.x.com/?q=${encodeURIComponent(generatePrompt())}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-black hover:bg-gray-800 text-white text-xs rounded-lg font-semibold">Grok</a>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-xl border border-gray-200 p-4 flex items-center gap-4 z-50 max-w-sm">
          <span className="text-sm font-medium text-gray-900">{labels[toast]} deleted</span>
          <button onClick={() => { handleRestoreField(toast); setToast(null); }} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded font-semibold whitespace-nowrap">Restore</button>
          <button onClick={() => setToast(null)} className="text-gray-500 hover:text-gray-700 text-lg">X</button>
        </div>
      )}
    </div>
  );
}