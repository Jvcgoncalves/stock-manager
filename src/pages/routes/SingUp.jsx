import {createUserWithEmailAndPassword, signOut} from "firebase/auth/cordova"
import { useRef, useState } from "react";
import {auth, dataBase} from "../../scripts/firebaseAuth"
import { Link, useNavigate } from "react-router-dom";
import showPassword from "../../scripts/showPassword";
import { doc, setDoc } from "firebase/firestore";
import toggleLoader from "../../scripts/hideLoader";

export default function SingUp(){
  const sing_up_button = useRef(null)
  const password_input = useRef(null)
  const navigation = useNavigate()
  const [inputControl,setInputControl] = useState({email:"",password:""})
  const [singUpResponse,setSingUpResponse] = useState("")
  const handleChange = (ev) =>{
    const {id} = ev
    setInputControl(state =>{
      return {...state,[id]: ev.value}
    })
  }

  const singUp = async ev =>{
    ev.preventDefault()
    toggleLoader()

    if(inputControl.password.length < 6) {
      setSingUpResponse("A senha deve ter pelo menos 6 caracteres") 
      toggleLoader()
      return
    }
    
    await createUserWithEmailAndPassword(auth,inputControl.email,inputControl.password).then(async () =>{
      toggleLoader()
      const userInfo = {
        products: [],
        userUid: auth.currentUser.uid
      }
      const docRef = doc(dataBase,"users",auth.currentUser.uid)
      await setDoc(docRef,userInfo).then(()=>{alert("cadastrado com sucesso!")})
      await signOut(auth).then(()=>navigation("/"))
      
    }).catch(error=>{
      if(error.code === "auth/invalid-email") setSingUpResponse("Email inválido")
      else setSingUpResponse("Email já está em uso")
      console.clear()
    })
    toggleLoader()
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
      <div className="container py-5 sing-up-page d-grid">
        <form 
        className="text-white sing-up-form w-50 mx-auto p-4 rounded"
        onSubmit={singUp}
        >
          <h3 className="h2 text-center">Criar conta</h3>
          <span className="text-danger">
            {singUpResponse}
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
            required
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
            <button ref={sing_up_button} id="sing-up-button" type="submit" className="btn btn-info fs-5">
              Cadastrar
            </button>
            <Link to={"/"} className="cancel-sing-up nav-link fs-5 text-center text-white">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}