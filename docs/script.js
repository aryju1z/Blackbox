// Scroll Animation Handler
document.addEventListener('DOMContentLoaded', () => {
    // Add nlc-logo class to the NLC logo div
    const nlcLogo = document.querySelector('.bg-gradient-to-r.from-primary');
    if (nlcLogo) {
        nlcLogo.classList.add('nlc-logo');
    }

    // Add classes for animation to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('scroll-fade');
    });

    // Add specific classes to cards
    const valueCards = document.querySelectorAll('#values .bg-white');
    valueCards.forEach(card => {
        card.classList.add('value-card');
    });

    const practiceCards = document.querySelectorAll('#practice .bg-white');
    practiceCards.forEach(card => {
        card.classList.add('practice-card');
    });

    const instagramPosts = document.querySelectorAll('#instagram .bg-white');
    instagramPosts.forEach(post => {
        post.classList.add('instagram-post');
    });

    const faqItems = document.querySelectorAll('#faq .max-w-4xl > div');
    faqItems.forEach(item => {
        item.classList.add('faq-item');
    });

    // Add whatsapp-btn class to WhatsApp button
    const whatsappButton = document.querySelector('a[href*="whatsapp"]');
    if (whatsappButton) {
        whatsappButton.classList.add('whatsapp-btn');
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all elements with scroll-fade class
    document.querySelectorAll('.scroll-fade').forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
