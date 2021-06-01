// const pattern = /^[0-9]{3}-[0-9]{4}$/;
// const pattern2 = /^[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
// const pattern3 = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;

export const OrderError = (userName, email, zipCode, address, tel, orderYear, orderMonth, orderDay, orderTime, creditCard)=> {
    return async () => {
        
        // // // Validations
        // // if(userName === '' || email === '' || address === '' || zipcode === '' || tel === '' || date === '') {
        // //     alert('必須項目が未入力です。');
        // //     return false
        // // }

        // if(userName === ''){
        //     alert ('名前を変更してください');
        //     console.log('ok');
        // };

        // if(email === '') {
        //     console.log('ok');
        //     alert('メールアドレスを入力してください。');
        // } else if(email.indexOf('@') === -1) {
        //     console.log('NG');
        //     alert('メールアドレスの形式が不正です。もう1度お試しください。');
        // };

        // if(zipCode === ''){
        //     console.log('郵便番号');
        //     alert ('郵便番号を入力してください');
        // } else if(!pattern.test(zipCode)){
        //     console.log('郵便番号2');
        //     alert('郵便番号は XXX-XXXX の形式で入力してください');
        // };

        // if(address === ''){
        //     console.log('住所');
        //     alert('住所を変更してください');
        // };

        // if(tel === ''){
        //     console.log('電話番号')
        //     alert ('電話番号を入力してください')
        // } else if(!pattern2.test(tel)){
        //     console.log('電話番号２')
        //     alert('電話番号は XXXX-XXXX-XXXX の形式で入力してください')
        // };

        // const today = new Date();
        // console.log(today);

        // const year = today.getFullYear();
        // console.log(year);
        // const month = "0" + (1 + today.getMonth());
        // console.log(month)
        // const day = today.getDate();
        // const hour = today.getHours();
        // console.log(day)
        // console.log(hour)


        // // const numOrderYear = Number(orderYear);
        // // console.log(numOrderYear);

        // // const numOrderMonth = Number(orderMonth)
        // // console.log(numOrderMonth);

        // const numOrderDay = Number(orderDay);
        // // console.log(numOrderDay);

        // const numOrderTime = Number(orderTime);
        // // console.log(numOrderTime);

        // if(orderYear === '' || 
        //     orderMonth === '' || 
        //     orderDay  === '' || orderTime === ''){
        //     console.log('配達')
        //     alert('配達日時を入力してください');
        // } else if(day === numOrderDay) {
        //     console.log('同じ日');
        //         if((numOrderTime - hour <= 3) || 
        //         (numOrderTime - hour === 0)) {
        //         alert('今から３時間以内の日時をご入力ください');
        //         }
        // };

        //  if(cash === '' || creditCard === "") {
        //     alert('支払い情報の選択がされていません。');
        // } else if(cash || creditCard === "" ){
        //     alert('クレジットカード情報を入力してください');
        // } else if(!pattern3.test(creditCard)) {
        //     alert('クレジットカード情報は XXXX-XXXX-XXXX-XXXX の形で入力してください');
        //     return false
        // };

        // console.log(orderYear + orderMonth + orderDay * orderTime);
    }
}
