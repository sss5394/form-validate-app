import * as StringUtills from './stringUtills';

export type ValidationResult = {
  checkResult: boolean;
  errorMMessagge: string;
};

// チェック結果OK字レスポンス
const checkOk: ValidationResult = {
  checkResult: true,
  errorMMessagge: '',
};

// Windows機種依存文字
const WINDOWS_SP_CHAR =
  '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳' +
  'ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ' +
  '㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻' +
  '㎜㎝㎞㎎㎏㏄㎡〝〟№㏍℡' +
  '㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼㍻' +
  '≒≡∫∮∑√⊥∠∟⊿∵∩∪';

//  正規表現チェック
function regexpCheck(regexp: RegExp, targetStr: string): boolean {
  if (regexp.test(targetStr)) return true;
  return false;
}

/**
 * 必須チェック
 */

// 必須チェック.
export function validateRequired(
  targetStr: string | null,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'は必ず入力してください.',
  };

  if (StringUtills.chkNotNull(targetStr)) return checkOk;
  return checkNg;
}

// 連動必須チェック（両入力 or 両空欄）.
function validateRequiredItems(
  targetStr1: string | null,
  targetStr2: string | null,
  itemName1: string,
  itemName2: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName1 + ', ' + itemName2 + 'は両方入力してください.',
  };
  if (
    (!StringUtills.chkNotNull(targetStr1) &&
      StringUtills.chkNotNull(targetStr2)) ||
    (StringUtills.chkNotNull(targetStr1) &&
      !StringUtills.chkNotNull(targetStr2))
  ) {
    return checkNg;
  }
  return checkOk;
}

/**
 * 文字種チェック
 */

// 半角チェック
export function validateHarfChar(
  targetStr: string | null,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'は半角文字で入力してください.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;
  targetStr = StringUtills.trimSpace(targetStr);

  const regexp = /^[ -~]+$/;
  if (regexpCheck(regexp, targetStr)) return checkOk;
  return checkNg;
}

// 半角チェック（改行有）
export function validateHarfCharMultiLine(
  targetStr: string | null,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'は半角文字で入力してください.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  targetStr = StringUtills.trimSpace(targetStr);

  const regexp = /^[ -~\n]+$/;
  if (regexpCheck(regexp, targetStr)) return checkOk;
  return checkNg;
}

// 半角英数チェック
export function validateHarfAlphabetNumber(
  targetStr: string | null,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'は半角英数で入力してください.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  targetStr = StringUtills.trimSpace(targetStr);

  const regexp = /^[A-Za-z0-9]+$/;
  if (regexpCheck(regexp, targetStr)) return checkOk;
  return checkNg;
}

// 半角英字チェック.
export function validateHalfAlphabet(
  targetStr: string | null,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'は半角英字で入力してください.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  targetStr = StringUtills.trimSpace(targetStr);

  const regexp = /^[A-Za-z]+$/;
  if (regexpCheck(regexp, targetStr)) return checkOk;
  return checkNg;
}

// 半角数字チェック
export function chkHarfNumber(
  targetStr: string | null,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'は半角英字で入力してください.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  targetStr = StringUtills.trimSpace(targetStr);

  const regexp = /^[0-9]+$/;
  if (regexpCheck(regexp, targetStr)) return checkOk;
  return checkNg;
}

/**
 * 桁数チェック
 */

// 半角最大桁一致チェック.
export function validateMaxHalfLength(
  targetStr: string | null,
  len: number,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'は' + len + '桁で入力してください.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  targetStr = StringUtills.trimSpace(targetStr);
  if (StringUtills.getLengthByte(targetStr) == len) return checkOk;
  else return checkNg;
}
// 桁数チェック(全半角混在).
export function validateLength(
  targetStr: string | null,
  len: number,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'は' + len + '桁で入力してください.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  targetStr = StringUtills.trimSpace(targetStr);

  if (StringUtills.getLengthByte(targetStr) <= len) return checkOk;
  return checkNg;
}

