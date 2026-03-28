let listaDeUsuarios = [];

const telaCadastro = document.getElementById('tela-cadastro');
const formCadastro = document.getElementById('form-cadastro');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');
const erroSenha = document.getElementById('erro-senha');

const telaLista = document.getElementById('tela-lista');
const caixaUsuarios = document.getElementById('caixa-usuarios');

const btnIrLista = document.getElementById('btn-ir-lista');
const btnVoltar = document.getElementById('btn-voltar');



function atualizarListaTela() {
    caixaUsuarios.innerHTML = ""; 

    if (listaDeUsuarios.length === 0) {
        caixaUsuarios.innerHTML = "<p style='text-align: center; color: #666;'>Nenhum usuário cadastrado.</p>";
        return;
    }

    
    listaDeUsuarios.forEach((usuario, index) => {
        const card = document.createElement('div');
        card.classList.add('user-item');

        card.innerHTML = `
            <div>
                <h3>${usuario.nome}</h3>
                <p>✉️ ${usuario.email}</p>
            </div>
            <button class="btn-delete" onclick="removerUsuario(${index})">X</button>
        `;

        caixaUsuarios.appendChild(card);
    });
}



window.removerUsuario = function(index) {
    listaDeUsuarios.splice(index, 1); 
    atualizarListaTela(); 
};


formCadastro.addEventListener('submit', function(event) {
    event.preventDefault(); 

    inputSenha.classList.remove('input-error', 'shake');
    erroSenha.classList.add('hidden');

    if (inputSenha.value.length < 6) {
        void inputSenha.offsetWidth; 
        inputSenha.classList.add('input-error', 'shake'); 
        erroSenha.classList.remove('hidden');
        return;
    }

    listaDeUsuarios.push({
        nome: inputNome.value,
        email: inputEmail.value
    });

    formCadastro.reset(); 

    atualizarListaTela();
    telaCadastro.classList.add('hidden');
    telaLista.classList.remove('hidden');
});


btnIrLista.addEventListener('click', function() {
    atualizarListaTela();
    telaCadastro.classList.add('hidden');
    telaLista.classList.remove('hidden');
});

btnVoltar.addEventListener('click', function() {
    telaLista.classList.add('hidden');
    telaCadastro.classList.remove('hidden');
});