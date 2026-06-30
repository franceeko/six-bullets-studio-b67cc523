
# Six Bullets Studio — Site

Single-page site (rolagem suave) em TanStack Start, com seções dedicadas, bastante animação e textura, identidade dark + vinho profissional.

## Direção visual

- **Paleta** (dark + vinho + claros):
  - Fundo: `#0b0708` (quase preto com leve toque quente)
  - Superfície: `#15090c`
  - Vinho primário: `#7b1e2b`
  - Vinho destaque/glow: `#a8324a`
  - Off-white texto: `#f3ece6`
  - Cinza suave: `#a89a93`
- **Tipografia**:
  - Display (títulos enormes, impacto cinematográfico): **Fraunces** (serif moderna com pegada editorial cara)
  - UI/corpo (limpa e profissional): **Inter Tight**
  - Acento mono (versão "6B", tags, créditos): **JetBrains Mono**
- **Texturas e efeitos**:
  - Overlay de grão fino animado em todo o site
  - Vinheta sutil nas bordas
  - Ruído + leve gradiente radial vinho atrás do hero
  - Linhas finas divisórias e numeração `001 — SOBRE`, `002 — JOGOS` (estilo editorial)
- **Animações** (framer-motion + CSS):
  - Hero com nome "SIX BULLETS" em letras gigantes entrando uma a uma, com leve parallax no scroll
  - Marquee infinito com "SIX BULLETS • 6B • ROBLOX STUDIO •"
  - Reveal on scroll (fade + slide) em cada seção
  - Hover nos cards de jogos: zoom + tilt sutil + brilho vinho
  - Hover nos devs: foto em escala de cinza → cor + nome desliza
  - Cursor com leve glow vinho (desktop)

## Estrutura das seções

```text
[ Nav fixa minimal: 6B  •  Sobre  Jogos  Equipe  Contato ]

01 HERO
   - "SIX BULLETS" gigante (Fraunces)
   - Sub: "Roblox Studio • Building worlds, one bullet at a time"
   - CTA: "Conheça os jogos" + "Entrar no Discord"
   - Marquee inferior

02 SOBRE
   - Texto curto sobre o studio (placeholder editável)
   - Stats: anos ativos, jogos lançados, players (placeholders)

03 JOGOS / PROJETOS
   - Grid de cards (placeholders com imagens geradas)
   - Cada card: capa, título, status (Em desenvolvimento / Lançado), botão "Jogar no Roblox"

04 EQUIPE (13 devs)
   Ordem solicitada (Zark nos primeiros):
   1. Francez — Founder · Project Manager · UI & Game Designer
   2. Samuca — Founder · Project Manager · Game Designer
   3. Zark — Sub Owner · GFX Artist
   4. Thugo — Server Manager
   5. Marpuf — Community Manager
   6. Yuki — Lead Dev · Modeler
   7. Stray — Lead Dev · Modeler & Builder
   8. Syntax — Programmer
   9. Squidnoodles — Scripter
   10. Thug — Animator
   11. Whirle — Animator
   12. Poli — SFX Artist & Music Composer
   13. Melo — Builder
   14. Japa — Game Designer
   - Cards com avatar placeholder (inicial estilizada), nome, função, tag de categoria (Founders / Management / Dev / Art / Audio)

05 CONTATO
   - Bloco grande com convite pro Discord
   - Links: Discord, X/Twitter, YouTube, Roblox Group (placeholders #)
   - Footer com © Six Bullets + crédito mono
```

## Detalhes técnicos

- **Rotas**: tudo em `src/routes/index.tsx` (single-page com âncoras), `__root.tsx` atualizado com fontes via `<link>` e metadados (title "Six Bullets — Roblox Studio", description, og).
- **Componentes** em `src/components/site/`: `Nav`, `Hero`, `Marquee`, `About`, `Games`, `Team`, `TeamCard`, `Contact`, `Footer`, `GrainOverlay`.
- **Dados** dos devs e jogos em `src/data/studio.ts` (fácil de editar depois).
- **Animação**: instalar `framer-motion`.
- **Fontes**: `@fontsource-variable/fraunces`, `@fontsource-variable/inter-tight`, `@fontsource/jetbrains-mono` importadas em `src/styles.css` via `@import` local (arquivos de pacote, não URL remota), e registradas em `@theme`.
- **Tokens**: paleta vinho registrada em `@theme inline` no `src/styles.css` para virar `bg-wine`, `text-wine-glow`, etc.
- **Imagens**: 3 placeholders de capas de jogos gerados com `imagegen` (estilo cinematográfico dark + vinho); avatares dos devs usam monograma estilizado (sem fotos reais para não inventar rostos).

## Fora do escopo desta versão

- Backend / login / formulário de contato funcional (só links)
- CMS pra editar conteúdo pela UI
- Páginas separadas por jogo (pode virar próximo passo)
