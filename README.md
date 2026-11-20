# Metodología institucional de seguimiento y monitoreo del acompañamiento estudiantil (propuesta)

Página web interactiva que presenta la ruta del estudiante acompañado en la Universidad del Valle: siete etapas, cuatro momentos de medición (lupas), el semáforo de riesgo por habilidad y los instrumentos y guías asociados.

Dirección de Desarrollo Estudiantil y Éxito Académico (DEXIA) · Vicerrectoría Académica · Proyecto MEN 2026.

## Estructura

```
index.html          Página principal (esquema del camino, etapas y lupas)
css/styles.css      Estilos e identidad gráfica
js/data.js          Contenidos: habilidades, descriptores, instrumentos y textos de los paneles
js/app.js           Lógica: escalado, paneles, navegación y selector de habilidades
assets/fonts/       Tipografía Montserrat
assets/img/         Logos institucionales
```

Para **actualizar textos** (etapas, momentos, descriptores o instrumentos) solo se edita `js/data.js`.

## Publicar con GitHub Pages

1. Cree un repositorio y suba todo el contenido de esta carpeta (o use `git push`).
2. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. La página quedará en `https://<usuario-u-organizacion>.github.io/<repositorio>/`.

## Insertar en otro sitio web

```html
<iframe src="https://<usuario-u-organizacion>.github.io/<repositorio>/"
        style="width:100%; aspect-ratio:16/9; border:0;"
        title="Metodología institucional de seguimiento y monitoreo del acompañamiento estudiantil"
        loading="lazy"></iframe>
```

La página se escala automáticamente al ancho del contenedor.

## Uso local

Abra `index.html` en el navegador; no requiere servidor ni dependencias externas.
