# Design 4.0 — Título gigante, fundo de água de verdade e Altar da equipe

Reset do visual: fora o Smile Watcher, fora o excesso de texto na entrada, e o fundo líquido refeito do zero.

## 1. Hero — um título gigante e só

Tudo o que não é essencial sai da primeira tela. A entrada passa a ser:

- **SIX BULLETS** ocupando praticamente a largura toda da tela, em duas linhas, escala fluida (bem maior que hoje).
- Uma linha curta embaixo: "Roblox Horror Studio" + link para o projeto. Nada de stats, ticks, molduras e três blocos de texto.
- Animação de entrada: cada letra sobe atrás de uma máscara, com pequeno atraso entre elas, e o título "assenta" com um leve overshoot.
- Animação contínua: o título reage ao ponteiro/giroscópio com um deslocamento sutil por letra (efeito de profundidade), e distorce levemente a água atrás dele.
- Scroll: o título encolhe e sai com parallax enquanto a seção seguinte entra.

## 2. Fundo líquido — água, não gelatina

O shader atual é substituído por um de superfície de água:

- Simulação de ondas cruzadas (soma de ondas direcionais + ruído fino) em vez do fbm gorduroso atual — isso é o que dá leitura de "água" e não de gelatina.
- Cáusticas: linhas de luz finas e móveis no fundo, que é o detalhe que o olho reconhece como água.
- Refração: o conteúdo por cima ganha um leve deslocamento óptico nas bordas das ondas.
- Toque/cursor: ondulação circular que se propaga e some naturalmente (ripple com dispersão), em vez do "puxão" atual.
- **Visibilidade**: hoje o fundo quase some nas duas paletas. A amplitude de contraste do fundo sobe bastante — claro = papel com sombras de água nítidas em grafite; escuro = preto com cáusticas douradas visíveis. Ajusto com captura de tela em ambos os temas até ficar claramente visível sem atrapalhar a leitura.
- Mobile continua com resolução reduzida, menos ondas e o mesmo fallback anti-tela-branca.

## 3. Seção 02 — Happy Town só com o banner

- Remoção total do bloco Smile Watcher: vídeo, ficha técnica, specs e o "reference sheet".
- Fica o banner grande do Happy Town, o título e uma frase curta.
- Os assets do Smile Watcher (vídeo, poster, sheet) são apagados do projeto.

## 4. Área da equipe — Altar

Reconstrução total da seção de membros como um **altar** no estilo formação Akatsuki:

- Composição em arco/pirâmide: os 14 membros posicionados em alturas diferentes, não em grade uniforme.
- Cada membro ocupa um "nicho" vertical iluminado por baixo, com a foto no lugar onde entraria o rig R6, nome e função abaixo em mono.
- Névoa baixa cruzando o altar, luz que varre lentamente e reage ao ponteiro; membros ganham realce ao passar o mouse enquanto os outros escurecem.
- Entrada dos nichos escalonada quando a seção aparece.
- **Estrutura preparada para os rigs R6**: cada nicho aceita imagem ou vídeo curto por membro, então quando você mandar os modelos/renders é só trocar a fonte de cada slot — sem refazer a seção.

Sobre a animação dos rigs: dá para animar as partes do corpo de forma fluida se você exportar cada rig como sequência de imagens/vídeo curto, ou como modelo `.glb`/`.fbx` (aí monto uma cena 3D leve por membro). O que **não** dá é ler arquivo `.rbxm` do Roblox Studio direto no site.

## Detalhes técnicos

- `LiquidBackground.tsx`: novo fragment shader (Gerstner-like waves + cáusticas + ripples com dispersão), mantendo os tiers do `usePerfProfile`, o cap de DPR no mobile e o handler de `webglcontextlost`.
- `Hero.tsx`: reescrito, split por caractere, animação por CSS + Framer Motion.
- `HappyTown.tsx`: enxugado para banner + texto; `lovable-assets delete` nos três pointers do Smile Watcher.
- `Team.tsx`: reescrito com layout de altar e slot de mídia por membro em `src/data/studio.ts`.
- Verificação: typecheck, build e Playwright em desktop (1280) e mobile (392px) nos dois temas, com screenshots.
