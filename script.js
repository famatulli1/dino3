document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des composants
    initNavbar();
    initTimeline();
    initQuiz();
    updateFooterDate();
    initEarthquakeButton();
    initHoverAnimations();
});

function initHoverAnimations() {
    // Target smaller interactive elements but exclude large containers
    const hoverElements = document.querySelectorAll(`
        .btn:not(.timeline-content),
        .option:not(.timeline-content),
        .nav-link:not(.timeline-content)
    `);
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (el.classList.contains('btn')) {
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            } else if (el.classList.contains('option')) {
                el.style.transform = 'translateX(3px)';
                el.style.backgroundColor = '#f8f9fa';
            }
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
            el.style.boxShadow = '';
            el.style.backgroundColor = '';
        });
    });
}

function initEarthquakeButton() {
    const btn = document.querySelector('.secret-btn');
    if (!btn) return;

    // Load GSAP from CDN if not available
    if (typeof gsap === 'undefined') {
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
        document.head.appendChild(gsapScript);
    }

    btn.addEventListener('click', function() {
        // Activate shaking animation
        document.body.classList.add('shaking');

        // Create particles container
        const particles = document.createElement('div');
        particles.style.position = 'fixed';
        particles.style.top = '0';
        particles.style.left = '0';
        particles.style.width = '100%';
        particles.style.height = '100%';
        particles.style.pointerEvents = 'none';
        particles.style.zIndex = '9999';
        particles.style.background = 'transparent';
        document.body.appendChild(particles);

        // Create dust particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 10 + 5 + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = '#ccc';
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.5 + 0.3;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particles.appendChild(particle);

            // Animate particles if GSAP is available
            if (typeof gsap !== 'undefined') {
                gsap.to(particle, {
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    opacity: 0,
                    duration: 5,
                    ease: "power1.out"
                });
            }
        }

        // No sound effects as per user request

        // Stop after 5 seconds
        setTimeout(() => {
            document.body.classList.remove('shaking');
            particles.remove();
        }, 5000);
    });
}

function initNavbar() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
            link.style.textShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
            link.style.textShadow = '';
        });
    });
}

function initTimeline() {
    const timelineContainer = document.getElementById('timeline');
    const playButton = document.getElementById('playTimeline');
    
    if (!timelineContainer) return;

    const timelineEvents = [
        { 
            date: "-70M années", 
            title: "🦖 Âge d'or des dinosaures", 
            content: "Les dinosaures dominent tous les écosystèmes terrestres",
            icon: "🦕"
        },
        { 
            date: "-66M années", 
            title: "💥 Impact catastrophique", 
            content: "Astéroïde de 10km frappe Chicxulub à 20 km/s (énergie = 1 milliard de bombes nucléaires)",
            icon: "🌍"
        },
        { 
            date: "-66M années", 
            title: "❄️ Hiver d'impact", 
            content: "Nuage de poussière bloque le soleil pendant des années 🌫️→🌡️-20°C",
            icon: "☁️"
        },
        { 
            date: "-65M années", 
            title: "☠️ Extinction massive", 
            content: "75% des espèces disparaissent dont tous les dinosaures non-aviens 💀",
            icon: "🦴"
        },
        { 
            date: "-64M années", 
            title: "🐾 Rétablissement", 
            content: "Les mammifères commencent à dominer 🌿→🦡→🐒",
            icon: "🌱"
        },
        { 
            date: "Aujourd'hui", 
            title: "🦅 Héritage", 
            content: "10,000+ espèces d'oiseaux sont les seuls descendants des dinosaures 🐦‍⬛→🦚→🐧",
            icon: "🥚"
        }
    ];

    // Clear existing timeline
    timelineContainer.innerHTML = '';

    // Create timeline items
    timelineEvents.forEach((event, index) => {
        const item = document.createElement('div');
        item.className = 'timeline-item mb-4';
        item.innerHTML = `
            <div class="timeline-badge bg-primary text-white rounded-circle d-flex align-items-center justify-content-center">
                ${event.icon}
            </div>
            <div class="timeline-content card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${event.date} - ${event.title}</h5>
                    <p class="card-text">${event.content}</p>
                </div>
            </div>
        `;
        timelineContainer.appendChild(item);
    });

    // Animate timeline with GSAP
    if (playButton) {
        playButton.addEventListener('click', () => {
            gsap.fromTo('.timeline-item', 
                { opacity: 0, y: 50 },
                { 
                    opacity: 1, 
                    y: 0,
                    duration: 0.8,
                    stagger: 0.4,
                    ease: "back.out(1.2)"
                }
            );
        });
    }
}

