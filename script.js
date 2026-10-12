// =========================================================
// SLIDER DE PLATOS
// =========================================================

const slider = document.querySelector(".slider-container");

const next = document.querySelector(".next");

const prev = document.querySelector(".prev");

let movimiento;


// =========================================================
// MOVIMIENTO HACIA ADELANTE
// =========================================================

function moverDerecha(){

    if(!slider){
        return;
    }

    const distancia = 340;

    if(
        slider.scrollLeft + slider.clientWidth
        >= slider.scrollWidth - 10
    ){

        slider.scrollTo({
            left:0,
            behavior:"smooth"
        });

    }else{

        slider.scrollBy({
            left:distancia,
            behavior:"smooth"
        });

    }

}


// =========================================================
// MOVIMIENTO HACIA ATRÁS
// =========================================================

function moverIzquierda(){

    if(!slider){
        return;
    }

    if(slider.scrollLeft <= 10){

        slider.scrollTo({
            left:slider.scrollWidth,
            behavior:"smooth"
        });

    }else{

        slider.scrollBy({
            left:-340,
            behavior:"smooth"
        });

    }

}


// =========================================================
// BOTONES DEL SLIDER DE PLATOS
// =========================================================

if(next){

    next.addEventListener("click",()=>{

        moverDerecha();

    });

}


if(prev){

    prev.addEventListener("click",()=>{

        moverIzquierda();

    });

}


// =========================================================
// SLIDER AUTOMÁTICO DE PLATOS
// =========================================================

function iniciarSlider(){

    if(!slider){
        return;
    }

    clearInterval(movimiento);

    movimiento=setInterval(()=>{

        moverDerecha();

    },4000);

}


if(slider){

    iniciarSlider();


    slider.addEventListener("mouseenter",()=>{

        clearInterval(movimiento);

    });


    slider.addEventListener("mouseleave",()=>{

        iniciarSlider();

    });

}


// =========================================================
// ARRASTRAR SLIDER DE PLATOS CON EL MOUSE
// =========================================================

let presionado=false;

let inicioX;

let scrollInicial;


if(slider){

    slider.addEventListener("mousedown",(e)=>{

        presionado=true;

        inicioX=e.pageX-slider.offsetLeft;

        scrollInicial=slider.scrollLeft;

        slider.style.cursor="grabbing";

    });


    slider.addEventListener("mouseup",()=>{

        presionado=false;

        slider.style.cursor="grab";

    });


    slider.addEventListener("mouseleave",()=>{

        presionado=false;

        slider.style.cursor="grab";

    });


    slider.addEventListener("mousemove",(e)=>{

        if(!presionado){

            return;

        }

        e.preventDefault();

        const x=e.pageX-slider.offsetLeft;

        const movimientoMouse=(x-inicioX)*2;

        slider.scrollLeft=scrollInicial-movimientoMouse;

    });

}


// =========================================================
// GALERÍA GOURMET
// =========================================================

const galeriaSlider =
    document.querySelector(".gallery-container");

const siguienteGaleria =
    document.querySelector(".next-gallery");

const anteriorGaleria =
    document.querySelector(".prev-gallery");


// =========================================================
// DISTANCIA DE MOVIMIENTO DE GALERÍA
// =========================================================

function moverGaleriaDerecha(){

    if(!galeriaSlider){
        return;
    }

    const tarjeta =
        galeriaSlider.querySelector(".gallery-card");

    if(!tarjeta){
        return;
    }

    const ancho =
        tarjeta.offsetWidth + 30;

    const limite =
        galeriaSlider.scrollWidth -
        galeriaSlider.clientWidth;

    if(galeriaSlider.scrollLeft >= limite - 10){

        galeriaSlider.scrollTo({

            left:0,

            behavior:"smooth"

        });

    }else{

        galeriaSlider.scrollBy({

            left:ancho,

            behavior:"smooth"

        });

    }

}


