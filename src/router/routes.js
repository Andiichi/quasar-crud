const routes = [
  // Rota que só redireciona '/'
  {
    path: '/',
    redirect: { name: 'home' }
  },

  // Rota principal com layout e filhos
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'pagina-inicial', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: 'nova-postagem/:id?', name: 'formPost', component: () => import('pages/FormPost.vue') }
    ]
  },

  // Rota 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
