import {isValidEmailFormat, isValidRequiredInput} from "../../function/common";
import { useDispatch } from "react-redux";

const pattern = /^[0-9]{3}-[0-9]{4}$/;

export const OrderError = (userName, email, zipcode, address, tel, date)=> {
    return async () => {
        
        // console.log('バリデーション');
        // // Validations
        // if(!isValidRequiredInput(userName,email, 
        //     address,zipcode,tel,date)) {
        //     alert('必須項目が未入力です。');
        //     return false
        // }


        // if(userName === ''){
        //     alert ('名前を変更してください');
        //     return false
        // }

//         if(email === ''){
//             alert ('メールアドレスを入力してください')
//         } else if(!isValidEmailFormat(email)) {
//             alert('メールアドレスの形式が不正です。もう1度お試しください。')
//             return false
//         }

//         if(!zipcode){
//             alert ('郵便番号を入力してください')
//         } else if(!pattern.test(zipcode)){
//             console.log(zipcode)
//             alert('郵便番号は XXX-XXXX の形式で入力してください')
//             return false
//         }

//         if(!address){
//             alert('住所を変更してください')
//             return false
//         }

//         if(!tel){
//             alert ('電話番号を入力してください')
//         } else if(tel.match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}$/)){
//             alert('電話番号は XXXX-XXXX-XXXX の形式で入力してください')
//             return false
//         }

//         if(!date){
//             alert('配達日時を入力してください');
//             console.log('配達')
//             return false
//         }
    }
}
