_Solved: Nov. 26th, 2022_

tRPC practice woes. Hand built playground based on https://github.com/trpc/examples-next-prisma-starter/blob/main/package.json

The basic e2e flow is working without inputs using `trpc.user.flatList.useQuery`.

But breaking when leveraging inputs through `trpc.user.list.useInfiniteQuery`.

```bash
TRPCClientError
    at TRPCClientError.from (file:///Users/xxx/practice-trpc/node_modules/@trpc/client/dist/transformResult-b10d288d.mjs:4:20)
    at file:///Users/xxx/practice-trpc/node_modules/@trpc/client/dist/links/httpBatchLink.mjs:190:56
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  meta: {
    response: Response {
      [Symbol(realm)]: null,
      [Symbol(state)]: [Object],
      [Symbol(headers)]: [HeadersList]
    }
  },
  shape: {
    json: {
      message: '[\n' +
        '  {\n' +
        '    "code": "invalid_type",\n' +
        '    "expected": "object",\n' +
        '    "received": "undefined",\n' +
        '    "path": [],\n' +
        '    "message": "Required"\n' +
        '  }\n' +
        ']',
      code: -32600,
      data: [Object]
    }
  },
  data: undefined,
  [cause]: undefined
}
```

The only clear difference I can see between this hand built stack and the example, is the database provider. The example is using postgres whereas I'm using mysql through planetscale. I'm not sure this is even an issue.

The error message doesn't give me enough of a hint to what layer may be failing.

nilskj (from trpc discord) — 
> Hello! That error can indicate that there is something going on with the transformer. I see that you have configured to use the superjson transformer on > server side, but not on client. You need to set it on both. Try add it on client next adapter in utils/trpc. See https://trpc.io/docs/data-
> transformers#using-superjson

And indeed I was missing the frontend transformer. Adding it here in the create function as part of the return fixes it.
```ts
export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
```
