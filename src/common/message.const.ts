export const SYSTEM_E_MESSAGES = {
  MESSAGE_001: '送信エラー',
} as const;

export const INPUT_E_MESSAGES = {
  MESSAGE_001: '必須項目です.',
  MESSAGE_002: '半角文字で入力してください.',
} as const;

// 入力チェックエラーメッセージ作成
export function createInputEMessage(message: string, ...args: string) {
  let items = '';
  for (const arg of args) items += arg + ',';
  items.slice(0, -1);

  return '[' + items + ']' + message;
}
