**Button** — the action primitive; fully-rounded pill in five weights. Use `primary` (orange) for the single most consequential action per view, `dark` or `outline` for secondary actions, `ghost` for inline sub-actions, `danger` for destructive verdicts (Remove citation).

```jsx
<Button variant="primary">Escalate to Partner</Button>
<Button variant="outline" size="sm" iconLeft={<Icon name="download" />}>Export record</Button>
<Button variant="danger" size="sm">Remove citation</Button>
```

Variants: `primary · dark · outline · ghost · danger`. Sizes: `md` (44px) · `sm` (36px). Props: `disabled`, `fullWidth`, `iconLeft`, `iconRight`. Orange is a stamp — never put two `primary` buttons in one viewport.
