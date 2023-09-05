# adalab-t-shirt-shop

**## Guía de inicio rápido**

> ****NOTA:**** Necesitas tener instalado [Node JS](https://nodejs.org/)

1. ****Instala las dependencias**** locales ejecutando en la terminal el comando:

```bash

npm install

```

**### Pasos para arrancar el proyecto:**

Para ello ejecuta el comando:

```bash

npm start

```

Este comando:

- ***Abre una ventana de Chrome y muestra tu página web****, al igual que hace el plugin de VS Code Live Server (Go live).
- También ***observa****todos los ficheros que hay dentro de la carpeta `src/`, para que cada vez que modifiques un fichero ***refresca tu página en Chrome****.
- También ***procesa los ficheros**** HTML, SASS / CSS y JS y los ***genera y guarda en la carpeta `public/`***. Por ejemplo:

- Convierte los ficheros SASS en CSS.

- Combina los diferentes ficheros de HTML y los agrupa en uno o varios ficheros HTML.

Después de ejecutar `npm start` ya puedes empezar a editar todos los ficheros que están dentro de la carpeta `src/` y programar cómodamente.

**## Flujo de archivos con Gulp**

Estas tareas de Gulp producen el siguiente flujo de archivos:

![Gulp flow](./gulp-flow.png)

**## `gulpfile.js` y `config.json`**

Nuestro ****gulpfile.js**** usa el fichero `config.json` de configuración con las rutas de los archivos a generar / observar.

De esta manera separarmos las acciones que están en `gulpfile.js` de la configuración de las acciones que están en `config.json`.

**## Estructura de carpetas**

La estructura de carpetas tiene esta pinta:

```

src

├─ api // los ficheros de esta carpeta se copian en public/api/

|  └─ data.json

├─ images

|  └─ logo.jpg

├─ js // los ficheros de esta carpeta se concatenan en el fichero main.js y este se guarda en public/main.js

|  ├─ main.js

|  └─ events.js

├─ scss

|  ├─ components

|  ├─ core

|  ├─ layout

|  └─ pages

└─ html

└─ partials

```