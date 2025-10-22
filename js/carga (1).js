document.addEventListener('DOMContentLoaded', function() {
    // Variables de estado
    let file = null;
    let error = null;
    let isDragging = false;
    
    // Referencias a elementos del DOM
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFileBtn');
    const errorMessage = document.getElementById('errorMessage');
    const fileInfo = document.getElementById('fileInfo');
    const getCodeBtn = document.getElementById('getCodeBtn');
    
    // Manejar la selección de archivo
    function handleFileSelect(selectedFile) {
        // Validar tipo de archivo
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(selectedFile.type)) {
            showError('Tipo de archivo inválido. Por favor sube JPG, PNG o GIF.');
            return;
        }
        
        // Validar tamaño de archivo (5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB en bytes
        if (selectedFile.size > maxSize) {
            showError('El tamaño del archivo excede el límite de 5MB.');
            return;
        }
        
        // Limpiar errores anteriores
        clearError();
        file = selectedFile;
        showFileInfo(file.name);
    }
    
    // Manejar el cambio en el input de archivo
    function handleFileInputChange(e) {
        if (e.target.files && e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    }
    
    // Manejar eventos de arrastrar y soltar
    function handleDragOver(e) {
        e.preventDefault();
        if (!isDragging) {
            isDragging = true;
            dropZone.classList.add('dragging');
        }
    }
    
    function handleDragLeave() {
        isDragging = false;
        dropZone.classList.remove('dragging');
    }
    
    function handleDrop(e) {
        e.preventDefault();
        isDragging = false;
        dropZone.classList.remove('dragging');
        
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    }
    
    // Activar el click en el input de archivo
    function handleSelectFileClick() {
        fileInput.click();
    }
    
    // Manejar la obtención del código del componente
    function handleGetComponentCode() {
        // En una aplicación real, esto descargaría o mostraría el código fuente
        alert('El código del componente se descargaría aquí');
    }
    
    // Mostrar mensaje de error
    function showError(message) {
        error = message;
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        fileInfo.style.display = 'none';
    }
    
    // Limpiar mensaje de error
    function clearError() {
        error = null;
        errorMessage.style.display = 'none';
    }
    
    // Mostrar información del archivo
    function showFileInfo(fileName) {
        fileInfo.textContent = `Archivo seleccionado: ${fileName}`;
        fileInfo.style.display = 'block';
    }
    
    // Configurar event listeners
    function setupEventListeners() {
        // Eventos del input de archivo
        fileInput.addEventListener('change', handleFileInputChange);
        
        // Eventos del botón de selección
        selectFileBtn.addEventListener('click', handleSelectFileClick);
        
        // Eventos de arrastrar y soltar
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('dragleave', handleDragLeave);
        dropZone.addEventListener('drop', handleDrop);
        dropZone.addEventListener('click', handleSelectFileClick);
        
        // Evento del botón de obtener código
        getCodeBtn.addEventListener('click', handleGetComponentCode);
    }
    
    // Inicializar la aplicación
    function initApp() {
        setupEventListeners();
    }
    
    // Iniciar la aplicación
    initApp();
});