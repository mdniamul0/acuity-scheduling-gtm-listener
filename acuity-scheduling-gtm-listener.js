/* Acuity Scheduling listener by MD Niamul - mdniamul.com
   Fires acuity_booking once per booking. Works with the scheduler
   embedded on your site (iframe) and with GTM added to Acuity's own
   page. Needs the small sender script in Acuity → Custom conversion
   tracking (see the setup steps). */
(function () {
  if (window.__mdnAcuityBasic) return; // tag fired twice: keep one copy
  window.__mdnAcuityBasic = true;

  var CURRENCY = 'USD'; // your Acuity currency (EUR, GBP, CAD, AUD...)
  var ACUITY = /^https:\/\/([a-z0-9-]+\.)*(acuityscheduling\.com|squarespacescheduling\.com|as\.me)$/i;

  window.dataLayer = window.dataLayer || [];
  var sent = {};

  function seen(id) {
    if (sent[id]) return true;
    sent[id] = true;
    try {
      if (localStorage.getItem('mdn_acuity_' + id)) return true;
      localStorage.setItem('mdn_acuity_' + id, '1');
    } catch (e) {}
    return false;
  }

  function push(b) {
    if (!b || typeof b !== 'object' || b.source !== 'mdn-acuity' || !b.id) return;
    if (seen(String(b.id))) return; // one push per booking, also after a reload
    var value = parseFloat(String(b.price || '0').replace(/[^0-9.\-]/g, '')) || 0;
    window.dataLayer.push({
      event: 'acuity_booking',
      transaction_id: String(b.id),
      value: value,
      currency: CURRENCY,
      appointment_type: b.appointmentType || '',
      booking_type: value > 0 ? 'paid' : 'free',
      page_path: window.location.pathname
    });
  }

  // Did the message come from inside an Acuity iframe on this page?
  function fromAcuityFrame(src) {
    var frames = document.getElementsByTagName('iframe');
    for (var i = 0; i < frames.length; i++) {
      if (!ACUITY.test((frames[i].src || '').split('/').slice(0, 3).join('/'))) continue;
      var w = src;
      for (var d = 0; d < 4 && w; d++) {
        if (w === frames[i].contentWindow) return true;
        if (w === window || w === w.parent) break;
        w = w.parent;
      }
    }
    return false;
  }

  // 1) Scheduler embedded on your site
  window.addEventListener('message', function (e) {
    if (!e || typeof e.data !== 'string' || e.data.indexOf('mdn-acuity') === -1) return;
    if (!ACUITY.test(e.origin) && !fromAcuityFrame(e.source)) return;
    var b; try { b = JSON.parse(e.data); } catch (err) { return; }
    push(b);
  }, false);

  // 2) GTM added inside Acuity's custom conversion box (direct booking page)
  window.addEventListener('mdn-acuity-booking', function (e) { push(e && e.detail); }, false);
  if (window.__mdnAcuityBooking) push(window.__mdnAcuityBooking);
})();
