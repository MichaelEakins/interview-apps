import { Console } from "./components/Console.js";

class App {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.init();
  }

  init() {
    const console = new Console();
    this.rootElement.appendChild(console.render());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");
  const app = new App(rootElement);
});
