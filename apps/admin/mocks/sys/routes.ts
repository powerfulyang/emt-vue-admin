import { HttpResponse, http } from 'msw'

const routes = [
  {
    title: '仪表盘',
    path: 'dashboard',
    icon: 'dashboard',
    children: [
      {
        title: '分析页',
        path: 'analysis',
        icon: 'dashboard-analysis',
      },
      {
        title: '工作台',
        path: 'workbench',
        icon: 'dashboard-workbench',
      },
    ],
  },
  {
    title: '表格',
    path: 'table',
    icon: 'table',
    children: [
      {
        title: '查询表格',
        path: 'search-table',
        icon: 'search-table',
      },
    ],
  },
]

export default [
  http.get('/api/routes', async () => {
    return HttpResponse.json(routes)
  }),
]
