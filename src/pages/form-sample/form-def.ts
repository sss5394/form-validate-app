// 入力データ定義
export type InputData = {
  name: string;
  postCode: string;
  address: string;
  dateFrom: string;
  dateTo: string;
  mail: string;
};

// Form初期値
export const initialValues = {
  name: '',
  postCode: '',
  address: '',
  dateFrom: '',
  dateTo: '',
  mail: '',
};
