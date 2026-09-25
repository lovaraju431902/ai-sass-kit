/**
 * Analytical Spring Easing Generator for GSAP
 * Simulates mass-spring-damper step integration and returns a normalized (t => progress) ease.
 */
function simulateSpringStep(
  position: number,
  target: number,
  velocity: number,
  stiffness: number,
  damping: number,
  dt: number,
  result: [number, number],
): [number, number] {
  const springForce = -stiffness * (position - target);
  const dampingForce = -damping * velocity;
  const totalForce = springForce + dampingForce;
  const newVelocity = velocity + totalForce * dt;
  const newPosition = position + newVelocity * dt;

  if (Math.abs(newVelocity) < 1 && Math.abs(newPosition - target) < 1) {
    result[0] = target;
    result[1] = 0;
  } else {
    result[0] = newPosition;
    result[1] = newVelocity;
  }
  return result;
}

export function createSpring(tension = 0.5, friction = 0.5): (t: number) => number {
  const stiffness = Math.min(Math.max(350 * tension, 20), 350);
  const damping = Math.min(Math.max(40 - 40 * friction, 1), 40);
  const target = 10000;
  const dt = 16 / target;
  const result: [number, number] = [0, 0];

  const points: number[] = [];
  let position = 0;
  let velocity = 0;

  while (position !== target || velocity !== 0) {
    const step = simulateSpringStep(position, target, velocity, stiffness, damping, dt, result);
    position = step[0];
    velocity = step[1];
    points.push(position / target);
  }

  return (t: number): number => {
    return points[Math.ceil(t * (points.length - 1))];
  };
}

export const Springer = {
  default: (tension = 0.2, friction = 0.8) => createSpring(tension, friction),
};
