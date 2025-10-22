document.addEventListener('DOMContentLoaded', function() {
    // Reloj en la barra de navegación superior
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('currentTime').textContent = timeString;
    }
    
    updateTime();
    setInterval(updateTime, 60000);
    
    // Reproductor de audio
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const progressBar = document.getElementById('progressBar');
    let isPlaying = false;
    
    // Función para alternar entre reproducción y pausa
    function togglePlay() {
        if (isPlaying) {
            audioPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audioPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }
    
    // Event listener para el botón de reproducción
    playBtn.addEventListener('click', togglePlay);
    
    // Actualizar la barra de progreso mientras se reproduce
    audioPlayer.addEventListener('timeupdate', function() {
        if (audioPlayer.duration) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.value = progress;
        }
    });
    
    // Actualizar el tiempo actual cuando se cambia la barra de progreso
    progressBar.addEventListener('input', function() {
        const time = (progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = time;
    });
    
    // Manejar clic en los botones de navegación del reproductor
    document.getElementById('prevBtn').addEventListener('click', function() {
        // Lógica para ir al contenido anterior
        console.log('Previous button clicked');
    });
    
    document.getElementById('nextBtn').addEventListener('click', function() {
        // Lógica para ir al siguiente contenido
        console.log('Next button clicked');
    });
    
    // Manejar clic en el botón de empezar a aprender
    document.querySelector('.start-btn').addEventListener('click', function() {
        // Lógica para empezar a aprender
        console.log('Start learning button clicked');
    });
});