// ==========================================
// CONFIGURACIÓN Y VARIABLES GLOBALES
// ==========================================
let currentSlide = 0;
let autoplayInterval;

// Imágenes de respaldo
const fallbackImages = [
    "https://images.pexels.com/photos/1528660/pexels-photo-1528660.jpeg",
    "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg",
    "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg",
    "https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg",
    "https://images.pexels.com/photos/247819/pexels-photo-247819.jpeg",
    "https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg",
    "https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg",
    "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
];

const questions = [
    { id: 1, category: "🎓 MI FUTURO", question: "¿Qué carrera o profesión te ves ejerciendo en el futuro? ¿Qué tipo de vida quieres tener?", helper: "No importa si aún no estás 100% seguro. Escribe lo que te emociona imaginar.", sceneTitle: "Mi Visión de Futuro", imageUrls: ["https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg", "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg", "https://images.pexels.com/photos/935756/pexels-photo-935756.jpeg", "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg", "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg"] },
    { id: 2, category: "🎯 METAS ACADÉMICAS", question: "¿Qué quieres lograr este año en tus estudios?", helper: "Sé específico. ¿Qué nota quieres? ¿Qué materias son prioridad?", sceneTitle: "Mis Metas Académicas", imageUrls: ["https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg", "https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg", "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg", "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg", "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg"] },
    { id: 3, category: "💪 MIS FORTALEZAS", question: "¿En qué materias o actividades eres bueno? ¿Qué habilidades tienes?", helper: "Piensa en lo que te sale fácil o lo que otros reconocen en ti.", sceneTitle: "Mis Superpoderes", imageUrls: ["https://images.pexels.com/photos/914929/pexels-photo-914929.jpeg", "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg", "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg", "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg", "https://images.pexels.com/photos/3775120/pexels-photo-3775120.jpeg"] },
    { id: 4, category: "🚧 MIS OBSTÁCULOS", question: "¿Qué te impide estudiar mejor o alcanzar tus metas?", helper: "Sé honesto. Reconocer el problema es el primer paso para solucionarlo.", sceneTitle: "Mis Desafíos", imageUrls: ["https://images.pexels.com/photos/1194345/pexels-photo-1194345.jpeg", "https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg", "https://images.pexels.com/photos/289586/pexels-photo-289586.jpeg", "https://images.pexels.com/photos/1562058/pexels-photo-1562058.jpeg", "https://images.pexels.com/photos/4034525/pexels-photo-4034525.jpeg"] },
    { id: 5, category: "📉 ÁREAS A MEJORAR", question: "¿Qué materias o hábitos necesitas mejorar?", helper: "Todos tenemos debilidades. Identifica las tuyas para trabajar en ellas.", sceneTitle: "Mi Crecimiento", imageUrls: ["https://images.pexels.com/photos/323951/pexels-photo-323951.jpeg", "https://images.pexels.com/photos/247819/pexels-photo-247819.jpeg", "https://images.pexels.com/photos/1206101/pexels-photo-1206101.jpeg", "https://images.pexels.com/photos/5302820/pexels-photo-5302820.jpeg", "https://images.pexels.com/photos/669584/pexels-photo-669584.jpeg"] },
    { id: 6, category: "🔥 MI MOTIVACIÓN", question: "¿Por qué es importante para ti tener éxito en tus estudios?", helper: "Puede ser hacer sentir orgullosos a tus padres, conseguir una beca, etc.", sceneTitle: "Mi Motor Interior", imageUrls: ["https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg", "https://images.pexels.com/photos/1528660/pexels-photo-1528660.jpeg", "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg", "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg", "https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg"] },
    { id: 7, category: "🛤️ MI PLAN", question: "¿Qué 3 acciones concretas harás esta semana para acercarte a tus metas?", helper: "Ej: Estudiar 1 hora diaria, hacer un horario, pedir ayuda.", sceneTitle: "Mis Próximos Pasos", imageUrls: ["https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg", "https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg", "https://images.pexels.com/photos/8938927/pexels-photo-8938927.jpeg", "https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg", "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg"] },
    { id: 8, category: "🌟 MIS RECURSOS", question: "¿Qué apoyo tienes? (Profesores, familia, amigos, etc.)", helper: "Identifica tus recursos. No estás solo en este viaje.", sceneTitle: "Mi Red de Apoyo", imageUrls: ["https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg", "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg", "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg", "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg", "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg"] }
];

