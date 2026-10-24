export interface Incident {
  id: string;
  title: string;
  description: string;
}

export interface Timeline {
  timestamp: string;
  event: string;
}

export interface AnalysisResult {
  summary: string;
  severity: 'CRÍTICA' | 'ALTA' | 'MEDIA' | 'BAJA';
  duration: string | null;
  timeline: Timeline[];
  facts: string[];
  hypotheses: string[];
  missingEvidence: string[];
  potentialImpact: string[];
  correctiveActions: string[];
  preventiveActions: string[];
}
