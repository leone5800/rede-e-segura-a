/* ============================================================
   CyberAula — Redes & Segurança na Nuvem (educacional)
   HTML/CSS/JS puro. Todas as simulações rodam localmente.
============================================================ */
(function () {
  "use strict";
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Matrix background ---------- */
  (function matrix() {
    const canvas = $("#matrix");
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext("2d");
    let cols, drops, fontSize = 14;
    const chars = "01ABCDEFｱｲｳｴｵ<>{}#$%&*/\\|=+".split("");
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = Array(cols).fill(1);
    }
    resize();
    window.addEventListener("resize", resize);
    function draw() {
      ctx.fillStyle = "rgba(10,14,20,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#22e57a";
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }
    setInterval(draw, 55);
  })();

  /* ---------- Nav toggle (mobile) ---------- */
  (function nav() {
    const toggle = $("#navToggle");
    const menu = $("#mainNav");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$("a", menu).forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  })();

  /* ---------- Hero terminal typewriter ---------- */
  (function heroTerminal() {
    const el = $("#heroTerminal");
    if (!el) return;
    const lines = [
      { t: "$ whoami", c: "term-user" },
      { t: "aluno@seguranca-da-informacao", c: "term-muted" },
      { t: "$ ./iniciar_aula.sh --modo educacional", c: "term-user" },
      { t: "[ok] Carregando módulos de redes...", c: "" },
      { t: "[ok] Carregando defesa na nuvem...", c: "" },
      { t: "[ok] Ambiente seguro e isolado ativo.", c: "term-yellow" },
      { t: "> Bem-vindo. Vamos aprender a defender.", c: "" },
    ];
    if (reduceMotion) {
      el.innerHTML = lines.map((l) => `<div class="${l.c}">${l.t}</div>`).join("") + '<span class="term-cursor">_</span>';
      return;
    }
    let li = 0, ci = 0;
    function type() {
      if (li >= lines.length) {
        el.innerHTML += '<span class="term-cursor">_</span>';
        return;
      }
      const line = lines[li];
      if (ci === 0) el.innerHTML += `<div class="${line.c}" id="ln${li}"></div>`;
      const node = $("#ln" + li, el);
      node.textContent = line.t.slice(0, ci + 1);
      ci++;
      if (ci >= line.t.length) { li++; ci = 0; setTimeout(type, 220); }
      else setTimeout(type, 22);
    }
    type();
  })();

  /* ---------- Packet journey ---------- */
  (function packet() {
    const track = $("#packetTrack");
    const dot = $("#packet");
    const status = $("#packetStatus");
    const btn = $("#sendPacket");
    if (!track || !btn) return;
    const hops = $$(".hop", track);
    const msgs = [
      "Saindo do seu PC (camada de aplicação → transporte)...",
      "Roteador encaminha o pacote pelo endereço IP...",
      "Firewall verifica as regras: tráfego permitido...",
      "DNS resolve o nome do site para um IP...",
      "Pacote entregue ao servidor. Resposta a caminho!",
    ];
    let running = false;
    btn.addEventListener("click", () => {
      if (running) return;
      running = true;
      btn.disabled = true;
      hops.forEach((h) => h.classList.remove("active"));
      dot.style.opacity = "1";
      let i = 0;
      function step() {
        if (i >= hops.length) {
          dot.style.opacity = "0";
          status.textContent = "Conexão concluída com sucesso.";
          running = false; btn.disabled = false;
          return;
        }
        hops[i].classList.add("active");
        const rect = hops[i].getBoundingClientRect();
        const trackRect = track.getBoundingClientRect();
        dot.style.left = rect.left - trackRect.left + rect.width / 2 + "px";
        status.textContent = msgs[i];
        i++;
        setTimeout(step, reduceMotion ? 400 : 750);
      }
      step();
    });
  })();

  /* ---------- Bucket config / risk meter ---------- */
  (function bucket() {
    const pub = $("#cfgPublic"), enc = $("#cfgEncrypt"), tls = $("#cfgTls"), logs = $("#cfgLogs");
    const fill = $("#riskFill"), label = $("#riskLabel"), fb = $("#bucketFeedback");
    if (!pub) return;
    function update() {
      let risk = 0;
      const notes = [];
      if (pub.checked) { risk += 55; notes.push("Bucket público expõe dados a qualquer um."); }
      if (!enc.checked) { risk += 20; notes.push("Sem criptografia: dados legíveis se vazarem."); }
      if (!tls.checked) { risk += 15; notes.push("Sem HTTPS: tráfego interceptável."); }
      if (!logs.checked) { risk += 10; notes.push("Sem logs: você não detecta invasões."); }
      risk = Math.min(risk, 100);
      fill.style.width = risk + "%";
      let level, color;
      if (risk >= 70) { level = "CRÍTICO"; color = "var(--red)"; }
      else if (risk >= 40) { level = "ALTO"; color = "#ff8a3d"; }
      else if (risk >= 15) { level = "MODERADO"; color = "var(--yellow)"; }
      else { level = "SEGURO"; color = "var(--green)"; }
      fill.style.background = color;
      label.style.color = color;
      label.textContent = "Risco: " + level;
      fb.textContent = notes.length ? "⚠ " + notes[0] : "✓ Configuração segura! Menor privilégio aplicado.";
    }
    [pub, enc, tls, logs].forEach((i) => i.addEventListener("change", update));
    update();
  })();

  /* ---------- Attack cards ---------- */
  (function attacks() {
    const grid = $("#attackGrid");
    if (!grid) return;
    const data = [
      {
        name: "Phishing", sev: "high",
        how: "O atacante se passa por uma empresa confiável (banco, e-mail) para enganar a vítima e roubar senhas ou dados, geralmente por e-mail ou mensagem com links falsos.",
        defend: "Desconfie de urgência e links; confira o remetente e o endereço real; ative MFA; treine os usuários a reconhecer sinais de fraude.",
      },
      {
        name: "DDoS", sev: "high",
        how: "Milhares de dispositivos (botnet) enviam requisições simultâneas para sobrecarregar um servidor e tirá-lo do ar (negação de serviço).",
        defend: "Use CDN e serviços anti-DDoS, rate limiting, escalonamento automático e filtragem de tráfego malicioso na borda.",
      },
      {
        name: "SQL Injection", sev: "high",
        how: "O atacante insere comandos SQL em campos de entrada (login, busca) para manipular o banco de dados e acessar ou apagar informações.",
        defend: "Use consultas parametrizadas (prepared statements), valide entradas e aplique o princípio do menor privilégio no banco.",
      },
      {
        name: "Força Bruta", sev: "med",
        how: "Tenta milhares de combinações de senha automaticamente até acertar. Senhas fracas e curtas caem em segundos.",
        defend: "Senhas longas e únicas, MFA, bloqueio após tentativas falhas (lockout) e CAPTCHA.",
      },
      {
        name: "Man-in-the-Middle", sev: "high",
        how: "O atacante se posiciona entre você e o servidor (ex: Wi-Fi público) para interceptar e ler ou alterar os dados trafegados.",
        defend: "Sempre HTTPS/TLS, VPN em redes públicas, e verificação de certificados digitais.",
      },
      {
        name: "Ransomware", sev: "high",
        how: "Malware que criptografa os arquivos da vítima e exige resgate para devolver o acesso. Comum via anexos e links maliciosos.",
        defend: "Backups 3-2-1 offline, atualizações, antivírus, e não abrir anexos suspeitos.",
      },
    ];
    grid.innerHTML = data
      .map(
        (a) => `
      <article class="attack-card">
        <div class="attack-card-head">
          <h3>${a.name} <span class="attack-badge ${a.sev === "high" ? "badge-high" : "badge-med"}">${a.sev === "high" ? "risco alto" : "risco médio"}</span></h3>
        </div>
        <div class="attack-section how">
          <h4>Como funciona</h4>
          <p>${a.how}</p>
        </div>
        <div class="attack-section defend">
          <h4>Como defender</h4>
          <p>${a.defend}</p>
        </div>
      </article>`
      )
      .join("");
  })();

  /* ---------- Password strength ---------- */
  (function pwStrength() {
    const input = $("#pwInput"), fill = $("#pwFill"), label = $("#pwLabel"), time = $("#pwTime");
    const checks = $("#pwChecks");
    if (!input) return;
    function analyze(pw) {
      const tests = {
        len: pw.length >= 12,
        upper: /[A-Z]/.test(pw),
        lower: /[a-z]/.test(pw),
        num: /[0-9]/.test(pw),
        sym: /[^A-Za-z0-9]/.test(pw),
      };
      $$("li", checks).forEach((li) => li.classList.toggle("ok", tests[li.dataset.check]));
      let score = Object.values(tests).filter(Boolean).length;
      if (pw.length >= 16) score = Math.min(score + 1, 5);
      // pool size for crack-time estimate
      let pool = 0;
      if (tests.lower) pool += 26;
      if (tests.upper) pool += 26;
      if (tests.num) pool += 10;
      if (tests.sym) pool += 32;
      const pct = (score / 5) * 100;
      fill.style.width = pw ? pct + "%" : "0%";
      let color, txt;
      if (!pw) { txt = "Aguardando..."; color = "var(--muted)"; }
      else if (score <= 2) { txt = "Fraca"; color = "var(--red)"; }
      else if (score === 3) { txt = "Razoável"; color = "var(--yellow)"; }
      else if (score === 4) { txt = "Forte"; color = "#7ee787"; }
      else { txt = "Muito forte"; color = "var(--green)"; }
      fill.style.background = color;
      label.style.color = color;
      label.textContent = pw ? "Força: " + txt : txt;
      if (pw && pool) {
        const combos = Math.pow(pool, pw.length);
        const seconds = combos / 1e10; // ~10 bilhões tentativas/s
        time.textContent = "Tempo estimado p/ quebra por força bruta: " + humanTime(seconds);
      } else time.textContent = "";
    }
    function humanTime(s) {
      if (s < 1) return "instantâneo";
      const u = [["ano", 31536000], ["dia", 86400], ["hora", 3600], ["min", 60], ["seg", 1]];
      for (const [n, v] of u) {
        if (s >= v) {
          const val = s / v;
          if (val > 1e6) return "milhões de " + n + "s";
          return Math.round(val) + " " + n + (Math.round(val) > 1 ? "s" : "");
        }
      }
      return "instantâneo";
    }
    input.addEventListener("input", () => analyze(input.value));
    analyze("");
  })();

  /* ---------- Lab: Brute force ---------- */
  (function bruteforce() {
    const term = $("#bruteTerminal"), btn = $("#bruteStart"), sel = $("#bruteTarget");
    if (!term) return;
    const digits = "0123456789";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const all = lower + lower.toUpperCase() + digits + "#@!$%&*";
    let running = false;
    function pool(target) {
      if (/^[0-9]+$/.test(target)) return digits;
      if (/^[a-z]+$/.test(target)) return lower;
      return all;
    }
    btn.addEventListener("click", () => {
      if (running) return;
      running = true; btn.disabled = true;
      const target = sel.value;
      const chars = pool(target);
      let attempts = 0;
      term.innerHTML = `$ bruteforce --target "****"\n<span class="term-muted">iniciando ataque de dicionário/força bruta...</span>\n`;
      const start = Date.now();
      const timer = setInterval(() => {
        // gera algumas tentativas por tick
        let guess = "";
        for (let k = 0; k < target.length; k++) guess += chars[Math.floor(Math.random() * chars.length)];
        attempts++;
        const strong = chars === all;
        // senhas fortes: nunca "acham" na demo (mostra inviabilidade)
        const found = !strong && (Math.random() < 0.06 || attempts > 40);
        if (attempts % 3 === 0 || found) {
          term.innerHTML += `[${attempts}] tentando: <span class="term-yellow">${guess}</span>\n`;
          term.scrollTop = term.scrollHeight;
        }
        if (found) {
          clearInterval(timer);
          const secs = ((Date.now() - start) / 1000).toFixed(1);
          term.innerHTML += `\n<span class="term-red">>> SENHA QUEBRADA: "${target}" em ${attempts} tentativas (${secs}s)</span>\n<span class="term-muted">Lição: senhas curtas/simples caem rápido.</span>`;
          term.scrollTop = term.scrollHeight;
          running = false; btn.disabled = false;
        } else if (strong && attempts > 30) {
          clearInterval(timer);
          term.innerHTML += `\n<span class="term-red">>> ATAQUE ABORTADO após ${attempts} tentativas.</span>\n<span class="term-yellow">Senha forte: levaria séculos. Inviável!</span>\n<span class="term-muted">Lição: comprimento + variedade = segurança.</span>`;
          term.scrollTop = term.scrollHeight;
          running = false; btn.disabled = false;
        }
      }, reduceMotion ? 60 : 130);
    });
  })();

  /* ---------- Lab: Phishing detector ---------- */
  (function phishing() {
    const box = $("#phishEmail"), fb = $("#phishFeedback"), score = $("#phishScore");
    const scamBtn = $("#phishScam"), legitBtn = $("#phishLegit");
    if (!box) return;
    const emails = [
      {
        from: "suporte@bancko-seguro.net", subj: "URGENTE: Sua conta será bloqueada em 24h!",
        body: "Detectamos atividade suspeita. Clique aqui imediatamente para verificar seus dados e evitar o bloqueio: http://bancko-verificar.xyz/login",
        scam: true, why: "Sinais de golpe: urgência exagerada, domínio errado (bancko), link suspeito e pedido de dados.",
      },
      {
        from: "no-reply@github.com", subj: "Novo login na sua conta",
        body: "Detectamos um novo login no seu dispositivo. Se foi você, ignore este e-mail. Caso contrário, revise sua segurança nas configurações da conta.",
        scam: false, why: "Legítimo: domínio oficial, sem link pedindo senha, apenas informa e orienta pelo site oficial.",
      },
      {
        from: "premios@voce-ganhou.com", subj: "Parabéns! Você ganhou um iPhone 15",
        body: "Você foi selecionado! Informe seu CPF e dados do cartão para receber seu prêmio grátis agora mesmo.",
        scam: true, why: "Golpe clássico: prêmio inesperado e pedido de CPF/cartão. Ninguém dá prêmios assim.",
      },
      {
        from: "faturas@vercel.com", subj: "Seu recibo de janeiro está disponível",
        body: "Obrigado por usar a Vercel. Seu recibo está disponível no painel. Acesse vercel.com e faça login para visualizar.",
        scam: false, why: "Legítimo: domínio oficial, não pede dados, direciona ao site oficial sem link mascarado.",
      },
      {
        from: "rh@suaempresa-pagamentos.info", subj: "Atualize seus dados bancários para receber o salário",
        body: "Precisamos que você atualize sua conta bancária neste formulário externo até hoje, senão o pagamento será suspenso.",
        scam: true, why: "Golpe: domínio estranho, urgência e formulário externo pedindo dados bancários.",
      },
    ];
    let idx = 0, hits = 0, answered = 0;
    function render() {
      const e = emails[idx];
      box.innerHTML = `<div class="pe-from">De: ${e.from}</div><div class="pe-subj">${e.subj}</div><div class="pe-body">${e.body}</div>`;
      fb.textContent = ""; fb.className = "lab-feedback";
    }
    function answer(said) {
      const e = emails[idx];
      answered++;
      const correct = said === e.scam;
      if (correct) hits++;
      fb.className = "lab-feedback " + (correct ? "good" : "bad");
      fb.textContent = (correct ? "✓ Correto! " : "✗ Errou. ") + e.why;
      score.textContent = `Acertos: ${hits} / ${answered}`;
      idx = (idx + 1) % emails.length;
      setTimeout(render, reduceMotion ? 0 : 2600);
    }
    scamBtn.addEventListener("click", () => answer(true));
    legitBtn.addEventListener("click", () => answer(false));
    render();
  })();

  /* ---------- Lab: DDoS ---------- */
  (function ddos() {
    const viz = $("#ddosViz"), server = $("#ddosServer"), gauge = $("#ddosGauge");
    const status = $("#ddosStatus"), attackBtn = $("#ddosAttack"), protect = $("#ddosProtect");
    if (!viz) return;
    let load = 0, interval = null, running = false;
    function spawn() {
      const dot = document.createElement("div");
      const good = Math.random() < 0.15;
      const blocked = !good && protect.checked && Math.random() < 0.85;
      dot.className = "req-dot " + (good ? "good" : blocked ? "blocked" : "bad");
      const side = Math.floor(Math.random() * 4);
      let x, y;
      if (side === 0) { x = Math.random() * 100; y = 0; }
      else if (side === 1) { x = 100; y = Math.random() * 100; }
      else if (side === 2) { x = Math.random() * 100; y = 100; }
      else { x = 0; y = Math.random() * 100; }
      dot.style.left = x + "%"; dot.style.top = y + "%";
      viz.appendChild(dot);
      requestAnimationFrame(() => {
        dot.style.transition = "all " + (reduceMotion ? 0.2 : 0.7) + "s linear";
        if (blocked) {
          dot.style.left = x < 50 ? "20%" : "80%";
          dot.style.top = y < 50 ? "20%" : "80%";
          dot.style.opacity = "0";
        } else {
          dot.style.left = "50%"; dot.style.top = "50%";
          if (!good) load = Math.min(load + 4, 130);
        }
      });
      setTimeout(() => dot.remove(), reduceMotion ? 250 : 750);
    }
    function tick() {
      const bursts = running ? (protect.checked ? 3 : 8) : 1;
      for (let i = 0; i < bursts; i++) spawn();
      // recuperação natural
      load = Math.max(0, load - (protect.checked ? 6 : 2));
      gauge.style.width = Math.min(load, 100) + "%";
      let color = "var(--green)";
      if (load >= 90) color = "var(--red)";
      else if (load >= 60) color = "var(--yellow)";
      gauge.style.background = color;
      if (load >= 100) {
        server.classList.add("stressed");
        status.textContent = protect.checked
          ? "Carga alta, mas proteção filtrando o tráfego malicioso."
          : "SERVIDOR FORA DO AR! Sobrecarga total (100%). Ative a proteção.";
        status.className = "lab-feedback bad";
      } else {
        server.classList.toggle("stressed", load >= 70);
        status.className = "lab-feedback";
        status.textContent = (running ? "Sob ataque. " : "Servidor online. ") +
          "Carga: " + Math.round(Math.min(load, 100)) + "%" +
          (protect.checked ? " (proteção ativa)" : "");
      }
    }
    interval = setInterval(tick, reduceMotion ? 200 : 350);
    attackBtn.addEventListener("click", () => {
      running = !running;
      attackBtn.textContent = running ? "Parar DDoS" : "Lançar DDoS";
    });
  })();

  /* ---------- Lab: SQL Injection ---------- */
  (function sqli() {
    const input = $("#sqliInput"), out = $("#sqliOutput"), inject = $("#sqliInject"), safe = $("#sqliSafe");
    if (!input) return;
    function render() {
      const raw = input.value;
      if (safe.checked) {
        out.innerHTML =
          `<span class="term-muted">-- consulta parametrizada (segura)</span>\n` +
          `SELECT * FROM users\nWHERE user = <span class="term-user">?</span>;\n` +
          `<span class="term-muted">params:</span> ["${raw.replace(/"/g, '\\"')}"]\n\n` +
          `<span class="term-user">>> Entrada tratada como dado, nunca como código.</span>\n` +
          `<span class="term-user">>> Injeção neutralizada. Login negado.</span>`;
      } else {
        const query = `SELECT * FROM users WHERE user = '${raw}';`;
        const bypass = /'\s*or\s*'?1'?\s*=\s*'?1/i.test(raw) || /--/.test(raw);
        out.innerHTML =
          `<span class="term-muted">-- concatenação direta (vulnerável)</span>\n` +
          `<span class="term-yellow">${query}</span>\n\n` +
          (bypass
            ? `<span class="term-red">>> A condição '1'='1' é sempre verdadeira!</span>\n<span class="term-red">>> ACESSO CONCEDIDO sem senha. Banco comprometido.</span>`
            : `<span class="term-muted">>> Consulta normal. Ative a injeção para ver o ataque.</span>`);
      }
    }
    inject.addEventListener("click", () => { input.value = "admin' OR '1'='1"; render(); });
    input.addEventListener("input", render);
    safe.addEventListener("change", render);
    render();
  })();

  /* ---------- Quiz ---------- */
  (function quiz() {
    const card = $("#quizCard"), progress = $("#quizProgress");
    if (!card) return;
    const questions = [
      {
        q: "Qual protocolo traduz nomes de sites (ex: leone.com) em endereços IP?",
        opts: ["DNS", "HTTP", "SMTP", "FTP"], correct: 0,
        exp: "O DNS é a 'agenda telefônica' da internet, convertendo nomes em IPs.",
      },
      {
        q: "No modelo de responsabilidade compartilhada da nuvem, quem configura o IAM e as permissões?",
        opts: ["O provedor (AWS/Azure)", "O cliente", "Ninguém, é automático", "O firewall"], correct: 1,
        exp: "Segurança NA nuvem (IAM, dados, permissões) é responsabilidade do cliente.",
      },
      {
        q: "Um ataque que sobrecarrega o servidor com muitas requisições para tirá-lo do ar é:",
        opts: ["Phishing", "SQL Injection", "DDoS", "Ransomware"], correct: 2,
        exp: "DDoS = negação de serviço distribuída, geralmente via botnet.",
      },
      {
        q: "Qual a melhor defesa contra o vazamento de uma senha por parte do usuário?",
        opts: ["Antivírus", "MFA (autenticação multifator)", "Trocar de navegador", "Desligar o Wi-Fi"], correct: 1,
        exp: "MFA exige um segundo fator, bloqueando o acesso mesmo com a senha vazada.",
      },
      {
        q: "A defesa correta contra SQL Injection é:",
        opts: ["Esconder o botão de login", "Usar consultas parametrizadas", "Aumentar a RAM", "Usar senhas longas"], correct: 1,
        exp: "Prepared statements tratam a entrada como dado, nunca como comando SQL.",
      },
      {
        q: "Por que criptografar dados 'em repouso'?",
        opts: ["Para o site carregar mais rápido", "Para que, se vazarem, sejam ilegíveis sem a chave", "Para economizar espaço", "É obrigatório por lei apenas"], correct: 1,
        exp: "Mesmo que um disco/backup vaze, sem a chave o conteúdo é inútil ao atacante.",
      },
      {
        q: "Um e-mail com urgência extrema pedindo seus dados via link suspeito é sinal de:",
        opts: ["Newsletter", "Phishing", "Atualização de sistema", "Backup"], correct: 1,
        exp: "Urgência + link/domínio suspeito + pedido de dados = phishing clássico.",
      },
      {
        q: "A estratégia de backup '3-2-1' ajuda principalmente contra:",
        opts: ["Lentidão da rede", "Ransomware e perda de dados", "Spam", "Senhas fracas"], correct: 1,
        exp: "3 cópias, 2 mídias, 1 fora do local: recupera dados sem pagar resgate.",
      },
    ];
    let current = 0, score = 0, answered = false;

    function renderQuestion() {
      answered = false;
      const item = questions[current];
      progress.style.width = (current / questions.length) * 100 + "%";
      card.innerHTML = `
        <div class="quiz-qnum">Pergunta ${current + 1} de ${questions.length}</div>
        <h3 class="quiz-question">${item.q}</h3>
        <div class="quiz-options">
          ${item.opts.map((o, i) => `<button class="quiz-option" data-i="${i}">${o}</button>`).join("")}
        </div>
        <div id="quizExtra"></div>`;
      $$(".quiz-option", card).forEach((b) =>
        b.addEventListener("click", () => choose(parseInt(b.dataset.i, 10)))
      );
    }
    function choose(i) {
      if (answered) return;
      answered = true;
      const item = questions[current];
      const btns = $$(".quiz-option", card);
      btns.forEach((b, bi) => {
        b.disabled = true;
        if (bi === item.correct) b.classList.add("correct");
        else if (bi === i) b.classList.add("wrong");
      });
      if (i === item.correct) score++;
      const extra = $("#quizExtra", card);
      extra.innerHTML = `
        <div class="quiz-explain"><strong>${i === item.correct ? "Correto! " : "Resposta correta: " + item.opts[item.correct] + ". "}</strong>${item.exp}</div>
        <button class="btn btn-primary quiz-next" id="quizNext">${current + 1 < questions.length ? "Próxima" : "Ver resultado"}</button>`;
      $("#quizNext", card).addEventListener("click", () => {
        current++;
        if (current < questions.length) renderQuestion();
        else renderResult();
      });
    }
    function renderResult() {
      progress.style.width = "100%";
      const pct = Math.round((score / questions.length) * 100);
      let msg;
      if (pct === 100) msg = "Perfeito! Você domina os conceitos de segurança.";
      else if (pct >= 70) msg = "Muito bom! Base sólida em segurança da informação.";
      else if (pct >= 50) msg = "Bom começo. Revise os módulos de ataque e defesa.";
      else msg = "Vale revisar a aula com calma. Volte aos módulos!";
      card.innerHTML = `
        <div class="quiz-result">
          <div class="quiz-qnum">// resultado</div>
          <h3>Quiz concluído</h3>
          <div class="quiz-score-big">${score}/${questions.length}</div>
          <p>${msg} (${pct}% de acerto)</p>
          <button class="btn btn-ghost" id="quizRestart">Refazer quiz</button>
        </div>`;
      $("#quizRestart", card).addEventListener("click", () => {
        current = 0; score = 0; renderQuestion();
      });
    }
    renderQuestion();
  })();
})();
