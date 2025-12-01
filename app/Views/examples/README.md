# Example Views

Example view implementations demonstrating Staco's features and best practices.

## Available Examples

### divisions/
Complete list and detail views showing:
- Controller integration with `$controller()` magic helper
- Loading and error states
- Nested data rendering (members, programs)
- Responsive layouts
- Scroll animations

## How to Use

1. **Study the structure** and patterns used
2. **Copy useful patterns** to your own views
3. **Delete this folder** when you're ready to start fresh

## File Structure

```
examples/
└── divisions/
    ├── index.html    # List view with grid layout
    └── detail.html   # Detail view with nested data
```

## Integration

To use these examples:

1. **Enable routes** in `config/routes.js` (uncomment example routes)
2. **Add navigation** in `app/Components/navbar.html`
3. **Ensure controller exists** in `app/Controllers/examples/`
4. **Verify data files** in `storage/data/examples/`

## See Also

- **Controllers**: `app/Controllers/examples/`
- **Data**: `storage/data/examples/`
- **Helpers**: `public/js/examples/`
