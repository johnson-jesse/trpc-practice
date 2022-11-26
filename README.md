tRPC practice woes. Hand built playground based on https://github.com/trpc/examples-next-prisma-starter/blob/main/package.json

The basic e2e flow is working without inputs using `trpc.user.flatList.useQuery`.

But braking with leveraging inputs. Error seen when using `trpc.user.list.useInfiniteQuery`

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