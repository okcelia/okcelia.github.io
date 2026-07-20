const events = JSON.parse(document.getElementById('events-data').textContent);
const calendarEl = document.getElementById('calendar');

const eventsByDate = {};
events.forEach(e => {
  eventsByDate[e.date] = e;
});

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderCalendar(month, year) {
  calendarEl.innerHTML = '';

  const monthNames = ["January","February","March","April","May","June",
    "July","August","September","October","November","December"];

  const header = document.createElement('div');
  header.className = 'calendar-header';
  header.innerHTML = `
    <button id="prevMonth">&#8592;</button>
    <span>${monthNames[month]} ${year}</span>
    <button id="nextMonth">&#8594;</button>
  `;
  calendarEl.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'calendar-grid';

  ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(d => {
    const dayLabel = document.createElement('div');
    dayLabel.className = 'calendar-day-label';
    dayLabel.textContent = d;
    grid.appendChild(dayLabel);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    grid.appendChild(document.createElement('div'));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-cell';
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    cell.textContent = day;

    if (eventsByDate[dateStr]) {
      cell.classList.add('has-event');
      cell.title = eventsByDate[dateStr].title;
    }
    grid.appendChild(cell);
  }

  calendarEl.appendChild(grid);

  document.getElementById('prevMonth').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar(currentMonth, currentYear);
  });
  document.getElementById('nextMonth').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar(currentMonth, currentYear);
  });
}

renderCalendar(currentMonth, currentYear);