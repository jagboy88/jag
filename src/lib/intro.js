/**
 * Tiny pub/sub so sections can wait for the preloader curtain to lift
 * before they play their entrance animations. If the preloader is skipped
 * (reduced motion, or already seen this session) it resolves immediately.
 */
let done = false;
const subscribers = new Set();

export function markIntroDone() {
  if (done) return;
  done = true;
  subscribers.forEach((cb) => cb());
  subscribers.clear();
}

export function onIntroDone(cb) {
  if (done) {
    cb();
    return () => {};
  }
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

export const isIntroDone = () => done;
