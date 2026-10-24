# Quick Spec: ¿Quién la embarró? — Incident Detective MVP

## Metadata
- **Estado:** Implementado ✅
- **Tipo:** MVP Funcional
- **Versión:** 1.0.0
- **Fecha:** Octubre 2026
- **Propósito:** Documentación del MVP existente

---

## 1. Problema que Resuelve

### Contexto
Los equipos de desarrollo y operaciones necesitan analizar incidentes tecnológicos de manera estructurada para identificar causas raíz, impacto y acciones preventivas. El proceso manual de análisis de postmortem es:
- Inconsistente en metodología
- Propenso a sesgos y búsqueda de culpables
- Carente de estructura clara para diferenciar hechos de hipótesis
- Lento para extraer cronologías y patrones

### Solución
Aplicación web que analiza descripciones de incidentes tecnológicos mediante un motor basado en reglas, generando automáticamente:
- Cronología estructurada de eventos
- Diferenciación clara entre hechos confirmados e hipótesis
- Identificación de evidencia faltante
- Evaluación de severidad e impacto
- Recomendaciones de acciones correctivas y preventivas
- Informes técnicos y ejecutivos listos para compartir

### Valor Diferencial
- **Análisis instantáneo:** Resultados en segundos, no horas
- **Cultura blameless:** Enfoque en sistemas, no personas
- **Metodología consistente:** Estructura repetible para todos los incidentes
- **Sin infraestructura:** Funciona completamente en el navegador
- **Portabilidad:** Exporta informes con un clic

---

## 2. Usuarios Objetivo

### Primarios
- **SRE (Site Reliability Engineers):** Analizan interrupciones de servicio y degradaciones de performance
- **DevOps Engineers:** Investigan problemas en despliegues y configuraciones
- **Desarrolladores Senior:** Documentan bugs críticos y root cause analysis
- **Tech Leads:** Coordinan respuesta a incidentes y generan postmortems

### Secundarios
- **Product Managers:** Necesitan informes ejecutivos sobre impacto en negocio
- **CTOs/VPs de Engineering:** Revisan tendencias y aprueban acciones preventivas
- **Security Engineers:** Analizan brechas e incidentes de seguridad
- **Support Engineers:** Documentan incidentes reportados por clientes

---

## 3. Requisitos Funcionales Existentes

### RF-01: Descripción de Incidente
**Estado:** ✅ Implementado

El usuario puede describir un incidente tecnológico mediante:
- Área de texto amplia (textarea) con placeholder instructivo
- Entrada libre de texto sin restricciones de formato
- Límite implícito razonable para procesamiento en navegador

**Ubicación:** `src/App.tsx` — componente principal con `<textarea>`

### RF-02: Análisis Automatizado
**Estado:** ✅ Implementado

El sistema analiza la descripción mediante un motor basado en reglas que:
- Extrae cronología de eventos a partir de patrones temporales
- Identifica hechos concretos mediante palabras clave
- Genera hipótesis de causas basadas en tecnologías mencionadas
- Calcula severidad mediante sistema de puntuación
- Detecta duración del incidente (minutos/horas/días)
- Identifica evidencia faltante común
- Evalúa impacto potencial en negocio
- Genera acciones correctivas y preventivas contextuales

**Ubicación:** `src/analysisEngine.ts` — 9 funciones especializadas

### RF-03: Incidentes de Ejemplo Precargados
**Estado:** ✅ Implementado (3 incidentes)

El usuario puede cargar ejemplos reales con un clic:
1. **Caída del servicio de pagos** — Error 500, SQL no optimizado, 15 minutos
2. **Exposición de datos en logs** — Seguridad, datos sensibles, logging inadecuado
3. **Degradación de rendimiento API** — Lentitud, configuración de caché, 4 horas

Cada ejemplo incluye:
- Título descriptivo
- Preview truncado (120 caracteres)
- Descripción completa con timestamps y detalles técnicos

**Ubicación:** `src/sampleIncidents.ts` — array tipado con 3 incidentes

### RF-04: Evaluación de Severidad
**Estado:** ✅ Implementado

