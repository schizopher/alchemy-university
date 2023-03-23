const formatter = new Intl.RelativeTimeFormat("en-US", { style: "short" });

export function formatAsRelative(
  timestamp: number,
  timeUnit: Intl.RelativeTimeFormatUnit
) {
  return formatter.format(Math.round(timestamp - Date.now() / 1000), timeUnit);
}
