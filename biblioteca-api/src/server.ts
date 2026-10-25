
import express from "express";
import livrosRoutes from "./routes/livros.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.status(200).json({
    mensagem: "API Biblioteca funcionando!"
  });
});

// Rotas dos livros
app.use("/livros", livrosRoutes); //Essa linha informa ao Express que todas as rotas definidas em livrosRoutes serão prefixadas com /livros. Por exemplo, a rota para cadastrar um livro será /livros/, a rota para listar todos os livros será /livros/ e a rota para buscar um livro pelo ISBN será /livros/:isbn.

app.listen(PORT, () => {
  console.log(
    `Servidor rodando em http://localhost:${PORT}`
  );
});
