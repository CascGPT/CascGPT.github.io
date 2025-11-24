# CASC GPT — README (SEO & Publicación en Google)

**Repositorio:** `https://cascgpt.github.io/`
**Archivo principal proporcionado:** `/mnt/data/index.html`.

> Este README recoge las acciones, metaetiquetas y archivos que recomiendo añadir al proyecto para mejorar la aparición en buscadores (SEO) y facilitar la indexación por Google.

---

## 1) Objetivo

Hacer que la web de CASC GPT sea indexable, tenga buena metadata para buscadores y redes sociales, y facilite la verificación en Google Search Console.

---

## 2) Cambios rápidos (pegar en `<head>` de tu `index.html`)

Copia y pega estas líneas dentro de la sección `<head>` de tu `index.html` (o en el `<head>` de cada página relevante):

```html
<!-- SEO básico -->
<meta name="description" content="CASC GPT — Cascos inteligentes desde Valladolid, Yucatán. Tecnología, seguridad y diseño. Contáctanos por WhatsApp +52 985 115 7880.">
<meta name="keywords" content="cascos inteligentes, casco bluetooth, seguridad vial, Valladolid, Yucatán, CASC GPT">
<link rel="canonical" href="https://cascgpt.github.io/">

<!-- Open Graph (para Facebook/WhatsApp/preview) -->
<meta property="og:title" content="CASC GPT — Cascos inteligentes">
<meta property="og:description" content="CASC GPT — Cascos inteligentes con Bluetooth, sensores y diseño ergonómico. Desde Valladolid, Yucatán.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://cascgpt.github.io/">
<meta property="og:image" content="https://cascgpt.github.io/assets/img/profile/profile-bg-5.webp">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="CASC GPT — Cascos inteligentes">
<meta name="twitter:description" content="CASC GPT — Cascos inteligentes con Bluetooth, sensores y diseño ergonómico.">
<meta name="twitter:image" content="https://cascgpt.github.io/assets/img/profile/profile-bg-5.webp">

<!-- JSON-LD (Schema.org) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CASC GPT",
  "url": "https://cascgpt.github.io/",
  "logo": "https://cascgpt.github.io/assets/img/favicon.png",
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+52 985 115 7880",
    "contactType": "customer service",
    "areaServed": "MX",
    "availableLanguage": ["es","en"]
  }],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Valladolid",
    "addressRegion": "Yucatán",
    "addressCountry": "MX"
  }
}
</script>

<!-- Placeholder para verificación de Google Search Console (si usas meta verification) -->
<!-- <meta name="google-site-verification" content="TU_CODIGO_DE_VERIFICACION" /> -->
```

> Ajusta los textos `description`, `keywords`, `og:image` y la URL canonical según lo necesites.

---

## 3) Archivos importantes que debes añadir al repositorio

**robots.txt** (en la raíz del repo):

```
User-agent: *
Allow: /
Sitemap: https://cascgpt.github.io/sitemap.xml
```

**sitemap.xml** (ejemplo simple, colócalo en la raíz):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cascgpt.github.io/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://cascgpt.github.io/nosotros.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://cascgpt.github.io/mercancia.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

Incluye en el sitemap todas las páginas relevantes (cada HTML del sitio).

---

## 4) Verificación en Google y envío del sitemap

1. Accede a Google Search Console con la cuenta de Google que uses para tu proyecto.
2. Añade la propiedad `https://cascgpt.github.io/`.
3. Verifica mediante el método que prefieras: meta tag (pega el meta en el `<head>`), archivo HTML, o DNS.
4. En la sección "Sitemaps", pega `https://cascgpt.github.io/sitemap.xml` y pulsa enviar.

> En el README incluí una línea de ejemplo para la meta-verificación. Sustituye `TU_CODIGO_DE_VERIFICACION` por el valor que Google te proporcione si eliges ese método.

---

## 5) Buenas prácticas SEO que están en tu control

* Rellena `meta description` en cada página con un resumen único.
* Usa `title` descriptivos y únicos por página.
* Añade `alt` descriptivos a imágenes importantes (mejora accesibilidad y SEO de imágenes).
* Evita contenido duplicado: cada página debe cubrir un tema distinto o tener una variación clara.
* Añade enlaces internos entre páginas relevantes (por ejemplo, desde la home a `nosotros.html` y `mercancia.html`).
* Usa URLs simples y legibles (`/nosotros.html` en lugar de parámetros complicados).
* Si necesitas idiomas, indica `hreflang`.

---

## 6) GitHub Pages — checklist

* Verifica que el repo `cascgpt` esté público.
* En `Settings > Pages`, selecciona la rama correcta (`main` o `gh-pages`) y la carpeta (root `/`).
* Asegúrate que el dominio sea `https://cascgpt.github.io/`.

---

## 7) Recursos incluidos en este repo

* `index.html` (archivo proporcionado por el equipo) — ruta local: `/mnt/data/index.html`.

---

## 8) Ejemplo de commit (sugerencia de mensajes)

```
git add index.html sitemap.xml robots.txt README.md
git commit -m "SEO: meta tags, sitemap y robots para indexación en Google"
git push origin main
```

---

## 9) Qué hice en este README

* He listado las metaetiquetas y archivos que debes añadir.
* Incluí un schema JSON-LD para organización y contacto.
* Ejemplos de `sitemap.xml` y `robots.txt`.
* Instrucciones paso a paso para verificar en Google Search Console y enviar el sitemap.

---

Si quieres, puedo:

* Generar el `sitemap.xml` completo con todas las páginas que haya detectado en tu repo y crear los archivos listos para subir.
* Insertar automáticamente las metaetiquetas dentro de `/mnt/data/index.html` y devolverte el archivo modificado listo para subir.

Dime qué prefieres y lo hago.