function moverGaleriaIzquierda(){

    if(!galeriaSlider){
        return;
    }

    const tarjeta =
        galeriaSlider.querySelector(".gallery-card");

    if(!tarjeta){
        return;
    }

    const ancho =
        tarjeta.offsetWidth + 30;

    if(galeriaSlider.scrollLeft <= 10){

        galeriaSlider.scrollTo({

            left:
                galeriaSlider.scrollWidth,

            behavior:"smooth"

        });

    }else{

        galeriaSlider.scrollBy({

            left:-ancho,

            behavior:"smooth"

        });

    }

}


// =========================================================
// BOTONES DE GALERÍA
// =========================================================

if(siguienteGaleria){

    siguienteGaleria.addEventListener(
        "click",
        moverGaleriaDerecha
    );

}


if(anteriorGaleria){

    anteriorGaleria.addEventListener(
        "click",
        moverGaleriaIzquierda
    );

}


// =========================================================
// ARRASTRAR GALERÍA CON EL MOUSE
// =========================================================

let galeriaPresionada=false;

let galeriaInicioX;

let galeriaScrollInicial;


if(galeriaSlider){

    galeriaSlider.style.cursor="grab";


    galeriaSlider.addEventListener(
        "mousedown",
        (e)=>{

            galeriaPresionada=true;

            galeriaInicioX =
                e.pageX -
                galeriaSlider.offsetLeft;

            galeriaScrollInicial =
                galeriaSlider.scrollLeft;

            galeriaSlider.style.cursor="grabbing";

        }
    );


    galeriaSlider.addEventListener(
        "mouseup",
        ()=>{

            galeriaPresionada=false;

            galeriaSlider.style.cursor="grab";

        }
    );


    galeriaSlider.addEventListener(
        "mouseleave",
        ()=>{

            galeriaPresionada=false;

            galeriaSlider.style.cursor="grab";

        }
    );


    galeriaSlider.addEventListener(
        "mousemove",
        (e)=>{

            if(!galeriaPresionada){

                return;

            }

            e.preventDefault();

            const x =
                e.pageX -
                galeriaSlider.offsetLeft;

            const movimiento =
                (x-galeriaInicioX)*2;

            galeriaSlider.scrollLeft =
                galeriaScrollInicial-movimiento;

        }
    );

}


// =========================================================
// SISTEMA DE CALIFICACIÓN
// =========================================================

const estrellas =
    document.querySelectorAll(".estrella");

const calificacionTexto =
    document.querySelector("#calificacion-texto");

const botonEnviarOpinion =
    document.querySelector("#btn-enviar-opinion");

const mensajeOpinion =
    document.querySelector("#mensaje-opinion");

let calificacionSeleccionada = 0;


// =========================================================
// TEXTOS DE CALIFICACIÓN
// =========================================================

const textosCalificacion = {

    1:"1 estrella seleccionada",

    2:"2 estrellas seleccionadas",

    3:"3 estrellas seleccionadas",

    4:"4 estrellas seleccionadas",

    5:"5 estrellas seleccionadas"

};


// =========================================================
// ACTUALIZAR ESTRELLAS
// =========================================================

function actualizarEstrellas(calificacion){

    estrellas.forEach((estrella)=>{

        const valor =
            Number(estrella.dataset.calificacion);

        if(valor <= calificacion){

            estrella.classList.add("seleccionada");

        }else{

            estrella.classList.remove("seleccionada");

        }

    });

}


// =========================================================
// SELECCIONAR CALIFICACIÓN
// =========================================================

estrellas.forEach((estrella)=>{

    estrella.addEventListener("click",()=>{

        calificacionSeleccionada =
            Number(estrella.dataset.calificacion);

        actualizarEstrellas(
            calificacionSeleccionada
        );


        if(calificacionTexto){

            calificacionTexto.textContent =
                textosCalificacion[
                    calificacionSeleccionada
                ];

        }


        if(mensajeOpinion){

            mensajeOpinion.textContent="";

        }

    });

});


// =========================================================
// BOTÓN ENVIAR OPINIÓN
// =========================================================

