const button = document.getElementById("toggle");

// Load saved state
chrome.storage.local.get(["enabled"], (result) => {
  const enabled = result.enabled !== false;
  updateUI(enabled);
});

// Click handler
button.addEventListener("click", () => {
  chrome.storage.local.get(["enabled"], (result) => {
    const enabled = result.enabled !== false;
    const newState = !enabled;

    // Save state
    chrome.storage.local.set({ enabled: newState });

    // Enable / disable ruleset
    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: newState ? ["ruleset"] : [],
      disableRulesetIds: newState ? [] : ["ruleset"]
    });

    // Animations
    triggerPulse();
    updateUI(newState);
  });
});

// Update button appearance
function updateUI(enabled) {
  button.classList.remove("on", "off");
  button.classList.add(enabled ? "on" : "off");
  button.textContent = enabled ? "Ad Blocker: ON" : "Ad Blocker: OFF";
}

// Force animation restart
function triggerPulse() {
  button.classList.remove("pulse");
  void button.offsetWidth; // magic line ✨
  button.classList.add("pulse");
}

