import type { AnalysisResult, Timeline } from './types';

export function analyzeIncident(description: string): AnalysisResult {
  const lowerDesc = description.toLowerCase();
  
  // Extraer timeline basado en patrones de tiempo
  const timeline = extractTimeline(description);
  
  // Identificar hechos concretos
  const facts = extractFacts(description, lowerDesc);
  
  // Generar hipótesis basadas en palabras clave
  const hypotheses = generateHypotheses(lowerDesc);
  
  // Determinar severidad
  const severity = calculateSeverity(lowerDesc);
  
  // Extraer duración si está presente
  const duration = extractDuration(description);
  
  // Identificar evidencia faltante
  const missingEvidence = identifyMissingEvidence(lowerDesc);
  
  // Determinar impacto potencial
  const potentialImpact = assessPotentialImpact(lowerDesc);
  
  // Generar acciones correctivas
  const correctiveActions = generateCorrectiveActions(lowerDesc);
  
  // Generar acciones preventivas
  const preventiveActions = generatePreventiveActions(lowerDesc);
  
  // Generar resumen
  const summary = generateSummary(description, facts, timeline);
  
  return {
    summary,
    severity,
    duration,
    timeline,
    facts,
    hypotheses,
    missingEvidence,
    potentialImpact,
    correctiveActions,
    preventiveActions
  };
}

function extractTimeline(description: string): Timeline[] {
  const timeline: Timeline[] = [];
  
  // Buscar patrones de tiempo
  const timePatterns = [
    /(?:a las|desde las|hasta las|a)\s+(\d{1,2}:\d{2})/gi,
    /(?:día|fecha)\s+(\d{1,2}\s+de\s+\w+\s+de\s+\d{4})/gi,
    /(?:durante|por)\s+(\d+\s+(?:minutos?|horas?|días?))/gi
  ];
  
  const sentences = description.split(/\.\s+/);
  
  sentences.forEach(sentence => {
    timePatterns.forEach(pattern => {
      const matches = sentence.match(pattern);
      if (matches) {
        timeline.push({
          timestamp: matches[0],
          event: sentence.trim()
        });
      }
    });
  });
  
  // Si no se encontraron eventos con tiempo, extraer eventos clave sin tiempo
  if (timeline.length === 0) {
    const keyPhrases = [
      'detectó', 'identificó', 'reportó', 'falló', 'reinició', 
      'se agregó', 'se desplegó', 'se revirtió', 'comenzó', 'finalizó'
    ];
    
    sentences.forEach(sentence => {
      const hasKeyPhrase = keyPhrases.some(phrase => 
        sentence.toLowerCase().includes(phrase)
      );
      
      if (hasKeyPhrase && sentence.length > 20) {
        timeline.push({
          timestamp: 'Tiempo no especificado',
          event: sentence.trim()
        });
      }
    });
  }
  
  return timeline.slice(0, 10); // Limitar a 10 eventos
}

