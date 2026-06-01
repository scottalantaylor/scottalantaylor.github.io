const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#f4f1ea", "#221f1a", "#6f685c"],
  "accent": "#b0552f",
  "nameFont": "Instrument Serif",
  "frame": true,
  "monoValues": true
}/*EDITMODE-END*/;

const PALETTES = [
  ["#f4f1ea", "#221f1a", "#6f685c"], // warm paper
  ["#eceef1", "#1b1f24", "#646b74"], // cool slate
  ["#1a1714", "#ece6da", "#9b9183"], // ink (dark)
];

const ACCENTS = ["#b0552f", "#36506f", "#4a6147", "#7a4a63"];

const NAME_FONTS = ["Instrument Serif", "Newsreader", "Space Grotesk"];

const LINKS = [
  { label: "GitHub",   value: "github.com/scottalantaylor",      href: "https://github.com/scottalantaylor",        glyph: "↗" },
  { label: "LinkedIn", value: "in/scottalantaylor",              href: "https://linkedin.com/in/scottalantaylor",   glyph: "↗" },
  { label: "Email",    value: "scott.alan.taylor@gmail.com",     href: "mailto:scott.alan.taylor@gmail.com",        glyph: "→" },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => { setReady(true); }, []);
  const [bg, ink, muted] = t.palette;
  const isDark = t.palette === PALETTES[2] ||
    (Array.isArray(t.palette) && t.palette[0] === PALETTES[2][0]);

  const vars = {
    "--bg": bg,
    "--ink": ink,
    "--muted": muted,
    "--accent": t.accent,
    "--name-font": `"${t.nameFont}", Georgia, serif`,
    "--name-weight": t.nameFont === "Space Grotesk" ? 600 : 400,
  };

  return (
    <div className={"page" + (ready ? " ready" : "")} data-frame={t.frame} style={vars}>
      <div className="paper">
        <header className="topbar">
          <span className="mark">Scott&nbsp;Taylor</span>
          <span className="mark dim">github.io</span>
        </header>

        <main className="stage">
          <div className="card">
            <div className="portrait">
              <img src="assets/avatar.jpg" alt="Scott Taylor" />
            </div>

            <h1 className="name">Scott Taylor</h1>

            <p className="tag">
              builder of <span className="emph">small useful things</span>
            </p>

            <nav className="links" aria-label="Find me online">
              {LINKS.map((l) => (
                <a key={l.label} className="link" href={l.href}
                   target={l.href.startsWith("mailto") ? undefined : "_blank"}
                   rel="noreferrer">
                  <span className="link-label">{l.label}</span>
                  <span className={"link-value" + (t.monoValues ? " mono" : "")}>{l.value}</span>
                  <span className="link-glyph" aria-hidden="true">{l.glyph}</span>
                </a>
              ))}
            </nav>
          </div>
        </main>

        <footer className="botbar">
          <span className="mark dim">est. for the long haul</span>
          <span className="mark dim">© {new Date().getFullYear()}</span>
        </footer>
      </div>

      <TweaksPanel>
        <TweakSection label="Palette" />
        <TweakColor label="Theme" value={t.palette} options={PALETTES}
                    onChange={(v) => setTweak("palette", v)} />
        <TweakColor label="Accent" value={t.accent} options={ACCENTS}
                    onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Type" />
        <TweakSelect label="Name typeface" value={t.nameFont} options={NAME_FONTS}
                     onChange={(v) => setTweak("nameFont", v)} />
        <TweakToggle label="Monospace details" value={t.monoValues}
                     onChange={(v) => setTweak("monoValues", v)} />
        <TweakSection label="Layout" />
        <TweakToggle label="Editorial frame" value={t.frame}
                     onChange={(v) => setTweak("frame", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
