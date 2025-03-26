// components/Desktop/Desktop.jsx
import { useState } from 'react';
import { FileExplorer } from '../FileExplorer/FileExplorer';

export const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [icons, setIcons] = useState([
    { id: 1, name: 'Explorateur de fichiers', type: 'fileExplorer', x: 50, y: 50 }
  ]);

  const openWindow = (type) => {
    const newWindow = {
      id: Date.now(),
      type,
      title: type === 'fileExplorer' ? 'Explorateur de fichiers' : 'Nouvelle fenêtre',
      x: Math.random() * 200,
      y: Math.random() * 100,
      width: 800,
      height: 600,
      minimized: false
    };
    setWindows([...windows, newWindow]);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(window => window.id !== id));
  };

  return (
    <div className="desktop">
      {/* Icônes */}
      {icons.map(icon => (
        <div 
          key={icon.id}
          className="desktop-icon"
          style={{ left: icon.x, top: icon.y }}
          onDoubleClick={() => openWindow(icon.type)}
        >
          {icon.name}
        </div>
      ))}
      
      {/* Fenêtres */}
      {windows.map(window => (
        <Window
          key={window.id}
          {...window}
          onClose={() => closeWindow(window.id)}
        >
          {window.type === 'fileExplorer' && <FileExplorer />}
        </Window>
      ))}
    </div>
  );
};