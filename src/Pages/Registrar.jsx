import {FaUser, FaLock} from "react-icons/fa"
import { useState } from "react"
import "./Login.css"


const Registrar = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch('http://localhost:3000/users', {
            method: 'POST', // Tipo de requisição (POST)
            headers: {
              'Content-Type': 'application/json', // Definindo o tipo de conteúdo como JSON
            },
            body: JSON.stringify({
              name: username, // Passando o nome do usuário
              email: password, // Aqui, usei a senha como email, mas ajuste conforme sua necessidade
            }),
          })
            .then((response) => response.json()) // Converte a resposta para JSON
            .then((data) => {
              console.log('Usuário criado:', data); // Exibe a resposta da criação
            })
            .catch((error) => {
              console.error('Erro ao criar usuário:', error); // Captura erros de rede
            });
    }

    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>CADASTRO</h1>
                <div>
                    <input type="email" placeholder="E-mail" 
                    onChange={ (e) => setUsername(e.target.value) } />
                    <FaUser className="icon" />
                </div>
                <div>
                    <input type="password" placeholder="Senha"
                    onChange={ (e) => setPassword(e.target.value) } />
                    <FaLock className="icon" />
                </div>

                <div className="recall-forget">
                    <label>
                        <input type="checkbox" />
                        Manter Conectado
                    </label>
                </div>

                <button>Entrar</button>
            </form>
        </div>
    )
}

export default Registrar