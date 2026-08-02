# Atualização de equipe, transições e banner do Happy Town

## 1. Equipe (fotos e cargos)

Novas fotos enviadas, aplicadas por nome de arquivo:
- Samuca, Zark, Thugo, Melo — substituir avatares atuais
- Syntax — novo avatar animado (GIF), cargo passa a "Lead Dev · Programador"
- Poli — novo avatar (`god_poli`)
- Marpuf — arquivo enviado é vídeo (MP4); será exibido como `<video>` mudo/em loop dentro do círculo do card, com fallback para imagem se não carregar
- Eater — novo membro, "Game Designer"
- Japa — removido do time

Total passa de 14 para 14 (sai Japa, entra Eater).

## 2. Transição de cor entre seções

Hoje a mudança de fundo entre "Infos do studio" → "Current project" → "Equipe" é seca. Vou:
- Padronizar um utilitário de "bridge" (gradiente vertical) aplicado no topo e na base de cada seção que troca de tom
- Substituir fundos sólidos (`bg-paper/70` etc.) por gradientes suaves que iniciam e terminam na cor da seção vizinha
- Garantir que funcione nos dois temas (claro e escuro)

## 3. Banner do Happy Town

Redesenho da seção:
- Card com moldura mais estreita e proporção cinematográfica consistente (21/9 no desktop, 4/3 no mobile, sem corte estranho)
- Imagem com leve zoom em scroll (parallax discreto) e cantos/marcadores no estilo do restante do site
- Título e status ("In production") reorganizados em uma faixa inferior legível, em vez de flutuando sobre a arte
- Sem máscara/fade quebrado; borda dupla fina + sombra suave

## 4. Organização de pastas

- `src/components/site/` dividido em `sections/` (Hero, About, HappyTown, Team, Contact) e `ui/` (SectionHeader, Marquee)
- Dados do time em `src/data/` mantidos, com o tipo `Dev` estendido para suportar avatar em vídeo
- Registro central de assets em `src/assets/index.ts` atualizado com os novos arquivos; ponteiros de assets obsoletos (Japa) removidos

## Detalhes técnicos

- Novos avatares subidos como CDN assets (`.asset.json`) via lovable-assets; o MP4 do Marpuf também
- `Team.tsx` ganha um componente `Avatar` que escolhe `<img>` ou `<video autoplay muted loop playsinline>` conforme o tipo do asset
- Gradientes de transição em `src/styles.css` como `@utility`, usando tokens semânticos existentes
