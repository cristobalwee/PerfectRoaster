export const getElapsedTime = (startedAt, stoppedAt = new Date().getTime()) => {
  if (!startedAt) {
    return 0;
  } else {
    return stoppedAt - startedAt;
  }
}