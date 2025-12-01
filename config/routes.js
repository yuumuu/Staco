const routes = [
    // Main pages
    { path: '/', component: 'app/Views/home.html', title: 'Staco - Modern SPA Framework' },
    { path: '/features', component: 'app/Views/features.html', title: 'Features - Staco' },
    { path: '/docs', component: 'app/Views/docs.html', title: 'Documentation - Staco' },
    { path: '/about', component: 'app/Views/about.html', title: 'About - Staco' },
    
    // Example routes (uncomment to use division example)
    // { path: '/divisions', component: 'app/Views/examples/divisions/index.html', title: 'Divisions - Example' },
    // { path: '/divisions/:slug', component: 'app/Views/examples/divisions/detail.html', title: 'Division Detail - Example' },
    
    // Error pages
    { path: '/404', component: 'app/Views/errors/404.html', title: 'Page Not Found' }
];
