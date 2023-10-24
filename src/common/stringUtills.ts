/**
 *　文字列加工
 */

// 文字列をトリム（NULLは空文字）.
export function trimSpace(targetStr: string | null): string {
  if (targetStr === null) targetStr = '';
  return targetStr.trim();
}

// 指定文字を削除
export function deleteChar(targetStr: string | null, delChar: string): string {
  // 空またはNullの場合は空文字を返却
  if (chkNotNull(targetStr)) return targetStr!.replace(delChar, '');
  return '';
}

/**
 *　基本メソッド
 */

// NULL・空文字チェック.
export function chkNotNull(targetStr: string | null): boolean {
  targetStr = trimSpace(targetStr);
  if (targetStr != null && targetStr != '') return true;
  else return false;
}

// 文字列バイト長取得
export function getLengthByte(targetStr: string): number {
  targetStr = trimSpace(targetStr);
  const length = encodeURIComponent(targetStr).replace(/%../g, 'x').length;
  return length;
}

/**
 * 形式チェック（日付）
 */

// 日付妥当性チェック
export function chkDate(targetStr: string | null): boolean {
  // 空の場合はチェックしない
  if (!chkNotNull(targetStr)) return true;

  targetStr = trimSpace(targetStr);
  targetStr = deleteChar(targetStr, '/');

  if (getLengthByte(targetStr) != 8 || !chkNumber(targetStr)) return false;

  const year = Number(targetStr.substring(0, 4));
  const month = Number(targetStr.substring(4, 6));
  const day = Number(targetStr.substring(6, 8));

  const dayOfMonth = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

  if (month < 1 || 12 < month) return false;
  if (day < 1 || dayOfMonth[month - 1] < day) return false;
  if (!chkLeapYear(year) && month == 2 && day == 29) return false;
  return true;
}

// 閏年チェック
function chkLeapYear(year: number): boolean {
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) return true;
  return false;
}

/**
 * 形式チェック（数値）
 */
// 数値チェック：実数
export function chkFloat(targetStr: string | null): boolean {
  // 空の場合はチェックしない
  if (!chkNotNull(targetStr)) return true;

  targetStr = trimSpace(targetStr);
  const regexp = /^[-]?[0-9]+(\.[0-9]+)?$/;
  if (regexp.test(targetStr)) return true;
  else return false;
}

// 数値チェック：正の実数
export function chkPosFloat(targetStr: string | null): boolean {
  // 空の場合はチェックしない
  if (!chkNotNull(targetStr)) return true;

  targetStr = trimSpace(targetStr);

  const regexp = /^[0-9]+(\.[0-9]+)?$/;
  if (regexp.test(targetStr)) return true;
  else return false;
}

// 数値チェック：正の整数
export function chkNumber(targetStr: string | null): boolean {
  // 空の場合はチェックしない
  if (!chkNotNull(targetStr)) return true;

  targetStr = trimSpace(targetStr);

  const regexp = /^[\d]+$/;
  if (regexp.test(targetStr)) return true;
  else return false;
}
