document.getElementById("clickMe").addEventListener("click", () => {
  const status = document.getElementById("status");
  status.textContent = "Button clicked! 🎉";
  console.log("Button clicked inside popup");
});
