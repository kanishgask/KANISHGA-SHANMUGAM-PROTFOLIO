// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initParticles();
    initTypewriter();
    initThemeToggle();
    initMobileMenu();
    initNavLinks();
    initSkillBars();
    initStatsCounter();
    initProjectFilter();
    initContactForm();
    initScrollReveal();
    initDownloadResume();
});

// ===== LOADER =====
function initLoader() {
    const loader = document.querySelector('.loader-wrapper');
    
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 1500);
}

// ===== CUSTOM CURSOR =====
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .achievement-card, .social-icon, .filter-btn');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            follower.style.transform = 'scale(1.5)';
            follower.style.borderColor = 'var(--primary)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
            follower.style.borderColor = 'var(--primary)';
        });
    });
}

// ===== PARTICLES.JS =====
function initParticles() {
    if (typeof particlesJS === 'undefined') return;

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00b7ff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00b7ff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// ===== TYPEWRITER EFFECT =====
function initTypewriter() {
    const typedText = document.querySelector('.typed-text');
    if (!typedText) return;

    const words = ['Java Developer','Full Stack Developer','Cloud &Cybersecurity enthusiast', 'Web Developer', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    const icon = toggle.querySelector('i');
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-moon';
        }
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger) return;

    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Copy links to mobile menu
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        const clone = link.cloneNode(true);
        clone.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        mobileMenu.appendChild(clone);
    });
    
    document.body.appendChild(mobileMenu);

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
}

// ===== NAVIGATION LINKS =====
function initNavLinks() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navHeight = document.querySelector('.navbar').offsetHeight;
            
            if (pageYOffset >= sectionTop - navHeight - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SKILL BARS =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ===== STATISTICS COUNTER =====
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);

                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(count);
                    }
                }, 16);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// ===== PROJECT FILTER =====
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    const modal = document.getElementById('success-modal');
    const closeBtn = document.querySelector('.close-modal');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate form
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        // Name validation
        if (name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            removeError(name);
        }

        // Email validation
        if (email.value.trim() === '') {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            removeError(email);
        }

        // Message validation
        if (message.value.trim() === '') {
            showError(message, 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters');
            isValid = false;
        } else {
            removeError(message);
        }

        if (isValid) {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                // Show success modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';

                // Reset form
                form.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}

// Helper functions for form validation
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.textContent = message;
    }
}

function removeError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-in-out'
        });
    }
}

