// Custom Cursor
      const cursor = document.getElementById("cursor");
      let mouseX = 0,
        mouseY = 0;

      document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      function updateCursor() {
        cursor.style.left = mouseX - 10 + "px";
        cursor.style.top = mouseY - 10 + "px";
        requestAnimationFrame(updateCursor);
      }
      updateCursor();

      // 3D Background with Three.js
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("bg-canvas"),
        alpha: true,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      // Create floating particles
      const geometry = new THREE.BufferGeometry();
      const particles = 1000;
      const positions = new Float32Array(particles * 3);

      for (let i = 0; i < particles * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const material = new THREE.PointsMaterial({
        color: 0x60a5fa,
        size: 0.5,
        transparent: true,
        opacity: 0.6,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      camera.position.z = 30;

      function animate() {
        requestAnimationFrame(animate);
        points.rotation.x += 0.001;
        points.rotation.y += 0.002;
        renderer.render(scene, camera);
      }
      animate();

      // Resize handler
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      // Scroll Progress
      window.addEventListener("scroll", () => {
        const scrollProgress = document.getElementById("scroll-progress");
        const scrollPercent =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100;
        scrollProgress.style.width = scrollPercent + "%";
      });

      // Counter Animation
      function animateCounters() {
        const counters = document.querySelectorAll(".counter");

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = parseInt(entry.target.dataset.target);
              let current = 0;
              const increment = target / 50;

              const timer = setInterval(() => {
                current += increment;
                entry.target.textContent = Math.ceil(current);

                if (current >= target) {
                  entry.target.textContent = target;
                  clearInterval(timer);
                }
              }, 40);

              observer.unobserve(entry.target);
            }
          });
        });

        counters.forEach((counter) => observer.observe(counter));
      }

      animateCounters();

      // Parallax Effect
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector(".parallax");
        if (parallax) {
          parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
      });

      // Testimonial Card 3D Effect
      document.querySelectorAll(".testimonial-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
        });
      });

      // Loading animation delay for elements
      window.addEventListener("load", () => {
        document
          .querySelectorAll(".animate-slide-up, .animate-fade-in")
          .forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2}s`;
          });
      });
       class TestimonialSlider {
            constructor() {
                this.slider = document.getElementById('sliderTrack');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.dotsContainer = document.getElementById('dotsContainer');
                this.slides = document.querySelectorAll('.slide');
                
                this.currentIndex = 0;
                this.slidesPerView = this.getSlidesPerView();
                this.totalSlides = this.slides.length;
                this.maxIndex = Math.max(0, this.totalSlides - this.slidesPerView);
                
                this.autoPlayInterval = null;
                this.autoPlayDelay = 4000;
                
                this.touchStartX = 0;
                this.touchEndX = 0;
                
                this.init();
            }
            
            getSlidesPerView() {
                if (window.innerWidth >= 1024) return 3;
                if (window.innerWidth >= 768) return 2;
                return 1;
            }
            
            init() {
                this.createDots();
                this.updateSlider();
                this.addEventListeners();
                this.startAutoPlay();
            }
            
            createDots() {
                this.dotsContainer.innerHTML = '';
                const totalDots = this.maxIndex + 1;
                
                for (let i = 0; i <= this.maxIndex; i++) {
                    const dot = document.createElement('button');
                    dot.className = 'nav-dot w-3 h-3 rounded-full bg-gray-300';
                    dot.addEventListener('click', () => this.goToSlide(i));
                    this.dotsContainer.appendChild(dot);
                }
            }
            
            updateSlider() {
                const translateX = -(this.currentIndex * (100 / this.slidesPerView));
                this.slider.style.transform = `translateX(${translateX}%)`;
                this.updateDots();
            }
            
            updateDots() {
                const dots = this.dotsContainer.querySelectorAll('.nav-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentIndex);
                });
            }
            
            nextSlide() {
                this.currentIndex = this.currentIndex >= this.maxIndex ? 0 : this.currentIndex + 1;
                this.updateSlider();
                this.resetAutoPlay();
            }
            
            prevSlide() {
                this.currentIndex = this.currentIndex <= 0 ? this.maxIndex : this.currentIndex - 1;
                this.updateSlider();
                this.resetAutoPlay();
            }
            
            goToSlide(index) {
                this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
                this.updateSlider();
                this.resetAutoPlay();
            }
            
            startAutoPlay() {
                this.autoPlayInterval = setInterval(() => {
                    this.nextSlide();
                }, this.autoPlayDelay);
            }
            
            stopAutoPlay() {
                if (this.autoPlayInterval) {
                    clearInterval(this.autoPlayInterval);
                    this.autoPlayInterval = null;
                }
            }
            
            resetAutoPlay() {
                this.stopAutoPlay();
                this.startAutoPlay();
            }
            
            handleTouchStart(e) {
                this.touchStartX = e.touches[0].clientX;
            }
            
            handleTouchEnd(e) {
                this.touchEndX = e.changedTouches[0].clientX;
                this.handleSwipe();
            }
            
            handleSwipe() {
                const swipeThreshold = 50;
                const diff = this.touchStartX - this.touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
            }
            
            handleResize() {
                const newSlidesPerView = this.getSlidesPerView();
                if (newSlidesPerView !== this.slidesPerView) {
                    this.slidesPerView = newSlidesPerView;
                    this.maxIndex = Math.max(0, this.totalSlides - this.slidesPerView);
                    this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
                    this.createDots();
                    this.updateSlider();
                }
            }
            
            addEventListeners() {
                this.nextBtn.addEventListener('click', () => this.nextSlide());
                this.prevBtn.addEventListener('click', () => this.prevSlide());
                
                // Touch events
                this.slider.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
                this.slider.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
                
                // Pause autoplay on hover
                this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
                this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
                
                // Handle window resize
                window.addEventListener('resize', () => this.handleResize());
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.prevSlide();
                    if (e.key === 'ArrowRight') this.nextSlide();
                });
            }
        }
        
        // Initialize slider when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new TestimonialSlider();
        });