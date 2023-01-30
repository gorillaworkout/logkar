import React, { useState,useCallback, useEffect } from "react";
import "../../Style/Login.scss";
import Header from "../../Component/Header";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import debounce from 'lodash.debounce';
import _ from "lodash";
import AuthDataService from '../../Services/auth.services'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';


export default function Login() {
  toast.configure()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [errorName,setErrorName]=useState('')
  const [errorPass,setErrorPass]=useState('')
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [isName,setIsName] = useState(false)
  const [isPassword,setIsPassword]=useState(false)

  const onChangeName=(e)=>{
    
    debounce(e.target.value);
   
  }
  const debounce = useCallback(
    _.debounce((value) => {
      if(value.length > 3 && value.length <=30){
        setIsName(true)
        setName(value)
      }else {
        setIsName(false)
        setErrorName('Min 3 char & max 30 char')
      }
    }, 1000),
    []
  );
  const onChangePassword=(value)=>{
    setPassword(value)
    debouncePassword(value);
  }

  const passContainUpperCase=(str)=>{
    return /[A-Z]/.test(str);
  }

  const debouncePassword = useCallback(
    _.debounce((value) => {
      let isPasswordUppercase = passContainUpperCase(value)
      let isPasswordMin3Max10 = value.length > 3 && value.length <=10
      if(isPasswordUppercase && isPasswordMin3Max10){
        setPassword(value)
        setIsPassword(true)
      }else {
        setErrorPass('Min 3 char & max 10 char & capital')
        setIsPassword(false)
      }
    }, 500),
    []
  );

  const onLogin=async()=>{

    if(name && password){
      
      let allUserFirestore = []
      let allIdUser = []
      const data  = await AuthDataService.getAllAuth();
      data.docs.map((doc)=>{
        allIdUser.push(doc.id)
        allUserFirestore.push(doc.data())
      })
      if(allUserFirestore.length){
        
        let findId = allUserFirestore.findIndex((val,index)=>{
          return val.name.toUpperCase() === name.toUpperCase()
        })
        if(findId !== -1  && allUserFirestore[findId].password === password && allUserFirestore[findId].name === name){
          toast.success(`Berhasil Login`, {
            position: "top-center",
            autoClose: 1400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setTimeout(()=>{
          navigate('/home')
          dispatch({ type: "IDACTIVE",id:allIdUser[findId]});
        },1500)
        }else if (findId !== -1 &&allUserFirestore[findId].name === name ){
          toast.error(`Nama Sudah digunakan`, {
            position: "top-center",
            autoClose: 1400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        }else {
          let dataCustomer = {
            name:name,
            password:password,
            email:'',
            alamat:'',
            telepon:''
          }
          let addAuth = await AuthDataService.addAuth(dataCustomer)
          let idCustomer = addAuth._key.path.segments[1]
          dispatch({ type: "IDACTIVE",id:idCustomer});
          navigate('/home')
        }
        
      }else {
        // database masih kosong
        let dataCustomer = {
          name:name,
          password:password,
          email:'',
          alamat:'',
          telepon:''
        }
        await AuthDataService.addAuth(dataCustomer)
        dispatch({ type: "IDACTIVE",id:allIdUser[0]});
        navigate('/home')
      }
    }else {
      toast.error(`Pengisian Salah`, {
        position: "top-center",
        autoClose: 1400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    }
  }
  return (
    <>
      <div className="wrapper-container">
        <div className="auth-wrapper">
          <Header />
          <div className="card-login auth-inner">
            <div className="Auth-form-container">
              <div className="Auth-form" >
                <div className="Auth-form-content">
                  <h3 className="Auth-form-title">Login</h3>
                  <div className="form-group mt-3">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      placeholder="Enter Name"
                      onChange={onChangeName}
                      // value={name}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label>Password</label>
                    <div className="input-password">
                  
                      {isPassVisible ? (
                        <>
                          <input
                            type="password"
                            className="mt-1"
                            placeholder="Enter password"
                            onChange={(e)=>onChangePassword(e.target.value)}
                            value={password}
                          />
                          <AiOutlineEyeInvisible
                            className="icon-eye"
                            onClick={() => setIsPassVisible(false)}
                          />
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            className="mt-1"
                            placeholder="Enter password"
                            onChange={(e)=>onChangePassword(e.target.value)}
                            value={password}
                          />
                          <AiOutlineEye
                            className="icon-eye"
                            onClick={() => setIsPassVisible(true)}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <button  className="btn btn-primary" onClick={onLogin} disabled={!isName || !isPassword}>
                      Login
                    </button>
                  </div>
                  <p className="forgot-password mt-1" style={{color:'red'}}>
                    {
                      isName === false ?
                       errorName
                      :
                      ''
                    }
                  </p>
                  <p className="forgot-password mt-1" style={{color:'red'}}>
                    {
                      isPassword === false ?
                      errorPass
                      :
                      ''
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