// ===== DOWNLOAD RESUME =====
function initDownloadResume() {
    const downloadBtn = document.getElementById('download-resume');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a dummy PDF (replace with actual resume)
            const element = document.createElement('a');
            element.href = '#'; // Replace with actual resume URL
            element.download = 'Kanishga_Resume.pdf';
            
            // Show notification
            showNotification('Resume download started!', 'success');
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);

    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            border-radius: 10px;
            padding: 1rem 2rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            transform: translateX(200%);
            transition: transform 0.3s ease;
            z-index: 10000;
            box-shadow: var(--shadow);
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification.success i {
            color: #00ff88;
        }

        .notification.error i {
            color: #ff4444;
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== SMOOTH SCROLL FOR ALL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== ACTIVE SECTION HIGHLIGHT =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-menu a');
    
    let current = '';
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionBottom) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
// ===== CERTIFICATES DATA =====
const certificatesData = [
    // Cloud Computing Certificates
    {
        id: 1,
        title: "Google Cloud Associate Engineer",
        description: "Certified Associate Cloud Engineer with expertise in GCP services",
        image: "https://images.credly.com/size/680x680/images/1aa38026-5e9d-45f5-becc-288601568ad5/image.png",
        category: "cloud",
        date: "2024",
        issuer: "Google Cloud",
        badge: "Professional",
        link: "#"
    },
    {
        id: 2,
        title: "AWS Cloud Practitioner",
        description: "Foundational understanding of AWS cloud concepts and services",
        image: "https://images.credly.com/size/680x680/images/1aa38026-5e9d-45f5-becc-288601568ad5/image.png",
        category: "cloud",
        date: "2023",
        issuer: "Amazon Web Services",
        badge: "Foundational",
        link: "#"
    },
    {
        id: 3,
        title: "21 Google Cloud Badges",
        description: "Completed 21 skill badges in various GCP technologies",
        image: "https://media.licdn.com/dms/image/v2/D5622AQGUBX1DVSp--g/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1711301405440?e=1750896000&v=beta&t=dDpMqZgyWtt7wELNOd7huSh_TLGRfMz5mRfmlEDTONc",
        category: "cloud",
        date: "2023-2024",
        issuer: "Google Cloud",
        badge: "21 Badges",
        link: "#"
    },
    
    // Development Certificates
    {
        id: 4,
        title: "Full Stack Web Development",
        description: "Complete web development bootcamp with MERN stack",
        image: "https://media.licdn.com/dms/image/v2/D5622AQGcQANh0oi8Rw/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1726570467912?e=1750896000&v=beta&t=0Q4WxNkAw_yrHN6tr6jz2JemW5ppo_LuUI3YQZxfAxk",
        category: "development",
        date: "2024",
        issuer: "Udemy",
        badge: "Advanced",
        link: "#"
    },
    {
        id: 5,
        title: "Java Programming Masterclass",
        description: "Comprehensive Java programming certification covering core and advanced concepts",
        image: "https://media.licdn.com/dms/image/v2/D5622AQE-7WKzJsEjsA/feedshare-shrink_800/feedshare-shrink_800/0/1723822774491?e=1750896000&v=beta&t=jQ7F0bD_CofaJr6tF8dUFRJefYg4PJ9XkLpWAUd357A",
        category: "development",
        date: "2023",
        issuer: "Oracle",
        badge: "Professional",
        link: "#"
    },
    {
        id: 6,
        title: "React.js Certification",
        description: "Advanced React.js development with hooks and context",
        image: "https://media.licdn.com/dms/image/v2/D5622AQFoXM-Z2kDv5g/feedshare-shrink_1280/feedshare-shrink_1280/0/1729519461766?e=1750896000&v=beta&t=M44cGWib0NANxOeFzArhfDExFhh2-nOTS1WZWjFtRIk",
        category: "development",
        date: "2024",
        issuer: "Meta",
        badge: "Advanced",
        link: "#"
    },
    
    // AI & Data Science Certificates
    {
        id: 7,
        title: "Machine Learning Specialization",
        description: "Comprehensive ML course covering supervised and unsupervised learning",
        image: "https://media.licdn.com/dms/image/v2/D5622AQGucefJGtKBHQ/feedshare-shrink_1280/feedshare-shrink_1280/0/1729519462069?e=1750896000&v=beta&t=ZK4XfbN_-vfDdzN3m9WXHasWpBhDmtXUr4_mPkGPQXo",
        category: "ai",
        date: "2024",
        issuer: "Stanford Online",
        badge: "Specialization",
        link: "#"
    },
    {
        id: 8,
        title: "Data Science Professional",
        description: "IBM Data Science Professional Certificate",
        image: "d:\\all certificates\\all certificates\\IBM CYBERSECURITY.jpg",
        category: "ai",
        date: "2023",
        issuer: "IBM",
        badge: "Professional",
        link: "#"
    },
    {
        id: 9,
        title: "Deep Learning Specialization",
        description: "Advanced deep learning concepts and applications",
        image: "d:\\all certificates\\New folder\\WhatsApp Image 2026-02-12 at 6.03.30 PM.jpeg",
        category: "ai",
        date: "2024",
        issuer: "DeepLearning.AI",
        badge: "Advanced",
        link: "#"
    },
    
    // Internship Certificates
    {
        id: 10,
        title: "Accenture Internship",
        description: "Technology internship focusing on cloud solutions",
        image: "https://media.licdn.com/dms/image/v2/D5622AQEGh1sdqfPfLQ/feedshare-shrink_2048_1536/B56ZWkKrBmGoAo-/0/1742216016962?e=1750896000&v=beta&t=gUk8a8GaOAx677unewoDp0aaU4CKORWejCJCyDw8Cdg",
        category: "internship",
        date: "2024",
        issuer: "Accenture",
        badge: "Certificate",
        link: "#"
    },
    {
        id: 11,
        title: "Deloitte Cybersecurity",
        description: "Virtual internship in cybersecurity fundamentals",
        image: "d:\\all certificates\\all certificates\\IBM CYBERSECURITY FUNDAMENTALS.jpg",
        category: "internship",
        date: "2023",
        issuer: "Deloitte",
        badge: "Certificate",
        link: "#"
    },
    {
        id: 12,
        title: "TechnoHacks Internship",
        description: "Web development internship with real-world projects",
        image: "https://media.licdn.com/dms/image/v2/D5622AQFktkgfcxuwRQ/feedshare-shrink_1280/B56ZRIzvA_GQAk-/0/1736388312187?e=1750896000&v=beta&t=v7SzMnbruMo8AnIvJ0x0OkJtrbMiRWCgz9voiVS1U24",
        category: "internship",
        date: "2024",
        issuer: "TechnoHacks",
        badge: "Certificate",
        link: "#"
    },
    
    // Additional Certificates
    {
        id: 13,
        title: "C Programming Certificate",
        description: "Advanced C programming and memory management",
        image: "d:\\CERTIFICATES PROTFOLIO\\1703174151948.jpg",
        category: "development",
        date: "2023",
        issuer: "Coursera",
        badge: "Advanced",
        link: "#"
    },
    {
        id: 14,
        title: "Python for Data Science",
        description: "Data analysis and visualization with Python",
        image: "d:\\CERTIFICATES PROTFOLIO\\1709820785941.jpg",
        category: "ai",
        date: "2023",
        issuer: "IBM",
        badge: "Intermediate",
        link: "#"
    },
    {
        id: 15,
        title: "Power BI Certification",
        description: "Business intelligence and data visualization",
        image: "https://media.licdn.com/dms/image/v2/D5622AQETtF-TIuDO9Q/feedshare-shrink_1280/feedshare-shrink_1280/0/1729519462834?e=1750896000&v=beta&t=xGbTHjW4V-oqDV9ZVJuAk1jRLZWEKiFmaktM89Veqxk",
        category: "ai",
        date: "2024",
        issuer: "Microsoft",
        badge: "Professional",
        link: "#"
    }
];

