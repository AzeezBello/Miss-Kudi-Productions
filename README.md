# Miss Kudi Productions — Website Starter

A responsive **Next.js 16** website for a Lagos‑based B2B garment manufacturer and private‑label production partner. The design follows a **minimalist‑luxury** aesthetic with an olive‑green (`#556b2f`) and off‑white (`#f8f5f0`) palette and includes an **immersive 3‑D hero** built with `@react-three/fiber`, `@react-three/drei` and Framer Motion.

## Features
- **Multi‑page layout** – Home, Services, About, Process, Size‑Charts, Quote, Privacy Policy, Refund Policy, Terms & Conditions.
- **Animated hero** – Rotating box with stars, fog, environment lighting, auto‑rotate camera for an immersive experience.
- **Reusable QuoteForm** component – client‑side React state, validation, and accessible markup.
- **Responsive UI** – Tailored for desktop, tablet and mobile breakpoints.
- **Palette variables** – `--ink` (olive) and `--paper` (off‑white) defined in `globals.css`.
- **SEO metadata** – Title & description set in `layout.tsx`.
- **Data‑driven sections** – Services and process steps are stored in `src/app/data.ts`.
- **Ready for extension** – Easy to add more services, size‑charts or custom 3‑D models.

## Pages
| Route | Description |
|-------|-------------|
| `/` | Home page with hero, intro, services overview, process steps and inquiry form. |
| `/services` | Detailed list of manufacturing services with images and a CTA button. |
| `/about` | Company story, founding year, team overview and link to the quote section. |
| `/process` | Step‑by‑step workflow with a CTA button. |
| `/size-charts` | US apparel size guide (tables for women tops and men shirts). |
| `/quote` | Quote landing page that embeds the `QuoteForm` component. |
| `/privacy-policy` | Privacy policy with contact email. |
| `/refund-policy` | Refund policy and refund conditions. |
| `/terms-and-conditions` | Terms of service and commercial conditions. |

## Important before launch
- Replace stock photography with approved Miss Kudi Production images and update the logo.
- Set real contact details (email, phone) in `src/app/layout.tsx` and the QuoteForm.
- Connect the inquiry endpoint (`/api/inquiry`) to your email service or a database, and enable spam protection (reCAPTCHA, rate‑limiting).
- Add a full privacy notice and data‑retention policy as required.
- Verify service scope, minimum order quantities, delivery options and quality standards.
- Run `npm install`, `npm run dev` and `npm run build` locally before deploying.

## Deploy
1. Push the repository to GitHub.
2. Import the repo into **Vercel** (or your preferred Next.js hosting).
3. Attach a custom domain and configure environment variables if needed.

---
*Feel free to extend any section, add more 3‑D models to the hero, or integrate a CMS for dynamic content.*
