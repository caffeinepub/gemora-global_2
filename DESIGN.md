# GEMORA GLOBAL: Kanhai Jewels–Inspired B2B Wholesale Redesign

## Direction
Premium B2B luxury imitation jewellery wholesale platform. Clean white, navy dominance, gold accents. Professional, trust-building, zero playfulness. Transparent-to-navy header animation. Full-width hero slider. Modern responsive product grid (4–6 columns). Red MOQ badges for B2B emphasis.

## Palette (OKLCH)
| Token | OKLCH | Hex | Usage |
|-------|-------|-----|-------|
| Navy (Primary) | 0.24 0.14 264 | #1A237E | Header, sidebar, primary text, CTAs |
| Gold (Accent) | 0.75 0.17 70 | #D4AF37 | Accents, announcement strip, MOQ highlight |
| White (Background) | 0.98 0.002 0 | #FAFBFB | Page background, card surfaces |
| Muted Light | 0.92 0.005 0 | #EBEBEB | Subtle dividers, inactive states |
| Red (Destructive/MOQ) | 0.60 0.22 27 | #DC3545 | MOQ badge, high-contrast warning |
| Sky Blue (Secondary) | 0.68 0.15 232 | #42A5F5 | Secondary highlights, support |

## Typography
| Level | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| Display | Playfair Display | 32–48px | 700 | Page headings, hero copy |
| Body | Plus Jakarta Sans | 14–16px | 400–500 | Product descriptions, body text |
| UI | Plus Jakarta Sans | 12–14px | 600 | Badges, buttons, labels |

## Structural Zones
| Zone | Treatment | Shadow | Border |
|------|-----------|--------|--------|
| Announcement Strip | Solid gold (#D4AF37), dismissible, sticky top | None | None |
| Header | Transparent on load, navy on scroll > 50px, 0.4 backdrop blur | None | Subtle bottom border on scroll |
| Hero Slider | Full-width, 96px mobile / 600px desktop, product image + CTA | Elevated on hover | None |
| Product Grid | 2 cols mobile, 3 cols tablet, 4–5 cols desktop, white cards | Card shadow (0.08 opacity), elevated hover | Subtle border, 1px #EBEBEB |
| Footer | Navy background, gold accents on links, white text | Subtle top | Top border #EBEBEB |

## Spacing & Rhythm
- Announcement strip: 8px padding (vertical), full width
- Header: 16px horizontal padding, 12px vertical padding
- Hero slider: 0 padding edges, full bleed
- Product grid: 24px gap (mobile), 32px gap (desktop)
- Section padding: 48px vertical, 24px horizontal (mobile), 64px vertical (desktop)

## Component Patterns
- **Product Card:** White bg, subtle shadow, square image, product name, price, red MOQ badge (bottom-right), hover → elevated shadow + slight scale
- **CTA Button:** Navy primary, gold secondary; 12px rounded; bold text; hover opacity 90%, active 80%
- **Trust Badge:** Muted bg, navy text, rounded-full, 12px side padding
- **MOQ Badge:** Red bg, white text, absolute positioned, font-semibold, shadow-moq

## Motion & Animation
- **Scroll-reveal:** Fade-in-up 0.65s ease on page load (existing)
- **Header transition:** Smooth 0.3s cubic-bezier scroll state
- **Hover effects:** Product card → shadow elevation + slight scale 1.02
- **Announcement strip:** Slide-in-top 0.4s on page load

## Signature Detail
Transparent header that solidifies into navy on scroll, creating a premium "reveal" effect. Gold accents cluster on CTAs and announcement strip (never scattered). MOQ badge in high-contrast red bottom-right of each product card emphasizes B2B wholesale positioning. No decorative gradients, no playful animations — all functional elegance.

## Constraints
- Max width: 1400px (Tailwind 2xl breakpoint)
- Mobile-first responsive (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- Lazy loading for all product images below hero
- Promotional strip dismissible (localStorage toggle)
- No images in sidebar (admin panel)
- Header logo auto-sized responsive
- Product grid reflows: 2 → 3 → 4 → 5 columns
