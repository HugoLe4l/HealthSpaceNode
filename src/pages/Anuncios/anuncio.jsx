import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import "./anuncios.css"

import AvatarUsuario from "../../../public/Assets/Imagens/user.jpg"

//Components
import Header02 from "../../components/Header02/header02"
import Footer02 from "../../components/Footer02/footer02"

function AnunciosPage() {
    const { CodigoProduto } = useParams()
    const [DadosAnuncio, setDadosAnuncio] = useState([])

    const dados = {
        nome: "Visitante",
        HCoins: 0
    }
    //const navigate = useNavigate()
    const [InfosUser, setInfosUser] = useState(dados)
    const [StatusLogin, setStatusLogin] = useState(true)

    const navigate = useNavigate()

    const [ShowOptionsTimeDE, setShowOptionsTimeDE] = useState(false)
    const [timeradioSelectDE, settimeradioSelectDE] = useState("Entrada")

    const [ShowOptionsTimeSaida, setShowOptionsTimeSaida] = useState(false)
    const [timeradioSelectSaida, settimeradioSelectSaida] = useState("Saida")

    const [SelectDataReserva, setSelectDataReserva] = useState("dd/mm/aaaa")
    const [SelectQuantHoras, setSelectQuantHoras] = useState(1)
    const [EstadoBtnReserva, setEstadoBtnReserva] = useState(false)




    useEffect(() => {
        const TokenStorage = localStorage.getItem("tokenJWT")
        if (TokenStorage) {
            axios.post('http://api-s-health-space.vercel.app/auth/authToken', { token: TokenStorage })
                .then(resposta => {

                    if (resposta.data['TokenValidade']) {
                        const id = resposta.data['tokenDados'].id
                        //console.log(id)
                        axios.post('http://api-s-health-space.vercel.app/auth/InfosUser', { id: id })
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
        axios.post("http://api-s-health-space.vercel.app/anuncio/anuncioInfo", { CodigoProduto })
            .then((resposta) => {
                setDadosAnuncio(resposta.data['Dados'][0]);
                console.log(resposta.data['Dados'][0])
            })
            .catch((err) => console.error("Erro ao buscar anúncio:", err));
    }, [CodigoProduto]); // Só roda quando o código muda


    useEffect(() => {

        if (timeradioSelectDE !== "Entrada" && timeradioSelectSaida !== "Saida") {
            console.log(parseInt(timeradioSelectDE))
            console.log(parseInt(timeradioSelectSaida))

            if (timeradioSelectDE < timeradioSelectSaida && SelectDataReserva !== "dd/mm/aaaa"){
                setSelectQuantHoras(parseInt(timeradioSelectSaida)-parseInt(timeradioSelectDE))
                setEstadoBtnReserva(true)
                console.log(SelectDataReserva)
            }

        }else{
            console.log("Defina um horario de Entrada e Saida")
        }


    }, [timeradioSelectDE, timeradioSelectSaida, SelectDataReserva])

    return (
        <>
            <Header02 InfosUser={InfosUser} StatusLogin={StatusLogin} />
            <main className="Page_Anuncio">
                <div className="TituloAnuncio">
                    <h1 className="TituloAnuncio">{DadosAnuncio.nome} | 0000{DadosAnuncio.id}</h1>
                    <div className="ShareFavBox">
                        <div className="ShareFavBoxStyle">
                            <i class="bi bi-box-arrow-up"></i> <p>Compartilhar</p>
                        </div>
                        <div className="ShareFavBoxStyle">
                            <i class="bi bi-heart"></i> <p>Salvar</p>
                        </div>
                    </div>
                </div>
                <div className="Box_Imagens_Anuncio">
                    <div className="Box_Imagens_Anuncio_Left">

                    </div>
                    <div className="Box_Imagens_Anuncio_Right">

                        <div className="rowAnuncioImagem">
                            <div className="ImagemAnuncioConjunto" id="ImagemAnuncio02"></div>
                            <div className="ImagemAnuncioConjunto rightborder" id="ImagemAnuncio03"></div>
                        </div>

                        <div className="rowAnuncioImagem">
                            <div className="ImagemAnuncioConjunto" id="ImagemAnuncio04"></div>
                            <div className="ImagemAnuncioConjunto rightborder" id="ImagemAnuncio05"></div>
                        </div>

                    </div>

                </div>


                <hr className="linha01" />



                <section className="SectionAnuncio_01">
                    <div className="AboutAnuncio">
                        <h2 >Um pouco sobre o espaço</h2>

                        <p>{DadosAnuncio.descricao}</p>

                    </div>
                    <div className="BoxLocAnuncio">
                        <div className="LocAnuncioCidade">
                            <i class="bi bi-geo-alt-fill"></i> <p>{DadosAnuncio.bairro}, {DadosAnuncio.cidade}</p>
                        </div>
                        | <p>{DadosAnuncio.rua} {DadosAnuncio.numero}, 509875-85</p>

                    </div>

                    <div className="FeddBackAnuncio">
                        <div className="RatingBox">
                            <i class="bi bi-star-fill"></i> <p>{DadosAnuncio.rating}</p>
                        </div>
                        <p id="RatingAnuncio">75 comentaríos</p>
                    </div>

                </section>

                <section className="SectionAnuncio_02">
                    <hr className="hr2" />
                    <div class="advertiser-perfil">

                        <img class="adveriser-image-perfil" src={AvatarUsuario} alt="AvatarUsuario" />

                        <div class="adveriser-infos">
                            <p class="text-Pertence">Pertence a: <a href="#">{DadosAnuncio.nome_usuario}</a></p>
                            <p class="text-age">1 ano na plataforma</p>
                        </div>
                    </div>
                    <hr className="hr2" />
                </section>

                <section className="SectionAnuncio_03">
                    <div class="tags-announcement">
                        <h3>Alguns recursos que o proprietário oferece</h3>
                        <div class="tags-field">
                            <div class="tag">
                                <i class="bi bi-ev-front"></i>
                                <p>Estacionamento incluído</p>
                            </div>
                            <div class="tag">
                                <i class="bi bi-wifi"></i>
                                <p>Recepção</p>
                            </div>
                            <div class="tag">
                                <i class="bi bi-wifi"></i>
                                <p>Banheiro</p>
                            </div>
                            <div class="tag">
                                <i class="bi bi-wifi"></i>
                                <p>Elevador</p>
                            </div>
                            <div class="tag">
                                <i class="bi bi-wifi"></i>
                                <p>Wi-Fi</p>
                            </div>
                            <div class="tag">
                                <i class="bi bi-wifi"></i>
                                <p>Ar-condicionado</p>
                            </div>

                        </div>
                        <a id="btn-mostrar-todas-comodidades" href="#">Mostrar todas as 14 comodidades</a>
                    </div>
                </section>

                <section className="SectionAnuncio_04">

                    <div className="Box_Reserva_Content">
                        <p id="PriceAnuncio"> <strong>R${parseFloat(DadosAnuncio.preco_por_hora).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> hora</p>


                        <div className="Box_Opcao_Data_Hora">
                            <input className="data_input" type="date" onChange={() => setSelectDataReserva(event.target.value)} />
                            <hr className="linha03" />
                            <div className="Box_Reserva_Time_Select">
                                <div className="box_times" >
                                    <div className="select_options_TIME" onClick={() => { setShowOptionsTimeDE(!ShowOptionsTimeDE) }} >{timeradioSelectDE}</div>

                                    <ul className="options_time" style={{ height: ShowOptionsTimeDE ? "150px" : "0px" }}>
                                        <li onClick={() => { settimeradioSelectDE("13:00"); setShowOptionsTimeDE(false) }}> <input type="radio" name="timeradioDE" value="13" checked={timeradioSelectDE === "13:00"} />13:00</li>
                                        <li onClick={() => { settimeradioSelectDE("14:00"); setShowOptionsTimeDE(false) }}><input type="radio" name="timeradioDE" value="14" checked={timeradioSelectDE === "14:00"} />14:00</li>
                                        <li onClick={() => { settimeradioSelectDE("15:00"); setShowOptionsTimeDE(false) }}><input type="radio" name="timeradioDE" value="15" checked={timeradioSelectDE === "15:00"} />15:00</li>
                                        <li onClick={() => { settimeradioSelectDE("16:00"); setShowOptionsTimeDE(false) }}><input type="radio" name="timeradioDE" value="16" checked={timeradioSelectDE === "16:00"} />16:00</li>
                                    </ul>

                                </div>

                                <p>Até</p>

                                <div className="box_times">
                                    <div className="select_options_TIME" onClick={() => { setShowOptionsTimeSaida(!ShowOptionsTimeSaida) }} >{timeradioSelectSaida}</div>

                                    <ul className="options_time" style={{ height: ShowOptionsTimeSaida ? "150px" : "0px" }}>
                                        <li onClick={() => { settimeradioSelectSaida("13:00"); setShowOptionsTimeSaida(false) }}><input type="radio" name="timeradioATE" value="13" checked={timeradioSelectSaida === "13:00"} />13:00</li>
                                        <li onClick={() => { settimeradioSelectSaida("14:00"); setShowOptionsTimeSaida(false) }}><input type="radio" name="timeradioATE" value="14" checked={timeradioSelectSaida === "14:00"} />14:00</li>
                                        <li onClick={() => { settimeradioSelectSaida("15:00"); setShowOptionsTimeSaida(false) }}><input type="radio" name="timeradioATE" value="15" checked={timeradioSelectSaida === "15:00"} />15:00</li>
                                        <li onClick={() => { settimeradioSelectSaida("16:00"); setShowOptionsTimeSaida(false) }}><input type="radio" name="timeradioATE" value="16" checked={timeradioSelectSaida === "16:00"} />16:00</li>
                                    </ul>

                                </div>
                            </div>

                        </div>

                    </div>





                    <button className="Btn_Reservar_Box" onClick={ () => navigate(`/reserva/${DadosAnuncio.id}`, {state: {SelectDataReserva, SelectQuantHoras, timeradioSelectDE, timeradioSelectSaida}})} style={{ pointerEvents: EstadoBtnReserva ? "auto" : "none", opacity: EstadoBtnReserva ? "100%" : "30%" }}>Reservar</button>
                    <div className="Box_Reserva_Content">

                        <p className="text_Box_Reserva_Content">Você ainda não será cobrado</p>

                        <div className="TabelaFinalPrice">
                            <div className="TabelaFinalPrice_Row">
                                <p>R${parseFloat(DadosAnuncio.preco_por_hora).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} x {SelectQuantHoras} horas</p>
                                <p>R${parseFloat(DadosAnuncio.preco_por_hora * SelectQuantHoras).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </div>
                            <div className="TabelaFinalPrice_Row">
                                <p>Taxa de serviço HelthSpace</p>
                                <p>R$ 0</p>
                            </div>
                        </div>

                        <hr className="linha02" />

                        <div className="Price_Total">
                            <p>Preço total</p>
                            <p>R${parseFloat(DadosAnuncio.preco_por_hora * SelectQuantHoras).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer02 />
        </>
    )
}

export default AnunciosPage
