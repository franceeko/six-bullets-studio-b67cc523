# Fundo, altar mobile e entrada do site

## 1. Fundo líquido: parar de morrer e parar de pixelar

Três problemas separados, três correções:

- **Para de funcionar depois de um tempo (alt-tab / mouse pra fora).** Você está certo: o ponto que o shader segue (o "sensor" do mouse) não é limitado à tela, então quando o cursor sai da janela ou você move muito rápido ele fica com uma posição fora dos limites e o campo de ondas vira uma mancha parada. Junto disso, os eventos `blur`/`pointerleave` pausam o loop e, se o `focus` não chegar (alt-tab, troca de janela, voltar de outra aba), nada retoma. Correções: travar a posição do ponteiro dentro da tela (clamp) e ignorar valores inválidos; no `pointerleave`/`blur` puxar o alvo de volta suavemente para o centro em vez de congelar; retomar o loop por `visibilitychange`, `focus`, `pageshow` **e** no primeiro `pointermove`/`touchstart` depois de pausado, com um guarda que impede pausas empilhadas. Além disso: piso de qualidade (nunca abaixo de `eco`) para o watchdog não zerar o fundo, e recriação real de shader/programa/uniforms no `webglcontextrestored` em vez de só reexibir o canvas.
- **Pixelado no celular.** O tier mobile renderiza a 0,34–0,5 da resolução e o navegador estica. Subo o piso de resolução no mobile (`eco` 0,7 / `minimal` 0,55) e reduzo custo pelo lado do FPS e do número de ondas, que pesam mais que os pixels. Resultado: mais suave e menos serrilhado, sem gastar mais GPU.
- **Fica feio quando desce muito.** O gradiente/vinheta é fixo na tela, então nas seções de baixo o fundo vira uma mancha cinza chapada. Vou ligar uma leve variação vertical ao scroll (deslocamento do campo de ondas) para o fundo continuar tendo desenho lá embaixo.
- **Clique 20% mais fraco**: amplitude do ripple e o "press" do ponteiro reduzidos em 20%.

## 2. Equipe: altar no PC, lista limpa no celular

- **Desktop (≥ md)**: mantém o altar atual, que você aprovou.
- **Backdrop estilo Akatsuki**: atrás do altar entra um horizonte na paleta do site — silhueta de terreno/colina, lua/disco atrás do centro e névoa baixa, tudo em CSS (sem imagem pesada). No tema claro sai em grafite sobre papel; no escuro, preto com o dourado quente da paleta. Os membros ficam recortados contra esse fundo, como na referência.
- **Mobile**: o altar sai. Entra uma apresentação simples e legível — grade de 2 colunas, foto, nome e função, sem arco, sem névoa, sem escurecer os outros ao passar o dedo.

## 3. Letra do menu bugando

A logo/letra inicial da topbar se desloca com o mouse sem limite, então em movimentos largos ela escapa do lugar. Vou limitar o deslocamento (clamp) e suavizar, para nunca sair da caixa.

## 4. Animação de entrada / reload

Uma abertura curta (~1,1s, uma vez por carregamento): tela na cor do tema com "6B" no centro, uma linha que preenche, e então a cortina sobe revelando o hero já com a animação das letras encadeada. Respeita `prefers-reduced-motion` (nesse caso só um fade rápido).

## 5. Cores das infos do studio

Os quatro cards (14 / 01 / CCU / Visits) hoje usam butter, wine-soft, sage e blush — destoam no escuro e ficam pastel demais no claro. Passam a usar a paleta principal: superfícies neutras cream/ink com um único card em destaque (vinho no claro, dourado no escuro), borda fina e tipografia mantida.

## Detalhes técnicos

- `src/components/layout/LiquidBackground.tsx`: piso de tier, recriação real no `webglcontextrestored`, uniform de scroll, ripple/press ×0,8.
- `src/hooks/usePerfProfile.ts`: `scale` maior nos tiers baixos, `fps` menor para compensar.
- `src/components/site/Team.tsx`: split `useIsMobile()` → `TeamGrid` (mobile) e altar (desktop).
- `src/styles.css`: `.altar-horizon` (silhueta + lua + névoa) via gradientes e `clip-path`; tokens de cor dos cards de stats.
- `src/components/layout/Nav.tsx`: clamp no movimento da letra.
- Novo `src/components/layout/Intro.tsx` montado no `__root`.
- `src/components/site/About.tsx`: novas cores dos cards.
