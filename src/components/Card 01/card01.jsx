import "./card01.css"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

import Not_Image_Card from "../../../public/Assets/Imagens/Not_Image_Card.jpg"
function Card01( { anuncio }) {

    const RefBtnFavorito = useRef(null)
    const Navigate = useNavigate()
    //console.log(anuncio)
    return (
        <div className="Card_01" onClick={ () => Navigate(`/anuncios/${ anuncio[0].id}`)}>
            <div className="Card_01_Content">
                <div className="Card_01_Image" style={{backgroundImage : `url(${Not_Image_Card})`}}>

                </div>
                <hr />
                <div className="Card_01_Infos">
                    <h4 className="NomeAnuncioCard">{anuncio[0].nome}</h4>
                    <p>Anunciado por <strong className="Card_01_Link_Anunciante">{anuncio[0].nome_usuario}</strong></p>
                    <p className="Card_01_Rating"><i class="bi bi-star-fill">{anuncio[0].rating}</i></p>
                    <div className="Card_01_Loc">
                        <i class="bi bi-geo-alt-fill"></i>
                        <p>{anuncio[0].cidade}, {anuncio[0].bairro}</p>
                    </div>
                    <p>R$ { parseFloat(anuncio[0].preco_por_hora).toFixed(2).replace('.', ',')   }/h</p>
                </div>
                <i ref={RefBtnFavorito} class="btn_favorito bi bi-heart" onClick={() => { BtnFavoritoClickStyle()}}></i>
            </div>
        </div>
    )

    function BtnFavoritoClickStyle () {
        RefBtnFavorito.current.classList.toggle("bi-heart")
        RefBtnFavorito.current.classList.toggle("bi-heart-fill")
        RefBtnFavorito.current.style.color = "white"

        //Aqui depois vamos colocar para adicionar aos favoritos
    }
}

export default Card01