(function(){
  function setCookie(name, days) {
    var parts = [name + "=1", "path=/", "samesite=Lax"]; // mark hidden
    if (location.protocol === 'https:') parts.push('secure');
    if (typeof days === 'number' && days > 0) {
      var d = new Date();
      d.setTime(d.getTime() + (days*24*60*60*1000));
      parts.push('expires=' + d.toUTCString());
    }
    document.cookie = parts.join('; ');
  }

  function onReady(fn){
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else { fn(); }
  }

  onReady(function(){
    var bar = document.querySelector('.dw-topbar');
    if (!bar) return;
    var btn = bar.querySelector('.dw-topbar__close');
    if (!btn) return; // nothing to do if not dismissible

    btn.addEventListener('click', function(){
      var key = bar.getAttribute('data-cookie') || 'dw_topbar';
      var days = parseInt(bar.getAttribute('data-days') || '7', 10);
      if (isNaN(days) || days < 0) days = 7;
      setCookie(key, days);
      // hide immediately
      bar.style.display = 'none';
    });
  });
})();
