/*
 * iTunes Music Search Console
 *
 * This application allows users to search for music in the iTunes library through a command line interface.
 *
 * Known Issues:
 * 1. Album artwork images are not displaying correctly
 * 2. "No results" message appears before search is performed
 * 3. Page continuously re-renders after performing a search
 */

export class Console {
  constructor() {
    this.element = null;
    this.searchResults = [];
    this.isLoading = false;
    this.commandHistory = [];
    this.currentHistoryIndex = -1;
    this.refreshInterval = null;
    this.refreshCount = 0;
  }

  render() {
    this.element = document.createElement("div");
    this.element.className = "console";

    this.element.innerHTML = `
      <div class="console-header">
        <h1>Music Search Console</h1>
        <div id="refresh-counter" class="refresh-counter">Refreshes: 0</div>
      </div>
      <div class="console-content">
        <div class="console-output" id="console-output">
          <div class="console-welcome">
            <p>Welcome to Music Search Console v1.0</p>
            <p>Type 'search' followed by an artist name (e.g., "search metallica")</p>
            <p>Type 'help' to see all available commands.</p>
          </div>
        </div>
        <div class="console-input-container">
          <span class="console-prompt">></span>
          <input type="text" id="console-input" class="console-input" placeholder="Type 'search' followed by an artist name..." autocomplete="off" />
        </div>
      </div>
    `;

    this.attachEventListeners();

    // Immediately start a refresh cycle - this will cause visible re-rendering
    this.startBackgroundRefresh();

    return this.element;
  }

  startBackgroundRefresh() {
    // Set an interval that updates the refresh counter
    setInterval(() => {
      if (this.element) {
        const counterElement = this.element.querySelector("#refresh-counter");
        if (counterElement) {
          this.refreshCount++;
          counterElement.textContent = `Refreshes: ${this.refreshCount}`;

          // Force layout recalculation by getting offsetHeight
          this.element.offsetHeight;

          // Every 5 refreshes, add a message to the console
          if (this.refreshCount % 5 === 0) {
            this.printToConsole(
              `App refresh cycle: ${this.refreshCount}`,
              "warning"
            );
          }
        }
      }
    }, 1000);
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

    // Show "No results" as soon as typing begins
    consoleInput.addEventListener("input", (e) => {
      if (consoleInput.value.trim() !== "") {
        this.showNoResults(consoleInput.value.trim());
      }
    });
  }

  showNoResults(term) {
    // Find and remove any existing "no results" message
    const existingNoResults = this.element.querySelectorAll(
      ".console-no-results"
    );
    existingNoResults.forEach((el) => el.remove());

    // Add a new "no results" message
    const consoleOutput = this.element.querySelector("#console-output");
    const messageElement = document.createElement("div");
    messageElement.className =
      "console-message console-warning console-no-results";
    messageElement.innerHTML = `No results found for "${term}".`;
    consoleOutput.appendChild(messageElement);

    // Scroll to bottom
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
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
    const parts = commandText.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    // First, print the command to the console
    this.printToConsole(
      `<span class="console-executed">> ${commandText}</span>`,
      "command"
    );

    // Process command
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
          <li><strong>search [artist]</strong> - Search for music by artist name (e.g., "search metallica")</li>
          <li><strong>clear</strong> - Clear the console</li>
          <li><strong>help</strong> - Show this help message</li>
          <li><strong>about</strong> - About this application</li>
        </ul>
        <p>Example: Type "search metallica" to find Metallica's music</p>
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
        <p>To search for an artist, type "search" followed by the artist name.</p>
      </div>
    `;
    this.printToConsole(aboutText, "about");
  }

  clearConsole() {
    const consoleOutput = this.element.querySelector("#console-output");
    consoleOutput.innerHTML = "";
    this.printToConsole("<p>Console cleared.</p>", "info");
    this.printToConsole(
      '<p>To search for music: type <strong>search</strong> followed by an artist name (e.g., "search metallica")</p>',
      "info"
    );
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
        // Increase refresh rate when search results are displayed
        this.refreshCount = 0;
        this.accelerateRefreshes();
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

  accelerateRefreshes() {
    // This will create a noticeable flickering effect
    const flickerInterval = setInterval(() => {
      if (this.element) {
        // Toggle a class on the console to create a visible flicker
        this.element.classList.toggle("flicker");

        // Re-render the results
        if (this.searchResults.length > 0) {
          this.renderResults("Refresh #" + ++this.refreshCount);
        }

        // Stop after 20 flickers to prevent browser issues
        if (this.refreshCount > 20) {
          clearInterval(flickerInterval);
        }
      }
    }, 500);
  }

  renderResults(artistName) {
    // Calculate result types for better display
    const resultTypes = {};
    this.searchResults.forEach((item) => {
      const type = item.kind || item.wrapperType || "Unknown";
      if (!resultTypes[type]) {
        resultTypes[type] = 0;
      }
      resultTypes[type]++;
    });

    // Create result summary
    let typeText = Object.entries(resultTypes)
      .map(([type, count]) => `${count} ${type}${count > 1 ? "s" : ""}`)
      .join(", ");

    let resultsHTML = `<div class="search-results">
      <p>Found ${this.searchResults.length} results for "${artistName}" (${typeText}):</p>
      <table class="results-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Artist</th>
            <th>Name</th>
            <th>Cover</th>
          </tr>
        </thead>
        <tbody>
    `;

    this.searchResults.forEach((item, index) => {
      const type = item.kind || item.wrapperType || "Unknown";
      const artist = item.artistName || "Unknown";
      const name = item.trackName || item.collectionName || artist;

      // Intentionally broken image display - using incorrect property
      // This is what the interviewee needs to fix
      const artwork = item.incorrectProperty || "/missing-artwork.jpg";

      // Create the image element, which will show as broken
      const artworkHtml = `<img src="${artwork}" alt="${name}" width="60" height="60" />`;

      resultsHTML += `
        <tr>
          <td>${type.charAt(0).toUpperCase() + type.slice(1)}</td>
          <td>${artist}</td>
          <td>${name}</td>
          <td class="artwork-cell">${artworkHtml}</td>
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
