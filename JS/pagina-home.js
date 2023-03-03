                                                //DECLARAÇÃO DE VARIAVEIS GLOBAIS
let usuarioLogado = JSON.parse(sessionStorage.getItem('UsuarioLogado') || 'null')
let entradaInputID = document.getElementById("inputID")
let descricao = document.getElementById("inputDescricao");
let detalhamento = document.getElementById("inputDetalhamento");
const formCadastro =  document.getElementById("formCadastro");
const btnSalvar = document.getElementById("salvarRegistro");
const btnSaveEdit = document.getElementById('botaoSalvarEdicao');
let tabelaRecados = document.getElementById ("tabelaRegistro");
let NrecadosEdit = 0
const linhaExemplo = document.getElementById('linhaExemplo')
const btnLogOut = document.getElementById("btnLogOut")

                                                //VALIDA SE O USUARIO ESTA LOGADO
if(!usuarioLogado){
    alert('Você precisa estar logado para utilizar o sistema!')
    window.location.href = './pagina-login.html'
}

                                                //CAPTURA DE EVENTOS
document.addEventListener('DOMContentLoaded', pegarDadosStorage)
formCadastro.addEventListener('submit', conferirCampos)
btnLogOut.addEventListener('click' , logOut)

                                                //FUNÇÕES
function conferirCampos(e){
    e.preventDefault()
    if(entradaInputID.value === "" || descricao.value === "" || detalhamento.value === ""){
        alert ("Verifique se você não deixou de preencher algum dos campos!")
    } else{
        listaRecados = pegarRecadosUsuarioLogado()
        let existeId = listaRecados.some((recado) => recado.numeroRecado === entradaInputID.value)
        if(existeId){
            alert("Já existe um recado com esse ID")
    }else{adicionarNovoRegistro()}
    }
}

function adicionarNovoRegistro(){
    listaRecados = pegarRecadosUsuarioLogado()
    
        let numeroRecado = entradaInputID.value;
        let tituloDescricao = descricao.value;
        let tituloDetalhamento = detalhamento.value;
    
        let recado = { 
            numeroRecado,
            tituloDescricao,
            tituloDetalhamento
        }
        
        listaRecados.push(recado);
        
        salvarNaTabela(recado);
        limparCampos();
        salvarLocalStorage(listaRecados)
        limparExemplo(listaRecados)
}

function salvarNaTabela(dadosRecado) {

    let novaLinha = document.createElement('tr');
    let colunaNumeroRecado =  document.createElement('td');
    let colunaDescricao = document.createElement('td');
    let colunaDetalhamento = document.createElement('td');
    let colunaBotoes = document.createElement('td');

    novaLinha.setAttribute('id' , `linhaRecado${dadosRecado.numeroRecado}`)

    colunaNumeroRecado.innerHTML = dadosRecado.numeroRecado;
    colunaDescricao.innerHTML = dadosRecado.tituloDescricao;
    colunaDetalhamento.innerHTML = dadosRecado.tituloDetalhamento;

    let botaoEditar = document.createElement('button');
    botaoEditar.setAttribute('type', 'button');
    botaoEditar.setAttribute('class', 'editar');
    botaoEditar.innerHTML = `Editar`;
    botaoEditar.addEventListener('click', () => {
        editarRecado(dadosRecado);
    });

    let botaoApagar = document.createElement('button');
    botaoApagar.setAttribute('type' , 'button');
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.innerHTML = `Apagar`;
    botaoApagar.addEventListener('click' , (e)=>{
        e.preventDefault
        apagarRecado(dadosRecado)
    })

    colunaBotoes.appendChild(botaoEditar)
    colunaBotoes.appendChild(botaoApagar);
    novaLinha.appendChild(colunaNumeroRecado);
    novaLinha.appendChild(colunaDescricao);
    novaLinha.appendChild(colunaDetalhamento);
    novaLinha.appendChild(colunaBotoes);

    tabelaRecados.appendChild(novaLinha);
}