El sistema clasifica automáticamente la severidad en 4 niveles:
- **CRÍTICA:** ≥5 puntos (exposición de datos, caída total, seguridad)
- **ALTA:** 3-4 puntos (afecta usuarios, errores 500, producción)
- **MEDIA:** 1-2 puntos (degradación, lentitud)
- **BAJA:** 0 puntos (otros casos)

Sistema de scoring con factores:
- Seguridad/exposición de datos: +3
- Caída/indisponibilidad: +3
- Usuarios/clientes afectados: +2
- Errores/pérdida de datos: +2
- Degradación/performance: +1
- Duración en horas/días: +2

**Ubicación:** `src/analysisEngine.ts` — función `calculateSeverity()`

### RF-05: Cronología de Eventos
**Estado:** ✅ Implementado

El sistema extrae automáticamente una timeline con:
- Timestamps explícitos (HH:MM, fechas completas, duraciones)
- Eventos asociados a cada timestamp
- Fallback a "Tiempo no especificado" si no hay timestamps
- Identificación de eventos clave (detectó, falló, reinició, desplegó)
- Límite de 10 eventos para mantener claridad

Representación visual:
- Línea vertical con marcadores
- Timestamp a la izquierda
- Descripción del evento a la derecha

**Ubicación:** 
- Motor: `src/analysisEngine.ts` — función `extractTimeline()`
- UI: `src/App.tsx` — componente `TechnicalReport` con clase `.timeline`

### RF-06: Diferenciación Hechos vs. Hipótesis
**Estado:** ✅ Implementado

El sistema separa claramente:

**Hechos Identificados:**
- Presencia de errores en el sistema
- Duración específica del incidente
- Afectación a usuarios/clientes
- Componentes involucrados (API, DB, servicios)
- Acciones tomadas (reinicio, rollback, parches)
- Implicaciones de seguridad

**Hipótesis de Causas:**
- Degradación de performance por carga
- Agotamiento de recursos
- Errores de configuración
- Defectos en código
- Problemas en despliegues
- Fallas en servicios externos
- Consultas SQL no optimizadas
- Problemas de caché

**Ubicación:** `src/analysisEngine.ts` — funciones `extractFacts()` y `generateHypotheses()`

### RF-07: Identificación de Evidencia Faltante
**Estado:** ✅ Implementado

El sistema identifica hasta 6 tipos de evidencia comúnmente faltante:
- Logs del sistema durante el incidente
- Métricas de rendimiento (CPU, memoria, red)
- Reportes específicos de usuarios afectados
- Query logs de base de datos
- Historial de despliegues recientes
- Traces distribuidos o logs de API
- Análisis de causa raíz completo

**Ubicación:** `src/analysisEngine.ts` — función `identifyMissingEvidence()`

### RF-08: Evaluación de Impacto
**Estado:** ✅ Implementado

El sistema evalúa impacto potencial en múltiples dimensiones:

**Impacto en Usuarios:**
- Experiencia degradada
- Pérdida de confianza del cliente

**Impacto Financiero:**
- Pérdida de ingresos
- Transacciones fallidas

**Impacto de Seguridad:**
- Riesgo de exposición de datos
- Implicaciones regulatorias

**Impacto Contractual:**
- Incumplimiento de SLA

**Impacto Reputacional:**
- Daño a la marca

**Ubicación:** `src/analysisEngine.ts` — función `assessPotentialImpact()`

### RF-09: Acciones Correctivas y Preventivas
**Estado:** ✅ Implementado

El sistema genera dos tipos de acciones:

**Acciones Correctivas (Ya Realizadas):**
- Reinicio de servicios
- Despliegue de parches
- Rollback de cambios
- Optimización de consultas
- Corrección de configuración
- Validación post-incidente
- Monitoreo continuo

**Acciones Preventivas (Recomendadas):**
- Mejora de alertas de monitoreo
- Ampliación de cobertura de tests
- Revisión rigurosa pre-despliegue
- Automatización de rollback
- Revisión de performance de queries
- Análisis estático de código
- Capacitación del equipo
- Sesión de postmortem
- Actualización de runbooks

**Ubicación:** `src/analysisEngine.ts` — funciones `generateCorrectiveActions()` y `generatePreventiveActions()`

### RF-10: Informe Técnico Completo
**Estado:** ✅ Implementado

