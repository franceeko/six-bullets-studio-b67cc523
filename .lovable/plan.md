
# Six Bullets 2.0 — Editorial + Liquid

Mistura o layout atual (nav, hero, Happy Town, team, contato) com a estrutura **editorial cinematográfica** do site do Dembélé: capítulos numerados, títulos serifados gigantes duplicados, clusters de imagens espalhadas, blocos de stats grandes, muito respiro cream + grão.

## 1. Novo background líquido (o ponto principal)

Trocar as bolas CSS por um **shader WebGL** de verdade, estilo Framer / metaball fluid:

- Novo `LiquidBackground.tsx` usando **OGL** (~4KB, muito mais leve que three.js) — canvas fullscreen fixo, `z-0`.
- Fragment shader com **fbm noise + domain warping** (fluido de verdade que ondula, não bolinhas circulares).
- Cores puxadas dos tokens do site (cream / bone / wine sutil) em vez de preto puro.
- Cursor / touch injeta um "empurrão" no campo de fluxo (uniform `uMouse` com lerp) — reage no desktop **e no mobile** (`pointermove` + `touchmove`).
- Performance:
  - `dpr = min(devicePixelRatio, 1.5)` no desktop, `1` no mobile.
  - Pausa o `requestAnimationFrame` quando aba/scroll fora (IntersectionObserver + `visibilitychange`).
  - Respeita `prefers-reduced-motion` (renderiza 1 frame estático).
- Fallback: se WebGL falhar, cai num gradiente estático cream → paper.

Isso resolve os dois problemas: "líquido de verdade" e "não funciona no mobile".

## 2. Estrutura editorial (inspirada no Dembélé)

Reorganiza a home em **capítulos numerados**, cada um com o mesmo ritmo visual:

```text
00 — INTRO        Hero atual, mais respiro, título duplicado "SIX / BULLETS" em Fraunces gigante
01 — LES RACINES  About do studio como "origem", cluster de 3-4 imagens (banner + prints HT)
02 — LE JEU       Happy Town como capítulo principal, banner + copy editorial + stats
                  (CCU neutro, visitas neutro, jogos lançados)
03 — L'ÉQUIPE     Team (14 devs) com header duplicado + fotos maiores
04 — CONTACT      CTA final "Rejoins la meute" style, links Discord/etc
```

Cada capítulo herda os "moves" do Dembélé:
- Número gigante do capítulo à esquerda (`Fraunces` 200px+, tracking negativo).
- Título duplicado empilhado (segundo com `-webkit-text-stroke` outline, sem fill).
- Cluster assimétrico de imagens (grid quebrado tipo `broken-grid`, com rotações sutis).
- Bloco de stats no fim (número enorme + label mono minúsculo).
- Divisor: linha fina + `— chapitre 0X` em mono.

## 3. Refino visual

- **Grão animado** mais presente (usar o padrão do próprio Dembélé: overlay `.webp` de grain tileado, `mix-blend: multiply`, opacity ~0.12).
- Tipografia: manter Instrument Serif / Fraunces + Space Grotesk, aumentar escalas display (clamp até ~18vw).
- Manter paleta atual (cream/paper/ink/wine) — o líquido dá a cor viva sem precisar de paleta nova.
- Cursor custom mantém, mas some naturalmente no mobile.
- Micro-animações: reveal por linha nos títulos (mask + translateY), stats com counter animado ao entrar no viewport.

## 4. Mobile

- Liquid shader ativo no mobile (dpr=1, resolução reduzida) — testado com `touchmove`.
- Layouts editoriais viram coluna única com o número do capítulo empilhado em cima do título.
- Cursor custom desligado (já é hoje), grão mantém.

## 5. Detalhes técnicos

- Adicionar dependência: `ogl` (~15KB gz, sem React overhead).
- Novo shader em `src/components/site/liquid/fluid.frag.glsl` + hook `useFluidBackground.ts`.
- Refatorar `LiquidBackground.tsx` para montar o canvas OGL, tratar resize, mouse/touch, visibilidade.
- Novo componente `Chapter.tsx` (número + título duplo + slot) reutilizado por About, HappyTown, Team, Contact.
- Novo `Stats.tsx` (grid de números grandes + labels mono) usado no HappyTown e Team.
- CSS: novo utility `.title-outline` (text-stroke), `.chapter-num`, `.broken-grid`; remover `.liquid-blob*` antigo.
- Nenhuma mudança em rotas, dados (`studio.ts`), auth ou backend — puramente frontend/apresentação.

## Fora de escopo

- Não mexer em conteúdo textual/estrutura de dados dos devs (só apresentação).
- Sem novas páginas/rotas.
- Sem backend/segurança/CMS.
