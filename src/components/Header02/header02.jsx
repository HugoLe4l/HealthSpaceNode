import { useRef, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import "./header02.css"
import Logo_HealthSpace from "../../../public/Assets/Interface/header-logo.png"
import Image1 from "../../../public/Assets/Interface/Image1.png"

import Avatar01 from "../../../public/Assets/Interface/Avatar01.jpg"
import Avatar02 from "../../../public/Assets/Interface/Avatar02.jpg"
import Coin_icon from "../../../public/Assets/Interface/Coins_icon.png"


import Tag01 from "../Tag01/tag01"
import Fisio_Icon_01_Black from "../../../public/Assets/Icons/Blacks/Fisio_Icon_01.png"
import Dentist_Icon_01 from "../../../public/Assets/Icons/Blacks/Dentist_Icon_01.png"
import Ofta_Icon_01 from "../../../public/Assets/Icons/Blacks/Ofta_Icon_01.png"



function Header02({ InfosUser, StatusLogin }) {
    const [NomeUser, setNomeUser] = useState("Visitante")
    const [CoinsUser, setCoinsUser] = useState(0)

    const RadioTagFisio = useRef(null)
    const RadioTagOdonto = useRef(null)
    const RadioTagOftalmo = useRef(null)

    const [TagSelect, setTagSelect] = useState("n")
    const [selectedTag, setSelectedTag] = useState(null);

    const [scrollPosition, setscrollPosition] = useState(0)
    const RefBoxSearch = useRef(null)
    const RefHeader02 = useRef(null)
    const RefTagBox = useRef(null)

    const Navigate = useNavigate()


    useEffect(() => {
        if (InfosUser) {
            setNomeUser(InfosUser.nome)
            setCoinsUser(InfosUser.HCoins)
        }
    }, [InfosUser])

    if (!InfosUser) {
        return null;
    }


    

    return (
        <header ref={RefHeader02} className="Header02">

            <div className="Box_Header02_Top">
                <img className="Header02_Logo" src={Logo_HealthSpace} alt="" onClick={() => Navigate("/")}/>

                <div className="Box_Header_Top_Right">

                    <p className="BHTR_Text01">Anuncie seu espaço no HealthSpace</p>

                    <i class="bi bi-globe"></i>

                    <p>Olá, {NomeUser}</p>

                    <div className="Coin_Box" style={{ display: StatusLogin ? "flex" : "none" }}>
                        <img className="Coin_Icon" src={Coin_icon} alt="" />
                        <p>{CoinsUser}</p>
                    </div>

                    <div className="Box_User_Header02">
                        <i id="icon1" className="bi bi-person-fill"></i>
                        <i id="icon2" className="bi bi-caret-down-fill"></i>

                        <div className="Box_User_Menu_Drop_Header02">

                            <div className="Box_User_Content">

                                <div className="Box_User_Content_Line1">
                                    <p>Encontre seu espaço <br />ideal no HealthSpace</p>
                                    <img src={Image1} alt="header_drop_image" />
                                </div>
                                <hr />

                                <div className="User_Drop_sub_menu" style={{ display: StatusLogin ? "none" : "flex" }}>
                                    <Link to={"/login"} className="User_Drop_sub_menu_link">
                                        <span>LOGIN</span>
                                        <span>&gt;</span>
                                    </Link>
                                    <Link to={"/cadastro"} className="User_Drop_sub_menu_link">
                                        <span>CADASTRE-SE</span>
                                        <span>&gt;</span>
                                    </Link>
                                    <div className="User_Drop_sub_menu_link">
                                        <span>Anuncie na HealthSpace</span>
                                        <span>&gt;</span>
                                    </div>
                                    <div className="User_Drop_sub_menu_link">
                                        <span>Quem somos?</span>
                                        <span>&gt;</span>
                                    </div>
                                </div>

                                <div className="User_Drop_sub_menu" style={{ display: StatusLogin ? "flex" : "none" }}>
                                    <div className="User_Drop_sub_menu_link">
                                        <span><i class="icon_Links_User_Droip bi bi-person-check-fill"></i> Perfil</span>
                                        <span>&gt;</span>
                                    </div>
                                    <div className="User_Drop_sub_menu_link">
                                        <span><i class="icon_Links_User_Droip bi bi-bookmark-fill"></i> Minhas reservas</span>
                                        <span>&gt;</span>
                                    </div>
                                    <div className="User_Drop_sub_menu_link">
                                        <span><i class="icon_Links_User_Droip bi bi-gear-fill"></i> Configurações</span>
                                        <span>&gt;</span>
                                    </div>
                                    <div className="User_Drop_sub_menu_link" onClick={DestroySession}>
                                        <span><i class="icon_Links_User_Droip bi bi-box-arrow-right"></i> Sair</span>
                                        <span>&gt;</span>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>

                </div>
            </div>


            <div ref={RefBoxSearch} className="Box_Search">
                <input className="Input_Search" type="text" />
                <div className="Box_Icon_Input_Search">
                    <i class="bi bi-search "></i>
                </div>
            </div>

            
        </header>
    )


    function DestroySession() {
        const UserJWT = localStorage.getItem("tokenJWT")
        if (UserJWT) {
            localStorage.removeItem("tokenJWT")
            window.location.reload()
        } else {
            console.log("Não existe nada no localStorage")
        }
    }
}

export default Header02