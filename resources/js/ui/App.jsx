import React from 'react'
import reactDom from 'react-dom';

function App() {
  return (
    <div>App</div>
  )
}

const root = reactDom.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

