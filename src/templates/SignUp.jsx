import React, {useState, useCallback} from 'react';
import  TextInput  from "../components/UIkit/TextInput";
import {useDispatch} from "react-redux";
import {signUp} from "../reducks/users/operations";
// import {push} from "connected-react-router"
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

const SignUp = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [username, setUsername] = useState("")
    const [zipcode, setUserzipcode] = useState("")
    const [address, setUseraddress] = useState("")
    const [tel, setUsertel] = useState("")

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    },[setEmail]);

    const inputPassword = useCallback((e) => {
        setPassword(e.target.value)
    },[setPassword]);

    const inputConfirmPassword = useCallback((e) => {
        setConfirmPassword(e.target.value)
    },[setConfirmPassword]);

    const inputUsername = useCallback((e) => {
        setUsername(e.target.value)
    },[setUsername]);

    const inputZipcode = useCallback((e) => {
        setUserzipcode(e.target.value)
    },[setUserzipcode]);

    const inputAddress = useCallback((e) => {
        setUseraddress(e.target.value)
    },[setUseraddress]);

    const inputTel = useCallback((e) => {
        setUsertel(e.target.value)
    },[setUsertel]);

    const clear = () => {
        console.log('クリアボタンが発動しました')
        setUsername('')
        setUseraddress('')
        setUsertel('')
        setUserzipcode('')
        setPassword('')
        setConfirmPassword('')
        setEmail('')
    }

    return (
        <div className="section">
            <h2 className="headline">アカウント登録</h2>
            <div className="module-spacer--medium" />
            <TextInput
                fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
                rows={1} value={username} type={"text"} onChange={inputUsername}
            />
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"郵便番号"} multiline={false} required={true}
                rows={1} value={zipcode} type={"text"} onChange={inputZipcode}
            />
            <TextInput
                fullWidth={true} label={"住所"} multiline={false} required={true}
                rows={1} value={address} type={"address"} onChange={inputAddress}
            />
            <TextInput
                fullWidth={true} label={"電話番号"} multiline={false} required={true}
                rows={1} value={tel} type={"text"} onChange={inputTel}
            />
            <TextInput
                fullWidth={true} label={"パスワード（半角英数字で6文字以上）"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <TextInput
                fullWidth={true} label={"パスワードの再確認"} multiline={false} required={true}
                rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
            />
            <div />
            <div >
                <Button
                    variant="contained" color="primary"
                    onClick={() => dispatch(signUp(username, email, zipcode,address,tel,password, confirmPassword))}
                >アカウントを登録する</Button>
                <span>  </span>
                <Button variant="contained" color="primary" onClick={clear}>クリア</Button>
                <div className="module-spacer--small" />
                <Link to={'/'}>アカウントをお持ちの方はこちら</Link>
            </div>
        </div>
    );
};

export default SignUp;