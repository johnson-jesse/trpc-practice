import NextError from "next/error";
import { trpc } from "../utils/trpc";
export default function IndexPage() {
  /**
   * This works
   */
  // const users = trpc.user.flatList.useQuery();

  /*
   * This breaks
   */
  const users = trpc.user.list.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getPreviousPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    }
  );

  if (users.error) {
    return (
      <NextError
        title={users.error.message}
        statusCode={users.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (!users.data) {
    return <div>Loading...</div>;
  }

  return <div>ayo</div>
}
