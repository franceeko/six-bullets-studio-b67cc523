# Correções, mais magia e painel secreto

## 1. Bugs que você apontou

- **Título cortado no Hero**: cada letra hoje vive dentro de uma "janelinha" que corta o que sai dela. Quando o dedo/mouse empurra a letra, ela bate na borda e some pela metade. Correção: a máscara de entrada some assim que a animação termina, e o empurrão do ponteiro passa a acontecer no bloco inteiro do título (com folga nas laterais), nunca letra por letra dentro do recorte.
- **Fundo pixelado no celular**: o fundo é desenhado numa resolução reduzida e depois esticado. Vou subir a resolução base no celular, tirar o teto fixo de nitidez e compensar o custo com menos ondas e menos quadros por segundo — mesma leveza, imagem limpa.
- **Carregamento inicial falho**: a tela de entrada às vezes depende de fontes que demoram e, se algo falha, o site pode ficar preso. Vou reduzir o tempo mínimo, garantir uma saída forçada curta, liberar a rolagem em qualquer cenário e mostrar o conteúdo mesmo se o fundo não carregar.
- **Melo sai da equipe**: removido da lista e da área de membros.

## 2. Revisão geral do front-end

Vou passar por todos os arquivos de tela procurando: erros no console, imagens sem fallback, animações que travam a rolagem, elementos que escapam da largura no celular, contraste fraco nos dois temas, textos de página/compartilhamento e vazamentos de memória (listeners que não são removidos). Depois testo em telas de celular e de computador com capturas reais e corrijo o que aparecer. No fim, listo o que encontrei e o que mudei.

## 3. Mais mágico (estilo cinema/sonho)

- Transições grandes entre seções: cada bloco entra com um véu de luz que se abre, em vez de simplesmente aparecer.
- Textos que se montam: títulos das seções em revelação por palavra, com leve deslocamento de profundidade na rolagem.
- Camadas de profundidade: elementos em velocidades diferentes durante a rolagem, criando sensação de espaço.
- Banner do Happy Town com respiração de luz e uma entrada mais cinematográfica.
- Área da equipe: brilho que acompanha o membro em foco e entrada em cascata.
- Tudo respeitando "reduzir movimento" e desligando efeitos pesados no celular.

## 4. Hub secreta (painel admin)

- No canto inferior direito da última seção, um pequeno "Six Bullets" discreto. Ao clicar, abre um campo de senha (`six6bullets`).
- Com a senha certa, abre o painel em tela cheia com abas:
  - **Equipe**: adicionar, remover, renomear, mudar cargo, cor, ordem e trocar a foto (envio de imagem).
  - **Textos**: título de entrada, textos do estúdio, do Happy Town e do contato.
  - **Cores**: editar a paleta clara e a escura.
  - **Números**: crew, projetos, CCU, visitas.
- **Aviso importante sobre "salvar para todos"**: sem um serviço de servidor, o navegador não consegue gravar nada permanente para outras pessoas — o que for salvo fica só no seu aparelho. Para contornar isso sem custo, o painel terá **Exportar** (baixa um arquivo com todas as suas edições) e **Importar**. Você me envia esse arquivo e eu aplico como conteúdo oficial do site, ou você mesmo substitui o arquivo no seu repositório do GitHub — aí passa a valer para todos os visitantes. Se um dia quiser que salve sozinho para todo mundo, aí sim seria necessário ligar o banco de dados.

## Detalhes técnicos

- `Hero.tsx`: remover `overflow-hidden` por letra após a animação (estado `revealed`), mover o parallax de ponteiro para um wrapper com padding lateral.
- `usePerfProfile.ts`: `eco`/`minimal` com `scale` ~0.9/0.8 e `maxDpr` 1.5; `LiquidBackground.tsx` sem o corte fixo `dprCap = 1` em ponteiro grosso; compensar com `octaves`/`fps`.
- `Intro.tsx`: mínimo 900ms, teto 2000ms, `finally` que sempre restaura `overflow`.
- `studio.ts`: remover Melo; conteúdo passa a vir de um `SiteContentProvider` (contexto) que mescla os padrões do arquivo com o que estiver salvo em `localStorage`.
- Painel em rota própria oculta (`/_hub`, `noindex`) mais o gatilho no rodapé; senha comparada no cliente (é ofuscação, não segurança real — não protege dados sensíveis, e nenhum dado sensível estará ali).
- Imagens enviadas convertidas para data URL e guardadas no mesmo estado; exportação/importação em JSON.
- Cores gravadas como variáveis CSS sobre os tokens existentes, sem cores fixas nos componentes.
