# Redes de Computadores e Segurança da Informação na Nuvem

Material de apoio para a aula. Este documento explica os conceitos com mais profundidade e traz uma lista de perguntas com respostas possíveis para revisão e discussão em sala.

> **Aviso educacional:** Todo o conteúdo (incluindo as simulações de ataque do site) é apenas para fins de aprendizado. Nunca aplique técnicas de ataque em sistemas, redes ou dados que não sejam seus ou sem autorização formal por escrito. Praticar ataques sem permissão é crime (no Brasil, Lei 12.737/2012 e Lei 14.155/2021).

---

## Sumário

1. [O que é uma Rede de Computadores](#1-o-que-é-uma-rede-de-computadores)
2. [Como os dados viajam pela rede](#2-como-os-dados-viajam-pela-rede)
3. [Principais conceitos de rede](#3-principais-conceitos-de-rede)
4. [O que é Segurança da Informação](#4-o-que-é-segurança-da-informação)
5. [O que é Computação em Nuvem](#5-o-que-é-computação-em-nuvem)
6. [Segurança na Nuvem](#6-segurança-na-nuvem)
7. [Ataques comuns e defesas](#7-ataques-comuns-e-defesas)
8. [Boas práticas de defesa](#8-boas-práticas-de-defesa)
9. [Glossário rápido](#9-glossário-rápido)
10. [Perguntas e respostas possíveis](#10-perguntas-e-respostas-possíveis)
11. [Como rodar o site](#11-como-rodar-o-site)

---

## 1. O que é uma Rede de Computadores

Uma **rede de computadores** é um conjunto de dispositivos (computadores, celulares, servidores, roteadores, impressoras, câmeras, etc.) conectados entre si para **trocar dados e compartilhar recursos**. Essa conexão pode ser feita por cabos (par trançado, fibra óptica) ou por meio sem fio (Wi-Fi, redes móveis 4G/5G, satélite).

O objetivo de uma rede é permitir **comunicação** e **compartilhamento**: enviar um e-mail, acessar um site, imprimir um documento em uma impressora compartilhada, salvar um arquivo em um servidor ou assistir a um vídeo em streaming são exemplos do dia a dia.

### Tipos de rede por alcance

| Tipo | Nome completo | Alcance | Exemplo |
|------|---------------|---------|---------|
| **PAN** | Personal Area Network | Poucos metros | Fone Bluetooth ligado ao celular |
| **LAN** | Local Area Network | Um prédio/escritório | Rede da sua casa ou empresa |
| **MAN** | Metropolitan Area Network | Uma cidade | Rede que interliga campi de uma universidade |
| **WAN** | Wide Area Network | País/mundo | A própria Internet |

### Topologias comuns

- **Estrela:** todos os dispositivos se conectam a um ponto central (switch/roteador). É a mais usada hoje.
- **Barramento:** todos compartilham um único meio de transmissão (antiga).
- **Anel:** cada dispositivo se conecta ao próximo formando um círculo.
- **Malha (mesh):** vários caminhos redundantes entre os nós, aumenta a tolerância a falhas.

---

## 2. Como os dados viajam pela rede

Quando você envia uma mensagem, ela **não vai inteira de uma vez**. Ela é quebrada em pedaços pequenos chamados **pacotes**. Cada pacote carrega parte dos dados mais informações de controle (endereço de origem, endereço de destino, número de sequência). Os pacotes podem seguir caminhos diferentes e são **remontados na ordem correta** ao chegar ao destino.

Para organizar esse processo, existem **modelos de camadas**. Cada camada tem uma responsabilidade e conversa apenas com a camada equivalente do outro lado.

### Modelo OSI (7 camadas) x TCP/IP (4 camadas)

| OSI | Função | TCP/IP |
|-----|--------|--------|
| 7. Aplicação | Interface com o usuário (HTTP, DNS, e-mail) | Aplicação |
| 6. Apresentação | Formato/criptografia dos dados | Aplicação |
| 5. Sessão | Abre e mantém conexões | Aplicação |
| 4. Transporte | Entrega confiável, portas (TCP/UDP) | Transporte |
| 3. Rede | Endereçamento e roteamento (IP) | Internet |
| 2. Enlace | Comunicação no meio físico local (MAC) | Acesso à Rede |
| 1. Física | Cabos, sinais elétricos, ondas de rádio | Acesso à Rede |

**Analogia da carta:** o conteúdo é o dado (Aplicação), o envelope com endereço é o IP (Rede), o carteiro que garante a entrega é o TCP (Transporte) e as ruas/estradas são a camada Física.

---

## 3. Principais conceitos de rede

- **Endereço IP:** identificador único de um dispositivo na rede. IPv4 (ex.: `192.168.0.1`) e IPv6 (ex.: `2001:0db8::1`). Pode ser **público** (visível na Internet) ou **privado** (interno à LAN).
- **MAC Address:** identificador físico da placa de rede, gravado de fábrica.
- **Porta:** número que identifica um serviço em um dispositivo. Ex.: **80** (HTTP), **443** (HTTPS), **22** (SSH), **53** (DNS), **25** (SMTP).
- **DNS (Domain Name System):** a "agenda de contatos" da Internet. Traduz nomes (`google.com`) em endereços IP. Sem DNS, você teria que decorar números.
- **Protocolo:** conjunto de regras para a comunicação. Ex.: **HTTP/HTTPS** (web), **TCP** (confiável, com confirmação), **UDP** (rápido, sem confirmação — usado em jogos e streaming).
- **Roteador:** encaminha pacotes entre redes diferentes (ex.: sua LAN e a Internet).
- **Switch:** conecta dispositivos dentro da mesma rede local.
- **Firewall:** filtra o tráfego, permitindo ou bloqueando pacotes conforme regras de segurança.
- **NAT (Network Address Translation):** permite que vários dispositivos com IP privado compartilhem um único IP público.
- **Largura de banda x Latência:** largura de banda é "quanto" cabe no canal; latência é "quanto tempo" o dado leva para chegar.

---

## 4. O que é Segurança da Informação

**Segurança da Informação** é o conjunto de práticas, tecnologias e processos que protegem os dados contra acesso, alteração ou destruição não autorizados. Ela se apoia em três pilares, conhecidos como a **tríade CIA**:

- **Confidencialidade:** apenas quem tem autorização acessa a informação. (Ex.: criptografia, controle de acesso.)
- **Integridade:** a informação não pode ser alterada indevidamente. (Ex.: hashes, assinaturas digitais.)
- **Disponibilidade:** a informação e os serviços ficam acessíveis quando necessários. (Ex.: backups, redundância, proteção contra DDoS.)

Além da tríade, também são importantes:

- **Autenticidade:** garantir que a informação vem de quem diz ser (login, certificados).
- **Não repúdio:** o autor não pode negar que realizou uma ação (logs, assinaturas).

### Conceitos-chave

- **Ameaça:** qualquer coisa que possa causar dano (um hacker, um malware, uma falha).
- **Vulnerabilidade:** uma fraqueza que pode ser explorada (senha fraca, software desatualizado).
- **Risco:** a probabilidade de uma ameaça explorar uma vulnerabilidade x o impacto.
- **Exploit:** o código ou técnica que aproveita uma vulnerabilidade.

---

## 5. O que é Computação em Nuvem

**Computação em nuvem (cloud computing)** é a entrega de recursos de TI (servidores, armazenamento, banco de dados, rede, software) **pela Internet**, sob demanda e com pagamento pelo uso. Em vez de comprar e manter seus próprios servidores, você "aluga" a capacidade de provedores como **AWS, Microsoft Azure e Google Cloud**.

### Modelos de serviço

- **IaaS (Infraestrutura como Serviço):** você aluga máquinas virtuais, rede e armazenamento. Você gerencia o sistema operacional e as aplicações. Ex.: AWS EC2.
- **PaaS (Plataforma como Serviço):** o provedor cuida da infraestrutura e você só se preocupa com o código. Ex.: Vercel, Heroku, App Engine.
- **SaaS (Software como Serviço):** software pronto, acessado pelo navegador. Ex.: Gmail, Google Docs, Dropbox.

### Modelos de implantação

- **Nuvem pública:** recursos compartilhados, do provedor (AWS, Azure).
- **Nuvem privada:** infraestrutura dedicada a uma única organização.
- **Nuvem híbrida:** combinação das duas.

### Vantagens

Escalabilidade (cresce e diminui conforme a demanda), economia (sem grandes investimentos iniciais), disponibilidade global e agilidade para lançar serviços.

---

## 6. Segurança na Nuvem

Migrar para a nuvem **não transfere toda a responsabilidade de segurança para o provedor**. Existe o **Modelo de Responsabilidade Compartilhada**:

- **O provedor (AWS/Azure/GCP) é responsável pela segurança _DA_ nuvem:** data centers físicos, hardware, rede base, hipervisor.
- **O cliente é responsável pela segurança _NA_ nuvem:** configuração dos serviços, dados, controle de acesso (IAM), criptografia, senhas e permissões.

> A maioria dos vazamentos em nuvem acontece por **erro de configuração do cliente** (ex.: um bucket de armazenamento deixado público), não por falha do provedor.

### Pontos essenciais de segurança na nuvem

- **IAM (Identity and Access Management):** defina permissões seguindo o **princípio do menor privilégio** — cada usuário/serviço recebe apenas o acesso estritamente necessário.
- **Buckets e armazenamento:** mantenha privado por padrão, bloqueie acesso público, ative logs de acesso.
- **Criptografia:** dados **em trânsito** (TLS/HTTPS) e **em repouso** (disco criptografado).
- **MFA (autenticação multifator):** obrigatória para contas administrativas.
- **Monitoramento e logs:** ative auditoria (ex.: AWS CloudTrail) para detectar acessos suspeitos.
- **Backups e redundância:** garanta a disponibilidade mesmo em caso de falha ou ataque.

---

## 7. Ataques comuns e defesas

| Ataque | Como funciona | Como defender |
|--------|---------------|---------------|
| **Phishing** | E-mails/sites falsos que enganam a vítima para roubar credenciais | Desconfiar de links, checar o remetente, usar MFA |
| **DDoS** | Sobrecarrega o servidor com tráfego falso até derrubá-lo | WAF, CDN, filtragem de tráfego, rate limiting |
| **SQL Injection** | Insere comandos SQL maliciosos em campos de entrada | Consultas parametrizadas, validação de entrada, ORM |
| **Força bruta** | Testa milhares de senhas até acertar | Senhas fortes, MFA, bloqueio após tentativas, CAPTCHA |
| **Man-in-the-Middle (MITM)** | Intercepta a comunicação entre duas partes | HTTPS/TLS, VPN, evitar Wi-Fi público sem proteção |
| **Ransomware** | Criptografa os dados e exige resgate | Backups isolados, antivírus, atualizações, treinamento |

---

## 8. Boas práticas de defesa

1. **Senhas fortes e únicas** + gerenciador de senhas.
2. **MFA** em todas as contas importantes.
3. **Atualizações** de sistema e softwares em dia (patches corrigem vulnerabilidades).
4. **Backups** frequentes e testados, de preferência isolados (regra 3-2-1).
5. **Princípio do menor privilégio** para usuários e serviços.
6. **Criptografia** de dados em trânsito e em repouso.
7. **Monitoramento e logs** para detectar incidentes cedo.
8. **Conscientização/treinamento** — o elo mais fraco costuma ser o humano.
9. **Defesa em profundidade** — várias camadas de proteção, não confie em uma só.

---

## 9. Glossário rápido

- **Pacote:** pequena unidade de dados que trafega na rede.
- **Latência:** tempo que um dado leva para ir de um ponto a outro.
- **VPN:** cria um túnel criptografado sobre a Internet.
- **WAF (Web Application Firewall):** firewall focado em proteger aplicações web.
- **CDN:** rede de servidores distribuídos que entrega conteúdo mais rápido e absorve picos de tráfego.
- **Hash:** função que gera uma "impressão digital" de tamanho fixo de um dado, usada para verificar integridade e armazenar senhas.
- **Zero Trust:** modelo de segurança onde nada é confiável por padrão — tudo é verificado.

---

## 10. Perguntas e respostas possíveis

Use estas perguntas para revisão, discussão ou avaliação. As respostas são "possíveis" — incentive os alunos a explicarem com as próprias palavras.

### Redes

**1. O que é uma rede de computadores?**
É um conjunto de dispositivos conectados para trocar dados e compartilhar recursos, por meio de cabos ou sem fio.

**2. Qual a diferença entre LAN e WAN?**
LAN é uma rede local, restrita a um ambiente como uma casa ou escritório. WAN é uma rede de longa distância que interliga redes por cidades ou países — a Internet é o maior exemplo de WAN.

**3. Para que serve o DNS?**
Para traduzir nomes de domínio (como `google.com`) em endereços IP, já que os computadores se comunicam por números, não por nomes.

**4. Qual a diferença entre TCP e UDP?**
TCP é confiável e confirma a entrega dos dados (usado em sites, e-mails). UDP é mais rápido, mas não confirma a entrega (usado em jogos online, chamadas de voz e streaming).

**5. O que é um endereço IP e um MAC address?**
O IP é o endereço lógico do dispositivo na rede (pode mudar). O MAC é o endereço físico da placa de rede, gravado de fábrica (fixo).

**6. Por que os dados são divididos em pacotes?**
Para trafegar de forma mais eficiente e confiável: os pacotes podem seguir caminhos diferentes, e se um se perder, apenas ele precisa ser reenviado, não a mensagem inteira.

**7. O que faz um firewall?**
Filtra o tráfego de rede, permitindo ou bloqueando pacotes conforme regras definidas, protegendo a rede de acessos indesejados.

### Segurança da Informação

**8. Quais são os três pilares da segurança da informação (tríade CIA)?**
Confidencialidade (só quem tem permissão acessa), Integridade (o dado não é alterado indevidamente) e Disponibilidade (o dado está acessível quando necessário).

**9. Qual a diferença entre ameaça, vulnerabilidade e risco?**
Ameaça é o que pode causar dano; vulnerabilidade é a fraqueza que pode ser explorada; risco é a probabilidade de a ameaça explorar a vulnerabilidade combinada ao impacto.

**10. O que é MFA e por que é importante?**
Autenticação multifator exige mais de uma prova de identidade (ex.: senha + código no celular). Mesmo que a senha seja roubada, o atacante ainda não consegue entrar.

**11. Por que uma senha forte é importante e o que a torna forte?**
Porque dificulta ataques de força bruta. Uma senha forte é longa, mistura letras maiúsculas/minúsculas, números e símbolos, e não usa dados óbvios ou palavras comuns.

### Nuvem

**12. O que é computação em nuvem?**
É a entrega de recursos de TI (servidores, armazenamento, software) pela Internet, sob demanda, com pagamento pelo uso, sem precisar manter a própria infraestrutura.

**13. Explique a diferença entre IaaS, PaaS e SaaS.**
IaaS entrega infraestrutura (máquinas virtuais); PaaS entrega uma plataforma pronta para você só subir o código; SaaS entrega o software pronto para uso, acessado pelo navegador.

**14. O que é o Modelo de Responsabilidade Compartilhada?**
O provedor cuida da segurança _da_ nuvem (infraestrutura física, hardware) e o cliente cuida da segurança _na_ nuvem (configurações, dados, acessos, senhas).

**15. Por que a maioria dos vazamentos na nuvem acontece?**
Por erro de configuração do cliente, como deixar um bucket de armazenamento público, e não por falha do provedor.

**16. O que é o princípio do menor privilégio?**
Conceder a cada usuário ou serviço apenas as permissões estritamente necessárias para realizar suas tarefas, reduzindo o impacto de um comprometimento.

### Ataques e Defesa

**17. Como funciona um ataque de phishing e como se proteger?**
O atacante envia mensagens ou cria sites falsos para enganar a vítima e roubar dados. Proteção: desconfiar de links, verificar o remetente, não fornecer dados sensíveis e usar MFA.

**18. O que é um ataque DDoS e como mitigá-lo?**
É a sobrecarga de um servidor com tráfego falso vindo de muitas fontes até deixá-lo indisponível. Mitigação: WAF, CDN, rate limiting e filtragem de tráfego.

**19. O que é SQL Injection e qual a principal defesa?**
É a inserção de comandos SQL maliciosos em campos de entrada para manipular o banco de dados. A principal defesa são as consultas parametrizadas (prepared statements) e a validação de entrada.

**20. O que é um ataque Man-in-the-Middle?**
É quando o atacante se posiciona entre duas partes e intercepta a comunicação. Defesa: HTTPS/TLS, VPN e evitar redes Wi-Fi públicas não confiáveis.

**21. O que fazer para se proteger de ransomware?**
Manter backups isolados e testados, atualizar sistemas, usar antivírus e treinar os usuários para não abrir anexos ou links suspeitos.

**22. O que é "defesa em profundidade"?**
É usar várias camadas de segurança independentes, de modo que, se uma falhar, as outras ainda protejam o sistema.

---

## 11. Como rodar o site

O site é feito em HTML, CSS e JavaScript puros.

```bash
# instalar dependências (apenas um servidor estático)
pnpm install

# rodar localmente
pnpm dev
```

Depois, acesse o endereço mostrado no terminal (por padrão `http://localhost:3000`). Os arquivos ficam na pasta `public/`:

- `index.html` — estrutura e conteúdo
- `styles.css` — tema visual (hacker/terminal)
- `script.js` — interatividade, simulações e quiz

---

**Bom estudo! Lembre-se: conhecimento de segurança deve ser usado para proteger, nunca para atacar.**
