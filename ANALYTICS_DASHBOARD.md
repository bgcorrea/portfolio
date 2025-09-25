# 📊 Dashboard de Analytics en Tiempo Real

## 🎯 Descripción

Este dashboard te permite analizar al instante todas las métricas de cookies y comportamiento de usuarios en tu sitio web, sin depender de Google Analytics. Es completamente privado y funciona en tiempo real.

## 🚀 Características Principales

### ✅ **Métricas en Tiempo Real**

- **Usuario único**: ID único para cada visitante
- **Contador de visitas**: Número total de visitas
- **Tiempo en sitio**: Duración de la sesión actual
- **Tiempo en página**: Tiempo transcurrido en la página actual
- **Profundidad de scroll**: Porcentaje de scroll alcanzado

### ✅ **Análisis de Comportamiento**

- **Tipo de usuario**: Nuevo, recurrente, comprometido, lead convertido
- **Etapa del funnel**: Awareness → Interest → Consideration → Intent → Purchase
- **Páginas más visitadas**: Tracking de navegación
- **Elementos más clickeados**: CTAs, formularios, enlaces

### ✅ **Métricas de Conversión**

- **Formularios enviados**: Contact form submissions
- **Clicks en "Agendar"**: Interacciones con CTA principal
- **Descargas de lead magnet**: Engagement con contenido gratuito
- **Estado de conversión**: Lead convertido o no

### ✅ **Eventos Detallados**

- **Timeline de eventos**: Últimos 10 eventos en tiempo real
- **Categorización**: Engagement, conversion, funnel, etc.
- **Timestamps**: Hora exacta de cada interacción

### ✅ **Información Técnica**

- **Configuración de cookies**: Estado de consentimiento y analytics
- **Información del navegador**: User agent, referrer, etc.
- **Datos de sesión**: Inicio, duración, página actual

## 🎮 Cómo Usar el Dashboard

### 1. **Acceder al Dashboard**

- Haz clic en el botón flotante azul en la esquina inferior derecha
- El dashboard se abrirá como un modal overlay

### 2. **Navegar por las Pestañas**

- **Resumen**: Vista general de métricas clave
- **Comportamiento**: Análisis de engagement y navegación
- **Conversiones**: Métricas de conversión y CTAs
- **Eventos**: Timeline de eventos en tiempo real
- **Técnico**: Información técnica y configuración

### 3. **Configurar Actualización**

- Selecciona la frecuencia de actualización (1s, 5s, 10s, 30s)
- Por defecto se actualiza cada 5 segundos

### 4. **Exportar Datos**

- Botón "Exportar" para descargar todos los datos en JSON
- Útil para análisis posterior o backup

### 5. **Limpiar Datos**

- Botón "Limpiar" para resetear todos los datos de analytics
- Útil para testing o privacidad

## 📈 Métricas Clave Explicadas

### **Tipo de Usuario**

- **new_visitor**: Primera visita
- **returning_visitor**: Más de 3 visitas
- **engaged_visitor**: Más de 5 minutos en sitio
- **converted_lead**: Ha completado una acción de conversión

### **Etapas del Funnel**

- **awareness**: Conociendo el sitio (homepage)
- **interest**: Interesado en automatizaciones (landing page)
- **consideration**: Evaluando opciones
- **intent**: Mostrando intención de compra
- **purchase**: Convertido en cliente

### **Eventos Trackeados**

- **page_view**: Visualización de página
- **scroll_25_percent**: 25% de scroll
- **scroll_50_percent**: 50% de scroll
- **scroll_75_percent**: 75% de scroll
- **scroll_90_percent**: 90% de scroll
- **lp_auto_agendar**: Click en "Agendar Consulta"
- **lp_auto_checklist**: Click en "Descargar checklist"
- **form_submit**: Envío de formulario
- **lead_magnet_download**: Descarga de lead magnet
- **funnel_progression**: Progreso en el funnel

## 🔧 Configuración Técnica

### **Cookies Utilizadas**

