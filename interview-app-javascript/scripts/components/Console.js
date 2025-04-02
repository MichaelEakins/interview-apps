export class Console {
  constructor() {
    this.element = null;
    this.searchResults = [];
    this.isLoading = false;
    this.commandHistory = [];
    this.currentHistoryIndex = -1;
  }

  render() {
    this.element = document.createElement("div");
    this.element.className = "console";

    this.element.innerHTML = `
      <div class="console-header">
        <h1>Music Search Console</h1>
      </div>
      <div class="console-content">
        <div class="console-output" id="console-output">
          <div class="console-welcome">
            <p>Welcome to Music Search Console v1.0</p>
            <p>Type 'help' to see available commands.</p>
          </div>
        </div>
        <div class="console-input-container">
          <span class="console-prompt">></span>
          <input type="text" id="console-input" class="console-input" placeholder="Enter command..." autocomplete="off" />
        </div>
      </div>
    `;

    this.attachEventListeners();
    return this.element;
  }

  attachEventListeners() {
    const consoleInput = this.element.querySelector("#console-input");

    consoleInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const command = consoleInput.value.trim();
        if (command) {
          this.executeCommand(command);
          this.commandHistory.push(command);
          this.currentHistoryIndex = this.commandHistory.length;
          consoleInput.value = "";
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.navigateHistory(-1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        this.navigateHistory(1);
      }
    });
  }

  navigateHistory(direction) {
    const consoleInput = this.element.querySelector("#console-input");

    if (this.commandHistory.length === 0) return;

    this.currentHistoryIndex += direction;

    if (this.currentHistoryIndex < 0) {
      this.currentHistoryIndex = 0;
    } else if (this.currentHistoryIndex >= this.commandHistory.length) {
      this.currentHistoryIndex = this.commandHistory.length;
      consoleInput.value = "";
      return;
    }

    consoleInput.value = this.commandHistory[this.currentHistoryIndex];
  }

  printToConsole(message, type = "info") {
    const consoleOutput = this.element.querySelector("#console-output");
    const messageElement = document.createElement("div");
    messageElement.className = `console-message console-${type}`;
    messageElement.innerHTML = message;
    consoleOutput.appendChild(messageElement);

    // Scroll to bottom
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  }

  executeCommand(commandText) {
    const command = commandText.split(" ")[0].toLowerCase();
    const args = commandText.split(" ").slice(1).join(" ");

    this.printToConsole(
      `<span class="console-executed">> ${commandText}</span>`,
      "command"
    );

    switch (command) {
      case "help":
        this.showHelp();
        break;
      case "clear":
        this.clearConsole();
        break;
      case "search":
        if (args) {
          this.searchArtist(args);
        } else {
          this.printToConsole(
            "Error: Please provide an artist name. Example: search Beatles",
            "error"
          );
        }
        break;
      case "about":
        this.showAbout();
        break;
      default:
        this.printToConsole(
          `Command not found: ${command}. Type 'help' to see available commands.`,
          "error"
        );
    }
  }

  showHelp() {
    const helpText = `
      <div class="help-content">
        <p>Available commands:</p>
        <ul>
          <li><strong>search [artist]</strong> - Search for music by artist name</li>
          <li><strong>clear</strong> - Clear the console</li>
          <li><strong>help</strong> - Show this help message</li>
          <li><strong>about</strong> - About this application</li>
        </ul>
        <p>Use arrow up/down keys to navigate command history.</p>
      </div>
    `;
    this.printToConsole(helpText, "help");
  }

  showAbout() {
    const aboutText = `
      <div class="about-content">
        <p>Music Search Console v1.0</p>
        <p>A simple console interface for searching iTunes music database.</p>
        <p>Built with Vanilla JavaScript.</p>
      </div>
    `;
    this.printToConsole(aboutText, "about");
  }

  clearConsole() {
    const consoleOutput = this.element.querySelector("#console-output");
    consoleOutput.innerHTML = "";
    this.printToConsole("<p>Console cleared.</p>", "info");
  }

  async searchArtist(artistName) {
    this.printToConsole(`Searching for "${artistName}"...`, "info");
    this.isLoading = true;

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          artistName
        )}&entity=musicArtist,album,song&limit=10`
      );
      const data = await response.json();

      this.searchResults = data.results;

      if (this.searchResults.length === 0) {
        this.printToConsole(`No results found for "${artistName}".`, "warning");
      } else {
        this.renderResults(artistName);
      }
    } catch (error) {
      this.printToConsole(
        `Error searching for "${artistName}": ${error.message}`,
        "error"
      );
    } finally {
      this.isLoading = false;
    }
  }

  renderResults(artistName) {
    let resultsHTML = `<div class="search-results">
      <p>Found ${this.searchResults.length} results for "${artistName}":</p>
      <table class="results-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Artist</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
    `;

    this.searchResults.forEach((item, index) => {
      const type = item.kind || item.wrapperType || "Unknown";
      const artist = item.artistName || "Unknown";
      const name = item.trackName || item.collectionName || artist;

      resultsHTML += `
        <tr>
          <td>${type.charAt(0).toUpperCase() + type.slice(1)}</td>
          <td>${artist}</td>
          <td>${name}</td>
        </tr>
      `;
    });

    resultsHTML += `
        </tbody>
      </table>
    </div>`;

    this.printToConsole(resultsHTML, "result");
  }
}
