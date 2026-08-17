<div align="center">

# 🎨 TONO

### *"Tú tienes la idea. Nosotros encontramos su identidad."*

Generador de identidad de marca con IA — de una simple descripción a un branding completo, en segundos.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Groq](https://img.shields.io/badge/Groq-Llama_3.3-F55036?logo=groq&logoColor=white)](https://groq.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![License](https://img.shields.io/badge/License-Free_to_use-lightgrey)](#-licencia)

</div>

---

## ✨ ¿Qué hace?

Describís tu negocio en una frase, elegís rubro y estilo, y TONO te devuelve una identidad de marca lista para presentar:

| 🏷️ Nombre y slogan | 🎨 Paleta de colores | 🔤 Tipografía |
|---|---|---|
| 🖼️ Concepto de logo | 🗣️ Tono de voz | 📐 Guía de aplicación |

Pensado para **freelancers, emprendedores y estudiantes** que necesitan arrancar un proyecto con una identidad sólida — sin pagar un estudio de diseño.

---

## 🧩 Stack

| Capa | Tecnología |
|---|---|
| Frontend | React + Vite |
| IA | Groq API (openai/gpt-oss-120b) |
| Hosting | Vercel (serverless functions) |

---

## 🚀 Correr en local

```bash
npm install
npm run dev
```

La app llama a `/api/generate`, una función serverless. Para probarla en local necesitás el CLI de Vercel:

```bash
npm i -g vercel
vercel dev
```

O saltar directo a producción — ver más abajo. ⬇️

---

## 🔑 Variables de entorno

Creá un archivo `.env` en la raíz:

```env
GROQ_API_KEY=tu_key_aquí
```

Conseguí tu key **gratis, sin tarjeta**, en [console.groq.com/keys](https://console.groq.com/keys).

---

## 📦 Subir a GitHub

```bash
git init
git add .
git commit -m "Primera versión de TONO"
gh repo create tono --public --source=. --push
```

¿No tenés `gh` instalado? Creá el repo manualmente en [github.com/new](https://github.com/new) y después:

```bash
git remote add origin https://github.com/TU_USUARIO/tono.git
git branch -M main
git push -u origin main
```

---

## ☁️ Deployar en Vercel

1. Entrá a [vercel.com](https://vercel.com) → **Add New Project** → importá el repo `tono`.
2. Antes de deployar, andá a **Settings → Environment Variables** y agregá:
```
GROQ_API_KEY = tu key de Groq

3. Dale a **Deploy**. Vercel detecta Vite automáticamente.
4. Cada `git push` a `main` redeploya solo. 🔁

---

## 🔐 ¿Necesita login o registro?

**No.** Cualquiera que entre a la URL genera su identidad de marca directo, sin crear cuenta.

> Si más adelante querés limitar el uso (por volumen de requests a la API), se puede sumar un límite por IP o un registro simple — pero no hace falta para lanzar.

---

## 📄 Licencia

<div align="center">

Proyecto de uso libre para fines de aprendizaje y portfolio.

**Hecho con 🧡 y mucho café**

</div>