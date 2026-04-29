// Category Filters & Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resetButton = document.getElementById('resetFilters');
    const searchInput = document.getElementById('searchInput');
    const blogPosts = document.querySelectorAll('.post');

    // Filter by category
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter posts
            filterPosts(filter, searchInput.value);
        });
    });

    // Reset filters
    resetButton.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        filterButtons[0].classList.add('active');
        searchInput.value = '';
        filterPosts('all', '');
    });

    // Search functionality
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        filterPosts(activeFilter, searchTerm);
    });

    function filterPosts(category, searchTerm) {
        let visibleCount = 0;
        
        blogPosts.forEach(post => {
            let show = true;

            // Check category filter
            if (category !== 'all') {
                const postCategory = post.querySelector('.category').textContent.toLowerCase().replace(/\s+/g, '-');
                show = show && postCategory.includes(category);
            }

            // Check search term
            if (searchTerm) {
                const postTitle = post.querySelector('.post-title').textContent.toLowerCase();
                const postExcerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
                show = show && (postTitle.includes(searchTerm) || postExcerpt.includes(searchTerm));
            }

            // Display or hide post
            post.style.display = show ? 'block' : 'none';
            if (show) visibleCount++;
        });

        // Show no results message if needed
        const blogSection = document.getElementById('blogPosts');
        let noResults = document.querySelector('.no-results');
        
        if (visibleCount === 0) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = '<p>No posts found. Try a different search or filter.</p>';
                blogSection.appendChild(noResults);
            }
        } else {
            if (noResults) {
                noResults.remove();
            }
        }
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    // Update active nav link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing! Check your email for confirmation.');
                this.reset();
            }
        });
    }
});
