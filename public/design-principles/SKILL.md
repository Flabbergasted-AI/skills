---
name: design-principles
description: "Applies 10 proven design principles to evaluate, critique, or build user interfaces. Use when: (1) reviewing UI/UX decisions, (2) building or modifying frontends, (3) asking for design feedback, (4) assessing visual hierarchy, layout, accessibility, or interaction patterns, (5) creating or editing React or components, (6) writing HTML/CSS/Tailwind. Triggers on keywords like design, UI, UX, interface, layout, accessibility, typography, hierarchy, responsive."
---

# Design Principles

Apply the 10 principles in `references/principles.md` when evaluating or building interfaces. Load that file for the full principle text and key guidelines.

## When Reviewing Existing UI

For each principle, check whether the UI:
1. **Layout** — Is there a logical grid, consistent spacing, and grouped proximity?
2. **Hierarchy** — Are primary/secondary levels clear via size, weight, or contrast?
3. **Consistency** — Do similar elements behave and look the same?
4. **Typography** — Are fonts limited, body text ≥16px, line lengths 40-75 chars?
5. **Interaction** — Are hover/active states distinct? Is feedback provided on actions?
6. **Error tolerance** — Are destructive actions confirmable? Can users undo?
7. **Accessibility** — Is contrast ≥4.5:1? Keyboard/screen reader support present?
8. **Responsive** — Do layouts adapt across breakpoints?
9. **Progressive disclosure** — Is complexity hidden until needed?
10. **User goals** — Does every element serve a clear task?

## When Building UI

Anchor design decisions to these principles. When drafting components, explicitly reference which principle each choice serves.

## When Giving Design Feedback

Frame critique around the specific principle being violated, then suggest a concrete fix.
