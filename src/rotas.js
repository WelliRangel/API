const express = require("express");
const rotas = express();
const { validarSenhaGeralBanco, validarNovoCadastro, validarAtualizacaoConta, validarExclusaoConta, validarDeposito, validarSaque, validarTransferencia, validarExibiçãoSaldo, validarExibiçãoExtratos } = require('./intermediarios');
const { listarContas, cadastarNovoUsuario, atualizarUsuario, excluirUsuario, depositar, sacar, transferir, exibirSaldo, exibirExtratos } = require('./controladores/contas');

// GET /contas?senha_banco=Cubos123Bank
rotas.get('/contas', validarSenhaGeralBanco, listarContas)
// POST /contas
rotas.post('/contas', validarNovoCadastro, cadastarNovoUsuario)
// PUT /contas/:numeroConta/usuario
rotas.put('/contas/:numeroConta/usuario', validarAtualizacaoConta, atualizarUsuario)
// DELETE /contas/:numeroConta 
rotas.delete('/contas/:numeroConta', validarExclusaoConta, excluirUsuario)
// POST /transacoes/depositar
rotas.post('/transacoes/depositar', validarDeposito, depositar)
// POST /transacoes/sacar
rotas.post('/transacoes/sacar', validarSaque, sacar)
// POST /transacoes/transferir
rotas.post('/transacoes/transferir', validarTransferencia, transferir)
// GET /contas/saldo?numero_conta=123&senha=123
rotas.get('/contas/saldo', validarExibiçãoSaldo, exibirSaldo)
// GET /contas/extrato?numero_conta=123&senha=123
rotas.get('/contas/extrato', validarExibiçãoExtratos, exibirExtratos)


module.exports = rotas