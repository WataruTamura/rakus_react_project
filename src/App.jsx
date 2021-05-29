import React,{useEffect} from 'react';
import './assets/style.css';
import Router from './Router';
import { auth } from './firebase/index'
import { useSelector } from 'react-redux';
import { getUserId } from './reducks/users/selector';
import {useHistory} from 'react-router-dom'

const App = () => {

  const history = useHistory()
  const handle = path => history.push(path)

  const selector = useSelector((state) => state);
  let uid = getUserId(selector);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        uid = user.uid;
        console.log(user.uid)
        console.log(uid);
        console.log('ログインしました！')
        handle('/')
      }else{
        uid = null
        console.log('ログアウトしました！')
      }
    })
  },[uid])

  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
