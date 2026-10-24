import { useState } from 'react';
import './App.css';
import { sampleIncidents } from './sampleIncidents';
import { analyzeIncident } from './analysisEngine';
import type { AnalysisResult } from './types';

type TabType = 'technical' | 'executive';

function App() {
  const [description, setDescription] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('technical');
  const [copied, setCopied] = useState(false);

  const handleAnalyze = () => {
    if (description.trim()) {
      const result = analyzeIncident(description);
      setAnalysis(result);
    }
  };

  const handleLoadSample = (sampleDescription: string) => {
    setDescription(sampleDescription);
    setAnalysis(null);
  };

  const handleCopyReport = () => {
    if (!analysis) return;

    const report = generateTextReport(analysis);
    navigator.clipboard.writeText(report).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const generateTextReport = (result: AnalysisResult): string => {
    let report = '=== INFORME DE ANÁLISIS DE INCIDENTE ===\n\n';
    report += `SEVERIDAD: ${result.severity}\n\n`;
    
    if (result.duration) {
      report += `DURACIÓN: ${result.duration}\n\n`;
    }
    
    report += `RESUMEN:\n${result.summary}\n\n`;
    
    if (result.timeline.length > 0) {
      report += '--- CRONOLOGÍA ---\n';
      result.timeline.forEach(item => {
        report += `[${item.timestamp}] ${item.event}\n`;
      });
      report += '\n';
    }
    
    report += '--- HECHOS IDENTIFICADOS ---\n';
    result.facts.forEach(fact => {
      report += `• ${fact}\n`;
    });
    report += '\n';
    
    report += '--- HIPÓTESIS DE CAUSAS ---\n';
    result.hypotheses.forEach(hypothesis => {
      report += `• ${hypothesis}\n`;
    });
    report += '\n';
    
    report += '--- EVIDENCIA FALTANTE ---\n';
    result.missingEvidence.forEach(evidence => {
      report += `• ${evidence}\n`;
    });
    report += '\n';
    
    report += '--- IMPACTO POTENCIAL ---\n';
    result.potentialImpact.forEach(impact => {
      report += `• ${impact}\n`;
    });
    report += '\n';
    
    report += '--- ACCIONES CORRECTIVAS ---\n';
    result.correctiveActions.forEach(action => {
      report += `• ${action}\n`;
    });
    report += '\n';
    
    report += '--- ACCIONES PREVENTIVAS ---\n';
    result.preventiveActions.forEach(action => {
      report += `• ${action}\n`;
    });
    
    return report;
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">
            <span className="logo-icon">🔍</span>
            ¿Quién la embarró?
          </h1>
          <span className="subtitle">Centro de Investigación de Incidentes</span>
        </div>
      </header>

      <main className="container">
        <section className="input-section">
          <h2>
            <span className="section-icon">📝</span>
            Describir Incidente
          </h2>
          
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe el incidente tecnológico con el mayor detalle posible: qué sucedió, cuándo, síntomas observados, acciones tomadas..."
          />
          
          <div className="button-group">
            <button 
              className="btn btn-primary" 
              onClick={handleAnalyze}
              disabled={!description.trim()}
            >
              <span>🔬</span>
              Investigar Incidente
            </button>
            
            {description && (
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setDescription('');
                  setAnalysis(null);
                }}
              >
                <span>🗑️</span>
                Limpiar
              </button>
            )}
          </div>

          <div className="samples">
            <h3>📚 Incidentes de ejemplo</h3>
            <div className="sample-list">
              {sampleIncidents.map((incident, index) => (
                <div 
                  key={incident.id} 
                  className="sample-item"
                  onClick={() => handleLoadSample(incident.description)}
                >
                  <div className="sample-number">{index + 1}</div>
                  <div className="sample-content">
                    <div className="sample-title">{incident.title}</div>
                    <div className="sample-preview">
                      {incident.description.substring(0, 120)}...
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {analysis ? (
          <section className="analysis-section">
            <div className="analysis-header">
              <div className="analysis-title">
                <span>📊 Análisis del Incidente</span>
                <div className={`severity-badge severity-${analysis.severity}`}>
                  <span>⚠️</span>
                  Severidad: {analysis.severity}
                </div>
                <button 
                  className={`copy-button ${copied ? 'copied' : ''}`}
                  onClick={handleCopyReport}
                >
                  <span>{copied ? '✓' : '📋'}</span>
                  {copied ? 'Copiado' : 'Copiar Informe'}
                </button>
              </div>
            </div>

            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'technical' ? 'active' : ''}`}
                onClick={() => setActiveTab('technical')}
              >
                🔧 Informe Técnico
              </button>
              <button 
                className={`tab ${activeTab === 'executive' ? 'active' : ''}`}
                onClick={() => setActiveTab('executive')}
              >
                👔 Informe Ejecutivo
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'technical' ? (
                <TechnicalReport analysis={analysis} />
              ) : (
                <ExecutiveReport analysis={analysis} />
              )}
            </div>
          </section>
        ) : (
          <section className="analysis-section">
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>Sin análisis aún</h3>
              <p>Describe un incidente y presiona "Investigar Incidente" para comenzar</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function TechnicalReport({ analysis }: { analysis: AnalysisResult }) {
  return (
    <>
      <div className="info-grid">
        <div className="info-card">
          <h3>Severidad</h3>
          <p className={`severity-badge severity-${analysis.severity}`}>
            {analysis.severity}
          </p>
        </div>
        {analysis.duration && (
          <div className="info-card">
            <h3>Duración Detectada</h3>
            <p>{analysis.duration}</p>
          </div>
        )}
      </div>

      <div className="content-card">
        <h3>
          <span className="card-icon">📄</span>
          Resumen
        </h3>
        <p>{analysis.summary}</p>
      </div>

      {analysis.timeline.length > 0 && (
        <div className="content-card">
          <h3>
            <span className="card-icon">⏱️</span>
            Cronología de Acontecimientos
          </h3>
          <div className="timeline">
            {analysis.timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-time">{item.timestamp}</div>
                <div className="timeline-event">{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="content-card">
        <h3>
          <span className="card-icon">✅</span>
          Hechos Identificados
        </h3>
        <ul className="list">
          {analysis.facts.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </div>

      <div className="content-card">
        <h3>
          <span className="card-icon">💡</span>
          Hipótesis de Posibles Causas
        </h3>
        <ul className="list">
          {analysis.hypotheses.map((hypothesis, index) => (
            <li key={index}>{hypothesis}</li>
          ))}
        </ul>
      </div>

      <div className="content-card">
        <h3>
          <span className="card-icon">❓</span>
          Evidencia Faltante
        </h3>
        <ul className="list">
          {analysis.missingEvidence.map((evidence, index) => (
            <li key={index}>{evidence}</li>
          ))}
        </ul>
      </div>

      <div className="content-card">
        <h3>
          <span className="card-icon">🔧</span>
          Acciones Correctivas
        </h3>
        <ul className="list">
          {analysis.correctiveActions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>

      <div className="content-card">
        <h3>
          <span className="card-icon">🛡️</span>
          Acciones Preventivas Recomendadas
        </h3>
        <ul className="list">
          {analysis.preventiveActions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

function ExecutiveReport({ analysis }: { analysis: AnalysisResult }) {
  return (
    <>
      <div className="executive-summary">
        <h3>
          <span className="card-icon">📊</span>
          Resumen Ejecutivo
        </h3>
        <p>{analysis.summary}</p>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Nivel de Severidad</h3>
          <p className={`severity-badge severity-${analysis.severity}`}>
            {analysis.severity}
          </p>
        </div>
        {analysis.duration && (
          <div className="info-card">
            <h3>Tiempo de Afectación</h3>
            <p>{analysis.duration}</p>
          </div>
        )}
        <div className="info-card">
          <h3>Eventos Documentados</h3>
          <p>{analysis.timeline.length} eventos</p>
        </div>
      </div>

      <div className="content-card">
        <h3>
          <span className="card-icon">💼</span>
          Impacto en el Negocio
        </h3>
        <ul className="list">
          {analysis.potentialImpact.map((impact, index) => (
            <li key={index}>{impact}</li>
          ))}
        </ul>
      </div>

      <div className="content-card">
        <h3>
          <span className="card-icon">🎯</span>
          Causas Potenciales Identificadas
        </h3>
        <ul className="list">
          {analysis.hypotheses.map((hypothesis, index) => (
            <li key={index}>{hypothesis}</li>
          ))}
        </ul>
      </div>

      <div className="content-card">
        <h3>
          <span className="card-icon">✓</span>
          Acciones Realizadas
        </h3>
        <ul className="list">
          {analysis.correctiveActions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>

      <div className="content-card">
        <h3>
          <span className="card-icon">🚀</span>
          Recomendaciones para Prevenir Recurrencia
        </h3>
        <ul className="list">
          {analysis.preventiveActions.slice(0, 4).map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>

      <div className="content-card">
        <h3>
          <span className="card-icon">⚠️</span>
          Información Adicional Requerida
        </h3>
        <ul className="list">
          {analysis.missingEvidence.slice(0, 4).map((evidence, index) => (
            <li key={index}>{evidence}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
