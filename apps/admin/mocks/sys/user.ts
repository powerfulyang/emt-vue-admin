import { faker } from '@faker-js/faker'
import { HttpResponse, http } from 'msw'

export function createFakeUserList() {
  return [
    {
      userId: faker.number.int(),
      userName: 'admin',
      password: 'admin',
      realName: faker.person.fullName(),
      avatar: faker.image.avatar(),
      desc: faker.lorem.sentence(),
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super-admin',
        },
      ],
    },
    {
      userId: faker.number.int(),
      userName: 'test',
      password: 'test',
      realName: faker.person.fullName(),
      avatar: faker.image.avatar(),
      desc: faker.lorem.sentence(),
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'Tester',
          value: 'tester',
        },
      ],
    },
  ]
}
export default [
  http.post('/basic-api/login', async () => {
    return HttpResponse.json({
      code: 0,
      result: {
        token: `fakeToken1`,
      },
    })
  }),
  http.get('/basic-api/getUserInfo', async ({
    request,
  }) => {
    const token = request.headers.get('Authorization')
    if (!token) {
      return HttpResponse.json({
        code: -1,
        message: 'Invalid token',
      })
    }
    const userId = token.replace('Bearer ', '')
    const checkUser = createFakeUserList().find(
      item => item.userId === Number(userId),
    )
    return HttpResponse.json({
      code: 0,
      result: checkUser,
    })
  }),
]
