import { describe, expect, it, jest } from "@jest/globals";
import Pessoa from './Pessoa';
import Membro from './Membro';

describe("Quando criar um membro", () => {
    it("Deve criar um membro com os dados corretos", () => {
        //Cenário
        const membro: Membro = new Membro(
            'João Silva',
            'Rua Exemplo, 123',
            '53 999999999',
            '2023'
        );

        //Validação
        expect(membro.nome).toBe('João Silva');
        expect(membro.endereco).toBe('Rua Exemplo, 123');
        expect(membro.telefone).toBe('53 999999999');
        expect(membro.nrMatricula).toBe('2023');
        expect(membro.id).toBeNull();
    });

    it("Deve criar um membro com ID", () => {
        //Cenário e Execução
        const membroComId: Membro = new Membro(
            'Maria Santos',
            'Av. Principal, 456',
            '51 988888888',
            '2024',
            'mem123'
        );
        
        //Validação
        expect(membroComId.id).toBe('mem123');
        expect(membroComId.nome).toBe('Maria Santos');
    });

    it("Deve herdar propriedades de Pessoa", () => {
        //Cenário e Execução
        const membro: Membro = new Membro(
            'João Silva',
            'Rua Exemplo, 123',
            '53 999999999',
            '2023'
        );

        //Validação
        expect(membro).toBeInstanceOf(Membro);
        expect(membro).toBeInstanceOf(Pessoa);
    });

    it("Deve aceitar valores vazios nos campos", () => {
        //Cenário e Execução
        const membroVazio: Membro = new Membro('', '', '', '');
        
        //Validação
        expect(membroVazio.nome).toBe('');
        expect(membroVazio.endereco).toBe('');
        expect(membroVazio.telefone).toBe('');
        expect(membroVazio.nrMatricula).toBe('');
    });
});

describe("Quando usar getters", () => {
    it("Deve retornar o nome correto", () => {
        //Cenário
        const membro: Membro = new Membro(
            'João Silva',
            'Rua Exemplo, 123',
            '53 999999999',
            '2023'
        );

        //Validação
        expect(membro.nome).toBe('João Silva');
    });

    it("Deve retornar o endereço correto", () => {
        //Cenário
        const membro: Membro = new Membro(
            'João Silva',
            'Rua Exemplo, 123',
            '53 999999999',
            '2023'
        );

        //Validação
        expect(membro.endereco).toBe('Rua Exemplo, 123');
    });

    it("Deve retornar o telefone correto", () => {
        //Cenário
        const membro: Membro = new Membro(
            'João Silva',
            'Rua Exemplo, 123',
            '53 999999999',
            '2023'
        );

        //Validação
        expect(membro.telefone).toBe('53 999999999');
    });

    it("Deve retornar o número de matrícula correto", () => {
        //Cenário
        const membro: Membro = new Membro(
            'João Silva',
            'Rua Exemplo, 123',
            '53 999999999',
            '2023'
        );

        //Validação
        expect(membro.nrMatricula).toBe('2023');
    });
});

describe("Quando atualizar número de matrícula", () => {
    it("Deve atualizar o número de matrícula com sucesso", () => {
        //Cenário
        const membro: Membro = new Membro(
            'João Silva',
            'Rua Exemplo, 123',
            '53 999999999',
            '2023'
        );

        //Execução
        membro.nrMatricula = '2024';

        //Validação
        expect(membro.nrMatricula).toBe('2024');
    });

    it("Deve manter outros dados após atualizar matrícula", () => {
        //Cenário
        const membro: Membro = new Membro(
            'João Silva',
            'Rua Exemplo, 123',
            '53 999999999',
            '2023'
        );

        //Execução
        membro.nrMatricula = '2024';
        membro.nrMatricula = '2025';

        //Validação
        expect(membro.nrMatricula).toBe('2025');
        expect(membro.nome).toBe('João Silva');
        expect(membro.endereco).toBe('Rua Exemplo, 123');
        expect(membro.telefone).toBe('53 999999999');
    });
});

describe("Quando listar membro", () => {
    it("Deve exibir informações do membro com ID", () => {
        //Cenário
        const membro: Membro = new Membro(
            'João Silva',
            'Rua Exemplo, 123',
            '53 999999999',
            '2023'
        );
        membro.id = 'mem456';
        const consoleSpy = jest.spyOn(console, 'log');
        
        //Execução
        membro.listarMembro();
        
        //Validação
        expect(consoleSpy).toHaveBeenCalledWith(
            'ID:Membro: mem456 | Nome: João Silva | Endereço: Rua Exemplo, 123 | Telefone: 53 999999999 | Matrícula: 2023'
        );
        
        consoleSpy.mockRestore();
    });

    it("Deve exibir informações do membro sem ID", () => {
        //Cenário
        const membro: Membro = new Membro(
            'João Silva',
            'Rua Exemplo, 123',
            '53 999999999',
            '2023'
        );
        const consoleSpy = jest.spyOn(console, 'log');
        
        //Execução
        membro.listarMembro();
        
        //Validação
        expect(consoleSpy).toHaveBeenCalledWith(
            'ID:Membro: null | Nome: João Silva | Endereço: Rua Exemplo, 123 | Telefone: 53 999999999 | Matrícula: 2023'
        );
        
        consoleSpy.mockRestore();
    });
});
