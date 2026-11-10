# Acuity Scheduling GTM Event Listener

**Free Google Tag Manager listener for Acuity Scheduling tracking.** It fires one `acuity_booking` event for every Acuity booking, with the booking ID and price, so you can track Acuity appointments in GA4 (as a purchase or a lead), Google Ads, Meta Pixel and any other tag.

![Acuity Scheduling GTM Event Listener](docs/banner.png)

**Full guide, install video and copy button:** https://mdniamul.com/gtm-event-listeners/acuity-scheduling-gtm-listener/

---

## What it does

Acuity runs your Custom conversion tracking code in a frame on its confirmation page. A small sender in that box passes the booking to GTM, and the listener pushes:

```js
{
  event: 'acuity_booking',
  transaction_id: '1512495506',
  value: 85,
  currency: 'USD',
  appointment_type: 'Puppy Training Session',
  booking_type: 'paid',
  page_path: '/book/'
}
```

It works for both setups:

- **Scheduler embedded on your website** (best): the booking is sent up to your page and checked to come from the Acuity iframe.
- **Clients book on Acuity's own page:** add your GTM snippet in the same Acuity box and the booking goes to GTM right there.

Built-in safety:

- Accepts bookings only from an Acuity iframe on your page
- Ignores junk messages and unfilled placeholders like `%id%`
- One push per booking ID, also after a reload or when the tag fires twice
- Quote marks in appointment or calendar names cannot break the sender
- `value` is a real number, and `booking_type` tells paid bookings from free ones
- No email or other personal data, and nothing in the URL

## Install in 6 steps

1. **Acuity → Integrations → Custom conversion tracking → Set up.** Remove old code, paste [`acuity-sender-for-custom-conversion-tracking.html`](acuity-sender-for-custom-conversion-tracking.html) in the HTML tracking code box, then **Save settings**.
2. **GTM → Tags → New → Custom HTML.** Paste [`acuity-scheduling-gtm-listener.html`](acuity-scheduling-gtm-listener.html), set `CURRENCY` at the top, trigger **All Pages**.
3. **Not embedded?** Paste your GTM container snippet in the Acuity box above the sender, and add the listener to that container.
4. **Triggers → New → Custom Event**, event name `acuity_booking`. Add Data Layer Variables for `transaction_id`, `value`, `currency`, `appointment_type` and `booking_type`.
5. Paid bookings: GA4 `purchase` and a Google Ads conversion with value. Free bookings: GA4 `generate_lead`. Split with `booking_type`.
6. **Preview**, book a test appointment, check Tag Assistant, **Publish**, then cancel the test booking.

## Files

| File | What it is |
|---|---|
| `acuity-sender-for-custom-conversion-tracking.html` | Paste into Acuity's Custom conversion tracking box |
| `acuity-scheduling-gtm-listener.html` | Ready to paste into a GTM Custom HTML tag |
| `acuity-scheduling-gtm-listener.js` | Same listener without the `<script>` tags |
| `examples/sample-datalayer-output.json` | What the push looks like |

## Videos

- Install the free code: https://mdniamul.com/gtm-event-listeners/acuity-scheduling-gtm-listener/#install-video
- What the advanced version collects: https://mdniamul.com/gtm-event-listeners/acuity-scheduling-gtm-listener/#advanced

## Step-by-step guide

- [Google Ads Enhanced Conversions for Acuity Scheduling (iframe) with GTM](https://mdniamul.com/blog/google-ads-enhanced-conversions-for-acuity-scheduling-iframe-gtm/)

## Need more data? Advanced version

The free code tells you a booking happened and what it was worth. The **advanced version** adds an advanced sender and sends the client's SHA-256 hashed email (plus name and phone when Acuity fills them), a GA4 ecommerce object for paid bookings, calendar, appointment date and time, UTM values, 17 ad click IDs, first-party cookies (`_ga`, `_fbp`, `_fbc`, `_gcl_au` and more), visitor location and a unique `event_id`. Ready for Google Ads Enhanced Conversions, Meta CAPI, TikTok Events API and server-side GTM.

It comes with a setup video, a PDF guide and a GTM import file in your client portal. The code starts from $89, and setup packages are available:

- Prices: https://mdniamul.com/gtm-event-listeners/acuity-scheduling-gtm-listener/#pricing
- WhatsApp: https://api.whatsapp.com/send?phone=8801776485758
- Book a call: https://calendly.com/mdniamul
- All listeners: https://mdniamul.com/gtm-event-listeners/

Want it done for you? See my [Google Ads tracking specialist](https://mdniamul.com/google-ads-tracking-specialist/) and [server-side tracking service](https://mdniamul.com/server-side-tracking-service/) pages.

## Troubleshooting

- **No event:** the sender is not saved in Acuity, older code in that box throws an error first, or GTM does not load on the page with the scheduler.
- **See the raw message:** paste `addEventListener('message',e=>{if(String(e.data).includes('mdn-acuity'))console.log(e.origin,e.data)})` in the console on your page, then book.
- **Two events:** Acuity's own Google Ads, GA4 or Meta integration, or an older Acuity script, is still on. Keep one.
- **Thank-you page redirect scripts:** don't use them inside Acuity's frame. Browsers often block them, and an email in a URL ends up in GA4.

## About

Built by **[MD Niamul](https://mdniamul.com)**, GoHighLevel & AI Agent Automation, Marketing Attribution and Server-Side Tracking Specialist. Founder of Digital Soldier Agency and official Stape partner.

[Website](https://mdniamul.com) · [Free GTM listeners](https://mdniamul.com/gtm-event-listeners/) · [Book a call](https://calendly.com/mdniamul) · [LinkedIn](https://linkedin.com/in/mdniamul)

## License

MIT. Free to use on your own and your clients' sites. See [LICENSE](LICENSE).
