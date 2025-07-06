// Page transition handler
document.addEventListener('DOMContentLoaded', function() {
    // Create transition element if it doesn't exist
    let transition = document.querySelector('.page-transition');
    if (!transition) {
        transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);
        // Start with the transition hidden
        setTimeout(() => {
            transition.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease';
        }, 50);
    }


    // Add click event to all internal links
    document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a:not([href^="http"])').forEach(link => {
        // Skip if it's a hash link, has a specific no-transition class, or is an external link
        if (link.href.includes('#') || 
            link.classList.contains('no-transition') ||
            link.target === '_blank' ||
            link.hostname !== window.location.hostname) {
            return;
        }
        
        // Skip if it's a link to index.html (which we're excluding from transitions)
        const href = link.getAttribute('href');
        if (href === 'index.html' || 
            href === './index.html' ||
            href === '/index.html') {
            return;
        }
        
        link.addEventListener('click', function(e) {
            // Don't follow the link yet
            e.preventDefault();
            
            // Get the target URL
            const targetUrl = this.href;
            
            // Add transitioning class to body
            document.body.classList.add('transitioning');
            
            // Show the transition
            const transition = document.querySelector('.page-transition');
            transition.classList.add('active');
            
            // Navigate after the transition starts
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 800);
        });
    });
});

// Add transition-in effect when page loads
window.addEventListener('load', function() {
    const transition = document.querySelector('.page-transition');
    if (transition) {
        // Reset the transition
        transition.classList.remove('active');
        
        // Add a small delay to ensure the transition is ready
        setTimeout(() => {
            transition.classList.add('exiting');
            document.body.classList.remove('transitioning');
            
            // Remove the transition classes after animation completes
            setTimeout(() => {
                transition.classList.remove('exiting');
            }, 1000);
        }, 50);
    }
});
