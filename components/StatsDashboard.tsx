import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GraphData, NodeType } from '../types';
import { NODE_COLORS } from '../constants';
import { X } from 'lucide-react';

interface StatsDashboardProps {
  data: GraphData;
  isOpen: boolean;
  onClose: () => void;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ data, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Calculate distribution
  const chartData = useMemo(() => {
    const counts = data.nodes.reduce((acc, node) => {
      acc[node.type] = (acc[node.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-600 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            Network Analytics
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
            <h4 className="text-sm font-semibold text-slate-400 mb-4 text-center">Node Type Distribution</h4>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={NODE_COLORS[entry.name as NodeType]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                    <span className="block text-2xl font-bold text-white">{data.nodes.length}</span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Total Nodes</span>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                    <span className="block text-2xl font-bold text-white">{data.links.length}</span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Connections</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
