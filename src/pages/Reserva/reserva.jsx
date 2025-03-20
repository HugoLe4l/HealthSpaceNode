import "./reserva.css"

import axios from "axios"

import { useParams, useLocation, useNavigate } from "react-router-dom"

import { useState, useEffect, useRef } from "react"

//Components
import Header02 from "../../components/Header02/header02.jsx"
import Footer02 from "../../components/Footer02/footer02.jsx"
import Loading01 from "../../components/Loading01/loading01.jsx"

//Icones
import Coins_icon from "../../../public/Assets/Icons/Coloridos/Coins_icon.png"
import Pix_icon from "../../../public/Assets/Icons/Coloridos/Pix_icon.png"

import Not_Image_Card from "../../../public/Assets/Imagens/Not_Image_Card.jpg"

function ReservaPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { CodigoProduto } = useParams()
    const [DadosAnuncio, setDadosAnuncio] = useState([])


    const { SelectDataReserva, SelectQuantHoras, timeradioSelectDE, timeradioSelectSaida } = location.state || {};

    const dados = {
        nome: "Visitante",
        HCoins: 0
    }
    const [IdUsuario, setIdUsuario] = useState()
    const [InfosUser, setInfosUser] = useState(dados)
    const [StatusLogin, setStatusLogin] = useState(true)

    const [EstadoOptionsPayout, setEstadoOptionsPayout] = useState(false)
    const [MetodoPayoutSelecionado, setMetodoPayoutSelecionado] = useState("Coins")

    const Ref_OptionsPayout = useRef(null)


    const [QuantHoras, setQuantHoras] = useState(SelectQuantHoras ? SelectQuantHoras : 1);

    const [LoadingState01, setLoadingState01] = useState(false)

    const [ShowResultadoReq, setShowResultadoReqt] = useState(true)
    const [TexoResultado, setTexoResultado] = useState("")
    const [TextPosivoOuNegativo, setTextPosivoOuNegativo] = useState()
    const [Loading_btn2, setLoading_btn2] = useState(false)

    const Ref_BoxResultOperacao = useRef(null)

    const [EstadoBtnReserva, setEstadoBtnReserva] = useState(true)




    useEffect(() => {
        const TokenStorage = localStorage.getItem("tokenJWT")
        if (TokenStorage) {
            axios.post('https://api-s-health-space.vercel.app/auth/authToken', { token: TokenStorage })
                .then(resposta => {

                    if (resposta.data['TokenValidade']) {
                        const id = resposta.data['tokenDados'].id
                        setIdUsuario(id)
                        axios.post('https://api-s-health-space.vercel.app/auth/InfosUser', { id: id })
                            .then(resposta => {
                                setInfosUser(resposta.data['resultado'])
                                //console.log(resposta.data['resultado'])
                                setStatusLogin(true)
                            })

                    } else {

                        setStatusLogin(false)
                    }


                })

                .catch(err => {
                    setStatusLogin(false)
                    localStorage.removeItem("tokenJWT")
                    window.location.reload()
                    console.error("Erro ao validar token:", err)
                })
        } else {
            setStatusLogin(false)
        }


    }, [])

    useEffect(() => {
        console.log(` DADOS RECEBIDOS: ${SelectDataReserva} e ${SelectQuantHoras}`)
        axios.post("https://api-s-health-space.vercel.app/anuncio/anuncioInfo", { CodigoProduto })
            .then((resposta) => {
                setDadosAnuncio(resposta.data['Dados'][0]);
                console.log(resposta.data['Dados'][0])
                console.log(`ID: ${CodigoProduto} CARREGADO`)

            })
            .catch((err) => console.error("Erro ao buscar anúncio:", err));
    }, [CodigoProduto]); // Só roda quando o código muda

    return (
        <>

            <Header02 InfosUser={InfosUser} StatusLogin={StatusLogin} />

            <main id="FinalizarReservaMain">
                <div id="box_finalizar_reserva">
                    <section class="section_left_reserva">
                        <div class="tittle_reserva">

                            <h3>Confirmar e pagar</h3>
                        </div>

                        <div class="dados_reserva">
                            <h5>Sua reserva</h5>
                            <div class="box_infos_reserva">
                                <div class="left_box_reserva">
                                    <h6>Data</h6>
                                    <p>{SelectDataReserva}</p>
                                </div>
                                <h4>Editar</h4>
                            </div>
                            <div class="box_infos_reserva">
                                <div class="left_box_reserva">
                                    <h6>Horário</h6>
                                    <p>{timeradioSelectDE} até {timeradioSelectSaida}</p>
                                </div>
                                <h4>Editar</h4>
                            </div>
                            <hr id="hr" />
                        </div>

                    </section>

                    <section class="section_right_reserva">
                        <div class="card_reserva">
                            <div class="reserva_anuncio_dados">
                                <div class="image_reserva" style={{backgroundImage : `url(${Not_Image_Card})`}} ></div>
                                <div class="info_reserva_detalhes">
                                    <h3>{DadosAnuncio.nome} | <strong className="cod_anuncio1">Codigo: 00{DadosAnuncio.id}</strong></h3>
                                    <p>{DadosAnuncio.nome_usuario}</p>
                                    <div class="rating-box">
                                        <i class="bi bi-star-fill"></i>
                                        <p class="rating-info">{DadosAnuncio.rating}</p>
                                        <p>(240 Avaliações)</p>
                                    </div>
                                </div>
                            </div>
                            <hr id="hr" />
                            <h6>Informações de preço</h6>
                            <div>
                                <div class="row_info_reserva">
                                    <p>R${DadosAnuncio.preco_por_hora} x {QuantHoras} horas</p>
                                    <p>R${DadosAnuncio.preco_por_hora * QuantHoras}</p>
                                </div>
                                <div class="row_info_reserva">
                                    <p>Taxa extra</p>
                                    <p>R$ 0</p>
                                </div>

                            </div>
                            <hr id="hr" />
                            <div class="row_info_reserva">
                                <h6>Total (BRL)</h6>
                                <h6>R$ {DadosAnuncio.preco_por_hora * QuantHoras}</h6>
                            </div>

                        </div>

                    </section>
                </div>




                <div id="Box_Payout_Metodo" style={{ display: StatusLogin ? "flex" : "none" }}>
                    <div className="box_options_payout" >
                        <p id="textPagarCom">Pagar com</p>
                        <div className="select_options" onClick={() => { setEstadoOptionsPayout(!EstadoOptionsPayout) }}>
                            <p><img src={`../../../public/Assets/Icons/Coloridos/${MetodoPayoutSelecionado}_icon.png`} alt="" />{MetodoPayoutSelecionado}</p>
                            <i class="bi bi-chevron-down"></i>
                        </div>
                        <ul ref={Ref_OptionsPayout} className="optionsPayout" style={{ height: EstadoOptionsPayout ? "121px" : "0px" }}>
                            <li onClick={() => { setMetodoPayoutSelecionado("Pix"); setEstadoOptionsPayout(false) }}>
                                <input type="radio" name="radioOptionsPayout" value="Pix" checked={MetodoPayoutSelecionado === "Pix"} />
                                <div className="box_method_pay"><img src={Pix_icon} alt="" />Pix</div>
                            </li>
                            <hr />
                            <li onClick={() => { setMetodoPayoutSelecionado("Coins"); setEstadoOptionsPayout(false) }}>
                                <input type="radio" name="radioOptionsPayout" value="Coins" checked={MetodoPayoutSelecionado === "Coins"} />
                                <div className="box_method_pay"><img src={Coins_icon} alt="" />Coins</div>
                            </li>
                        </ul>
                    </div>
                    <div id="textResultDiv" >
                        <div id="BoxtStatusConsultando" style={{ display: LoadingState01 ? "flex" : "none" }}>
                            <p id="TextStatusConsultando" >Consultando dados</p>
                            <div className="loadingStatus"></div>
                        </div>

                        <div id="BoxResultOperacao" ref={Ref_BoxResultOperacao} style={{ display: ShowResultadoReq ? "flex" : "none" }}>
                            <p id="textResultOperacaoId" style={{ color: TextPosivoOuNegativo ? "green" : "red" }} >{TexoResultado}</p>
                            <div className="loading_btn2" style={{ display: Loading_btn2 ? "flex" : "none" }}></div>
                        </div>

                        <button className="Btn_Reservar_Box" onClick={() => { FinalizarReserva(MetodoPayoutSelecionado, IdUsuario, DadosAnuncio.id, QuantHoras) }} style={{pointerEvents: EstadoBtnReserva ? "auto" : "none", opacity: EstadoBtnReserva ? "100%" : "50%"}}>Finalizar Reserva</button>
                    </div>

                    <p id="textMetodoDePagamentoAlert" style={{ display: MetodoPayoutSelecionado === "Pix" ? "Flex" : "none" }}>O método de pagamento PIX está indisponível no momento.</p>
                </div>

                <div id="loginbox" style={{ display: StatusLogin ? "none" : "grid" }}>
                    <p> Faça o <strong onClick={() => { navigate("/login") }}>LOGIN</strong> ou <strong onClick={() => { navigate("/cadastro") }}>REGISTRE-SE</strong> para continuar </p>
                </div>


            </main>
            <Footer02 />

        </>
    )


    function FinalizarReserva(MetodoPayoutSelecionado, IdUsuario, idAnuncio, QuantHoras) {
        console.log("Metodo: " + MetodoPayoutSelecionado)
        console.log("IdUser: " + IdUsuario)
        console.log("IdAnuncio: " + idAnuncio)
        console.log("QuantHoras: " + QuantHoras)

        axios.post("https://api-s-health-space.vercel.app/anuncio/pagamento", { MetodoPayoutSelecionado, IdUsuario, idAnuncio, QuantHoras })

            //setLoadingState01(true)
            .then((resposta => {
                setEstadoBtnReserva(false)
                if (resposta.data['PermicaoPagamento'] || resposta.data['UsuarioEncontrado'] || resposta.data['AnuncioEncontrado'] || resposta.data['AnuncioDisponibulidade'] || resposta.data['TemCoins']) {
                    setTexoResultado(resposta.data['Mensagem1'])
                    setTextPosivoOuNegativo(true)
                    setLoading_btn2(true)
                    texReqAnima()
                    if (resposta.data['TemCoins']) {
                        setTimeout(() => {
                            navigate("/")
                        }, 6000);

                    }
                } else {
                    setTexoResultado(resposta.data['Mensagem1'])
                    setTextPosivoOuNegativo(false)
                    setLoading_btn2(false)
                    texReqAnima()
                    setEstadoBtnReserva(true)
                }


            }))
            .catch((err) => console.error("Erro ao realizar pagamento:", err));


    }

    function texReqAnima() {
        Ref_BoxResultOperacao.current.classList.add("texReqAnima")
        setTimeout(() => {
            Ref_BoxResultOperacao.current.classList.remove("texReqAnima")
        }, 2000);
    }
}

export default ReservaPage