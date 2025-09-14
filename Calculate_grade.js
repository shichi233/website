// core math
function requiredTestScore(currentGrade, testWeight, desiredGrade) {
  const weight = testWeight / 100;
  if (weight === 0) return null; // test doesn't affect grade

  let needed = (desiredGrade - currentGrade * (1 - weight)) / weight;

  // clamp to 0..100
  if (needed < 0) needed = 0;
  if (needed > 100) needed = 100;
  return needed;
}

// UI wiring
function $(id) { return document.getElementById(id); }

function calcAndShow() {
  const current = parseFloat($("current").value);
  const weight = parseFloat($("weight").value);
  const desired = parseFloat($("desired").value);
  const out = $("output");

  if ([current, weight, desired].some(v => Number.isNaN(v))) {
    out.textContent = "Please enter valid numbers for all fields.";
    return;
  }
  if (current < 0 || current > 100 || weight < 0 || weight > 100 || desired < 0 || desired > 100) {
    out.textContent = "All values must be between 0 and 100.";
    return;
  }

  const result = requiredTestScore(current, weight, desired);
  if (result === null) {
    out.textContent = "The test weight is zero; it won't affect your grade.";
  } else {
    out.textContent = `You need at least ${result.toFixed(2)}% on the test to get ${desired}% overall.`;
  }
}

// attach once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const btn = $("calc");
  if (btn) btn.addEventListener("click", calcAndShow);
});
