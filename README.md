# Aplicación de Lista de Tareas

Este repositorio contiene una aplicación desarrollada con **Angular**, **Ionic** y **Cordova**, orientada a la gestión de tareas en entornos móviles. La app aprovecha la compatibilidad con Cordova para ejecutarse en dispositivos Android e iOS.

## 1. Funciones Principales

### Gestión de Tareas

- **Agregar Tareas**: Los usuarios pueden crear nuevas tareas asignándoles un título y una categoría.
- **Editar Tareas**: Es posible modificar tareas existentes, incluyendo su título o estado de finalización.
- **Eliminar Tareas**: Los usuarios pueden borrar tareas, ideal para aquellas que ya se completaron o que ya no son necesarias.
- **Completar Tareas**: Se puede marcar una tarea como completada o no completada para llevar control del avance.

### Gestión de Categorías

- **Crear Categorías**: Permite a los usuarios añadir nuevas categorías para organizar mejor sus tareas.
- **Ver Categorías**: Se muestra una lista con las categorías existentes para visualizar la organización.
- **Eliminar Categorías**: Las categorías pueden ser eliminadas, lo que puede afectar la organización de las tareas asociadas.

### Búsqueda y Filtros

- **Buscar Tareas**: Función de búsqueda integrada para encontrar tareas específicas por título.
- **Filtrar por Categoría**: Permite ver tareas agrupadas según su categoría, facilitando el enfoque y la organización.

### Integración con Firebase

- **Configuración Remota**: Se utiliza Firebase Remote Config para habilitar o deshabilitar funcionalidades dinámicamente, como la página de categorías.
- **Sincronización de Datos**: Posibilidad de sincronizar datos en tiempo real entre dispositivos (pensado para futuras mejoras).

### Interfaz Responsiva

- **Componentes de Ionic**: Se emplean componentes de UI de Ionic que ofrecen una experiencia visual fluida y adaptable tanto en Android como en iOS.

### Framework de Pruebas

- **Pruebas Unitarias**: Se utiliza Jasmine para testear las funcionalidades principales relacionadas con las tareas y los métodos auxiliares, garantizando su estabilidad.

---

## Organización de Archivos

```text
src/
├── app/
│   ├── core/                # Capas centrales del dominio
│   │   ├── domain/          # Entidades y casos de uso (lógica del negocio)
│   │   │   ├── models/      # Entidades del dominio (interfaces, clases puras)
│   │   │   └── use-cases/   # Casos de uso (Application Layer)
│   │   ├── services/        # Interfaces de abstracción para servicios (puertos)
│   │   └── utils/           # Utilidades compartidas (helpers, funciones puras)
│   │
│   ├── data/                # Implementaciones concretas (Infraestructura)
│   │   ├── repositories/    # Adaptadores que implementan interfaces del dominio
│   │   ├── datasources/     # Llamadas a APIs, almacenamiento local, etc.
│   │
│   │
│   ├── presentation/        # Capa de presentación (UI + componentes Angular)
│   │   ├── pages/           # Páginas/Containers
│   │   ├── components/      # Componentes reutilizables
│   │   ├── state/           # Manejo de estado (NgRx, signals, services)
│   │   └── routing/         # Rutas del módulo
│   │
│   ├── app.module.ts        # Módulo raíz
│   └── app.component.ts     # Componente raíz
│
├── assets/
└── index.html

```

---

## Dependencias Necesarias

- **Node.js** (v18 o superior)
- **Angular CLI** (v19)
- **Ionic CLI** (v19)
- **Cordova** (v14)
- **Android Studio**
- **Xcode**

---

## Instalación

1. Clonar el proyecto:

```bash
https://github.com/Nicolasp-dev/todo-list.git
cd todo-list
```

2. Instalar dependencias:

```bash
npm install
```

---

## Modo de Ejecución

### Entorno de Desarrollo

Lanza el proyecto en el navegador local:

```bash
npm start
```

Accede luego a `http://localhost:8100`.

### En Dispositivos Reales con Cordova

Para Android:

```bash
ionic cordova run android
```

Para iOS:

```bash
ionic cordova run ios
```

---

## Opciones de Compilación

- **Build para móvil (Cordova)**:

```bash
ionic cordova build android
ionic cordova build ios
```

---

## Esquema de Arquitectura

La aplicación está organizada bajo arquitectura limpia

- **Presentación**: Interfaz del usuario mediante Angular e Ionic.
- **Aplicación**: Servicios, lógica central y reglas de negocio.
- **Infraestructura**: Manejo de almacenamiento local, plugins y Firebase.
- **Dominio**: Modelos de datos principales como la entidad `Task`.

---

---

## Pruebas

Este proyecto utiliza **Jasmine** para pruebas unitarias.

- Ejecutar pruebas:

```bash
npm test
```

- Con reporte de cobertura:

```bash
npm run test --coverage
```

---

## Distribución

### Android / iOS

Compila y genera builds usando Cordova o Capacitor.

#### Usando Cordova

```bash
ionic cordova build android
ionic cordova build ios
```

---
