const routes = [
  { path: "/", component: "app/pages/home.html", title: "Home" },
  { path: "/about", component: "app/pages/about.html", title: "About" },
  { path: "/docs", component: "app/pages/docs.html", title: "Documentation" },
  { path: "/divisions/:slug", component: "app/pages/divisions/detail.html", title: "Division Detail" },
  // { path: '/divisions', component: 'app/pages/divisions/index.html' },
  // { path: '/users', component: 'app/pages/users/index.html' },
  { path: "/404", component: "app/pages/errors/404.html" },
];
