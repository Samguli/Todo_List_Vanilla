class UI {
  constructor(firstSelect, secondSelect) {
    this.firstSelect = firstSelect;
    this.secondSelect = secondSelect;

    this.firstDisplay = document.getElementById("currency-first-display");
    this.secondDisplay = document.getElementById("currency-second-display");
    this.output = document.getElementById("output");
  }

  changeFirst() {
    this.firstDisplay.textContent =
      this.firstSelect.options[this.firstSelect.selectedIndex].textContent;
  }

  changeSecond() {
    this.secondDisplay.textContent =
      this.secondSelect.options[this.secondSelect.selectedIndex].textContent;
  }

  displayResult(result) {
    this.output.value = result;
  }
}
