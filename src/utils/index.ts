import { formatUnits } from "viem";

export const formatTokenBalance = (
  balance: bigint | undefined,
  decimals: number
): number => {
  return balance ? Number(formatUnits(balance, decimals)) : 0;
};

export function formatTokenPrice(
  amount: bigint | undefined,
  price: string,
  decimals: number
) {
  if (!amount || !price) {
    return 0;
  }

  const formattedAmount = formatUnits(amount, decimals);

  return Number.parseFloat(formattedAmount) * Number.parseFloat(price);
}