// 文字数チェック.
export function validateWordLength(
  targetStr: string | null,
  len: number,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'は' + len + '桁以内で入力してください.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  targetStr = StringUtills.trimSpace(targetStr);

  if (targetStr.length <= len) return checkOk;
  return checkNg;
}

// 半角桁数チェック.
export function validateHalfLength(
  targetStr: string | null,
  len: number,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'は' + len + '桁以内で入力してください.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  targetStr = StringUtills.trimSpace(targetStr);

  if (StringUtills.getLengthByte(targetStr) <= len) return checkOk;
  return checkNg;
}

/**
 * 特殊チェック
 */

// 禁則文字チェック.
export function validateProhibitChar(
  targetStr: string | null,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'に機種依存文字は使用できません.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  targetStr = StringUtills.trimSpace(targetStr);

  const regexp = new RegExp('[' + WINDOWS_SP_CHAR + ']');
  if (regexpCheck(regexp, targetStr)) return checkOk;
  return checkNg;
}

// 年月正当性チェック（yyyy/mm）.
export function validateDateYYYYMMSlash(
  targetStr: string | null,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'が年月形式（YYYY/MM）と一致しません.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  if (targetStr?.length != 7) return checkNg;

  if (StringUtills.chkDate(targetStr + '/01')) return checkOk;
  return checkNg;
}

// 年月日正当性チェック（yyyy/mm/dd）.
export function validateDateYYYYMMDDSlash(
  targetStr: string | null,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'が年月形式（YYYY/MM/DD）と一致しません.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  if (targetStr?.length != 10) return checkNg;

  if (StringUtills.chkDate(targetStr)) return checkOk;
  return checkNg;
}

// 年月正当性チェック（yyyy-mm）.
export function validateDateYYYYMMHyphen(
  targetStr: string | null,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'が年月形式（YYYY-MM）と一致しません.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  if (targetStr?.length != 7) return checkNg;

  if (StringUtills.chkDate(targetStr + '-01')) return checkOk;
  return checkNg;
}

// 年月日正当性チェック（yyyy-mm-dd）.
export function validateDateYYYYMMDDHyphen(
  targetStr: string | null,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'が年月形式（YYYY-MM-DD）と一致しません.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  if (targetStr?.length != 10) return checkNg;

  if (StringUtills.chkDate(targetStr)) return checkOk;
  return checkNg;
}

// メールアドレスチェック
export function validateEmail(
  targetStr: string | null,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'がメールアドレス形式と一致しません.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  targetStr = StringUtills.trimSpace(targetStr);

  const regexp =
    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

  if (regexpCheck(regexp, targetStr)) return checkOk;
  return checkNg;
}

// 電話番号チェック
export function validateTelNumber(
  targetStr: string | null,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'が電話番号形式と一致しません.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  targetStr = StringUtills.trimSpace(targetStr);

  // 市外局番ありパターン
  const regexp1 =
    /^0(\d{1}[-(]?\d{4}|\d{2}[-(]?\d{3}|\d{3}[-(]?\d{2}|\d{4}[-(]?\d{1})[-)]?\d{4}$/;
  if (regexpCheck(regexp1, targetStr)) return checkOk;

  // 市外局番なしパターン
  const regexp2 = /^\d{1,4}\-?\d{4}$/;
  if (regexpCheck(regexp2, targetStr)) return checkOk;

  // 携帯電話パターン
  const regexp3 = /^0[5789]0[-(]?\d{4}[-)]?\d{4}$/;
  if (regexpCheck(regexp3, targetStr)) return checkOk;

  // フリーダイヤルパターン
  const regexp4 = /^0120[-(]?\d{3}[-)]?\d{3}$/;
  if (regexpCheck(regexp4, targetStr)) return checkOk;

  return checkNg;
}

// 郵便番号チェック（ハイフン任意）
export function validatePostCode(
  targetStr: string | null,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'が電話番号形式と一致しません.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  targetStr = StringUtills.trimSpace(targetStr);

  // 郵便番号（ハイフン任意）
  const regexp = /^[0-9]{3}-?[0-9]{4}$/;
  if (regexpCheck(regexp, targetStr)) return checkOk;
  return checkNg;
}
