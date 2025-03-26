import { useState } from "react";
import { createFileSystem } from "../utils/fileSystem";

export const useFileSystem = () => {
  const [fileSystem, setFileSystem] = useState(createFileSystem());
  const [currentPath, setCurrentPath] = useState(fileSystem.root);
  const [pathHistory, setPathHistory] = useState([fileSystem.root]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const findItemByPath = (path) => {
    if (path === "/" || path === "C:") return fileSystem.root;

    const parts = path.split('/').filter(p => p && p !== 'C:');
    let current = fileSystem.root;

    for (const part of parts) {
      if (!current.children || !current.children[part]) {
        return null;
      }
      current = current.children[part];
    }
    
    return current;
  };

  const navigateTo = (path) => {
    // Si c'est un nom simple dans le dossier courant
    if (currentPath.children && currentPath.children[path]) {
      const newItem = currentPath.children[path];
      if (newItem.type === "folder") {
        const newHistory = [...pathHistory.slice(0, historyIndex + 1), newItem];
        setPathHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setCurrentPath(newItem);
        return true;
      }
      return false;
    }

    // Pour les chemins absolus
    const target = findItemByPath(path);
    if (target?.type === "folder") {
      const newHistory = [...pathHistory.slice(0, historyIndex + 1), target];
      setPathHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setCurrentPath(target);
      return true;
    }

    console.error(`Chemin non trouvé: ${path}`);
    return false;
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(pathHistory[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < pathHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(pathHistory[historyIndex + 1]);
    }
  };

  const createFile = (fileName, content = "") => {
    if (!fileName || !currentPath.children) return false;

    const newFile = {
      name: fileName,
      type: "file",
      content: content,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };

    setFileSystem((prev) => {
      const newFileSystem = JSON.parse(JSON.stringify(prev));
      let current = newFileSystem.root;
      
      if (currentPath.name === 'C:') {
        current.children[fileName] = newFile;
        current.modifiedAt = new Date().toISOString();
        return newFileSystem;
      }

      const pathParts = currentPath.name.split("/").filter((p) => p);
      for (const part of pathParts) {
        current = current.children[part];
      }

      current.children = current.children || {};
      current.children[fileName] = newFile;
      current.modifiedAt = new Date().toISOString();

      return newFileSystem;
    });

    return true;
  };

  const createFolder = (folderName) => {
    if (!folderName) return false;
    console.log('ca marche');
    
    const newFolder = {
      name: folderName,
      type: "folder",
      children: {},
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };

    setFileSystem((prev) => {
      const newFileSystem = JSON.parse(JSON.stringify(prev));
      let current = newFileSystem.root;
    //   console.log(newFileSystem,"1st");
      
      if (currentPath.name === 'C:') {
        current.children[folderName] = newFolder;
        current.modifiedAt = new Date().toISOString();
        return newFileSystem;
      }

      const pathParts = currentPath.name.split("/").filter((p) => p);
      for (const part of pathParts) {
        current = current.children[part];
      }

      current.children = current.children || {};
      current.children[folderName] = newFolder;
      current.modifiedAt = new Date().toISOString();

      return newFileSystem;
    });
    // console.log("2",fileSystem);
    
    return true;
  };

  return {
    fileSystem,
    currentPath,
    pathHistory,
    historyIndex,
    navigateTo,
    goBack,
    goForward,
    createFile,
    createFolder,
    findItemByPath,
  };
};