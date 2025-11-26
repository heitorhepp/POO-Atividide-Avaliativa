import Livro from "./src/Class/Livro";
import Membro from "./src/Class/Membro";
import Emprestimo from "./src/Class/Emprestimo";
import GerenciamentoLivro from "./src/Gerenciamento/GerenciamentoLivro";
import GerenciamentoMembro from "./src/Gerenciamento/GerenciamentoMembro";
import GerenciamentoEmprestimo from "./src/Gerenciamento/GerenciamentoEmprestimo";
import Prompt from "prompt-sync";

const teclado = Prompt();

const gerenciamentoMembro = new GerenciamentoMembro();

async function listarMembros() {
    let membros = await gerenciamentoMembro.listarMembros();
    console.log("\nLista de Membros:");
    membros.forEach((membro: Membro) => {
        membro.listarMembro();
    });
}

async function atualizarMembro() {
    console.log("\n --- Atualizar Membro --- ");
    const id = teclado("Digite o ID do membro a ser atualizado: ");

    const membros = await gerenciamentoMembro.listarMembros();
    const membroExistente = membros.find((m: Membro) => m.id === id);

    if (!membroExistente) {
        console.log("\nMembro não encontrado!");
        return;
    }

    const nome = teclado("Novo nome (Enter para manter): ");
    const endereco = teclado("Novo endereço (Enter para manter): ");
    const telefone = teclado("Novo telefone (Enter para manter): ");
    const nrMatricula = teclado("Novo número de matrícula (Enter para manter): ");

    const dadosAtt = {
        nome: nome.trim() || membroExistente.nome,
        endereco: endereco.trim() || membroExistente.endereco,
        telefone: telefone.trim() || membroExistente.telefone,
        nrMatricula: nrMatricula.trim() || membroExistente.nrMatricula
    };

    await gerenciamentoMembro.atualizarMembro(id, dadosAtt);
    console.log("\nAtualização de membro concluída.");


}

async function deletarMembro() {
    console.log("\n --- Deletar Membro --- ");
    const id = teclado("Digite o ID do membro a ser deletado: ");

    if (!id.trim()) {
        console.log("\nErro: ID do membro é obrigatório!");
        return;
    }

    await gerenciamentoMembro.deletarMembro(id);
    console.log("\nMembro deletado com sucesso.");
}

async function adicionarMembro() {
    console.log("\n --- Adicionar Membro --- ");
    const nome = teclado("Nome: ");
    const endereco = teclado("Endereço: ");
    const telefone = teclado("Telefone (Formato: 53 999999999): ");
    const nrMatricula = teclado("Número de matrícula (4 dígitos): ");

    if (!nome.trim() || !endereco.trim() || !telefone.trim() || !nrMatricula.trim()) {
        console.log("\nErro: Todos os campos são obrigatórios!");
        return;
    }

    if (!telefone.includes(' ')) {
        console.log("\nErro: Telefone deve conter um espaço no formato 53 999999999!");
        return;
    }

    const partes = telefone.split(' ');
    if (partes.length !== 2) {
        console.log("\nErro: Telefone deve ter apenas um espaço no formato 53 999999999!");
        return;
    }

    const dddValido = partes[0]!.length === 2;
    const numeroValido = partes[1]!.length === 9;

    if (!dddValido || !numeroValido) {
        console.log("\nErro: Telefone deve estar no formato 53 999999999 (2 dígitos - espaço - 9 dígitos)!");
        return;
    }

    // Validação de matrícula: deve ter exatamente 4 dígitos numéricos
    if (nrMatricula.trim().length !== 4) {
        console.log("\nErro: Número de matrícula deve ter exatamente 4 dígitos!");
        return;
    }

    // Verifica se todos os caracteres são números
    for (let i = 0; i < nrMatricula.trim().length; i++) {
        const caractere = nrMatricula.trim()[i]!;
        if (caractere < '0' || caractere > '9') {
            console.log("\nErro: Número de matrícula deve conter apenas números!");
            return;
        }
    }

    const novoMembro = new Membro(nome.trim(), endereco.trim(), telefone.trim(), nrMatricula.trim());
    const membroAdicionado = await gerenciamentoMembro.adicionarMembro(novoMembro);
    console.log("\nMembro adicionado com ID:", membroAdicionado.id);
}

const gerenciamentoLivro = new GerenciamentoLivro();

