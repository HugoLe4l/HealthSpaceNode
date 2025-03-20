import "./footer02.css"

function Footer02() {
    return (
        <footer className="Footer02_AuthPage">
            <div className="Footer02_Left">
                <p>©2025 HealthSpace, Inc. Todos os direitos reservados.</p>
                <p>-</p>
                <div className="Footer02links">
                    <p className="undeline">Termos de uso</p>
                    <p>-</p>
                    <p className="undeline">Política de Privacidade</p>
                </div>
            </div>

            <div className="Footer02_Right_icons">
            <p className="TextDev">Desenvolvido por <a target="black" href="https://github.com/HugoLe4l">Hugo Leal</a></p>

                <i class="bi bi-facebook"></i>
                <i class="bi bi-instagram"></i>
                <i class="bi bi-whatsapp"></i>
            </div>
        </footer>
    )
}

export default Footer02