import type { Incident } from './types';

export const sampleIncidents: Incident[] = [
  {
    id: '1',
    title: 'Caída del servicio de pagos - 15 minutos',
    description: `A las 14:32 del día 23 de octubre de 2026, el servicio de procesamiento de pagos dejó de responder. Los usuarios reportaron errores 500 al intentar completar transacciones. El monitoreo detectó que la base de datos principal alcanzó el 100% de uso de CPU. A las 14:35 se identificó una consulta SQL sin índice que se estaba ejecutando masivamente. A las 14:47 se reinició el servicio y se agregó el índice faltante. El servicio se restableció completamente.`
  },
  {
    id: '2',
    title: 'Exposición de datos de usuarios en logs',
    description: `El 20 de octubre de 2026 a las 09:15, un ingeniero de seguridad detectó que los logs de aplicación contenían información sensible de usuarios, incluyendo correos electrónicos y tokens de sesión en texto plano. La revisión de logs mostró que esta exposición venía ocurriendo desde el despliegue del día 18 de octubre a las 16:00. Se identificó que una nueva funcionalidad de debug estaba registrando objetos completos sin sanitización. No se detectó acceso no autorizado a los logs. Se desplegó un parche a las 11:30 que eliminó el logging sensible y se procedió a rotar todos los tokens afectados.`
  },
  {
    id: '3',
    title: 'Degradación de rendimiento en API principal',
    description: `Desde las 08:00 del 22 de octubre de 2026, múltiples clientes reportaron lentitud en la aplicación. Los tiempos de respuesta de la API principal aumentaron de 200ms promedio a 3500ms. El dashboard de métricas mostraba un incremento anormal en las llamadas a servicios externos. Se descubrió que un cambio en la configuración de caché había deshabilitado el caching de respuestas de terceros. El equipo de infraestructura revirtió la configuración a las 10:45, pero el problema persistió parcialmente hasta las 12:00 cuando se completó la propagación del cambio en todos los nodos del cluster.`
  }
];
