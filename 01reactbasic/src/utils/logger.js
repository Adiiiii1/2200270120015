// src/utils/logger.js

export async function log(stack, level, pkg, message) {
  const validStacks = ["frontend", "backend"];
  const validLevels = ["debug", "info", "warn", "error", "fatal"];
  const validFrontendPackages = [
    "api", "component", "hook", "page", "state", "style",
    "auth", "config", "middleware", "utils"
  ];

  // ✅ Validation
  if (!validStacks.includes(stack)) {
    console.error(`Invalid stack: ${stack}`);
    return;
  }

  if (!validLevels.includes(level)) {
    console.error(`Invalid level: ${level}`);
    return;
  }

  if (stack === "frontend" && !validFrontendPackages.includes(pkg)) {
    console.error(`Invalid frontend package: ${pkg}`);
    return;
  }

  // ✅ Create log object
  const logPayload = {
    stack,
    level,
    package: pkg,
    message,
  };

  // ✅ API call
  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add Authorization here if needed
      },
      body: JSON.stringify(logPayload),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Log created:", data);
    } else {
      console.warn("❌ Log failed:", data.message || response.statusText);
    }
  } catch (error) {
    console.error("🚨 Network error during log:", error.message);
  }
}