function extractFacts(description: string, lowerDesc: string): string[] {
  const facts: string[] = [];
  
  // Hechos sobre errores
  if (lowerDesc.includes('error') || lowerDesc.includes('falló') || lowerDesc.includes('fallo')) {
    facts.push('Se registraron errores en el sistema');
  }
  
  // Hechos sobre tiempo de caída
  const downtimeMatch = description.match(/(\d+)\s*(minutos?|horas?|días?)/i);
  if (downtimeMatch) {
    facts.push(`Duración del incidente: ${downtimeMatch[0]}`);
  }
  
  // Hechos sobre impacto a usuarios
  if (lowerDesc.includes('usuario') || lowerDesc.includes('cliente')) {
    facts.push('El incidente afectó a usuarios o clientes');
  }
  
  // Hechos sobre servicios
  if (lowerDesc.includes('servicio') || lowerDesc.includes('api') || lowerDesc.includes('aplicación')) {
    facts.push('Involucra componentes de servicio o API');
  }
  
  // Hechos sobre bases de datos
  if (lowerDesc.includes('base de datos') || lowerDesc.includes('database') || lowerDesc.includes('sql')) {
    facts.push('La base de datos estuvo involucrada en el incidente');
  }
  
  // Hechos sobre monitoreo
  if (lowerDesc.includes('monitoreo') || lowerDesc.includes('detectó') || lowerDesc.includes('alerta')) {
    facts.push('El sistema de monitoreo detectó anomalías');
  }
  
  // Hechos sobre acciones tomadas
  if (lowerDesc.includes('reinició') || lowerDesc.includes('reiniciar')) {
    facts.push('Se realizó reinicio de servicios');
  }
  
  if (lowerDesc.includes('revirtió') || lowerDesc.includes('revertir') || lowerDesc.includes('rollback')) {
    facts.push('Se revirtieron cambios como parte de la mitigación');
  }
  
  if (lowerDesc.includes('parche') || lowerDesc.includes('patch') || lowerDesc.includes('hotfix')) {
    facts.push('Se desplegó un parche o corrección urgente');
  }
  
  // Hechos sobre seguridad
  if (lowerDesc.includes('seguridad') || lowerDesc.includes('exposición') || lowerDesc.includes('vulnerabilidad')) {
    facts.push('El incidente tiene implicaciones de seguridad');
  }
  
  return facts.length > 0 ? facts : ['Se requiere más información para identificar hechos concretos'];
}

function generateHypotheses(lowerDesc: string): string[] {
  const hypotheses: string[] = [];
  
  // Hipótesis sobre causas de performance
  if (lowerDesc.includes('lent') || lowerDesc.includes('rendimiento') || lowerDesc.includes('performance')) {
    hypotheses.push('Posible causa: Degradación de rendimiento por carga excesiva o consultas ineficientes');
  }
  
  // Hipótesis sobre recursos
  if (lowerDesc.includes('cpu') || lowerDesc.includes('memoria') || lowerDesc.includes('disco')) {
    hypotheses.push('Posible causa: Agotamiento de recursos del sistema');
  }
  
  // Hipótesis sobre configuración
  if (lowerDesc.includes('configuración') || lowerDesc.includes('config')) {
    hypotheses.push('Posible causa: Error en configuración o cambio de configuración inadecuado');
  }
  
  // Hipótesis sobre código
  if (lowerDesc.includes('bug') || lowerDesc.includes('código') || lowerDesc.includes('función')) {
    hypotheses.push('Posible causa: Defecto en el código o lógica de negocio');
  }
  
  // Hipótesis sobre despliegue
  if (lowerDesc.includes('despliegue') || lowerDesc.includes('deploy') || lowerDesc.includes('release')) {
    hypotheses.push('Posible causa: Problema introducido en despliegue reciente');
  }
  
  // Hipótesis sobre dependencias
  if (lowerDesc.includes('servicio externo') || lowerDesc.includes('terceros') || lowerDesc.includes('integración')) {
    hypotheses.push('Posible causa: Fallo o degradación en servicios de terceros');
  }
  
  // Hipótesis sobre base de datos
  if (lowerDesc.includes('sql') || lowerDesc.includes('query') || lowerDesc.includes('consulta')) {
    hypotheses.push('Posible causa: Consultas de base de datos no optimizadas o falta de índices');
  }
  
  // Hipótesis sobre caché
  if (lowerDesc.includes('caché') || lowerDesc.includes('cache')) {
    hypotheses.push('Posible causa: Problema con el sistema de caché o invalidación incorrecta');
  }
  
  // Hipótesis sobre seguridad
  if (lowerDesc.includes('log') && (lowerDesc.includes('sensible') || lowerDesc.includes('exposición'))) {
    hypotheses.push('Posible causa: Falta de sanitización en logging de datos sensibles');
  }
  
  return hypotheses.length > 0 ? hypotheses : ['Se requiere más información técnica para generar hipótesis fundamentadas'];
}

