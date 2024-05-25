import { HttpResponse, http } from 'msw'

const routes = [
  {
    title: 'menu.dashboard',
    path: 'dashboard',
    icon: 'dashboard',
    children: [
      {
        title: 'menu.analysis',
        path: 'analysis',
        icon: 'dashboard-analysis',
      },
      {
        title: 'menu.workbench',
        path: 'workbench',
        icon: 'dashboard-workbench',
      },
    ],
  },
  {
    title: 'menu.table',
    path: 'table',
    icon: 'table',
    children: [
      {
        title: 'menu.advanced-table',
        path: 'search-table',
        icon: 'search-table',
      },
    ],
  },
  {
    title: 'menu.bucket-manage',
    path: 'bucket',
    icon: 'bucket',
    children: [
      {
        title: 'menu.bucket-list',
        path: 'list',
        icon: 'bucket-list',
      },
    ],
  },
]

export default [
  http.get('/api/routes', async () => {
    return HttpResponse.json(routes)
  }),
]
