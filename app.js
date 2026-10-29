'use strict'

const API = 'https://dragonball-api.com/api'
const root = document.getElementById('root')

const guerreirosLink = document.getElementById('guerreiros')
const planetasLink = document.getElementById('planetas')
const gokuLink = document.getElementById('goku')
const radarLink = document.getElementById('radar')
const logoLink = document.getElementById('logo')

function iniciarPagina(classe, textoTitulo){
    root.className = classe + ' pagina'
    const titulo = document.createElement('h1')
    titulo.classList.add('titulo')
    titulo.textContent = textoTitulo
    return titulo
}

function paginaAtiva(classe){
    return root.classList.contains(classe)
}

async function buscar(caminho){
    const resposta = await fetch(API + caminho)
    if (!resposta.ok) throw new Error('Erro ' + resposta.status)
    return resposta.json()
}

function criarStatus(texto){
    const p = document.createElement('p')
    p.classList.add('status')
    p.textContent = texto
    return p
}

function criarCard(imagem, nome, detalhe){
    const card = document.createElement('article')
    card.classList.add('card')

    const img = document.createElement('img')
    img.src = imagem
    img.alt = nome
    img.loading = 'lazy'

    const titulo = document.createElement('h2')
    titulo.textContent = nome

    const info = document.createElement('p')
    info.textContent = detalhe

    card.replaceChildren(img, titulo, info)
    return card
}

function criarLista(cards){
    const lista = document.createElement('div')
    lista.classList.add('lista')
    lista.replaceChildren(...cards)
    return lista
}

async function carregarPagina(classe, textoTitulo, caminho, montar){
    const titulo = iniciarPagina(classe, textoTitulo)
    root.replaceChildren(titulo, criarStatus('Carregando...'))

    try {
        const dados = await buscar(caminho)
        if (!paginaAtiva(classe)) return
        root.replaceChildren(titulo, ...montar(dados))
    } catch (erro) {
        console.error(erro)
        if (!paginaAtiva(classe)) return
        root.replaceChildren(titulo, criarStatus('Não foi possível carregar os dados.'))
    }
}

function inicioPage(){
    const titulo = iniciarPagina('inicio', 'Dragon Ball API')
    root.replaceChildren(titulo)
}

function guerreirosPage(){
    carregarPagina('guerreiros', 'Guerreiros', '/characters?limit=12', dados => {
        const cards = dados.items.map(p =>
            criarCard(p.image, p.name, `${p.race} • Ki: ${p.ki}`)
        )
        return [criarLista(cards)]
    })
}

function planetasPage(){
    carregarPagina('planetas', 'Planetas', '/planets?limit=12', dados => {
        const cards = dados.items.map(p =>
            criarCard(p.image, p.name, p.isDestroyed ? 'Destruído' : 'Intacto')
        )
        return [criarLista(cards)]
    })
}

function gokuPage(){
    carregarPagina('goku', 'Lenda do Goku', '/characters/1', goku => {
        const foto = document.createElement('img')
        foto.classList.add('perfil')
        foto.src = goku.image
        foto.alt = goku.name

        const descricao = document.createElement('p')
        descricao.classList.add('descricao')
        descricao.textContent = 'Goku é o protagonista de Dragon Ball. Nascido como um guerreiro Saiyajin chamado Kakarotto, foi enviado à Terra ainda bebê e criado pelo vovô Gohan. Ao longo da história, ele treina artes marciais sem parar, enfrenta inimigos cada vez mais poderosos e protege o planeta, alcançando transformações como o Super Saiyajin e o Instinto Superior.'

        const info = document.createElement('p')
        info.classList.add('descricao')
        info.textContent = `Raça: Saiyajin • Afiliação: Guerreiros Z • Ki: ${goku.ki}`

        const subtitulo = document.createElement('h2')
        subtitulo.textContent = 'Transformações'

        const cards = (goku.transformations || []).map(t =>
            criarCard(t.image, t.name, `Ki: ${t.ki}`)
        )

        return [foto, descricao, info, subtitulo, criarLista(cards)]
    })
}

function radarPage(){
    const titulo = iniciarPagina('radar', 'Radar do Dragão')

    const formulario = document.createElement('form')
    const inputNome = document.createElement('input')
    inputNome.type = 'text'
    inputNome.placeholder = 'Digite o nome (ex: Goku)'
    inputNome.required = true
    const botaoBuscar = document.createElement('button')
    botaoBuscar.type = 'submit'
    botaoBuscar.textContent = 'Rastrear'
    formulario.replaceChildren(inputNome, botaoBuscar)

    const resultado = document.createElement('div')

    formulario.onsubmit = async (evento) => {
        evento.preventDefault() // impede a página de recarregar
        resultado.replaceChildren(criarStatus('Rastreando...'))

        try {
            const nome = encodeURIComponent(inputNome.value.trim())
            const dados = await buscar('/characters?name=' + nome)

            // com filtro a API pode devolver um array direto; sem filtro, { items: [...] }
            const lista = Array.isArray(dados) ? dados : dados.items

            if (lista.length === 0) {
                resultado.replaceChildren(criarStatus('Nenhum guerreiro encontrado.'))
                return
            }

            const cards = lista.map(p =>
                criarCard(p.image, p.name, `${p.race} • Ki: ${p.ki}`)
            )
            resultado.replaceChildren(criarLista(cards))
        } catch (erro) {
            console.error(erro)
            resultado.replaceChildren(criarStatus('O radar não conseguiu rastrear agora.'))
        }
    }

    root.replaceChildren(titulo, formulario, resultado)
}

inicioPage()

logoLink.onclick = inicioPage
guerreirosLink.onclick = guerreirosPage
planetasLink.onclick = planetasPage
gokuLink.onclick = gokuPage
radarLink.onclick = radarPage