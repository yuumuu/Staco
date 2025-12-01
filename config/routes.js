const routes = [
  { path: "/", component: "app/Views/home.html", title: "Home" },
  { path: "/about", component: "app/Views/about.html", title: "About" },
  { path: "/docs", component: "app/Views/docs.html", title: "Documentation" },
  { path: "/divisions/:slug", component: "app/Views/divisions/detail.html", title: "Division Detail" },
  // { path: '/divisions', component: 'app/Views/divisions/index.html' },
  // { path: '/users', component: 'app/Views/users/index.html' },
  { path: "/404", component: "app/Views/errors/404.html" },
];
