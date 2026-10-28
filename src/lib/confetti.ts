import confetti from 'canvas-confetti';

export function fireGrandCelebration() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#F59E0B', '#F43F5E', '#EC4899', '#8B5CF6', '#FCD34D', '#FFFFFF'];

  // Initial center blast
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
    colors,
    startVelocity: 45,
    scalar: 1.2,
  });

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 45 * (timeLeft / duration);

    // Left cannon
    confetti({
      particleCount,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.7 },
      colors,
      startVelocity: 50,
    });

    // Right cannon
    confetti({
      particleCount,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.7 },
      colors,
      startVelocity: 50,
    });
  }, 220);
}

export function fireQuickSparkle(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 35,
    spread: 50,
    origin: { x, y },
    colors: ['#F59E0B', '#F43F5E', '#FFFFFF'],
    startVelocity: 25,
    ticks: 40,
  });
}
