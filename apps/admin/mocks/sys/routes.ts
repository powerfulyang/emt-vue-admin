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
    title: '列表',
    path: 'list',
    icon: 'list',
    children: [
      {
        title: '查询表格',
        path: 'table',
        icon: 'list-table',
      },
    ],
  },
]

export default [
  http.get('/api/routes', async () => {
    return HttpResponse.json(routes)
  }),
]
