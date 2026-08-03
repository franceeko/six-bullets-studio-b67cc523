# Estabilidade no celular, fundo mais calmo e redesign de UI (estilo VANGUARD)

Nota sobre o prompt enviado: ele descreve outro site (agência "VANGUARD", com vídeo de fundo em CloudFront e fontes próprias). Vou usá-lo como **referência de linguagem visual e UX** — hierarquia de tipografia enorme, navbar limpa, overlay mobile fullscreen, entradas escalonadas, faixa de stats — e não copiar marca, vídeo nem textos. O Six Bullets continua com identidade própria (cream/ink/wine, tema claro-escuro, fundo líquido) para não parecer nem o Cloudbepp nem o VANGUARD.

## 1. Bug do celular: tela branca e depois cinza (prioridade)

Diagnóstico ainda não confirmado em dispositivo real; as causas prováveis, todas visíveis no código atual, são:

- `LiquidBackground` não trata `webglcontextlost`. Em celular o navegador derruba o contexto WebGL sob pressão de memória; hoje o canvas fica preso, sem fallback — combina com "fica branco, depois cinza".
- O loop de render continua rodando mesmo com a página fora de foco em iOS (só existe `visibilitychange`), sem pausa por `pagehide`/`blur`.
- O `SectionStage` desmonta seções ao sair da tela; em rolagem rápida no celular isso pode deixar telas inteiras vazias e reservar altura errada.
- `content-visibility: auto` (utility `section-lazy`) ainda existe e já causou salto de scroll antes.

Correções:
- Ouvir `webglcontextlost` / `webglcontextrestored`: cancelar o loop, esconder o canvas e cair no gradiente CSS; tentar restaurar uma vez ao voltar. Nunca deixar tela vazia.
- Pausar o loop também em `pagehide`, `blur` e quando o app volta de background.
- Envelopar o app num error boundary de rota já existente + um boundary próprio para o fundo, para que uma falha do WebGL nunca derrube a página.
- No mobile: manter as seções montadas depois da primeira aparição (`once` por padrão em telas coarse) e apenas pausar animações, em vez de desmontar. Acaba o risco de "sumiu tudo".
- Remover o `section-lazy`/`content-visibility` que sobrou.
- Reduzir agressividade no mobile: dpr máximo 1, resolução interna menor, sem grain animado em `pointer: coarse`.

## 2. Fundo líquido mais calmo

Hoje o ponteiro puxa forte demais (swirl 3.2, pull até ~2.85). Vai passar a:
- Reação suave: força de arrasto ~3x menor, redemoinho discreto, raio de influência um pouco mais amplo mas bem mais fraco.
- Inércia mais lenta, sem "chicote" quando o cursor para.
- Ripples de toque mais curtos e sutis.
- Movimento base (tempo) levemente mais lento, para o fundo respirar em vez de ferver.

## 3. Seção 02 — Happy Town refeita

Sai o card com moldura dupla, letterbox e cruzinhas nos cantos (é o que está pesado e confuso). Entra:
- Layout editorial em duas camadas: título "Happy Town" em escala gigante (`clamp`) atravessando a imagem, com a arte em bloco full-bleed contido, cantos suaves e uma única borda fina.
- Faixa de metadados abaixo em grade: Status (In production), Gênero, Plataforma, Ano — tipografia mono pequena, alinhada em colunas, estilo ficha técnica.
- Parallax leve na arte no scroll (desligado em `prefers-reduced-motion` e em perfis fracos).
- Um CTA discreto "Ver no Discord" alinhado à ficha.
- Sem fade/máscara sobre a imagem (respeitando o pedido antigo).

## 4. Redesign de UI/UX geral (linguagem VANGUARD, marca Six Bullets)

- **Navbar**: altura menor, marca em display, links centrais em mono/uppercase com tracking largo, botão contornado "Discord ↗" à direita, toggle de tema junto. Abaixo de `md`, hambúrguer de três barras (larguras 24/24/16).
- **Menu mobile fullscreen**: overlay `fixed inset-0` com fundo quase opaco e blur, cabeçalho espelhando a navbar com ícone de fechar, links em tipografia display gigante, entrada escalonada (80ms por item), fecha ao clicar.
- **Hero**: título em três linhas curtas de alto impacto (ex.: "We craft. / Psychological. / Horror."), tagline com ícone + texto em tracking `0.3em`, subtexto curto, linha de CTAs e uma faixa de stats reais do estúdio (14 devs · 1 projeto · Roblox) — tudo com entradas escalonadas de 0.2s.
- **Escala tipográfica e espaçamento** unificados em todas as seções (mesmos passos `sm:`/`lg:`), textos mais diretos e menos "cara de IA".
- Transições entre seções mantidas com o `section-bridge`, ajustadas para os dois temas.

## 5. Guardado para depois

Área de membros: apenas ajustes mínimos de espaçamento nesta rodada. O redesign completo dos cards fica para o próximo planejamento, como você pediu.

## Detalhes técnicos

- `LiquidBackground.tsx`: handlers de contexto perdido, pausa por `pagehide`/`blur`, uniforms de reatividade reduzidos, perfil mobile com dpr 1.
- `usePerfProfile.ts`: perfis mobile mais conservadores; `static` também quando o contexto WebGL cair duas vezes.
- `SectionStage.tsx`: modo "mount-once" em telas de toque; altura reservada medida antes de desmontar.
- `styles.css`: remoção de `section-lazy`, grain desligado no mobile, nova escala tipográfica.
- Novos componentes: `components/layout/MobileMenu.tsx`, seção Happy Town reescrita; Hero refeito.
- Sem novas dependências além de `lucide-react` (já disponível) para os ícones.
