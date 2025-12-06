 // Datos iniciales
const students = [
    { id: 1, username: 'estudiante1', password: 'griego2024', name: 'Juan Pérez' },
    { id: 2, username: 'estudiante2', password: 'griego2024', name: 'María García' }
];

// Estructura de las 12 lecciones
const lessonsData = [
   // En el array lessonsData, actualiza la lección 1:
// En el array lessonsData, actualiza la lección 1:
{
    id: 1,
    title: "ALFABETO Y PRONUNCIACIÓN",
    description: "Aprende las 24 letras del alfabeto griego y su correcta pronunciación.",
    duration: "45 min",
    pages: 3, // Cambiado de 2 a 3
    content: [
        { 
            title: "Introducción al alfabeto", 
            type: "html", 
            content: `<iframe src="contenido/leccion1/alfabeto.html" style="width:100%; height:500px; border:none;"></iframe>` 
        },
        { 
            title: "Acentos y puntuación", 
            type: "html", 
            content: `<iframe src="contenido/leccion1/acentos.html" style="width:100%; height:500px; border:none;"></iframe>` 
        },
        { 
            title: "Práctica de escritura", 
            type: "html", 
            content: `<iframe src="contenido/leccion1/simulador.html" style="width:100%; height:600px; border:none;"></iframe>` 
        }
    ]
},

   // En el array lessonsData, actualiza la lección 2:
{
    id: 2,
    title: "INTRODUCCIÓN A LOS SUSTANTIVOS",
    description: "Conceptos básicos sobre los sustantivos griegos, componentes gramaticales y casos gramaticales.",
    duration: "50 min",
    pages: 2,
    content: [
        { 
            title: "Componentes del sustantivo", 
            type: "html", 
            content: `<iframe src="contenido/leccion2/sustantivos.html" style="width:100%; height:500px; border:none;"></iframe>` 
        },
        { 
            title: "Los casos gramaticales", 
            type: "html", 
            content: `<iframe src="contenido/leccion2/casos.html" style="width:100%; height:500px; border:none;"></iframe>` 
        }
    ]
},
    {
        id: 3,
        title: "DECLINACIONES Y CASOS BÁSICOS",
        description: "Introducción a las declinaciones griegas y estudio de los casos nominativo y acusativo.",
        duration: "60 min",
        pages: 3, // Aumentado de 2 a 4 páginas
        content: [
            { 
                title: "Introducción a las Declinaciones", 
                type: "html", 
                content: `<iframe src="contenido/leccion3/declinaciones.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
            { 
                title: "Los Primeros Dos Casos", 
                type: "html", 
                content: `<iframe src="contenido/leccion3/nominativo-acusativo.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
              { 
                title: "Juego de declinaciones.", 
                type: "html", 
                content: `<iframe src="contenido/leccion3/juegoDeclinaciones.html" style="width:100%; height:550px; border:none;"></iframe>` 
            }
         ] 
        },
    {
        id: 4,
        title: "SUSTANTIVOS PRIMERA DECLINACIÓN Y ARTÍCULO DEFINIDO",
        description: "Sustantivos de la primera declinación y uso del artículo definido.",
        duration: "55 min",
        pages: 3,
       content: [
            { 
                title: "Introducción al Artículo Definido", 
                type: "html", 
                content: `<iframe src="contenido/leccion4/articuloDefinido.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
            { 
                title: "Más del Artículo Definido", 
                type: "html", 
                content: `<iframe src="contenido/leccion4/articulodefinidoII.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
              { 
                title: "Más sobre sustantivos.", 
                type: "html", 
                content: `<iframe src="contenido/leccion4/sustantivos.html" style="width:100%; height:550px; border:none;"></iframe>` 
            }
         ] 
    },
    {
        id: 5,
        title: "LOS ADJETIVOS",
        description: "Uso y declinación de adjetivos en griego.",
        duration: "50 min",
        pages: 4,
        content: [
            { 
                title: "Introducción al Adjetivo", 
                type: "html", 
                content: `<iframe src="contenido/leccion5/adjetivos.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
            { 
                title: "Más del Adjetivo", 
                type: "html", 
                content: `<iframe src="contenido/leccion5/adjetivos2.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
              { 
                title: "Funciones de los adjetivos.", 
                type: "html", 
                content: `<iframe src="contenido/leccion5/funcionesAdjetivos.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
             { 
                title: "Otros detalles.", 
                type: "html", 
                content: `<iframe src="contenido/leccion5/masDetalles.html" style="width:100%; height:550px; border:none;"></iframe>` 
            }
         ] 
    },
    {
        id: 6,
        title: "PRONOMBRES PERSONALES",
        description: "Estudio de los pronombres personales en griego.",
        duration: "45 min",
        pages: 6,
        content: [
            { 
                title: "Introducción a los pronombres", 
                type: "html", 
                content: `<iframe src="contenido/leccion6/IntroPronombres.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
            { 
                title: "Más del Adjetivo", 
                type: "html", 
                content: `<iframe src="contenido/leccion5/adjetivos2.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
              { 
                title: "Funciones de los adjetivos.", 
                type: "html", 
                content: `<iframe src="contenido/leccion5/funcionesAdjetivos.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
             { 
                title: "Otros detalles.", 
                type: "html", 
                content: `<iframe src="contenido/leccion5/masDetalles.html" style="width:100%; height:550px; border:none;"></iframe>` 
            }
         ] 
    },
    {
        id: 7,
        title: "LAS PREPOSICIONES",
        description: "Preposiciones griegas y sus casos regidos.",
        duration: "55 min",
        pages: 4,
         content: [
            { 
                title: "Introducción a las preposiciones", 
                type: "html", 
                content: `<iframe src="contenido/leccion7/IntroducciónPreposiciones .html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
            { 
                title: "Más sobre preposiciones", 
                type: "html", 
                content: `<iframe src="contenido/leccion7/Más_sobre_preposiciones.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
              { 
                title: "Frase preposicional.", 
                type: "html", 
                content: `<iframe src="contenido/leccion7/Frase_preposicional.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
             { 
                title: "Tabla de las preposiciones.", 
                type: "html", 
                content: `<iframe src="contenido/leccion7/tabla_de_preposiciones.html" style="width:100%; height:550px; border:none;"></iframe>` 
            }
         ] 
    },
    {
        id: 8,
        title: "EL VERBO EIMI",
        description: "Estudio del verbo ser/estar en griego.",
        duration: "60 min",
        pages: 2,
       content: [
            { 
                title: "Verbo Eimi", 
                type: "html", 
                content: `<iframe src="contenido/leccion8/verbo_eimi.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
            { 
                title: "Más sobre preposiciones", 
                type: "html", 
                content: `<iframe src="contenido/leccion8/Nominativo_Predicativo.html" style="width:100%; height:550px; border:none;"></iframe>` 
            }
         ] 
    },
    {
        id: 9,
        title: "INTRODUCCIÓN AL VERBO GRIEGO",
        description: "Conceptos básicos del sistema verbal griego.",
        duration: "65 min",
        pages: 4,
        content: [
            { 
                title: "Introducción a los verbos griegos", 
                type: "html", 
                content: `<iframe src="contenido/leccion9/Verbos_griegos.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
            { 
                title: "Componentes básicos.", 
                type: "html", 
                content: `<iframe src="contenido/leccion9/componentes_basicos.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
              { 
                title: "Presente Activo Indicativo", 
                type: "html", 
                content: `<iframe src="contenido/leccion9/presente_activo_indicativo.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
              { 
                title: "Más sobre verbos", 
                type: "html", 
                content: `<iframe src="contenido/leccion9/mas_contenido.html" style="width:100%; height:550px; border:none;"></iframe>` 
            }
         ]
    },
    {
        id: 10,
        title: "VERBO PRESENTE MEDIO PASIVO INDICATIVO",
        description: "Conjugación del presente en voz media/pasiva.",
        duration: "70 min",
        pages: 2,
      content: [
            { 
                title: "Presente medio Pasivo Indicativo", 
                type: "html", 
                content: `<iframe src="contenido/leccion10/verbos_pasivos.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
            { 
                title: "Explicación de la voz media.", 
                type: "html", 
                content: `<iframe src="contenido/leccion10/voz_media.html" style="width:100%; height:550px; border:none;"></iframe>` 
            } 
         ]
    },
    {
        id: 11,
        title: "VERBO IMPERFECTO INDICATIVO",
        description: "Uso y conjugación del tiempo imperfecto.",
        duration: "65 min",
        pages: 5,
      content: [
            { 
                title: "Introducción al imperfecto.", 
                type: "html", 
                content: `<iframe src="contenido/leccion11/intro_imperfecto.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
            { 
                title: "Imperfecto Activo Indicativo.", 
                type: "html", 
                content: `<iframe src="contenido/leccion11/imperfecto_activo.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
             { 
                title: "Imperfecto Pasivo Indicativo.", 
                type: "html", 
                content: `<iframe src="contenido/leccion11/imperfecto_pasivo.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
             { 
                title: "Características del imperfecto.", 
                type: "html", 
                content: `<iframe src="contenido/leccion11/caracteristicas.html" style="width:100%; height:550px; border:none;"></iframe>` 
            },
             { 
                title: "Resumen.", 
                type: "html", 
                content: `<iframe src="contenido/leccion11/resumen.html" style="width:100%; height:550px; border:none;"></iframe>` 
            } 
         ]
    },
    {
        id: 12,
        title: "VERBO FUTURO ACTIVO Y MEDIO",
        description: "Conjugación del futuro en voces activa y media.",
        duration: "60 min",
        pages: 3,
        content: [
            { title: "Significado del futuro", content: "Acción que ocurrirá posteriormente." },
            { title: "Futuro activo", content: "λύσω, λύσεις, λύσει" },
            { title: "Futuro medio", content: "λύσομαι, λύσῃ, λύσεται" }
        ]
    }
];

// Variables globales
let currentUser = null;
let userProgress = null;
let currentLesson = null;
let currentPage = 0;

// Elementos del DOM
const loginPage = document.getElementById('login-page');
const dashboardPage = document.getElementById('dashboard-page');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const currentUserSpan = document.getElementById('current-user');
const welcomeMessage = document.getElementById('welcome-message');
const welcomeProgress = document.getElementById('welcome-progress');
const globalProgress = document.getElementById('global-progress');
const globalProgressBar = document.getElementById('global-progress-bar');
const completedCount = document.getElementById('completed-count');
const studyTime = document.getElementById('study-time');
const continueLessonDisplay = document.getElementById('continue-lesson-display');
const upcomingLessons = document.getElementById('upcoming-lessons');
const circleProgress = document.getElementById('circle-progress');
const progressStatus = document.getElementById('progress-status');
const activityFeed = document.getElementById('activity-feed');
const lessonsContainer = document.getElementById('lessons-container');
const detailedProgressBar = document.getElementById('detailed-progress-bar');
const detailedPercent = document.getElementById('detailed-percent');
const completedDetails = document.getElementById('completed-details');
const completedBreakdown = document.getElementById('completed-breakdown');
const inprogressBreakdown = document.getElementById('inprogress-breakdown');
const notstartedBreakdown = document.getElementById('notstarted-breakdown');
const progressTableBody = document.getElementById('progress-table-body');
const lessonModal = document.getElementById('lesson-modal');
const messageModal = document.getElementById('message-modal');
const lessonTitle = document.getElementById('lesson-title');
const currentPageSpan = document.getElementById('current-page');
const totalPagesSpan = document.getElementById('total-pages');
const lessonContentArea = document.getElementById('lesson-content-area');
const lessonProgressBar = document.getElementById('lesson-progress-bar');
const lessonProgressText = document.getElementById('lesson-progress-text');
const markCompleteBtn = document.getElementById('mark-complete-btn');
const messageTitle = document.getElementById('message-title');
const messageText = document.getElementById('message-text');
const messageCloseBtn = document.getElementById('message-close');
const navLinks = document.querySelectorAll('.nav-menu a');
const contentSections = document.querySelectorAll('.content-section');
const sidebarContinueBtn = document.getElementById('sidebar-continue');
const quizButtons = document.querySelectorAll('.btn-quiz');

// URLs de los quizzes (Google Forms)
const quizUrls = [
    "https://forms.gle/SsEB2hBppxBxhWpE9",
    "https://forms.google.com/example-quiz-4-6",
    "https://forms.google.com/example-quiz-7-9", 
    "https://forms.google.com/example-quiz-10-12"
];

// Inicialización
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Verificar si hay usuario logueado
    checkLoggedInUser();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Inicializar datos si no existen
    initStorageData();
}

function setupEventListeners() {
    // Login
    loginForm.addEventListener('submit', handleLogin);
    
    // Logout
    logoutBtn.addEventListener('click', handleLogout);
    
    // Navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Actualizar clase activa
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });
    
    // Continuar estudiando desde sidebar
    sidebarContinueBtn.addEventListener('click', continueLearning);
    
    // Quiz buttons
    quizButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled) {
                const quizNum = parseInt(this.getAttribute('data-quiz') || '1');
                takeQuiz(quizNum);
            }
        });
    });
    
    // Navegación en lección
    document.querySelector('.btn-nav.prev').addEventListener('click', goToPrevPage);
    document.querySelector('.btn-nav.next').addEventListener('click', goToNextPage);
    
    // Marcar lección como completada
    markCompleteBtn.addEventListener('click', markLessonComplete);
    
    // Cerrar modales
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            hideModal(modal);
        });
    });
    
    messageCloseBtn.addEventListener('click', () => hideModal(messageModal));
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target);
        }
    });
    
    // Círculo de progreso animado
    const progressCircle = document.getElementById('progress-circle-svg');
    if (progressCircle) {
        // Esta función se llama cuando se actualiza el progreso
        updateProgressCircle = function(percent) {
            const circumference = 339.292;
            const offset = circumference - (percent / 100 * circumference);
            progressCircle.style.strokeDashoffset = offset;
        };
    }
}

function initStorageData() {
    // Inicializar datos de progreso si no existen
    if (!localStorage.getItem('greekCourseProgress')) {
        const initialProgress = {
            students: {},
            lessons: lessonsData.map(lesson => ({
                id: lesson.id,
                completed: false,
                currentPage: 0,
                lastAccessed: null,
                timeSpent: 0
            })),
            activities: []
        };
        localStorage.setItem('greekCourseProgress', JSON.stringify(initialProgress));
    }
}

function checkLoggedInUser() {
    const userData = localStorage.getItem('currentUser');
    
    if (userData) {
        currentUser = JSON.parse(userData);
        userProgress = getUserProgress(currentUser.id);
        showDashboard();
    } else {
        showLogin();
    }
}

function getUserProgress(userId) {
    const progressData = JSON.parse(localStorage.getItem('greekCourseProgress'));
    
    if (!progressData.students[userId]) {
        progressData.students[userId] = {
            lessons: lessonsData.map(lesson => ({
                id: lesson.id,
                completed: false,
                currentPage: 0,
                lastAccessed: null,
                timeSpent: 0
            })),
            totalTime: 0,
            lastLogin: new Date().toISOString()
        };
        localStorage.setItem('greekCourseProgress', JSON.stringify(progressData));
    }
    
    return progressData.students[userId];
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const student = students.find(s => 
        s.username === username && s.password === password
    );
    
    if (student) {
        currentUser = student;
        userProgress = getUserProgress(student.id);
        
        // Guardar usuario en localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Registrar actividad
        addActivity('Inició sesión en el sistema');
        
        // Mostrar dashboard
        showDashboard();
        
        showMessage('¡Bienvenido!', `Hola ${student.name}, has iniciado sesión correctamente.`);
    } else {
        showMessage('Error de acceso', 'Usuario o contraseña incorrectos. Intenta con: estudiante1 / griego2024');
    }
}

function handleLogout() {
    // Registrar actividad
    addActivity('Cerró sesión');
    
    // Limpiar usuario actual
    localStorage.removeItem('currentUser');
    currentUser = null;
    userProgress = null;
    
    // Mostrar login
    showLogin();
    
    showMessage('Sesión cerrada', 'Has salido del sistema correctamente. ¡Vuelve pronto!');
}

function showLogin() {
    loginPage.classList.add('active');
    dashboardPage.classList.remove('active');
    loginForm.reset();
}

function showDashboard() {
    loginPage.classList.remove('active');
    dashboardPage.classList.add('active');
    
    // Actualizar información del usuario
    currentUserSpan.textContent = currentUser.name;
    welcomeMessage.textContent = `Bienvenido, ${currentUser.name}`;
    
    // Calcular y mostrar progreso
    updateProgressDisplay();
    
    // Actualizar dashboard
    updateDashboard();
    
    // Mostrar sección de inicio
    showSection('dashboard');
}

function updateProgressDisplay() {
    // Calcular progreso general
    const completedLessons = userProgress.lessons.filter(l => l.completed).length;
    const totalLessons = lessonsData.length;
    const progressPercent = Math.round((completedLessons / totalLessons) * 100);
    
    // Actualizar elementos de progreso
    globalProgress.textContent = `${progressPercent}%`;
    globalProgressBar.style.width = `${progressPercent}%`;
    welcomeProgress.textContent = `${progressPercent}%`;
    completedCount.textContent = completedLessons;
    
    // Calcular tiempo de estudio (simulado)
    const totalTime = userProgress.totalTime || 0;
    const hours = Math.floor(totalTime / 60);
    studyTime.textContent = `${hours}h`;
    
    // Actualizar círculo de progreso
    circleProgress.textContent = `${progressPercent}%`;
    if (typeof updateProgressCircle === 'function') {
        updateProgressCircle(progressPercent);
    }
    
    // Actualizar texto de estado
    if (progressPercent === 0) {
        progressStatus.textContent = 'Comienza con la Lección 1';
    } else if (progressPercent < 25) {
        progressStatus.textContent = '¡Vas por buen camino!';
    } else if (progressPercent < 50) {
        progressStatus.textContent = '¡Sigue así!';
    } else if (progressPercent < 75) {
        progressStatus.textContent = '¡Más de la mitad!';
    } else if (progressPercent < 100) {
        progressStatus.textContent = '¡Casi terminas!';
    } else {
        progressStatus.textContent = '¡Curso completado!';
    }
    
    return {
        percent: progressPercent,
        completed: completedLessons,
        total: totalLessons
    };
}

function updateDashboard() {
    const progress = updateProgressDisplay();
    
    // Actualizar "Continuar Aprendiendo"
    updateContinueLearning();
    
    // Actualizar próximas lecciones
    updateUpcomingLessons();
    
    // Actualizar actividad reciente
    updateActivityFeed();
    
    // Actualizar sección de lecciones
    updateLessonsSection();
    
    // Actualizar sección de progreso
    updateProgressSection();
}

function updateContinueLearning() {
    // Encontrar la primera lección no completada
    let nextLesson = null;
    
    for (let i = 0; i < userProgress.lessons.length; i++) {
        const lessonProgress = userProgress.lessons[i];
        if (!lessonProgress.completed) {
            nextLesson = lessonsData[i];
            break;
        }
    }
    
    if (nextLesson) {
        const lessonProgress = userProgress.lessons[nextLesson.id - 1];
        const pagesRead = lessonProgress.currentPage;
        const totalPages = nextLesson.pages;
        const pageProgress = Math.round((pagesRead / totalPages) * 100);
        
        continueLessonDisplay.innerHTML = `
            <div style="display: flex; align-items: center; gap: 20px;">
                <div style="flex: 1;">
                    <h4 style="margin-bottom: 5px;">Lección ${nextLesson.id}: ${nextLesson.title}</h4>
                    <p style="color: #666; margin-bottom: 10px;">${nextLesson.description}</p>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="flex: 1; background: #eee; height: 8px; border-radius: 4px;">
                            <div style="width: ${pageProgress}%; background: #3498db; height: 100%; border-radius: 4px;"></div>
                        </div>
                        <span style="font-size: 14px; color: #666;">${pageProgress}%</span>
                    </div>
                </div>
                <button class="btn-start-lesson" onclick="startLesson(${nextLesson.id})" style="white-space: nowrap;">
                    <i class="fas fa-play"></i> Continuar
                </button>
            </div>
        `;
    } else {
        continueLessonDisplay.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <i class="fas fa-trophy" style="font-size: 48px; color: #f39c12; margin-bottom: 15px;"></i>
                <h4>¡Curso Completado!</h4>
                <p>Has terminado todas las lecciones. ¡Felicidades!</p>
            </div>
        `;
    }
}

function updateUpcomingLessons() {
    upcomingLessons.innerHTML = '';
    
    // Mostrar próximas 3 lecciones no completadas
    let count = 0;
    
    for (let i = 0; i < userProgress.lessons.length && count < 3; i++) {
        const lessonProgress = userProgress.lessons[i];
        const lesson = lessonsData[i];
        
        if (!lessonProgress.completed) {
            const li = document.createElement('li');
            let statusText, statusClass;
            
            if (lessonProgress.currentPage > 0) {
                statusText = 'En progreso';
                statusClass = 'status-inprogress';
            } else {
                statusText = 'No iniciada';
                statusClass = 'status-notstarted';
            }
            
            li.innerHTML = `
                <span>Lección ${lesson.id}: ${lesson.title.substring(0, 20)}...</span>
                <span class="lesson-status ${statusClass}">${statusText}</span>
            `;
            
            li.addEventListener('click', () => startLesson(lesson.id));
            li.style.cursor = 'pointer';
            
            upcomingLessons.appendChild(li);
            count++;
        }
    }
    
    if (count === 0) {
        upcomingLessons.innerHTML = `
            <li style="text-align: center; color: #666; padding: 20px;">
                Todas las lecciones están completadas
            </li>
        `;
    }
}

function updateActivityFeed() {
    const progressData = JSON.parse(localStorage.getItem('greekCourseProgress'));
    const activities = progressData.activities || [];
    
    // Filtrar actividades del usuario actual (últimas 5)
    const userActivities = activities
        .filter(activity => activity.userId === currentUser.id)
        .slice(0, 5);
    
    activityFeed.innerHTML = '';
    
    if (userActivities.length === 0) {
        activityFeed.innerHTML = `
            <div class="activity-item">
                <i class="fas fa-info-circle"></i>
                <div>
                    <p>No hay actividad reciente</p>
                    <small>Comienza una lección para ver actividad aquí</small>
                </div>
            </div>
        `;
        return;
    }
    
    userActivities.forEach(activity => {
        const div = document.createElement('div');
        div.className = 'activity-item';
        
        let icon = 'fas fa-check-circle';
        if (activity.type === 'login') icon = 'fas fa-sign-in-alt';
        if (activity.type === 'lesson_start') icon = 'fas fa-book-open';
        if (activity.type === 'lesson_complete') icon = 'fas fa-trophy';
        if (activity.type === 'quiz') icon = 'fas fa-clipboard-check';
        
        div.innerHTML = `
            <i class="${icon}"></i>
            <div>
                <p>${activity.message}</p>
                <small>${formatTime(activity.timestamp)}</small>
            </div>
        `;
        
        activityFeed.appendChild(div);
    });
}

function addActivity(message, type = 'general') {
    const progressData = JSON.parse(localStorage.getItem('greekCourseProgress'));
    
    if (!progressData.activities) {
        progressData.activities = [];
    }
    
    progressData.activities.unshift({
        userId: currentUser.id,
        message: message,
        type: type,
        timestamp: new Date().toISOString()
    });
    
    // Mantener solo las 50 actividades más recientes
    if (progressData.activities.length > 50) {
        progressData.activities = progressData.activities.slice(0, 50);
    }
    
    localStorage.setItem('greekCourseProgress', JSON.stringify(progressData));
}

function formatTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) {
        return 'Hace unos segundos';
    } else if (diffMins < 60) {
        return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
    } else if (diffHours < 24) {
        return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    } else if (diffDays === 1) {
        return 'Ayer';
    } else if (diffDays < 7) {
        return `Hace ${diffDays} días`;
    } else {
        return date.toLocaleDateString('es-ES');
    }
}

function showSection(sectionId) {
    // Ocultar todas las secciones
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    document.getElementById(`${sectionId}-section`).classList.add('active');
    
    // Actualizar contenido específico si es necesario
    if (sectionId === 'lessons') {
        updateLessonsSection();
    } else if (sectionId === 'progress') {
        updateProgressSection();
    }
}

function updateLessonsSection() {
    lessonsContainer.innerHTML = '';
    
    lessonsData.forEach(lesson => {
        const lessonProgress = userProgress.lessons[lesson.id - 1];
        
        const card = document.createElement('div');
        card.className = 'lesson-card';
        
        let statusText, statusClass, buttonText, buttonIcon;
        
        if (lessonProgress.completed) {
            statusText = 'Completada';
            statusClass = 'status-completed';
            buttonText = 'Repasar Lección';
            buttonIcon = 'fas fa-redo';
        } else if (lessonProgress.currentPage > 0) {
            statusText = 'En progreso';
            statusClass = 'status-inprogress';
            buttonText = 'Continuar';
            buttonIcon = 'fas fa-play-circle';
        } else {
            statusText = 'No iniciada';
            statusClass = 'status-notstarted';
            buttonText = 'Comenzar';
            buttonIcon = 'fas fa-play';
        }
        
        card.innerHTML = `
            <div class="lesson-header">
                <span class="lesson-number">Lección ${lesson.id}</span>
                <span class="lesson-status ${statusClass}">${statusText}</span>
            </div>
            <div class="lesson-content">
                <h3>${lesson.title}</h3>
                <p>${lesson.description}</p>
                <div class="lesson-meta">
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${lesson.duration}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-file"></i>
                        <span>${lesson.pages} páginas</span>
                    </div>
                </div>
                <button class="btn-start-lesson" onclick="startLesson(${lesson.id})">
                    <i class="${buttonIcon}"></i> ${buttonText}
                </button>
            </div>
        `;
        
        lessonsContainer.appendChild(card);
    });
}

function updateProgressSection() {
    const progress = updateProgressDisplay();
    
    // Actualizar barra de progreso detallada
    detailedProgressBar.style.width = `${progress.percent}%`;
    detailedPercent.textContent = `${progress.percent}%`;
    completedDetails.textContent = `${progress.completed}/${progress.total} lecciones`;
    
    // Calcular breakdown por estado
    let completed = 0, inProgress = 0, notStarted = 0;
    
    userProgress.lessons.forEach(lesson => {
        if (lesson.completed) {
            completed++;
        } else if (lesson.currentPage > 0) {
            inProgress++;
        } else {
            notStarted++;
        }
    });
    
    completedBreakdown.textContent = completed;
    inprogressBreakdown.textContent = inProgress;
    notstartedBreakdown.textContent = notStarted;
    
    // Actualizar tabla
    updateProgressTable();
}

function updateProgressTable() {
    progressTableBody.innerHTML = '';
    
    lessonsData.forEach(lesson => {
        const lessonProgress = userProgress.lessons[lesson.id - 1];
        const row = document.createElement('tr');
        
        let statusText, statusClass, lastAccess, actionButton;
        
        if (lessonProgress.completed) {
            statusText = 'Completada';
            statusClass = 'status-completed-cell';
            lastAccess = lessonProgress.lastAccessed ? formatTime(lessonProgress.lastAccessed) : 'Nunca';
            actionButton = `<button class="btn-action" onclick="startLesson(${lesson.id})">Repasar</button>`;
        } else if (lessonProgress.currentPage > 0) {
            statusText = 'En progreso';
            statusClass = 'status-inprogress-cell';
            lastAccess = lessonProgress.lastAccessed ? formatTime(lessonProgress.lastAccessed) : 'Nunca';
            actionButton = `<button class="btn-action" onclick="startLesson(${lesson.id})">Continuar</button>`;
        } else {
            statusText = 'No iniciada';
            statusClass = 'status-notstarted-cell';
            lastAccess = 'Nunca';
            actionButton = `<button class="btn-action" onclick="startLesson(${lesson.id})">Comenzar</button>`;
        }
        
        row.innerHTML = `
            <td>${lesson.id}</td>
            <td>${lesson.title}</td>
            <td><span class="${statusClass}">${statusText}</span></td>
            <td>${lastAccess}</td>
            <td>${actionButton}</td>
        `;
        
        progressTableBody.appendChild(row);
    });
}

function startLesson(lessonId) {
    currentLesson = lessonsData[lessonId - 1];
    currentPage = userProgress.lessons[lessonId - 1].currentPage;
    
    // Si la lección no ha sido iniciada, marcar como en progreso
    if (userProgress.lessons[lessonId - 1].currentPage === 0) {
        addActivity(`Comenzó la Lección ${lessonId}: ${currentLesson.title}`, 'lesson_start');
    }
    
    // Actualizar último acceso
    userProgress.lessons[lessonId - 1].lastAccessed = new Date().toISOString();
    saveProgress();
    
    // Mostrar modal de la lección
    showLessonModal();
}

function showLessonModal() {
    // Configurar modal
    lessonTitle.textContent = `Lección ${currentLesson.id}: ${currentLesson.title}`;
    totalPagesSpan.textContent = currentLesson.pages;
    
    // Cargar contenido de la página actual
    loadLessonPage();
    
    // Mostrar modal
    showModal(lessonModal);
}

function loadLessonPage() {
    currentPageSpan.textContent = currentPage + 1;
    
    // Calcular progreso de la lección
    const pageProgress = Math.round(((currentPage + 1) / currentLesson.pages) * 100);
    lessonProgressBar.style.width = `${pageProgress}%`;
    lessonProgressText.textContent = `${pageProgress}%`;
    
    // Habilitar/deshabilitar botones de navegación
    document.querySelector('.btn-nav.prev').disabled = currentPage === 0;
    document.querySelector('.btn-nav.next').disabled = currentPage === currentLesson.pages - 1;
    
    // Actualizar botón de completar
    if (currentPage === currentLesson.pages - 1) {
        markCompleteBtn.innerHTML = '<i class="fas fa-check-circle"></i> Marcar como Completado';
        markCompleteBtn.style.backgroundColor = '#27ae60';
    } else {
        markCompleteBtn.innerHTML = '<i class="fas fa-bookmark"></i> Guardar Progreso';
        markCompleteBtn.style.backgroundColor = '#3498db';
    }
    
    // Mostrar contenido de la página
    const pageContent = currentLesson.content[currentPage] || {
        title: `Página ${currentPage + 1}`,
        content: 'Contenido de la página...'
    };
    
    lessonContentArea.innerHTML = `
        <h3>${pageContent.title}</h3>
        <div style="margin-top: 20px; line-height: 1.8;">
            ${pageContent.content}
            ${currentPage < currentLesson.content.length ? '' : 
                '<p><em>Esta página está en preparación. Pronto tendrás el contenido completo aquí.</em></p>'}
        </div>
        
        ${currentPage < currentLesson.content.length ? '' : `
            <div style="margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #3498db;">
                <h4>¡Importante!</h4>
                <p>Esta es una vista previa del sistema. Cuando tengas el contenido real de las lecciones:</p>
                <ol style="margin-top: 10px; padding-left: 20px;">
                    <li>Sube tus archivos HTML/CSS/JS a la carpeta correspondiente</li>
                    <li>Actualiza el array <code>lessonsData</code> en script.js</li>
                    <li>El sistema cargará automáticamente tu contenido</li>
                </ol>
            </div>
        `}
    `;
}

function goToPrevPage() {
    if (currentPage > 0) {
        currentPage--;
        loadLessonPage();
    }
}

function goToNextPage() {
    if (currentPage < currentLesson.pages - 1) {
        currentPage++;
        loadLessonPage();
        
        // Actualizar progreso del usuario
        if (currentPage > userProgress.lessons[currentLesson.id - 1].currentPage) {
            userProgress.lessons[currentLesson.id - 1].currentPage = currentPage;
            userProgress.lessons[currentLesson.id - 1].lastAccessed = new Date().toISOString();
            
            // Añadir tiempo de estudio (simulado)
            userProgress.totalTime = (userProgress.totalTime || 0) + 5; // 5 minutos por página
            
            saveProgress();
        }
    }
}

function markLessonComplete() {
    // Marcar lección como completada
    userProgress.lessons[currentLesson.id - 1].completed = true;
    userProgress.lessons[currentLesson.id - 1].currentPage = currentLesson.pages;
    
    // Añadir tiempo de estudio
    userProgress.totalTime = (userProgress.totalTime || 0) + 10; // 10 minutos extra por completar
    
    // Registrar actividad
    addActivity(`Completó la Lección ${currentLesson.id}: ${currentLesson.title}`, 'lesson_complete');
    
    // Guardar progreso
    saveProgress();
    
    // Cerrar modal
    hideModal(lessonModal);
    
    // Mostrar mensaje
    showMessage('¡Lección Completada!', `Has completado la Lección ${currentLesson.id}: ${currentLesson.title}`);
    
    // Actualizar dashboard
    updateDashboard();
}

function saveProgress() {
    const progressData = JSON.parse(localStorage.getItem('greekCourseProgress'));
    progressData.students[currentUser.id] = userProgress;
    localStorage.setItem('greekCourseProgress', JSON.stringify(progressData));
}

function continueLearning() {
    // Encontrar la primera lección no completada
    let nextLessonId = null;
    
    for (let i = 0; i < userProgress.lessons.length; i++) {
        if (!userProgress.lessons[i].completed) {
            nextLessonId = i + 1;
            break;
        }
    }
    
    if (nextLessonId) {
        startLesson(nextLessonId);
    } else {
        showMessage('Curso Completado', '¡Felicidades! Has completado todas las lecciones del curso.');
    }
}

function takeQuiz(quizNum) {
    // Abrir quiz en nueva pestaña
    window.open(quizUrls[quizNum - 1], '_blank');
    
    // Registrar actividad
    addActivity(`Comenzó el Quiz ${quizNum}`, 'quiz');
    
    // Mostrar mensaje
    showMessage('Quiz Abierto', `Se ha abierto el Quiz ${quizNum} en una nueva pestaña. Una vez completado, puedes registrar tu nota manualmente.`);
}

function showModal(modal) {
    modal.style.display = 'flex';
}

function hideModal(modal) {
    modal.style.display = 'none';
}

function showMessage(title, text) {
    messageTitle.textContent = title;
    messageText.textContent = text;
    showModal(messageModal);
}

// Funciones globales para usar en onclick
window.startLesson = startLesson;