// ===== INITIALIZE CERTIFICATES =====
function initCertificates() {
    loadCertificates();
    initCertificateFilters();
    initCertificateModal();
    initViewAllButton();
}

// ===== LOAD CERTIFICATES =====
function loadCertificates() {
    const gallery = document.getElementById('cert-gallery');
    if (!gallery) return;

    // Show skeleton loading
    showSkeletonLoader(gallery);

    // Simulate loading delay
    setTimeout(() => {
        gallery.innerHTML = '';
        
        certificatesData.forEach((cert, index) => {
            const certItem = createCertificateElement(cert, index);
            gallery.appendChild(certItem);
        });

        // Reinitialize AOS for new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 1000);
}

// ===== CREATE CERTIFICATE ELEMENT =====
function createCertificateElement(cert, index) {
    const certDiv = document.createElement('div');
    certDiv.className = `cert-item ${cert.category}`;
    certDiv.setAttribute('data-category', cert.category);
    certDiv.setAttribute('data-aos', 'fade-up');
    certDiv.setAttribute('data-aos-delay', (index * 50).toString());

    certDiv.innerHTML = `
        <div class="cert-item-inner">
            <div class="cert-item-img">
                <img src="${cert.image}" alt="${cert.title}" loading="lazy">
                <div class="cert-item-overlay">
                    <span class="cert-tooltip">Click to view</span>
                </div>
            </div>
            <div class="cert-item-content">
                <h3>${cert.title}</h3>
                <p>${cert.description}</p>
                <div class="cert-item-footer">
                    <span class="cert-item-date">
                        <i class="fa-regular fa-calendar"></i> ${cert.date}
                    </span>
                    <span class="cert-item-issuer">${cert.issuer}</span>
                </div>
            </div>
            <span class="cert-item-badge">${cert.badge}</span>
        </div>
    `;

    // Add click event to open modal
    certDiv.addEventListener('click', () => {
        openCertificateModal(cert);
    });

    return certDiv;
}

// ===== SHOW SKELETON LOADER =====
function showSkeletonLoader(gallery) {
    gallery.innerHTML = '';
    
    for (let i = 0; i < 6; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'cert-skeleton';
        skeleton.innerHTML = `
            <div class="cert-skeleton-img"></div>
            <div class="cert-skeleton-content">
                <div class="cert-skeleton-line"></div>
                <div class="cert-skeleton-line"></div>
                <div class="cert-skeleton-line" style="width: 60%;"></div>
            </div>
        `;
        gallery.appendChild(skeleton);
    }
}

// ===== CERTIFICATE FILTERS =====
function initCertificateFilters() {
    const filterBtns = document.querySelectorAll('.category-btn');
    const certItems = document.querySelectorAll('.cert-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter certificates
            const filter = btn.getAttribute('data-category');
            
