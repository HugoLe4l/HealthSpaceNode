import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

import axios from "axios";

import "./login.css"
import "../AuthsGlobal.css"

//Icons
import Google_Icon from "../../../../public/Assets/Interface/googleLogo.png"
import Header_logo from "../../../../public/Assets/Interface/header-logo.png"

//Components
import Footer01 from "../../../components/Footer01/footer01";
import Loading01 from "../../../components/Loading01/loading01";

function LoginPage() {
    const navigate = useNavigate()

    const InputEmailValue = useRef(null)
    const InputPassword01 = useRef(null)
    const IconToggleShowSenha = useRef(null)

    const TextRequisicaoEmailResposta = useRef(null)
    const TextRequisicaoSenhaResposta = useRef(null)
    const TextRequisicaoSucesso       = useRef(null)

    const [StatusLoading01Btn, setStatusLoading01Btn] = useState(false)
    const [StatusBtnSubmit, setStatusBtnSubmit] = useState(true)

    const [StatusForm, setStatusForm] = useState(true)


    useEffect(() => {
        const TokenStorage =  localStorage.getItem("tokenJWT")
        if(TokenStorage){
            axios.post('http://api-s-health-space.vercel.app/auth/authToken', { token : TokenStorage })
            .then( resposta => {

                if(resposta.data['TokenValidade']) {
                    navigate('/')
                }
            })
        }   
    },[])

    function LoginSubmit(event) {
        event.preventDefault()
        let EmailValue = InputEmailValue.current.value
        let SenhaValue = InputPassword01.current.value
        console.log(EmailValue)
        console.log(SenhaValue)

        function animatedInputsError(resposta, ref1, ref2, colunaBD) {
            ref1.current.textContent = resposta[colunaBD]
            ref1.current.style.display = "flex"
            ref2.current.classList.add('AnimateErrorInput')
            setTimeout(() => {
                ref1.current.style.display = "none"
                ref2.current.classList.remove('AnimateErrorInput')
            }, 3000);
        }
        setStatusLoading01Btn(true)
        setStatusBtnSubmit(false)
        setStatusForm(false)
        axios.post('http://api-s-health-space.vercel.app/auth/login', { EmailInputValue: EmailValue, SenhaInputValue: SenhaValue })
        
            .then(resposta => {
                
                if (resposta.data['Verifica_Email_Existe']) { // Se o email existe no banco de dados
                    if (resposta.data['Verifica_Senha_Correta']) { // Se a senha estiver correta faz isso
                        console.log(resposta.data)
                        TextRequisicaoSucesso.current.textContent = resposta.data['Mensagem3'] + <Loading01 display={true}/>
                        TextRequisicaoSucesso.current.style.display = "flex"
                        localStorage.setItem('tokenJWT', resposta.data['Token']);
                        setTimeout(() => {
                            navigate("/")
                        }, 2000);
                    } else { // Se a senha NÃO estiver correta faz isso
                        setStatusLoading01Btn(false)
                        setStatusBtnSubmit(true)
                        setStatusForm(true)
                        console.log(resposta.data)
                        animatedInputsError(resposta.data, TextRequisicaoSenhaResposta, InputPassword01, "Mensagem2")
                    }

                } else { // Se o email NÃO existe no banco de dados
                    setStatusLoading01Btn(false)
                    setStatusBtnSubmit(true)
                    setStatusForm(true)
                    console.log(resposta.data)
                    animatedInputsError(resposta.data, TextRequisicaoEmailResposta, InputEmailValue, "Mensagem")
                }
            })


            .catch(error => {
                setStatusLoading01Btn(false)
                setStatusBtnSubmit(true)
                setStatusForm(true)
                console.error('Erro ao enviar os dados:', error);
            });
    }
    return (
        <div className="Auth_Page">
            <div className="Main">
                <img className="Logo_HealthSpace" src={Header_logo} alt="Header_logo" />
                <form style={{pointerEvents: StatusForm ? "auto" : "none"}}  className="Card_AuthPage" onSubmit={() => { LoginSubmit(event) }}>
                    <h1>Faça o login</h1>


                    <div className="BoxInputAuth">
                        <h6>Email</h6>
                        <input ref={InputEmailValue} required type="email" name="email" autoComplete="email" />
                        <p ref={TextRequisicaoEmailResposta}>Email não encontrado</p>
                    </div>

                    <div className="BoxInputAuth">
                        <h6>Senha</h6>
                        <input ref={InputPassword01} required type="password" name="password" autoComplete="current-password" />
                        <i ref={IconToggleShowSenha} class="bi bi-eye btn_Mostrar_Senha" onClick={() => { ToggleTypeInputPassword(InputPassword01) }}></i>
                        <p ref={TextRequisicaoSenhaResposta}></p>
                    </div>

                    <div className="AuthPage_Tex1">
                        <p>Esqueceu sua senha?</p>
                    </div>

                    <button type="submit" className="btn_style_1" id="Btn_Login"><p style={{opacity: StatusBtnSubmit ? "100%" : "0%"}}>Entrar</p> <Loading01 display={StatusLoading01Btn}/> </button>
                    
                    <p className="ou1">ou</p>

                    <div className="Google_btn">
                        <img src={Google_Icon} alt="" />
                        <p>Login com Google</p>
                    </div>
                    <p ref={TextRequisicaoSucesso} className="TextRespsotaSubmit SucessoRequisicao"></p>
                </form>
                <p className="textAuthLink undeline" onClick={() => navigate('/cadastro')}>Criar conta</p>
            </div>

            <Footer01 />

        </div>
    )

    function ToggleTypeInputPassword(input) {
        const isPassword = input.current.type === "password"
        input.current.type = isPassword ? "text" : "password"

        if (input.current.type === "password") {

            IconToggleShowSenha.current.classList.remove('bi-eye-slash')
            IconToggleShowSenha.current.classList.add('bi-eye')
        } else {
            IconToggleShowSenha.current.classList.remove('bi-eye')
            IconToggleShowSenha.current.classList.add('bi-eye-slash')
        }
    }
}

export default LoginPage