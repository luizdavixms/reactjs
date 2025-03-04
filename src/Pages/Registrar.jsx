import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o useNavigate
import "./Login.css";

const Registrar = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook para redirecionamento

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                email: password, // Ajuste se necessário
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Usuário criado:', data);
            alert("Cadastro realizado com sucesso!");
            navigate("/"); 
        })
        .catch((error) => {
            console.error('Erro ao criar usuário:', error);
            alert("Erro ao cadastrar. Tente novamente.");
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>CADASTRO</h1>
                <div>
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <FaUser className="icon" />
                </div>
                <div>
                    <input 
                        type="password" 
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <FaLock className="icon" />
                </div>

                <div className="recall-forget">
                    <label>
                        <input type="checkbox" />
                        Manter Conectado
                    </label>
                </div>

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Registrar;
