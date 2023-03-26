import { NextPage } from "next";
import { useRouter } from "next/router";
import TransactionDetail from "~/containers/TransactionDetail";

const TransactionDetailPage: NextPage = () => {
  const router = useRouter();
  const hash = router.query.hash as string;

  return (
    <main className="flex flex-col items-center">
      <div className="flex w-full max-w-screen-xl flex-col gap-4">
        <div>
          <TransactionDetail hash={hash} />
        </div>
      </div>
    </main>
  );
};

export default TransactionDetailPage;
