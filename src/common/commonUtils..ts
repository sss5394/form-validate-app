// 汎用Nullチェック
function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`${typeof value} can't be allowed ${value}`);
  }
}
