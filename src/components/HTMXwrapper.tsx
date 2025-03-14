import React, { useEffect } from "react";

// Define the Web Component
class HTMXWrapper extends HTMLElement {
  async connectedCallback() {
    const mountPoint = document.createElement("div");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);

    // Fetch HTMX-powered UI from Cloud Run
    const response = await fetch("http://localhost:8080/");
    const html = await response.text();
    mountPoint.innerHTML = html;
  }
}

// Ensure the component is only defined once
if (!customElements.get("htmx-wrapper")) {
  customElements.define("htmx-wrapper", HTMXWrapper);
}

// React Component Wrapper for Web Component
const HTMXContainer: React.FC = () => {
  useEffect(() => {
    if (!customElements.get("htmx-wrapper")) {
      customElements.define("htmx-wrapper", HTMXWrapper);
    }
  }, []);

  return React.createElement("htmx-wrapper");
};

export default HTMXContainer;
