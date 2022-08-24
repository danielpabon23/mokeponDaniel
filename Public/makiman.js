//const { application, json } = require("express")

//const { application, json } = require("express")

const seccionAtaque = document.getElementById("seleccion-ataque")
const seccionReiniciar = document.getElementById("reiniciar")
const botonMascota = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("reinicio")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")
const seccionMascota = document.getElementById("seleccion-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const secccionMensaje = document.getElementById("resultado")
const ataquesJugador = document.getElementById("ataques-jugador")
const ataquesEnemigo = document.getElementById("ataques-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")
const seccionMapa = document.getElementById("mapa-mokepon")
const mapaMokepon = document.getElementById("mapita")


let mokepones = []
let mokeponesEnemigos = []
let ataqueEnemigo = []
let ataquesMokeponEnemigo = 0
let opcionDeMokepon = 0
let opcionAtaques = 0
let ataquesMakiman = 0
let botones = []
let indexAtaqueJugador = 0
let indexAtaqueEnemigo = 0
let ataqueJugador = []
let botonFuego = 0
let botonAgua = 0
let botonTierra = 0
let mokeponJugador = 0
let miMokeponObjeto = 0
let inputHipodoge  //hipodoge
let inputCapipepo  //capipepo
let inputRatigueya  //ratigueya
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapita.getContext("2d")
let intervalo 
let mokemapa = new Image()
mokemapa.src ="./assets/mokemap.webp"
let anchoDelMapa = seccionMapa.getBoundingClientRect().width - 20
let altoDelMapa = anchoDelMapa * 3 / 4
let jugadorId = null
let enemigoId = null
const anchoMaximo = 700
const altoMaximo = 500
if(anchoDelMapa > anchoMaximo){
    anchoDelMapa = anchoMaximo - 20
}

if (altoDelMapa > altoMaximo){
    altoDelMapa = altoMaximo -20
}
mapita.width = anchoDelMapa
mapita.height = altoDelMapa
class Mokepon{
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 50
        this.alto = 50
        this.x = aleatorio(0, mapita.width - this.ancho)
        this.y = aleatorio(0, mapita.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png")
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 4, "./assets/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 6, "./assets/ratigueya.png")



const hipodogeAtaques = [
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-tierra"}
]

hipodoge.ataques.push(...hipodogeAtaques)


const capipepoAtaques = [
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"}
]

capipepo.ataques.push(...capipepoAtaques)


const ratigueyaAtaques = [
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌱", id: "boton-tierra"}
]

ratigueya.ataques.push(...ratigueyaAtaques)


mokepones.push(hipodoge, capipepo, ratigueya)


function iniciarJuego(){
    
    seccionAtaque.style.display = "none"
    seccionMapa.style.display = "none"
    mokepones.forEach((mokepon) =>{
        opcionDeMokepon = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre} />
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepon

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
    })
    seccionReiniciar.style.display ="none"
    botonMascota.addEventListener("click", seleccionarMascota)
    botonReiniciar.addEventListener("click", reiniciar)
    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.1.14:8080/unirse")
        .then(function(res){
            if (res.ok) {
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}



function seleccionarMascota(){
    
    seccionMascota.style.display = "none"
    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mokeponJugador = inputHipodoge.id
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mokeponJugador = inputCapipepo.id
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mokeponJugador = inputRatigueya.id
    }else{
        alert("Escoge una mascota por favor")
        reiniciar()
    }

    seleccionarMokepon(mokeponJugador)
    
    ataquesMokepon(mokeponJugador)
    seccionMapa.style.display = "flex"
    iniciarMapa()
    seleccionMascotanemigo()
} 

function seleccionarMokepon(mokeponJugador){
    fetch(`http://192.168.1.14:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mokeponJugador
        })
    })
}

function seleccionMascotanemigo(enemigo){
    console.log(seleccionMascotanemigo)
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaques()
    }

function ataquesMokepon(mokeponJugador){
    for (let i = 0; i < mokepones.length; i++){
        if(mokeponJugador === mokepones[i].nombre){
            opcionAtaques = mokepones[i].ataques
        }
    }
    mostrarAtaques(opcionAtaques)

}

function mostrarAtaques(opcionAtaques){
    opcionAtaques.forEach((ataque)=>{
        ataquesMakiman= `
        <button id=${ataque.id} class="ataques BotonAtaque"> ${ataque.nombre} </button>` 
        contenedorAtaques.innerHTML += ataquesMakiman        
    })
    
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra") 
    botones = document.querySelectorAll(".BotonAtaque")
    console.log(botones)
    
}

function secuenciaAtaques(){
    botones.forEach((boton) =>{
        boton.addEventListener("click", (e) =>{

            if(e.target.textContent === " 🔥 "){
                ataqueJugador.push("FUEGO 🔥")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if(e.target.textContent === " 💧 "){
                ataqueJugador.push("AGUA 💧")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else{
                ataqueJugador.push("TIERRA 🌱")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }lienzo.drawImage(
                miMokeponObjeto.mapaFoto,
                miMokeponObjeto.x,
                miMokeponObjeto.y,
                miMokeponObjeto.ancho,
                miMokeponObjeto.alto
            )
            if (ataqueJugador.length === 5){
                enviarAtaques()  
            }
            
        }) 
    })
}

function enviarAtaques(){
    fetch(`http://192.168.1.14:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques : ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://192.168.1.14:8080/mokepon/${enemigoId}/ataques`)
        .then(function(res){
            if (res.ok) {
                res.json()
                    .then(function({ataques}){
                        if (ataques.length === 5){
                            ataqueEnemigo = ataques
                            batalla()
                        }
                    })
            }
        })
}


function ataqueEnemigop(){
    let ataqueAleatorio = aleatorio (0, ataquesMokeponEnemigo.length - 1)
    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push ("FUEGO 🔥")
    }else if(ataqueAleatorio == 3 || ataqueAleatorio == 4 ){
        ataqueEnemigo.push ("AGUA 💧")
    }else{
        ataqueEnemigo.push  ("TIERRA 🌱")
    }
    console.log(ataqueEnemigo)
    
    iniciarBatalla()
}

function iniciarBatalla(){
    if (ataqueJugador.length === 5){
        batalla()
    }
}


function indexAtaquesOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]

}

function batalla(){
    clearInterval(intervalo)

    for  (let index = 0; index < ataqueJugador.length; index++){
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAtaquesOponentes(index, index)
            crearMensaje("Empate") 
        }else if(ataqueJugador[index] === "FUEGO 🔥" && ataqueEnemigo[index] === "TIERRA 🌱"){
            indexAtaquesOponentes(index, index)
            crearMensaje("Ganaste 😊") 
            victoriasJugador++ 
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[index] === "AGUA 💧" && ataqueEnemigo[index] === "FUEGO 🔥"){
            indexAtaquesOponentes(index, index)
            crearMensaje("Ganaste 😊")
            victoriasJugador++ 
            spanVidasJugador.innerHTML = victoriasJugador 
        }else if(ataqueJugador[index] === "TIERRA 🌱" && ataqueEnemigo[index] === "AGUA 💧"){
            indexAtaquesOponentes(index, index)
            crearMensaje("GANASTE 😊")
            victoriasJugador++ 
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAtaquesOponentes(index, index)
            crearMensaje("Perdiste 😒")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo

            
        } 
        resultadoBatalla()  
}
}
function resultadoBatalla(){
    if(victoriasJugador === victoriasEnemigo){
        mensajeFinal("BUENA BATALLA, FUE UN EMPATE ENTRE AMBOS ✌️✌️😉")
        
    }else if(victoriasJugador > victoriasEnemigo){
        mensajeFinal("FELICITACIONES!! ERES EL MAESTRO MOKEPON 🎉🎉😊🎉")
    } else{
        mensajeFinal("LÁSTIMA!!! AUN TE FALTA POR ENTRENAR 😔😔")
    }
}

function crearMensaje(resultado){

    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaqueEnemigo = document.createElement("p")
    
    secccionMensaje.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo
    ataquesJugador.appendChild(nuevoAtaqueJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo)

}

function mensajeFinal(resultadoFinal){
    secccionMensaje.innerHTML= resultadoFinal
    seccionReiniciar.style.display ="block"
    
}

function reiniciar(){
    location.reload()
}

function aleatorio (min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
    }  


function pintarCanvas(){
    miMokeponObjeto.x = miMokeponObjeto.x + miMokeponObjeto.velocidadX
    miMokeponObjeto.y = miMokeponObjeto.y + miMokeponObjeto.velocidadY
    lienzo.clearRect(0, 0, mapita.width, mapita.height)
    lienzo.drawImage(
        mokemapa,
        0,
        0,
        mapita.width,
        mapita.height
    )
    miMokeponObjeto.pintarMokepon()

    enviarPosicion(miMokeponObjeto.x, miMokeponObjeto.y )
    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })

}

