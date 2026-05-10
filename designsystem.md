# FIFA World Cup 2026 — Panini Sticker Album Design System

> Reference document for building UI components, cards, or visual systems inspired by the official 2026 Panini FIFA World Cup sticker collection.

---

## Brand Identity

- **Product:** FIFA World Cup 26™ — Panini Official Sticker Collection
- **Campaign tagline:** `WE ARE 26`
- **Hosts:** United States · Canada · Mexico
- **Scale:** 48 teams · 980 stickers · 112 pages · 7 stickers per pack

---

## Color Palette

### Core Colors

| Name        | Hex       | Usage                                      |
|-------------|-----------|--------------------------------------------|
| FIFA Blue   | `#1557A8` | Name bars, club bars, UI accents           |
| Baby Blue   | `#89C8F5` | Sticker card background                    |
| Deep Navy   | `#0A1E4A` | Flag/code bar, dark backgrounds            |
| White       | `#FFFFFF` | Country page top strip, text on dark       |
| Pitch Black | `#111111` | Body text, rarest parallel border          |

### Host Country Accent Colors

| Country       | Color        | Hex       |
|---------------|--------------|-----------|
| USA           | Red          | `#CC0000` |
| USA           | Blue         | `#003087` |
| Mexico        | Green        | `#009B3A` |
| Mexico        | Yellow       | `#FEDF00` |
| Canada        | Red          | `#D80621` |

> **Color system note:** FIFA built a flexible brand architecture — each host country has three predefined tone variations (e.g. three reds for Canada, three greens for Mexico, three blues for USA). Sponsors select from these tones; no new colors may be introduced.

---

## Typography

### Typefaces

| Face         | Role                                                        | Availability         |
|--------------|-------------------------------------------------------------|----------------------|
| **FWC 2026** | Primary — logo, campaign, stadium, broadcast, merchandise   | Proprietary (FIFA only) |
| **Noto Sans**| Secondary — body copy, sticker metadata, album page text    | Free / Google Fonts  |

### Type Styles

```
Campaign header:
  "WE ARE" — 9px, weight 700, letter-spacing 0.14em, ALL CAPS, color: rgba(255,255,255,0.5) on dark / team-color on white

Country name:
  20px, weight 900, color: team primary color, letter-spacing 0.02em

Player name bar:
  10–11px, weight 700, color: #FFFFFF, letter-spacing 0.03em

Player metadata (DOB / height / weight):
  9px, weight 400, color: rgba(255,255,255,0.7)

Club name:
  9px, weight 600, color: #FFFFFF
```

---

## Sticker Card — Anatomy

```
┌─────────────────────────────┐
│  [Baby Blue bg #89C8F5]     │  ← card background
│  ┌──────────┐  "26"         │  ← oversized "26" watermark (opacity ~8%)
│  │ [Player  │  watermark    │
│  │  photo   │  behind       │  ← player cutout on national-color tint
│  │  cutout] │               │
│  └──────────┘               │
├─────────────────────────────┤
│  [Deep Navy #0A1E4A]        │  ← flag + code bar
│  🏳️ BRA                    │  ← country flag (18×12px) + FIFA 3-letter code
├─────────────────────────────┤
│  [FIFA Blue #1557A8]        │  ← name bar
│  PLAYER NAME                │  ← weight 700, white, 10–11px
│  15·Jun·2000 · 176cm · 73kg│  ← DOB · height · weight, 9px semi-transparent
├─────────────────────────────┤
│  [FIFA Blue #1557A8]        │  ← club bar (returns from 2018 format)
│  Club: REAL MADRID          │  ← "Club:" muted + club name bold white
└─────────────────────────────┘
```

### Card Specs

- **Background:** `#89C8F5` (baby blue)
- **Watermark:** "26" in oversized bold, `rgba(255,255,255,0.08)`, bottom-right aligned
- **Border radius:** ~10px
- **Flag box:** 18×12px, border-radius 1–2px
- **Bars stacked** bottom-to-top: club → name/metadata → flag/code

