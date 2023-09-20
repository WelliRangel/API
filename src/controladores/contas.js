const bancodedados = require('../bancodedados')
let { contas, depositos, saques, transferencias } = bancodedados

const listarContas = (req, res) => {
    return res.status(200).json(contas);
}
const cadastarNovoUsuario = (req, res) => {
    let numeroDaConta = contas.length
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const usuario = {
        "numero": `${++numeroDaConta}`,
        "saldo": 0,
        "usuario": {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }
    contas.push(usuario)
    return res.status(201).json()
}
const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    let contaNoBancoDados = contas.find((conta) => {
        return conta.numero === numeroConta
    })
    let { usuario } = contaNoBancoDados

    usuario.nome = nome;
    usuario.cpf = cpf;
    usuario.data_nascimento = data_nascimento;
    usuario.telefone = telefone;
    usuario.email = email;
    usuario.senha = senha;


    return res.status(204).json();

}
const excluirUsuario = (req, res) => {
    const { numeroConta } = req.params
    contas = contas.filter((conta) => {
        return conta.numero !== numeroConta
    })
    return res.status(200).json();
}
const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;
    const contaDestino = contas.find((conta) => conta.numero === numero_conta);
    contaDestino.saldo += Number(valor);

    const transacao = {
        data: new Date().toISOString(),
        numero_conta,
        valor,
    };
    depositos.push(transacao);

    return res.status(204).json();
}
const sacar = (req, res) => {
    const { numero_conta, valor } = req.body;
    const conta = contas.find((conta) => conta.numero === numero_conta);
    conta.saldo -= valor;

    const transacao = {
        data: new Date().toISOString(),
        numero_conta,
        valor,
    };
    saques.push(transacao);

    // Retorna uma resposta vazia
    return res.status(204).json();
}
const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    const contaOrigem = contas.find((conta) => conta.numero === numero_conta_origem);
    const contaDestino = contas.find((conta) => conta.numero === numero_conta_destino);

    contaOrigem.saldo -= Number(valor);
    contaDestino.saldo += Number(valor);
    const transacao = {
        data: new Date().toISOString(),
        numero_conta_origem,
        numero_conta_destino,
        valor,
    };
    transferencias.push(transacao);
    return res.status(204).json();
}
const exibirSaldo = (req, res) => {
    const { numero_conta } = req.query;
    const conta = contas.find((conta) => conta.numero === numero_conta);
    const saldoDaConta = conta.saldo;
    return res.status(200).json({
        saldo: saldoDaConta,
    });
}
const exibirExtratos = (req, res) => {
}






module.exports = {
    listarContas,
    cadastarNovoUsuario,
    atualizarUsuario,
    excluirUsuario,
    depositar,
    sacar,
    transferir,
    exibirSaldo,
    exibirExtratos
}
