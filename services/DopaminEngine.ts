import { TriggerLog, EngineState, EventType, DopamineMetrics, AgentState } from '../types';

/**
 * The Dopamin Engine: Neuro-Symbolic Core Service
 * Manages the calculation of DopaminDichte, EngagementIndex, and maintains the neuro-cognitive state.
 */
class DopaminEngineService {
  private state: EngineState;
  private listeners: ((state: EngineState) => void)[] = [];
  
  // Constants for Metric Calculation
  private readonly LAMBDA_IDEATION = 0.2;
  private readonly LAMBDA_EXECUTION = 0.8;
  private readonly FLOW_THRESHOLD_MIN = 0.4;
  private readonly FLOW_THRESHOLD_MAX = 0.8;
  private currentLambda = 0.5; // Starts balanced

  constructor() {
    this.state = {
      metrics: {
        dopaminDichte: 0.5, // Baseline
        engagementIndex: 0.5,
        coherence: 1.0,
        resilience: 1.0,
        flowZeit: 0,
      },
      logs: [],
      agents: [],
      isFlowState: true,
    };
  }

  public getState(): EngineState {
    return this.state;
  }

  public subscribe(listener: (state: EngineState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l(this.state));
  }

  /**
   * Core Loop: Processes a new interaction event.
   */
  public logEvent(log: Omit<TriggerLog, 'id' | 'timestamp'>): void {
    const newLog: TriggerLog = {
      ...log,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    this.state.logs.push(newLog);
    this.recalculateMetrics();
    this.notify();
  }

  /**
   * RV1.3 & RV3.2: Metric Calculation Logic
   */
  private recalculateMetrics() {
    const recentLogs = this.state.logs.slice(-20); // Window for calculation
    if (recentLogs.length === 0) return;

    // 1. Calculate DopaminDichte (D_t)
    // Integral approximation: Sum of weighted rewards over recent history
    let weightedSum = 0;
    recentLogs.forEach(log => {
      const extrinsic = log.dopamine_delta; // Prediction Error
      const intrinsic = log.intrinsic_score; // Novelty/Depth
      
      // Dynamic Lambda based on phase (simplified: purely balanced for now)
      const reward = (this.currentLambda * extrinsic) + ((1 - this.currentLambda) * intrinsic);
      weightedSum += reward;
    });

    // Normalize to 0-1 range roughly
    const d_t = Math.max(0, Math.min(1, 0.5 + (weightedSum / 20))); 

    // 2. EngagementIndex
    // EI = (Coherence * Resilience * D_t) / Drift
    // Simplified simulation logic:
    const errorCount = recentLogs.filter(l => l.event_type === EventType.ERROR_REPORT).length;
    const socialCount = recentLogs.filter(l => l.social_tag).length;
    
    const coherence = Math.max(0.1, 1.0 - (errorCount * 0.1));
    const resilience = Math.min(1.0, 0.5 + (socialCount * 0.05)); // Social bonds increase resilience
    const drift = 1.0; // Assume stable system for now

    const engagementIndex = (coherence * resilience * d_t) / drift;

    // 3. Flow State Check
    const isFlow = d_t >= this.FLOW_THRESHOLD_MIN && d_t <= this.FLOW_THRESHOLD_MAX;
    
    // Update FlowZeit
    if (isFlow) {
      // In a real app, we'd track time delta. Here we just increment counter
      this.state.metrics.flowZeit += 1; 
    }

    this.state.metrics = {
      dopaminDichte: d_t,
      engagementIndex,
      coherence,
      resilience,
      flowZeit: this.state.metrics.flowZeit
    };
    this.state.isFlowState = isFlow;
  }

  /**
   * Helper to register agents
   */
  public registerAgent(agent: AgentState) {
    if (!this.state.agents.find(a => a.id === agent.id)) {
      this.state.agents.push(agent);
      this.notify();
    }
  }

  public updateAgentStatus(id: string, status: AgentState['status'], task?: string) {
    const agent = this.state.agents.find(a => a.id === id);
    if (agent) {
      agent.status = status;
      if (task) agent.currentTask = task;
      this.notify();
    }
  }
}

export const dopaminEngine = new DopaminEngineService();
