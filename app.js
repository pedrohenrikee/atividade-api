'use scrict'



const homeLink = document.getElementById('home')
const sobreLink = document.getElementById('sobre')
const contatoLink = document.getElementById('contato')
const cursoLink = document.getElementById('curso')

function homePage(){
    const root = document.getElementById('root')
    root.className = 'home'
    const titulo = document.createElement('h1')
    titulo.classList.add('titulo')
    titulo.textContent = 'FATEC SÃO ROQUE'
    root.replaceChildren(titulo)
}

function sobrePage(){
    const root = document.getElementById('root')
    root.className = 'sobre'
    const titulo = document.createElement('h1')
    titulo.classList.add('titulo')
    titulo.textContent = 'Sobre'
    
    const texto = document.createElement('p')
    texto.textContent = 'A FATEC é uma instituição.'

    root.replaceChildren(titulo, texto)
}

function cursoPage(){
    const root = document.getElementById('root')
    root.className = 'curso'
    const titulo = document.createElement('h1')
    titulo.classList.add('titulo')
    titulo.textContent = 'Cursos'
    root.replaceChildren(titulo)
}

function contatoPage(){
    const root = document.getElementById('root')
    root.className = 'contato'
    const titulo = document.createElement('h1')
    titulo.classList.add('titulo')
    titulo.textContent = 'Contato'

    const formulario = document.createElement('form')
    const inputNome = document.createElement('input')
    inputNome.type = 'text'
    inputNome.placeholder = 'Digite seu nome'
    const inputEmail = document.createElement('input')
    inputEmail.type = 'email'
    inputEmail.placeholder = 'Digite seu email'
    const inputMensagem = document.createElement('textarea')
    inputMensagem.placeholder = 'Digite sua mensagem'
    const botaoEnviar = document.createElement('button')
    botaoEnviar.type = 'submit'
    botaoEnviar.textContent = 'Enviar'

    formulario.replaceChildren(inputNome, inputEmail, inputMensagem, botaoEnviar)

    root.replaceChildren(titulo, formulario)
}

homePage()

homeLink.onclick = homePage
sobreLink.onclick = sobrePage
cursoLink.onclick = cursoPage
contatoLink.onclick = contatoPage