let labelNomeCadastro = document.getElementById ("labelNomeCadastro");
let inputNomeCadastro = document.getElementById ("nomeCadastro");
let validaNomeCadastro = false;
inputNomeCadastro.addEventListener('keyup', verificaNome);
function verificaNome () {
    if(nomeCadastro.value.length < 3) {
        labelNomeCadastro.setAttribute ('style', 'color: red')
        labelNomeCadastro.innerHTML = 'NOME OU APELIDO:  *O nome deve ter no minimo 3 letras!'
    } else {
        labelNomeCadastro.setAttribute ('style', 'color: blue')  
        labelNomeCadastro.innerHTML = 'NOME OU APELIDO:'
        validaNomeCadastro = true
    }
}

let labelEmailCadastro = document.getElementById ("labelEmailCadastro");
let inputEmailCadastro = document.getElementById ("emailCadastro");
let validaEmailCadastro = false;
inputEmailCadastro.addEventListener('keyup' , verificaEmail);
function verificaEmail () {
    if (emailCadastro.value.length < 10) {
        labelEmailCadastro.setAttribute ('style', 'color: red ; font-size: small')
        labelEmailCadastro.innerHTML = 'INFORME UM E-MAIL PARA CADASTRO: *O e-mail deve ter no mínimo 10 caracteres!*'
    } else {
        labelEmailCadastro.setAttribute ('style', 'color: blue')
        labelEmailCadastro.innerHTML = 'INFORME UM E-MAIL PARA CADASTRO:'
        validaEmailCadastro = true
    }
}

let labelSenhaCadastro = document.getElementById("labelSenhaCadastro");
let inputSenhaCadastro = document.getElementById ("senhaCadastro");
let validaSenhaCadastro =  false;
inputSenhaCadastro.addEventListener('keyup' , verificaSenha)
function verificaSenha () {
    if(senhaCadastro.value.length < 6) {
        labelSenhaCadastro.setAttribute ('style', 'color: red')
        labelSenhaCadastro.innerHTML = 'CRIE UMA SENHA: *A senha deve ter no mínimo 6 caracteres!*'
    } else {
        labelSenhaCadastro.setAttribute ('style', 'color: blue')
        labelSenhaCadastro.innerHTML = 'CRIE UMA SENHA:'
        validaSenhaCadastro = true
    }
}


let labelConfirmaSenhaCadastro = document.getElementById("labelConfirmaSenhaCadastro");
let inputConfirmaSenhaCadastro = document.getElementById ("confirmaSenhaCadastro");
let validaConfirmaSenhaCadastro = false;
inputConfirmaSenhaCadastro.addEventListener('keyup' , igualdadeDeSenha)
function igualdadeDeSenha () {
    if (confirmaSenhaCadastro.value === senhaCadastro.value) {
        labelConfirmaSenhaCadastro.setAttribute ('style', 'color: blue')
        labelConfirmaSenhaCadastro.innerHTML = 'CONFIRME A SENHA:'
    } else {
        labelConfirmaSenhaCadastro.setAttribute ('style', 'color: red')
        labelConfirmaSenhaCadastro.innerHTML = 'CONFIRME A SENHA: *As senhas não correspondem!*'
        validaConfirmaSenhaCadastro = true
    }
    
}


let formularioCadastro = document.getElementById("formularioCadastro")
formularioCadastro.addEventListener('submit', validaInputs)
function validaInputs (e) {
    e.preventDefault();
    if (nomeCadastro.value === "" || emailCadastro.value === "" || senhaCadastro.value === "" || confirmaSenhaCadastro.value === "" ) 
    { alert("Por favor, verifique se preencheu todos os campos.")
    return
    } else if (!validaNomeCadastro || !validaEmailCadastro ||!validaSenhaCadastro || !validaConfirmaSenhaCadastro ) 
    {   alert ("Algum dos campos foi preenchido incorretamente!")
    return
    }
    verificarDados()  
}

function verificarDados(e) {
    let usuario = buscarListaUsuarios ()
    let email =  emailCadastro.value

    let validarEmail = usuario.some((metaEmail) => metaEmail.emailUsuario === email)
    console.log(validarEmail)

    if(validarEmail) {
        alert('Este e-mail já está cadastrado no sistema')
        irPagLogin()
        let emailLogin = document.getElementById("emailLogin")
        emailLogin.value = emailCadastro.value
        } else   {
        alert("Parabéns! Sua conta foi criada com sucesso. Você será redirecionado para a página de login.")
        salvarLocalStorage (),
        irPagLogin}
        }



function salvarLocalStorage () { 
    let nomeUsuario = document.getElementById ("nomeCadastro").value
    let emailUsuario = document.getElementById ("emailCadastro").value
    let senhaUsuario = document.getElementById ("senhaCadastro").value
    let listaRecados = []
    let listaUsuarios = buscarListaUsuarios ()
    let dadosUsuario = {
        nomeUsuario,
        emailUsuario,
        senhaUsuario,
        listaRecados
    }
    
    listaUsuarios.push(dadosUsuario)
    atualizarUsuario(listaUsuarios)
}

function atualizarUsuario(listaUsuarios) {
    return window.localStorage.setItem("usuario", JSON.stringify(listaUsuarios))
}



function buscarListaUsuarios () {
    return JSON.parse(localStorage.getItem("usuario")) ?? []
}

let voltarLogin = document.getElementById("voltarLogin")
voltarLogin.addEventListener('click', irPagLogin)
function irPagLogin () {
    window.location = "pagina-login.html"
}