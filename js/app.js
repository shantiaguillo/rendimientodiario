const hoy = new Date().toLocaleDateString()
document.getElementById("fecha").textContent = hoy

let editIndex = null

let datos = JSON.parse(localStorage.getItem("registro")) || {
fecha:hoy,
historial:[]
}

if(datos.fecha !== hoy){
datos = {
fecha:hoy,
historial:[]
}
}

const historialUI = document.getElementById("historial")
const totalUI = document.getElementById("total")
const boton = document.getElementById("boton")
const input = document.getElementById("valor")

boton.addEventListener("click",accion)

input.addEventListener("keydown",function(e){

if(e.key==="Enter"){
e.preventDefault()
accion()
}

})

function guardar(){
localStorage.setItem("registro",JSON.stringify(datos))
}

function calcularTotal(){
return datos.historial.reduce((a,b)=>a+b,0)
}

function actualizar(){

historialUI.innerHTML=""

datos.historial.forEach((valor,index)=>{

const li=document.createElement("li")

li.innerHTML=`
<span class="valor">${valor}</span>

<div class="acciones">
<span class="editar" data-i="${index}">Editar</span>
<span class="eliminar" data-i="${index}">Eliminar</span>
</div>
`

historialUI.appendChild(li)

})

document.querySelectorAll(".editar").forEach(e=>{
e.onclick=()=>editar(e.dataset.i)
})

document.querySelectorAll(".eliminar").forEach(e=>{
e.onclick=()=>eliminar(e.dataset.i)
})

totalUI.textContent = calcularTotal()

guardar()

}

function accion(){

const num = Number(input.value)

if(!num) return

if(editIndex === null){

datos.historial.push(num)

}else{

datos.historial[editIndex] = num
editIndex = null
boton.textContent = "Agregar"

}

input.value=""

actualizar()

}

function editar(i){

input.value = datos.historial[i]
input.focus()

editIndex = i
boton.textContent = "Actualizar"

}

function eliminar(i){

const seguro = confirm("¿Seguro que quieres eliminar este registro 🏎️?")

if(!seguro) return

datos.historial.splice(i,1)

actualizar()

}

actualizar()
