document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const daysInMonth = [
        31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];

    function createMonth(monthIndex) {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');
        
        const header = document.createElement('h2');
        header.textContent = months[monthIndex];
        monthDiv.appendChild(header);
        
        const daysDiv = document.createElement('div');
        daysDiv.classList.add('days');
        
        const numDays = daysInMonth[monthIndex];
        for (let i = 1; i <= numDays; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.textContent = i;
            dayDiv.dataset.month = monthIndex;
            dayDiv.dataset.day = i;
            dayDiv.addEventListener('click', function() {
                dayDiv.classList.toggle('crossed');
                saveToLocalStorage();
            });
            daysDiv.appendChild(dayDiv);
        }
        
        monthDiv.appendChild(daysDiv);
        return monthDiv;
    }

    function renderCalendar() {
        for (let i = 0; i < 12; i++) {
            const monthDiv = createMonth(i);
            calendar.appendChild(monthDiv);
        }
        loadFromLocalStorage();
    }

    function saveToLocalStorage() {
        const days = document.querySelectorAll('.day');
        const data = Array.from(days).map(day => ({
            month: day.dataset.month,
            day: day.dataset.day,
            crossed: day.classList.contains('crossed')
        }));
        localStorage.setItem('calendarData', JSON.stringify(data));
    }

    function loadFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem('calendarData'));
        if (data) {
            data.forEach(entry => {
                const dayDiv = document.querySelector(`.day[data-month="${entry.month}"][data-day="${entry.day}"]`);
                if (dayDiv) {
                    if (entry.crossed) {
                        dayDiv.classList.add('crossed');
                    }
                }
            });
        }
    }

    renderCalendar();
});
