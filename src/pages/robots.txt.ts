import type { APIRoute } from 'astro';
import { siteConfig } from '../../site.config';

export const GET: APIRoute = () => {
  const robots = `# kosten-pv-anlage.de — Robots.txt
# Generated dynamically

User-agent: *
Allow: /
Disallow: /api/
Disallow: /_astro/

# Sitemaps
Sitemap: https://${siteConfig.domain}/sitemap-index.xml

# Googlebot
User-agent: Googlebot
Allow: /

# Google Image Bot
User-agent: Googlebot-Image
Allow: /images/

# Bing
User-agent: Bingbot
Allow: /

# AI Crawlers — allow for LLM visibility
User-agent: GPTBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
`;
  return new Response(robots, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