Vista detallada para equipos técnicos que incluye:
- Badge de severidad con código de color
- Duración detectada del incidente
- Resumen ejecutivo
- Cronología completa con timeline visual
- Lista completa de hechos identificados
- Hipótesis de posibles causas
- Evidencia faltante para investigación
- Acciones correctivas realizadas
- Acciones preventivas recomendadas

Organización en cards con iconos temáticos:
- 📄 Resumen
- ⏱️ Cronología
- ✅ Hechos
- 💡 Hipótesis
- ❓ Evidencia Faltante
- 🔧 Acciones Correctivas
- 🛡️ Acciones Preventivas

**Ubicación:** `src/App.tsx` — componente `TechnicalReport`

### RF-11: Informe Ejecutivo Resumido
**Estado:** ✅ Implementado

Vista condensada para stakeholders no técnicos que incluye:
- Resumen ejecutivo
- Grid de métricas clave:
  - Nivel de severidad
  - Tiempo de afectación
  - Número de eventos documentados
- Impacto en el negocio (top 5)
- Causas potenciales identificadas
- Acciones realizadas
- Recomendaciones para prevenir recurrencia (top 4)
- Información adicional requerida (top 4)

Enfoque en lenguaje de negocio sobre técnico.

**Ubicación:** `src/App.tsx` — componente `ExecutiveReport`

### RF-12: Sistema de Tabs para Alternar Vistas
**Estado:** ✅ Implementado

Navegación entre informes mediante tabs:
- 🔧 **Informe Técnico:** Vista completa para equipos de ingeniería
- 👔 **Informe Ejecutivo:** Vista resumida para management

Comportamiento:
- Tab activo destacado visualmente
- Cambio instantáneo sin recarga
- Estado persistente durante la sesión
- Default: Informe Técnico

**Ubicación:** `src/App.tsx` — estado `activeTab` con tipo `'technical' | 'executive'`

### RF-13: Exportación de Informe (Copiar)
**Estado:** ✅ Implementado

Funcionalidad de copia al portapapeles:
- Botón "📋 Copiar Informe" en header del análisis
- Genera reporte en texto plano estructurado con:
  - Separadores ASCII (===, ---)
  - Severidad y duración
  - Todas las secciones del análisis
  - Formato legible para pegar en documentos, tickets, wikis
- Feedback visual: "✓ Copiado" durante 2 segundos
- Usa Clipboard API moderna (`navigator.clipboard.writeText`)

**Ubicación:** `src/App.tsx` — función `generateTextReport()` y handler `handleCopyReport()`

### RF-14: Limpiar Formulario
**Estado:** ✅ Implementado

Funcionalidad de reset:
- Botón "🗑️ Limpiar" visible solo cuando hay texto
- Limpia textarea y resultado del análisis
- Permite empezar análisis nuevo sin recargar página

**Ubicación:** `src/App.tsx` — botón condicional con handler inline

### RF-15: Estado Vacío (Empty State)
**Estado:** ✅ Implementado

Cuando no hay análisis:
- Icono 🔍 grande
- Mensaje: "Sin análisis aún"
- Instrucción clara: "Describe un incidente y presiona 'Investigar Incidente' para comenzar"
- Diseño centrado y atractivo

**Ubicación:** `src/App.tsx` — sección condicional cuando `analysis === null`

### RF-16: Validación de Entrada
**Estado:** ✅ Implementado

El botón "Investigar Incidente" solo se habilita cuando:
- El textarea tiene contenido
- El texto no es solo espacios en blanco (`trim()`)

**Ubicación:** `src/App.tsx` — prop `disabled={!description.trim()}`

---

## 4. Arquitectura Técnica

### Stack Tecnológico

**Frontend Framework:**
- **React 19.3.1** con Hooks modernos (`useState`)
- **TypeScript 6.0.3** para type safety completo
- **Vite 8.3.4** como build tool y dev server
- **CSS vanilla** sin frameworks (diseño custom)

