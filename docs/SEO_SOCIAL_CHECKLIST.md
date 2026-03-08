# SEO + Social Media Checklist

Use this checklist before launch and after major content changes to keep the site search-friendly and share-friendly.

## 1) Production Configuration (must-do)

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real production domain (for canonical URLs, sitemap, and OG URLs)
- [ ] Confirm the site is accessible over HTTPS only
- [ ] Verify one canonical domain is used (avoid mixed `www` / non-`www` indexing)

## 2) Crawlability & Indexing

- [ ] Check `/robots.txt` returns 200 and includes the correct sitemap URL
- [ ] Check `/sitemap.xml` returns 200 and includes all public pages
- [ ] Ensure admin and API routes are disallowed/noindexed
- [ ] Ensure only intended public routes are indexable

## 3) Metadata Quality

- [ ] Each public page has a unique title and meaningful description
- [ ] Canonical is present for all public pages
- [ ] Open Graph fields are valid (`title`, `description`, `url`, `image`)
- [ ] Twitter card fields are valid (`summary_large_image` preferred)

## 4) Structured Data (JSON-LD)

- [ ] Organization schema is present on the site
- [ ] WebSite schema is present on the site
- [ ] Blog article pages include `Article` schema
- [ ] Validate schema output with Google Rich Results Test

## 5) Social Share Preview Checks

- [ ] Test homepage URL in social debugger tools
- [ ] Confirm OG image (`/opengraph-image`) renders correctly
- [ ] Confirm Twitter image (`/twitter-image`) renders correctly
- [ ] Verify title/description are compelling and accurate

## 6) Content SEO Basics

- [ ] One clear H1 per page
- [ ] Mission-aligned keywords naturally included in headings and body
- [ ] Internal links between homepage, support-center, testimony, and blog
- [ ] Blog posts include concise excerpt, publish date, and tags

## 7) Performance & UX Signals

- [ ] `npm run build` passes with no errors
- [ ] Core pages load quickly and are mobile-friendly
- [ ] Images have meaningful alt text
- [ ] No broken links on primary navigation and footer

## 8) Search Console / Analytics Ops

- [ ] Add and verify property in Google Search Console
- [ ] Submit sitemap in Search Console
- [ ] Monitor indexing coverage and fix excluded-but-expected URLs
- [ ] Track top landing pages and optimize titles/descriptions based on CTR

## 9) High-Impact Social Distribution Routine

- [ ] Publish each major story/update as a blog post with share-ready headline
- [ ] Share to at least 2 channels (X, LinkedIn, Instagram, WhatsApp community, etc.)
- [ ] Use campaign links (UTM params) for social posts
- [ ] Repurpose one post into: short video, quote card, and carousel

## 10) Weekly Maintenance

- [ ] Review Search Console performance (queries, clicks, impressions)
- [ ] Refresh underperforming page titles/descriptions
- [ ] Add at least one new internal link from latest content to donation/support pages
- [ ] Re-check social previews for newly published pages

---

## Quick Commands

```bash
npm run build
```

Key endpoints to verify in production:

- `/robots.txt`
- `/sitemap.xml`
- `/opengraph-image`
- `/twitter-image`
- `/blog`
- `/support-center`
