document.addEventListener('DOMContentLoaded', function () {
  const calendarDays = document.getElementById('calendar-days');
  const monthYear = document.getElementById('month-year');
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');

  // Modal elements
  const modal = document.getElementById('event-popup');
  const popupTitle = document.getElementById('popup-event-title');
  const popupDescription = document.getElementById('popup-event-description');
  const closeButton = document.querySelector('.close-button');

  // Get current date information
  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  // Sample events data with additional description (adjust as needed)
  const events = [
    { 
      year: currentYear, 
      month: currentMonth, 
      day: 30, 
      title: "School Visit", 
      description: "Join our vibrant School Visit event that brings volunteers and locals together for a day of fun and meaningful interaction." 
    },
    { 
      year: currentYear, 
      month: currentMonth, 
      day: 22, 
      title: "Workshop on Sustainability", 
      description: "Attend our workshop to learn about sustainable practices and eco-friendly community initiatives." 
    }
    // Add more events as needed
  ];

  function renderCalendar(month, year) {
    calendarDays.innerHTML = "";
    // Set the header month/year display
    const date = new Date(year, month);
    monthYear.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Determine the first day of the month and total days in the month
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create empty cells for days before the month starts
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.classList.add('calendar-cell', 'empty');
      calendarDays.appendChild(emptyCell);
    }

    // Generate cells for each day
    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement('div');
      cell.classList.add('calendar-cell');
      cell.textContent = day;

      // For each event, add an indicator if the day matches
      events.forEach(eventData => {
        if (eventData.year === year && eventData.month === month && eventData.day === day) {
          const eventIndicator = document.createElement('span');
          eventIndicator.classList.add('event-indicator');
          eventIndicator.title = eventData.title;
          eventIndicator.textContent = " • ";

          // When the event indicator is clicked, open the modal popup.
          eventIndicator.addEventListener('click', function (e) {
            e.stopPropagation();
            openEventModal(eventData);
          });
          cell.appendChild(eventIndicator);
        }
      });
      calendarDays.appendChild(cell);
    }
  }

  function openEventModal(eventData) {
    popupTitle.textContent = eventData.title;
    popupDescription.textContent = eventData.description;
    modal.style.display = 'flex';
  }

  // Event listener for closing the modal via the close button.
  closeButton.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  // Optional: close modal when clicking outside modal-content.
  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  prevMonthBtn.addEventListener('click', function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  nextMonthBtn.addEventListener('click', function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });

  // Render the calendar with initial month/year.
  renderCalendar(currentMonth, currentYear);
});
