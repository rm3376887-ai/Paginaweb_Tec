/* =========================================================
   MENÚ DESPLEGABLE PARA TELÉFONOS
   ========================================================= */

const menuToggle = document.getElementById("boton_menu");
const navbar = document.querySelector(".barra_navegacion");
const navList = document.getElementById("lista_navegacion");
const navLinks = document.querySelectorAll(".lista_navegacion a");


function closeMenu() {

    if (!menuToggle || !navbar) return;

    menuToggle.setAttribute("aria-expanded", "false");

    const menuText = menuToggle.querySelector(".texto_boton_menu");

    if (menuText) {
        menuText.textContent = "Menú";
    }

    navbar.classList.remove("is-open");
}


if (menuToggle && navbar && navList) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isOpen));

        const menuText = menuToggle.querySelector(".texto_boton_menu");

        if (menuText) {
            menuText.textContent = isOpen ? "Menú" : "Cerrar menú";
        }

        navbar.classList.toggle("is-open", !isOpen);

    });


    /* Cerrar al seleccionar una opción */

    navLinks.forEach((link) => {

        link.addEventListener("click", closeMenu);

    });


    /* Cerrar con Escape */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            navbar.classList.contains("is-open")
        ) {

            closeMenu();
            menuToggle.focus();

        }

    });


    /* Cerrar al cambiar a escritorio */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 700) {
            closeMenu();
        }

    });

}


/* =========================================================
   HERRAMIENTAS DE ACCESIBILIDAD
   ========================================================= */

const increaseTextButton = document.getElementById("aumentar_texto");
const resetTextButton = document.getElementById("restablecer_texto");
const decreaseTextButton = document.getElementById("disminuir_texto");

const contrastButton = document.getElementById("alternar_contraste");
const motionButton = document.getElementById("alternar_movimiento");


/* Tamaño de letra */

let fontScale = 1;

const minimumFontScale = 0.8;
const maximumFontScale = 1.3;


function updateFontSize() {

    document.documentElement.style.setProperty(
        "--font-scale",
        fontScale.toFixed(2)
    );

}


/* Aumentar letra */

if (increaseTextButton) {

    increaseTextButton.addEventListener("click", () => {

        fontScale = Math.min(
            maximumFontScale,
            fontScale + 0.1
        );

        updateFontSize();

    });

}


/* Restablecer letra */

if (resetTextButton) {

    resetTextButton.addEventListener("click", () => {

        fontScale = 1;

        updateFontSize();

    });

}


/* Disminuir letra */

if (decreaseTextButton) {

    decreaseTextButton.addEventListener("click", () => {

        fontScale = Math.max(
            minimumFontScale,
            fontScale - 0.1
        );

        updateFontSize();

    });

}


/* =========================================================
   ALTO CONTRASTE
   ========================================================= */

if (contrastButton) {

    contrastButton.addEventListener("click", () => {

        const enabled =
            document.documentElement.classList.toggle("alto_contraste");

        contrastButton.setAttribute(
            "aria-pressed",
            String(enabled)
        );

        contrastButton.setAttribute(
            "aria-label",
            enabled
                ? "Desactivar alto contraste"
                : "Activar alto contraste"
        );

    });

}


        /* =====================================================
           CARRUSEL AUTOMÁTICO DE LA GALERÍA
           ===================================================== */

        const galleryTrack = document.getElementById("pista_galeria");
        const galleryCounter = document.getElementById("contador_galeria");
        const galleryPrev = document.getElementById("anterior_galeria");
        const galleryNext = document.getElementById("siguiente_galeria");
        const galleryDots = document.querySelectorAll(".puntos_galeria button");
        const galleryPause = document.getElementById("pausa_galeria");

        let galleryIndex = 0;
        const galleryTotal = galleryTrack.children.length;
        let galleryTimer = null;
        let galleryPausado = false;

        // Mostrar la imagen indicada y actualizar el contador y los puntos.
        function mostrarImagen(indice) {
            galleryIndex = (indice + galleryTotal) % galleryTotal;

            galleryTrack.style.transform = `translateX(-${galleryIndex * 100}%)`;
            galleryCounter.textContent = `Imagen ${galleryIndex + 1} de ${galleryTotal}`;

            galleryDots.forEach(function (boton, i) {
                if (i === galleryIndex) {
                    boton.setAttribute("aria-current", "true");
                } else {
                    boton.removeAttribute("aria-current");
                }
            });
        }

        // Detener el temporizador automático.
        function detenerCarrusel() {
            clearInterval(galleryTimer);
            galleryTimer = null;
        }

        // Avanzar una imagen cada cinco segundos.
        function iniciarCarrusel() {
            detenerCarrusel();

            const movimientoReducido =
                document.body.classList.contains("reducir_movimiento") ||
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (galleryPausado || movimientoReducido) {
                return;
            }

            galleryTimer = setInterval(function () {
                mostrarImagen(galleryIndex + 1);
            }, 5000);
        }

        // Botón anterior.
        galleryPrev.addEventListener("click", function () {
            mostrarImagen(galleryIndex - 1);
            iniciarCarrusel();
        });

        // Botón siguiente.
        galleryNext.addEventListener("click", function () {
            mostrarImagen(galleryIndex + 1);
            iniciarCarrusel();
        });

        // Indicadores inferiores.
        galleryDots.forEach(function (boton) {
            boton.addEventListener("click", function () {
                mostrarImagen(Number(boton.dataset.slide));
                iniciarCarrusel();
            });
        });

        // Botón para pausar o reanudar el carrusel.
        galleryPause.addEventListener("click", function () {
            galleryPausado = !galleryPausado;

            galleryPause.textContent = galleryPausado ? "Reanudar" : "Pausar";
            galleryPause.setAttribute("aria-pressed", galleryPausado);

            if (galleryPausado) {
                detenerCarrusel();
            } else {
                iniciarCarrusel();
            }
        });

        // Iniciar mostrando la primera imagen.
        mostrarImagen(0);
        iniciarCarrusel();

/* Reducir o reactivar las animaciones. */
if (motionButton) {
    motionButton.addEventListener("click", () => {
        const activado = document.body.classList.toggle("reducir_movimiento");
        motionButton.setAttribute("aria-pressed", String(activado));
        motionButton.textContent = activado ? "Activar animaciones" : "Reducir movimiento";

        if (activado) {
            detenerCarrusel();
        } else {
            iniciarCarrusel();
        }
    });
}
