import { setupWorker } from 'msw/browser'

const modules: Record<string, {
  default: Array<import('msw').RequestHandler>
}> = import.meta.glob('./**/*.ts', { eager: true })

export const handlers = Object.entries(modules)
  .filter(([key]) => {
    return !key.includes('/_')
  })
  .map(([_, module]) => {
    return module.default
  })
  .flat()

export async function createWorker() {
  const worker = setupWorker(...handlers)
  await worker.start({ onUnhandledRequest: 'bypass' })
}
