import { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export enum NodeType {
  CHARACTER = 'Character',
  LOCATION = 'Location',
  CONCEPT = 'Concept',
  ITEM = 'Item',
}

export interface GraphNode extends SimulationNodeDatum {
  id: string;
  type: NodeType;
  description: string;
  // d3 optional properties
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphLink extends SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  relationship: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
