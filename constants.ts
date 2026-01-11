import { GraphData, NodeType } from './types';

export const INITIAL_GRAPH_DATA: GraphData = {
  nodes: [
    // Agents (Characters)
    { id: 'Meta-Orchestrator', type: NodeType.CHARACTER, description: 'The central executive agent responsible for task decomposition and agent dispatch.' },
    { id: 'Neural Pattern Matcher', type: NodeType.CHARACTER, description: 'Deep learning model specialized in unstructured data perception and intuition.' },
    { id: 'Symbolic Reasoner', type: NodeType.CHARACTER, description: 'Logic-based engine handling formal verification, arithmetic, and rule adherence.' },
    { id: 'Critic Agent', type: NodeType.CHARACTER, description: 'Evaluates outputs for safety, alignment, and hallucination reduction.' },

    // Layers/Spaces (Locations)
    { id: 'Global Workspace', type: NodeType.LOCATION, description: 'Shared memory space where agents publish intermediate results and subscribe to goals.' },
    { id: 'Latent Space', type: NodeType.LOCATION, description: 'High-dimensional vector space representing continuous embeddings of concepts.' },
    { id: 'Symbolic Plane', type: NodeType.LOCATION, description: 'Discrete graph structure representing entities, relations, and logic rules.' },
    { id: 'Interaction Boundary', type: NodeType.LOCATION, description: 'The interface between the autonomous system and human collaborators.' },

    // Data Structures (Items)
    { id: 'Knowledge Graph', type: NodeType.ITEM, description: 'Structured repository of explicit facts and relationships.' },
    { id: 'Vector Embeddings', type: NodeType.ITEM, description: 'Numerical representations capturing semantic similarity.' },
    { id: 'Inference Trace', type: NodeType.ITEM, description: 'Step-by-step audit log of the reasoning path taken by the system.' },
    { id: 'Attention Map', type: NodeType.ITEM, description: 'Visualization of focus weights across input modalities.' },
    { id: 'Reward Signal', type: NodeType.ITEM, description: 'Feedback mechanism used to reinforce optimal collaboration strategies.' },

    // Concepts
    { id: 'Neuro-Symbolic Grounding', type: NodeType.CONCEPT, description: 'The process of anchoring abstract symbols to perceptual neural data.' },
    { id: 'Compositionality', type: NodeType.CONCEPT, description: 'The ability to understand and build complex ideas from simpler parts.' },
    { id: 'Active Inference', type: NodeType.CONCEPT, description: 'Minimizing surprise by acting upon the environment to verify predictions.' },
    { id: 'Semantic Alignment', type: NodeType.CONCEPT, description: 'Ensuring neural outputs match the intended symbolic meaning and safety constraints.' },
    { id: 'Federated Learning', type: NodeType.CONCEPT, description: 'Decentralized model training preserving privacy across agent nodes.' },
  ],
  links: [
    // Architecture
    { source: 'Meta-Orchestrator', target: 'Global Workspace', relationship: 'governs' },
    { source: 'Meta-Orchestrator', target: 'Critic Agent', relationship: 'invokes' },
    
    // Neural-Symbolic Bridge
    { source: 'Neural Pattern Matcher', target: 'Latent Space', relationship: 'operates_within' },
    { source: 'Symbolic Reasoner', target: 'Symbolic Plane', relationship: 'operates_within' },
    { source: 'Neuro-Symbolic Grounding', target: 'Latent Space', relationship: 'bridges' },
    { source: 'Neuro-Symbolic Grounding', target: 'Symbolic Plane', relationship: 'bridges' },

    // Data Flow
    { source: 'Symbolic Reasoner', target: 'Knowledge Graph', relationship: 'queries' },
    { source: 'Neural Pattern Matcher', target: 'Vector Embeddings', relationship: 'generates' },
    { source: 'Vector Embeddings', target: 'Knowledge Graph', relationship: 'mapped_to' },
    
    // Process
    { source: 'Critic Agent', target: 'Inference Trace', relationship: 'audits' },
    { source: 'Critic Agent', target: 'Reward Signal', relationship: 'issues' },
    { source: 'Neural Pattern Matcher', target: 'Attention Map', relationship: 'utilizes' },
    
    // Conceptual Links
    { source: 'Compositionality', target: 'Symbolic Reasoner', relationship: 'empowers' },
    { source: 'Active Inference', target: 'Meta-Orchestrator', relationship: 'guides' },
    { source: 'Semantic Alignment', target: 'Interaction Boundary', relationship: 'enforces' },
    { source: 'Federated Learning', target: 'Global Workspace', relationship: 'synchronizes' },
  ]
};

export const NODE_COLORS = {
  [NodeType.CHARACTER]: '#f472b6', // Pink-400 (Agents)
  [NodeType.LOCATION]: '#60a5fa',  // Blue-400 (Infrastructure)
  [NodeType.ITEM]: '#34d399',      // Emerald-400 (Data)
  [NodeType.CONCEPT]: '#a78bfa',   // Violet-400 (Concepts)
};