function enviarPosicion(x, y){
    fetch(`http://192.168.1.14:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res){
        if (res.ok){
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        let makimanEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Hipodoge"){
                            makimanEnemigo = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png", enemigo.id)
                        }else if(mokeponNombre === "Capipepo"){
                            makimanEnemigo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 4, "./assets/capipepo.png", enemigo.id)
                        }else if(mokeponNombre === "Ratigueya"){
                            makimanEnemigo = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 6, "./assets/ratigueya.png", enemigo.id)
                        }

                        makimanEnemigo.x = enemigo.x
                        makimanEnemigo.y = enemigo.y
                        return makimanEnemigo
                    })  
                })
        }
    })
}

function moverDerecha(){
    miMokeponObjeto.velocidadX = 5
}

function moverIzquierda(){
    miMokeponObjeto.velocidadX = -5
}

function moverAbajo(){
    miMokeponObjeto.velocidadY = 5
}

function moverArriba(){
    miMokeponObjeto.velocidadY = -5
}

function detenerMovimiento(){
    miMokeponObjeto.velocidadX = 0
    miMokeponObjeto.velocidadY = 0
}

function teclitas(event){
    switch(event.key){
        case "ArrowUp":
            moverArriba()
            break;
        case "ArrowDown":
            moverAbajo() 
            break;
        case "ArrowLeft":
            moverIzquierda()
            break;
        case "ArrowRight":
            moverDerecha()
            break;
        default:
            break
    }
}

function iniciarMapa(){
    miMokeponObjeto = obtenerMokepon(mokeponJugador)
    console.log(miMokeponObjeto, mokeponJugador);
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener("keydown", teclitas)
    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerMokepon(){
    for (let i = 0; i < mokepones.length; i++){
        if (mokeponJugador === mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x 

    const arribaJugador = miMokeponObjeto.y
    const abajoJugador = miMokeponObjeto.y + miMokeponObjeto.alto
    const derechaJugador = miMokeponObjeto.x + miMokeponObjeto.ancho
    const izquierdaJugador = miMokeponObjeto.x 

    if (abajoJugador < arribaEnemigo ||
        arribaJugador > abajoEnemigo ||
        derechaJugador < izquierdaEnemigo ||
        izquierdaJugador > derechaEnemigo 

        ){
            return
    }else 
    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    alert("Hay Colision" + " con " + enemigo.nombre)
    console.log('Se detecto una colision');
    seccionAtaque.style.display = "flex"
    seccionMapa.style.display = "none"
    seleccionMascotanemigo(enemigo)
    
    
    
}


window.addEventListener('load', iniciarJuego)

