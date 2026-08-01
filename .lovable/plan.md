# Reestruturação, tema claro/escuro e refino de UI

Faxina geral no projeto + camada visual nova inspirada no v0-compute (bordas definidas, cards com contorno, detalhes finos), tema light/dark com paletas próprias e fundo líquido adaptativo por dispositivo.

## 1. Imagens e organização

Duas coisas do pedido precisam de ajuste porque brigam com a plataforma:

- **`.asset.json`**: são ponteiros para imagens reais já hospedadas no CDN da Lovable (as imagens existem e carregam no localhost). Converter para binários dentro do repo deixa o repositório pesado (o gif do Marpuf sozinho tem 5 MB) e é justamente o oposto da otimização pedida. Mantenho os ponteiros, mas centralizo tudo num único módulo `src/assets/index.ts` para não haver import solto espalhado.
- **`index.html`**: este stack é TanStack Start com SSR — o HTML é gerado por `src/routes/__root.tsx`. Adicionar um `index.html` quebra o build. Em vez disso, reviso o `__root` (lang, meta, fonts, favicon) para cumprir o mesmo papel.

Limpeza que será feita:

- Remover lixo: `src/assets/game-1.jpg`, `game-2.jpg`, `game-3.jpg` (não referenciados em lugar nenhum).
- Estrutura final em `src`: `components/site` (seções), `components/ui` (shadcn), `components/layout` (Nav/Footer/Cursor/Grain), `hooks`, `lib`, `data`, `assets`, `routes`.
- Todos os imports passam a usar `@/*`; nada de caminho relativo confuso.

## 2. Tema claro/escuro na topbar

- Botão de toggle na Nav (ícone sol/lua, com animação de troca).
- **Paleta clara "Cream"**: base creme/paper, tinta quase-preta, acento vinho — o visual atual, refinado.
- **Paleta escura "Ink"**: base grafite profundo, tipografia bone, acento âmbar quente — não é só inverter, é uma paleta desenhada pra ter o mesmo contraste editorial.
- Persistência em `localStorage` + respeito a `prefers-color-scheme`, com script inline anti-flash no `__root`.
- O shader do fundo líquido lê as cores do tema e faz transição suave entre as duas paletas.

## 3. Fundo líquido em todas as páginas + performance por dispositivo

- Fundo movido para o `__root`, logo passa a existir em qualquer rota futura.
- **Detecção de capacidade** (`hardwareConcurrency`, `deviceMemory`, tipo de ponteiro, `prefers-reduced-motion`) classifica o aparelho em três níveis:
  - `high` (PC / iPhone recente): dpr até 1.5, 60fps, ruído com 5 oitavas.
  - `medium` (celular mediano): dpr 1, 30fps, 3 oitavas.
  - `low` (J2/J3, pouca RAM, 2 núcleos): shader desligado, gradiente CSS estático com leve animação — zero custo de GPU.
- **Toque líquido**: `pointerdown/move` injeta um "ripple" no campo de fluxo (empurrão decaindo no tempo), funcionando igual em mouse e dedo.
- Render pausa fora de foco e fora do viewport.

## 4. Refino visual (estilo v0-compute + nosso editorial)

- **Bordas em todo canto**: cards, banner do Happy Town, avatares da equipe e blocos de contato ganham contorno fino consistente, cantos com marcadores em L, e "hairlines" divisórias entre seções.
- Banner do Happy Town: moldura dupla, label mono no canto, hover com leve zoom contido pela borda.
- Cards de membro: contorno + faixa de função no rodapé do card, hover que acende a borda na cor do membro.
- Micro-detalhes: números de capítulo, badges mono uppercase, linhas guia verticais sutis no container.

## 5. Performance e padronização

- Lazy loading das seções pesadas (Team, HappyTown, Contact) via `React.lazy` + `Suspense` com placeholder de mesma altura (sem layout shift).
- Todas as `<img>` com `loading="lazy"`, `decoding="async"` e dimensões definidas; hero fica `eager` com preload.
- Passada de ESLint/Prettier no projeto todo, remoção de imports redundantes, tipagem explícita (sem `any`) nos hooks e no módulo do shader.
- `vite.config.ts` fica como está — é o preset da plataforma e adicionar plugins manualmente duplica o build.

## Fora de escopo

- Sem novas rotas/páginas, backend, login ou CMS.
- Sem mudança nos dados dos devs (só apresentação).