const QUIZ_QUESTIONS = {
    "causes": [
        {
            question: "Quand a eu lieu l'extinction des dinosaures ?",
            options: [
                "Il y a environ 66 millions d'années (Crétacé-Paléogène)",
                "Il y a 100 millions d'années (Jurassique)",
                "Il y a 200 millions d'années (Trias)"
            ],
            answer: 0,
            explanation: "La couche géologique K-Pg marque cette extinction il y a 66 millions d'années."
        },
        {
            question: "Où a frappé l'astéroïde responsable de l'extinction ?",
            options: [
                "Chicxulub, Mexique",
                "Manicouagan, Canada", 
                "Vredefort, Afrique du Sud"
            ],
            answer: 0,
            explanation: "Le cratère de Chicxulub (180km de diamètre) est la preuve de cet impact."
        },
        {
            question: "Quel était le diamètre de l'astéroïde ?",
            options: [
                "10-15 km",
                "1-2 km",
                "50-60 km"
            ],
            answer: 0,
            explanation: "Un astéroïde de 10-15km a libéré l'équivalent de 100 tératonnes de TNT."
        },
        {
            question: "Quel phénomène a suivi l'impact ?",
            options: [
                "Hiver nucléaire",
                "Pluies acides",
                "Les deux"
            ],
            answer: 2,
            explanation: "L'impact a provoqué un hiver nucléaire ET des pluies acides."
        },
        {
            question: "Quelle autre cause possible est étudiée ?",
            options: [
                "Éruptions volcaniques massives",
                "Changement climatique progressif",
                "Les deux"
            ],
            answer: 2,
            explanation: "Les trapps du Deccan (Inde) montrent une activité volcanique intense à la même période."
        }
    ],
    "species": [
        {
            question: "Quel groupe a survécu à l'extinction ?",
            options: [
                "Dinosaures aviens (oiseaux)",
                "Dinosaures aquatiques",
                "Dinosaures volants"
            ],
            answer: 0,
            explanation: "Seuls les ancêtres des oiseaux modernes ont survécu."
        },
        {
            question: "Quel dinosaure emblématique a disparu ?",
            options: [
                "Tyrannosaurus rex",
                "Triceratops",
                "Les deux"
            ],
            answer: 2,
            explanation: "Tous les dinosaures non-aviens ont disparu."
        },
        {
            question: "Quelle était la taille du plus grand dinosaure ?",
            options: [
                "30-40 mètres (Argentinosaurus)",
                "10-15 mètres",
                "50-60 mètres"
            ],
            answer: 0,
            explanation: "Les sauropodes comme Argentinosaurus pouvaient atteindre 40m et 100 tonnes."
        }
    ],
    "theories": [
        {
            question: "Quelle théorie est la plus acceptée ?",
            options: [
                "Impact d'astéroïde",
                "Volcanisme intense",
                "Combinaison de plusieurs facteurs"
            ],
            answer: 2,
            explanation: "La plupart des scientifiques pensent que plusieurs causes ont contribué."
        },
        {
            question: "Combien de temps a duré l'extinction ?",
            options: [
                "Quelques années",
                "Des milliers d'années",
                "Des millions d'années"
            ],
            answer: 1,
            explanation: "L'extinction s'est produite sur environ 10,000 ans."
        }
    ],
    "cretaceous": [
        {
            question: "Quand a commencé le Crétacé ?",
            options: [
                "Il y a 145 millions d'années",
                "Il y a 200 millions d'années",
                "Il y a 66 millions d'années"
            ],
            answer: 0,
            explanation: "Le Crétacé a duré de -145 à -66 millions d'années."
        },
        {
            question: "Quel dinosaure vivait à la fin du Crétacé ?",
            options: [
                "Tyrannosaurus",
                "Stegosaurus",
                "Brachiosaurus"
            ],
            answer: 0,
            explanation: "Tyrannosaurus vivait il y a 68-66 millions d'années."
        }
    ]
};

