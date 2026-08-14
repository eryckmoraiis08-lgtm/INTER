# Design do aplicativo — Notificação Premium

## Direção visual

O aplicativo será uma ferramenta de composição rápida de notificações locais com aparência de produto nativo do iOS. A experiência será pensada para **orientação portrait**, uso por uma mão e leitura imediata. A linguagem visual combina superfícies claras, azul-petróleo como cor de ação e um acento violeta discreto para comunicar tecnologia sem parecer genérico.

A interface usará hierarquia tipográfica forte, cartões com cantos arredondados, espaçamento generoso e feedback tátil/visual nas ações principais. O conteúdo mais importante — título, assunto e botão de emissão — ficará no terço inferior e central da tela para facilitar o alcance do polegar.

## Lista de telas

| Tela | Conteúdo principal | Funcionalidade |
|---|---|---|
| Compor notificação | Cabeçalho, status de permissão, campos de título e assunto, pré-visualização e botão de emissão | Editar os dados, solicitar permissão e emitir uma notificação local imediatamente |
| Histórico | Lista das notificações emitidas com título, assunto e horário | Consultar emissões recentes, reutilizar uma composição e limpar o histórico local |
| Ajustes | Estado da permissão e preferências locais | Abrir as configurações do sistema quando a permissão estiver bloqueada e alternar preferências de feedback |
| Pré-visualização | Cartão visual semelhante a um banner de notificação do iOS | Conferir como título e assunto aparecerão antes de emitir |

## Tela principal — Compor notificação

A tela principal terá um fundo em tom marfim azulado, com uma faixa de destaque superior em azul profundo e um pequeno símbolo de sino dentro de um círculo translúcido. O cabeçalho exibirá “Criar notificação” e a mensagem curta “Uma mensagem pronta para chegar na hora certa”.

Logo abaixo, um cartão compacto indicará o estado das permissões com ícone, texto e ação contextual. Se a permissão estiver pendente, o cartão exibirá “Ative as notificações para começar”. Se estiver autorizada, exibirá “Notificações prontas” com um indicador verde.

O formulário será composto por dois campos de alto contraste: **Título da notificação** e **Assunto da notificação**. O título terá limite de 60 caracteres; o assunto terá limite de 140 caracteres. Cada campo terá label persistente, placeholder específico e contador de caracteres. O teclado deve oferecer avanço lógico entre os campos e a ação “Concluído” no último.

A pré-visualização aparecerá em um cartão de sistema com ícone do aplicativo, título em negrito, assunto em duas linhas e horário “agora”. O botão primário fixo na parte inferior será “Emitir notificação”, com ícone de sino e feedback de pressão. A ação ficará desabilitada somente quando o título ou assunto estiverem vazios.

## Tela Histórico

A tela apresentará uma lista vertical de cartões compactos, organizada da emissão mais recente para a mais antiga. Cada cartão mostrará o título, o assunto, o horário e um botão discreto para reutilizar a composição. O estado vazio explicará que as notificações emitidas aparecerão ali após o primeiro envio.

## Tela Ajustes

A tela exibirá uma seção de status do sistema, uma linha com “Permissão de notificações” e um botão “Abrir Ajustes” quando necessário. Outra seção conterá a preferência “Feedback tátil ao emitir”, habilitada por padrão, e uma ação destrutiva secundária para limpar o histórico local com confirmação.

## Fluxos principais

### Emitir uma notificação

1. A pessoa abre o aplicativo e visualiza a tela “Compor”.
2. Toca no campo de título e informa o título desejado.
3. Avança para o campo de assunto e informa a mensagem.
4. Confere a pré-visualização no cartão de sistema.
5. Toca em “Emitir notificação”.
6. Se a permissão ainda não foi concedida, o aplicativo solicita autorização antes de continuar.
7. A notificação local é agendada para o próximo instante, o histórico é salvo e uma confirmação visual aparece.

### Reutilizar uma notificação

1. A pessoa abre “Histórico”.
2. Toca no botão de reutilização de um cartão.
3. O aplicativo retorna à tela “Compor” preenchendo título e assunto.
4. A pessoa edita os campos e emite uma nova notificação.

### Resolver permissão bloqueada

1. A pessoa acessa “Ajustes” ou toca no cartão de status da tela principal.
2. O aplicativo informa que as notificações estão bloqueadas.
3. A pessoa toca em “Abrir Ajustes”.
4. O sistema abre a página de configurações do aplicativo.

## Cores de marca

| Token | Cor | Uso |
|---|---|---|
| Azul profundo | `#102A43` | Cabeçalho, textos de maior ênfase e identidade |
| Azul-petróleo | `#0F766E` | Ação primária, foco e estados ativos |
| Azul névoa | `#E8F1F5` | Fundo principal e áreas de respiro |
| Branco suave | `#FFFFFF` | Cartões, campos e superfícies elevadas |
| Violeta tecnológico | `#6D5DF5` | Detalhes de destaque e ícones secundários |
| Verde confirmação | `#2E9B68` | Permissão ativa e sucesso |
| Grafite | `#17212B` | Texto principal |
| Cinza ardósia | `#617181` | Texto auxiliar e placeholders |
| Linha pálida | `#D7E1E8` | Bordas, divisores e estados inativos |
| Vermelho coral | `#C94B5A` | Limpeza de histórico e erros |

## Acessibilidade e comportamento

A área mínima de toque será de 44 por 44 pontos. O contraste entre texto e fundo será mantido alto, os campos terão labels visíveis e a mensagem de sucesso não dependerá apenas de cor. A interface respeitará áreas seguras do iPhone, Dynamic Type dentro de limites razoáveis e modo escuro por meio de tokens equivalentes mais profundos.
