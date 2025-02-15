// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
    const closeMenuButton = document.querySelector('[data-close-menu-button]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const backdrop = document.querySelector('[data-backdrop]');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('hidden');
        backdrop.classList.toggle('hidden');
        document.body.classList.toggle('overflow-hidden');
    }

    mobileMenuButton?.addEventListener('click', toggleMobileMenu);
    closeMenuButton?.addEventListener('click', toggleMobileMenu);
    backdrop?.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking on mobile menu links
    const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
    mobileMenuLinks?.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
});

// Copy to clipboard functionality
function copyToClipboard(text) {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.select();
    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (err) {
        console.error('Failed to copy text:', err);
    }
    
    // Clean up
    document.body.removeChild(textarea);
}

function showCopyFeedback() {
    // Find all copy buttons
    const copyButtons = document.querySelectorAll('.copy-button');
    
    copyButtons.forEach(button => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.disabled = true;
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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