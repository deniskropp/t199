import { GoogleGenAI } from "@google/genai";
import { GraphNode } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateLoreExpansion = async (
  node: GraphNode, 
  question: string, 
  contextNodes: string[]
): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment.";
  }

  try {
    const model = 'gemini-3-flash-preview';
    
    const prompt = `
      You are the "System Kernel" of a futuristic Neuro-Symbolic AI Framework.
      
      Current Focus Node: ${node.id} (${node.type}) - ${node.description}
      Network Context: This component operates alongside: ${contextNodes.join(', ')}.
      
      User Query: ${question}
      
      Task: Provide a highly technical, analytical, yet visionary explanation (max 150 words). 
      Discuss how this component contributes to "Meta-Orchestrated Collaboration."
      Use terminology like "high-dimensional manifold," "symbolic grounding," "recursive reasoning," and "entropy reduction."
      Maintain a sophisticated, academic, and slightly cybernetic tone.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "System latency detected. Re-calibrating inference engine.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Kernel connection severed. Check API configuration.";
  }
};
