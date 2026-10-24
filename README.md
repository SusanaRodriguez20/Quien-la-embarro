# 🔎 ¿Quién la embarró? — Incident Detective

### Hackathon Kiro Day Medellín 2026

**Porque lo importante no es encontrar culpables, sino entender qué ocurrió y evitar que vuelva a pasar.**

## 🚀 Descripción del proyecto

**¿Quién la embarró?** es una aplicación web desarrollada durante la hackathon **Kiro Day Medellín 2026**, diseñada para ayudar a equipos de tecnología, desarrollo, operaciones y ciberseguridad a investigar y comprender incidentes tecnológicos.

Cuando una aplicación falla, una API deja de responder o se presenta un incidente de seguridad, los equipos deben reconstruir los acontecimientos, identificar posibles causas y documentar las acciones necesarias para prevenir situaciones similares.

Nuestra solución simplifica este proceso mediante un motor de análisis que transforma descripciones de incidentes en informes estructurados, comprensibles y orientados a la mejora continua.

El proyecto promueve una cultura **blameless**, en la que el objetivo no es señalar responsables, sino comprender los factores técnicos y organizacionales que contribuyeron al incidente.

## 🎯 ¿Qué problema resuelve?

En muchas organizaciones, el análisis posterior a un incidente presenta dificultades como:

- Tiempo excesivo para documentar y comprender lo ocurrido.
- Información dispersa o incompleta.
- Dificultad para identificar posibles causas raíz.
- Falta de estandarización en los informes postmortem.
- Comunicación poco clara entre equipos técnicos y gerencia.
- Ausencia de recomendaciones concretas para prevenir futuros fallos.

**¿Quién la embarró?** propone una forma más rápida y estructurada de abordar estas situaciones.

## ✨ Funcionalidades principales

### 🔍 Análisis de incidentes

El usuario puede describir un incidente tecnológico en lenguaje natural y obtener un análisis estructurado mediante un motor local basado en reglas.

### ⏱️ Reconstrucción de cronologías

Organiza los acontecimientos identificados en una línea de tiempo para facilitar la comprensión de la secuencia del incidente.

### 🧠 Investigación de posibles causas

Identifica factores que podrían haber contribuido al problema, diferenciando claramente:

- ✅ **Hechos:** información proporcionada en la descripción.
- 🔍 **Hipótesis:** posibles explicaciones que requieren validación.
- ❓ **Desconocidos:** información que todavía debe investigarse.

### 🚨 Evaluación de impacto

Presenta una estimación de la severidad, duración e impacto potencial del incidente según la información disponible.

### 🛡️ Acciones correctivas y preventivas

Genera recomendaciones para investigar, corregir y reducir la probabilidad de recurrencia.

### 📊 Informes especializados

Permite visualizar los resultados desde dos perspectivas:

- **Informe técnico:** dirigido a desarrolladores, especialistas de infraestructura, DevOps y ciberseguridad.
- **Informe ejecutivo:** orientado a gerentes y responsables de negocio, con lenguaje más comprensible.

### 📋 Funcionalidades adicionales

- Tres incidentes ficticios precargados para demostración.
- Interfaz moderna con temática oscura.
- Diseño responsive.
- Copia de informes al portapapeles.
- Funcionamiento local sin autenticación ni base de datos.

## 🧰 Tecnologías utilizadas

| Tecnología | Propósito |
|---|---|
| React | Construcción de la interfaz |
| TypeScript | Desarrollo tipado y mantenimiento |
| Vite | Entorno de desarrollo y compilación |
| CSS | Diseño visual y responsive |
| Kiro | Desarrollo asistido, especialización y automatización |

El motor de análisis actual utiliza **reglas locales implementadas en TypeScript**. No requiere un servicio externo ni una API de IA generativa para funcionar.

## 🤖 ¿Cómo utilizamos Kiro?

Uno de los objetivos principales del proyecto fue aprovechar las diferentes capacidades de Kiro durante la hackathon.

### ⚡ Powers

Utilizamos el Power oficial **Build a Power** para construir nuestro propio Power personalizado:

`incident-detective`

Este Power especializa al agente de Kiro en investigaciones de incidentes tecnológicos, aplicando metodologías de análisis postmortem y causa raíz.

### 🧠 Skills

Creamos la Skill `incident-analysis`, que proporciona instrucciones para:

- Recopilar información de incidentes.
- Reconstruir cronologías.
- Aplicar técnicas de Root Cause Analysis (RCA).
- Diferenciar hechos, hipótesis y evidencias faltantes.
- Proponer acciones correctivas y preventivas.
- Generar informes técnicos y ejecutivos.
- Mantener una metodología sin culpabilización.