async function adicionarLivro() {
    console.log("\n --- Adicionar Livro --- ");
    const titulo = teclado("Título: ");
    const autor = teclado("Autor: ");
    const isbn = teclado("ISBN: ");
    const anoPublicacao = teclado("Ano de Publicação: ");
    const statusDisponivel = teclado("O livro está disponível? (s/n): ");

    if (!titulo.trim() || !autor.trim() || !isbn.trim() || !anoPublicacao.trim() || !statusDisponivel.trim()) {
        console.log("\nErro: Todos os campos são obrigatórios!");
        return;
    }

    const novoLivro = new Livro(titulo.trim(), autor.trim(), isbn.trim(), parseInt(anoPublicacao), statusDisponivel.trim().toLowerCase() === 's');
    const livroAdicionado = await gerenciamentoLivro.adicionarLivro(novoLivro);
    console.log("\nLivro adicionado com ID:", livroAdicionado.id);
}

async function listarLivros() {
    let livros = await gerenciamentoLivro.listarLivros();
    livros.forEach((livro: Livro) => {
        livro.listarLivro();
    });
}

async function deletarLivro() {
    console.log("\n --- Deletar Livro --- ");
    const id = teclado("Digite o ID do livro a ser deletado: ");

    if (!id.trim()) {
        console.log("\nErro: ID do livro é obrigatório!");
        return;
    }

    await gerenciamentoLivro.deletarLivro(id);
    console.log("\nLivro deletado com sucesso.");
}

async function atualizarLivro() {
    console.log("\n --- Atualizar Livro --- ");
    const id = teclado("Digite o ID do livro a ser atualizado: ");

    const livros = await gerenciamentoLivro.listarLivros();
    const livroExistente = livros.find((l: Livro) => l.id === id);

    if (!livroExistente) {
        console.log("\nLivro não encontrado!");
        return;
    }

    const titulo = teclado("Novo título (Enter para manter): ");
    const autor = teclado("Novo autor (Enter para manter): ");
    const isbn = teclado("Novo ISBN (Enter para manter): ");
    const anoPublicacao = teclado("Novo ano de publicação (Enter para manter): ");
    const statusDisponivel = teclado("O livro está disponível (Enter para manter)? (s/n): ");

    const dadosAtt = {
        titulo: titulo.trim() || livroExistente.titulo,
        autor: autor.trim() || livroExistente.autor,
        isbn: isbn.trim() || livroExistente.isbn,
        anoPublicacao: parseInt(anoPublicacao) || livroExistente.anoPublicacao,
        disponivel: statusDisponivel.trim().toLowerCase() === 's'
    };

    await gerenciamentoLivro.atualizarLivro(id, dadosAtt);
    console.log("\nAtualização de livro concluída.");
}

const gerenciamentoEmprestimo = new GerenciamentoEmprestimo();

function converterData(dataStr: string): Date {
    const partes = dataStr.split('-');
    const dia = parseInt(partes[0]!);
    const mes = parseInt(partes[1]!) - 1;
    const ano = parseInt(partes[2]!);
    return new Date(ano, mes, dia);
}

async function adicionarEmprestimo() {
    console.log("\n --- Adicionar Empréstimo --- ");
    const idLivro = teclado("ID do Livro: ");
    const idMembro = teclado("ID do Membro: ");
    const dataEmprestimo = teclado("Data de Empréstimo (dd-mm-aaaa): ");
    const dataDevolucao = teclado("Data de Devolução (dd-mm-aaaa ou Enter para null): ");

    if (!idLivro.trim() || !idMembro.trim() || !dataEmprestimo.trim()) {
        console.log("\nErro: ID do Livro, ID do Membro e Data de Empréstimo são obrigatórios!");
        return;
    }

    const novoEmprestimo = new Emprestimo(
        idLivro.trim(),
        idMembro.trim(),
        converterData(dataEmprestimo.trim()),
        dataDevolucao.trim() ? converterData(dataDevolucao.trim()) : null
    );

    const emprestimoAdicionado = await gerenciamentoEmprestimo.adicionarEmprestimo(novoEmprestimo);
    console.log("Empréstimo adicionado com ID:", emprestimoAdicionado.id);
}

async function listarEmprestimos() {
    let emprestimos = await gerenciamentoEmprestimo.listarEmprestimos();
    emprestimos.forEach((emprestimo: Emprestimo) => {
        emprestimo.listarEmprestimo();
    });
}

async function deletarEmprestimo() {
    console.log("--- Deletar Empréstimo --- ");
    const id = teclado("Digite o ID do empréstimo a ser deletado: ");

    if (!id.trim()) {
        console.log("\nErro: ID do empréstimo é obrigatório!");
        return;
    }

    await gerenciamentoEmprestimo.deletarEmprestimo(id);
    console.log("\nEmpréstimo deletado com sucesso.");
}

