import React, { useState, useRef, useEffect } from "react";
import "./Console.css";

function Console() {
  const [inputValue, setInputValue] = useState("");
  const [consoleMessages, setConsoleMessages] = useState([
    {
      type: "welcome",
      content: (
        <>
          <p>Welcome to Music Search Console v1.0</p>
          <p>Type 'help' to see available commands.</p>
        </>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const consoleOutputRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (consoleOutputRef.current) {
      consoleOutputRef.current.scrollTop =
        consoleOutputRef.current.scrollHeight;
    }
  }, [consoleMessages]);

  // Focus on input when component loads
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const executeCommand = async (command) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    // Add command to history
    setCommandHistory((prev) => [...prev, trimmedCommand]);
    setHistoryIndex((prevIndex) => prevIndex + 1);

    // Add command to console display
    setConsoleMessages((prev) => [
      ...prev,
      {
        type: "command",
        content: (
          <span className="console-executed">{`> ${trimmedCommand}`}</span>
        ),
      },
    ]);

    // Parse command
    const cmdParts = trimmedCommand.split(" ");
    const mainCommand = cmdParts[0].toLowerCase();
    const args = cmdParts.slice(1).join(" ");

    // Execute command
    switch (mainCommand) {
      case "help":
        showHelp();
        break;
      case "clear":
        clearConsole();
        break;
      case "search":
        if (args) {
          await searchArtist(args);
        } else {
          addMessage(
            "error",
            "Error: Please provide an artist name. Example: search Beatles"
          );
        }
        break;
      case "about":
        showAbout();
        break;
      default:
        addMessage(
          "error",
          `Command not found: ${mainCommand}. Type 'help' to see available commands.`
        );
    }

    // Clear input
    setInputValue("");
  };

  const addMessage = (type, content) => {
    setConsoleMessages((prev) => [...prev, { type, content }]);
  };

  const showHelp = () => {
    addMessage(
      "help",
      <div className="help-content">
        <p>Available commands:</p>
        <ul>
          <li>
            <strong>search [artist]</strong> - Search for music by artist name
          </li>
          <li>
            <strong>clear</strong> - Clear the console
          </li>
          <li>
            <strong>help</strong> - Show this help message
          </li>
          <li>
            <strong>about</strong> - About this application
          </li>
        </ul>
        <p>Use arrow up/down keys to navigate command history.</p>
      </div>
    );
  };

  const showAbout = () => {
    addMessage(
      "about",
      <div className="about-content">
        <p>Music Search Console v1.0</p>
        <p>A simple console interface for searching iTunes music database.</p>
        <p>Built with React.</p>
      </div>
    );
  };

  const clearConsole = () => {
    setConsoleMessages([
      {
        type: "info",
        content: <p>Console cleared.</p>,
      },
    ]);
  };

  const searchArtist = async (artistName) => {
    addMessage("info", `Searching for "${artistName}"...`);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          artistName
        )}&entity=musicArtist,album,song&limit=10`
      );
      const data = await response.json();

      if (data.results.length === 0) {
        addMessage("warning", `No results found for "${artistName}".`);
      } else {
        renderResults(artistName, data.results);
      }
    } catch (error) {
      addMessage(
        "error",
        `Error searching for "${artistName}": ${error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderResults = (artistName, results) => {
    addMessage(
      "result",
      <div className="search-results">
        <p>
          Found {results.length} results for "{artistName}":
        </p>
        <table className="results-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Artist</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => {
              const type = item.kind || item.wrapperType || "Unknown";
              const artist = item.artistName || "Unknown";
              const name = item.trackName || item.collectionName || artist;

              return (
                <tr key={index}>
                  <td>{type.charAt(0).toUpperCase() + type.slice(1)}</td>
                  <td>{artist}</td>
                  <td>{name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      navigateHistory(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      navigateHistory(1);
    }
  };

  const navigateHistory = (direction) => {
    if (commandHistory.length === 0) return;

    const newIndex = historyIndex + direction;

    if (newIndex >= 0 && newIndex < commandHistory.length) {
      setHistoryIndex(newIndex);
      setInputValue(commandHistory[newIndex]);
    } else if (newIndex >= commandHistory.length) {
      setHistoryIndex(commandHistory.length);
      setInputValue("");
    }
  };

  return (
    <div className="console">
      <div className="console-header">
        <h1>Music Search Console</h1>
      </div>
      <div className="console-content">
        <div className="console-output" ref={consoleOutputRef}>
          {consoleMessages.map((msg, index) => (
            <div key={index} className={`console-message console-${msg.type}`}>
              {msg.content}
            </div>
          ))}
          {isLoading && (
            <div className="console-message console-loading">
              <p>Loading...</p>
            </div>
          )}
        </div>
        <div className="console-input-container">
          <span className="console-prompt">{">"}</span>
          <input
            ref={inputRef}
            type="text"
            className="console-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter command..."
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}

export default Console;
