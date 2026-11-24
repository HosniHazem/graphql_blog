# GraphCMS Headless Blog

A headless blog frontend built with Next.js, rendering content from a Hygraph
(formerly GraphCMS) GraphQL backend.

## What it does

- Posts, categories and author pages served from a hosted GraphQL CMS
- Featured-post carousel and category navigation
- Comment submission through a Next.js API route
- Rich text rendered from the CMS's structured content format
- Static generation with incremental revalidation

## Stack

Next.js · React · GraphQL (`graphql-request`) · Hygraph · Tailwind CSS · Moment.js

## Running locally

```bash
npm install
cp .env.example .env
npm run dev
```

`.env` needs two values:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GRAPHCMS_ENDPOINT` | The Hygraph project's content API endpoint |
| `GRAPHCMS_TOKEN` | A Hygraph token with mutation rights, for comment submission |

`.env` is gitignored — never commit real values.

## Notes

A learning project, built while working through a Next.js and headless-CMS
tutorial.
