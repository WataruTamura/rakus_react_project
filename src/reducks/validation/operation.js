import React from 'react';
import { isValidRequiredInput } from "../../function/common";
import { useDispatch } from "react-redux";

const pattern = /^[0-9]{3}-[0-9]{4}$/;
const pattern2 = /^[0-9]{4}-[0-9]{4}-[0-9]{4}$/;

export const OrderError = (userName, email, zipcode, address, tel, date)=> {
    return async () => {

        // // Validations
        // if(userName === '' || email === '' || address === '' || zipcode === '' || tel === '' || date === '') {
        //     alert('必須項目が未入力です。');
        //     return false
        // }

        if(userName === ''){
            alert ('名前を変更してください');
            console.log('ok');
        }

        if(email === '') {
            console.log('ok');
            alert('メールアドレスを入力してください。');
        } else if(email.indexOf('@') == -1) {
            console.log('NG');
            alert('メールアドレスの形式が不正です。もう1度お試しください。');
        }

        if(zipcode === ''){
            console.log('郵便番号');
            alert ('郵便番号を入力してください');
        } else if(!pattern.test(zipcode)){
            console.log('郵便番号2');
            alert('郵便番号は XXX-XXXX の形式で入力してください');
        }

        if(address === ''){
            console.log('住所');
            alert('住所を変更してください');
        }

        if(tel === ''){
            console.log('電話番号')
            alert ('電話番号を入力してください')
        } else if(!pattern2.test(tel)){
            console.log('電話番号２')
            alert('電話番号は XXXX-XXXX-XXXX の形式で入力してください')
        }

        const today = new Date();
        console.log(today);
        const year = today.getFullYear();
        const month = "0" + (1 + today.getMonth())
        const day = today.getDate();
        const hour = today.getHours();

        if(date === ''){
            console.log('配達')
            alert('配達日時を入力してください');
        // } else if () {

        }
    }
}
