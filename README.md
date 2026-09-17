# Highland Brew Cafe – Baguio Concept Website

A premium React + Vite concept website proposal for Highland Brew Cafe at SM City Baguio. The experience is designed around Cordilleran coffee, Baguio’s mountain atmosphere, and a modern editorial layout without using a generic coffee-template aesthetic.

## Features

- Premium storytelling homepage with a dedicated menu page
- Brand-aligned mountain-inspired color system and editorial layout
- Mobile-first responsive navigation and accessibility-minded form patterns
- Contact form with frontend validation and a safe demo email flow
- Structured content in `src/data` and CSS split into `src/styles` as requested

## Project structure

- `src/data/` stores business, menu, and navigation content
- `src/styles/` contains the separated CSS system
- `src/assets/` holds the local logo and concept imagery
- `api/contact.js` contains the serverless email route for deployment environments

## Local development

```bash
npm install
npm run dev
```

Then open the Vite local URL shown in the terminal.

## Production build

```bash
npm run build
```

## Deployment notes

This concept site is designed for demo use and includes noindex/nofollow metadata to avoid impersonating an official Highland Brew website. Remove the demo note after business approval and configure environment variables before deployment.

## Contact email configuration

Set the following environment variables in your deployment target:

```bash
RESEND_API_KEY=your_api_key
CONTACT_TO_EMAIL=highlandbrewcafe@gmail.com
CONTACT_FROM_EMAIL=hello@yourdomain.com
```

The API route in `api/contact.js` validates and sanitizes input, then sends an email through Resend when those values are configured. If they are not provided, the form stays in a safe demo state and returns a clear message explaining the setup requirement.

## Important note on branding assets

This workspace did not include the official uploaded Highland Brew logo file. The project includes a structure-ready SVG placeholder in `src/assets/logos/highland-brew-logo.svg` and is organized so the approved business logo can replace it cleanly without redesigning the layout.
