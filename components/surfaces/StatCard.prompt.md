**StatCard** — a single dashboard metric: big Bricolage display value over an overline label and caption. Pass `accent` (a status hue) to colour the value and a left rule for verified/fabricated tallies.

```jsx
<StatCard value="12" label="Total citations" caption="Extracted from skeleton argument" />
<StatCard value="3" label="Fabricated" caption="No reliable authority found" accent="var(--fabricated)" />
```