async function atualizarEmprestimo() {
    console.log("\n --- Atualizar Empréstimo --- ");
    const id = teclado("Digite o ID do empréstimo a ser atualizado: ");

    const emprestimo = await gerenciamentoEmprestimo.buscarEmprestimoPorId(id);
    if (!emprestimo) {
        console.log("Empréstimo não encontrado.");
        return;
    }

    const dataDevolucao = teclado("Nova Data de Devolução (dd-mm-aa ou Enter para null): ");
    const dadosAtt = {
        dataDevolucao: dataDevolucao.trim() ? new Date(dataDevolucao.trim()) : null
    };

    await gerenciamentoEmprestimo.atualizarEmprestimo(id, dadosAtt);
    console.log("Atualização de empréstimo concluída.");
}

async function listarEmprestimosAtivos() {
    let emprestimos = await gerenciamentoEmprestimo.listarEmprestimos();
    const emprestimosAtivos = emprestimos.filter((e: Emprestimo) => !e.dataDevolucao || e.dataDevolucao === null);
    console.log("\n=== Lista de Empréstimos Ativos ===");
    if (emprestimosAtivos.length === 0) {
        console.log("Nenhum empréstimo ativo encontrado.");
    } else {
        emprestimosAtivos.forEach((emprestimo: Emprestimo) => {
            emprestimo.listarEmprestimo();
        });
    }
}

async function menu() {
    while (true) {
        console.log('\n===========================================');
        console.log('   SISTEMA DE GERENCIAMENTO DE BIBLIOTECA   ');
        console.log('===========================================');
        console.log("1. Gerenciar Membros");
        console.log("2. Gerenciar Livros");
        console.log("3. Gerenciar Empréstimos");
        console.log("0. Sair");
        console.log('===========================================');

        const escolha = teclado("Escolha uma opção: ");
        if (escolha === "0") {
            console.log("\nSaindo do sistema. Até logo!");
            break;
        }

        switch (escolha) {
            case "1":
                await menuMembros();
                break;
            case "2":
                await menuLivros();
                break;
            case "3":
                await menuEmprestimos();
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}

async function menuMembros() {
    while (true) {
        console.log('\n===========================================');
        console.log("   GERENCIAMENTO DE MEMBROS   ");
        console.log('===========================================');
        console.log("1. Listar Membros");
        console.log("2. Adicionar Membro");
        console.log("3. Atualizar Membro");
        console.log("4. Deletar Membro");
        console.log("0. Voltar ao Menu Principal");
        console.log('===========================================');
        const escolha = teclado("Escolha uma opção: ");
        if (escolha === "0") {
            break;
        }
        switch (escolha) {
            case "1":
                await listarMembros();
                break;
            case "2":
                await adicionarMembro();
                break;
            case "3":
                await atualizarMembro();
                break;
            case "4":
                await deletarMembro();
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}

async function menuLivros() {
    while (true) {
        console.log('\n===========================================');
        console.log("   GERENCIAMENTO DE LIVROS   ");
        console.log('===========================================');
        console.log("1. Listar Livros");
        console.log("2. Adicionar Livro");
        console.log("3. Atualizar Livro");
        console.log("4. Deletar Livro");
        console.log("0. Voltar ao Menu Principal");
        console.log('===========================================');
        const escolha = teclado("Escolha uma opção: ");
        if (escolha === "0") {
            break;
        }
        switch (escolha) {
            case "1":
                await listarLivros();
                break;
            case "2":
                await adicionarLivro();
                break;
            case "3":
                await atualizarLivro();
                break;
            case "4":
                await deletarLivro();
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}

async function menuEmprestimos() {
    while (true) {
        console.log('\n===========================================');
        console.log("   GERENCIAMENTO DE EMPRÉSTIMOS   ");
        console.log('===========================================');
        console.log("1. Listar Empréstimos");
        console.log("2. Adicionar Empréstimo");
        console.log("3. Atualizar Empréstimo");
        console.log("4. Deletar Empréstimo");
        console.log("5. Listar Empréstimos Ativos");
        console.log("0. Voltar ao Menu Principal");
        console.log('===========================================');
        const escolha = teclado("Escolha uma opção: ");
        if (escolha === "0") {
            break;
        }
        switch (escolha) {
            case "1":
                await listarEmprestimos();
                break;
            case "2":
                await adicionarEmprestimo();
                break;
            case "3":
                await atualizarEmprestimo();
                break;
            case "4":
                await deletarEmprestimo();
                break;
            case "5":
                await listarEmprestimosAtivos();
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}

menu();

