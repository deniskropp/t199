# Phase 2: Task Decomposition and Agent Prompt Engineering

**Date**: 2026-01-11
**Status**: In Progress

---

## Task 2.0: Task-Agnostic Step (TAS) Decomposition

### Subtask 2.0.1 & 2.0.2: Extraction and Purification (GPTASe / puTASe)

**Objective**: Break down the implementation of the "Dopamin Engine" into discrete execution steps.

**Raw TAS List**:
1.  Define the `TriggerLog` schema in TypeScript (timestamp, agent_id, dopamine_delta, etc.).
2.  Create a `DopaminEngine` service class to manage state and metrics.
3.  Implement the `calculateDopaminDichte()` algorithm based on the integral formula.
4.  Implement `calculateEngagementIndex()` logic.
5.  Create a "Placebo Pipe" UI component (semantic loading indicators).
6.  Update `StatsDashboard` to visualize the new metrics.
7.  Integrate `NarrativeGraph` with the `DopaminEngine` state (nodes = agents/tasks).
8.  Create a simulation script to generate "fake" events and demonstrate the engine in action.
9.  Implement a "KickLang" parser stub for the "Cognitive Transport" layer.

### Subtask 2.0.3: Hierarchical Plan Structure (Director)

**Refined Execution Plan**:

#### **Module A: Core Logic (The Neuro-Symbolic Kernel)**
*   **TAS A.1**: Define Data Models (`types.ts`)
    *   `TriggerLog` interface.
    *   `AgentState` interface.
    *   `KickLangTriple` interface.
*   **TAS A.2**: Implement Engine Logic (`services/DopaminEngine.ts`)
    *   State management (Redux-like or React Context).
    *   Metric calculations (`DopaminDichte`, `EngagementIndex`).
    *   "Event Bus" for dispatching TriggerLogs.

#### **Module B: UI/UX (The Visual Cortex)**
*   **TAS B.1**: "Placebo Pipe" System (`components/PlaceboPipe.tsx`)
    *   Visual component for semantic updates (e.g., "Agents negotiating schema...").
    *   Animation and state transitions.
*   **TAS B.2**: Metrics Dashboard Update (`components/StatsDashboard.tsx`)
    *   Connect real-time engine data to the charts.
    *   Visualize the "Flow Corridor".
*   **TAS B.3**: Interactive Graph (`components/NarrativeGraph.tsx`)
    *   Ensure nodes reflect the current "Mental Model" of the engine.

#### **Module C: Simulation & Orchestration (The Director)**
*   **TAS C.1**: Simulation Scenarios (`simulation/scenarios.ts`)
    *   Define a sequence of events: Initialization -> Ideation (Low Lambda) -> Execution (High Lambda) -> Success.
*   **TAS C.2**: Main Integration (`App.tsx`)
    *   Wire the Engine, Simulation, and UI together.

---

## Task 2.1: Agent Prompt Engineering (Lyra)

### Subtask 2.1.1: Core System Prompts

**1. The Director (Orchestrator)**
> "You are the Director of the Orion Collective. Your goal is to maximize the `EngagementIndex` of the user. You constantly evaluate the system state. If `DopaminDichte` drops, you introduce 'Positive Surprise' (Task A.2). If trust wavers, you trigger 'Placebo Pipes' to show transparency. You think in steps, constantly refining the plan based on the 'Neuro-Symbolic' context."

**2. Aurora (Designer)**
> "You are Aurora, the Visual Cortex. Your goal is to translate abstract data into 'Visual Narratives'. You don't just make things pretty; you design for 'Cognitive Scaffolding'. Use color and motion to reduce cognitive load. Your UI components must provide 'Immediate Resonance' (SofortFeedback)."

**3. Kodax (Engineer)**
> "You are Kodax, the Builder. You respect the 'SPOFramework'. Your code is strictly typed, modular, and robust. You treat every function as a 'Tool' that can be registered in the Knowledge Graph. You prioritize the implementation of the 'TriggerLog' schema as the source of truth."

**4. The Ethicist (Safety)**
> "You are the Ethicist. You monitor the 'Volatility Injection'. Ensure that the 'Variable Ratio Reinforcement' supports the user's goals and does not exploit their dopamine loops for addiction. You validate that 'Placebo Pipes' remain truthful representations of background processes."

---
**Phase 2 Complete.**
**Next Steps**: Proceed to Phase 3 (Design & Implementation) based on the Hierarchical Plan.
