// JavaScript for Giraffe Resume Builder

document.addEventListener('DOMContentLoaded', function() {
    // Get the CTA button
    const ctaButton = document.querySelector('.cta-button');

    // Add click event listener to the CTA button
    ctaButton.addEventListener('click', function() {
        // Here you would redirect to the resume editor page
        console.log('Redirecting to resume editor...');
        // Uncomment the below line when you have a resume editor page
        // window.location.href = 'resume-editor.html';
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log(`Clicked on ${this.textContent}`);

            // Check if the link has an actual href that should trigger navigation
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                // Allow default navigation for links with a valid href (other than '#')
                // You could add smooth scrolling logic here if needed for in-page anchors
                window.location.href = href;
            } else {
                // Prevent default behavior for links that are likely placeholders ('#')
                e.preventDefault();
                // You might add logic here to handle dropdowns or other interactive elements
            }
        });
    });

    // Add scroll animation effects
    window.addEventListener('scroll', function() {
        const featureCards = document.querySelectorAll('.feature-card');
        const testimonials = document.querySelectorAll('.testimonial');
        const sectionTitles = document.querySelectorAll('.section-title');

        // Animate feature cards
        featureCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if(cardPosition < screenPosition) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });

        // Animate testimonials
        testimonials.forEach((testimonial, index) => {
            const testimonialPosition = testimonial.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if(testimonialPosition < screenPosition) {
                setTimeout(() => {
                    testimonial.style.opacity = '1';
                    testimonial.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });

        // Animate section titles
        sectionTitles.forEach(title => {
            const titlePosition = title.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if(titlePosition < screenPosition) {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }
        });
    });

    // Initialize elements with starting styles
    const featureCards = document.querySelectorAll('.feature-card');
    const testimonials = document.querySelectorAll('.testimonial');
    const sectionTitles = document.querySelectorAll('.section-title');

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });

    testimonials.forEach(testimonial => {
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateY(30px)';
        testimonial.style.transition = 'all 0.6s ease';
    });

    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'all 0.6s ease';
    });

    // Create animated particles
    const animateParticles = () => {
        const particles = document.querySelectorAll('.particle');

        particles.forEach(particle => {
            // Random position within the container
            const x = Math.random() * 100;
            const y = Math.random() * 100;

            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
        });
    };

    // Initialize particles
    animateParticles();

    // Run animation for particles every 15 seconds
    setInterval(animateParticles, 15000);

    // Trigger scroll event once to check initial positions
    window.dispatchEvent(new Event('scroll'));

    // ✅ Enable giraffe floating ONLY on mobile
    const giraffe = document.querySelector('.giraffe-mascot');
    if (giraffe) {
        if (window.innerWidth <= 768) {
            giraffe.style.animation = 'none';
        } else {
            giraffe.style.animation = 'float 6s ease-in-out infinite';
        }
    }
});


// ✅ Smooth Carousel with Fade
document.querySelectorAll('.carousel-preview').forEach(preview => {
    const folder = preview.dataset.folder;
    const total = parseInt(preview.dataset.total, 10);
    let current = 1;

    const [img1, img2] = preview.querySelectorAll('.carousel-img');
    let showingFirst = true;

    setInterval(() => {
        current = (current % total) + 1;
        const nextImg = `${folder}/preview_${current}.png`;

        if (showingFirst) {
            img2.src = nextImg;
            img2.classList.add('active');
            img1.classList.remove('active');
        } else {
            img1.src = nextImg;
            img1.classList.add('active');
            img2.classList.remove('active');
        }

        showingFirst = !showingFirst;
    }, 3000);
});