**Herramientas de Desarrollo:**
- **oxlint 1.88.0** para linting rápido
- **@vitejs/plugin-react 6.1.2** para JSX/TSX
- **@types/*** para tipado de librerías

**Sin Dependencias de:**
- ❌ Backend / API / Servidor
- ❌ Base de datos
- ❌ Autenticación
- ❌ IA generativa o APIs externas
- ❌ State management externo (Redux, Zustand)
- ❌ CSS frameworks (Tailwind, Bootstrap)
- ❌ UI libraries (MUI, Ant Design)

### Estructura de Archivos

```
quien-la-embarro/
├── .kiro/
│   ├── hooks/
│   │   └── ts-validator.json          # Hook de validación TypeScript
│   ├── specs/
│   │   └── mvp-incident-detective.md  # Esta especificación
│   └── steering/
│       └── incident-rules.md          # Reglas de análisis blameless
├── src/
│   ├── types.ts                       # Interfaces TypeScript
│   ├── sampleIncidents.ts             # 3 incidentes precargados
│   ├── analysisEngine.ts              # Motor de análisis (9 funciones)
│   ├── App.tsx                        # Componente principal + sub-componentes
│   ├── App.css                        # Estilos del componente
│   ├── main.tsx                       # Entry point de React
│   ├── index.css                      # Estilos globales
│   └── assets/                        # Assets estáticos (logo, imágenes)
├── public/                            # Assets públicos
├── index.html                         # HTML raíz
├── package.json                       # Dependencias y scripts
├── vite.config.ts                     # Configuración de Vite
├── tsconfig.json                      # Configuración TypeScript raíz
├── tsconfig.app.json                  # Config TS para aplicación
├── tsconfig.node.json                 # Config TS para scripts Node
└── .oxlintrc.json                     # Configuración de oxlint
```

### Arquitectura de Componentes

**Componente Principal (`App`):**
- Maneja estado de la aplicación (descripción, análisis, tab activa)
- Orquesta flujo de análisis
- Renderiza header, input section, samples, y results

**Sub-componentes:**
- `TechnicalReport`: Informe técnico detallado
- `ExecutiveReport`: Informe ejecutivo resumido

**Separación de Concerns:**
- **UI/Presentación:** `App.tsx`, `App.css`, `index.css`
- **Lógica de Negocio:** `analysisEngine.ts`
- **Modelos de Datos:** `types.ts`
- **Datos de Ejemplo:** `sampleIncidents.ts`

### Flujo de Datos

```
Usuario describe incidente
    ↓
Estado: setDescription(value)
    ↓
Usuario presiona "Investigar"
    ↓
handleAnalyze() → analyzeIncident(description)
    ↓
Motor basado en reglas procesa texto:
  1. extractTimeline()
  2. extractFacts()
  3. generateHypotheses()
  4. calculateSeverity()
  5. extractDuration()
  6. identifyMissingEvidence()
  7. assessPotentialImpact()
  8. generateCorrectiveActions()
  9. generatePreventiveActions()
  10. generateSummary()
    ↓
Estado: setAnalysis(result)
    ↓
Re-render con resultado
    ↓
Usuario alterna entre tabs o copia informe
```

### Motor de Análisis (Rule-Based Engine)

**Enfoque:** Pattern matching y scoring sin IA

**Técnicas Utilizadas:**

1. **Extracción de Timeline:**
   - Regex para patrones temporales (HH:MM, fechas, duraciones)
   - Split de oraciones con búsqueda de verbos clave
   - Fallback a eventos sin timestamp si no hay tiempo

2. **Identificación de Hechos:**
   - Búsqueda de palabras clave (error, falló, usuario, servicio, etc.)
   - Extracción de duración mediante regex
   - Detección de acciones tomadas (reinició, revirtió, parche)

3. **Generación de Hipótesis:**
   - Mapping de palabras clave → hipótesis probables
   - Categorías: performance, recursos, config, código, deploy, terceros, DB, caché

4. **Scoring de Severidad:**
   - Sistema de puntos por factores detectados
   - Factores críticos (seguridad, caída): 3 puntos
   - Factores altos (usuarios, producción): 2 puntos
   - Factores medios (lentitud, degradación): 1 punto
   - Clasificación: ≥5=Crítica, 3-4=Alta, 1-2=Media, 0=Baja

5. **Identificación de Gaps:**
   - Lista estándar de evidencias comunes
   - Verificación de menciones en texto
   - Sugerencias contextuales (si menciona DB → sugiere query logs)

6. **Evaluación de Impacto:**
   - Detección de afectación a usuarios/pagos/datos/SLA
   - Categorización por tipo de impacto
   - Fallback a impactos genéricos

7. **Generación de Acciones:**
   - Detección de acciones ya tomadas (reactivas)
   - Sugerencias contextuales preventivas
   - Acciones genéricas (postmortem, runbooks)

**Ventajas del Enfoque:**
- ✅ Funciona sin conexión a internet
- ✅ Respuesta instantánea (<100ms)
- ✅ Determinista y reproducible
- ✅ Sin costos de API
- ✅ Sin datos enviados a terceros
- ✅ Personalizable vía código

**Limitaciones:**
- No entiende contexto semántico profundo
- Depende de palabras clave específicas
- No aprende de análisis previos
- Puede generar falsos positivos/negativos

---

## 5. Diseño Visual

### Paleta de Colores

**Fondo:**
- `#0a0e14` — Background principal (azul oscuro casi negro)
- `#1a1f2e` — Cards y contenedores
- `#252b3a` — Hover states

**Acentos:**
- `#ff6b6b` — Primario (rojo coral) para botones y badges críticos
- `#4ecdc4` — Secundario (turquesa) para badges altos
- `#ffe66d` — Terciario (amarillo) para badges medios
- `#95e1d3` — Cuaternario (verde agua) para badges bajos

**Texto:**
- `#e4e6eb` — Texto principal (gris muy claro)
- `#a8b2d1` — Texto secundario (gris azulado)
- `#ffffff` — Texto en botones y headers

**Bordes:**
- `#2d3748` — Bordes sutiles
- `#ff6b6b` — Bordes hover en samples

### Tipografía

**Familia:**
- Inter (variable font) desde Google Fonts
- Fallback: system-ui, sans-serif

**Tamaños:**
- Headers: 2rem a 1.25rem
- Body: 1rem
- Pequeño: 0.9rem

**Pesos:**
- Normal: 400
- Medium: 500
- Bold: 600-700

### Componentes de UI

**Botones:**
- Primary (rojo): Call to action principal
- Secondary (gris): Acción secundaria
- Copy button: Ícono + texto, animación en hover
- Disabled state: opacidad reducida, cursor not-allowed

**Cards:**
- Background `#1a1f2e`
- Border radius: 12px
- Padding: 1.5rem
- Box shadow sutil
- Hover: Elevación ligera

**Badges de Severidad:**
- CRÍTICA: Rojo (`#ff6b6b`)
- ALTA: Turquesa (`#4ecdc4`)
- MEDIA: Amarillo (`#ffe66d`)
- BAJA: Verde agua (`#95e1d3`)
- Padding: 0.5rem 1rem
- Border radius: 6px
- Font weight: 600

**Timeline:**
- Línea vertical izquierda (`#2d3748`)
- Círculos indicadores en eventos
- Timestamp a la izquierda (gris)
- Evento a la derecha (blanco)

**Tabs:**
- Background transparente cuando inactiva
- Background `#252b3a` cuando activa
- Border-bottom para indicador
- Transición suave

**Samples:**
- Card clicable con hover state
- Número en círculo a la izquierda
- Título en bold
- Preview truncado en gris
- Cursor pointer

### Responsive Design

**Breakpoints:**
- Desktop: >768px (grid de 2 columnas)
- Mobile: ≤768px (stack vertical)

**Adaptaciones Mobile:**
- Input section y analysis section apilados
- Tabs full-width
- Padding reducido
- Font sizes ajustados

---

## 6. Criterios de Aceptación Verificables

### CA-01: Análisis Básico Funcional
**GIVEN** un usuario visita la aplicación  
**WHEN** escribe una descripción de incidente y presiona "Investigar Incidente"  
**THEN** se muestra un análisis con severidad, hechos, hipótesis y acciones  
**Verificación:** ✅ Probar con texto libre, verificar resultado renderizado

### CA-02: Incidentes de Ejemplo Cargables
**GIVEN** un usuario ve la lista de 3 incidentes de ejemplo  
**WHEN** hace clic en cualquier ejemplo  
**THEN** el textarea se llena con la descripción completa del incidente  
**Verificación:** ✅ Click en cada sample, verificar textarea poblado

### CA-03: Severidad Calculada Correctamente
**GIVEN** una descripción con palabras "caída" y "datos sensibles"  
**WHEN** se analiza el incidente  
**THEN** la severidad es "CRÍTICA"  
**Verificación:** ✅ Analizar muestra #2 (exposición datos), verificar badge CRÍTICA

### CA-04: Cronología Extraída
**GIVEN** una descripción con "a las 14:32" y "a las 14:47"  
**WHEN** se analiza el incidente  
**THEN** la cronología muestra al menos 2 eventos con timestamps  
**Verificación:** ✅ Analizar muestra #1, verificar timeline con 5+ eventos

### CA-05: Diferenciación Hechos e Hipótesis
**GIVEN** cualquier descripción analizada  
**WHEN** se revisa el informe técnico  
**THEN** existe sección "Hechos Identificados" separada de "Hipótesis de Posibles Causas"  
**Verificación:** ✅ Verificar ambas secciones presentes con contenido distinto

### CA-06: Evidencia Faltante Identificada
**GIVEN** cualquier descripción analizada  
**WHEN** se revisa el informe  
**THEN** se muestra al menos 1 ítem en "Evidencia Faltante"  
**Verificación:** ✅ Verificar sección presente con sugerencias

### CA-07: Acciones Correctivas y Preventivas
**GIVEN** una descripción que menciona "se reinició el servicio"  
**WHEN** se analiza  
**THEN** "Acciones Correctivas" incluye "✓ Se realizó reinicio de servicios"  
**AND** "Acciones Preventivas" incluye al menos 3 sugerencias  
**Verificación:** ✅ Analizar muestra #1, verificar ambas secciones

### CA-08: Alternancia entre Informes
**GIVEN** un análisis completado  
**WHEN** el usuario hace clic en "Informe Ejecutivo"  
**THEN** se muestra vista resumida con impacto en negocio  
**WHEN** el usuario hace clic en "Informe Técnico"  
**THEN** se muestra vista completa detallada  
**Verificación:** ✅ Alternar tabs, verificar contenido diferente

### CA-09: Copia de Informe al Portapapeles
**GIVEN** un análisis completado  
**WHEN** el usuario hace clic en "Copiar Informe"  
**THEN** el portapapeles contiene texto estructurado con todas las secciones  
**AND** el botón muestra "✓ Copiado" durante 2 segundos  
**Verificación:** ✅ Click en copiar, pegar en editor, verificar formato

### CA-10: Validación de Entrada
**GIVEN** el textarea está vacío  
**THEN** el botón "Investigar Incidente" está deshabilitado  
**WHEN** el usuario escribe cualquier texto  
**THEN** el botón se habilita  
**Verificación:** ✅ Verificar estado disabled/enabled del botón

### CA-11: Limpieza de Formulario
**GIVEN** el textarea tiene contenido y hay un análisis mostrado  
**WHEN** el usuario hace clic en "Limpiar"  
**THEN** el textarea se vacía y el análisis desaparece  
**Verificación:** ✅ Limpiar formulario, verificar reset completo

### CA-12: Estado Vacío Inicial
**GIVEN** un usuario visita la aplicación por primera vez  
**THEN** ve el header, textarea vacío, 3 samples, y empty state "Sin análisis aún"  
**Verificación:** ✅ Cargar app en incógnito, verificar estado inicial

### CA-13: Responsive Mobile
**GIVEN** la aplicación abierta en viewport <768px  
**THEN** input section y analysis section se apilan verticalmente  
**AND** los tabs ocupan todo el ancho disponible  
**Verificación:** ✅ DevTools responsive mode 375px, verificar layout

### CA-14: TypeScript sin Errores
**GIVEN** el código del proyecto  
**WHEN** se ejecuta `npx tsc --noEmit`  
**THEN** no se reportan errores de TypeScript  
**Verificación:** ✅ Ejecutar comando, exit code 0

### CA-15: Build Exitoso
**GIVEN** el proyecto completo  
**WHEN** se ejecuta `npm run build`  
**THEN** se genera carpeta `dist/` con archivos compilados  
**AND** no hay errores de compilación  
**Verificación:** ✅ Ejecutar build, verificar dist/ poblado

---

## 7. Restricciones y Limitaciones

### Restricciones Técnicas
- **Solo frontend:** No existe backend, API, ni base de datos
- **Sin persistencia:** Los análisis no se guardan (session storage)
- **Sin autenticación:** Aplicación abierta sin login
- **Motor basado en reglas:** No usa IA/ML, limitado a pattern matching
- **Single-page:** No hay routing ni múltiples páginas

### Limitaciones Funcionales
- **Análisis en español:** Motor optimizado para descripciones en español
- **No editable:** Una vez generado, el análisis no se puede editar manualmente
- **No histórico:** No guarda análisis previos entre sesiones
- **No colaborativo:** Sin funcionalidad multi-usuario o comentarios
- **No integrado:** No se conecta con sistemas de tickets (Jira, PagerDuty, etc.)

### Limitaciones del Motor de Análisis
- **Dependiente de keywords:** Si el incidente usa vocabulario no estándar, puede fallar
- **Sin contexto profundo:** No entiende relaciones complejas entre sistemas
- **No aprende:** Mismo input siempre genera mismo output
- **Falsos positivos:** Puede sugerir hipótesis irrelevantes
- **Falsos negativos:** Puede no detectar hechos sutiles

### Decisiones de Alcance MVP
- ❌ Sin almacenamiento persistente
- ❌ Sin exportación a PDF/Word
- ❌ Sin gráficos o visualizaciones avanzadas
- ❌ Sin comparación de incidentes
- ❌ Sin análisis de tendencias
- ❌ Sin integración con Slack/Teams/Email
- ❌ Sin API pública
- ❌ Sin multi-idioma (solo español)

---

## 8. Dependencias y Configuración

### Instalación
```bash
cd quien-la-embarro
npm install
```

### Scripts Disponibles

**Desarrollo:**
```bash
npm run dev
# Inicia Vite dev server en http://localhost:5173
# Hot Module Replacement (HMR) habilitado
```

**Build Producción:**
```bash
npm run build
# Ejecuta: tsc -b && vite build
# Output: dist/
```

**Linting:**
```bash
npm run lint
# Ejecuta: oxlint
# Verifica código según .oxlintrc.json
```

**Preview:**
```bash
npm run preview
# Sirve build de producción localmente
```

**Validación TypeScript:**
```bash
npx tsc --noEmit
# Valida tipos sin generar archivos
# Usado por Agent Hook post-modificación
```

### Archivos de Configuración

**`tsconfig.json`** — TypeScript raíz (referencia a sub-configs)  
**`tsconfig.app.json`** — Config para código de aplicación  
**`tsconfig.node.json`** — Config para scripts Node (Vite)  
**`vite.config.ts`** — Configuración de Vite con plugin React  
**`.oxlintrc.json`** — Reglas de linting

### Variables de Entorno
Ninguna requerida (aplicación estática sin secrets)

---

## 9. Estado del Proyecto

### Completado ✅
- [x] Interfaz de usuario completa
- [x] Motor de análisis basado en reglas
- [x] 3 incidentes de ejemplo
- [x] Sistema de severidad
- [x] Extracción de cronología
- [x] Diferenciación hechos/hipótesis
- [x] Identificación de evidencia faltante
- [x] Evaluación de impacto
- [x] Generación de acciones
- [x] Informes técnico y ejecutivo
- [x] Sistema de tabs
- [x] Copia al portapapeles
- [x] Diseño responsive
- [x] Validación TypeScript
- [x] Linting configurado
- [x] Build optimizado
- [x] Steering rules (blameless)
- [x] Agent Hook (validación TS)

### No Implementado (Fuera de Alcance MVP)
- [ ] Backend/API
- [ ] Base de datos
- [ ] Autenticación
- [ ] Persistencia de análisis
- [ ] Exportación PDF
- [ ] Gráficos/charts
- [ ] Integración con herramientas (Jira, Slack)
- [ ] Análisis comparativo
- [ ] Machine Learning
- [ ] Multi-idioma

---

## 10. Próximos Pasos (Post-MVP)

### Mejoras Potenciales

**Corto Plazo (1-2 sprints):**
- Agregar más incidentes de ejemplo (total 10)
- Mejorar patrones regex para extracción de timeline
- Ampliar diccionario de keywords para hipótesis
- Implementar localStorage para guardar análisis recientes
- Agregar exportación a Markdown

**Mediano Plazo (3-6 sprints):**
- Integrar IA generativa (OpenAI/Claude) como opción avanzada
- Implementar backend para persistencia
- Agregar autenticación (Auth0/Firebase)
- Dashboard con histórico de análisis
- Gráficos de tendencias (Chart.js/Recharts)
- Templates customizables de postmortem

**Largo Plazo (6+ sprints):**
- Integración con Jira/PagerDuty/ServiceNow
- Notificaciones Slack/Teams
- Análisis colaborativo multi-usuario
- ML para clasificación automática de severidad
- API pública para integraciones
- Multi-tenant para empresas

---

## 11. Notas Técnicas

### Por Qué Este Stack

**React 19:**
- Hooks modernos simplifican estado
- Virtual DOM eficiente para re-renders
- Ecosistema maduro y documentación abundante

**TypeScript:**
- Type safety previene errores en tiempo de desarrollo
- IntelliSense mejora DX
- Refactoring seguro

**Vite:**
- Build ultrarrápido (<1s en dev)
- HMR instantáneo
- Tree-shaking automático
- Config mínima

**CSS Vanilla:**
- Sin overhead de frameworks
- Control total sobre diseño
- Performance óptima (sin CSS-in-JS runtime)
- Fácil customización

**Sin Backend:**
- Deployment simplificado (static hosting)
- Sin costos de servidor
- Sin latencia de red
- Privacidad (todo local)

### Decisiones de Arquitectura

**Motor Basado en Reglas vs. IA:**
- ✅ Funciona offline
- ✅ Respuesta instantánea
- ✅ Sin costos de API
- ✅ Determinista
- ❌ Menos flexible que LLM
- **Decisión:** Suficiente para MVP, IA puede agregarse después

**Monolito vs. Componentes:**
- Componentes en mismo archivo (App.tsx) por simplicidad
- **Decisión:** Suficiente para 500 LOC, refactorizar si crece

**Estado Local vs. Redux/Zustand:**
- Solo 3 piezas de estado simple
- **Decisión:** useState suficiente, no justifica state manager

**Styled Components vs. CSS Modules vs. Vanilla:**
- Vanilla CSS es más rápido y directo para este alcance
- **Decisión:** CSS vanilla en archivos separados

---

## 12. Glosario

**Blameless:** Cultura de postmortem sin culpabilización de personas  
**Postmortem:** Análisis retrospectivo de un incidente tecnológico  
**RCA:** Root Cause Analysis (Análisis de Causa Raíz)  
**SRE:** Site Reliability Engineering  
**SLA:** Service Level Agreement  
**MTTR:** Mean Time To Recovery  
**Rollback:** Revertir a versión anterior del software  
**Hotfix:** Parche urgente para corregir bug crítico  
**Timeline:** Cronología de eventos ordenados temporalmente  
**Empty State:** Estado visual cuando no hay contenido que mostrar  
**HMR:** Hot Module Replacement (recarga de módulos sin perder estado)

---

## Conclusión

Este MVP funcional de "¿Quién la embarró?" cumple con todos los requisitos establecidos para demostrar el concepto de análisis automatizado de incidentes mediante un motor basado en reglas. El proyecto está completo, compilable, desplegable y listo para uso.

**Valor entregado:**
- ✅ Aplicación funcional sin backend
- ✅ Análisis estructurado y consistente
- ✅ Cultura blameless incorporada
- ✅ Exportación fácil de informes
- ✅ UX premium y responsive
- ✅ Código TypeScript tipado y linteable
- ✅ Build optimizado para producción

**Listo para:**
- Demo en localhost
- Deploy a Netlify/Vercel/GitHub Pages
- Presentación en Kiro Day
- Iteración futura con IA/backend si se desea

---

**Ubicación de esta Spec:**  
`c:\Users\U187DF\Downloads\Proyecto_Kiro\quien-la-embarro\.kiro\specs\mvp-incident-detective.md`
