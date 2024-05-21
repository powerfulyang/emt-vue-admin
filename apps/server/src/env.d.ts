declare module 'cloudflare:test' {
  interface ProvidedEnv {
    DB: D1Database
    BUCKET: R2Bucket
    ENVIRONMENT: 'development' | undefined

    BUCKET_NAME: string
  }
}
