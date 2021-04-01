export function UUID(): string {
  let result = "";
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  console.log(result);
  return result;
}
export function formatDateTime(date?: Date): string {
  const rightNow = date ?? new Date();
  return rightNow.toLocaleString([], {
    weekday: "short",
    month: "numeric",
    year: "numeric",
    day: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
}
export function getDateTimeElements(date: string) {
  let strArr = date.slice().split(",");
  return { day: strArr[0], date: strArr[1], time: strArr[2] };
}
