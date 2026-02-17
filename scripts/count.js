document.addEventListener("DOMContentLoaded", () => {
  const stats = document.querySelectorAll(".stats-number");
  const animateStats = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.innerText.replace(/\D/g, ''));
        const suffix = target.innerText.replace(/[0-9]/g, '');
        let startValue = 0;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / finalValue));

        const timer = setInterval(() => {
          startValue += 1;
          target.innerText = startValue + suffix;
          if (startValue >= finalValue) {
            clearInterval(timer);
            target.innerText = finalValue + suffix;
          }
        }, stepTime > 0 ? stepTime : 10);
        observer.unobserve(target);
      }
    })
  }
  const observer = new IntersectionObserver(animateStats, { threshold: 0.5 });
  stats.forEach(stat => {
    observer.observe(stat);
  });
}); 