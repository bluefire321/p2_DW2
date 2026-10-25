
import { Request, Response } from "express";
import { Livro } from "../models/livro";

// Armazenamento temporário dos livros
const livros: Livro[] = [];

// Cadastrar um livro
export function cadastrarLivro(req: Request, res: Response) {
  const dados = req.body as Partial<Livro>;

  const camposObrigatorios = [
    "titulo",
    "autor",
    "editora",
    "genero",
    "isbn"
  ] as const;

  for (const campo of camposObrigatorios) {
    if (
      typeof dados[campo] !== "string" ||
      dados[campo].trim() === ""
    ) {
      return res.status(400).json({
        erro: `O campo ${campo} é obrigatório`
      });
    }
  }

  if (
    typeof dados.anoEdicao !== "number" ||
    !Number.isFinite(dados.anoEdicao)
  ) {
    return res.status(400).json({
      erro: "O campo anoEdicao deve ser numérico"
    });
  }

  const isbn = dados.isbn!.trim();

  const isbnExistente = livros.some(
    (livro) => livro.isbn === isbn
  );

  if (isbnExistente) {
    return res.status(400).json({
      erro: "Já existe um livro cadastrado com esse ISBN"
    });
  }

  const novoLivro: Livro = {
    titulo: dados.titulo!.trim(),
    autor: dados.autor!.trim(),
    editora: dados.editora!.trim(),
    anoEdicao: dados.anoEdicao,
    genero: dados.genero!.trim(),
    isbn
  };

  livros.push(novoLivro);

  return res.status(201).json(novoLivro);
}

// Consultar todos os livros
export function listarLivros(req: Request, res: Response) {
  return res.status(200).json(livros);
}

// Consultar um livro pelo ISBN
export function buscarLivroPorIsbn(
  req: Request,
  res: Response
) {
  const isbn = req.params.isbn;

  const livro = livros.find(
    (livro) => livro.isbn === isbn
  );

  if (!livro) {
    return res.status(404).json({
      erro: "Livro não encontrado"
    });
  }

  return res.status(200).json(livro);
}
