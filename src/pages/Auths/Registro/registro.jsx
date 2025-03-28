import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import axios from "axios";

import "./registro.css"
import "../AuthsGlobal.css"

//Icons
import Google_Icon from "../../../../public/Assets/Interface/googleLogo.png"
import Header_logo from "../../../../public/Assets/Interface/header-logo.png"
import Image1 from "../../../../public/Assets/Interface/Image1.png"

//Components
import Footer01 from "../../../components/Footer01/footer01";
import Loading01 from "../../../components/Loading01/loading01";


function RegistroPage() {
    const navigate = useNavigate()

    const InputNomeRegistro = useRef(null)
    const InputEmailRegistro = useRef(null)
    const InputSenha01Registro = useRef(null)
    const InputSenha02Registro = useRef(null)

    const IconToggleShowSenha = useRef(null)

    const TextRequisicaoResposta = useRef(null)
    const TextRequisicaoSenhaResposta = useRef(null)
    const TextRequisicaoEmailResposta = useRef(null)

    const [StatusLoading01Btn, setStatusLoading01Btn] = useState(false)
    const [StatusBtnSubmit, setStatusBtnSubmit] = useState(true)

    const [StatusForm, setStatusForm] = useState(true)

    function AnimatedInputError(ref1, ref2, classe1) {
        if (ref1) { ref1.current.classList.add(classe1) }
        if (ref2) { ref2.current.classList.add(classe1) }
        setTimeout(() => {
            if (ref1) { ref1.current.classList.remove(classe1) }
            if (ref2) { ref2.current.classList.remove(classe1) }
        }, 4000);
    }

    function AnimatedInputTextError(resposta, ref1, colunaBD) {
        ref1.current.textContent = resposta[colunaBD]
        ref1.current.style.display = 'flex'
        setTimeout(() => {
            ref1.current.style.display = 'none'
        }, 4000);
    }


    function RegistroSubmit(event) {
        event.preventDefault()
        let InputNome = InputNomeRegistro.current.value
        let InputEmail = InputEmailRegistro.current.value
        let InputSenha01 = InputSenha01Registro.current.value
        let InputSenha02 = InputSenha02Registro.current.value

        setStatusLoading01Btn(true)
        setStatusBtnSubmit(false)
        setStatusForm(false)
        axios.post('https://api-s-health-space.vercel.app/auth/registro', { NomeInputValue: InputNome, EmailInputValue: InputEmail, SenhaInputValue01: InputSenha01, SenhaInputValue02: InputSenha02 })
            .then(resposta => {

                if (resposta.data['Verifica_Campos_Preenchido']) { // Todos os campos preenchidos

                    if (resposta.data['Verifica_Senhas_Iguais']) { // Se as senhas forem Iguais
                        console.log(resposta.data['Mensagem'])

                        if (!resposta.data['Ja_Existe_Email_Cadastrado']) { // Se não existe emails ja cadastrado conclui o registro
                            TextRequisicaoResposta.current.textContent = resposta.data['Mensagem']
                            TextRequisicaoResposta.current.style.display = "flex"
                            TextRequisicaoResposta.current.classList.add('SucessoRequisicao')
                        } else { // Se existe um email já cadastrado
                            setStatusLoading01Btn(false)
                            setStatusBtnSubmit(true)
                            setStatusForm(true)
                            console.log(resposta.data['Mensagem'])
                            AnimatedInputError(InputEmailRegistro, "", 'AnimateErrorInput')
                            AnimatedInputTextError(resposta.data, TextRequisicaoEmailResposta, "Mensagem")
                        }

                    } else { // Se as senhas NÃO forem iguais
                        setStatusLoading01Btn(false)
                        setStatusBtnSubmit(true)
                        setStatusForm(true)

                        AnimatedInputError(InputSenha01Registro, InputSenha02Registro, 'AnimateErrorInput')
                        AnimatedInputTextError(resposta.data, TextRequisicaoSenhaResposta, "Mensagem")
                    }

                } else { // Caso tenha campo vazio
                    setStatusLoading01Btn(false)
                    setStatusBtnSubmit(true)
                    setStatusForm(true)
                    console.log(resposta.data['Mensagem'])
                    TextRequisicaoResposta.current.textContent = resposta.data['Mensagem']
                    TextRequisicaoResposta.current.style.display = "flex"
                    TextRequisicaoResposta.current.classList.add('FalhaRequisicao')
                    setTimeout(() => {

                        TextRequisicaoResposta.current.classList.add('AnimatedSaidaText')
                        setTimeout(() => {
                            TextRequisicaoResposta.current.classList.remove('AnimatedSaidaText')
                            TextRequisicaoResposta.current.style.display = "none"
                            TextRequisicaoResposta.current.classList.remove('FalhaRequisicao')
                        }, 800);


                    }, 5000);
                }
            })

            .catch(error => {
                setStatusLoading01Btn(false)
                setStatusBtnSubmit(true)
                setStatusForm(true)
                TextRequisicaoResposta.current.textContent = "Houve um error ao tentar realizar o registro. :("
                console.error('Erro ao enviar os dados:', error);
            });
    }

    return (
        <div className="Auth_Page AuthPageRegister">
            <div className="Main Register_Main_Style">

                <div className="Box_Auth_Register_Left">
                    <div className="Registrologo">
                        <img className="Logo_HealthSpace" src={Header_logo} alt="Header_logo" />
                    </div>
                    <div className="TopicosRegistro">
                        <h1>Por que usar o HealthSpace?</h1>
                        <ul className="Topicos_List_Itens">
                            <li> <i class="bi bi-patch-check-fill"></i> <strong>Encontre espaços ideais: </strong>Alugue locais adequados para suas atividades de saúde de forma simples e rápida.</li>
                            <li> <i class="bi bi-patch-check-fill"></i> <strong>Aumente sua renda: </strong>Proprietários podem monetizar espaços pouco utilizados sem complicações.</li>
                            <li> <i class="bi bi-patch-check-fill"></i> <strong>Facilidade e eficiência: </strong>Conectamos profissionais e espaços de forma prática, sem burocracia.</li>
                        </ul>
                    </div>
                    <img className="RegistroImage1" src={Image1} alt="" />
                </div>

                <div className="Box_Auth_Register_Right">
                    <form style={{pointerEvents: StatusForm ? "auto" : "none"}} className="Card_AuthPage" onSubmit={() => { RegistroSubmit(event) }}>
                        <h1>Registre-se</h1>


                        <div className="BoxInputAuth">
                            <h6>Nome</h6>
                            <input ref={InputNomeRegistro} type="text" />
                        </div>

                        <div className="BoxInputAuth">
                            <h6>Emaill</h6>
                            <input ref={InputEmailRegistro} required type="text" />
                            <p ref={TextRequisicaoEmailResposta}>aaaa</p>
                        </div>

                        <div className="BoxInputAuth">
                            <h6>Senha</h6>
                            <input ref={InputSenha01Registro} id="InputPassword01" required type="password" />
                            <i ref={IconToggleShowSenha} class="bi bi-eye btn_Mostrar_Senha" onClick={() => { ToggleTypeInputPassword(InputSenha01Registro, InputSenha02Registro) }}></i>
                            <p ref={TextRequisicaoSenhaResposta}>aaaa</p>
                        </div>

                        <div className="BoxInputAuth">
                            <h6>Repetir senha</h6>
                            <input ref={InputSenha02Registro} id="InputPassword02" required type="password" />
                        </div>

                        <div className="AuthPage_Tex1">
                            <p>Esqueceu sua senha?</p>
                        </div>
                        <p ref={TextRequisicaoResposta} className="TextRespsotaSubmit">aa</p>

                        <button className="btn_style_1" id="Btn_Login"><p style={{ opacity: StatusBtnSubmit ? "100%" : "0%" }} >Registrar</p> <Loading01 display={StatusLoading01Btn} /> </button>

                        <p className="ou1">ou</p>

                        <div className="Google_btn">
                            <img src={Google_Icon} alt="" />
                            <p>Registro com Google</p>
                        </div>
                    </form>
                    <p className="texto_criar_conta" >Já tem conta? <strong className="textAuthLink undeline" onClick={() => navigate('/login')} >Faça o Login</strong></p>
                </div>
            </div>

            <Footer01 />
        </div>
    )

    function ToggleTypeInputPassword(input, input2) {
        const isPassword = input.current.type === "password"
        input.current.type = isPassword ? "text" : "password"
        input2.current.type = isPassword ? "text" : "password"

        if (input.current.type === "password") {

            IconToggleShowSenha.current.classList.remove('bi-eye-slash')
            IconToggleShowSenha.current.classList.add('bi-eye')
        } else {
            IconToggleShowSenha.current.classList.remove('bi-eye')
            IconToggleShowSenha.current.classList.add('bi-eye-slash')
        }
    }
}

export default RegistroPage
