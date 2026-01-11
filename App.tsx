import React, { useState } from 'react';
import NarrativeGraph from './components/NarrativeGraph';
import DataPanel from './components/DataPanel';
import StatsDashboard from './components/StatsDashboard';
import { INITIAL_GRAPH_DATA } from './constants';
import { GraphNode } from './types';
import { BarChart2, Share2, Info } from 'lucide-react';

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [showStats, setShowStats] = useState(false);

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col relative transition-all duration-300 ${selectedNode ? 'mr-[400px]' : ''} `}>
        
        {/* Navbar Overlay */}
        <header className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 shadow-lg">
            <Share2 className="text-emerald-500" size={20} />
            <div>
              <h1 className="text-sm font-bold text-white tracking-wider">NEURO-SYMBOLIC FRAMEWORK</h1>
              <p className="text-[10px] text-slate-400 font-mono">META-ORCHESTRATION_LAYER_V2</p>
            </div>
          </div>

          <div className="pointer-events-auto flex gap-2">
            <button 
              onClick={() => setShowStats(true)}
              className="bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md p-2 rounded-full border border-slate-700 text-slate-300 transition-all hover:text-white"
              title="View Statistics"
            >
              <BarChart2 size={20} />
            </button>
            <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-full border border-slate-700 text-slate-300 cursor-help" title="Drag nodes to rearrange. Click to inspect.">
              <Info size={20} />
            </div>
          </div>
        </header>

        {/* Visualization */}
        <div className="flex-1 h-full w-full">
            <NarrativeGraph 
              data={INITIAL_GRAPH_DATA} 
              onNodeClick={handleNodeClick} 
              selectedNodeId={selectedNode?.id}
            />
        </div>
      </div>

      {/* Side Panel (Fixed Position) */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[400px] shadow-2xl transition-transform duration-300 ease-in-out z-20 ${
          selectedNode ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <DataPanel 
          selectedNode={selectedNode} 
          onClose={() => setSelectedNode(null)} 
          allNodes={INITIAL_GRAPH_DATA.nodes}
        />
      </div>

      {/* Modals */}
      <StatsDashboard 
        data={INITIAL_GRAPH_DATA} 
        isOpen={showStats} 
        onClose={() => setShowStats(false)} 
      />

    </div>
  );
};

export default App;
