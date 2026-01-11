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

// --- Dopamin Engine Types ---

export enum EventType {
  TASK_ASSIGNMENT = 'TASK_ASSIGNMENT',
  PROGRESS_UPDATE = 'PROGRESS_UPDATE',
  TASK_COMPLETION = 'TASK_COMPLETION',
  ERROR_REPORT = 'ERROR_REPORT',
  FEEDBACK = 'FEEDBACK',
  SOCIAL_SIGNAL = 'SOCIAL_SIGNAL', // Backchanneling, validation
  SYSTEM_DRIFT = 'SYSTEM_DRIFT',
}

export interface TriggerLog {
  id: string;
  timestamp: string; // ISO 8601
  agent_id: string;
  event_type: EventType;
  description: string;
  
  // Neurocognitive Metrics
  dopamine_delta: number; // Prediction Error (delta)
  intrinsic_score: number; // Quality/Novelty (0-1)
  social_tag: boolean; // Interactive Reciprocity
  
  // Context
  context_hash?: string;
}

export interface DopamineMetrics {
  dopaminDichte: number; // Integrated reward signal (D_t)
  engagementIndex: number; // Composite score
  coherence: number; // Shared mental model %
  resilience: number; // Error recovery rate
  flowZeit: number; // Time in "Flow Corridor" (minutes)
}

export interface AgentState {
  id: string;
  name: string;
  role: string;
  status: 'IDLE' | 'THINKING' | 'WORKING' | 'WAITING';
  currentTask?: string;
  lastMessage?: string;
}

export interface EngineState {
  metrics: DopamineMetrics;
  logs: TriggerLog[];
  agents: AgentState[];
  isFlowState: boolean; // Are we in the corridor?
}
