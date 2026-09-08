# Librato — Documentación Base del Proyecto

*Última actualización: definiciones establecidas en etapa de conceptualización.*

---

## 1. Visión

Convertir el consumo de historias en audio en una experiencia inmersiva, social y adaptativa: no solo "escuchar una historia", sino vivirla, aprenderla y compartirla.

---

## 2. Propuesta de valor

Librato es una app centrada en dos pilares: **inmersión** y **accesibilidad**.

A diferencia de un catálogo de audiolibros curado (modelo Audible/Storytel), Librato es una **plataforma de publicación de historias en audio por capítulos**, donde el contenido lo generan tanto creadores independientes como usuarios de la comunidad.

---

## 3. Concepto central del producto

Librato permite que **creadores** y **usuarios** suban sus propias historias divididas en capítulos. Cada historia puede narrarse mediante:

- **Voz humana**: grabada por el propio creador o por alguien invitado.
- **Voz generada por IA**: narración automática a partir del texto.

Además de la narración, cada capítulo puede incorporar **efectos de sonido y ambientación** (lluvia, viento, pisadas, etc.) para reforzar la inmersión.

Cada creador gestiona su propia historia de forma independiente: edición, publicación de nuevos capítulos y seguimiento de su audiencia.

### 3.1 Roles de usuario

| Rol | Funciones principales |
|---|---|
| **Creador** | Sube su historia por capítulos, elige tipo de narración (voz propia, invitada o IA), define efectos de sonido/ambientación, gestiona y edita su historia, ve estadísticas de oyentes |
| **Oyente** | Descubre historias, escucha capítulos gratuitos hasta el límite freemium, se suscribe para desbloquear catálogo completo y descargas |

Esta separación de roles implica que el producto necesita **dos experiencias diferenciadas**: un panel/editor para creadores y una app de consumo para oyentes.

---

## 4. Modelo de monetización: Freemium

- **Nivel gratuito**: acceso limitado — un número acotado de capítulos por historia (o un límite de minutos de escucha mensuales) para que el usuario evalúe si quiere suscribirse.
- **Nivel suscripción**: acceso ilimitado a todo el catálogo, con posibilidad de descarga de contenido para escucha offline.
- **Pendiente de definir**: esquema de reparto de ingresos entre la plataforma y los creadores de contenido.

---

## 5. Metas del proyecto (orden de prioridad)

### Meta 1 — Aplicación base
- Publicación de historias por capítulos.
- Subida de narración en voz humana (grabada por el propio creador).
- Reproductor con soporte de efectos de sonido básicos.
- Panel simple de creador (carga de texto/audio, organización de capítulos).
- Sistema freemium funcionando (límite de capítulos gratuitos + suscripción).

### Meta 2 — IA de voz generativa
- Evaluación de proveedores de voz generativa existentes, o desarrollo de una IA de voz propia.
- Opción para que los creadores generen la narración automáticamente a partir del texto de su historia.
- Definición de política de consentimiento para clonación de voz (propia o de terceros).

### Meta 3 — Expansión de funcionalidades
Una vez validada la base, incorporar progresivamente las funciones exploradas en la etapa de brainstorming inicial: audio 8D, modo bilingüe de aprendizaje, gamificación (quizzes, logros), clubs de lectura sincronizados, podcasts de discusión integrados, "elige tu propia aventura" por voz, temporizador adaptativo, y Scan & Listen (conversión de PDF/EPUB/foto a audio).

---

## 6. Desafío identificado: arranque en frío de contenido

Al no existir aún una base de historias generadas por la comunidad, se identificó como riesgo principal el lanzamiento sin contenido suficiente. Estrategias evaluadas (a decidir):

1. **Contenido semilla propio**: historias propias o encargadas para probar el pipeline completo antes de abrir a creadores externos.
2. **Beta cerrada con creadores invitados**: reclutamiento de escritores/creadores externos antes del lanzamiento público, con condiciones preferenciales.
3. **Dominio público como relleno**: uso de textos de dominio público narrados con IA como catálogo inicial.

---

## 7. Temas pendientes de definición

- Esquema de reparto de ingresos con creadores.
- Elección de proveedor de voz generativa (o desarrollo propio) para la Meta 2.
- Política y flujo de consentimiento para clonación de voz.
- Detalle funcional pantalla por pantalla de la Meta 1.
- Estrategia definitiva de arranque en frío de contenido.
