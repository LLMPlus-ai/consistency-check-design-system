**StatusBadge** — the verification verdict, the product's core signal. Three sanctioned values only: `Verified` (green) · `Mischaracterised` (ochre) · `Fabricated` (red). Tinted pill with a status dot.

```jsx
<StatusBadge status="Verified" />
<StatusBadge status="Fabricated" solid />
```

Use the tinted (default) form in tables; `solid` only for a single emphatic header.
