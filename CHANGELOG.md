# Changelog

## v1.0.0 (2026-11-09)

- First release of the free Acuity Scheduling GTM listener and its Acuity sender.
- Fires `acuity_booking` once per booking, with transaction_id, value, currency, appointment_type and booking_type (paid or free).
- Works with the scheduler embedded on your site and with GTM added inside Acuity's Custom conversion tracking box.
- Accepts bookings only from an Acuity iframe on the page; fake, junk and unfilled messages are ignored.
- One push per booking ID, also after a reload or when the tag fires twice.
- The sender keeps Acuity's values in a plain text block, so quote marks in names cannot break it.
- No email or other personal data in the free version, and never in a URL.
