
import { Router } from "express";

import {
  cadastrarLivro,
  listarLivros,
  buscarLivroPorIsbn
} from "../controllers/livros.controllers";

const router = Router();

router.post("/", cadastrarLivro); //tem função de cadastrar livros
router.get("/", listarLivros); //tem função de listar todos os livros
router.get("/:isbn", buscarLivroPorIsbn); // tem função de buscar um livro pelo ISBN

export default router;
