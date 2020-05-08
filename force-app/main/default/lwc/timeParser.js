const parserT = seconds => {
  let h = (seconds / 3600) ^ 0;

  let m = ((seconds - h * 3600) / 60) ^ 0;

  let s = seconds - h * 3600 - m * 60;
  return (
    (h < 10 ? "0" + h : h) +
    ":" +
    (m < 10 ? "0" + m : m) +
    ":" +
    (s < 10 ? "0" + s : s)
  );
};
export { parserT };
