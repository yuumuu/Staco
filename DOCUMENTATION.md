# Documentation & Walkthrough

## 1. Overview
This is an **Advanced Lightweight SPA Framework** built with HTML, TailwindCSS, and Alpine.js. It runs entirely in the browser (no Node.js build step required), featuring a custom engine for components, layouts, routing, and state management.

It focuses on **HTML-based Client-Side Rendering (CSR)**, where components are defined in HTML files and hydrated with JavaScript (Alpine.js) for interactivity.

---

## 2. How to Use

### Running the Project
Since this framework uses `fetch` to load components, you must serve it via a local server to avoid CORS errors.
- **VS Code**: Right-click `index.html` -> "Open with Live Server".
- **Python**: `python -m http.server`
- **Node**: `npx serve .`

### Creating a Page
Create a file in `app/pages/mypage.html`:
```html
<layout name="main">
    <slot name="content">
        <h1>My Page</h1>
        <div x-data="{ count: 0 }">
            <button @click="count++">Count: <span x-text="count"></span></button>
        </div>
    </slot>
</layout>
```

### Routing System
Edit `routes.js`:
```js
const routes = [
    { path: '/', component: 'app/pages/home.html' },
    { path: '/about', component: 'app/pages/about.html' }
];
```

### Data Binding Helpers
The framework provides two powerful Alpine.js data helpers to easily fetch and bind JSON data.

#### 1. `collection(url)`
Fetches a JSON array.
```html
<div x-data="collection('data/items.json')">
    <template x-for="item in items">
        <h2 x-text="item.title"></h2>
    </template>
</div>
```

#### 2. `item(url, key, value)`
Fetches a single item.
```html
<div x-data="item('data/items.json', 'id', 1)">
    <h1 x-text="item.title"></h1>
</div>
```

---

## 3. Architecture

### Core Structure
- **`index.html`**: Entry point.
- **`main.js`**: Bootstraps the app.
- **`routes.js`**: Route definitions.
- **`core/engine.js`**: 
    - **HTML Loader**: Fetches and caches HTML files.
    - **Include Processor**: Handles `<include>` and `<layout>`.
    - **Template Engine**: Transforms `{{ var }}` to `x-text`.
- **`core/router.js`**: Hash-based router.
- **`core/store.js`**: Global state management.

### Features
- **HTML-First CSR**: Components are HTML files, logic is Alpine.js.
- **Zero Build Step**: Runs directly in the browser.
- **Dynamic Routing**: Supports URL parameters.
- **Data Binding**: Easy JSON fetching.

---

## 4. Development Task Log

- [x] **Project Initialization**: Created directory structure and core files.
- [x] **Core Engine**: Implemented HTML Loader, Include Processor, Layout/Slot System.
- [x] **Router**: Implemented Hash-based routing with 404 handling.
- [x] **Store**: Implemented Global Store with Alpine integration.
- [x] **Advanced Routing**: Added Regex support for dynamic routes (slugs).
- [x] **Data Binding**: Implemented `collection` and `item` helpers.
- [x] **Content**: Created Demo Pages, Navbar, Layouts, Division/User pages.
- [x] **Documentation**: Updated with comprehensive usage guides.
