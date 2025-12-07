document.addEventListener('DOMContentLoaded', () => {  
    // ====================== TYPING EFFECT ======================
    const typedTextSpan = document.querySelector('.typed-text');
    const textArray = ['Data Analyst', 'Network Engineer', 'CyberOps Specialist', 'Cloud Professional'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 1500;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, typingDelay + 500);
        }
    }

    setTimeout(type, newTextDelay + 100);






    document.addEventListener('DOMContentLoaded', function() {
        const cards = document.querySelectorAll('.area-card');
        
        cards.forEach(card => {
            card.addEventListener('click', function() {
                // Stop any current animation
                cards.forEach(c => c.classList.remove('dancing'));
                
                // Start dancing
                this.classList.add('dancing');
                
                // Add subtle glow effect
                const color = getComputedStyle(this.querySelector('.card-icon')).background;
                createGlowEffect(this, color);
                
                // Stop after 2 seconds
                setTimeout(() => {
                    this.classList.remove('dancing');
                }, 2000);
            });
        });
        
        function createGlowEffect(card, color) {
            const glow = document.createElement('div');
            const rect = card.getBoundingClientRect();
            
            glow.style.cssText = `
                position: fixed;
                width: ${rect.width}px;
                height: ${rect.height}px;
                border-radius: 16px;
                pointer-events: none;
                z-index: 1;
                left: ${rect.left}px;
                top: ${rect.top}px;
                box-shadow: 0 0 30px ${color.split('rgb')[1]?.split(')')[0]}, 0 0)};
                opacity: 0;
                animation: glowFade 0.3s ease-out;
            `;
            
            document.body.appendChild(glow);
            setTimeout(() => glow.remove(), 300);
        }
        
        // Add glow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes glowFade {
                0% { opacity: 0.8; transform: scale(1); }
                100% { opacity: 0; transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    });



    // ====================== MOBILE NAVIGATION ======================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // ====================== DROPDOWN SECTIONS ======================
    function setupDropdowns(selector) {
        document.querySelectorAll(selector).forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('i');

                content.classList.toggle('active');
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            });
        });
    }

    setupDropdowns('.certificate-header');
    setupDropdowns('.skill-header');









   // ====================== PROJECTS FUNCTIONALITY ======================
function initializeProjects() {

    // ================= RESPONSIBILITIES =================
    const respButtons = document.querySelectorAll('.view-responsibilities-btn');

    respButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const projectCard = this.closest('.project-card');
            const respSection = projectCard.querySelector('.project-responsibilities');

            if (!respSection) return;

            const isOpen = respSection.classList.contains('show-responsibilities');

            // Close all other open responsibilities
            document.querySelectorAll('.project-responsibilities.show-responsibilities').forEach(other => {
                if (other !== respSection) {
                    other.classList.remove('show-responsibilities');
                    const otherBtn = other.closest('.project-card').querySelector('.view-responsibilities-btn');
                    if (otherBtn) {
                        otherBtn.innerHTML = 'Responsibilities <i class="fas fa-chevron-down"></i>';
                    }
                }
            });

            // Toggle THIS project only
            if (isOpen) {
                respSection.classList.remove('show-responsibilities');
                this.innerHTML = 'Responsibilities <i class="fas fa-chevron-down"></i>';
            } else {
                respSection.classList.add('show-responsibilities');
                this.innerHTML = 'Hide Responsibilities <i class="fas fa-chevron-up"></i>';
            }
        });
    });

    // ================= VIEW MORE PROJECTS =================
    const viewMoreBtn = document.querySelector('.view-more-projects-btn');

    if (viewMoreBtn) {
        let showingAll = false;

        viewMoreBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const allProjects = document.querySelectorAll('.project-card');

            if (!showingAll) {
                // Show all hidden projects
                document.querySelectorAll('.project-card.hidden').forEach(p => {
                    p.classList.remove('hidden');
                    p.classList.add('visible');
                });

                this.innerHTML = 'View Less Projects <i class="fas fa-chevron-up"></i>';
                this.classList.add('expanded');
                showingAll = true;
            } else {
                // Collapse to first 3 projects
                allProjects.forEach((project, index) => {
                    if (index >= 3) {
                        project.classList.add('hidden');
                        project.classList.remove('visible');
                    }
                });

                this.innerHTML = 'View More Projects <i class="fas fa-chevron-down"></i>';
                this.classList.remove('expanded');
                showingAll = false;

                // Smooth scroll to top of projects section
                const projectsSection = document.querySelector('#projects');
                if (projectsSection) {
                    window.scrollTo({
                        top: projectsSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
}

// Run Projects JS
initializeProjects();







    // ====================== CONTACT FORM ======================
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    successMessage.style.display = 'block';
                    contactForm.reset();
                    setTimeout(() => successMessage.style.display = 'none', 5000);
                } else {
                    alert('There was a problem sending your message. Please try again.');
                }
            } catch {
                alert('There was a problem sending your message. Please try again.');
            }
        });
    }

    // ====================== SCROLL ANIMATION ======================
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-content, .project-card, .award-card, .area-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});




async function getAIResponse(userMessage) {
    try {
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });
  
      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Oops! Something went wrong.";
    }
  }
  
  document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;
  
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p class="user">${userInput}</p>`;
    document.getElementById("user-input").value = "";
  
    const aiReply = await getAIResponse(userInput);
    chatBox.innerHTML += `<p class="ai">${aiReply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  });
  document.getElementById("user-input").addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      document.getElementById("send-btn").click();
    }
  });
  document.getElementById("chat-box").innerHTML = `<p class="ai">Hi! Ask me anything about my projects or skills.</p>`;

  