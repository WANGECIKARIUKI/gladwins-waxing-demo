# Lumina Wax Bar — redesigned frontend demo

A responsive React + Vite concept for Lumina Wax Bar, with a public website, a customer appointment-request flow, and a separate owner-dashboard preview.

## What's included
- A redesigned editorial-style homepage with a clear appointment CTA.
- Treatment cards use externally hosted beauty-treatment photos and require an internet connection. The images should be reviewed visually before launch to ensure they accurately represent each specific service.
- Appointment-request form: treatment, **branch selection inside the form**, preferred date and time, name, phone, optional email and notes.
- Demo confirmation screen that clearly states no appointment is sent or stored.
- Separate owner preview with sample dashboard, appointments, customer and payment sections.
- Responsive mobile layouts, keyboard focus styles, reduced-motion support, descriptive page metadata, Open Graph image, favicon, and a custom SVG social preview image.

## Important demo limits
This is frontend-only. The time picker is a preferred-time selector, not a real availability check. Submitting the form only displays a local preview; it does not contact the salon, save records, send messages, or create a real appointment. A floating WhatsApp booking preview lets visitors select a treatment, branch, date and time and view a prefilled message. No real WhatsApp message is sent because the salon number has not been supplied yet. WhatsApp requests will only appear in the live dashboard when a backend or owner workflow records them. Dashboard figures are illustrative sample data. A production booking system needs a backend, database, secure handling of customer details, real availability rules, appointment status management, and an agreed confirmation/contact workflow.

## Run locally
1. Extract this ZIP.
2. Open the project folder in your terminal.
3. Run `npm install`.
4. Run `npm run dev` and open the local URL Vite prints.
5. Before deployment, run `npm run build`.

## Applying to the existing project
Copy `src/`, `public/`, `index.html`, and `package.json` into the existing `gladwins-waxing-demo` project, replacing files with the same names. Keep the existing `.git` folder. If you copy over the whole project, do not delete `.git`. Run `npm install` after replacing `package.json`.

## Production checklist before launch
- [ ] Connect booking form to a backend and persist requests safely.
- [ ] Implement real branch-specific availability and prevent double-booking.
- [ ] Add server-side validation, rate limiting, privacy notice/consent, and secure data retention.
- [ ] Implement real owner authentication and role-based access; never expose dashboard data publicly.
- [ ] Confirm prices, opening days, phone/email, and booking confirmation process with the salon.
- [ ] Add real 404 handling and hosting-specific SPA fallback rules.
- [ ] Verify metadata, social preview, favicon, sitemap and robots rules on the final production domain.
- [ ] Test accessibility, mobile breakpoints, form validation, and deployment build.
