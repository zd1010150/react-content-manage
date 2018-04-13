let knightPosition = [0, 0];
let observer = null;

function emitChange() {
  observer(knightPosition);
}
export function observe(receiver) {
  if (observer) {
    throw Error('There can only be one observer!');
  }
  observer = receiver;
  emitChange();
}
export function changePosition(pos) {
  knightPosition = pos;
  emitChange();
}
export function checkCanmove(toX, toY) {
  const [x, y] = knightPosition;
  const dx = toX - x;
  const dy = toY - y;

  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
        (Math.abs(dx) === 1 && Math.abs(dy) === 2);
}
