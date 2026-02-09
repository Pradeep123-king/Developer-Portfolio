
import { userData } from './constants.js';

// DOM Elements
const heroSection = document.getElementById('about');
const projectsGrid = document.getElementById('projects-grid');
const experienceTimeline = document.getElementById('experience-timeline');
const skillsGrid = document.getElementById('skills-grid');
const certificationsGrid = document.getElementById('certifications-grid');
const contactContent = document.getElementById('contact-content');

// Mouse Follower
const mouseFollower = document.createElement('div');
mouseFollower.className = 'mouse-follower';
document.body.appendChild(mouseFollower);

document.addEventListener('mousemove', (e) => {
    mouseFollower.style.left = e.clientX + 'px';
    mouseFollower.style.top = e.clientY + 'px';
});


// Render Functions

function renderHero() {
    heroSection.innerHTML = `
        <div class="container hero-content">
            <div class="hero-text">
                <h3 class="hero-greeting">Hi, I'm</h3>
                <h1 class="hero-name">${userData.name}</h1>
                <h2 class="hero-role gradient-text">${userData.role}</h2>
                <p class="hero-description" style="max-width: 700px; font-size: 1rem; color: #94a3b8;">
                    ${userData.summary}
                </p>
                <div class="hero-buttons">
                    <a href="#projects" class="btn primary-btn">View My Work</a>
                    <a href="Pradeep - Resume.pdf" target="_blank" class="btn secondary-btn">View Resume</a>
                </div>
            </div>
            <div class="hero-visual">
                <div class="code-editor-wrapper">
                    <div class="code-editor">
                        <div class="editor-header">
                            <span class="dot red"></span>
                            <span class="dot yellow"></span>
                            <span class="dot green"></span>
                            <span class="filename">SoftwareEngineer.java</span>
                        </div>
                        <div class="editor-content">
                            <pre><code>
<span style="color:#c678dd">public class</span> <span style="color:#e5c07b">Skills</span> {
  <span style="color:#c678dd">String</span> name = <span style="color:#98c379">"${userData.name}"</span>;
  <span style="color:#c678dd">String</span>[] tech = {
    <span style="color:#98c379">"Java"</span>, <span style="color:#98c379">"Spring"</span>, <span style="color:#98c379">"React"</span>, <span style="color:#98c379">"MySQL"</span>
  };
  <span style="color:#c678dd">boolean</span> lovesCoding = <span style="color:#d19a66">true</span>;
}
                            </code></pre>
                            <div class="loading-bar"></div>
                        </div>
                    </div>
                    <div class="editor-glow"></div>
                </div>
            </div>
        </div>
    `;
}

