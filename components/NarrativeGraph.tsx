import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { GraphData, GraphNode, GraphLink, NodeType } from '../types';
import { NODE_COLORS } from '../constants';

interface NarrativeGraphProps {
  data: GraphData;
  onNodeClick: (node: GraphNode) => void;
  selectedNodeId?: string;
}

const NarrativeGraph: React.FC<NarrativeGraphProps> = ({ data, onNodeClick, selectedNodeId }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        setDimensions({
          width: wrapperRef.current.clientWidth,
          height: wrapperRef.current.clientHeight
        });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize D3 Graph
  useEffect(() => {
    if (!svgRef.current || !data.nodes.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const { width, height } = dimensions;

    // Zoom behavior
    const g = svg.append("g");
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    svg.call(zoom);

    // Deep copy data to prevent D3 mutation issues in React strict mode
    const nodes: GraphNode[] = data.nodes.map(d => ({ ...d }));
    const links: GraphLink[] = data.links.map(d => ({ ...d }));

    // Simulation
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(30));

    // Render Links
    const link = g.append("g")
      .attr("stroke", "#4b5563") // gray-600
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5)
      .attr("marker-end", "url(#arrowhead)");

    // Arrowhead definition
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25) // Offset for node radius
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#6b7280");

    // Render Nodes
    const node = g.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<SVGGElement, GraphNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    // Node Circles
    node.append("circle")
      .attr("r", (d) => d.id === selectedNodeId ? 18 : 12)
      .attr("fill", (d) => NODE_COLORS[d.type])
      .attr("stroke", (d) => d.id === selectedNodeId ? "#fff" : "#1f2937")
      .attr("stroke-width", (d) => d.id === selectedNodeId ? 3 : 1.5)
      .attr("cursor", "pointer")
      .on("click", (event, d) => {
        event.stopPropagation();
        onNodeClick(d);
      });

    // Node Labels
    node.append("text")
      .text(d => d.id)
      .attr("x", 15)
      .attr("y", 4)
      .attr("fill", "#e5e7eb") // gray-200
      .attr("font-size", "10px")
      .attr("font-family", "sans-serif")
      .style("pointer-events", "none")
      .style("text-shadow", "1px 1px 2px #000");

    // Simulation Tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag Functions
    function dragstarted(event: any, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: GraphNode) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, dimensions, onNodeClick, selectedNodeId]);

  return (
    <div ref={wrapperRef} className="w-full h-full bg-slate-900 overflow-hidden relative border-r border-slate-700">
      <svg ref={svgRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 pointer-events-none">
        <h2 className="text-slate-400 text-sm font-mono tracking-wider">VISUALIZER_V1.0</h2>
        <p className="text-slate-600 text-xs">Force-Directed Layout</p>
      </div>
    </div>
  );
};

export default NarrativeGraph;
