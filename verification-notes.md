# Verificação do preview

Em 12/08/2026, o preview web foi aberto com sucesso após a correção do hook de foco da navegação. A tela principal renderiza o cabeçalho “Criar notificação”, o cartão hero, o estado de permissão, os dois campos editáveis, a pré-visualização, o botão de emissão e as três abas inferiores Compor, Histórico e Ajustes.

O layout observado está coerente com o design portrait: fundo azul névoa, cartão hero azul profundo, superfícies brancas, marca em azul-petróleo, hierarquia tipográfica clara e áreas de toque amplas. No preview web, o estado da permissão aparece como bloqueado porque notificações locais dependem de dispositivo iOS/Android; isso é esperado e não impede o build nativo.

O Metro também indicou apenas avisos não bloqueantes: atualizações recomendadas de versões do Expo, aviso de suporte parcial de expo-notifications na web e depreciações de propriedades de sombra/pointerEvents. TypeScript, lint e testes unitários passaram.


A tela Histórico foi verificada com estado vazio, resumo de zero emissões, ação “Criar primeira notificação” e navegação inferior funcional. A tela Ajustes foi verificada com o status “Bloqueada pelo sistema”, atalho “Abrir Ajustes do dispositivo”, switch de feedback tátil ativo, cartão informativo e versão 1.0.0. Nenhum erro visual bloqueante foi observado no preview.

## Personalização do nome e da imagem — 12/08/2026

A tela Compor foi capturada em viewport mobile 390x844 e renderizou sem falhas visuais. O novo campo “Nome exibido” aparece abaixo do título e assunto, e a área de seleção de imagem segue imediatamente abaixo, mantendo o fluxo acessível por uma mão. Histórico e Ajustes também renderizaram corretamente. O preview agora não usa mais o texto fixo “NOTIFICAÇÃO PREMIUM”: o nome só aparece quando o usuário preencher o campo, e a imagem escolhida substitui o ícone padrão no preview.

A emissão nativa usa o nome preenchido como subtítulo da notificação e adiciona a imagem escolhida como anexo visual no iOS. No Android, o sistema continua usando o ícone nativo configurado para o aplicativo; a seleção é preservada e exibida no preview e no histórico.

## Alerta estilo tela bloqueada do iPhone — 12/08/2026

A nova pré-visualização foi capturada em viewport mobile 390x1600. O card agora usa fundo escuro translúcido, borda clara sutil, cantos arredondados, sombra, ícone à esquerda, remetente branco em destaque, horário “agora”, título em peso forte e assunto em branco suave, reproduzindo a hierarquia visual da referência enviada. A área mantém a observação de que o iOS renderiza a fonte e o cartão final no próprio sistema.

A emissão nativa foi ajustada para usar o nome editável como título principal do conteúdo, o título da mensagem como subtítulo e o assunto como corpo. Isso aproxima a hierarquia do alerta iOS sem tentar substituir o layout controlado pelo sistema.
