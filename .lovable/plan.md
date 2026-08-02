# Atualização de equipe, performance adaptativa e redesign visual

## 1. Equipe (fotos e cargos)

Fotos novas aplicadas por nome de arquivo:
- Samuca, Zark, Thugo, Melo — avatares substituídos
- Syntax — avatar animado (GIF); cargo passa a "Lead Dev · Programador"
- Poli — novo avatar (`god_poli`)
- Marpuf — arquivo é vídeo (MP4): exibido como `<video>` mudo, em loop, com fallback de imagem
- Eater — novo membro, "Game Designer"
- Japa — removido

## 2. Cards dos membros (redesign)

- Cards maiores: grid de 2 colunas no tablet e 3 no desktop (em vez de 4), altura maior e respiro interno
- Avatar maior, formato arredondado grande em vez do círculo pequeno; nome em display maior
- Camadas: fundo com a "vibe" de cor do membro, moldura fina dupla, marcador de índice e etiqueta de função
- Hover/toque: elevação, brilho passando pela borda, leve zoom do avatar — animações com spring, sem tremer
- Estrutura preparada para expansão futura (espaço para links, bio e destaque de membro), com o card já isolado em componente próprio

## 3. Fundo líquido mais bonito e mais reativo

- Resposta ao ponteiro muito mais forte: raio de influência maior, deformação e redemoinho visíveis, rastro que segue o cursor com inércia
- Ripples de toque mais amplos e duradouros no mobile
- Paleta com mais profundidade: veios de cor, brilho suave em volta do cursor, variação lenta de tom
- Continua ligado ao tema claro/escuro

## 4. Sistema de otimização com mais níveis

Substituir os 3 níveis (high/medium/low) por um sistema de perfis:

| Perfil | Como é escolhido | O que muda |
|---|---|---|
| ultra | desktop potente, tela grande, alta memória | shader completo, 60fps, resolução alta |
| high | desktop/laptop comum, iPhone recente | shader completo, 60fps, resolução média |
| balanced | celulares medianos | menos detalhe no shader, 45fps |
| eco | celulares fracos | shader simples, 30fps, resolução baixa |
| minimal | aparelhos muito antigos, pouca memória | gradiente animado em CSS, sem WebGL |
| static | `prefers-reduced-motion` ou bateria fraca | fundo parado |

Sinais usados: número de núcleos, memória, tipo de ponteiro, largura de tela, GPU reportada, nível de bateria e preferência de movimento reduzido. Além disso, um controle automático em tempo real: se os quadros caírem, o site desce de perfil sozinho; se sobrar folga, volta a subir.

## 5. Descarregar seções fora da tela

Cada seção passa a ser um "palco" observado:
- Fora da tela: animações pausadas, timers e efeitos parados, conteúdo pesado desmontado após uma margem de segurança
- Ao voltar: remonta e reproduz a animação de entrada imediatamente
- O fundo líquido também pausa quando a aba está oculta ou quando nenhuma seção visível precisa dele
- Alturas reservadas para não haver salto de scroll (evita o bug de "teleporte")

## 6. Transições de cor entre seções

- Gradiente de ponte no topo e na base de cada seção que troca de tom, para a mudança de cor não ser seca
- Funciona nos temas claro e escuro
- Animações de entrada/saída por seção ao rolar (fade + deslocamento suave), coordenadas com o palco acima

## 7. Título da página inicial

- Tamanho bem maior, ocupando a tela em escala fluida (`clamp`)
- Troca de fonte para um display mais marcante, com peso e espaçamento próprios
- Entrada animada por linha/letra e leve reação ao movimento do mouse

## 8. Banner do Happy Town

- Card redesenhado, proporção cinematográfica consistente (21/9 desktop, 4/3 mobile)
- Moldura dupla fina, marcadores de canto, leve parallax no scroll
- Título e status "In production" numa faixa inferior legível, sem fade quebrado

## 9. Organização de pastas

- `src/components/site/` dividido em `sections/` e `ui/`
- Novo `src/components/perf/` para o palco de seções e o controle de perfis
- `src/assets/index.ts` atualizado; ponteiro do Japa removido

## Detalhes técnicos

- Novos avatares enviados como assets de CDN (`.asset.json`), incluindo o MP4
- `use-device-tier` reescrito como `usePerfProfile` com detecção por sinais + monitor de FPS e histerese
- Palco de seções via `IntersectionObserver` com `rootMargin` generoso e `content-visibility` apenas onde não quebra o scroll
- Shader do fundo com uniforms extras (força do ponteiro, rastro, ripples maiores) e contagem de octaves por perfil
- `prefers-reduced-motion` respeitado em todas as animações novas
