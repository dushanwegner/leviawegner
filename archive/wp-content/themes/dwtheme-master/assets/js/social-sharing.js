(function(){
  'use strict';

  function pxToNumber(v){
    if (!v) return 0;
    var n = parseFloat(v.toString());
    return isNaN(n) ? 0 : n;
  }

  function compute(container){
    // Respect mobile CSS (2-up) and avoid fighting it
    if (window.innerWidth < 768) {
      container.querySelectorAll('.dwss-btn').forEach(function(el){ el.style.flexBasis = ''; });
      return;
    }

    var style = getComputedStyle(container);
    var gapX = pxToNumber(style.columnGap || style.gap);
    // Fallback target min width (keep in sync with CSS flex-basis 180px)
    var min = 180;

    var items = container.querySelectorAll('.dwss-btn');
    if (!items.length) return;

    var w = container.clientWidth;
    if (w <= 0) return;

    // columns = floor((w + gap) / (min + gap))
    var cols = Math.max(1, Math.floor((w + gapX) / (min + gapX)));
    // Compute equal column width so row fills exactly
    var basis = Math.floor((w - gapX * (cols - 1)) / cols);

    items.forEach(function(el){ el.style.flexBasis = basis + 'px'; });
  }

  function run(){
    document.querySelectorAll('.dw-socialsharing .dwss-grid').forEach(compute);
  }

  var rafId = 0;
  function onResize(){
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(run);
  }

  window.addEventListener('load', run);
  window.addEventListener('resize', onResize);
})();
