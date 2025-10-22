document.addEventListener('DOMContentLoaded', function() {
    // Datos de los cursos
    const courses = [
        {
            id: 1,
            title: "Animales para Niños",
            level: "Principiante",
            duration: "05:30",
            videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        },
        {
            id: 2,
            title: "Canción de los Números",
            level: "Principiante",
            duration: "04:15",
            videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        },
        {
            id: 3,
            title: "Fonética ABC",
            level: "Principiante",
            duration: "06:20",
            videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        },
        {
            id: 4,
            title: "Frutas y Verduras",
            level: "Intermedio",
            duration: "07:45",
            videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        },
        {
            id: 5,
            title: "Rutinas Diarias",
            level: "Intermedio",
            duration: "05:50",
            videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        },
    ];

    // Variables de estado
    let mainVideo = null;
    let isPlaying = false;
    let isScreenBlocked = false;
    let coursesLoaded = false;
    let courseVideoRefs = new Map();

    // Referencias a elementos del DOM
    const mainVideoElement = document.getElementById('mainVideo');
    const playButton = document.getElementById('playButton');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const currentTimeElement = document.getElementById('currentTime');
    const durationElement = document.getElementById('duration');
    const remainingTimeElement = document.getElementById('remainingTime');
    const courseTitleElement = document.getElementById('courseTitle');
    const courseLevelElement = document.getElementById('courseLevel');
    const playerContainer = document.getElementById('playerContainer');
    const courseList = document.getElementById('courseList');
    const blockerOverlay = document.getElementById('blockerOverlay');
    const timerElement = document.querySelector('.timer');
    const carouselNav = document.querySelector('.carousel-nav');

    // Inicializar el video principal con el primer curso
    function initializeMainVideo() {
        if (courses.length > 0) {
            mainVideo = courses[0];
            updateMainVideo();
        }
    }

    // Actualizar el video principal
    function updateMainVideo() {
        if (!mainVideo) return;
        
        mainVideoElement.src = mainVideo.videoUrl;
        courseTitleElement.textContent = mainVideo.title;
        courseLevelElement.textContent = mainVideo.level;
        courseLevelElement.classList.remove('d-none');
        
        if (mainVideo.level === "Intermedio") {
            courseLevelElement.classList.add('intermediate');
        } else {
            courseLevelElement.classList.remove('intermediate');
        }
        
        // Intentar reproducir automáticamente
        mainVideoElement.play().catch(error => {
            console.error("La reproducción automática fue prevenida:", error);
        });
    }

    // Formatear el tiempo en MM:SS
    function formatTime(timeInSeconds) {
        if (isNaN(timeInSeconds)) return "00:00";
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    // Manejar el evento de reproducción/pausa
    function handlePlayPause() {
        if (isPlaying) {
            mainVideoElement.pause();
        } else {
            mainVideoElement.play();
        }
    }

    // Actualizar el tiempo actual del video
    function handleTimeUpdate() {
        currentTimeElement.textContent = formatTime(mainVideoElement.currentTime);
    }

    // Actualizar la duración del video
    function handleLoadedMetadata() {
        durationElement.textContent = formatTime(mainVideoElement.duration);
    }

    // Manejar el modo de pantalla completa
    function handleFullscreen() {
        if (!document.fullscreenElement) {
            playerContainer.requestFullscreen().catch(err => {
                console.error(`Error al intentar activar el modo de pantalla completa: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // Seleccionar un curso
    function handleCourseClick(course) {
        mainVideo = course;
        updateMainVideo();
    }

    // Crear las tarjetas de cursos
    function createCourseCards() {
        courseList.innerHTML = '';
        
        courses.forEach((course, index) => {
            const card = document.createElement('div');
            card.className = 'course-card';
            card.style.animationDelay = `${index * 0.1}s`;
            
            const imageContainer = document.createElement('div');
            imageContainer.className = 'course-image';
            
            const video = document.createElement('video');
            video.src = course.videoUrl;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = 'metadata';
            
            courseVideoRefs.set(course.id, video);
            imageContainer.appendChild(video);
            
            const infoContainer = document.createElement('div');
            infoContainer.className = 'course-info';
            
            const title = document.createElement('h3');
            title.className = 'course-name';
            title.textContent = course.title;
            
            const meta = document.createElement('div');
            meta.className = 'course-meta';
            
            const level = document.createElement('span');
            level.className = 'level';
            if (course.level === "Intermedio") {
                level.classList.add('intermediate');
            }
            level.textContent = course.level;
            
            const duration = document.createElement('span');
            duration.className = 'duration';
            duration.textContent = course.duration;
            
            meta.appendChild(level);
            meta.appendChild(duration);
            
            infoContainer.appendChild(title);
            infoContainer.appendChild(meta);
            
            card.appendChild(imageContainer);
            card.appendChild(infoContainer);
            
            // Event listeners
            card.addEventListener('click', () => handleCourseClick(course));
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
                const video = courseVideoRefs.get(course.id);
                if (video) {
                    video.play();
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                const video = courseVideoRefs.get(course.id);
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
            
            courseList.appendChild(card);
        });
    }

    // Configurar el temporizador
    function setupTimer() {
        const storedEndTime = localStorage.getItem("videoAppEndTime");
        const now = new Date().getTime();
        let endTime;
        
        if (storedEndTime && parseInt(storedEndTime) > now) {
            endTime = parseInt(storedEndTime);
        } else {
            // 10 minutos desde ahora
            endTime = now + 10 * 60 * 1000;
            localStorage.setItem("videoAppEndTime", String(endTime));
        }
        
        const updateRemainingTime = () => {
            const currentTime = new Date().getTime();
            const timeLeft = Math.max(0, endTime - currentTime);
            const minutes = Math.floor(timeLeft / 1000 / 60);
            const seconds = Math.floor((timeLeft / 1000) % 60);
            const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            
            remainingTimeElement.textContent = formattedTime;
            
            if (timeLeft === 0) {
                timerElement.classList.add('expired');
                isScreenBlocked = true;
                blockerOverlay.classList.remove('d-none');
                if (mainVideoElement) mainVideoElement.pause();
                clearInterval(countdown);
            }
        };
        
        updateRemainingTime();
        const countdown = setInterval(updateRemainingTime, 1000);
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Eventos del video principal
        mainVideoElement.addEventListener('play', () => {
            isPlaying = true;
            playButton.classList.add('playing');
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });
        
        mainVideoElement.addEventListener('pause', () => {
            isPlaying = false;
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            playButton.classList.remove('playing');
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
        
        mainVideoElement.addEventListener('timeupdate', handleTimeUpdate);
        mainVideoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
        
        // Eventos de los botones
        playButton.addEventListener('click', handlePlayPause);
        playPauseBtn.addEventListener('click', handlePlayPause);
        fullscreenBtn.addEventListener('click', handleFullscreen);
        
        // Evento de navegación del carrusel
        carouselNav.addEventListener('click', () => {
            courseList.scrollBy({
                left: 220,
                behavior: 'smooth'
            });
        });
    }

    // Inicializar la aplicación
    function initApp() {
        initializeMainVideo();
        createCourseCards();
        setupTimer();
        setupEventListeners();
        
        // Simular carga de cursos con retraso para animación
        setTimeout(() => {
            coursesLoaded = true;
        }, 300);
    }

    // Iniciar la aplicación
    initApp();
});