# Skeleton Loader Documentation

## Pengenalan

Skeleton Loader adalah utility untuk menampilkan placeholder animasi saat konten sedang dimuat. Ini memberikan feedback visual yang lebih baik kepada user dibandingkan dengan loader spinner biasa.

## Kapan Menggunakan Skeleton vs Loader

### Gunakan Skeleton Loader Ketika:
- ✅ Memuat **list atau grid data** (users, products, posts)
- ✅ Konten memiliki **struktur yang jelas** (card, table, form)
- ✅ Loading time **> 500ms** (cukup lama untuk user notice)
- ✅ Ingin memberikan **preview struktur** konten yang akan muncul

### Gunakan Loader Biasa (Spinner) Ketika:
- ✅ Loading time **< 500ms** (sangat cepat)
- ✅ Konten **tidak memiliki struktur jelas** (full page, dynamic content)
- ✅ **Action sederhana** (submit form, delete item)
- ✅ **Global loading** (navigasi antar halaman)

## API Reference

### `Skeleton.text(lines = 1)`

Menghasilkan skeleton untuk teks.

**Parameters:**
- `lines` (number, optional): Jumlah baris skeleton text. Default: 1

**Returns:** HTML string

**Example:**
```javascript
// Single line
Skeleton.text()
// Output: <div class="skeleton skeleton-text" style="width: 85%;"></div>

// Multiple lines
Skeleton.text(3)
// Output: 3 skeleton text lines dengan width random 80-100%
```

### `Skeleton.avatar()`

Menghasilkan skeleton untuk avatar/gambar bulat.

**Returns:** HTML string

**Example:**
```javascript
Skeleton.avatar()
// Output: <div class="skeleton skeleton-avatar"></div>
```

### `Skeleton.grid(count = 3, columns = 3)`

Menghasilkan skeleton grid untuk card layout.

**Parameters:**
- `count` (number, optional): Jumlah card skeleton. Default: 3
- `columns` (number, optional): Jumlah kolom grid. Default: 3

**Returns:** HTML string

**Example:**
```javascript
// 3 cards, 3 columns
Skeleton.grid(3, 3)

// 6 cards, 2 columns
Skeleton.grid(6, 2)
```

## Penggunaan dengan Alpine.js

### Contoh 1: Manual Loading State

```html
<div x-data="{ 
    users: [],
    loading: true,
    async loadUsers() {
        this.loading = true;
        const data = await Framework.fetchJSON('data/users.json');
        this.users = data;
        this.loading = false;
    }
}" x-init="loadUsers()">
    
    <!-- Skeleton saat loading -->
    <template x-if="loading">
        <div x-html="Skeleton.grid(3, 3)"></div>
    </template>

    <!-- Konten actual -->
    <template x-if="!loading">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <template x-for="user in users" :key="user.id">
                <div class="bg-white p-6 rounded-lg">
                    <h3 x-text="user.name"></h3>
                    <p x-text="user.role"></p>
                </div>
            </template>
        </div>
    </template>
</div>
```

### Contoh 2: Dengan Collection Helper

```html
<div x-data="collection('data/users.json')">
    
    <!-- Skeleton saat loading -->
    <template x-if="loading">
        <div x-html="Skeleton.grid(3, 3)"></div>
    </template>

    <!-- Konten actual -->
    <template x-if="!loading">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <template x-for="user in items" :key="user.id">
                <div class="bg-white p-6 rounded-lg">
                    <h3 x-text="user.name"></h3>
                    <p x-text="user.role"></p>
                </div>
            </template>
        </div>
    </template>
</div>
```

### Contoh 3: Custom Skeleton Layout

```html
<div x-data="{ loading: true }">
    <template x-if="loading">
        <div class="space-y-4">
            <!-- Header skeleton -->
            <div class="flex items-center gap-4">
                <div x-html="Skeleton.avatar()"></div>
                <div class="flex-1" x-html="Skeleton.text(2)"></div>
            </div>
            
            <!-- Content skeleton -->
            <div x-html="Skeleton.text(5)"></div>
            
            <!-- Cards skeleton -->
            <div x-html="Skeleton.grid(4, 2)"></div>
        </div>
    </template>
</div>
```

## Penggunaan Vanilla JavaScript

