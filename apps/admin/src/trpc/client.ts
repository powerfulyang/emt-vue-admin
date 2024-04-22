import type { AppRouter } from '@powerfulyang/server';
import { createTRPCClient, httpBatchLink, loggerLink } from '@trpc/client';
import superjson from 'superjson';

const url = '/trpc';

export const proxy = createTRPCClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url,
      transformer: superjson,
    }),
  ],
});