```javascript
// Identificación
user_id: "user_1234567890_abc123"        // ID único del usuario
visit_count: "5"                         // Número de visitas
user_type: "returning_visitor"          // Tipo de usuario

// Comportamiento
total_time_on_site: "180"               // Tiempo total en segundos
time_on_page_/automatizaciones: "45"    // Tiempo en página específica
scroll_depth_/automatizaciones: "75"    // Profundidad de scroll

// Conversiones
is_converted_lead: "true"               // Si es lead convertido
lead_magnet_downloaded: "true"          // Si descargó lead magnet
contact_form_submissions: "2"           // Número de envíos de formulario

// Engagement
lp_auto_agendar: "3"                    // Clicks en agendar
lp_auto_checklist: "1"                  // Clicks en checklist

// Funnel
current_funnel_stage: "interest"        // Etapa actual del funnel

// Configuración
cookie_consent: "accepted"              // Consentimiento de cookies
analytics_enabled: "true"               // Analytics habilitado
```

### **localStorage Utilizado**

```javascript
// Eventos trackeados (últimos 200)
tracked_events: [
  {
    event: "page_view",
    timestamp: "2024-01-15T10:30:00.000Z",
    page: "/automatizaciones",
    userId: "user_1234567890_abc123",
    event_category: "navigation",
  },
];
```

### **sessionStorage Utilizado**

```javascript
session_id: "session_1234567890"; // ID de sesión actual
session_start: "2024-01-15T10:30:00.000Z"; // Inicio de sesión
```

## 🎯 Casos de Uso

### **1. Análisis de Conversión**

- Ver cuántos usuarios llegan a la página de automatizaciones
- Medir cuántos hacen clic en "Agendar Consulta"
- Identificar dónde se pierden los usuarios en el funnel

### **2. Optimización de UX**

- Analizar tiempo en página por sección
- Ver profundidad de scroll para identificar contenido relevante
- Detectar puntos de salida comunes

### **3. Segmentación de Audiencia**

- Identificar usuarios comprometidos vs. casuales
- Personalizar experiencia según tipo de usuario
- Crear campañas específicas por segmento

### **4. A/B Testing**

- Comparar métricas entre versiones
- Medir impacto de cambios en tiempo real
- Validar hipótesis de optimización

## 🔒 Privacidad y Cumplimiento

### **GDPR/LGPD Compliance**

- Banner de consentimiento obligatorio
- Opción de rechazar cookies
- Datos almacenados localmente (no enviados a terceros)
- Fácil eliminación de datos

### **Datos Recopilados**

- Solo datos de comportamiento y navegación
- No se recopilan datos personales identificables
- IDs anónimos para tracking
- Información técnica del navegador (estándar)

## 🚀 Próximas Mejoras

### **Funcionalidades Planificadas**

- [ ] Comparación de períodos (día/semana/mes)
- [ ] Gráficos de tendencias en tiempo real
- [ ] Alertas automáticas por métricas
- [ ] Integración con CRM
- [ ] Reportes automáticos por email
- [ ] Dashboard móvil optimizado

### **Métricas Adicionales**

- [ ] Heatmaps de clicks
- [ ] Análisis de rutas de navegación
- [ ] Métricas de dispositivos móviles
- [ ] Análisis de velocidad de carga
- [ ] Métricas de accesibilidad

## 🛠 Mantenimiento

### **Limpieza Regular**

- Los eventos se mantienen solo los últimos 200
- Las cookies tienen fechas de expiración automáticas
- Opción de limpiar todos los datos manualmente

### **Monitoreo de Rendimiento**

- El dashboard no afecta el rendimiento del sitio
- Actualizaciones asíncronas cada 5 segundos
- Código optimizado para mínimo impacto

### **Resolución de Problemas**

- Verificar consentimiento de cookies
- Comprobar que JavaScript esté habilitado
- Revisar consola del navegador para errores
- Limpiar datos si hay comportamientos extraños

## 📞 Soporte

Si tienes problemas con el dashboard o necesitas agregar nuevas métricas, revisa:

1. La consola del navegador para errores
2. El estado de las cookies en DevTools
3. La configuración de consentimiento
4. Los event listeners en el código

¡El dashboard está diseñado para darte insights inmediatos sobre el comportamiento de tus usuarios y optimizar tus conversiones!
