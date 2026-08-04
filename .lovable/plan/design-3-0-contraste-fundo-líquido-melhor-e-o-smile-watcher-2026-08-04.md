# Design 3.0 — contraste, fundo líquido melhor e o Smile Watcher em vídeo

## 1. Paleta: sair do "branco lavado"

Hoje o tema claro é quase todo branco em cima de branco (`--cream` 0.985, `--paper` 0.955, bordas a 15%) — em celular com brilho baixo some. E o tema escuro usa âmbar apenas em detalhes.

- **Claro (Grafite):** fundo passa a um cinza-papel levemente mais escuro, superfícies em cinza médio, texto preto puro, bordas de 15% → 26%, textos secundários bem mais escuros. Continua "branco/cinza/preto", mas com hierarquia visível.
- **Escuro (Ouro):** preto profundo real como fundo, superfícies grafite quente, e o dourado promovido de detalhe a cor de destaque principal — títulos com filete dourado, links, números, molduras e o veio do fundo líquido.
- Revisão de todos os lugares que usam `text-ink/40`, `/45`, `/55` (nav, stats, meta do Happy Town): sobem para faixas legíveis (60–75%).

## 2. Fundo líquido: upgrade da versão antiga

Volta a riqueza visual que existia antes (mais camadas de domain warping, veios definidos, granulação viva), mantendo a **velocidade e a força atuais** — reação suave ao dedo/mouse, nada de puxão forte.

- Contraste das faixas aumentado para o líquido aparecer mesmo com brilho baixo.
- Veio dourado no escuro / veio grafite no claro, com brilho pulsando devagar.
- Orçamento de performance intacto: mesmos tiers, mesmo cap de DPR 1 no celular, mesma proteção contra perda de contexto WebGL. O ganho é de cor e definição, não de custo.

## 3. Entrada do site (Hero)

Recomposição da primeira dobra para ela ter presença real em vez de texto solto:

- Título ancorado embaixo à esquerda, escala maior, com o bloco de stats virando uma régua horizontal fina no rodapé da dobra.
- Moldura de borda viva (cantos com ticks) delimitando a dobra inteira, ligando o hero ao resto da linguagem do site.
- Entrada em cascata por linha com máscara de revelação (clip), não fade genérico; respeita `prefers-reduced-motion`.
- Miniatura do Happy Town no hero vira um selo com moldura dourada/grafite em vez do quadradinho atual.

## 4. Smile Watcher — vídeo 2D estilo VANGUARD

A sheet enviada vira um vídeo curto renderizado (MP4, ~10–12s, loop, sem áudio), usando as cores fortes pedidas: preto, osso e dourado-âmbar quente.

Roteiro: escuro total → varredura de scanline revela a silhueta frontal → corte para os closes (rosto, sorriso, mãos) em ritmo rápido com tipografia técnica ("HT_042_01_01", "HEIGHT 2.30 M", "THREAT: HIGH") → rotação entre as 6 vistas como uma folha de estudo → fecha no logo HAPPY TOWN.

- Renderizado com Remotion, fonte versionada em `remotion/`, MP4 publicado como asset.
- Entra na seção 02 (Happy Town) como bloco cinematográfico: autoplay mudo, loop, `playsInline`, poster estático, e no celular/reduced-motion cai para a imagem estática (sem baixar o vídeo).
- A sheet completa fica disponível como imagem de apoio abaixo do vídeo.

## 5. Varredura de erros (toda vez, daqui pra frente)

Antes de encerrar: typecheck, lint, build de produção, erros de runtime no preview, console e requisições de rede, mais uma passada real no viewport de celular (392px) rolando a página inteira. Qualquer erro encontrado é corrigido nesta mesma entrega e reportado.

## Detalhes técnicos

- `src/styles.css`: novos valores OKLCH em `:root` e `.dark`, tokens de borda/muted, utilitário de destaque dourado.
- `src/components/layout/LiquidBackground.tsx`: shader com camada extra de warp e veios paramétricos por tema; sem mudanças em `usePerfProfile.ts`.
- `src/components/site/Hero.tsx`: recomposição + máscaras de revelação.
- `src/components/site/HappyTown.tsx`: bloco de vídeo + sheet.
- Novo: `remotion/` (composição do Smile Watcher) e o MP4 + sheet como assets.