function limparCampos() {
    entradaInputID.value = ""
    descricao.value = ""
    detalhamento.value = ""
}

function editarRecado(dadosRecado) {
    NrecadosEdit++
        if (NrecadosEdit >= 2 ){
        alert('Você só pode editar um recado por vez!'),
        location.reload()
    }

    btnSalvar.setAttribute('disabled' , '')
    btnSaveEdit.removeAttribute('disabled')
    
    entradaInputID.value = dadosRecado.numeroRecado
    document.getElementById("inputID").setAttribute('disabled' , '')
    descricao.value = dadosRecado.tituloDescricao
    detalhamento.value = dadosRecado.tituloDetalhamento
    document.getElementById(`linhaRecado${dadosRecado.numeroRecado}`).style.opacity = "0.5"

    btnSaveEdit.addEventListener('click', ()=>
    salvarEdit(dadosRecado))
}

function salvarEdit(dadosRecado){
        let dadosStorage =pegarRecadosUsuarioLogado()
        let recadoForEdit = dadosStorage.findIndex((recado) => recado.numeroRecado === dadosRecado.numeroRecado)
        if (recadoForEdit >= 0) {
            let numeroRecadoEdit = entradaInputID.value
            let tituloDescricaoEdit = descricao.value;
            let tituloDetalhamentoEdit = detalhamento.value;
            let recadoEditado = {
                numeroRecadoEdit ,
                tituloDescricaoEdit,
                tituloDetalhamentoEdit
            }
            dadosStorage[recadoForEdit].tituloDescricao = recadoEditado.tituloDescricaoEdit,
            dadosStorage[recadoForEdit].tituloDetalhamento = recadoEditado.tituloDetalhamentoEdit,
            alert('Recado Editado com sucesso')
            document.getElementById(`linhaRecado${dadosRecado.numeroRecado}`).removeAttribute('style')
            document.getElementById("inputID").removeAttribute("disabled"),
            limparCampos();
            salvarLocalStorage(dadosStorage);
            window.location = "./pagina-home.html";
            
        } 


}

function apagarRecado(dadosRecado){
    let dadosStorage =pegarRecadosUsuarioLogado()
    let recadoApagar = dadosStorage.findIndex((recado) => recado.numeroRecado === dadosRecado.numeroRecado);
    if(recadoApagar >= 0) {
        dadosStorage.splice(recadoApagar, 1);
        alert("Recado apagado com sucesso!");
        salvarLocalStorage(dadosStorage);
        document.getElementById(`linhaRecado${dadosRecado.numeroRecado}`).remove()
    }
}


function salvarLocalStorage(listaRecados) {
    let usuarios = buscarListaUsuarios()
    let indiceUser = pegarIndiceUsuarioLogado(usuarioLogado)
    usuarios[indiceUser].listaRecados = listaRecados
    localStorage.setItem('usuario', JSON.stringify(usuarios));
}



function pegarDadosStorage () {
    let dadosStorage =pegarRecadosUsuarioLogado()

    if(dadosStorage) {
        for (const registro of dadosStorage) {
            salvarNaTabela(registro)
            limparExemplo()
        }
    }
   return
}

function pegarRecadosUsuarioLogado() {
    let listaUsuarios = buscarListaUsuarios();
    let indiceUsuarioLogado = pegarIndiceUsuarioLogado();
    return listaUsuarios[indiceUsuarioLogado].listaRecados;
}

function limparExemplo(){
        linhaExemplo.remove();
}

function buscarListaUsuarios () {
    return JSON.parse(localStorage.getItem("usuario")) || []
}


function pegarIndiceUsuarioLogado() {
    let listaUsuarios = buscarListaUsuarios();
    let indiceUsuarioLogado = listaUsuarios.findIndex((usuario) => {
        return usuario.emailUsuario === usuarioLogado.emailUsuario;
    });

    return indiceUsuarioLogado;
}

function logOut(){
    sessionStorage.setItem('UsuarioLogado' , 'null')
    window.location.href = './pagina-login.html'
}