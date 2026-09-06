import { useEffect, useRef, useState } from "react";

import {
  DEFAULT_CONTENT,
  useSiteContent,
  type SiteContent,
  type Stat,
} from "@/lib/site-content";
import type { Dev, DevColor } from "@/data/studio";

/**
 * Secret hub — a client-side content editor.
 *
 * Opened by a discreet mark in the footer, unlocked with a passphrase.
 * This is obfuscation, not security: nothing sensitive lives here, and every
 * edit is stored in this browser only. "Export" produces the JSON that turns
 * an edit into the site's real content.
 */

const PASSWORD = "six6bullets";

const COLORS: DevColor[] = [
  "wine",
  "butter",
  "sage",
  "blush",
  "sky",
  "plum",
  "teal",
  "coral",
  "moss",
  "amber",
  "lilac",
];

const TAGS: Dev["tag"][] = ["Founders", "Management", "Dev", "Art", "Audio"];

type Tab = "crew" | "text" | "colors" | "stats" | "data";

const field =
  "w-full rounded-md border border-ink/25 bg-cream px-2.5 py-1.5 font-sans text-sm text-ink outline-none focus:border-wine";
const label = "font-mono text-[9px] uppercase tracking-[0.22em] text-ink/60";
const btn =
  "rounded-md border border-ink/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink hover:bg-ink/5";

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = () => reject(new Error("read failed"));
    fr.readAsDataURL(file);
  });
}

