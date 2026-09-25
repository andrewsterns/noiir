# Input · Field

A labelled text field with a `>` prompt. Its hint and error are wired to `aria-describedby`, and the error is announced. `Field` is the shared wrapper that Textarea and Select also render through.

```tsx
<Input label="Email" type="email" value={vm.email} onValueChange={vm.setEmail}
  hint="We never share it" error={vm.emailError} required />
<Input label="Search" hideLabel type="search" placeholder="Filter nodes…" />
```

| Prop | |
|---|---|
| `label` | required (use `hideLabel` to keep it for screen readers only) |
| `hint` | help text under the field |
| `error` | `true` marks it invalid; a string also shows the message (role=alert) |
| `value` / `defaultValue` / `onValueChange(value)` | controlled or uncontrolled |
| `type` | text · email · password · search · number · tel · url |
| `prompt` | show `>`; default true |
| `name` `required` `disabled` `readOnly` `placeholder` `autoComplete` | as in HTML |

Layout props (`w`, `grow`, `margin` …) apply to the whole field. Clicking anywhere in the box focuses the input.

## States
Hover brightens the line · focus inside rings the whole box · error turns the line `danger` and sets aria-invalid.

## UX rules
- Always a visible label. A placeholder is an example, not a label.
- Validate when the user leaves the field, not on every keystroke. Clear the error as soon as the value is fixed.
- Error messages say how to fix it ("Use an address like name@site.com").
