import {signInWithEmailAndPassword,sendPasswordResetEmail, onAuthStateChanged} from "firebase/auth"
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import {auth} from "../../scripts/firebaseAuth"
import { Link, useNavigate } from "react-router-dom";
import showPassword from "../../scripts/showPassword";
import toggleLoader from "../../scripts/hideLoader";

export default function Login(){
  const navigate = useNavigate()
  const password_input = useRef(null)
  const [inputControl,setInputControl] = useState({email:"",password:""})
  const [errorMessage,setErrorMessage] = useState("")
  
  useEffect(()=>{
    
    onAuthStateChanged(auth,(user)=>{
      if(window.location.pathname === "/singUp") return
      if(user){
        toggleLoader()
        navigate(`/user/${user.uid}`)
      }
    })
    return (()=>{})
  },[])

  const handleChange = (ev) =>{
    const {id} = ev
    setInputControl(state =>{
      return {...state,[id]: ev.value}
    })
  }

  const changePassword = ev =>{
    ev.preventDefault()
    if(inputControl.email === "") {
      setErrorMessage("Preencha o campo email para redefinir a senha!")
      return
    }
    sendPasswordResetEmail(auth,inputControl.email).then( () =>{
      alert(`Email enviado com sucesso para ${inputControl.email}`)
    }).catch(error=>{
      setErrorMessage("Email inválido!")
      console.clear()
    })
  }
  
  const singIn = ev =>{
    ev.preventDefault()
    signInWithEmailAndPassword(auth,inputControl.email,inputControl.password).then(userCredential =>{
      toggleLoader()
      navigate(`/user/${userCredential.user.uid}`)
    }).catch(()=>{
      setErrorMessage("Credenciais não encontradas!")
      console.clear()
    })
  }

  return (
    <div id="App" className="bg-dark">
      <>
        <div className="loader d-flex align-items-center justify-content-center fs-6 hide" id="navigation-loader">
          <div className="spinner-border text-white" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
      <div className="container py-5 login-page d-grid ">
        <form 
        className="text-white login-form w-50 mx-auto p-4 rounded"
        onSubmit={singIn}
        >
          <h3 className="h2 text-center">Fazer login</h3>
          <span className="login-error-message text-danger fs-6 my-3">
            {
              errorMessage
            }
          </span>
          <div className="">
            <label className="form-label fs-5 text-white" htmlFor="email">Email</label>
            <input 
            className="form-control" 
            type="email" 
            id="email"
            value={inputControl.email}
            onChange={ev => handleChange(ev.currentTarget)}
            />
            
          </div>
          <div className="position-relative password-div">
            <label className="form-label fs-5 text-white" htmlFor="password">Senha</label>
            <input 
            className="form-control" 
            type="password" 
            id="password"
            ref={password_input}
            value={inputControl.password}
            onChange={ev => handleChange(ev.currentTarget)}
            />
            <div 
            className="position-absolute text-white d-flex" 
            onClick={ev => showPassword(ev,password_input.current)}>
              <i className="bi bi-eye"></i>
            </div>
          </div>
          <div className="login-buttons d-flex flex-column my-3 gap-3">
            <Button
            atributes={{
              type:"submit",
              className:"btn btn-info fs-5"
            }}
            >
              Login
            </Button>
            <Link
            to={"/singUp"}
            className="btn btn-outline-info fs-5"
            >
              Registrar-se
            </Link>
            <Button atributes={
              {
                id:"reset-password",
                className:"border-0 text-white",
                onClick: ev => changePassword(ev)
              }
              }>
              Redefinir senha
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}