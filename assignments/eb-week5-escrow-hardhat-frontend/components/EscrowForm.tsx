import React, { FormEvent } from "react";

interface EscrowFormProps {
  handleSubmit: (
    arbiterAddress: string,
    beneficiaryAddress: string,
    depositAmount: string
  ) => void;
}

const EscrowForm: React.FC<EscrowFormProps> = ({ handleSubmit }) => {
  const [arbiterAddress, setArbiterAddress] = React.useState<string>("");
  const [beneficiaryAddress, setBeneficiaryAddress] =
    React.useState<string>("");
  const [depositAmount, setDepositAmount] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const clearForm = () => {
    setArbiterAddress("");
    setBeneficiaryAddress("");
    setDepositAmount("");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit(arbiterAddress, beneficiaryAddress, depositAmount);
      clearForm();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 rounded bg-gray-100 p-8"
      onSubmit={onSubmit}
    >
      <h2 className="text-2xl font-semibold">New Escrow Contract</h2>
      {error ? <p className="text-red-500">{error}</p> : null}
      <label className="flex flex-col gap-1 text-base">
        Arbiter Address
        <input
          type="text"
          value={arbiterAddress}
          onChange={(e) => setArbiterAddress(e.target.value)}
          className="rounded border border-gray-200 p-4"
        />
      </label>
      <label className="flex flex-col gap-1 text-base">
        Beneficiary Address
        <input
          type="text"
          value={beneficiaryAddress}
          onChange={(e) => setBeneficiaryAddress(e.target.value)}
          className="rounded border border-gray-200 p-4"
        />
      </label>
      <label className="flex flex-col gap-1 text-base">
        Deposit Amount (ETH)
        <input
          type="text"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          className="rounded border border-gray-200 p-4"
        />
      </label>
      <button
        type="submit"
        className="rounded bg-blue-500 p-4 font-semibold text-white"
      >
        Create New Escrow Contract
      </button>
    </form>
  );
};

export default EscrowForm;