// Mensajes inspiradores cortos
const inspirationalMessages = [
    "Visualiza tu éxito, el primer paso.",
    "Cada meta cumplida te acerca más.",
    "Tus dones son tus herramientas.",
    "Los obstáculos son solo desvíos.",
    "Crece fuera de tu zona de confort.",
    "Tu 'por qué' es tu motor.",
    "Pequeñas acciones, grandes futuros.",
    "Nunca estás solo en el camino."
];

let currentQuestionIndex = 0;
let userAnswers = [];

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    showScreen('musicSelectionScreen');
    initializeAudio();
}

// ==========================================
// GESTIÓN DE MÚSICA
// ==========================================
function playMusic(choice) {
    const audio = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let url = '';

    if (choice === 'recommended') {
        url = 'assets/recommended.mp3';
    } else if (choice === 'custom') {
        const fileInput = document.getElementById('audioFileUpload');
        const file = fileInput.files[0];
        if (file) {
            url = URL.createObjectURL(file);
        } else { return; }
    } else if (choice === 'none') {
        audio.pause(); audio.src = ''; musicToggle.classList.add('hidden');
        startQuestionnaire(); return;
    }

    if (url) {
        audio.src = url;
        audio.play().catch(e => console.log("Autoplay bloqueado."));
        musicToggle.classList.remove('hidden');
        document.getElementById('musicIcon').textContent = '🔊';
    }
    startQuestionnaire();
}

function initializeAudio() {
    const audio = document.getElementById('bgMusic');
    const toggleBtn = document.getElementById('musicToggle');
    const icon = document.getElementById('musicIcon');
    toggleBtn.addEventListener('click', () => {
        if (audio.paused) { audio.play(); icon.textContent = '🔊'; }
        else { audio.pause(); icon.textContent = '🔇'; }
    });
}

// ==========================================
// NAVEGACIÓN Y CUESTIONARIO
// ==========================================
function changeMusic() {
    document.getElementById('bgMusic').pause();
    showScreen('musicSelectionScreen');
}

function showScreen(screenId) {
    const activeScreen = document.querySelector('.screen.active');
    const newScreen = document.getElementById(screenId);
    if (!newScreen) return;

    if (activeScreen) {
        activeScreen.classList.add('hiding');
        activeScreen.addEventListener('animationend', () => {
            activeScreen.classList.remove('active', 'hiding');
            newScreen.classList.add('active');
        }, { once: true });
    } else {
        newScreen.classList.add('active');
    }
}

function startQuestionnaire() {
    showScreen('questionnaireScreen');
    document.getElementById('progressBar').classList.remove('hidden');
    displayQuestion();
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const answerInput = document.getElementById('answerInput');
    const questionImage = document.getElementById('questionImage');

    answerInput.value = userAnswers[currentQuestionIndex] ? userAnswers[currentQuestionIndex].answer : '';
    questionImage.style.opacity = '0';

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * question.imageUrls.length);
        const newImageUrl = question.imageUrls[randomIndex];
        questionImage.onload = () => { questionImage.style.opacity = '1'; };
        questionImage.onerror = () => { questionImage.src = fallbackImages[0]; questionImage.style.opacity = '1'; };
        questionImage.src = newImageUrl;
    }, 400);

    document.getElementById('questionCategory').textContent = question.category;
    document.getElementById('questionTitle').textContent = question.question;
    document.getElementById('helperText').textContent = question.helper;
    updateProgress();
    updateButtons();
    answerInput.focus();
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('currentStep').textContent = currentQuestionIndex + 1;
    document.getElementById('totalSteps').textContent = questions.length;
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.textContent = (currentQuestionIndex === questions.length - 1) ? 'Crear mi Película 🎬' : 'Siguiente →';
}

function nextQuestion() {
    const answerInput = document.getElementById('answerInput');
    const answer = answerInput.value.trim();
    if (answer.length < 10) {
        answerInput.classList.add('error');
        setTimeout(() => answerInput.classList.remove('error'), 820);
        return;
    }
    userAnswers[currentQuestionIndex] = { answer: answer };
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++; displayQuestion();
    } else { generateMovie(); }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--; displayQuestion();
    }
}

