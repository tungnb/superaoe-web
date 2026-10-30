// Global chat bubble ("chat tổng") on every page of the site: a round button in the bottom-right corner
// opens a chat window, like a support chat. It is the launcher's global chat (Worker /dir/web, see
// xtv-cf/src/web.js webChat): anyone reads, signed-in players write. The socket opens the first time
// the window opens (and on later pages of the same visit), so a visitor who never opens it costs nothing.
// Styles live in a shadow root, so the page's CSS and this one never meet; colours follow modern.css.
(() => {
  if (window.__sqChat) return;
  window.__sqChat = true;

  const MAX_LEN = 200;  // Directory CHAT_MAX_LEN
  const KEY = "sq-chat";  // sessionStorage: "1" = opened during this visit (reconnect on the next page)
  const store = {
    get() { try { return sessionStorage.getItem(KEY); } catch { return null; } },
    set(v) { try { sessionStorage.setItem(KEY, v); } catch {} },
  };
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 01-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1121 12z"/></svg>';
  const ICON_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  const ICON_SEND = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.4 20.4l17.4-7.5a1 1 0 000-1.8L3.4 3.6a.7.7 0 00-1 .8L4.5 11l9 1-9 1-2.1 6.6a.7.7 0 001 .8z"/></svg>';

  const host = document.createElement("div");
  host.id = "sq-chat";
  const root = host.attachShadow({ mode: "open" });
  root.innerHTML = `<style>
:host { all: initial; }
* { box-sizing: border-box; font-family: var(--sans, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif); }
.fab { position: fixed; right: max(20px, env(safe-area-inset-right)); bottom: max(20px, env(safe-area-inset-bottom)); z-index: 2147483000;
  width: 58px; height: 58px; border-radius: 50%; border: 0; cursor: pointer; display: grid; place-items: center;
  background: var(--accent, #0071e3); color: #fff; box-shadow: 0 6px 20px rgba(0,0,0,.22), 0 2px 6px rgba(0,0,0,.12);
  transition: transform 200ms cubic-bezier(.2,.8,.2,1), background 200ms; }
.fab:hover { background: var(--accent-hi, #0077ed); transform: scale(1.06); }
.fab:focus-visible { outline: 3px solid rgba(0,113,227,.45); outline-offset: 3px; }
.fab svg { width: 27px; height: 27px; }
.fab .badge { position: absolute; top: -2px; right: -2px; min-width: 22px; height: 22px; padding: 0 6px; border-radius: 11px;
  background: var(--bad, #ff3b30); color: #fff; font-size: 12px; font-weight: 700; line-height: 22px; text-align: center;
  box-shadow: 0 0 0 2px var(--bg, #f5f5f7); }
.fab .tip { position: absolute; right: 70px; top: 50%; transform: translateY(-50%); white-space: nowrap; pointer-events: none;
  background: var(--popover, #fff); color: var(--fg, #1d1d1f); font-size: 14px; font-weight: 600; padding: 8px 14px; border-radius: 980px;
  box-shadow: 0 0 0 .5px var(--line2, rgba(0,0,0,.14)), 0 6px 18px rgba(0,0,0,.12); opacity: 0; transition: opacity 200ms; }
.fab:hover:not(.open) .tip { opacity: 1; }
.hidden { display: none !important; }

.panel { position: fixed; right: max(20px, env(safe-area-inset-right)); bottom: calc(max(20px, env(safe-area-inset-bottom)) + 72px);
  z-index: 2147483000; width: 370px; height: min(560px, calc(100vh - 120px)); display: flex; flex-direction: column;
  background: var(--surface, #fff); color: var(--fg, #1d1d1f); border-radius: 18px; overflow: hidden;
  box-shadow: 0 0 0 .5px var(--line2, rgba(0,0,0,.14)), 0 20px 50px rgba(0,0,0,.22);
  transform-origin: bottom right; animation: pop 220ms cubic-bezier(.2,.8,.2,1); }
@keyframes pop { from { opacity: 0; transform: translateY(12px) scale(.96); } }
@media (prefers-reduced-motion: reduce) { .panel { animation: none; } .fab { transition: none; } }
.head { display: flex; align-items: center; gap: 12px; padding: 14px 12px 14px 16px; background: var(--accent, #0071e3); color: #fff; }
.head .ttl { flex: 1; min-width: 0; }
.head b { display: block; font-size: 16px; line-height: 1.2; }
.head small { display: flex; align-items: center; gap: 6px; font-size: 12.5px; opacity: .9; }
.head small i { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,.6); }
.head small.on i { background: #4cd964; box-shadow: 0 0 0 2px rgba(76,217,100,.35); }
.head small.off i { background: #ffcc00; }
.x { width: 36px; height: 36px; border-radius: 50%; border: 0; background: transparent; color: #fff; cursor: pointer; display: grid; place-items: center; }
.x:hover { background: rgba(255,255,255,.16); }
.x svg { width: 20px; height: 20px; }

.lines { flex: 1; min-height: 0; overflow-y: auto; padding: 12px 12px 6px; display: flex; flex-direction: column; gap: 6px;
  overscroll-behavior: contain; background: var(--bg, #f5f5f7); }
.day { align-self: center; margin: 6px 0 2px; padding: 2px 10px; font-size: 11.5px; color: var(--muted, #6e6e73); background: var(--surface2, #e8e8ed); border-radius: 980px; }
.msg { max-width: 85%; align-self: flex-start; display: flex; flex-direction: column; }
.msg .nm { font-size: 12px; font-weight: 700; margin: 0 0 2px 10px; }
.msg .bub { padding: 7px 12px; border-radius: 16px 16px 16px 5px; background: var(--surface, #fff); font-size: 14.5px; line-height: 1.4;
  overflow-wrap: anywhere; box-shadow: 0 0 0 .5px var(--line, rgba(0,0,0,.08)); }
.msg time { font-size: 11px; color: var(--faint, #76767b); margin: 2px 0 0 10px; }
.msg.mine { align-self: flex-end; align-items: flex-end; }
.msg.mine .nm { display: none; }
.msg.mine .bub { background: var(--accent, #0071e3); color: #fff; border-radius: 16px 16px 5px 16px; box-shadow: none; }
.msg.mine time { margin: 2px 10px 0 0; }
.msg.cont { margin-top: -3px; }
.msg.cont .nm { display: none; }
.quiet { margin: auto; text-align: center; color: var(--faint, #76767b); font-size: 14px; padding: 20px; }
.newer { position: absolute; left: 50%; transform: translateX(-50%); bottom: 82px; padding: 6px 14px; border: 0; border-radius: 980px;
  background: var(--accent, #0071e3); color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,.2); }

.foot { border-top: 1px solid var(--line, rgba(0,0,0,.08)); padding: 10px 12px; background: var(--surface, #fff); }
form.send { display: flex; gap: 8px; align-items: center; }
input { width: 100%; min-width: 0; flex: 1; font-size: 16px; padding: 10px 14px; border-radius: 980px; border: 1px solid transparent;
  background: var(--surface2, #f2f2f5); color: var(--fg, #1d1d1f); }
input::placeholder { color: var(--faint, #76767b); }
input:focus { outline: none; background: var(--surface, #fff); border-color: var(--accent, #0071e3); box-shadow: 0 0 0 3px rgba(0,113,227,.18); }
.sendbtn { width: 42px; height: 42px; flex: none; border-radius: 50%; border: 0; cursor: pointer; display: grid; place-items: center;
  background: var(--accent, #0071e3); color: #fff; }
.sendbtn svg { width: 19px; height: 19px; }
.sendbtn:disabled { background: var(--surface2, #e8e8ed); color: var(--faint, #76767b); cursor: default; }
.info { display: flex; justify-content: space-between; gap: 8px; font-size: 12px; color: var(--faint, #76767b); margin: 5px 6px 0; min-height: 0; }
.info:empty, .info span:empty { display: none; }
.err { color: var(--bad-ink, #d70015); }
.guest p { margin: 0 0 10px; font-size: 13.5px; color: var(--muted, #6e6e73); text-align: center; }
.btn { width: 100%; padding: 11px; border: 0; border-radius: 980px; font-size: 15px; font-weight: 600; cursor: pointer;
  background: var(--accent, #0071e3); color: #fff; }
.btn:hover { background: var(--accent-hi, #0077ed); }
.btn:disabled { opacity: .6; cursor: default; }
.link { background: none; border: 0; color: var(--accent, #0071e3); font-size: 13.5px; cursor: pointer; padding: 6px; }
.login { display: grid; gap: 8px; }
.login input { border-radius: 10px; font-size: 15px; }
.login .row { display: flex; justify-content: space-between; align-items: center; }
.login .lerr { font-size: 13px; color: var(--bad-ink, #d70015); min-height: 0; }
.login .lerr:empty { display: none; }

@media (max-width: 520px) {
  .panel { inset: 0; width: auto; height: 100%; border-radius: 0; animation: none; }
  .head { padding-top: max(14px, env(safe-area-inset-top)); }
  .foot { padding-bottom: max(10px, env(safe-area-inset-bottom)); }
  .fab.open { display: none; }
  .fab { width: 54px; height: 54px; right: max(16px, env(safe-area-inset-right)); bottom: max(16px, env(safe-area-inset-bottom)); }
  .fab .tip { display: none; }
}
</style>
<button class="fab" id="fab" aria-label="Mở chat tổng" aria-expanded="false" aria-controls="panel">${ICON_CHAT}<span class="badge hidden" id="badge"></span><span class="tip">Chat với cộng đồng</span></button>
<section class="panel hidden" id="panel" role="dialog" aria-label="Chat tổng">
  <div class="head">
    <div class="ttl"><b>Chat tổng SuperAqE</b><small id="live"><i></i><span>Đang kết nối...</span></small></div>
    <button class="x" id="close" aria-label="Thu nhỏ chat">${ICON_X}</button>
  </div>
  <div class="lines" id="lines" aria-live="polite" aria-relevant="additions"><div class="quiet">Đang tải tin nhắn...</div></div>
  <button class="newer hidden" id="newer">Tin nhắn mới ↓</button>
  <div class="foot">
    <div id="writer" class="hidden">
      <form class="send" id="sendForm" autocomplete="off">
        <input id="text" maxlength="${MAX_LEN}" placeholder="Nhập tin nhắn..." aria-label="Tin nhắn" enterkeyhint="send">
        <button class="sendbtn" type="submit" id="sendBtn" aria-label="Gửi">${ICON_SEND}</button>
      </form>
      <div class="info"><span class="err" id="err" role="alert"></span><span id="count"></span></div>
    </div>
    <div id="guest" class="guest">
      <p>Bạn đang xem. Đăng nhập tài khoản SuperAqE để nhắn tin.</p>
      <button class="btn" id="toLogin">Đăng nhập để chat</button>
    </div>
    <form id="login" class="login hidden" autocomplete="on">
      <input id="lu" name="username" autocomplete="username" placeholder="Tên đăng nhập" required maxlength="24" aria-label="Tên đăng nhập">
      <input id="le" name="email" type="email" autocomplete="email" placeholder="Email" required maxlength="120" aria-label="Email" class="reg hidden" disabled>
      <input id="lp" name="password" type="password" autocomplete="current-password" placeholder="Mật khẩu" required maxlength="128" aria-label="Mật khẩu">
      <input id="lp2" type="password" autocomplete="new-password" placeholder="Nhập lại mật khẩu" required minlength="6" maxlength="128" aria-label="Nhập lại mật khẩu" class="reg hidden" disabled>
      <div class="lerr" id="lerr" role="alert"></div>
      <button class="btn" type="submit" id="loginBtn">Đăng nhập</button>
      <div class="row"><button class="link" type="button" id="swap">Tạo tài khoản mới</button><button class="link" type="button" id="cancel">Để sau</button></div>
    </form>
  </div>
</section>`;
  const $ = (id) => root.getElementById(id);
  const lines = $("lines");

  let me = null, canWrite = false, focusNext = false, open = false, unread = 0, lastSent = "", lastDay = "", lastUser = "";

  async function api(path, body) {
    const res = await fetch("/api/web/" + path, body === undefined ? { credentials: "same-origin" }
      : { method: "POST", credentials: "same-origin", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Có lỗi, hãy thử lại.");
    return data;
  }

  // ---------- Window ----------
  function setOpen(on) {
    open = on;
    $("panel").classList.toggle("hidden", !on);
    $("fab").classList.toggle("open", on);
    $("fab").setAttribute("aria-expanded", on);
    $("fab").setAttribute("aria-label", on ? "Thu nhỏ chat" : "Mở chat tổng");
    $("fab").firstElementChild.outerHTML = on ? ICON_X : ICON_CHAT;
    if (on) {
      store.set("1");
      unread = 0;
      showBadge();
      if (!ws) connect();
      toBottom();
      if (canWrite && matchMedia("(min-width: 521px)").matches) $("text").focus();
    }
  }
  $("fab").onclick = () => setOpen(!open);
  $("close").onclick = () => { setOpen(false); $("fab").focus(); };
  root.addEventListener("keydown", (e) => { if (e.key === "Escape" && open) { setOpen(false); $("fab").focus(); } });
  function showBadge() {
    $("badge").textContent = unread > 9 ? "9+" : unread;
    $("badge").classList.toggle("hidden", !unread);
  }

  // Which footer: the composer, the "sign in to chat" bar or the sign-in form.
  function showFoot(which) {
    $("writer").classList.toggle("hidden", which !== "writer");
    $("guest").classList.toggle("hidden", which !== "guest");
    $("login").classList.toggle("hidden", which !== "login");
  }

  // ---------- Lines ----------
  const nameColour = (u) => {
    let h = 0;
    for (const c of u.toLowerCase()) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return `hsl(${h % 360} 60% ${matchMedia("(prefers-color-scheme: dark)").matches ? 70 : 38}%)`;
  };
  const dayOf = (t) => new Date(t).toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "numeric" });
  const hhmm = (t) => new Date(t).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  const mine = (u) => !!me && u.toLowerCase() === me.toLowerCase();
  const nearBottom = () => lines.scrollHeight - lines.scrollTop - lines.clientHeight < 80;
  function toBottom() { lines.scrollTop = lines.scrollHeight; $("newer").classList.add("hidden"); }
  lines.addEventListener("scroll", () => { if (nearBottom()) $("newer").classList.add("hidden"); });
  $("newer").onclick = toBottom;

  function addLine(m) {
    lines.querySelector(".quiet")?.remove();
    const day = dayOf(m.t);
    if (day !== lastDay) {
      lastDay = day;
      lastUser = "";
      lines.insertAdjacentHTML("beforeend", `<div class="day">${esc(day === dayOf(Date.now()) ? "Hôm nay" : day)}</div>`);
    }
    const div = document.createElement("div");
    // Lines in a row from one person share the name.
    div.className = "msg" + (mine(m.u) ? " mine" : "") + (lastUser === m.u ? " cont" : "");
    lastUser = m.u;
    div.innerHTML = `<span class="nm" style="color:${nameColour(m.u)}">${esc(m.u)}</span><div class="bub">${esc(m.text)}</div>`
      + `<time datetime="${new Date(m.t).toISOString()}">${hhmm(m.t)}</time>`;
    lines.appendChild(div);
  }
  function showLog(msgs) {
    lines.innerHTML = "";
    lastDay = lastUser = "";
    if (!msgs.length) lines.innerHTML = '<div class="quiet">Chưa có tin nhắn nào. Hãy là người mở lời!</div>';
    for (const m of msgs) addLine(m);
    toBottom();
  }

  // ---------- Socket ----------
  let ws = null, retry = 0, retryTimer = 0;
  function setLive(state, text) {
    $("live").className = state;
    $("live").querySelector("span").textContent = text;
  }
  function connect() {
    clearTimeout(retryTimer);
    if (ws) { ws.onclose = null; ws.close(); }
    setLive("", "Đang kết nối...");
    const sock = ws = new WebSocket((location.protocol === "https:" ? "wss://" : "ws://") + location.host + "/dir/web");
    sock.onmessage = (e) => {
      let m;
      try { m = JSON.parse(e.data); } catch { return; }
      if (m.t === "chatlog") {
        retry = 0;
        me = m.me || null;
        canWrite = !!m.me;
        if (canWrite || $("login").classList.contains("hidden")) showFoot(canWrite ? "writer" : "guest");
        setLive("on", "Đang trực tuyến");
        showLog(m.msgs || []);
        if (canWrite && focusNext) { focusNext = false; $("text").focus(); }
      } else if (m.t === "chat" && m.m) {
        const stay = nearBottom();
        addLine(m.m);
        if (!open) { if (!mine(m.m.u)) { unread++; showBadge(); } }
        else if (stay || mine(m.m.u)) toBottom();
        else $("newer").classList.remove("hidden");
      } else if (m.t === "chaterr") {
        $("err").textContent = m.text;
        // Not sent: give the line back to send again.
        if (!$("text").value) { $("text").value = lastSent; updateCount(); }
      }
    };
    sock.onclose = (e) => {
      if (ws !== sock) return;
      canWrite = false;
      if (e.code === 4001) { me = null; retry = 0; showFoot("guest"); }
      setLive("off", "Mất kết nối, đang thử lại...");
      const wait = Math.min(30, 2 ** retry++) * 1000;
      retryTimer = setTimeout(connect, document.hidden ? Math.max(wait, 5000) : wait);
    };
  }
  // Back on the tab after the phone slept: reconnect at once instead of waiting out the back-off.
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && ws && ws.readyState > 1) { retry = 0; connect(); }
  });

  // ---------- Sending ----------
  function updateCount() {
    const n = $("text").value.length;
    $("count").textContent = n > MAX_LEN - 40 ? `${n}/${MAX_LEN}` : "";
  }
  $("text").addEventListener("input", () => { $("err").textContent = ""; updateCount(); });
  $("sendForm").onsubmit = (e) => {
    e.preventDefault();
    const text = $("text").value.replace(/\s+/g, " ").trim();
    if (!text) return;
    if (!ws || ws.readyState !== 1 || !canWrite) { $("err").textContent = "Chưa kết nối, đợi một chút rồi gửi lại."; return; }
    ws.send(JSON.stringify({ t: "chat", text }));
    lastSent = text;
    $("text").value = "";
    updateCount();
    $("text").focus();
  };
  // Enter sends even while a Vietnamese input method is still composing a word (see /tai-khoan/).
  const enterSubmits = (form) => form.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.code !== "Enter" && e.code !== "NumpadEnter") return;
    if (e.target.tagName !== "INPUT") return;
    e.preventDefault();
    form.requestSubmit();
  });
  enterSubmits($("sendForm"));
  enterSubmits($("login"));

  // ---------- Sign in / create an account (the same account as the launcher and the other pages) ----------
  let registering = false;
  function setRegister(on) {
    registering = on;
    for (const el of root.querySelectorAll(".reg")) { el.classList.toggle("hidden", !on); el.disabled = !on; }
    $("loginBtn").textContent = on ? "Tạo tài khoản" : "Đăng nhập";
    $("swap").textContent = on ? "Đã có tài khoản? Đăng nhập" : "Tạo tài khoản mới";
    $("lp").autocomplete = on ? "new-password" : "current-password";
    $("lp").minLength = on ? 6 : 0;
    $("lerr").textContent = "";
  }
  $("toLogin").onclick = () => { setRegister(false); showFoot("login"); $("lu").focus(); };
  $("swap").onclick = () => { setRegister(!registering); (registering && $("lu").value ? $("le") : $("lu")).focus(); };
  $("cancel").onclick = () => showFoot("guest");
  $("login").onsubmit = async (e) => {
    e.preventDefault();
    const btn = $("loginBtn");
    btn.disabled = true;
    $("lerr").textContent = "";
    try {
      const username = $("lu").value.trim(), password = $("lp").value;
      if (registering) {
        if (password !== $("lp2").value) throw new Error("Hai mật khẩu không giống nhau.");
        await api("register", { username, email: $("le").value.trim(), password });
      } else {
        await api("login", { username, password });
      }
      $("lp").value = $("lp2").value = "";
      setRegister(false);
      showFoot("guest");
      // Open the socket again with the new cookie: it may write now.
      retry = 0;
      focusNext = true;
      connect();
      // Pages with their own sign-in header (setMe/api of /lich-su-tran/, /giai-dau/...) follow along.
      if (typeof window.setMe === "function" && typeof window.api === "function") window.api("me").then(window.setMe, () => {});
    } catch (err) {
      $("lerr").textContent = err.message;
    } finally {
      btn.disabled = false;
    }
  };

  document.body.appendChild(host);
  // Opened on an earlier page of this visit: stay connected (the badge counts new lines), window closed.
  if (store.get() === "1") connect();
})();