function calculateSeverity(lowerDesc: string): 'CRÍTICA' | 'ALTA' | 'MEDIA' | 'BAJA' {
  let severityScore = 0;
  
  // Factores críticos
  if (lowerDesc.includes('datos sensibles') || lowerDesc.includes('exposición') || lowerDesc.includes('seguridad')) {
    severityScore += 3;
  }
  
  if (lowerDesc.includes('caída') || lowerDesc.includes('indisponible') || lowerDesc.includes('down')) {
    severityScore += 3;
  }
  
  // Factores altos
  if (lowerDesc.includes('usuario') || lowerDesc.includes('cliente') || lowerDesc.includes('producción')) {
    severityScore += 2;
  }
  
  if (lowerDesc.includes('pérdida') || lowerDesc.includes('error 500') || lowerDesc.includes('falló')) {
    severityScore += 2;
  }
  
  // Factores medios
  if (lowerDesc.includes('lentitud') || lowerDesc.includes('degradación') || lowerDesc.includes('rendimiento')) {
    severityScore += 1;
  }
  
  // Evaluar duración
  const durationMatch = lowerDesc.match(/(\d+)\s*(hora|horas|día|días)/);
  if (durationMatch) {
    severityScore += 2;
  }
  
  if (severityScore >= 5) return 'CRÍTICA';
  if (severityScore >= 3) return 'ALTA';
  if (severityScore >= 1) return 'MEDIA';
  return 'BAJA';
}

function extractDuration(description: string): string | null {
  const patterns = [
    /(\d+)\s*(minutos?|horas?|días?)/i,
    /durante\s+(\d+\s*(?:minutos?|horas?|días?))/i,
    /por\s+(\d+\s*(?:minutos?|horas?|días?))/i
  ];
  
  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match) {
      return match[0];
    }
  }
  
  return null;
}

function identifyMissingEvidence(lowerDesc: string): string[] {
  const missing: string[] = [];
  
  // Siempre es útil tener estas evidencias
  if (!lowerDesc.includes('log') && !lowerDesc.includes('registro')) {
    missing.push('Logs del sistema durante el periodo del incidente');
  }
  
  if (!lowerDesc.includes('métrica') && !lowerDesc.includes('monitoreo')) {
    missing.push('Métricas de rendimiento (CPU, memoria, red) durante el incidente');
  }
  
  if (!lowerDesc.includes('usuario') && !lowerDesc.includes('reporte')) {
    missing.push('Reportes específicos de usuarios afectados');
  }
  
  if (lowerDesc.includes('base de datos') && !lowerDesc.includes('query') && !lowerDesc.includes('consulta')) {
    missing.push('Query logs de la base de datos');
  }
  
  if (!lowerDesc.includes('versión') && !lowerDesc.includes('despliegue')) {
    missing.push('Historial de despliegues recientes');
  }
  
  if (lowerDesc.includes('api') || lowerDesc.includes('servicio')) {
    missing.push('Traces distribuidos o logs de peticiones API');
  }
  
  if (!lowerDesc.includes('causa raíz')) {
    missing.push('Análisis de causa raíz completo');
  }
  
  return missing.slice(0, 6);
}

function assessPotentialImpact(lowerDesc: string): string[] {
  const impacts: string[] = [];
  
  if (lowerDesc.includes('usuario') || lowerDesc.includes('cliente')) {
    impacts.push('Experiencia de usuario degradada');
    impacts.push('Posible pérdida de confianza del cliente');
  }
  
  if (lowerDesc.includes('pago') || lowerDesc.includes('transacción') || lowerDesc.includes('venta')) {
    impacts.push('Pérdida de ingresos durante el periodo de incidencia');
    impacts.push('Transacciones fallidas que requieren reconciliación');
  }
  
  if (lowerDesc.includes('datos') || lowerDesc.includes('exposición') || lowerDesc.includes('seguridad')) {
    impacts.push('Riesgo de exposición de datos sensibles');
    impacts.push('Posibles implicaciones regulatorias o de cumplimiento');
  }
  
  if (lowerDesc.includes('sla') || lowerDesc.includes('disponibilidad')) {
    impacts.push('Incumplimiento de SLA con clientes');
  }
  
  if (lowerDesc.includes('reputación') || lowerDesc.includes('público')) {
    impacts.push('Impacto en la reputación de la marca');
  }
  
  if (impacts.length === 0) {
    impacts.push('Interrupciones operativas');
    impacts.push('Tiempo de ingeniería dedicado a mitigación');
  }
  
  return impacts.slice(0, 5);
}

