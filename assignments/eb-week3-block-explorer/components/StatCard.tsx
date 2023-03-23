import React from "react";

interface StatCardProps {
  heading: string;
  stat?: string;
}

const StatCard: React.FC<StatCardProps> = ({ heading, stat = "" }) => {
  return (
    <div className="flex max-w-lg flex-col gap-2 rounded-lg bg-zinc-800 p-4">
      <dt className="text-sm font-semibold uppercase">{heading}</dt>
      <dd className="text-4xl">{stat}</dd>
    </div>
  );
};

export default StatCard;
