# Hybrid CSS+JS Scroll Animations (AOS)

StarterCode menggunakan **Hybrid Scroll Animations** - CSS transitions dengan JavaScript trigger ringan menggunakan IntersectionObserver untuk kompatibilitas maksimal dengan semua browser termasuk Zen Browser.

## File

- **CSS:** `assets/css/scroll-animate-css.css` - Transitions & initial states
- **JS:** `assets/js/scroll-animate.js` - Lightweight IntersectionObserver trigger
- **Archived (old):** `assets/archive/scroll-animate.*.old` - Pure CSS version

## Usage

Cukup tambahkan class `aos-*` ke elemen HTML:

```html
<div class="aos-fade-up">Reveal on scroll</div>
<div class="aos-zoom">Zoom in on scroll</div>
<div class="aos-slide-left">Slide from right</div>
```

## Available Animations

### Fade Animations
- `aos-fade-up` - Fade in dari bawah
- `aos-fade-down` - Fade in dari atas
- `aos-fade-left` - Fade in dari kanan
- `aos-fade-right` - Fade in dari kiri

### Zoom Animations
- `aos-zoom` - Zoom in dengan fade
- `aos-zoom-out` - Zoom out dengan fade

### Slide Animations
- `aos-slide-up` - Slide dari bawah (lebih dramatis dari fade)
- `aos-slide-down` - Slide dari atas
- `aos-slide-left` - Slide dari kanan
- `aos-slide-right` - Slide dari kiri

### 3D Animations
- `aos-flip-up` - Flip 3D dari bawah
- `aos-flip-down` - Flip 3D dari atas

### Special Animations
- `aos-rotate-in` - Rotate dengan fade in
- `aos-bounce-in` - Bounce effect dengan fade

## Modifiers

### Duration
- `aos-duration-fast` - Animasi lebih cepat
- `aos-duration-slow` - Animasi lebih lambat

### Delay
- `aos-delay-100` - Delay 100ms
- `aos-delay-200` - Delay 200ms
- `aos-delay-300` - Delay 300ms
- `aos-delay-400` - Delay 400ms
- `aos-delay-500` - Delay 500ms

### Example with Modifiers

```html
<div class="aos-fade-up aos-duration-slow aos-delay-200">
  Slow fade with 200ms delay
</div>
```

## Browser Support

**Modern Browsers (dengan animasi):**
- ✅ Chrome/Edge 115+
- ✅ Safari 17.4+
- ✅ Firefox 114+
- ✅ **Zen Browser** (Firefox-based) - Fully supported!

**Legacy Browsers (fallback):**
- ❌ Browser lama akan menampilkan elemen langsung tanpa animasi
- Tidak ada error, hanya tidak ada animasi

> **Note for Firefox/Zen Browser:** The CSS includes `animation-duration: 1ms` which is required for `animation-timeline: view()` to work properly in Firefox-based browsers.

## Accessibility

Animasi otomatis dinonaktifkan untuk pengguna yang mengaktifkan `prefers-reduced-motion`. Elemen akan langsung terlihat tanpa animasi.

## Migration dari JavaScript AOS

**Before (JavaScript-based):**
```html
<div data-animate="fade-up">Content</div>
```

**After (Pure CSS):**
```html
<div class="aos-fade-up">Content</div>
```

## Keuntungan Pure CSS

1. ✅ **No JavaScript** - Lebih ringan, tidak perlu IntersectionObserver
2. ✅ **Better Performance** - Browser-native, hardware accelerated
3. ✅ **Simpler** - Tidak perlu reinit setelah DOM changes
4. ✅ **Modern** - Menggunakan CSS API terbaru
5. ✅ **Auto-cleanup** - Tidak ada memory leaks dari observers

## Customization

Untuk mengubah timing atau range animasi, edit `assets/css/scroll-animate-css.css`:

```css
.aos-fade-up {
  animation: fade-up linear;
  animation-timeline: view();
  animation-range: entry 0% cover 40%; /* Ubah ini untuk timing berbeda */
}
```

**Animation Range Explained:**
- `entry 0%` - Mulai animasi saat elemen mulai masuk viewport
- `cover 40%` - Selesai saat elemen sudah 40% masuk viewport
- Ubah `40%` ke nilai lebih besar untuk animasi lebih lambat