// ==========================================
// GENERACIÓN DE IMÁGENES CON PROMPTS MEJORADOS Y RESPALDO
// ==========================================
async function generateMovie() {
    showScreen('generationScreen');
    const statusElement = document.getElementById('generationStatus');
    const generatedImages = [];

    document.getElementById('revealContainer').classList.add('hidden');
    document.getElementById('resultCarousel').classList.add('hidden');
    document.getElementById('finalLayout').classList.add('hidden');

    for (let i = 0; i < questions.length; i++) {
        statusElement.textContent = `Generando imagen ${i + 1} de ${questions.length}...`;
        let prompt = "";
        const userAnswer = userAnswers[i]?.answer;

        if (userAnswer) {
            const basePrompt = `Una imagen evocadora y visualmente impactante que represente: "${userAnswer}".`;
            let style = "Estilo cinematográfico, realista y emocional.";
            if (userAnswer.toLowerCase().includes('programación') || userAnswer.toLowerCase().includes('código') || userAnswer.toLowerCase().includes('computadora')) {
                prompt = `Primer plano de manos escribiendo código en un teclado iluminado, pantalla con código abstracto reflejado. ${style}`;
            } else if (userAnswer.toLowerCase().includes('familia') || userAnswer.toLowerCase().includes('amigos')) {
                prompt = `Un grupo diverso de manos unidas en el centro, simbolizando apoyo, con fondo cálido. ${style}`;
            } else if (userAnswer.toLowerCase().includes('ayudar') || userAnswer.toLowerCase().includes('apoyo')) {
                prompt = `Dos manos entrelazadas con firmeza, una ayudando a subir, luz brillante de fondo. ${style}`;
            } else if (userAnswer.toLowerCase().includes('meta') || userAnswer.toLowerCase().includes('logro') || userAnswer.toLowerCase().includes('objetivo')) {
                prompt = `Persona de espaldas mirando un camino iluminado hacia un horizonte brillante. ${style}`;
            } else if (userAnswer.toLowerCase().includes('estudiar') || userAnswer.toLowerCase().includes('aprender') || userAnswer.toLowerCase().includes('libro')) {
                prompt = `Libro abierto sobre escritorio con luz cálida iluminando páginas. ${style}`;
            } else { prompt = `${basePrompt} ${style}`; }
        } else { prompt = `Imagen conceptual y artística para "${questions[i].sceneTitle}". Estilo cinematográfico.`; }


        try {
            const response = await fetch('http://localhost:8080/api/generate-image', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt }),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            generatedImages.push(result.imageUrl);
        } catch (error) {
            console.error(`Error generando imagen ${i + 1}:`, error.message);
            generatedImages.push(fallbackImages[i % fallbackImages.length]);
        }
    }

    createCarousel(generatedImages);
    showScreen('resultScreen');
    document.getElementById('revealContainer').classList.remove('hidden');
}

// ==========================================
// CREACIÓN Y CONTROL DEL CARRUSEL
// ==========================================
function createCarousel(generatedImages) {
    const slidesContainer = document.querySelector('.carousel-slides');
    slidesContainer.innerHTML = '';
    currentSlide = 0;

    generatedImages.forEach((imageUrl, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        const inspirationalText = inspirationalMessages[index] || "Sigue adelante";
        slide.innerHTML = `
            <div class="scene-card">
                <img src="${imageUrl}" alt="Escena ${index + 1}" class="scene-image">
                <p>${escapeHtml(inspirationalText)}</p>
            </div>
        `;
        slidesContainer.appendChild(slide);
    });
}

function revealCarousel() {
    document.getElementById('revealContainer').classList.add('hidden');
    document.getElementById('resultCarousel').classList.remove('hidden');
    startAutoplay();
}

function startAutoplay() {
    showSlide(0);
    autoplayInterval = setInterval(() => {
        const totalSlides = document.querySelectorAll('.carousel-slide').length;
        if (currentSlide < totalSlides - 1) {
            nextSlide();
        } else {
            clearInterval(autoplayInterval);
            document.getElementById('resultCarousel').classList.add('hidden'); // Oculta carrusel
            buildTimeline();
            const phrase = generateMotivationalPhrase();
            document.getElementById('motivationalPhrase').textContent = phrase;
            document.getElementById('finalLayout').classList.remove('hidden'); // Muestra sección final
        }
    }, 6000);
}

