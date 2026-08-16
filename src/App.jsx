import { useState, useMemo } from "react";

// ============================================================
// TONO — "Tú tienes la idea. Nosotros encontramos su identidad."
// Generador de identidad de marca con IA (Groq).
// ============================================================

const fontDisplay = "'Fraunces', serif";
const fontBody = "'Space Grotesk', sans-serif";
const fontMono = "'JetBrains Mono', monospace";

const RUBROS = [
  "Comida", "Moda", "Tecnología", "Belleza", "Servicios", "Arte/Diseño",
  "Fitness/Salud", "Educación", "Mascotas", "Hogar/Decoración", "Turismo/Viajes", "Finanzas",
];

const ESTILOS = ["Divertido", "Elegante", "Minimalista", "Rebelde", "Artesanal"];

const responsiveStyles = `
  @media (max-width: 768px) {
    .tono-container { flex-direction: column; }
    .tono-sidebar { width: 100% !important; box-sizing: border-box; }
    .tono-grid { grid-template-columns: 1fr !important; }
  }
`;

function getTheme(isDark) {
  return isDark
    ? {
        bg: "#1B1613", card: "#241E19", texto: "#F7F6F2", textoSuave: "#B4AA9E",
        linea: "#3A322B", azul: "#5B6BFF", azulSuave: "#2A2A55",
        naranja: "#FFA142", naranjaSuave: "#3A2C1A", amarillo: "#E3F40C",
      }
    : {
        bg: "#F7F6F2", card: "#FFFFFF", texto: "#28211C", textoSuave: "#6E655B",
        linea: "#E4E2DA", azul: "#1A1AA7", azulSuave: "#E9E9FA",
        naranja: "#FFA142", naranjaSuave: "#FFF1E0", amarillo: "#E3F40C",
      };
}

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const T = useMemo(() => getTheme(isDark), [isDark]);

  const [descripcion, setDescripcion] = useState("");
  const [rubro, setRubro] = useState("Comida");
  const [estilo, setEstilo] = useState("Divertido");
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  async function generarMarca() {
    if (!descripcion.trim()) {
      setError("Describí tu negocio para poder generar la marca 👀");
      return;
    }
    setCargando(true);
    setError(null);
    setResultado(null);

    const prompt = `Sos director de marca en un estudio de branding premium. Basado en esta info, creá una identidad de marca completa, lista para presentar a un cliente. Cubrí tanto la Identidad Visual (logo, colores, tipografía) como la capa de Branding (propósito, personalidad, experiencia de marca, canales).

Descripción del negocio: "${descripcion}"
Rubro: ${rubro}
Estilo deseado: ${estilo}

Devolvé EXCLUSIVAMENTE un objeto JSON (sin markdown, sin backticks, sin texto extra) con esta forma exacta:
{
  "nombre": "nombre de marca corto y memorable",
  "slogan": "slogan de máximo 6 palabras",
  "proposito": "propósito/valores de la marca en una frase",
  "personalidad": "3 a 4 adjetivos separados por coma",
  "paleta": [
    {"nombre": "nombre del color", "hex": "#000000"},
    {"nombre": "nombre del color", "hex": "#000000"},
    {"nombre": "nombre del color", "hex": "#000000"},
    {"nombre": "nombre del color", "hex": "#000000"}
  ],
  "tipografia": "sugerencia de tipografía + por qué en una frase corta",
  "concepto_logo": "descripción visual concreta del isotipo/logo",
  "tono_de_voz": "descripción del tono de comunicación en una frase",
  "frase_ejemplo": "un ejemplo real de copy/post que usaría esta marca",
  "experiencia_de_marca": "cómo se siente interactuar con esta marca, en una frase",
  "canales": ["canal 1", "canal 2", "canal 3"],
  "aplicaciones": ["idea de mockup 1", "idea de mockup 2", "idea de mockup 3"],
  "hacer": ["regla 1", "regla 2", "regla 3"],
  "evitar": ["error a evitar 1", "error a evitar 2"]
}

La paleta y el concepto de logo deben ser específicos del rubro y el estilo (nada genérico). Respondé en español, tono profesional de estudio de diseño.`;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "No se encontró /api/generate. ¿Estás corriendo 'vercel dev' o ya deployaste?"
            : `Error del servidor (${response.status})`
        );
      }

      const data = await response.json();
      const textoPlano = data.content
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("");
      const limpio = textoPlano.replace(/```json|```/g, "").trim();
      setResultado(JSON.parse(limpio));
    } catch (err) {
      console.error("Error generando marca:", err);
      setError(err.message || "Algo falló generando tu marca. Probá de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <>
      <style>{responsiveStyles}</style>
      <div className="tono-container" style={{ display: "flex", minHeight: "100vh", fontFamily: fontBody, background: T.bg, transition: "background 0.2s" }}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,900;1,600&family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />

        <aside
          className="tono-sidebar"
          style={{
            width: 300, background: T.bg, borderRight: `1px solid ${T.linea}`,
            color: T.texto, padding: "24px 20px", display: "flex",
            flexDirection: "column", gap: 18, flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <img src="/isotipo-tono-transparente.png" alt="Tono" width={36} height={36} />
                <p style={{ fontFamily:fontMono, fontSize: 28, color: T.texto, letterSpacing: 1, margin: 0 }}>
                  TONO
                </p>
              </div>
              <h1 style={{ fontFamily: fontDisplay, fontSize: 18, margin: "4px 0 2px", color: T.texto }}>
                Tú tienes la idea.
              </h1>
              <p style={{ fontSize: 14, color: T.textoSuave, margin: 0 }}>
                Nosotros encontramos su identidad.
              </p>
            </div>

            <button
              onClick={() => setIsDark(!isDark)}
              title={isDark ? "Cambiar a modo día" : "Cambiar a modo noche"}
              style={{
                flexShrink: 0, width: 36, height: 36, borderRadius: "50%",
                border: `1px solid ${T.linea}`, background: T.card, color: T.texto,
                cursor: "pointer", fontSize: 16, display: "flex",
                alignItems: "center", justifyContent: "center",
              }}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>

          <div>
            <label style={labelStyle(T)}>Describí tu negocio</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej: vendo velas artesanales con aromas de plantas nativas..."
              rows={4}
              style={inputStyle(T)}
            />
          </div>

          <div>
            <label style={labelStyle(T)}>Rubro</label>
            <select value={rubro} onChange={(e) => setRubro(e.target.value)} style={inputStyle(T)}>
              {RUBROS.map((r) => (<option key={r}>{r}</option>))}
            </select>
          </div>

          <div>
            <label style={labelStyle(T)}>Estilo</label>
            <select value={estilo} onChange={(e) => setEstilo(e.target.value)} style={inputStyle(T)}>
              {ESTILOS.map((s) => (<option key={s}>{s}</option>))}
            </select>
          </div>

          <button
            onClick={generarMarca}
            disabled={cargando}
            style={{
              fontFamily: fontDisplay, fontWeight: 700, fontSize: 15, padding: "12px 16px",
              background: cargando ? T.textoSuave : T.azul, color: "#fff",
              border: "none", borderRadius: 6, cursor: cargando ? "default" : "pointer", marginTop: 4,
            }}
          >
            {cargando ? "Encontrando tu tono..." : "Encontrar identidad →"}
          </button>

          {error && <p style={{ color: "#E06A5A", fontSize: 12 }}>{error}</p>}

          <p style={{ fontFamily: fontMono, fontSize: 10, color: T.textoSuave, marginTop: "auto" }}>
            v5 · powered by Groq
          </p>
        </aside>

        <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
          {!resultado && !cargando && (
            <div style={{ textAlign: "center", marginTop: "18vh", color: T.textoSuave }}>
              <p style={{ fontFamily: fontMono, fontSize: 13 }}>
                Completá el panel de la izquierda para encontrar tu tono.
              </p>
            </div>
          )}

          {cargando && (
            <div style={{ textAlign: "center", marginTop: "18vh", color: T.azul, fontFamily: fontMono }}>
              Diseñando tu marca...
            </div>
          )}

          {resultado && (
            <div
              className="tono-grid"
              style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}
            >
              <Card span={4} theme={T}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <TagMono theme={T}>NOMBRE Y CONCEPTO</TagMono>
                  <span style={{ fontFamily: fontMono, fontSize: 10, background: T.naranja, color: "#28211C", padding: "2px 8px", borderRadius: 20 }}>
                    NUEVO
                  </span>
                </div>
                <h2 style={{ fontFamily: fontDisplay, fontSize: 44, fontWeight: 900, margin: "6px 0", color: T.texto }}>
                  {resultado.nombre}
                </h2>
                <p style={{ fontStyle: "italic", fontSize: 17, color: T.textoSuave }}>"{resultado.slogan}"</p>
              </Card>

              <Card span={2} theme={T}>
                <TagMono theme={T}>PROPÓSITO</TagMono>
                <p style={{ fontSize: 14, marginTop: 8, color: T.texto }}>{resultado.proposito}</p>
              </Card>
              <Card span={2} theme={T}>
                <TagMono theme={T}>PERSONALIDAD DE MARCA</TagMono>
                <p style={{ fontSize: 14, marginTop: 8, color: T.texto }}>{resultado.personalidad}</p>
              </Card>

              <Card span={3} theme={T}>
                <TagMono theme={T}>PALETA</TagMono>
                <div style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
                  {resultado.paleta.map((c) => (
                    <div key={c.hex} style={{ textAlign: "center" }}>
                      <div style={{ width: 52, height: 52, background: c.hex, borderRadius: 8, border: `1px solid ${T.linea}` }} />
                      <p style={{ fontSize: 11, marginTop: 6, color: T.texto }}>{c.nombre}</p>
                      <p style={{ fontFamily: fontMono, fontSize: 10, color: T.textoSuave }}>{c.hex}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card span={1} theme={T}>
                <TagMono theme={T}>TIPOGRAFÍA</TagMono>
                <p style={{ fontSize: 13, lineHeight: 1.5, marginTop: 8, color: T.texto }}>{resultado.tipografia}</p>
              </Card>

              <Card span={2} theme={T}>
                <TagMono theme={T}>CONCEPTO DE LOGO</TagMono>
                <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 10, color: T.texto }}>{resultado.concepto_logo}</p>
                <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                  {resultado.paleta.slice(0, 2).map((c) => (
                    <div key={c.hex} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 4, background: c.hex, border: `1px solid ${T.linea}` }} />
                      <span style={{ fontSize: 12, color: T.textoSuave }}>{c.nombre}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card span={2} theme={T}>
                <TagMono theme={T}>EXPERIENCIA DE MARCA</TagMono>
                <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 10, color: T.texto }}>{resultado.experiencia_de_marca}</p>
              </Card>

              <Card span={3} theme={T}>
                <TagMono theme={T}>TONO DE VOZ</TagMono>
                <p style={{ fontSize: 14, marginTop: 10, color: T.texto }}>{resultado.tono_de_voz}</p>
                <div style={{ marginTop: 12, padding: 14, background: T.azulSuave, borderRadius: 8, fontStyle: "italic", fontSize: 14, color: T.texto }}>
                  "{resultado.frase_ejemplo}"
                </div>
              </Card>

              <Card span={1} theme={T}>
                <TagMono theme={T}>CANALES</TagMono>
                <ul style={{ fontSize: 12.5, lineHeight: 1.8, paddingLeft: 16, marginTop: 8, color: T.texto }}>
                  {resultado.canales.map((c, i) => (<li key={i}>{c}</li>))}
                </ul>
              </Card>

              <Card span={4} theme={T}>
                <TagMono theme={T}>APLICACIONES SUGERIDAS</TagMono>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 10 }}>
                  {resultado.aplicaciones.map((a, i) => (
                    <div key={i} style={{ border: `1px dashed ${T.linea}`, borderRadius: 8, padding: 12, fontSize: 12.5, background: T.bg, color: T.texto }}>
                      {a}
                    </div>
                  ))}
                </div>
              </Card>

              <Card span={2} theme={T}>
                <TagMono theme={T} style={{ color: T.azul }}>HACER</TagMono>
                <ul style={{ fontSize: 13, lineHeight: 1.7, paddingLeft: 18, marginTop: 8, color: T.texto }}>
                  {resultado.hacer.map((h, i) => (<li key={i}>{h}</li>))}
                </ul>
              </Card>
              <Card span={2} theme={T}>
                <TagMono theme={T} style={{ color: T.naranja }}>EVITAR</TagMono>
                <ul style={{ fontSize: 13, lineHeight: 1.7, paddingLeft: 18, marginTop: 8, color: T.texto }}>
                  {resultado.evitar.map((e, i) => (<li key={i}>{e}</li>))}
                </ul>
              </Card>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

function Card({ children, span = 1, theme }) {
  return (
    <div style={{ gridColumn: `span ${span}`, background: theme.card, borderRadius: 14, padding: 22, border: `1px solid ${theme.linea}`, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      {children}
    </div>
  );
}

function TagMono({ children, style, theme }) {
  return (
    <p style={{ fontFamily: fontMono, fontSize: 10.5, letterSpacing: 1.2, color: theme.textoSuave, textTransform: "uppercase", margin: 0, ...style }}>
      {children}
    </p>
  );
}

const labelStyle = (T) => ({
  display: "block", fontFamily: fontMono, fontSize: 10.5, letterSpacing: 1,
  color: T.textoSuave, textTransform: "uppercase", marginBottom: 6,
});

const inputStyle = (T) => ({
  width: "100%", fontFamily: fontBody, fontSize: 13.5, padding: 10, borderRadius: 6,
  border: `1px solid ${T.linea}`, background: T.card, color: T.texto,
  boxSizing: "border-box", resize: "vertical",
});