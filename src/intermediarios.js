const bancodedados = require('./bancodedados')
const { contas } = bancodedados

const validarSenhaGeralBanco = (req, res, next) => {
    const { senha } = bancodedados.banco
    const { senha_banco } = req.query;
    if (!senha_banco) {

        return res.status(400).json({ "mensagem": 'Senha não informada' });
    } else if (senha_banco !== senha) {

        return res.status(401).json({ "mensagem": "A senha do banco informada é inválida!" });
    }
    next();
}
const validarNovoCadastro = (req, res, next) => {
    const { cpf, email } = req.body;
    const camposObrigatorios = ["nome", "cpf", "data_nascimento", "telefone", "email", "senha"];


    for (const campo of camposObrigatorios) {
        if (!req.body[campo]) {
            return res.status(400).json({ mensagem: `É obrigatorio preencher o campo ${campo}` });
        }
    }
    for (const conta of contas) {
        if (conta.usuario.cpf === cpf || conta.usuario.email === email) {
            return res.status(400).json({ "mensagem": "Já existe uma conta com o cpf ou e-mail informado!" })
        }
    }
    next()
}
const validarAtualizacaoConta = (req, res, next) => {
    const { numeroConta } = req.params
    const { cpf, email } = req.body;
    const camposObrigatorios = ["nome", "cpf", "data_nascimento", "telefone", "email", "senha"];
    const contaNoBancoDados = contas.find((conta) => {
        return conta.numero === numeroConta
    })
    if (contaNoBancoDados) {
        for (const campo of camposObrigatorios) {
            if (!req.body[campo]) {
                return res.status(400).json({ mensagem: `É obrigatorio preencher o campo ${campo}` });
            }
        }
        for (const conta of contas) {
            if (conta.usuario.cpf === cpf || conta.usuario.email === email) {
                return res.status(400).json({ "mensagem": "Já existe uma conta com o cpf ou e-mail informado!" })
            }
        }
    } else {
        return res.status(400).json({ "mensagem": "Nenhuma conta foi encontada" })
    }

    next()
}
const validarExclusaoConta = (req, res, next) => {
    const { numeroConta } = req.params
    const contaNoBancoDados = contas.find((conta) => {
        return conta.numero === numeroConta
    })

    if (contaNoBancoDados === undefined) {
        return res.status(400).json({ "mensagem": "Nenhuma conta foi encontada" });
    } else if (contaNoBancoDados.saldo !== 0) {
        return res.status(403).json({ "mensagem": "O saldo da conta precisa ser 0 (Zero)" });
    }
    next();
}
const validarDeposito = async (req, res, next) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({
            mensagem: "O número da conta e o valor são obrigatórios!",
        });
    }
    const conta = contas.find((conta) => conta.numero === numero_conta);

    if (!conta) {
        return res.status(404).json({
            mensagem: "Conta bancária não encontrada!",
        });
    }


    if (valor <= 0) {
        return res.status(400).json({
            mensagem: "O valor do depósito deve ser maior que zero!",
        });
    }
    next();
}
const validarSaque = async (req, res, next) => {
    const { numero_conta, valor, senha } = req.body;


    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({
            mensagem: "O número da conta, o valor do saque e a senha são obrigatórios!",
        });
    }

    const conta = contas.find((conta) => conta.numero === numero_conta);
    if (!conta) {
        return res.status(404).json({
            mensagem: "Conta bancária não encontrada!",
        });
    }
    if (conta.usuario.senha !== senha) {
        return res.status(401).json({
            mensagem: "Senha incorreta!",
        });
    }
    if (valor > conta.saldo) {
        return res.status(402).json({
            mensagem: "Saldo insuficiente!",
        });
    }
    next();
}
const validarTransferencia = async (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({
            mensagem: "O número da conta de origem, de destino, senha e valor da transferência são obrigatórios!",
        });
    }
    const contaOrigem = contas.find((conta) => conta.numero === numero_conta_origem);
    if (!contaOrigem) {
        return res.status(404).json({
            mensagem: "Conta bancária de origem não encontrada!",
        });
    }

    const contaDestino = contas.find((conta) => conta.numero === numero_conta_destino);
    if (!contaDestino) {
        return res.status(404).json({
            mensagem: "Conta bancária de destino não encontrada!",
        });
    }
    if (contaOrigem.usuario.senha !== senha) {
        return res.status(401).json({
            mensagem: "Senha incorreta!",
        });
    }

    if (valor > contaOrigem.saldo) {
        return res.status(402).json({
            mensagem: "Saldo insuficiente!",
        });
    }
    next();
}
const validarExibiçãoSaldo = async (req, res, next) => {
    const { numero_conta, senha } = req.query;
    if (!numero_conta || !senha) {
        return res.status(400).json({
            mensagem: "O número da conta e a senha são obrigatórios!",
        });
    }
    const conta = contas.find((conta) => conta.numero === numero_conta);
    if (!conta) {
        return res.status(404).json({
            mensagem: "Conta bancária não encontrada!",
        });
    }
    if (conta.usuario.senha !== senha) {
        return res.status(401).json({
            mensagem: "Senha incorreta!",
        });
    }
    next();
}
const validarExibiçãoExtratos = async (req, res, next) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({
            mensagem: "O número da conta e a senha são obrigatórios!",
        });
    }
    const conta = contas.find((conta) => conta.numero === numero_conta);
    if (!conta) {
        return res.status(404).json({
            mensagem: "Conta bancária não encontrada!",
        });
    }
    if (conta.usuario.senha !== senha) {
        return res.status(401).json({
            mensagem: "Senha incorreta!",
        });
    }
    next();
}

module.exports = {
    validarSenhaGeralBanco,
    validarNovoCadastro,
    validarAtualizacaoConta,
    validarExclusaoConta,
    validarDeposito,
    validarSaque,
    validarTransferencia,
    validarExibiçãoSaldo,
    validarExibiçãoExtratos

}