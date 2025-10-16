// Modern Event Management System JavaScript

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const nav = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    nav.classList.add("navbar-scrolled");
  } else {
    nav.classList.remove("navbar-scrolled");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Portfolio filter functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.btn-filter');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animateElements = document.querySelectorAll('.service-card, .portfolio-card, .about-section img');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
});

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
      
      // Simulate form submission
      showNotification('Thank you! Your message has been sent successfully.', 'success');
      this.reset();
    });
  });
});

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#28a745' : '#17a2b8'};
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    z-index: 9999;
    transform: translateX(100%);
    transition: transform 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.video-bg');
  if (parallax) {
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Mobile menu enhancement
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
      navbarCollapse.classList.toggle('show');
    });
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbarCollapse.classList.remove('show');
      });
    });
  }
});

// Loading animation
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// Add loaded class styles
const style = document.createElement('style');
style.textContent = `
  body:not(.loaded) {
    overflow: hidden;
  }
  
  body:not(.loaded)::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  body:not(.loaded)::after {
    content: 'Loading...';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #f0b24a;
    font-size: 1.5rem;
    font-weight: 600;
    z-index: 10000;
  }
`;
document.head.appendChild(style);

// Event Calendar Functionality
class EventCalendar {
  constructor() {
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.bookedDates = [
      new Date(2025, 0, 15), // January 15
      new Date(2025, 0, 22), // January 22
      new Date(2025, 1, 14), // February 14
      new Date(2025, 1, 28), // February 28
    ];
    this.limitedDates = [
      new Date(2025, 0, 10), // January 10
      new Date(2025, 0, 25), // January 25
      new Date(2025, 1, 5),  // February 5
    ];
    this.init();
  }

  init() {
    this.renderCalendar();
    this.bindEvents();
  }

  bindEvents() {
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    
    if (prevBtn) prevBtn.addEventListener('click', () => this.previousMonth());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextMonth());
  }

  previousMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.renderCalendar();
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.renderCalendar();
  }

  renderCalendar() {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentMonthElement = document.getElementById('currentMonth');
    if (currentMonthElement) {
      currentMonthElement.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;
    }

    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;

    // Clear previous content
    calendarGrid.innerHTML = '';

    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
      const dayHeader = document.createElement('div');
      dayHeader.className = 'calendar-day-header';
      dayHeader.textContent = day;
      dayHeader.style.cssText = `
        font-weight: 600;
        color: #666;
        text-align: center;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      `;
      calendarGrid.appendChild(dayHeader);
    });

    // Get first day of month and number of days
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'calendar-day';
      calendarGrid.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'calendar-day';
      dayElement.textContent = day;
      
      const currentDate = new Date(this.currentYear, this.currentMonth, day);
      
      // Check if date is booked or has limited availability
      if (this.isBooked(currentDate)) {
        dayElement.classList.add('event-day');
        dayElement.style.background = '#dc3545';
        dayElement.style.color = 'white';
        dayElement.title = 'Fully Booked';
      } else if (this.isLimited(currentDate)) {
        dayElement.style.background = '#ffc107';
        dayElement.style.color = 'white';
        dayElement.title = 'Limited Availability';
      } else {
        dayElement.style.background = '#007bff';
        dayElement.style.color = 'white';
        dayElement.title = 'Available';
      }

      // Add click event for date selection
      dayElement.addEventListener('click', () => {
        if (!this.isBooked(currentDate)) {
          this.selectDate(currentDate);
        }
      });

      calendarGrid.appendChild(dayElement);
    }
  }

  isBooked(date) {
    return this.bookedDates.some(bookedDate => 
      bookedDate.getDate() === date.getDate() &&
      bookedDate.getMonth() === date.getMonth() &&
      bookedDate.getFullYear() === date.getFullYear()
    );
  }

  isLimited(date) {
    return this.limitedDates.some(limitedDate => 
      limitedDate.getDate() === date.getDate() &&
      limitedDate.getMonth() === date.getMonth() &&
      limitedDate.getFullYear() === date.getFullYear()
    );
  }

  selectDate(date) {
    // Update the event date input if it exists
    const eventDateInput = document.querySelector('input[name="eventDate"]');
    if (eventDateInput) {
      const formattedDate = date.toISOString().split('T')[0];
      eventDateInput.value = formattedDate;
    }
    
    showNotification(`Selected date: ${date.toLocaleDateString()}`, 'info');
  }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('calendarGrid')) {
    new EventCalendar();
  }
});

// Enhanced form validation
document.addEventListener('DOMContentLoaded', function() {
  const eventBookingForm = document.getElementById('eventBookingForm');
  if (eventBookingForm) {
    eventBookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const eventData = {};
      formData.forEach((value, key) => {
        eventData[key] = value;
      });
      
      // Validate required fields
      const requiredFields = ['fullName', 'email', 'phone', 'eventType', 'eventDate', 'guestCount', 'description'];
      const missingFields = requiredFields.filter(field => !eventData[field]);
      
      if (missingFields.length > 0) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(eventData.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }
      
      // Validate phone number
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(eventData.phone.replace(/\s/g, ''))) {
        showNotification('Please enter a valid phone number.', 'error');
        return;
      }
      
      // Validate event date is in the future
      const eventDate = new Date(eventData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (eventDate < today) {
        showNotification('Event date must be in the future.', 'error');
        return;
      }
      
      // Simulate form submission
      showNotification('Thank you! Your event booking request has been submitted. We will contact you within 24 hours.', 'success');
      this.reset();
    });
  }
});
