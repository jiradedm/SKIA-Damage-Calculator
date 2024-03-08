export const formatNumber = (number: number): string => {
  const trillion = 1000000000000;
  const billion = 1000000000;
  const million = 1000000;
  const thousand = 1000;

  const result = [""];
  let remain = number;

  if (remain >= trillion) {
    result.push(`${(remain - (remain % trillion)) / trillion} T`);
    remain %= trillion;
  }
  if (remain >= billion) {
    result.push(`${(remain - (remain % billion)) / billion} G`);
    remain %= billion;
  }
  if (remain >= million) {
    result.push(`${(remain - (remain % million)) / million} M`);
    remain %= million;
  }
  if (remain >= thousand) {
    result.push(`${(remain - (remain % thousand)) / thousand} K`);
    remain %= thousand;
  }
  if (remain > 0) {
    result.push(String(Math.floor(remain)));
  }
  return result.join(" ") || "0";
};
