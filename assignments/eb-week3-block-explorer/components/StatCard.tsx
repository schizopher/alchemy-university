import React from "react";

interface StatCardProps {
  heading: string;
  stat?: string;
}

const StatCard: React.FC<StatCardProps> = ({ heading, stat }) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-zinc-800 p-8">
      <dt className="text-sm font-semibold uppercase">{heading}</dt>
      {stat ? (
        <dd className="text-4xl">{stat}</dd>
      ) : (
        <dd className=" h-10 rounded-lg bg-zinc-700">&nbsp;</dd>
      )}
    </div>
  );
};

export default StatCard;
