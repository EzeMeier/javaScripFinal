class Jugadores {
    constructor(id, nombre, apellido, posicion, destreza, img, disponible){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.posicion = posicion;
        this.destreza = destreza;
        this.img = img;
        this.disponible = true;

    }
}

const arquero1 = new Jugadores(1,"Mario", "Bravo", "Arquero", 65, "img/arquero1.png");
const arquero2 = new Jugadores(2,"Lucas", "Boyos", "Arquero", 72, "img/arquero2.png");
const defensor1 = new Jugadores(3,"Joquin", "Vaso", "Defensor", 55, "img/defensor1.png");
const defensor2 = new Jugadores(4,"Hector", "Ramirez", "Defensor", 60, "img/defensor2.png");
const mediocampista1 = new Jugadores(5,"Hector", "Ramirez", "Defensor", 60, "img/mediocampista1.png");
const mediocampista2 = new Jugadores(6,"Roberto", "Perez", "Mediocampista", 75, "img/mediocampista2.png");
const delantero1 = new Jugadores(7,"Jose", "Garcia", "Delantero", 80, "img/delantero1.png");
const delantero2 = new Jugadores(8,"Pedro", "Gandolfi", "Delantero", 62, "img/delantero2.png");

const arrayJugadores = [arquero1,arquero2,defensor1,defensor2,mediocampista1, mediocampista2, delantero1, delantero2];

console.log(arrayJugadores);

let equipo = [];

if(localStorage.getItem("equipo")) {
    equipo = JSON.parse(localStorage.getItem("equipo"));
}

const divJugadores = document.getElementById("divJugadores");

const verJugadores = () => {
    arrayJugadores.forEach(arrayJugadores => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                    <div class="card text-center" style="width: 18rem;">
                        <img src="${arrayJugadores.img}" class="card-img-top imgJug" alt="Jugadores">
                        <div class="card-body">
                        <h2> "${arrayJugadores.nombre}"</h2>
                        <h2> "${arrayJugadores.apellido}"</h2>
                        <h3> "${arrayJugadores.posicion}"</h3>
                        <h3> "${arrayJugadores.destreza}"</h3>
                        <button type="button" class="btn btn-dark" id = "boton${arrayJugadores.id}" >Agregar al equipo</button>
                        </div>
                    </div>
        ` 
        divJugadores.appendChild(card);

        const agregar = document.getElementById(`boton${arrayJugadores.id}`);
        agregar.addEventListener("click", () => {
            agregarAlEquipo(arrayJugadores.id);

        })
    })
}

verJugadores();


const agregarAlEquipo = (id) => {
    const jugadorSel = equipo.find (arrayJugadores => arrayJugadores.id === id);
    if(jugadorSel) {
        jugadorSel.disponible++
    }else {
            const jugadores = arrayJugadores.find(arrayJugadores =>arrayJugadores.id === id);
            equipo.push(jugadores);
        }
        console.log("Este es mi equipo");
        console.log(equipo);
        localStorage.setItem("equipo", JSON.stringify(equipo));
    }

    const divEquipo = document.getElementById("divEquipo");
    const verEquipo = document.getElementById("verEquipo");

    verEquipo.addEventListener("click", () => {
        mostrarEquipo();
    })

    const mostrarEquipo = () => {
        divEquipo.innerHTML="";
        equipo.forEach(arrayJugadores => {
            const card = document.createElement("div");
            card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
            card.innerHTML = `
                        <div class="card text-center" style="width: 18rem;">
                            <img src="${arrayJugadores.img}" class="card-img-top imgJug" alt="Jugadores">
                            <div class="card-body">
                            <h2> "${arrayJugadores.nombre}"</h2>
                            <h2> "${arrayJugadores.apellido}"</h2>
                            <h3> "${arrayJugadores.posicion}"</h3>
                            <h3> "${arrayJugadores.destreza}"</h3>
                            <button type="button" class="btn btn-dark" id = "eliminar${arrayJugadores.id}" >Eliminar jugador</button>
                            </div>
                        </div>
            ` 
            divEquipo.appendChild(card);
            
            const boton = document.getElementById(`eliminar${arrayJugadores.id}`);
            boton.addEventListener("click", () => {
                eliminarDelEquipo(arrayJugadores.id); 
            })
        })
    }

   const eliminarDelEquipo = (id) => {
    const jug = equipo.find(arrayJugadores => arrayJugadores.id === id);
    const indice = equipo.indexOf(jug);
    equipo.splice(indice,1);
    mostrarEquipo();
    localStorage.setItem("equipo", JSON.stringify(equipo));
   }

   const eliminarEquipo = document.getElementById("eliminarEquipo");
   
   eliminarEquipo.addEventListener("click", () => {
    Swal.fire({
        title: "¿Estas seguro de eliminar el equipo?",
        icon: "question",
        confirmButtonText: "Si",
        showCancelButton: true,
        cancelButtonText: "No",
    }).then((result=>{
        if(result.isConfirmed){
            eliminarElEquipo(); 
            Swal.fire({
                title: "Equipo eliminado!",
                icon: "success",
                confirmButtonText: "Aceptar",
            })
        }
    }))
   })

   const eliminarElEquipo = () => {
    equipo = [];
    mostrarEquipo ();
    localStorage.clear();
   }

   const equiposCampeones = "json/equipos.json";
   const equipos = document.getElementById("equipos");

   fetch(equiposCampeones)
        .then(respuesta => respuesta.json())
        .then(contenido => {
            contenido.forEach (camp =>{
                equipos.innerHTML += `
                <h3>Nombre: ${camp.equipo}</h3>
                <h3>Campeon: ${camp.campeon}</h3>
                <h3>Partidos ganados: ${camp.partidosGan}</h3>
                <h3>Partidos perdidos: ${camp.partidosPer}</h3>
                <hr>`
            })
        })
        .catch(error => console.log(error))
        .finally(() => console.log("Proceso finalizado"));