---

## Album Page — Layout

```
┌────────────────────────────────────────┐
│  [WHITE strip]                         │
│  WE ARE          ← 9px, letter-spaced  │
│  BRAZIL          ← 20px bold, team color│
│  🏳️ Brazilian Football Confederation   │
├────────────────────────────────────────┤
│  [Team primary color background]       │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐           │
│  │    │ │    │ │    │ │    │           │  ← sticker slots (dashed border)
│  └────┘ └────┘ └────┘ └────┘           │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐           │
│  │    │ │    │ │    │ │    │           │
│  └────┘ └────┘ └────┘ └────┘           │
│  ... (20 slots total)                  │
├────────────────────────────────────────┤
│  Road to qualifying info               │
│  Group schedule (page 2)               │
└────────────────────────────────────────┘
```

### Page Specs

- **Top strip:** `#FFFFFF` — "WE ARE" small caps + country name in team color
- **Page body bg:** team's primary color
- **Per team:** 20 stickers — 18 players + 1 team photo + 1 FA badge
- **Page 1 footer:** road to qualifying
- **Page 2 footer:** group info + match schedule

---

## Parallel / Rarity System (North America)

| Border Color | Label          | Availability              |
|--------------|----------------|---------------------------|
| Purple       | Base           | Standard packs            |
| Bronze       | Bronze         | Limited                   |
| Silver       | Silver         | Limited                   |
| Gold         | Gold           | Limited                   |
| Orange       | Orange         | Amazon exclusive           |
| Blue         | Blue           | 1:2 packs                 |
| Red          | Red            | 1:25 packs                |
| Green        | Green          | 1:1,400 packs             |
| Black        | Black          | 1/1 (one-of-one)          |

> **Gold Flood Crumple** is a special textured/distortion finish applied to non-foil stickers — exclusive to Panini iCollect boxes.

---

## Special Album Sections

### Coca-Cola Insert
- Double-page spread in the center of the album
- 12 exclusive stickers (not in standard packs)
- Found inside specially-marked 20oz Coca-Cola / Coca-Cola Zero Sugar bottle labels
- Red accent branding, player in action with small white World Cup logo (top-left), name in white on left side + country

### FIFA Museum Section
- 11 stickers featuring past World Cup champions
- Heritage/historical treatment

### Introduction Section
- 9 stickers

### Host City Logos
- 16 city variants derived from the main tournament emblem
- The "26" numeral is rendered in local colors and cultural patterns per city
- Each city brand maintains the global emblem structure while expressing local identity

---

## Logo & Visual Identity

- **Main emblem:** World Cup trophy placed inside the number "26"
- **The "26"** acts as a vessel — player photos and national colors are applied inside it per context
- **WE ARE 26 campaign:** typographically driven, social-first, styled like the main logo
- **Flexibility:** no single fixed color palette — host cities and sponsors apply local color tones within defined rules
- **First time since 1990** the words "World Cup" are absent from the logo mark

---

## Key Numbers

| Metric               | Value  |
|----------------------|--------|
| Total stickers       | 980    |
| Album pages          | 112    |
| Teams                | 48     |
| Stickers per team    | 20     |
| Stickers per pack    | 7      |
| Special stickers     | 68     |
| Coca-Cola exclusives | 12     |
| Outside-pack total   | 14     |

---

## Implementation Notes for Claude Code

- Use `#89C8F5` as the primary card surface — not white
- The "26" watermark is purely decorative: large, bold, low-opacity, bottom-right anchored
- Country color bleeds into the card photo area as a tint layer (multiply or overlay blend)
- Name and metadata bars use two separate `#1557A8` blocks stacked — not a single bar
- The club bar is visually identical to the name bar but lighter metadata text
- "WE ARE" text pattern: always uppercase, tight letter-spacing, visually smaller than the country name below
- Page backgrounds should use the team's actual national color, not a generic tint
- Flag boxes are tiny (18×12px) with hard horizontal stripes — not rounded rectangles