function showSlide(index) {
    const slidesContainer = document.querySelector('.carousel-slides');
    const allSlides = document.querySelectorAll('.carousel-slide');
    const totalSlides = allSlides.length;
    if (!slidesContainer || !allSlides.length) return;
    if (index >= totalSlides) index = totalSlides - 1; if (index < 0) index = 0;
    currentSlide = index;
    allSlides.forEach(slide => slide.classList.remove('active-slide'));
    allSlides[currentSlide].classList.add('active-slide');
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }

// ==========================================
// CONSTRUCCIÓN DE LA LÍNEA DE TIEMPO FINAL
// ==========================================
function buildTimeline() {
    const container = document.getElementById('textTimelineContainer');
    container.innerHTML = '<h2>Tu Guión de Vida</h2>';
    questions.forEach((q, index) => {
        const answerText = userAnswers[index]?.answer || "No respondido";
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <strong>${q.sceneTitle}: ${q.question}</strong>
            <span>${escapeHtml(answerText)}</span>
        `;
        container.appendChild(item);
    });
}

// ==========================================
// FRASE MOTIVACIONAL
// ==========================================
function generateMotivationalPhrase() {
    const strengths = userAnswers[2]?.answer ? `"${userAnswers[2].answer}"` : "tus talentos únicos";
    const goals = userAnswers[1]?.answer ? `"${userAnswers[1].answer}"` : "tus grandes metas";
    const motivation = userAnswers[5]?.answer ? `"${userAnswers[5].answer}"` : "tu poderosa motivación interna";
    const phrases = [
        `Recuerda siempre ${motivation}. Confía en ${strengths} para conquistar ${goals}. ¡El futuro te espera!`,
        `Tus ${strengths} son tu brújula. Con ${motivation} como combustible, ${goals} son solo el comienzo.`,
        `Que ${motivation} sea tu guía. Aprovecha ${strengths} y verás cómo ${goals} se materializan.`,
        `Apóyate en ${strengths}, mantén viva la llama de ${motivation}, y celebra cada paso hacia ${goals}.`
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
}

// ==========================================
// OTRAS FUNCIONES
// ==========================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function downloadPDF() {
    const downloadBtn = event.target;
    downloadBtn.textContent = 'Generando PDF...'; downloadBtn.disabled = true;
    const finalLayout = document.getElementById('finalLayout');
    const wasHidden = finalLayout.classList.contains('hidden');
    if(wasHidden) finalLayout.classList.remove('hidden');

    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const canvas = await html2canvas(finalLayout, {
            backgroundColor: '#0d0c1d', scale: 1.5, useCORS: true, scrollY: -window.scrollY
        });
        if(wasHidden) finalLayout.classList.add('hidden');
        const { jsPDF } = window.jspdf; const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 190; const pageHeight = 297; const margin = 10;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight; let position = margin;
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= (pageHeight - 2 * margin);
        while (heightLeft > 0) {
            position = heightLeft - imgHeight + margin; pdf.addPage();
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', margin, position, imgWidth, imgHeight);
            heightLeft -= (pageHeight - 2 * margin);
        }
        pdf.save(`mi-guion-de-vida-${new Date().getTime()}.pdf`);
        alert('¡PDF descargado exitosamente!');
    } catch (error) {
        console.error('Error al generar PDF:', error); alert('Hubo un error al generar el PDF.');
        if(wasHidden) finalLayout.classList.add('hidden');
    } finally {
        downloadBtn.textContent = 'Descargar PDF 📥'; downloadBtn.disabled = false;
    }
}


function restartJourney() {
    if (confirm('¿Estás seguro? Empezarás un nuevo cuestionario.')) {
        userAnswers = []; currentQuestionIndex = 0;
        showScreen('musicSelectionScreen');
        document.getElementById('progressBar').classList.add('hidden');
        document.getElementById('revealContainer').classList.add('hidden');
        document.getElementById('resultCarousel').classList.add('hidden');
        document.getElementById('finalLayout').classList.add('hidden');
        if (autoplayInterval) clearInterval(autoplayInterval);
    }
}

// ==========================================
// ACCESIBILIDAD GLOBAL
// ==========================================
window.playMusic = playMusic;
window.startQuestionnaire = startQuestionnaire;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.restartJourney = restartJourney;
window.changeMusic = changeMusic;
window.revealCarousel = revealCarousel;
window.startAutoplay = startAutoplay;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.downloadPDF = downloadPDF;