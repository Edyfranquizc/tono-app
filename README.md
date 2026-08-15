# Tono

Generador de identidad de marca con IA. "Tú tienes la idea. Nosotros encontramos su identidad."

## Correr en local

```bash
npm install
npm run dev
```

La app llama a `/api/generate`, que es una función serverless — para que funcione en
local necesitás el CLI de Vercel (`npm i -g vercel` y luego `vercel dev`), o desplegar
directo (ver abajo).

## Subir a GitHub

```bash
git init
git add .
git commit -m "Primera versión de Tono"
gh repo create tono --public --source=. --push
```

(Si no tenés `gh` instalado, creá el repo manualmente en github.com y después:)

```bash
git remote add origin https://github.com/TU_USUARIO/tono.git
git branch -M main
git push -u origin main
```

## Deployar en Vercel

1. Entrá a https://vercel.com → **Add New Project** → importá el repo `tono` de GitHub.
2. Antes de dar deploy, andá a **Environment Variables** y agregá:
   - `ANTHROPIC_API_KEY` = tu key de https://console.anthropic.com
3. Dale a **Deploy**. Vercel detecta Vite automáticamente.
4. Cada vez que hagas `git push`, Vercel redeploya solo.

## ¿Necesita login/registro de usuarios?

No. Tal como está armada, cualquiera que entre a la URL puede usarla directo, sin
crear cuenta. Si más adelante querés limitar quién genera marcas (por costo de API,
por ejemplo), se puede agregar un login simple — pero no es necesario para lanzarla.
