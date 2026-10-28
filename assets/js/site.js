// Botão de tema claro/escuro e barra de leitura dos posts.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');

  function escuro() {
    var t = root.getAttribute('data-tema');
    if (t) return t === 'escuro';
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function rotulo() {
    if (btn) btn.setAttribute('aria-label', escuro() ? 'Ativar tema claro' : 'Ativar tema escuro');
  }
  if (btn) {
    rotulo();
    btn.addEventListener('click', function () {
      var proximo = escuro() ? 'claro' : 'escuro';
      root.setAttribute('data-tema', proximo);
      try { localStorage.setItem('tema', proximo); } catch (e) {}
      rotulo();
    });
  }

  var barra = document.querySelector('.progress');
  if (barra) {
    var pendente = false;
    var atualizar = function () {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      var pct = total > 0 ? Math.min(100, Math.max(0, window.scrollY / total * 100)) : 0;
      barra.style.width = pct + '%';
      pendente = false;
    };
    window.addEventListener('scroll', function () {
      if (!pendente) { pendente = true; window.requestAnimationFrame(atualizar); }
    }, { passive: true });
    atualizar();
  }
})();
