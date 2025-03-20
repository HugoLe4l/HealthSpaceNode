import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import axios from "axios";
import "./home.css"

import Card01 from "../../components/Card 01/card01";

//Components
import Header01 from "../../components/Header01/header01"
import Footer02 from "../../components/Footer02/footer02";

function HomePage() {
    const dados = {
        nome: "Visitante",
        HCoins: 0
    }
    const navigate = useNavigate()
    const [InfosUser, setInfosUser] = useState(dados)
    const [StatusLogin, setStatusLogin] = useState(true)

    const [AnuncioHomeList, setAnuncioHomeList] = useState([])
    let localhostGuarda = "localhost:8081"

    useEffect(() => {
        const TokenStorage = localStorage.getItem("tokenJWT")
        if (TokenStorage) {
            axios.post('https://api-s-health-space.vercel.app/auth/authToken', { token: TokenStorage })
                .then(resposta => {

                    if (resposta.data['TokenValidade']) {
                        const id = resposta.data['tokenDados'].id
                        //console.log(id)
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

        axios.get("https://api-s-health-space.vercel.app/anuncio/listDisponivel")
            .then(resposta => {
                console.log(resposta.data['resultado'])
                setAnuncioHomeList(resposta.data['resultado'])
            })
    }, [])



    return (
        <>
            <Header01 InfosUser={InfosUser} StatusLogin={StatusLogin} />
            <main className="Page_Home_Main">

                <section className="Box_Cards_Home">
                    {
                        AnuncioHomeList.map((anuncio, index) => {
                            //console.log(anuncio)

                            return (
                                <Card01 key={index} anuncio={[anuncio]} />
                            )
                        })
                    }


                </section>

            </main>
            <Footer02 />

        </>
    )
}

export default HomePage
