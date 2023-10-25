import type { NextPageWithLayout } from 'next';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import * as Validation from '../../common/validation';
import styles from '../../styles/Form.module.css';
import Layout from '@/layout/layout';
import async from '../api/submit';

// 入力データ定義
type InputData = {
  nameJa: string;
  id: string;
  giftCode: string;
  firstNameEn: string;
  lastNameEn: string;
  postCode: string;
  address: string;
  dateFrom: string;
  dateTo: string;
  birthDay: string;
  mail: string;
  phone: string;
  free: string;
};

// Form初期値
const initialValues = {
  nameJa: '',
  id: '',
  giftCode: '',
  firstNameEn: '',
  lastNameEn: '',
  postCode: '',
  address: '',
  dateFrom: '',
  dateTo: '',
  birthDay: '',
  mail: '',
  phone: '',
  free: '',
};

// Form最小・最大値・固定値
const FormMinMaxValue = {
  GIFT_CODE_MIN: 8,
  GIFT_CODE_MAX: 10,
  ADDRESS_MAX: 50,
  FREE_MAX: 300,
  ID_FIXED: 8,
} as const;

// システムエラーメッセージ
const SystemErrorMessage = {
  MESSAGE_001: '送信エラー発生',
} as const;

const FormPage: NextPageWithLayout = () => {
  // ロード状態、エラー状態、エラーメッセージList、入力データ
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorMessageList, setErrorMessageList] = useState<string[] | null>([]);
  const [inputData, setInputData] = useState<InputData>(initialValues);

  // 送信
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setErrorMessageList([]);

    const formData = new FormData(event.currentTarget);

    // 入力チェック
    setErrorMessageList(validation());

    if (errorMessageList && errorMessageList.length == 0) {
      try {
        const response = await fetch('/api/submit', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(SystemErrorMessage.MESSAGE_001);
        }

        const data = await response.json();
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  // リセット
  const onReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setErrorMessageList([]);
    setInputData(initialValues);
    setIsLoading(false);
  };

  // 入力チェック
  const validation = (): string[] => {
    // エラーメッセージ
    let messageList: Array<string> = [];

    // チェック結果
    let result: Validation.ValidationResult;

    // 名前
    // 必須チェック
    result = Validation.validateRequired(inputData.nameJa, '名前');
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // First Name
    // 半角英字チェック
    result = Validation.validateHalfAlphabet(
      inputData.firstNameEn,
      'FirstName'
    );
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // Last Name
    // 半角英字チェック
    result = Validation.validateHalfAlphabet(inputData.lastNameEn, 'LastName');
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // ID
    // 半角数字チェック
    result = Validation.validateHarfNumber(inputData.id, 'ID');
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // 桁一致チェック
    result = Validation.validateMaxHalfLength(
      inputData.id,
      FormMinMaxValue.ID_FIXED,
      'ID'
    );
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // ギフトコード
    // 半角英数チェック
    result = Validation.validateHarfAlphabetNumber(
      inputData.giftCode,
      'ギフトコード'
    );
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // 最小長チェック
    result = Validation.validateWordLengthMin(
      inputData.giftCode,
      FormMinMaxValue.GIFT_CODE_MIN,
      'ギフトコード'
    );
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // 最大長チェック
    result = Validation.validateWordLengthMax(
      inputData.giftCode,
      FormMinMaxValue.GIFT_CODE_MAX,
      'ギフトコード'
    );
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // 郵便番号
    result = Validation.validateHarfChar(inputData.postCode, '郵便番号');
    if (!result.checkResult) messageList.push(result.errorMMessagge);
    // 郵便番号形式チェック
    result = Validation.validatePostCode(inputData.postCode, '郵便番号');
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // 住所
    // 機種依存文字チェック
    result = Validation.validateProhibitChar(inputData.address, '住所');
    if (!result.checkResult) messageList.push(result.errorMMessagge);
    // 住所最大長チェック
    result = Validation.validateWordLengthMax(
      inputData.address,
      FormMinMaxValue.ADDRESS_MAX,
      '住所'
    );
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // 希望訪問日
    // 入力連動チェック
    result = Validation.validateRequiredItems(
      inputData.dateFrom,
      inputData.dateTo,
      '希望訪問日From',
      '希望訪問日To'
    );
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // 年月日形式・正当性チェック
    result = Validation.validateDateYYYYMMDDHyphen(
      inputData.dateFrom,
      '希望訪問日From'
    );
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // 年月日形式・正当性チェック
    result = Validation.validateDateYYYYMMDDHyphen(
      inputData.dateTo,
      '希望訪問日To'
    );
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // 年月日FromToチェック
    result = Validation.validateDateFromTo(
      inputData.dateFrom,
      inputData.dateTo,
      '希望訪問日From',
      '希望訪問日To'
    );
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // 誕生日
    // 半角チェック
    result = Validation.validateHarfChar(inputData.birthDay, '誕生日');
    if (!result.checkResult) messageList.push(result.errorMMessagge);
    // 年月日形式・正当性チェック
    result = Validation.validateDateYYYYMMDDSlash(inputData.birthDay, '誕生日');
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // 電話番号
    // 半角チェック
    result = Validation.validateHarfChar(inputData.phone, '電話番号');
    if (!result.checkResult) messageList.push(result.errorMMessagge);
    // 電話番号形式チェック
    result = Validation.validatePhoneNumber(inputData.phone, '電話番号');
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    // 備考
    // 機種依存文字チェック
    result = Validation.validateProhibitChar(inputData.free, '備考');
    if (!result.checkResult) messageList.push(result.errorMMessagge);
    // 最大長チェック
    result = Validation.validateWordLengthMax(
      inputData.free,
      FormMinMaxValue.FREE_MAX,
      '備考'
    );
    if (!result.checkResult) messageList.push(result.errorMMessagge);

    return messageList;
  };

  // 入力値をStateにセット
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  return (
    <div className={styles.container}>
      <h1>form Sample</h1>
      <form onSubmit={onSubmit} onReset={onReset}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {errorMessageList && (
          <ul>
            {errorMessageList.map((message, index) => {
              return (
                <li id={'error' + index} key={'error' + index}>
                  {message}
                </li>
              );
            })}
          </ul>
        )}
        <div className={styles.item}>
          <label htmlFor='nameJa'>
            <span className={styles.required}>*</span>名前
          </label>
          <input
            type='text'
            id='nameJa'
            name='nameJa'
            placeholder='田中太郎'
            value={inputData.nameJa}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='firstNameEn'>FirstName</label>
          <input
            type='text'
            id='firstNameEn'
            name='firstNameEn'
            placeholder='Taro'
            value={inputData.firstNameEn}
            onChange={handleInputChange}
          />
          <label htmlFor='lastNameEn'>LastName</label>
          <input
            type='text'
            id='lastNameEn'
            name='lastNameEn'
            placeholder='Tanaka'
            value={inputData.lastNameEn}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='id'>ID</label>
          <input
            type='text'
            id='id'
            name='id'
            placeholder='12345678'
            value={inputData.id}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='giftCode'>ギフトコード</label>
          <input
            type='text'
            id='giftCode'
            name='giftCode'
            placeholder='abc1234'
            value={inputData.giftCode}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='postCode'>〒</label>
          <input
            type='text'
            id='postCode'
            name='postCode'
            placeholder='111-1111'
            value={inputData.postCode}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='address'>住所</label>
          <input
            type='text'
            id='address'
            name='address'
            placeholder='東京都○○区×××'
            value={inputData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='dateFrom'>希望訪問日</label>
          <input
            type='date'
            id='dateFrom'
            name='dateFrom'
            value={inputData.dateFrom}
            onChange={handleInputChange}
          />
          <label htmlFor='dateTo' className={styles.linkage}>
            ~
          </label>
          <input
            type='date'
            id='dateTo'
            name='dateTo'
            value={inputData.dateTo}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='birthDay'>誕生日</label>
          <input
            type='text'
            id='birthDay'
            name='birthDay'
            placeholder='2000/01/01'
            value={inputData.birthDay}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='phone'>電話番号</label>
          <input
            type='text'
            id='phone'
            name='phone'
            placeholder='×××-××××-××××'
            value={inputData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='mail'>Mail</label>
          <input
            type='text'
            id='mail'
            name='mail'
            placeholder='×××××@××××.××.××'
            value={inputData.mail}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='mail'>備考</label>
          <textarea
            id='free'
            name='free'
            placeholder=''
            value={inputData.free}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.item}>
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
          <button type='reset' disabled={isLoading}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

// レイアウト設定（共通レイアウト）
FormPage.getLayout = (page) => <Layout>{page}</Layout>;
export default FormPage;
