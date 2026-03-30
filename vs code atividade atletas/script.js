let listaDeContas = JSON.parse(localStorage.getItem('minhasContas')) || [];
let listaDeAtletas = JSON.parse(localStorage.getItem('meusAtletas')) || [];

window.alternarTelas = function(tela) {
    const caixaLogin = document.getElementById('caixa-login');
    const caixaCadastro = document.getElementById('caixa-cadastro');

    if (!caixaLogin || !caixaCadastro) return;

    if (tela === 'cadastro') {
        caixaLogin.classList.add('hidden');
        caixaCadastro.classList.remove('hidden');
    } else {
        caixaCadastro.classList.add('hidden');
        caixaLogin.classList.remove('hidden');
    }
};

const formLogin = document.getElementById('form-login');
if (formLogin) {
    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();

        const emailDigitado = document.getElementById('login-email').value;
        const senhaDigitada = document.getElementById('login-senha').value;

        const contaValida = listaDeContas.find(conta => conta.email === emailDigitado && conta.senha === senhaDigitada);

        if (contaValida) {
            sessionStorage.setItem('usuarioLogado', 'true');
            window.location.href = "atletas.html"; 
        } else {
            alert("E-mail ou senha incorretos!");
        }
    });
}

const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault();

        const inputSenha = document.getElementById('cad-senha');
        const erroSenha = document.getElementById('erro-senha');

        if (inputSenha.value.length < 6) {
            erroSenha.classList.remove('hidden');
            return;
        }

        const emailDigitado = document.getElementById('cad-email').value;
        const emailExiste = listaDeContas.find(conta => conta.email === emailDigitado);
        
        if (emailExiste) {
            alert("E-mail já cadastrado!");
            return;
        }

        listaDeContas.push({
            nome: document.getElementById('cad-nome').value,
            email: emailDigitado,
            senha: inputSenha.value
        });

        localStorage.setItem('minhasContas', JSON.stringify(listaDeContas));

        alert("Conta salva! Faça o login agora.");
        formCadastro.reset();
        alternarTelas('login');
    });
}

const formAtleta = document.getElementById('form-atleta');
const caixaAtletas = document.getElementById('caixa-atletas');

if (formAtleta) {
    if (sessionStorage.getItem('usuarioLogado') !== 'true') {
        window.location.href = "index.html";
    }

    atualizarListaAtletas();

    formAtleta.addEventListener('submit', function(event) {
        event.preventDefault();

        const cpfDigitado = document.getElementById('atleta-cpf').value;
        
        const cpfExiste = listaDeAtletas.find(atleta => atleta.cpf === cpfDigitado);
        if (cpfExiste) {
            alert("Este CPF já foi cadastrado para outro atleta!");
            return;
        }

        listaDeAtletas.push({
            nome: document.getElementById('atleta-nome').value,
            cpf: cpfDigitado,
            modalidade: document.getElementById('atleta-modalidade').value,
            categoria: document.getElementById('atleta-categoria').value,
            genero: document.getElementById('atleta-genero').value,
            peso: document.getElementById('atleta-peso').value,
            altura: document.getElementById('atleta-altura').value
        });

        localStorage.setItem('meusAtletas', JSON.stringify(listaDeAtletas));

        formAtleta.reset();
        atualizarListaAtletas();
        alert("Atleta inscrito!");
    });
}

function atualizarListaAtletas() {
    if (!caixaAtletas) return;

    caixaAtletas.innerHTML = "";

    if (listaDeAtletas.length === 0) {
        caixaAtletas.innerHTML = "<p style='text-align: center; color: #666;'>Nenhum atleta cadastrado.</p>";
        return;
    }

    listaDeAtletas.forEach((atleta, index) => {
        const card = document.createElement('div');
        card.classList.add('user-item');

        card.innerHTML = `
            <div>
                <h3>${atleta.nome}</h3>
                <p>🪪 CPF: ${atleta.cpf}</p>
                <p>🏅 Modalidade: ${atleta.modalidade} | Categoria: ${atleta.categoria}</p>
                <p>⚖️ Peso: ${atleta.peso}kg | 📏 Altura: ${atleta.altura}m | 👤 Gênero: ${atleta.genero}</p>
            </div>
            <button class="btn-delete" onclick="removerAtleta(${index})">X</button>
        `;

        caixaAtletas.appendChild(card);
    });
}

window.removerAtleta = function(index) {
    listaDeAtletas.splice(index, 1);
    localStorage.setItem('meusAtletas', JSON.stringify(listaDeAtletas));
    atualizarListaAtletas();
};


const btnDeslogar = document.getElementById('btn-deslogar');
if (btnDeslogar) {
    btnDeslogar.addEventListener('click', function() {
        sessionStorage.removeItem('usuarioLogado');
        window.location.href = "index.html";
    });
}