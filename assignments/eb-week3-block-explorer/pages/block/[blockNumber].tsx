import { NextPage } from "next";
import { useRouter } from "next/router";
import BlockDetail from "~/containers/BlockDetail";

const BlockDetailPage: NextPage = () => {
  const router = useRouter();
  const blockNumber = Number(router.query.blockNumber as string);

  return (
    <main className="flex flex-col items-center">
      <div className="flex w-full max-w-screen-xl flex-col gap-4">
        <div>
          <BlockDetail blockNumber={blockNumber} />
        </div>
      </div>
    </main>
  );
};

export default BlockDetailPage;
