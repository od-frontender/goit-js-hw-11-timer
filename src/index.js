import cardTpl from './templates/card.hbs';
import './css/style.css';

const cardsMarkup = cardTpl();
document.body.insertAdjacentHTML('beforeend', cardsMarkup);

const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};

class Timer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
  }

  start() {
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);

      if (deltaTime >= 0) {
        refs.days.textContent = `${days}`;
        refs.hours.textContent = `${hours}`;
        refs.mins.textContent = `${mins}`;
        refs.secs.textContent = `${secs}`;
      } else {
        clearInterval(this.intervalId);
        refs.days.textContent = `00`;
        refs.hours.textContent = `00`;
        refs.mins.textContent = `00`;
        refs.secs.textContent = `00`;
      }
    }, 1000);
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
}
const timer = new Timer({
  selector: '#timer-1',
  targetDate: new Date('Aug 5, 2021, 1:25:30 PM'),
});
timer.start();
