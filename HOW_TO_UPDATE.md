# How to update this visualizer when a regulation changes

Compliance moves fast. This visualizer is built so a regulatory change lands in
**three small edits** and propagates everywhere automatically, the home page,
the chapter visualizers, the changelog timeline, and the source citations.

---

## The single source of truth

Every numeric figure, threshold, deadline, and named requirement lives in one
of three files:

| File | Holds | When you edit it |
|---|---|---|
| `src/data/regulations.ts` | The regulation values themselves (`5 seconds`, `€24,490`, `2026-01-30`, …). | When the rule itself changes. |
| `src/data/changelog.ts`   | Append-only log of every edit, with `previousValue`, `newValue`, and `reason`. | Every time you edit `regulations.ts`. |
| `src/data/sources.ts`     | Citations: regulator URL, publication date, title. | When a source moves, is reissued, or a brand-new citation is needed. |

Components (the visualizers in `src/components/chapters/`) **never hardcode a number**.
They look it up by `id` from `regulations.ts`. So one edit to that file updates
every visualizer that touches that figure.

---

## The 3-step procedure

### 1. Find the regulation in `src/data/regulations.ts`

Search for the `id` (e.g. `ukgc.min-cycle-seconds`) or the topic (e.g. "AML trigger").

If the regulation **already exists**, you are doing an UPDATE. If it does not, you are
doing an ADD.

### 2. Edit the regulation entry

For an UPDATE:

```ts
{
  id: 'ukgc.min-cycle-seconds',
  // ...
  value: 6,                               // ← was 5
  effectiveDate: '2026-07-01',            // ← updated
  status: 'in-force',                     // or 'pending' if announced but not yet live
  version: 2,                             // ← bump
  sourceIds: ['ukgc-rts'],                // add a new source if needed
  notes: 'Raised from 5 s to 6 s following the Q2 2026 RTS consultation outcome.',
  lastVerified: '2026-07-01',             // ← bump to today's date
}
```

For an ADD: copy the closest existing entry as a template, give it a new `id`
(`<jurisdiction>.<short-handle>`), and start `version` at `1`.

If the new value supersedes an existing regulation rather than mutating it
(e.g. a brand-new regulation replaces an older one), set the old entry's
`status` to `'superseded'` and add the new entry alongside it. Use a
`'superseded'` changelog entry to link them.

### 3. Append one row to `src/data/changelog.ts`

```ts
{
  date: '2026-07-01',
  regulationId: 'ukgc.min-cycle-seconds',
  kind: 'updated',                        // added | updated | superseded | clarified | removed
  previousValue: 5,
  newValue: 6,
  reason: 'UKGC consultation outcome lifted minimum cycle to 6 s effective 1 Jul 2026.',
  sourceIds: ['ukgc-rts'],
  editor: 'dineth',                       // your handle
},
```

That's it. Save both files.

---

## What the visualizer does automatically

- The `RegulationBadge` next to every visualizer now shows **v2** with the new
  `lastVerified` date and the relative-time hint ("just now").
- The home dashboard&apos;s "Recently changed" panel surfaces your edit at the top.
- The `/changelog` route renders the new entry in the date-grouped timeline,
  with the previous/new diff highlighted.
- The "Live · 2026-07-01" pill in the top-right header bumps to today.
- The chapter visualizers that consume the regulation (e.g. `MinCycleEnforcer`)
  immediately enforce the new value.

---

## Adding a new source

Edit `src/data/sources.ts`:

```ts
{
  id: 'ukgc-rts-2026-q3-amendment',
  title: 'RTS Amendment, Minimum cycle time (Q3 2026)',
  publisher: 'UK Gambling Commission',
  url: 'https://www.gamblingcommission.gov.uk/...',
  publishedDate: '2026-07-01',
  notes: 'Consultation outcome amending the 17 Jan 2025 RTS revision.',
},
```

Reference the new `id` in the regulation&apos;s `sourceIds` array and in the
changelog entry&apos;s `sourceIds` array.

---

## Adding a new regulation that doesn&apos;t fit existing chapters

1. Add the regulation to `regulations.ts` with a sensible `topic` and `scriptSection` (or omit `scriptSection` if not in the script).
2. Add a row to `changelog.ts` with `kind: 'added'`.
3. If a new visualizer is warranted, drop it into the matching chapter folder
   under `src/components/chapters/` and have it call `getRegulation('your.new.id')`
   and render `<RegulationBadge id="your.new.id" />`.

---

## Removing or sunsetting a regulation

Don&apos;t delete the entry, set its `status` to `'superseded'` (or `'removed'` if
the regulator withdrew it entirely) and add a `kind: 'removed'` entry to the
changelog. This preserves the audit trail.

---

## Conventions

- **`id`** uses lowercase dot notation: `<jurisdiction>.<short-handle>`. Once published, never rename, other code depends on it.
- **Dates** are ISO 8601 (`YYYY-MM-DD`). No relative dates anywhere.
- **`reason`** in changelog entries should be 1–2 sentences explaining *why* the change happened. Cite the regulator action / consultation / directive.
- **`editor`** is your handle (no email addresses).
- **Bump `version`** on every value change. Skip the bump for purely cosmetic edits to `notes` (use `kind: 'clarified'` then).

---

## After landing a change

```bash
npm run typecheck   # must pass
npm run build       # must pass
```

Bump `version` in `package.json` if the change is material (e.g. a new
in-force rule). Commit with a message like:

```
regs: ukgc.min-cycle-seconds 5s → 6s (Q3 2026 amendment)
```

That&apos;s the entire workflow.
