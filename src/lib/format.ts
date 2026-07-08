export function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("el-GR", {
    style: "currency",
    currency: "EUR",
  });
}
