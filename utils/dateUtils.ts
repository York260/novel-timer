/**
 * 获取台湾时区（UTC+8）的当前日期字符串
 * 格式：YYYY-MM-DD
 */
export function getTaiwanDateString(): string {
  const now = new Date();
  // 转换为台湾时区 (UTC+8)
  const taiwanTime = new Date(now.getTime() + (8 * 60 * 60 * 1000));
  const utcDate = new Date(taiwanTime.toISOString());

  const year = utcDate.getUTCFullYear();
  const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(utcDate.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * 检查是否需要显示签到奖励
 * @param lastCheckInDate 上次签到日期 (YYYY-MM-DD)
 * @returns 如果是新的一天返回 true
 */
export function shouldShowCheckIn(lastCheckInDate: string | null): boolean {
  if (!lastCheckInDate) return true;

  const today = getTaiwanDateString();
  return today !== lastCheckInDate;
}
