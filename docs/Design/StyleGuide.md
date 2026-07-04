# MachineDex Style Guide

## Mission

MachineDex is a digital field manual for Brennco's manufacturing assets.

It should make Brennco's machines, equipment, processes, and shop knowledge easy to browse, understand, maintain, and expand.

The project should feel useful first, beautiful second, and impressive because of how clearly it organizes real shop knowledge.

---

## Visual Identity

MachineDex should feel like:

- Engineering field manual
- Blueprint archive
- Military equipment registry
- Classic comic-book hero reference
- Precision manufacturing dashboard

It should not feel like:

- Generic SaaS dashboard
- Neon cyberpunk interface
- Consumer app
- Toy-like Pokédex clone
- Overly rounded modern startup UI

---

## Core Aesthetic

The core visual language is:

- Navy
- Warm paper white
- Industrial steel gray
- Brass/gold accents
- Pen-and-ink technical illustration
- Strong borders
- Structured panels
- High information density
- Minimal decoration unless it reinforces the field-manual identity

---

## Color Direction

Primary colors:

- Deep navy
- Paper white / warm cream
- Industrial steel gray

Accent colors:

- Brass / muted gold
- Operational green
- Warning amber
- Error red only when needed

Color rule:

Use color with restraint. The interface should feel calm, technical, and durable.

---

## Typography

Headings should feel bold, condensed, and authoritative.

The current heading inspiration is similar to:

- Akira Expanded
- Bebas Neue
- Oswald
- military stencil / technical manual typography

Body text should remain readable and practical.

Typography should support hierarchy:

- Large machine names
- Clear MDX IDs
- Small technical labels
- Compact specification values

---

## Illustration Standard

Machine illustrations are a major part of the MachineDex identity.

Official machine artwork should be:

- Pen and ink
- Black and white or near-monochrome
- Technical
- Detailed
- High contrast
- White or warm paper background
- Consistently framed
- Consistently scaled
- More powerful and mechanical than cute or simplified

The Bliss 110c pen-and-ink illustration is the current quality benchmark.

---

## Asset Authority

Artwork, logos, icons, fonts, colors, and visual reference images are curated project assets.

Codex may reference these assets, but should not overwrite official assets unless explicitly instructed.

If placeholder assets are required, they should be clearly treated as temporary.

Official project assets always take priority over generated placeholders.

---

## Machine Card Rules

Machine cards should be portrait-oriented whenever possible.

Each machine card should clearly show:

- MDX ID
- Machine illustration
- Machine name
- Machine type or category
- Operational status

The artwork should be the first visual read.

Cards should feel collectible, but still professional and industrial.

---

## Layout Principles

The preferred layout is:

- Left sidebar navigation
- Center machine browser
- Right machine detail panel

This layout should remain stable unless a future work order specifically changes it.

The interface should be desktop-first.

Spacing should feel deliberate.

Panels should feel like technical documents or equipment registry cards.

---

## UI Principles

MachineDex should be:

- Clean
- Structured
- Information-dense
- Easy to scan
- Easy to expand
- Visually consistent
- Built for real shop use

Avoid decorative complexity unless it improves the field-manual identity.

---

## Data and Asset Philosophy

Machine-specific assets belong inside each machine folder.

Example:

public/machines/MDX-001 - Bliss 110c/artwork/machine.png

Shared assets belong in:

public/assets/icons
public/assets/logo

The application should reference assets cleanly so that artwork, logos, colors, and images can be manually replaced without requiring a code rewrite.

---

## Development Rule

Each visible work order should preserve the current foundation unless the work order explicitly changes it.

Do not redesign stable sections while completing a narrow task.

Every session should end with a visible improvement to the MachineDex.