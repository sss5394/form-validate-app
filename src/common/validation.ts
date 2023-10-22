import * as StringUtills from './stringUtills';

// Windows機種依存文字
const WINDOWS_SP_CHAR =
  '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳' +
  'ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ' +
  '㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻' +
  '㎜㎝㎞㎎㎏㏄㎡〝〟№㏍℡' +
  '㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼㍻' +
  '≒≡∫∮∑√⊥∠∟⊿∵∩∪';

//  正規表現チェック
function regexpCheck(regex: RegExp, str: string): boolean {
  if (regexp.test(targetStr)) return true;
  return false;
}

/**
 * 必須チェック
 */

// 必須チェック.
export function validateRequired(targetStr: string) {
  if (StringUtills.chkNotNull(targetStr)) return true;
  else return false;
}

// 連動必須チェック（両入力 or 両空欄）.
function validateRequiredItems(
  targetStr1: string | null,
  targetStr2: string | null
): boolean {
  if (!StringUtills.chkNotNull(str1) && StringUtills.chkNotNull(str2)) {
    return false;
  } else if (StringUtills.chkNotNull(str1) && !StringUtills.chkNotNull(str2)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 文字種チェック
 */

// 半角チェック
export function validateHarfChar(targetStr: string | null): boolean {
  if (!StringUtills.chkNotNull(targetStr)) return false;

  targetStr = StringUtills.trimSpace(targetStr);

  const regexp = /^[ -~]+$/;
  return regexpCheck(regexp, targetStr);
}

// 半角チェック（改行有）
export function validateHarfCharMultiLine(targetStr: string | null): boolean {
  if (!StringUtills.chkNotNull(targetStr)) return false;

  targetStr = StringUtills.trimSpace(targetStr);

  const regexp = /^[ -~\n]+$/;
  return regexpCheck(regexp, targetStr);
}

// 半角英数チェック
export function validateHarfAlphabetNumber(targetStr: string | null): boolean {
  if (!StringUtills.chkNotNull(targetStr)) return false;

  targetStr = StringUtills.trimSpace(targetStr);

  const regexp = /^[A-Za-z0-9]+$/;
  return regexpCheck(regexp, targetStr);
}

// 半角英字チェック.
function validateHalfAlphabet(targetStr: string | null): boolean {
  if (!StringUtills.chkNotNull(targetStr)) return false;

  targetStr = StringUtills.trimSpace(targetStr);

  const regexp = /^[A-Za-z]+$/;
  return regexpCheck(regexp, targetStr);
}

// 半角数字チェック
export function chkHarfNumber(targetStr: string | null): boolean {
  if (!StringUtills.chkNotNull(targetStr)) return false;

  targetStr = StringUtills.trimSpace(targetStr);

  const regexp = /^[0-9]+$/;
  return regexpCheck(regexp, targetStr);
}

/**
 * 桁数チェック
 */

// 半角最大桁一致チェック.
export function validateMaxHalfLength(
  targetStr: string | null,
  len: number,
  chkFunction: Function
): boolean {
  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return false;

  if (!chkFunction(targetStr)) return false;

  targetStr = StringUtills.trimSpace(targetStr);
  if (StringUtills.getLengthByte(targetStr) == len) return true;
  else return false;
}
// 桁数チェック(全半角混在).
export function validateLength(targetStr: string | null, len: number): boolean {
  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return false;

  targetStr = StringUtills.trimSpace(targetStr);

  if (StringUtills.getLengthByte(targetStr) <= len) return true;
  else return false;
}

// 文字数チェック.
export function validateWordLength(
  targetStr: string | null,
  len: number
): boolean {
  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return false;

  targetStr = StringUtills.trimSpace(targetStr);

  if (targetStr.length <= len) return true;
  else return false;
}

// 半角桁数チェック.
export function validateHalfLength(
  targetStr: string | null,
  len: number
): boolean {
  if (!StringUtills.chkNotNull(targetStr)) return false;

  targetStr = StringUtills.trimSpace(targetStr);

  if (StringUtills.getLengthByte() <= len) return true;
  else return false;
}

/**
 * 特殊チェック
 */

// 禁則文字チェック.
export function validateProhibitChar(targetStr: string | null): boolean {
  if (StringUtills.chkNotNull(targetStr)) return true;

  targetStr = StringUtills.trimSpace(targetStr);

  const regexp = new RegExp('[' + WINDOWS_SP_CHAR + ']');
  return regexpCheck(regexp, targetStr);
}

// 年月正当性チェック（yyyy/mm）.
export function validateDateYM(targetStr: string | null): boolean {
  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return true;

  if (targetStr.length != 7) return false;

  if (!StringUtills.chkDate(targetStr + '/01')) return false;

  return true;
}

// 年月日正当性チェック（yyyy/mm/dd）.
export function validateDateYMD(targetStr: string | null): boolean {
  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return true;

  if (targetStr.length != 10) return false;

  if (!StringUtills.chkDate(targetStr)) return false;

  return true;
}

// メールアドレスチェック
export function validateEmail(targetStr: string | null): boolean {
  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return true;

  targetStr = StringUtills.trimSpace(targetStr);

  const regex =
    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  return regexpCheck(regexp, targetStr);
}

// 電話番号チェック
export function validateTelNumber(targetStr: string | null): boolean {
  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return true;

  targetStr = StringUtills.trimSpace(targetStr);

  // 市外局番ありパターン
  const regex1 =
    /^0(\d{1}[-(]?\d{4}|\d{2}[-(]?\d{3}|\d{3}[-(]?\d{2}|\d{4}[-(]?\d{1})[-)]?\d{4}$/;
  if (regexpCheck(regex1, targetStr)) return true;

  // 市外局番なしパターン
  const regex2 = /^\d{1,4}\-?\d{4}$/;
  if (regexpCheck(regex2, targetStr)) return true;

  // 携帯電話パターン
  const regex3 = /^0[5789]0[-(]?\d{4}[-)]?\d{4}$/;
  if (regexpCheck(regex3, targetStr)) return true;

  // フリーダイヤルパターン
  const regex4 = /^0120[-(]?\d{3}[-)]?\d{3}$/;
  if (regexpCheck(regex4, targetStr)) return true;

  return false;
}

// 郵便番号チェック（ハイフン任意）
export function validatePostCode(targetStr: string | null): boolean {
  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return true;

  targetStr = StringUtills.trimSpace(targetStr);

  // 郵便番号（ハイフン任意）
  const regex = /^[0-9]{3}-?[0-9]{4}$/;
  return regexpCheck(regexp, targetStr);
}
