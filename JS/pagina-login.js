let emailLogin = document.getElementById("emailLogin");
let senhaLogin = document.getElementById("senhaLogin");
let botaoEntrar = document.getElementById("botaoEntrar");
let botaoCriarContaLogin = document.getElementById("criarContaLogin");
let formularioLogin = document.getElementById("formularioLogin")

formularioLogin.addEventListener('submit' , verificarDados);
botaoCriarContaLogin.addEventListener('click' , irParaCriarConta);

function verificarDados(e) {
    e.preventDefault();
    let usuario = buscarListaUsuarios ()
    let email =  emailLogin.value
    let senha =  senhaLogin.value

    let validarEmail = usuario.some((metaEmail) => metaEmail.emailUsuario === email)
    let validarSenha = usuario.some((metaSenha) => metaSenha.senhaUsuario === senha)
    let indice = usuario.findIndex((metaEmail)=> metaEmail.emailUsuario === email)

    if(validarEmail) {
        if (validarSenha) {
            entrarNoSistema ();
            sessionStorage.setItem('UsuarioLogado' , JSON.stringify(usuario[indice]) )

        } else {
         alert ("Senha incorreta. Por favor, tente novamente!")}
        } else if(
            confirm ("Não foi possível encontrar nenhuma conta com o email fornecido! Você será redirecionado para a página de cadastro.")) 
            { irParaCriarConta()}
}

function entrarNoSistema() {
   window.location.href = "pagina-home.html"
}

function irParaCriarConta() {
    window.location.href = "pagina-cadastro.html";
}

function buscarListaUsuarios () {
    return JSON.parse(localStorage.getItem("usuario")) || []
}
