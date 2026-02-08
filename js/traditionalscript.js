 // Page-specific JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // Set current year
            document.getElementById('currentYear').textContent = new Date().getFullYear();
            
            // Audio Player
            const audio = document.getElementById('buildingAudio');
            const playBtn = document.getElementById('playBtn');
            const pauseBtn = document.getElementById('pauseBtn');
            const stopBtn = document.getElementById('stopBtn');
            const progressBar = document.getElementById('progressBar');
            const currentTimeEl = document.getElementById('currentTime');
            const durationEl = document.getElementById('duration');
            
            // Format time as mm:ss
            function formatTime(seconds) {
                const mins = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${mins}:${secs.toString().padStart(2, '0')}`;
            }
            
            // Update duration display
            audio.addEventListener('loadedmetadata', () => {
                durationEl.textContent = formatTime(audio.duration);
            });
            
            // Play button
            playBtn.addEventListener('click', () => {
                audio.play();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            });
            
            // Pause button
            pauseBtn.addEventListener('click', () => {
                audio.pause();
            });
            
            // Stop button
            stopBtn.addEventListener('click', () => {
                audio.pause();
                audio.currentTime = 0;
                progressBar.style.width = '0%';
                currentTimeEl.textContent = '0:00';
            });
            
            // Update progress bar
            audio.addEventListener('timeupdate', () => {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${progress}%`;
                currentTimeEl.textContent = formatTime(audio.currentTime);
            });
            
            // Interactive Diagram
            const diagramPoints = document.querySelectorAll('.diagram-point');
            const tooltips = document.querySelectorAll('.info-tooltip');
            
            diagramPoints.forEach(point => {
                point.addEventListener('click', function() {
                    const infoNum = this.getAttribute('data-info');
                    
                    // Hide all tooltips
                    tooltips.forEach(tooltip => {
                        tooltip.classList.remove('active');
                    });
                    
                    // Show corresponding tooltip
                    const tooltip = document.getElementById(`tooltip-${infoNum}`);
                    if (tooltip) {
                        tooltip.classList.add('active');
                        
                        // Position tooltip near the point
                        const rect = this.getBoundingClientRect();
                        const container = document.querySelector('.diagram-container');
                        const containerRect = container.getBoundingClientRect();
                        
                        tooltip.style.top = `${rect.top - containerRect.top}px`;
                        tooltip.style.left = `${rect.right - containerRect.left + 10}px`;
                        
                        // Auto-hide after 5 seconds
                        setTimeout(() => {
                            tooltip.classList.remove('active');
                        }, 5000);
                    }
                });
            });
            
            // Close tooltips when clicking elsewhere
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.diagram-point')) {
                    tooltips.forEach(tooltip => {
                        tooltip.classList.remove('active');
                    });
                }
            });
            
            // Back to Top button
            const backToTopBtn = document.getElementById('backToTop');
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            backToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Page load animation
            const sections = document.querySelectorAll('section');
            sections.forEach((section, index) => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, index * 200);
            });
        });