// 半角チェック
export function chkHarfChar(targetStr: string | null): boolean {
  const regexp = /[ -~]+/g;

  if (targetStr === null) return false;

  if (regexp.test(targetStr)) {
    return true;
  }
  return false;
}

// 半角チェック（改行有）
export function chkHarfCharMultiLine(targetStr: string | null): boolean {
  return true;
}

// 半角英数チェック
export function chkHarfAlphabetNumber(targetStr: string | null): boolean {
  return true;
}

// 半角英数チェック（改行有）
export function chkHarfAlphabetNumberMultiLine(
  targetStr: string | null
): boolean {
  return true;
}

// 半角英字チェック
export function chkHarfAlphabet(targetStr: string | null): boolean {
  return true;
}

// 半角英字チェック（改行有）
export function chkHarfAlphabetMultiLine(targetStr: string | null): boolean {
  return true;
}

// 半角数字チェック
export function chkHarfNumber(targetStr: string | null): boolean {
  return true;
}

// 半角数字チェック（改行有）
export function chkHarfNumberMultiLine(targetStr: string | null): boolean {
  return true;
}
