export const SYSTEM_E_MESSAGES = {
  MESSAGE_001: '送信エラー',
} as const;

export const INPUT_E_MESSAGES = {
  MESSAGE_001: '必須項目です.',
  MESSAGE_002: '半角文字で入力してください.',
} as const;

export function createInputEMessage(itemName: string, message: string) {
  return '[' + itemName + ']' + message;
}
