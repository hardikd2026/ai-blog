// Category Filters Functionality
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
            filterPosts(filter, '');
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
        });
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
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
});
