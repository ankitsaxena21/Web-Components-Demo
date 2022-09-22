class EditWord extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  render() {
    this.shadow.innerHTML = `
      <style>
      span {
         background-color: #eef;
        padding: 0 2px
       }
      </style>
      <form style="display: none;">
      <input required="required" style="width: 36px;" value=${this.textContent}>
      </form>
      <span style="display: inline-block;">${this.textContent}</span>
          `;
  }

  connectedCallback() {
    this.render();

    const form = this.shadow.querySelector("form");
    const input = this.shadow.querySelector("input");
    const span = this.shadow.querySelector("span");

    this.addEventListener("click", () => {
      span.style.display = "none";
      form.style.display = "inline-block";
      input.focus();
      input.setSelectionRange(0, input.value.length);
    });

    form.addEventListener("submit", this.updateDisplay.bind(this));

    input.addEventListener("blur", this.updateDisplay.bind(this));
  }

  updateDisplay(e) {
    e.preventDefault();
    const form = this.shadow.querySelector("form");
    const input = this.shadow.querySelector("input");
    const span = this.shadow.querySelector("span");
    span.style.display = "inline-block";
    form.style.display = "none";
    span.textContent = input.value;
    input.style.width = span.clientWidth + "px";
  }
}

customElements.define("edit-word", EditWord);