export function SecretHub() {
  const { content, setContent, reset, paletteEnabled, setPaletteEnabled } = useSiteContent();
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<Tab>("crew");
  const [notice, setNotice] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const patch = (part: Partial<SiteContent>) => setContent({ ...content, ...part });

  const setDev = (i: number, next: Partial<Dev>) => {
    const devs = content.devs.map((d, di) => (di === i ? { ...d, ...next } : d));
    patch({ devs });
  };

  const moveDev = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= content.devs.length) return;
    const devs = [...content.devs];
    const a = devs[i]!;
    devs[i] = devs[j]!;
    devs[j] = a;
    patch({ devs });
  };

  const flash = (msg: string) => {
    setNotice(msg);
    window.setTimeout(() => setNotice(null), 2600);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "six-bullets-content.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text()) as SiteContent;
      setContent({ ...DEFAULT_CONTENT, ...parsed });
      flash("Conteúdo importado.");
    } catch {
      flash("Arquivo inválido.");
    }
  };

  return (
    <>
      {/* discreet trigger, bottom-right of the last section */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Six Bullets"
        className="ml-auto block select-none font-mono text-[9px] uppercase tracking-[0.3em] text-ink/25 transition-colors hover:text-ink/70"
      >
        Six Bullets
      </button>

      {open && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-ink/70 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-4xl rounded-2xl border border-ink/20 bg-cream p-5 shadow-2xl md:p-7">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="font-display text-3xl italic text-ink">Hub</h2>
              <button type="button" className={btn} onClick={() => setOpen(false)}>
                Fechar
              </button>
            </div>

            {!unlocked ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (pass === PASSWORD) {
                    setUnlocked(true);
                    setError(false);
                  } else {
                    setError(true);
                  }
                }}
                className="space-y-3"
              >
                <label className={label} htmlFor="hub-pass">
                  Senha
                </label>
                <input
                  id="hub-pass"
                  type="password"
                  autoFocus
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className={field}
                />
                {error && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-wine">
                    Senha incorreta
                  </p>
                )}
                <button type="submit" className={btn}>
                  Entrar
                </button>
              </form>
            ) : (
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["crew", "Equipe"],
                      ["text", "Textos"],
                      ["colors", "Cores"],
                      ["stats", "Números"],
                      ["data", "Salvar"],
                    ] as [Tab, string][]
                  ).map(([id, name]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setTab(id)}
                      className={`${btn} ${tab === id ? "border-ink bg-ink text-cream" : ""}`}
                    >
                      {name}
                    </button>
                  ))}
                </div>

                {notice && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70">
                    {notice}
                  </p>
                )}

                {tab === "crew" && (
                  <div className="space-y-3">
                    {content.devs.map((d, i) => (
                      <div
                        key={`${d.name}-${i}`}
                        className="grid grid-cols-1 gap-2 rounded-xl border border-ink/15 p-3 md:grid-cols-12"
                      >
                        <div className="md:col-span-3">
                          <span className={label}>Nome</span>
                          <input
                            className={field}
                            value={d.name}
                            onChange={(e) => setDev(i, { name: e.target.value })}
                          />
                        </div>
                        <div className="md:col-span-4">
                          <span className={label}>Cargo</span>
                          <input
                            className={field}
                            value={d.role}
                            onChange={(e) => setDev(i, { role: e.target.value })}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <span className={label}>Grupo</span>
                          <select
                            className={field}
                            value={d.tag}
                            onChange={(e) => setDev(i, { tag: e.target.value as Dev["tag"] })}
                          >
                            {TAGS.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <span className={label}>Cor</span>
                          <select
                            className={field}
                            value={d.color}
                            onChange={(e) => setDev(i, { color: e.target.value as DevColor })}
                          >
                            {COLORS.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-end gap-1 md:col-span-1">
                          <button type="button" className={btn} onClick={() => moveDev(i, -1)}>
                            ↑
                          </button>
                          <button type="button" className={btn} onClick={() => moveDev(i, 1)}>
                            ↓
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 md:col-span-12">
                          {d.avatar && !d.video && (
                            <img
                              src={d.avatar}
                              alt=""
                              className="size-10 rounded-md object-cover"
                            />
                          )}
                          <label className={`${btn} cursor-pointer`}>
                            Trocar foto
                            <input
                              type="file"
                              accept="image/*,video/mp4"
                              className="hidden"
                              onChange={async (e) => {
                                const f = e.target.files?.[0];
                                if (!f) return;
                                const url = await readFileAsDataUrl(f);
                                setDev(i, { avatar: url, video: f.type.startsWith("video") });
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            className={btn}
                            onClick={() =>
                              patch({ devs: content.devs.filter((_, di) => di !== i) })
                            }
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className={btn}
                      onClick={() =>
                        patch({
                          devs: [
                            ...content.devs,
                            { name: "Novo", role: "Cargo", tag: "Dev", color: "wine" },
                          ],
                        })
                      }
                    >
                      + Adicionar membro
                    </button>
                  </div>
                )}

                {tab === "text" && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {(
                      [
                        ["Título 1", content.hero.line1, (v: string) => patch({ hero: { ...content.hero, line1: v } })],
                        ["Título 2", content.hero.line2, (v: string) => patch({ hero: { ...content.hero, line2: v } })],
                        ["Legenda da entrada", content.hero.kicker, (v: string) => patch({ hero: { ...content.hero, kicker: v } })],
                        ["Título do estúdio", content.about.title, (v: string) => patch({ about: { ...content.about, title: v } })],
                        ["Texto do estúdio", content.about.lead, (v: string) => patch({ about: { ...content.about, lead: v } })],
                        ["Texto secundário", content.about.sub, (v: string) => patch({ about: { ...content.about, sub: v } })],
                        ["Título do projeto", content.happyTown.title, (v: string) => patch({ happyTown: { ...content.happyTown, title: v } })],
                        ["Status do projeto", content.happyTown.status, (v: string) => patch({ happyTown: { ...content.happyTown, status: v } })],
                        ["Nota do projeto", content.happyTown.note, (v: string) => patch({ happyTown: { ...content.happyTown, note: v } })],
                        ["Título da equipe", content.team.title, (v: string) => patch({ team: { ...content.team, title: v } })],
                        ["Título do contato", content.contact.title, (v: string) => patch({ contact: { ...content.contact, title: v } })],
                        ["Nota do contato", content.contact.note, (v: string) => patch({ contact: { ...content.contact, note: v } })],
                      ] as [string, string, (v: string) => void][]
                    ).map(([name, value, onChange]) => (
                      <div key={name}>
                        <span className={label}>{name}</span>
                        <input
                          className={field}
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {tab === "colors" && (
                  <div className="space-y-4">
                    <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
                      <input
                        type="checkbox"
                        checked={paletteEnabled}
                        onChange={(e) => setPaletteEnabled(e.target.checked)}
                      />
                      Usar minhas cores
                    </label>
                    {(["light", "dark"] as const).map((mode) => (
                      <div key={mode} className="rounded-xl border border-ink/15 p-3">
                        <p className={label}>{mode === "light" ? "Tema claro" : "Tema escuro"}</p>
                        <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-4">
                          {(["cream", "paper", "ink", "wine"] as const).map((token) => (
                            <div key={token}>
                              <span className={label}>{token}</span>
                              <input
                                type="color"
                                className="h-9 w-full rounded-md border border-ink/25 bg-cream"
                                value={content.palette[mode][token]}
                                onChange={(e) =>
                                  patch({
                                    palette: {
                                      ...content.palette,
                                      [mode]: {
                                        ...content.palette[mode],
                                        [token]: e.target.value,
                                      },
                                    },
                                  })
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {tab === "stats" && (
                  <div className="grid gap-3 md:grid-cols-2">
                    {content.about.stats.map((s, i) => (
                      <div key={i} className="rounded-xl border border-ink/15 p-3">
                        <span className={label}>Valor</span>
                        <input
                          className={field}
                          value={s.value}
                          onChange={(e) => {
                            const stats: Stat[] = content.about.stats.map((it, ix) =>
                              ix === i ? { ...it, value: e.target.value } : it,
                            );
                            patch({ about: { ...content.about, stats } });
                          }}
                        />
                        <span className={label}>Rótulo</span>
                        <input
                          className={field}
                          value={s.label}
                          onChange={(e) => {
                            const stats: Stat[] = content.about.stats.map((it, ix) =>
                              ix === i ? { ...it, label: e.target.value } : it,
                            );
                            patch({ about: { ...content.about, stats } });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {tab === "data" && (
                  <div className="space-y-4">
                    <p className="max-w-xl text-sm leading-relaxed text-ink/70">
                      Tudo que você edita fica salvo neste aparelho. Para valer para todos os
                      visitantes, exporte o arquivo e me envie (ou substitua no seu GitHub).
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" className={btn} onClick={exportJson}>
                        Exportar
                      </button>
                      <button
                        type="button"
                        className={btn}
                        onClick={() => fileRef.current?.click()}
                      >
                        Importar
                      </button>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="application/json"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) void importJson(f);
                        }}
                      />
                      <button
                        type="button"
                        className={btn}
                        onClick={() => {
                          reset();
                          flash("Voltou ao original.");
                        }}
                      >
                        Restaurar original
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
