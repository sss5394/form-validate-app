import * as StringUtills from './stringUtils';

// チェック結果.
export type ValidationResult = {
  checkResult: boolean;
  errorMMessagge: string;
};

// チェック結果OK字レスポンス.
const checkOk: ValidationResult = {
  checkResult: true,
  errorMMessagge: '',
};

// Windows機種依存文字.
const WINDOWS_SP_CHAR =
  '[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳' +
  'ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ' +
  '㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡' +
  '〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼㍻' +
  '≒≡∫∮∑√⊥∠∟⊿∵∩∪]';

//  正規表現チェック.
export type RegexpCheck = typeof regexpCheck;
function regexpCheck(regexp: RegExp, targetStr: string): boolean {
  if (regexp.test(targetStr)) return true;
  return false;
}

/**
 * 必須チェック.
 */

// 必須チェック.
export type ValidateRequired = typeof validateRequired;
export function validateRequired(
  targetStr: string,
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
export type ValidateRequiredItems = typeof validateRequiredItems;
export function validateRequiredItems(
  targetStr1: string,
  targetStr2: string,
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
 * 文字種チェック.
 */

// 半角チェック.
export type ValidateHarfChar = typeof validateHarfChar;
export function validateHarfChar(
  targetStr: string,
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

// 半角チェック（改行有）.
export type ValidateHarfCharMultiLine = typeof validateHarfCharMultiLine;
export function validateHarfCharMultiLine(
  targetStr: string,
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

// 半角英数チェック.
export type ValidateHarfAlphabetNumber = typeof validateHarfAlphabetNumber;
export function validateHarfAlphabetNumber(
  targetStr: string,
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
export type ValidateHalfAlphabet = typeof validateHalfAlphabet;
export function validateHalfAlphabet(
  targetStr: string,
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
export type ValidateHarfNumber = typeof validateHarfNumber;
export function validateHarfNumber(
  targetStr: string,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'は半角数字で入力してください.',
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
export type ValidateMaxHalfLength = typeof validateMaxHalfLength;
export function validateMaxHalfLength(
  targetStr: string,
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
export type ValidateLength = typeof validateLength;
export function validateLength(
  targetStr: string,
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

// 文字数最大値チェック.
export type ValidateWordLengthMax = typeof validateWordLengthMax;
export function validateWordLengthMax(
  targetStr: string,
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

// 文字数最小値チェック.
export type ValidateWordLengthMin = typeof validateWordLengthMin;
export function validateWordLengthMin(
  targetStr: string,
  len: number,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'は' + len + '桁以上入力してください.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  targetStr = StringUtills.trimSpace(targetStr);

  if (len <= targetStr.length) return checkOk;
  return checkNg;
}

// 半角桁数チェック.
export type ValidateHalfLength = typeof validateHalfLength;
export function validateHalfLength(
  targetStr: string,
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
export type ValidateProhibitChar = typeof validateProhibitChar;
export function validateProhibitChar(
  targetStr: string,
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

  const regexp = new RegExp(WINDOWS_SP_CHAR);

  if (regexpCheck(regexp, targetStr)) return checkNg;
  return checkOk;
}

/**
 * 日時チェック
 */

// 年月形式・正当性チェック（yyyymm）.
export type ValidateDateYYYYMM = typeof validateDateYYYYMM;
export function validateDateYYYYMM(
  targetStr: string,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'が年月形式（YYYYMM）と一致しません.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  // フォーマットに一致しない場合はNG
  if (StringUtills.chkFormat(targetStr) !== StringUtills.DATE_FORMAT.YYYYMM) {
    return checkNg;
  }
  if (StringUtills.chkDate(targetStr)) return checkOk;
  return checkNg;
}

// 年月日形式・正当性チェック（yyyymmdd）.
export type ValidateDateYYYYMMDD = typeof validateDateYYYYMMDD;
export function validateDateYYYYMMDD(
  targetStr: string,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'が年月形式（YYYYMMDD）と一致しません.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  // フォーマットに一致しない場合はNG
  if (StringUtills.chkFormat(targetStr) !== StringUtills.DATE_FORMAT.YYYYMMDD) {
    return checkNg;
  }

  if (StringUtills.chkDate(targetStr)) return checkOk;
  return checkNg;
}

// 年月形式・正当性チェック（yyyy/mm）.
export type ValidateDateYYYYMMSlash = typeof validateDateYYYYMMSlash;
export function validateDateYYYYMMSlash(
  targetStr: string,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'が年月形式（YYYY/MM）と一致しません.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  // フォーマットに一致しない場合はNG
  if (
    StringUtills.chkFormat(targetStr) !== StringUtills.DATE_FORMAT.YYYY_MM_SLASH
  ) {
    return checkNg;
  }

  if (StringUtills.chkDate(targetStr + '/01')) return checkOk;
  return checkNg;
}

// 年月日形式・正当性チェック（yyyy/mm/dd）.
export type ValidateDateYYYYMMDDSlash = typeof validateDateYYYYMMDDSlash;
export function validateDateYYYYMMDDSlash(
  targetStr: string,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'が年月形式（YYYY/MM/DD）と一致しません.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  // フォーマットに一致しない場合はNG
  if (
    StringUtills.chkFormat(targetStr) !==
    StringUtills.DATE_FORMAT.YYYY_MM_DD_SLASH
  ) {
    return checkNg;
  }

  if (StringUtills.chkDate(targetStr)) return checkOk;
  return checkNg;
}

// 年月形式・正当性チェック（yyyy-mm）.
export type ValidateDateYYYYMMHyphen = typeof validateDateYYYYMMHyphen;
export function validateDateYYYYMMHyphen(
  targetStr: string,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'が年月形式（YYYY-MM）と一致しません.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  // フォーマットに一致しない場合はNG
  if (
    StringUtills.chkFormat(targetStr) !==
    StringUtills.DATE_FORMAT.YYYY_MM_HYPHEN
  ) {
    return checkNg;
  }

  if (StringUtills.chkDate(targetStr + '-01')) return checkOk;
  return checkNg;
}

// 年月日形式・正当性チェック（yyyy-mm-dd）.
export type ValidateDateYYYYMMDDHyphen = typeof validateDateYYYYMMDDHyphen;
export function validateDateYYYYMMDDHyphen(
  targetStr: string,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'が年月形式（YYYY-MM-DD）と一致しません.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  // フォーマットに一致しない場合はNG
  if (
    StringUtills.chkFormat(targetStr) !==
    StringUtills.DATE_FORMAT.YYYY_MM_DD_HYPHEN
  ) {
    return checkNg;
  }

  if (StringUtills.chkDate(targetStr)) return checkOk;
  return checkNg;
}

// 日付FormToチェック.
// 両方入力されていない場合、フォーマット誤りなどForm > To 以外はすべて許容
export type ValidateDateFromTo = typeof validateDateFromTo;
export function validateDateFromTo(
  dateFromStr: string,
  dateToStr: string,
  dateFromName: string,
  dateToName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge:
      dateFromName + 'は' + dateToName + 'より前に設定してください.',
  };

  // YYYYMMの場合
  if (
    !commonFromToChk(
      dateFromStr,
      dateToStr,
      dateFromName,
      dateToName,
      validateDateYYYYMM
    )
  ) {
    return checkNg;
  }

  // YYYY/MMの場合
  if (
    !commonFromToChk(
      dateFromStr,
      dateToStr,
      dateFromName,
      dateToName,
      validateDateYYYYMMSlash
    )
  ) {
    return checkNg;
  }

  // YYYY/MM/DDの場合
  if (
    !commonFromToChk(
      dateFromStr,
      dateToStr,
      dateFromName,
      dateToName,
      validateDateYYYYMMDDSlash
    )
  ) {
    return checkNg;
  }
  // YYYY-MMの場合
  if (
    !commonFromToChk(
      dateFromStr,
      dateToStr,
      dateFromName,
      dateToName,
      validateDateYYYYMMHyphen
    )
  ) {
    return checkNg;
  }

  // YYYY-MM-DDの場合
  if (
    !commonFromToChk(
      dateFromStr,
      dateToStr,
      dateFromName,
      dateToName,
      validateDateYYYYMMDDHyphen
    )
  ) {
    return checkNg;
  }

  return checkOk;
}

// 日付FormToチェック.
export type CommonFromToChk = typeof commonFromToChk;
function commonFromToChk(
  dateFromStr: string,
  dateToStr: string,
  dateFromName: string,
  dateToName: string,
  validateFunction:
    | ValidateDateYYYYMM
    | ValidateDateYYYYMMSlash
    | ValidateDateYYYYMMHyphen
    | ValidateDateYYYYMMDD
    | ValidateDateYYYYMMDDSlash
    | ValidateDateYYYYMMDDHyphen
): boolean {
  if (
    StringUtills.chkNotNull(dateFromStr) &&
    StringUtills.chkNotNull(dateToStr)
  ) {
    if (
      validateFunction(dateFromStr, dateFromName).checkResult &&
      validateFunction(dateToStr, dateToName).checkResult
    ) {
      const dateFrom = new Date(dateFromStr);
      const dateTo = new Date(dateToStr);
      if (dateTo.getTime() <= dateFrom.getTime()) return false;
      return true;
    }
    return true;
  }
  return true;
}
/**
 * 各形式チェック
 */

// メールアドレスチェック
export type ValidateEmail = typeof validateEmail;
export function validateEmail(
  targetStr: string,
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
export type ValidatePhoneNumber = typeof validatePhoneNumber;
export function validatePhoneNumber(
  targetStr: string,
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
export type ValidatePostCode = typeof validatePostCode;
export function validatePostCode(
  targetStr: string,
  itemName: string
): ValidationResult {
  // NG結果
  const checkNg: ValidationResult = {
    checkResult: false,
    errorMMessagge: itemName + 'が郵便番号形式と一致しません.',
  };

  // 空の場合はチェックしない
  if (!StringUtills.chkNotNull(targetStr)) return checkOk;

  targetStr = StringUtills.trimSpace(targetStr);

  // 郵便番号（ハイフン任意）
  const regexp = /^[0-9]{3}-?[0-9]{4}$/;
  if (regexpCheck(regexp, targetStr)) return checkOk;
  return checkNg;
}
