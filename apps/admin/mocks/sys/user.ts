import { faker } from '@faker-js/faker'
import { SignJWT, jwtVerify } from 'jose'
import { HttpResponse, http } from 'msw'

const secretKey = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
)

async function sign(payload: Record<string, any>) {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secretKey)
}

export function createFakeUserList() {
  return [
    {
      userId: faker.number.int(),
      username: 'admin',
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
      username: 'test',
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

const users = createFakeUserList()

export type User = typeof users[0]

export default [
  http.post<never, {
    username: string
    password: string
  }>('/api/login', async ({ request }) => {
    const { username, password } = await request.json()
    const checkUser = users.find(
      item => item.username === username && item.password === password,
    )
    if (!checkUser) {
      return HttpResponse.json({
        error: 'Invalid username or password',
      }, {
        status: 401,
      })
    }
    // use jose to sign jwt token
    const token = await sign({ username: checkUser.username })
    // set cookie
    return HttpResponse.json(checkUser, {
      headers: {
        'set-cookie': `token=Bearer ${token}; path=/; max-age=3600;`,
      },
    })
  }),
  http.get('/api/user/info', async ({
    cookies,
  }) => {
    let token = cookies.token
    if (!token) {
      return HttpResponse.json({
        error: 'Invalid token',
      }, {
        status: 401,
      })
    }
    token = token.replace('Bearer ', '')
    try {
      const { payload } = await jwtVerify(token, secretKey)
      const username = payload.username
      const checkUser = users.find(
        item => item.username === username,
      )
      if (!checkUser) {
        return HttpResponse.json({
          error: 'Invalid token',
        }, {
          status: 401,
        })
      }
      return HttpResponse.json(checkUser)
    }
    catch {
      return HttpResponse.json({
        error: 'Invalid token',
      }, {
        status: 401,
      })
    }
  }),
  http.post('/api/logout', async () => {
    return HttpResponse.json(null, {
      headers: {
        'set-cookie': 'token=clear; max-age=0; path=/;',
      },
    })
  }),
]