function renderProjects() {
    if (!projectsGrid) return;

    // Set to Bento Grid layout (now uniform)
    projectsGrid.className = 'bento-grid';

    projectsGrid.innerHTML = userData.projects.map((project, index) => {
        return `
            <div class="project-card">
                <div class="card-image-box">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="card-hover-overlay">
                    <div class="card-content-wrap">
                        <div class="card-top">
                            <span class="card-year">${project.date}</span>
                            <div class="card-buttons">
                                <a href="${project.demo}" target="_blank" class="icon-btn primary" title="Live Demo"><i data-lucide="external-link"></i></a>
                                <a href="${project.link}" target="_blank" class="icon-btn" title="View Code"><i data-lucide="github"></i></a>
                            </div>
                        </div>
                        <h3 class="card-title">${project.title}</h3>
                        <p class="card-desc">${project.description}</p>
                        <div class="card-tags">
                            ${project.tech.map(t => `<span class="card-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Re-initialize icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function renderExperience() {
    if (!experienceTimeline) return;
    experienceTimeline.innerHTML = userData.experience.map(exp => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span class="date">${exp.date}</span>
                <h3>${exp.role}</h3>
                <h4>${exp.company}</h4>
                <p>${exp.description}</p>
            </div>
        </div>
    `).join('');
}

function renderSkills() {
    if (!skillsGrid) return;
    skillsGrid.innerHTML = userData.skills.map(group => `
        <div class="skill-card group-card">
            <div class="skill-icon-box">
                 <i data-lucide="${group.icon}"></i>
            </div>
            <h3>${group.title}</h3>
            <p class="skill-list">${group.skills}</p>
        </div>
    `).join('');

    // Animate skills on scroll
    const skillCards = document.querySelectorAll('.skill-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.1 });

    skillCards.forEach(card => observer.observe(card));
}


function renderCertifications() {
    if (!certificationsGrid) return;
    certificationsGrid.innerHTML = userData.certifications.map(cert => `
        <div class="card cert-card">
            <div class="cert-icon">
                <i data-lucide="award"></i>
            </div>
            <div class="cert-content">
                <h3>${cert.title}</h3>
                <h4 class="issuer">Issued by ${cert.issuer}</h4>
                <p>${cert.description}</p>
                <div class="cert-footer">
                    <span class="date"><i data-lucide="calendar" style="width:14px; margin-right:5px;"></i> ${cert.date}</span>
                </div>
            </div>
        </div>
    `).join('');
}


function renderContact() {
    if (!contactContent) return;
    contactContent.innerHTML = `
        <div class="contact-container">
            <div class="contact-form">
                <form id="contact-form" action="https://formspree.io/f/xaqoekeo" method="POST">
                    <div class="form-group">
                        <label>Your Name</label>
                        <input type="text" name="name" class="form-input" placeholder="What's your good name?" required>
                    </div>
                    <div class="form-group">
                        <label>Your Email</label>
                        <input type="email" name="_replyto" class="form-input" placeholder="What's your email address?" required>
                    </div>
                    <div class="form-group">
                        <label>Your Message</label>
                        <textarea name="message" class="form-textarea" rows="4" placeholder="How can I help you?" required></textarea>
                    </div>
                    <button type="submit" id="submit-btn" class="btn primary-btn" style="width: 100%">Send Message</button>
                    <p id="form-status" style="margin-top: 15px; text-align: center; font-size: 0.9rem; display: none;"></p>
                </form>
                
                <div class="social-links" style="justify-content: flex-start; margin-top: 30px;">
                    <a href="${userData.socials.github}" target="_blank"><i data-lucide="github"></i></a>
                    <a href="${userData.socials.instagram}" target="_blank"><i data-lucide="instagram"></i></a>
                    <a href="${userData.socials.linkedin}" target="_blank" title="Connect on LinkedIn"><i data-lucide="linkedin"></i></a>
                </div>
            </div>
            
            <div class="contact-visual">
                <img src="images/contact-workspace-full.jpg" alt="Contact Illustration" class="clickable-3d" 
                    onclick="this.classList.remove('spinning'); void this.offsetWidth; this.classList.add('spinning');">
            </div>
        </div>
        <p style="text-align: center; margin-top: 40px; font-size: 1.2rem; color: var(--accent-color); font-weight: 500;">Let's Connect & Create</p>
    `;
}

// Init
function init() {
    renderHero();
    renderProjects();
    renderExperience();
    renderSkills();
    renderCertifications();
    renderContact();
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const status = document.getElementById('form-status');
        const submitBtn = document.getElementById('submit-btn');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            status.style.display = 'none';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    status.style.display = 'block';
                    status.style.color = '#10b981';
                    status.textContent = 'Message sent successfully!';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    status.style.display = 'block';
                    status.style.color = '#ef4444';
                    status.textContent = (data.errors && data.errors[0]?.message) || 'Error sending message.';
                }
            } catch (error) {
                status.style.display = 'block';
                status.style.color = '#ef4444';
                status.textContent = 'Connection error. Please try again.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                setTimeout(() => { if (status) status.style.display = 'none'; }, 5000);
            }
        });
    }
}

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileBtn?.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    });
});

document.addEventListener('DOMContentLoaded', init);