### 📏 Steering

Configuramos reglas permanentes en:

`.kiro/steering/incident-rules.md`

Estas reglas orientan el desarrollo hacia análisis responsables, evitando inventar información y manteniendo la arquitectura definida.

### 🪝 Agent Hooks

Configuramos un Hook de validación en:

`.kiro/hooks/ts-validator.json`

El Hook utiliza el evento `PostToolUse` para ejecutar comprobaciones de TypeScript después de determinadas modificaciones de código realizadas por Kiro.

### 📑 Specs

Documentamos el MVP utilizando Quick Spec:

`.kiro/specs/mvp-incident-detective.md`

La especificación describe los requisitos funcionales, la arquitectura, los criterios de aceptación, las limitaciones y las oportunidades de evolución del producto.

## 💻 Instalación y ejecución

### Requisitos

- Node.js
- npm

### 1. Clonar el repositorio

```bash
git clone https://github.com/SusanaRodriguez20/Quien-la-embarro.git
cd Quien-la-embarro
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Abre en el navegador la dirección local proporcionada por Vite, normalmente:

`http://localhost:5173`

### 4. Compilar el proyecto

```bash
npm run build
```

## 🧪 Ejemplo de uso

**Descripción del incidente:**

> Después de desplegar una nueva versión de nuestra aplicación, comenzaron a presentarse errores HTTP 500. El servicio estuvo fuera de línea durante 45 minutos y se recuperó después de revertir el despliegue.

**Análisis esperado:**

- Reconstrucción de los acontecimientos reportados.
- Identificación de la interrupción de 45 minutos.
- Hipótesis de una posible relación con el despliegue.
- Identificación de evidencias faltantes, como logs y registros de cambios.
- Recomendaciones para mejorar las pruebas, el monitoreo y los mecanismos de recuperación.
- Generación de informes para personal técnico y gerencia.

El sistema no debe presentar una hipótesis como causa confirmada sin evidencia suficiente.

## 🏗️ Arquitectura del MVP

```text
Usuario
   |
   v
Interfaz React + TypeScript
   |
   v
Motor local de análisis
   |
   +-- Extracción de información
   +-- Identificación de eventos
   +-- Evaluación de severidad
   +-- Generación de hipótesis
   +-- Recomendaciones
   |
   v
Informe estructurado
   |
   +-- Vista técnica
   +-- Vista ejecutiva
   +-- Copiar resultados
```

La arquitectura permite ejecutar el prototipo localmente sin infraestructura adicional.

## 📈 Modelo de negocio

El proyecto tiene potencial para evolucionar hacia una solución **SaaS B2B de gestión inteligente de incidentes**, dirigida a:

- Empresas de desarrollo de software.
- Proveedores de servicios tecnológicos.
- Equipos DevOps y SRE.
- Centros de operaciones de seguridad.
- Organizaciones que necesitan estandarizar sus postmortems.

Su propuesta de valor consiste en reducir el esfuerzo de documentación, mejorar la comunicación entre áreas y facilitar el aprendizaje organizacional posterior a incidentes.

## 🔮 Próximas funcionalidades

Como evolución futura se contempla:

- Integración con modelos de IA generativa.
- Análisis de archivos de logs.
- Conexión mediante MCP con herramientas de observabilidad.
- Investigación asistida de incidentes mediante agentes especializados.
- Historial y comparación de incidentes.
- Exportación de informes a PDF.
- Seguimiento de acciones correctivas.
- Identificación de patrones recurrentes.

Estas funcionalidades forman parte de la visión del producto y no del alcance implementado en el MVP inicial.

## ⚠️ Limitaciones actuales

El prototipo utiliza análisis heurístico basado en reglas, por lo que no sustituye una investigación técnica o forense completa.

Los resultados deben interpretarse como apoyo al análisis y no como una confirmación automática de las causas de un incidente.

El Power personalizado `incident-detective` funciona dentro de Kiro. La aplicación web utiliza actualmente su propio motor local y no consume directamente dicho Power como un servicio.

## ❤️ Filosofía del proyecto

**El objetivo de un postmortem no es encontrar a quién culpar, sino descubrir qué podemos mejorar.**

Porque cuando ocurre un incidente, la pregunta más importante no debería ser:

**«¿Quién la embarró?»**

Sino:

**«¿Qué pasó, qué aprendimos y cómo evitamos que vuelva a ocurrir?»**

---

**Desarrollado durante Kiro Day Medellín 2026.**

#KiroDayMedellin #Kiro #AWS #Hackathon #Ciberseguridad #DevOps #InteligenciaArtificial
