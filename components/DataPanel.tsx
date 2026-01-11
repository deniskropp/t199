import React, { useState, useEffect } from 'react';
import { GraphNode, ChatMessage } from '../types';
import { NODE_COLORS } from '../constants';
import { generateLoreExpansion } from '../services/geminiService';
import { Send, Sparkles, X, Activity } from 'lucide-react';

interface DataPanelProps {
  selectedNode: GraphNode | null;
  onClose: () => void;
  allNodes: GraphNode[];
}

const DataPanel: React.FC<DataPanelProps> = ({ selectedNode, onClose, allNodes }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Reset chat when node changes
  useEffect(() => {
    if (selectedNode) {
      setMessages([
        { 
          role: 'model', 
          content: `System Kernel initialized. Analyzing component: ${selectedNode.id}. Awaiting query regarding architectural function.` 
        }
      ]);
    }
  }, [selectedNode]);

  const handleSend = async () => {
    if (!input.trim() || !selectedNode) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const context = allNodes.map(n => n.id);
    const lore = await generateLoreExpansion(selectedNode, input, context);

    setMessages(prev => [...prev, { role: 'model', content: lore }]);
    setIsLoading(false);
  };

  if (!selectedNode) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6 text-slate-500 flex-col gap-4">
        <Activity className="w-16 h-16 opacity-20 animate-pulse" />
        <p className="text-center font-mono">Select a component node to inspect architectural details.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-800 text-slate-100 font-sans border-l border-slate-700 shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        <div 
          className="inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 text-slate-900"
          style={{ backgroundColor: NODE_COLORS[selectedNode.type] }}
        >
          {selectedNode.type}
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
          {selectedNode.id}
        </h2>
        <p className="mt-2 text-slate-400 text-sm italic border-l-2 border-slate-600 pl-3">
          "{selectedNode.description}"
        </p>
      </div>

      {/* Chat / Lore Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-700 text-slate-200 border border-slate-600'
              }`}
            >
              {msg.role === 'model' && <Sparkles size={14} className="inline mr-2 text-emerald-400" />}
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 rounded-lg p-3 text-sm text-slate-400 animate-pulse flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-700 bg-slate-900">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Query system parameters..."
            className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-emerald-400 hover:text-emerald-300 disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-xs text-slate-600 mt-2 text-center">
          Powered by Gemini 3 Flash Preview. Analysis may contain stochastic elements.
        </p>
      </div>
    </div>
  );
};

export default DataPanel;
