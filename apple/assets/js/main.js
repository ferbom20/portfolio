// Asegúrate de registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // Animación para el Hero Section (opcional, podrías añadir algo aquí si quieres)
    gsap.to(".hero-background-image", {
        yPercent: 10, // Mover la imagen ligeramente hacia abajo mientras haces scroll
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
        }
    });

    // Animación de las líneas de texto en la segunda sección
    const lines = document.querySelectorAll('.animated-line');

    lines.forEach((line, index) => {
        gsap.to(line, {
            color: '#ffffff', // Color blanco al animarse
            opacity: 1,       // Opacidad completa al animarse
            ease: "power1.inOut", // Curva de easing suave

            scrollTrigger: {
                trigger: line,
                start: "top center+=10%", // Cuando la parte superior de la línea entra en el centro de la ventana + un offset
                end: "bottom center-=10%", // Cuando la parte inferior de la línea sale del centro de la ventana - un offset
                scrub: true, // Vincula la animación al scroll
                // markers: true, // Descomentar para ver los marcadores de ScrollTrigger (útil para depurar)
                onUpdate: self => {
                    // Si la línea está activa (dentro de los límites del trigger)
                    if (self.isActive) {
                        //console.log(`Line ${index} is active`);
                    } else {
                        // Si la línea no está activa (fuera de los límites del trigger),
                        // la animación de scrub se encargará de revertir el estado automáticamente
                        // al valor inicial definido en el CSS.
                    }
                }
            }
        });
    });


    // Animación de la sección de separación de teléfonos
    const phoneSplitTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".phone-split-section",
            start: "top bottom", // Cuando la parte superior del trigger llega a la parte inferior del viewport
            end: "bottom center", // Puedes ajustar el "end" si la animación se siente muy rápida o lenta
            scrub: true,
            //markers: true, // ¡Descomenta esto para depurar!
            toggleActions: "play reverse play reverse",
        }
    });

    // Animación de separación de los teléfonos (el contenedor se mueve)
    phoneSplitTimeline.to(".left-phone", {
        x: "-30%", // Mueve el contenedor izquierdo. Ajusta este porcentaje.
        ease: "power1.inOut",
    }, "startSplit"); // Etiqueta para sincronización

    phoneSplitTimeline.to(".right-phone", {
        x: "30%", // Mueve el contenedor derecho. Ajusta este porcentaje.
        ease: "power1.inOut",
    }, "startSplit"); // Misma etiqueta para sincronizar

    // Animación de opacidad del texto (ahora individual para cada lado)
    phoneSplitTimeline.to(".left-phone-info", { // Usa la nueva clase específica
        opacity: 1,
        ease: "power1.inOut",
    }, "startSplit"); // Que empiece al mismo tiempo que los teléfonos se separan

    phoneSplitTimeline.to(".right-phone-info", { // Usa la nueva clase específica
        opacity: 1,
        ease: "power1.inOut",
    }, "startSplit"); // Que empiece al mismo tiempo que los teléfonos se separan

    // Animación del tagline
    phoneSplitTimeline.fromTo(".section-tagline", { opacity: 0, y: 20 }, {
        opacity: 1,
        y: 0,
        ease: "power1.inOut",
    }, "startSplit+=0.2"); // Que aparezca un poco después


    // Lógica para la sección de Carrusel de Colores
    const colorDots = document.querySelectorAll('.color-dot');
    const iphoneImages = document.querySelectorAll('.color-iphone-image');
    const iphoneZoomImages = document.querySelectorAll('.color-iphone-zoom-image');
    const selectedColorName = document.querySelector('.selected-color-name');

    // Función para actualizar el carrusel
    function updateCarousel(selectedColor) {
        // Remover clase 'active' de todos los dots y imágenes
        colorDots.forEach(dot => dot.classList.remove('active'));
        iphoneImages.forEach(img => img.classList.remove('active'));
        iphoneZoomImages.forEach(img => img.classList.remove('active'));
        selectedColorName.classList.remove('underline'); // Quitar subrayado

        // Añadir clase 'active' al dot y las imágenes correspondientes
        const activeDot = document.querySelector(`.color-dot[data-color="${selectedColor}"]`);
        const activeImage = document.querySelector(`.color-iphone-image[data-color="${selectedColor}"]`);
        const activeZoomImage = document.querySelector(`.color-iphone-zoom-image[data-color="${selectedColor}"]`);

        if (activeDot) {
            activeDot.classList.add('active');
            selectedColorName.textContent = activeDot.dataset.fullName; // Actualiza el texto
            gsap.to(selectedColorName, {
                duration: 0.3,
                ease: "power1.inOut",
                onComplete: () => selectedColorName.classList.add('underline') // Añadir subrayado después de un breve delay
            });
        }
        if (activeImage) activeImage.classList.add('active');
        if (activeZoomImage) activeZoomImage.classList.add('active');
    }

    // Añadir event listeners a los dots
    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const selectedColor = dot.dataset.color;
            updateCarousel(selectedColor);
        });
    });

    // Opcional: GSAP para alguna animación al cargar la sección o al hacer scroll
    // Por ejemplo, que la sección de carrusel aparezca con un fade-in
    gsap.from(".color-carousel-section", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".color-carousel-section",
            start: "top center+=100", // Cuando la sección empieza a ser visible
            // markers: true,
            toggleActions: "play none none none"
        }
    });

    // Inicializar el carrusel con el primer color activo al cargar la página
    updateCarousel('alpine-green'); // O el color que desees que sea el predeterminado


    gsap.from(".side-panel-section", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".side-panel-section",
            start: "top center+=100", // Cuando la sección empieza a ser visible
            // markers: true,
            toggleActions: "play none none none"
        }
    });

    gsap.from(".ceramic-shield-section", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".ceramic-shield-section",
            start: "top center+=100", // Cuando la sección empieza a ser visible
            // markers: true,
            toggleActions: "play none none none"
        }
    });

    const videoFrameSection = document.querySelector('.video-frame-section');
    const videoFrameContainer = document.querySelector('.video-frame-container');
    const cinematicVideo = document.querySelector('.cinematic-video');
    const iphoneFrame = document.querySelector('.iphone-frame-image');

    // Crearemos una línea de tiempo para la animación del video
    const videoShrinkTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: videoFrameSection,
            start: "top top", // Cuando la parte superior de la sección llega a la parte superior del viewport
            end: "bottom top", // Cuando la parte inferior de la sección llega a la parte superior del viewport
            scrub: true, // Animación vinculada al scroll
            //pin: videoFrameContainer, // Fija el contenedor del video mientras dura la animación
            pinSpacing: false, // Desactiva el espacio extra que ScrollTrigger añade si no lo necesitas
            // markers: true, // Descomentar para depurar
        }
    });

    // Animación de escala del contenedor del video
    videoShrinkTimeline.to(videoFrameContainer, {
        scale: 0.9, // Escala a 60% de su tamaño original. Ajusta este valor.
        borderRadius: "50px", // Redondea las esquinas para simular la pantalla del iPhone
        ease: "power1.inOut",
        duration: 1 // La duración en la línea de tiempo (no en segundos reales)
    });

    // Animación de la opacidad del video (para que la imagen del marco se vea mejor)
    videoShrinkTimeline.to(cinematicVideo, {
        opacity: 0.88, // Baja un poco la opacidad para que el marco se vea mejor
        scale: 0.4, // Escala a 60% de su tamaño original. Ajusta este valor.
        marginTop: "30px", // Ajusta el margen superior para centrarlo mejor
        ease: "power1.inOut",
    }, "<"); // Empieza al mismo tiempo que la animación de escala

    // Si la imagen del marco no tiene la relación de aspecto correcta, puedes escalarla también
    videoShrinkTimeline.to(iphoneFrame, {
        scale: 1, // Escala la imagen del marco si no es 100% de lo que quieres
        ease: "power1.inOut",
    }, "<");

    // Animación de entrada para el contenido de texto (opcional)
    gsap.from(".video-section-content h2, .video-section-content p, .learn-more-btn", {
        opacity: 0,
        y: 50,
        stagger: 0.2, // Retraso entre la aparición de cada elemento
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".video-section-content",
            start: "top 80%", // Cuando la parte superior del contenido entra en el 80% del viewport
            //markers: true,
            toggleActions: "play none none none"
        }
    });
});
