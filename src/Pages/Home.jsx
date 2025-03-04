const Home = () => {
    return (
        <div style={styles.container}>
            <h1>Bem-vindo ao Nosso Sistema</h1>
            <p>Gerencie suas informações com facilidade e segurança.</p>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f4f4f4",
        color: "#333",
        fontFamily: "Arial, sans-serif",
    },
};

export default Home;
