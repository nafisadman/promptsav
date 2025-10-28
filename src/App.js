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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>promptsav</div>
        <a href="https://github.com/nafisadman/promptsav" target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', backgroundColor: '#111827', color: '#ffffff', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', cursor: 'pointer' }}>GitHub</a>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {showSidebar && (
          <div style={{ width: '288px', backgroundColor: '#ffffff', borderRight: '1px solid #e5e7eb', overflowY: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, backgroundColor: '#ffffff' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Saved</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handleExportItems} disabled={savedItems.length === 0} style={{ flex: 1, padding: '8px 12px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '12px', opacity: savedItems.length === 0 ? 0.5 : 1 }}>Export</button>
                <button onClick={handleImportItems} style={{ flex: 1, padding: '8px 12px', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '12px' }}>Import</button>
              </div>
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {savedItems.length === 0 && <div style={{ padding: '16px', backgroundColor: '#dbeafe', border: '1px solid #7dd3fc', borderRadius: '8px', fontSize: '12px', color: '#0369a1' }}>No saved items</div>}
              {savedItems.map(item => (
                <div key={item.id} style={{ padding: '12px', backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                  {editingItemName === item.id ? (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input type="text" value={editingItemValue} onChange={(e) => setEditingItemValue(e.target.value)} style={{ flex: 1, padding: '6px 8px', border: '1px solid #2563eb', borderRadius: '4px', fontSize: '12px' }} autoFocus />
                      <button onClick={() => { handleRenameSavedItem(item.id, editingItemValue); setEditingItemName(null); }} style={{ padding: '6px 8px', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>OK</button>
                    </div>
                  ) : (
                    <h3 onDoubleClick={() => { setEditingItemName(item.id); setEditingItemValue(item.name); }} style={{ fontWeight: 'bold', color: '#111827', cursor: 'pointer', marginBottom: '4px' }}>{item.name}</h3>
                  )}
                  <p style={{ fontSize: '11px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '8px' }}>{item.prompt.substring(0, 50)}...</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleLoadPrompt(item.id)} style={{ flex: 1, padding: '4px 8px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: '600', fontSize: '11px', cursor: 'pointer' }}>Load</button>
                    <button onClick={() => handleDeleteSavedItem(item.id)} style={{ padding: '4px 8px', backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', fontWeight: '600', fontSize: '11px', cursor: 'pointer' }}>X</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
              <button onClick={() => setShowSidebar(false)} style={{ width: '100%', padding: '8px 12px', backgroundColor: '#d1d5db', color: '#374151', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>Hide</button>
            </div>
          </div>
        )}

        {!showSidebar && (
          <button onClick={() => setShowSidebar(true)} style={{ position: 'fixed', left: '16px', top: '80px', zIndex: 50, padding: '8px 16px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '12px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>Show</button>
        )}

        <div style={{ display: 'flex', flex: 1, gap: '16px', padding: '16px', overflow: 'hidden' }}>
          <div style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', background: 'linear-gradient(to right, #eff6ff, #e0e7ff)' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Input</h1>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {inputFields.map(field => {
                const isDeleted = deletedFields.has(field.key);
                const isHidden = hiddenFields.has(field.key);
                if (isDeleted) return null;
                return (
                  <div key={field.key} onMouseEnter={() => setHoverField(field.key)} onMouseLeave={() => setHoverField(null)} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {editingLabel === field.key ? (
                        <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
                          <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} style={{ flex: 1, padding: '6px 12px', border: '1px solid #2563eb', borderRadius: '6px', fontSize: '12px' }} autoFocus />
                          <button onClick={() => { setLabels(prev => ({ ...prev, [field.key]: editValue })); setEditingLabel(null); }} style={{ padding: '6px 12px', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>Save</button>
                          <button onClick={() => setEditingLabel(null)} style={{ padding: '6px 12px', backgroundColor: '#dc2626', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>Cancel</button>
                        </div>
                      ) : (
                        <>
                          <label onDoubleClick={() => { setEditingLabel(field.key); setEditValue(labels[field.key]); }} style={{ fontSize: '12px', fontWeight: '600', cursor: 'pointer', color: isHidden ? '#d1d5db' : '#111827' }}>{labels[field.key]}</label>
                          {!isHidden && (
                            <div style={{ display: 'flex', gap: '4px', opacity: hoverField === field.key ? 1 : 0, transition: 'opacity 0.2s' }}>
                              <button onClick={() => handleCopyField(field.key)} disabled={!inputs[field.key]} style={{ padding: '4px 4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} title="Copy">{copiedField === field.key ? <Check size={14} color="#059669" /> : <Copy size={14} />}</button>
                              <button onClick={() => handleHideField(field.key)} style={{ padding: '4px 4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} title="Hide"><EyeOff size={14} /></button>
                              <button onClick={() => handleDeleteField(field.key)} style={{ padding: '4px 4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} title="Delete"><Trash2 size={14} color="#dc2626" /></button>
                            </div>
                          )}
                          {isHidden && (
                            <button onClick={() => handleShowField(field.key)} style={{ padding: '4px 4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}><Eye size={14} /></button>
                          )}
                        </>
                      )}
                    </div>
                    <textarea disabled={isHidden} value={inputs[field.key]} onChange={(e) => { handleInputChange(field.key, e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 300) + 'px'; }} placeholder={field.placeholder} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px', fontFamily: 'system-ui', resize: 'none', backgroundColor: colors[field.key], opacity: isHidden ? 0.5 : 1, cursor: isHidden ? 'not-allowed' : 'auto', minHeight: '40px', maxHeight: '300px', overflow: 'hidden', boxSizing: 'border-box' }} rows="1" />
                  </div>
                );
              })}
            </div>
            <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
              <button onClick={handleSavePrompt} style={{ width: '100%', padding: '10px 16px', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Save</button>
            </div>
          </div>

          <div style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', background: 'linear-gradient(to right, #faf5ff, #fce7f3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', margin: 0 }}>Output</h2>
              <button onClick={handleCopyOutput} style={{ padding: '6px 12px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>
                {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {generateColoredPrompt().length === 0 ? (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backgroundColor: '#dbeafe', border: '1px solid #7dd3fc', borderRadius: '8px', fontSize: '12px', color: '#0369a1' }}>Your prompt will appear here...</div>
              ) : (
                generateColoredPrompt().map((section, idx) => {
                  const isEditing = editingOutputField === section.key;
                  return (
                    <div key={idx} onClick={() => handleEditOutput(section.key, section.text)} style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', backgroundColor: colors[section.key], border: isEditing ? '2px solid #2563eb' : '1px solid transparent', fontSize: '12px' }}>
                      {isEditing ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <textarea value={editingOutputValue} onChange={(e) => setEditingOutputValue(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #2563eb', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace', minHeight: '100px', boxSizing: 'border-box' }} autoFocus />
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={(e) => { e.stopPropagation(); handleSaveOutputEdit(section.key); }} style={{ flex: 1, padding: '6px 12px', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>Save</button>
                            <button onClick={(e) => { e.stopPropagation(); setEditingOutputField(null); }} style={{ flex: 1, padding: '6px 12px', backgroundColor: '#dc2626', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <p style={{ margin: 0, fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#1f2937' }}>{section.text}</p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`https://chatgpt.com/?q=${encodeURIComponent(generatePrompt())}`} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', backgroundColor: '#16a34a', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '11px', textDecoration: 'none', cursor: 'pointer' }}>ChatGPT</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(generatePrompt())}`} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', backgroundColor: '#3b82f6', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '11px', textDecoration: 'none', cursor: 'pointer' }}>Gemini</a>
              <a href={`https://claude.ai/?q=${encodeURIComponent(generatePrompt())}`} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', backgroundColor: '#9333ea', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '11px', textDecoration: 'none', cursor: 'pointer' }}>Claude</a>
              <a href={`https://grok.x.com/?q=${encodeURIComponent(generatePrompt())}`} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', backgroundColor: '#000000', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '11px', textDecoration: 'none', cursor: 'pointer' }}>Grok</a>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', border: '1px solid #e5e7eb', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', zIndex: 50, maxWidth: '400px' }}>
          <span style={{ fontSize: '12px', fontWeight: '500', color: '#111827' }}>{labels[toast]} deleted</span>
          <button onClick={() => { handleRestoreField(toast); setToast(null); }} style={{ padding: '6px 12px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: '600', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Restore</button>
          <button onClick={() => setToast(null)} style={{ padding: 0, backgroundColor: 'transparent', color: '#6b7280', border: 'none', cursor: 'pointer', fontSize: '18px' }}>X</button>
        </div>
      )}
    </div>
  );
}