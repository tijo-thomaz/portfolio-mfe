import React, { useEffect, useState } from "react";

function HTMXContainer() {
  const [htmxContent, setHtmxContent] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/") // Fetch from htmx-mfe
      .then((res) => res.text())
      .then((html) => setHtmxContent(html))
      .catch((err) => console.error("Failed to load HTMX MFE:", err));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmxContent }} />;
}

function App() {
  return (
    <div>
      <h1>Welcome to My Portfolio</h1>
      <HTMXContainer />
    </div>
  );
}

export default App;
