import type { NextPageWithLayout } from 'next';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import * as FormDef from './form-def';
import * as Validation from '../../common/validation';
import styles from '../../styles/Form.module.css';
import { useForm } from 'react-hook-form';
import Layout from '@/layout/layout';

const SystemErrorMessage = {
  MESSAGE_001: '送信エラー発生',
} as const;

const FormPage: NextPageWithLayout = () => {
  // ロード状態、エラー状態、エラーメッセージList、入力データ
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorMessageList, setErrorMessageList] = useState<string[] | null>([]);
  const [inputData, setInputData] = useState<FormDef.InputData>(
    FormDef.initialValues
  );

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
    item = inputData.name;
    itemName = 'Name';

    // 必須チェック
    result = Validation.validateRequired(item, itemName);
    if (!result.checkResult) {
      messageList.push(result.errorMMessagge);
    }
    // 半角チェック
    result = Validation.validateHarfChar(item, itemName);
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
            <span className={styles.required}>*</span>Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='name'
            value={inputData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='postCode'>〒</label>
          <input
            type='text'
            id='postCode'
            name='postCode'
            placeholder='post code'
            value={inputData.postCode}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            id='address'
            name='address'
            placeholder='address'
            value={inputData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='dateFrom'>Date</label>
          <input
            type='date'
            id='dateFrom'
            name='dateFrom'
            placeholder='From'
            value={inputData.dateFrom}
            onChange={handleInputChange}
          />
          <label htmlFor='dateTo'>~</label>
          <input
            type='date'
            id='dateTo'
            name='dateTo'
            placeholder='Date(To)'
            value={inputData.dateTo}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor='mail'>Mail</label>
          <input
            type='text'
            id='mail'
            name='mail'
            placeholder='mail'
            value={inputData.mail}
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
