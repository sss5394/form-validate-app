import type { NextPageWithLayout } from 'next';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import * as Validation from '../../common/validation';
import styles from '../../styles/Form.module.css';
import Layout from '@/layout/layout';

// 入力データ定義
export type InputData = {
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
export const initialValues = {
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
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
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
  }

  // 入力チェック
  function validation(): string[] {
    // エラーメッセージ
    let messageList: Array<string> = [];

    // チェック対象文字列、チェック対象項目名、チェック結果
    let item: string;
    let itemName: string;
    let result: Validation.ValidationResult;

    // 名前
    item = inputData.nameJa;
    itemName = '名前';

    // 必須チェック
    result = Validation.validateRequired(item, itemName);
    if (!result.checkResult) {
      messageList.push(result.errorMMessagge);
    }

    // 住所
    item = inputData.address;
    itemName = 'Address';
    result = Validation.validateHarfChar(item, itemName);
    if (!result.checkResult) {
      messageList.push(result.errorMMessagge);
    }

    return messageList;
  }

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
      <form onSubmit={onSubmit}>
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
          <label htmlFor='name'>
            <span className={styles.required}>*</span>名前
          </label>
          <input
            type='text'
            id='name'
            name='name'
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
          <button type='reset'>Reset</button>
        </div>
      </form>
    </div>
  );
};

// レイアウト設定（共通レイアウト）
FormPage.getLayout = (page) => <Layout>{page}</Layout>;
export default FormPage;