function initQuiz() {
    const quizForm = document.getElementById('dino-quiz');
    if (!quizForm) return;

    // Get all questions from all categories
    const allQuestions = [];
    for (const category in QUIZ_QUESTIONS) {
        allQuestions.push(...QUIZ_QUESTIONS[category]);
    }

    // Générer 5 questions aléatoires
    const shuffledQuestions = [...allQuestions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

    const quizContainer = document.createElement('div');
    quizContainer.className = 'quiz-questions';
    quizForm.insertBefore(quizContainer, quizForm.querySelector('.text-center'));

    shuffledQuestions.forEach((q, i) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question mb-4 p-4 rounded bg-light shadow animate__animated animate__fadeIn';
        questionDiv.style.animationDelay = `${i * 0.1}s`;
        questionDiv.innerHTML = `
            <div class="d-flex align-items-center mb-3">
                <span class="badge bg-primary me-2">${i+1}</span>
                <h5 class="mb-0">${q.question}</h5>
            </div>
            <div class="options">
                ${q.options.map((opt, j) => `
                    <div class="option mb-2 p-2 rounded" 
                         data-correct="${j === q.answer}"
                         onclick="selectOption(this)">
                        ${opt}
                        <span class="correct-indicator d-none">✓</span>
                    </div>
                `).join('')}
            </div>
            <div class="explanation mt-3 p-3 rounded bg-info text-white d-none">
                <i class="bi bi-lightbulb"></i> ${q.explanation}
            </div>
        `;
        quizContainer.appendChild(questionDiv);
    });

    // Gestion de la soumission
    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateScore();
    });
}

function selectOption(option) {
    const questionDiv = option.closest('.question');
    const options = questionDiv.querySelectorAll('.option');
    
    options.forEach(opt => {
        opt.classList.remove('selected', 'bg-success', 'bg-danger');
    });

    option.classList.add('selected');
    
    option.classList.add('selected');
}

function calculateScore() {
    const questions = document.querySelectorAll('.question');
    let score = 0;

    questions.forEach(q => {
        const selected = q.querySelector('.selected');
        const options = q.querySelectorAll('.option');
        
        if (selected) {
            if (selected.dataset.correct === 'true') {
                selected.classList.add('bg-success');
                score++;
            } else {
                selected.classList.add('bg-danger');
            }
            // Show correct answer only after submission
            options.forEach(opt => {
                if (opt.dataset.correct === 'true') {
                    opt.classList.add('bg-success');
                    opt.querySelector('.correct-indicator').classList.remove('d-none');
                }
            });
            // Show explanation
            q.querySelector('.explanation').classList.remove('d-none');
        }
    });

    const percentage = Math.round((score / questions.length) * 100);
    showResults(percentage, score, questions.length);
}

function showResults(percentage, score, total) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class="card shadow-lg animate__animated animate__zoomIn">
            <div class="card-body text-center">
                <h3 class="card-title ${percentage >= 80 ? 'text-success' : percentage >= 50 ? 'text-warning' : 'text-danger'}">
                    ${percentage}% de bonnes réponses
                </h3>
                <div class="progress mb-3">
                    <div class="progress-bar ${percentage >= 80 ? 'bg-success' : percentage >= 50 ? 'bg-warning' : 'bg-danger'}" 
                         role="progressbar" style="width: ${percentage}%" 
                         aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>
                <p class="fs-5">
                    ${score} bonnes réponses sur ${total}
                </p>
                <button class="btn btn-primary mt-3" onclick="window.location.reload()">
                    <i class="bi bi-arrow-repeat"></i> Nouveau quiz
                </button>
            </div>
        </div>
    `;
}

function updateFooterDate() {
    const footer = document.querySelector('footer p');
    if (footer) {
        footer.textContent = `© ${new Date().getFullYear()} Projet pédagogique - Collège`;
    }
}
