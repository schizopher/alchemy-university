import React from "react";
import StatCard from "~/components/StatCard";
import useLatestBlock from "~/hooks/useLatestBlock";

const LatestBlock: React.FC = () => {
  const { data, isLoading, error } = useLatestBlock();
  return (
    <StatCard heading="Latest Block" stat={data?.toLocaleString("en-US")} />
  );
};

export default LatestBlock;