function generateCorrectiveActions(lowerDesc: string): string[] {
  const actions: string[] = [];
  
  if (lowerDesc.includes('reinició') || lowerDesc.includes('reiniciar')) {
    actions.push('✓ Se realizó reinicio de servicios afectados');
  }
  
  if (lowerDesc.includes('parche') || lowerDesc.includes('corrección')) {
    actions.push('✓ Se desplegó parche correctivo');
  }
  
  if (lowerDesc.includes('revirtió') || lowerDesc.includes('rollback')) {
    actions.push('✓ Se revirtieron cambios problemáticos');
  }
  
  if (lowerDesc.includes('índice') || lowerDesc.includes('optimiz')) {
    actions.push('✓ Se optimizaron consultas o se agregaron índices');
  }
  
  if (lowerDesc.includes('configuración')) {
    actions.push('✓ Se corrigió la configuración problemática');
  }
  
  // Acciones recomendadas genéricas
  if (actions.length === 0) {
    actions.push('Identificar y aplicar solución inmediata para restaurar servicio');
    actions.push('Documentar todos los pasos de mitigación');
  } else {
    actions.push('Validar que el servicio está completamente restaurado');
    actions.push('Monitorear indicadores clave post-incidente');
  }
  
  return actions;
}

function generatePreventiveActions(lowerDesc: string): string[] {
  const actions: string[] = [];
  
  if (lowerDesc.includes('monitoreo') || lowerDesc.includes('alerta')) {
    actions.push('Revisar y mejorar alertas de monitoreo para detección temprana');
  }
  
  if (lowerDesc.includes('test') || lowerDesc.includes('prueba')) {
    actions.push('Ampliar cobertura de pruebas automatizadas');
  }
  
  if (lowerDesc.includes('despliegue') || lowerDesc.includes('deploy')) {
    actions.push('Implementar revisión de cambios pre-despliegue más rigurosa');
    actions.push('Mejorar proceso de rollback automatizado');
  }
  
  if (lowerDesc.includes('base de datos') || lowerDesc.includes('sql')) {
    actions.push('Implementar revisión de performance de queries en desarrollo');
    actions.push('Establecer límites de recursos para queries');
  }
  
  if (lowerDesc.includes('seguridad') || lowerDesc.includes('log')) {
    actions.push('Implementar análisis estático de código para detectar logging de datos sensibles');
    actions.push('Capacitar equipo en mejores prácticas de seguridad');
  }
  
  if (lowerDesc.includes('caché') || lowerDesc.includes('cache')) {
    actions.push('Documentar y validar cambios en configuración de caché');
  }
  
  if (lowerDesc.includes('recurso') || lowerDesc.includes('cpu') || lowerDesc.includes('memoria')) {
    actions.push('Implementar auto-scaling o alertas tempranas de recursos');
  }
  
  // Acciones preventivas genéricas
  actions.push('Realizar sesión de postmortem con equipo involucrado');
  actions.push('Actualizar runbooks y documentación operativa');
  
  return actions.slice(0, 6);
}

function generateSummary(description: string, facts: string[], timeline: Timeline[]): string {
  const sentences = description.split(/\.\s+/);
  const firstSentence = sentences[0] || description.substring(0, 150);
  
  let summary = firstSentence;
  
  if (timeline.length > 0) {
    summary += `. Se identificaron ${timeline.length} eventos en la cronología del incidente`;
  }
  
  if (facts.length > 1) {
    summary += `. Se documentaron ${facts.length} hechos concretos`;
  }
  
  return summary + '.';
}
