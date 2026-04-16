export interface Remedy {
  icon: string;
  title: string;
  desc: string;
  type: string;
}

export interface DiseaseInfo {
  display_name: string;
  plant: string;
  is_healthy: boolean;
  severity: "none" | "low" | "medium" | "high" | "unknown";
  description: string;
  remedies: Remedy[];
}

export interface TopPrediction {
  label: string;
  confidence: number;
}

export interface PredictionResponse {
  success: boolean;
  class_name: string;
  confidence: number;
  disease_info: DiseaseInfo;
  top5: TopPrediction[];
  enhanced_image?: string;
}

export interface HealthResponse {
  status: string;
  model_loaded: boolean;
}

const API_BASE = "http://localhost:8000";

export async function checkServerHealth(): Promise<HealthResponse> {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error("Server returned an error");
    return await res.json();
  } catch (error) {
    throw new Error("Cannot connect to backend server");
  }
}

export async function predictImage(file: File, enhance: boolean = false): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("enhance", enhance.toString());

  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to process image");
  }

  return await res.json();
}