```javascript
// Set skeleton saat mulai loading
const container = document.getElementById('user-list');
container.innerHTML = Skeleton.grid(6, 3);

// Fetch data
fetch('data/users.json')
    .then(r => r.json())
    .then(users => {
        // Replace skeleton dengan konten actual
        container.innerHTML = users.map(user => `
            <div class="card">
                <h3>${user.name}</h3>
                <p>${user.role}</p>
            </div>
        `).join('');
    });
```

## Styling

Skeleton menggunakan CSS classes dari `core/styles/core.css`:

```css
.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s ease-in-out infinite;
}

.skeleton-text {
    height: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
}

.skeleton-avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
}
```

## Best Practices

### ✅ DO

```html
<!-- Match skeleton dengan layout actual -->
<template x-if="loading">
    <div class="grid grid-cols-3 gap-6">
        <div x-html="Skeleton.grid(3, 3)"></div>
    </div>
</template>

<template x-if="!loading">
    <div class="grid grid-cols-3 gap-6">
        <!-- actual content -->
    </div>
</template>
```

### ❌ DON'T

```html
<!-- Jangan gunakan skeleton untuk loading cepat -->
<template x-if="loading">
    <div x-html="Skeleton.grid(20, 5)"></div> <!-- Too many! -->
</template>

<!-- Jangan gunakan skeleton yang tidak match dengan layout -->
<template x-if="loading">
    <div x-html="Skeleton.grid(3, 3)"></div> <!-- Grid 3 columns -->
</template>
<template x-if="!loading">
    <div class="flex flex-col"> <!-- Tapi actual layout vertical! -->
        <!-- content -->
    </div>
</template>
```

## Migration Guide

### Dari Auto-Skeleton (Lama)

Sebelumnya, skeleton dimuat otomatis saat navigasi halaman:

```javascript
// ui.js (OLD - auto skeleton)
Framework.render = async function (componentPath, targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.innerHTML = Skeleton.grid(2, 2); // AUTO!
    }
    // ... render logic
}
```

### Ke Manual Skeleton (Baru)

Sekarang, Anda harus menggunakan skeleton secara eksplisit:

```html
<!-- Tambahkan loading state di component Anda -->
<div x-data="{ loading: true }">
    <template x-if="loading">
        <div x-html="Skeleton.grid(3, 3)"></div>
    </template>
    
    <template x-if="!loading">
        <!-- actual content -->
    </template>
</div>
```

**Keuntungan:**
- ✅ Lebih kontrol penuh kapan skeleton muncul
- ✅ Bisa customize skeleton sesuai layout
- ✅ Tidak ada skeleton yang muncul di halaman yang tidak memerlukan
- ✅ Performance lebih baik (tidak render skeleton di setiap navigasi)

## Troubleshooting

### Skeleton tidak muncul

**Problem:** `x-html="Skeleton.grid(3, 3)"` tidak menampilkan apa-apa

**Solution:**
1. Pastikan `core/ui.js` atau `core/ui.min.js` sudah di-load
2. Check console untuk error
3. Pastikan `window.Skeleton` tersedia:
   ```javascript
   console.log(window.Skeleton); // Should be an object
   ```

### Skeleton tidak hilang setelah data loaded

**Problem:** Skeleton tetap muncul meskipun data sudah loaded

**Solution:**
1. Pastikan `loading` state di-set ke `false` setelah data loaded
2. Check logic `x-if="loading"` dan `x-if="!loading"`
3. Gunakan `x-show` jika perlu transisi smooth:
   ```html
   <div x-show="loading" x-transition>
       <div x-html="Skeleton.grid(3, 3)"></div>
   </div>
   ```

### Skeleton tidak match dengan layout actual

**Problem:** Skeleton grid 3 kolom tapi actual content 2 kolom

**Solution:**
Sesuaikan parameter skeleton dengan layout actual:
```html
<!-- Skeleton -->
<div x-html="Skeleton.grid(6, 2)"></div> <!-- 6 items, 2 columns -->

<!-- Actual -->
<div class="grid grid-cols-2 gap-6"> <!-- 2 columns -->
    <!-- items -->
</div>
```

## Lihat Juga

- [Core UI Documentation](file:///d:/Projects/StarterCode/core/README.md)
- [Alpine.js Documentation](https://alpinejs.dev/)
- [Collection Helper](file:///d:/Projects/StarterCode/core/engine.js) - Line 313
