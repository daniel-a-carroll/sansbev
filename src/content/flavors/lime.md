---
name: Lime
order: 1
status: in-development
tagline: '[[PLACEHOLDER — short flavor tagline. The line on the can is brand-level, not per-flavor.]]'
description: '[[PLACEHOLDER — one or two sentences. Composition and taste, not effect.]]'
canSizeFlOz: 12
caffeineMg: 160
color:
  field: '#7ED02C'
  onText: '#0A0A08'
  ink: '#3E7017'
---

[[PLACEHOLDER — longer flavor description for the Lime SKU. Composition and taste
only; anything describing an effect on the body belongs in src/data/claims.ts.

Confirmed from the packaging render and carried in the frontmatter above:
12 fl oz (355 mL), 160mg caffeine from green coffee, made with real fruit juice.

Still needed — add to the frontmatter as they are decided. Each is optional and
its row or section simply does not render until it exists:

  tastingNotes:        list of strings
  ingredients:         full declared ingredient list, in label order
  allergenStatement:   string
  juicePercent:        number — also gates the nutrient-content claim; see src/data/claims.ts
  lTheanineMg:         number
  upc:                 12-14 digits
  nutrition:           see the schema in src/content.config.ts]]
