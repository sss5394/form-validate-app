import type { NextPage } from 'next';
import React, { useState, FormEvent } from 'react';
import { FormValues } from './form-def';
import { SYSTEM_E_MESSAGES, INPUT_E_MESSAGES, createInputEMessage } from '../../message.const';
import * as Validation from '../../common/validation';
import styles from '../../styles/Form.module.css';

const FormPage: NextPage = () => {
    // ロード状態
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // エラー状態
    const [error, setError] = useState<string | null>(null);

    // エラーメッセージList
    const [errorMessageList, setErrorMessageList] = useState<string[] | null>([]);

    // 送信処理
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setErrorMessageList([]);

        const formData = new FormData(event.currentTarget);

        // 入力チェック
        setErrorMessageList(validation(formData));

        if(errorMessageList && errorMessageList.length == 0){
            try {
                const response = await fetch('/api/submit', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(SYSTEM_E_MESSAGES.MESSAGE_001);
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
        }
    }

    // 入力チェック処理
    function validation(formData: FormData): string[] {
        let messageList: Array<string> = [];

        // 名前
        let name = formData.get('name') as string;
        if(!Validation.chkHarfChar(name)){
            messageList.push(createInputEMessage('Name', INPUT_E_MESSAGES.MESSAGE_002));
        }
        
        // 住所
        let address = formData.get('address') as string;
        if(!Validation.chkHarfChar(address)){
            messageList.push(createInputEMessage('Address', INPUT_E_MESSAGES.MESSAGE_002));
        }

        return messageList;
    }

    return (
        <div className={styles.container}>
            <h1>form Sample</h1>
            <form onSubmit={onSubmit}>
                { error && <div style={{ color: 'red' }}>{error}</div> }
                { errorMessageList && 
                    <ul>
                        { errorMessageList.map((message, index) => { return <li key={index}>{message}</li>;})}
                    </ul>
                }
                <div className={styles.item}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder='name'/>
                </div>
                <div className={styles.item}>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" placeholder='address'/>
                </div>
                <div className={styles.item}>
                    <label htmlFor="mail">Mail</label>
                    <input type="text" id="mail" name="mail" placeholder='mail'/>
                </div>
                <div className={styles.item}>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                    <button type="reset">Reset</button>
                </div>
            </form>
        </div>
    );
};

export default FormPage;
