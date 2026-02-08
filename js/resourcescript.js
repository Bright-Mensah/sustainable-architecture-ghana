 // Resources page JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // Set current year
            document.getElementById('currentYear').textContent = new Date().getFullYear();
            
            // FAQ functionality
            window.toggleFAQ = function(element) {
                const answer = element.nextElementSibling;
                const icon = element.querySelector('i');
                
                answer.classList.toggle('active');
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            };
            
            // Form submission handlers
            const resourceForm = document.getElementById('resourceRequestForm');
            const newsletterForm = document.getElementById('newsletterForm');
            
            resourceForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    category: document.getElementById('category').value,
                    request: document.getElementById('request').value,
                    purpose: document.getElementById('purpose').value
                };
                
                // Show success message (in a real app, this would send to a server)
                alert('Thank you for your resource request! We will email you within 2-3 business days.');
                resourceForm.reset();
            });
            
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                // Show success message
                alert(`Thank you for subscribing with ${email}! You will receive our next newsletter.`);
                newsletterForm.reset();
            });
            
            // External link warning
            document.querySelectorAll('a[target="_blank"]').forEach(link => {
                link.addEventListener('click', function(e) {
                    if(!confirm('You are leaving our website. Continue to ' + this.hostname + '?')) {
                        e.preventDefault();
                    }
                });
            });
            
            // Create downloads folder structure note
            console.log('For downloads to work, create this folder structure:');
            console.log('project-folder/');
            console.log('├── downloads/');
            console.log('│   ├── sustainability-checklist.pdf');
            console.log('│   ├── solar-guide.pdf');
            console.log('│   ├── materials-directory.pdf');
            console.log('│   └── cost-template.xlsx');
            console.log('└── ...');
        })