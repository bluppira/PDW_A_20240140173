// =============================================
//  CINEMAXE — script.js
//  JavaScript untuk semua halaman
// =============================================

// ----- MOBILE MENU -----
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

// ----- FILTER PILLS (tayang.html) -----
function initFilterPills() {
  document.querySelectorAll('.dpill').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.dpill').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    });
  });

  document.querySelectorAll('.gpill').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.gpill').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
    });
  });
}

// ----- SEAT MAP (pesan.html) -----
function initSeatMap() {
  const seatMap = document.getElementById('seatMap');
  if (!seatMap) return;

  const rows      = ['A', 'B', 'C', 'D', 'E', 'F'];
  const cols      = 8;
  const takenSeats = ['A2', 'A5', 'B3', 'C6', 'C7', 'D1', 'E4', 'F2', 'F5', 'F8'];

  rows.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'seat-row';

    const rowLabel = document.createElement('span');
    rowLabel.className = 'row-label';
    rowLabel.textContent = row;
    rowEl.appendChild(rowLabel);

    for (let c = 1; c <= cols; c++) {
      const id   = row + c;
      const seat = document.createElement('div');
      seat.className   = 'seat available';
      seat.dataset.id  = id;
      seat.title       = id;

      if (takenSeats.includes(id)) {
        seat.classList.remove('available');
        seat.classList.add('taken');
      }

      seat.addEventListener('click', () => {
        if (seat.classList.contains('taken')) return;

        seat.classList.toggle('selected');
        seat.classList.toggle('available', !seat.classList.contains('selected'));

        const selected = Array.from(document.querySelectorAll('.seat.selected'))
          .map(s => s.dataset.id);

        const display = document.getElementById('chosenSeats');
        const input   = document.getElementById('kursiInput');

        if (display) display.textContent = selected.length ? selected.join(', ') : '—';
        if (input)   input.value         = selected.join(',');
      });

      rowEl.appendChild(seat);
    }

    seatMap.appendChild(rowEl);
  });
}

// ----- INIT ON DOM READY -----
document.addEventListener('DOMContentLoaded', () => {
  initFilterPills();
  initSeatMap();
});