if(botonEnviarOpinion){

    botonEnviarOpinion.addEventListener("click",()=>{


        // Si no se seleccionó ninguna estrella

        if(calificacionSeleccionada === 0){

            if(mensajeOpinion){

                mensajeOpinion.textContent =
                    "Selecciona una calificación antes de enviar.";

            }

            return;

        }


        // Simulación del envío

        if(mensajeOpinion){

            mensajeOpinion.textContent =
                "¡Gracias por tu calificación! Tu opinión ha sido enviada.";

        }


        // Reiniciar las estrellas

        calificacionSeleccionada = 0;

        actualizarEstrellas(0);


        if(calificacionTexto){

            calificacionTexto.textContent =
                "Selecciona una calificación";

        }

    });

}

// =========================================================
// INTERACTIVIDAD DE LA GALERÍA (FILTROS Y LIGHTBOX)
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. FILTROS DE CATEGORÍA
    const botonesFiltro = document.querySelectorAll(".filtro-btn");
    const itemsGaleria = document.querySelectorAll(".galeria-item");

    if (botonesFiltro.length > 0) {
        botonesFiltro.forEach(boton => {
            boton.addEventListener("click", () => {
                
                // Cambiar clase activa en los botones
                botonesFiltro.forEach(b => b.classList.remove("activo"));
                boton.classList.add("activo");

                const filtro = boton.getAttribute("data-filtro");

                // Filtrar elementos
                itemsGaleria.forEach(item => {
                    if (filtro === "todos" || item.getAttribute("data-categoria") === filtro) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        });
    }

    // 2. LIGHTBOX / MODAL EN PANTALLA COMPLETA
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const botonCerrar = document.querySelector(".lightbox-cerrar");

    if (lightbox && itemsGaleria.length > 0) {
        itemsGaleria.forEach(item => {
            item.addEventListener("click", () => {
                const img = item.querySelector("img");
                const titulo = item.querySelector("h3").innerText;
                
                lightbox.style.display = "flex";
                lightboxImg.src = img.src;
                lightboxCaption.innerText = titulo;
            });
        });

        // Cerrar al hacer clic en la X
        botonCerrar.addEventListener("click", () => {
            lightbox.style.display = "none";
        });

        // Cerrar al hacer clic fuera de la imagen
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }
});
// =========================================================
// LÓGICA DE DOMICILIOS & CARRITO DE COMPRAS INTERACTIVO
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // ESTADO DEL CARRITO DE COMPRAS
    let carrito = [];

    // ELEMENTOS DEL DOM
    const drawerCarrito = document.getElementById("drawer-carrito");
    const overlayCarrito = document.getElementById("overlay-carrito");
    const btnAbrirCarrito = document.getElementById("btn-abrir-carrito");
    const btnCerrarCarrito = document.getElementById("btn-cerrar-carrito");
    const contenedorItems = document.getElementById("carrito-items");
    const contadorCarrito = document.getElementById("contador-carrito");
    const subtotalTxt = document.getElementById("subtotal-carrito");
    const totalTxt = document.getElementById("total-carrito");
    const formCheckout = document.getElementById("form-checkout");
    const modalConfirmacion = document.getElementById("modal-confirmacion");
    const btnEntendido = document.getElementById("btn-entendido");

    const COSTO_ENVIO = 12000;

    // 1. ABRIR / CERRAR CARRITO
    function abrirCarrito() {
        if (drawerCarrito && overlayCarrito) {
            drawerCarrito.classList.add("activo");
            overlayCarrito.classList.add("activo");
        }
    }

    function cerrarCarrito() {
        if (drawerCarrito && overlayCarrito) {
            drawerCarrito.classList.remove("activo");
            overlayCarrito.classList.remove("activo");
        }
    }

    if (btnAbrirCarrito) btnAbrirCarrito.addEventListener("click", abrirCarrito);
    if (btnCerrarCarrito) btnCerrarCarrito.addEventListener("click", cerrarCarrito);
    if (overlayCarrito) overlayCarrito.addEventListener("click", cerrarCarrito);

    // 2. AGREGAR PRODUCTOS AL CARRITO
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = boton.getAttribute("data-id");
            const nombre = boton.getAttribute("data-nombre");
            const precio = parseInt(boton.getAttribute("data-precio"));
            const img = boton.getAttribute("data-img");

            const existe = carrito.find(item => item.id === id);

            if (existe) {
                existe.cantidad++;
            } else {
                carrito.push({ id, nombre, precio, img, cantidad: 1 });
            }

            actualizarCarrito();
            abrirCarrito();
        });
    });

    // 3. ACTUALIZAR VISTA DEL CARRITO
    function actualizarCarrito() {
        if (!contenedorItems) return;

        contenedorItems.innerHTML = "";

        if (carrito.length === 0) {
            contenedorItems.innerHTML = '<p class="carrito-vacio">Su carrito está vacío</p>';
            contadorCarrito.innerText = "0";
            subtotalTxt.innerText = "$0";
            totalTxt.innerText = "$0";
            return;
        }

        let subtotal = 0;
        let totalItems = 0;

        carrito.forEach(item => {
            subtotal += item.precio * item.cantidad;
            totalItems += item.cantidad;

            const itemElement = document.createElement("div");
            itemElement.classList.add("item-carrito");
            itemElement.innerHTML = `
                <img src="${item.img}" alt="${item.nombre}">
                <div class="item-detalles">
                    <h4>${item.nombre}</h4>
                    <p>$${(item.precio * item.cantidad).toLocaleString("es-CO")}</p>
                    <div class="item-controles">
                        <button class="btn-cant btn-menos" data-id="${item.id}">-</button>
                        <span class="cant-val">${item.cantidad}</span>
                        <button class="btn-cant btn-mas" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="btn-eliminar" data-id="${item.id}">&times;</button>
            `;
            contenedorItems.appendChild(itemElement);
        });

        const total = subtotal + COSTO_ENVIO;

        contadorCarrito.innerText = totalItems;
        subtotalTxt.innerText = `$${subtotal.toLocaleString("es-CO")}`;
        totalTxt.innerText = `$${total.toLocaleString("es-CO")}`;

        asignarEventosControles();
    }

    // 4. EVENTOS DE INCREMENTAR / DECREMENTAR / ELIMINAR
    function asignarEventosControles() {
        document.querySelectorAll(".btn-mas").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const item = carrito.find(i => i.id === id);
                if (item) {
                    item.cantidad++;
                    actualizarCarrito();
                }
            });
        });

        document.querySelectorAll(".btn-menos").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const item = carrito.find(i => i.id === id);
                if (item) {
                    item.cantidad--;
                    if (item.cantidad === 0) {
                        carrito = carrito.filter(i => i.id !== id);
                    }
                    actualizarCarrito();
                }
            });
        });

        document.querySelectorAll(".btn-eliminar").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                carrito = carrito.filter(i => i.id !== id);
                actualizarCarrito();
            });
        });
    }

    // 5. CHECKOUT Y CONFIRMACIÓN DE COMPRA
    if (formCheckout) {
        formCheckout.addEventListener("submit", (e) => {
            e.preventDefault();

            if (carrito.length === 0) {
                alert("Por favor agregue al menos un producto al carrito.");
                return;
            }

            cerrarCarrito();
            carrito = [];
            actualizarCarrito();
            formCheckout.reset();

            if (modalConfirmacion) {
                modalConfirmacion.style.display = "flex";
            }
        });
    }

    if (btnEntendido) {
        btnEntendido.addEventListener("click", () => {
            if (modalConfirmacion) {
                modalConfirmacion.style.display = "none";
            }
        });
    }

    // 6. FILTRADO DE PLATOS POR CATEGORÍA
    const botonesFiltroDom = document.querySelectorAll(".domicilios-filtros .filtro-btn");
    const productosCard = document.querySelectorAll(".producto-card");

    if (botonesFiltroDom.length > 0) {
        botonesFiltroDom.forEach(btn => {
            btn.addEventListener("click", () => {
                botonesFiltroDom.forEach(b => b.classList.remove("activo"));
                btn.classList.add("activo");

                const cat = btn.getAttribute("data-categoria");

                productosCard.forEach(card => {
                    if (cat === "todos" || card.getAttribute("data-categoria") === cat) {
                        card.style.display = "flex";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }
});