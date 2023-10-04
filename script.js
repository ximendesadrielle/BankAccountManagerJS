class ContaBancaria {
    constructor(agencia, numero, tipo, saldo) {
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this._saldo = saldo;
    }

    get saldo() {
        return this._saldo;
    }

    set saldo(valor) {
        this._saldo = valor;
    }

    sacar(valor) {
        if (this._saldo >= valor) {
            this._saldo -= valor;
            return true;
        }
        return false;
    }

    depositar(valor) {
        this._saldo += valor;
    }
}

class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, saldo, cartaoCredito) {
        super(agencia, numero, "Conta Corrente", saldo);
        this._cartaoCredito = cartaoCredito;
    }

    get cartaoCredito() {
        return this._cartaoCredito;
    }

    set cartaoCredito(valor) {
        this._cartaoCredito = valor;
    }
}

class ContaPoupanca extends ContaBancaria {}

class ContaUniversitaria extends ContaBancaria {
    sacar(valor) {
        if (valor > 500) {
            return false;
        }
        return super.sacar(valor);
    }
}

let listaContas = [];

function checkTipo() {
    let tipo = document.getElementById('tipo').value;
    let cartaoCredito = document.getElementById('cartaoCredito');
    if (tipo === 'ContaCorrente') {
        cartaoCredito.style.display = 'inline';
    } else {
        cartaoCredito.style.display = 'none';
    }
}

function inserirConta() {
    const agencia = document.getElementById('agencia').value;
    const numero = document.getElementById('numero').value;
    const tipo = document.getElementById('tipo').value;
    const saldo = parseFloat(document.getElementById('saldo').value);
    const cartaoCredito = document.getElementById('cartaoCredito').checked;

    let conta;

    switch (tipo) {
        case "ContaCorrente":
            conta = new ContaCorrente(agencia, numero, saldo, cartaoCredito);
            break;
        case "ContaPoupanca":
            conta = new ContaPoupanca(agencia, numero, "Conta Poupança", saldo);
            break;
        case "ContaUniversitaria":
            conta = new ContaUniversitaria(agencia, numero, "Conta Universitária", saldo);
            break;
        default:
            conta = new ContaBancaria(agencia, numero, tipo, saldo);
    }

    listaContas.push(conta);
}

function visualizarContas() {
    let detalhesConta = document.getElementById('detalhesConta');
    let tituloLista = document.getElementById('tituloLista');
    let ul = document.getElementById('listaContas');

    detalhesConta.style.display = 'none';

    tituloLista.style.display = 'block';
    ul.style.display = 'block';
    ul.innerHTML = '';

    listaContas.forEach(conta => {
        let li = document.createElement('li');
        li.innerHTML = `${conta.tipo} - Agência: ${conta.agencia}, Número: ${conta.numero}, Saldo: ${conta.saldo}`;
        ul.appendChild(li);
    });
    let btnVoltar = document.getElementById('btnVoltar');
    btnVoltar.style.display = 'block'; // Mostra o botão "Voltar"
}

function deletarConta() {
    let numero = prompt("Digite o número da conta a ser deletada:");
    listaContas = listaContas.filter(conta => conta.numero !== numero);
    visualizarContas();
}

function voltarParaDetalhes() {
    let detalhesConta = document.getElementById('detalhesConta');
    let tituloLista = document.getElementById('tituloLista');
    let ul = document.getElementById('listaContas');
    let btnVoltar = document.getElementById('btnVoltar');

    // Mostra a seção de detalhes da conta
    detalhesConta.style.display = 'block';

    // Esconde o título "Lista de contas", a lista em si e o botão "Voltar"
    tituloLista.style.display = 'none';
    ul.style.display = 'none';
    btnVoltar.style.display = 'none';
}
