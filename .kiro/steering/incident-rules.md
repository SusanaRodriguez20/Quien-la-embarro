---
inclusion: always
---

# Reglas de Análisis de Incidentes — ¿Quién la embarró?

## Principios Fundamentales

### Cultura Blameless (Sin Culpabilización)

- **El análisis de incidentes es SIEMPRE blameless:** Nunca culpar a personas específicas
- Los incidentes son oportunidades de aprendizaje y mejora de sistemas
- Enfocarse en problemas de proceso, diseño y sistemas, no en errores individuales
- Usar lenguaje neutral: "Se detectó que..." en lugar de "Fulano causó..."
- Los errores humanos son síntomas de problemas sistémicos que deben corregirse

### Rigor en la Evidencia

**Distinguir claramente tres categorías:**

1. **✅ HECHOS CONFIRMADOS:** Información con evidencia sólida
   - Logs con timestamps
   - Métricas observadas
   - Eventos documentados
   - Código verificado

2. **🔍 HIPÓTESIS:** Inferencias razonables pero no confirmadas
   - Causas probables basadas en síntomas
   - Correlaciones observadas
   - Deducciones lógicas sin evidencia directa
   - Siempre etiquetar como "HIPÓTESIS" o "PROBABLE"

3. **❓ DATOS DESCONOCIDOS:** Información faltante
   - Gaps en la cronología
   - Métricas no disponibles
   - Evidencias no recopiladas
   - Marcar explícitamente como "DESCONOCIDO" o "REQUIERE INVESTIGACIÓN"

### Prohibiciones Estrictas

**NO inventar:**
- ❌ Nombres de responsables o personas involucradas
- ❌ Timestamps o fechas que no fueron proporcionadas
- ❌ Métricas o números sin fuente
- ❌ Causas raíz sin evidencia que las respalde
- ❌ Detalles técnicos no verificados

**NO asumir:**
- ❌ Que una correlación es una causa confirmada
- ❌ Que "siempre se hace así" sin verificar
- ❌ Que los logs/métricas existen si no se mencionaron
- ❌ Que se siguió un proceso sin confirmación

### Correlación vs. Causalidad

- **Correlación:** Dos eventos ocurrieron cerca en el tiempo (A pasó, luego B pasó)
- **Causalidad:** Un evento causó al otro (A provocó B)
- **Regla:** Nunca afirmar causalidad sin evidencia que demuestre el mecanismo
- **Uso correcto:**
  - ✅ "El deploy y los errores ocurrieron en el mismo periodo (correlación)"
  - ✅ "Los logs muestran que la excepción X causó el error Y (causalidad confirmada)"
  - ❌ "El deploy causó los errores" (sin evidencia del mecanismo)

### Recomendaciones Concretas

**Toda acción recomendada debe ser:**
- **Específica:** No "mejorar testing" sino "agregar integration tests para módulo X"
- **Justificada:** Explicar por qué esa acción previene la recurrencia
- **Medible:** Incluir criterios de éxito cuando sea posible
- **Asignable:** Identificar rol/equipo responsable (sin nombres específicos)
- **Temporizada:** Incluir timeline estimado (inmediato, 1 semana, 1 mes, etc.)

**Ejemplo de recomendación bien formulada:**
```markdown
**Implementar Health Checks Post-Deployment**
- **Descripción:** Validación automática de 3 endpoints críticos después de cada deploy
- **Justificación:** Hubiera detectado los errores 500 en <1 minuto vs. 45 minutos actuales
- **Beneficio:** Reducir MTTR de 45min a ~2min mediante rollback automático
- **Responsable:** Equipo DevOps/SRE
- **Esfuerzo:** Medio (3-5 días)
- **Prioridad:** ALTA
```

## Contexto del Proyecto

### Stack Tecnológico

- **Frontend:** React + TypeScript + Vite
- **Sin backend:** Aplicación completamente frontend
- **Arquitectura:** SPA (Single Page Application)

### Restricciones del MVP

- **Preservar funcionalidad existente:** No eliminar features implementadas
- **Mantener diseño actual:** Respetar la UI/UX del MVP
- **No agregar backend:** Todas las soluciones deben ser frontend-only
- **Iteración incremental:** Mejorar sin reescribir desde cero

### Alcance del Análisis

Cuando se analicen incidentes de este proyecto:
- Considerar limitaciones de una arquitectura sin backend
- Las "acciones preventivas" deben ser viables en frontend (linting, tests, validaciones cliente, etc.)
- No proponer soluciones que requieran servidor/API a menos que el usuario lo solicite explícitamente

## Formato de Análisis Requerido

Todo análisis de incidente debe incluir estas secciones:

1. **Resumen Ejecutivo** (2-3 líneas)
2. **Cronología** (con marcadores ✅ 🔍 ❓)
3. **Impacto** (técnico y empresarial)
4. **Root Cause Analysis** (distinguiendo confirmado, hipótesis, desconocido)
5. **Diferenciación Hechos/Hipótesis/Desconocido** (sección explícita)
6. **Acciones Recomendadas** (correctivas inmediatas + preventivas largo plazo)
7. **Información Faltante** (qué se necesita investigar)
8. **Lecciones Aprendidas**

## Lenguaje y Tono

- **Objetivo y neutral:** Evitar juicios de valor
- **Técnico pero accesible:** Explicar conceptos cuando sea necesario
- **Constructivo:** Enfocado en mejora, no en crítica
- **Honesto sobre limitaciones:** Admitir cuando no se puede concluir
- **Estructurado:** Usar markdown, tablas, listas para claridad

## Validación Pre-Entrega

Antes de finalizar un análisis, verificar:

- [ ] ¿Se distinguen claramente hechos, hipótesis y desconocidos?
- [ ] ¿Se evita culpar a personas específicas?
- [ ] ¿Se admite explícitamente la información faltante?
- [ ] ¿Las causas propuestas tienen justificación razonable?
- [ ] ¿Las acciones son concretas, no vagas?
- [ ] ¿Se respetan las restricciones del proyecto (React/TS/Vite, sin backend)?
- [ ] ¿El documento es útil para prevenir futuros incidentes?

---

**Recordatorio:** Un buen postmortem no busca culpables, busca mejorar el sistema para que los errores sean más difíciles de cometer y más fáciles de detectar.
