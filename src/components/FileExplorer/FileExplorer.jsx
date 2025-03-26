import { useEffect, useMemo, useState } from "react";
import { useFileSystem } from "../../hooks/useFileSystem";

export const FileExplorer = () => {
  const {
    currentPath,
    navigateTo,
    createFile,
    createFolder,
    goBack,
    fileSystem,
    goForward,
    pathHistory,
    historyIndex,
    findItemByPath,
  } = useFileSystem();

  const [newItemName, setNewItemName] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [itemType, setItemType] = useState("file");
  const [current, setCurrent] = useState(fileSystem.root);

  const handleCreateItem = () => {
    if (!newItemName.trim()) return;
    itemType === "file" ? createFile(newItemName) : createFolder(newItemName);
    setShowCreateDialog(false);
    setNewItemName("");
  };

  if (!currentPath || !currentPath.children) {
    return (
      <div className="flex items-center justify-center h-full bg-[#008080] text-white">
        Chargement...
      </div>
    );
  }


  useEffect(() => {
    if (!fileSystem.root || !currentPath) return;
    
    if(current.name=="C:") {
      setCurrent(fileSystem.root)
      console.log(current,fileSystem.root);
    } else {
    
    let tempCurrent = current;
    const pathParts = currentPath.name.split("/").filter((p) => p !== "C:" && p !== "");

    for (const part of pathParts) {
      if (!tempCurrent.children || !tempCurrent.children[part]) {
        console.error(`Part "${part}" not found in children of`, tempCurrent);
        return;
      }
      tempCurrent = tempCurrent.children[part];
    }

    setCurrent(tempCurrent);}
  }, [fileSystem, currentPath,current]);

  const currentContent = useMemo(() => {
    
    return current?.children ? Object.values(current.children) : [];
  }, [current]);
  
 const goBaaack = () => {
  if (historyIndex > 0) {
    setCurrent(pathHistory[historyIndex - 1]);
  }
  goBack()
};

  return (
    <div className="flex flex-col h-full bg-[#008080] border-2 border-[#000080] shadow-[inset_0_0_0_1px_white,inset_2px_2px_0_#dfdfdf]">
      {/* Barre de menu */}
      <div className="flex items-center bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2 py-1">
        <span className="font-bold">Explorateur Windows</span>
      </div>

      {/* Barre d'outils */}
      <div className="flex items-center bg-[#c0c0c0] border-b border-[#808080] p-1 gap-1">
        <button
          onClick={goBaaack}
          disabled={historyIndex === 0}
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] shadow-[inset_-1px_-1px_0_#000,inset_1px_1px_0_#dfdfdf] disabled:opacity-50"
        >
          ←
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex === pathHistory.length - 1}
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] shadow-[inset_-1px_-1px_0_#000,inset_1px_1px_0_#dfdfdf] disabled:opacity-50"
        >
          →
        </button>
        <button
          onClick={() => setShowCreateDialog(true)}
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] shadow-[inset_-1px_-1px_0_#000,inset_1px_1px_0_#dfdfdf]"
        >
          Nouveau
        </button>
      </div>

      {/* Barre d'adresse */}
      <div className="flex items-center bg-[#c0c0c0] p-1 border-b border-[#808080]">
        <div className="flex flex-wrap items-center gap-1">
          {pathHistory.slice(0, historyIndex + 1).map((path, index) => (
            <span
              key={index}
              onClick={() => navigateTo(path.name)}
              className={`px-1 cursor-pointer ${
                index === historyIndex
                  ? "font-bold bg-[#000080] text-white"
                  : "hover:bg-[#a0a0a0]"
              }`}
            >
              {path.name} {index < historyIndex ? ">" : ""}
            </span>
          ))}
        </div>
      </div>
      {/* Contenu */}
      <div className="flex-1 overflow-auto bg-white p-2 grid grid-cols-4 gap-2">
        {currentContent && currentContent.length > 0 ? (
          currentContent.map((item) => (
            <div
              key={item.name}
              className={`flex flex-col items-center p-2 cursor-default ${
                item.type === "folder"
                  ? "text-blue-800 font-bold"
                  : "text-black"
              } hover:bg-[#000080] hover:text-white`}
              onClick={() =>
                item.type === "folder" ? navigateTo(item.name) : null
              }
              onDoubleClick={() =>
                item.type === "file" && console.log("Opening file:", item)
              }
            >
              <div
                className={`w-12 h-12 mb-1 ${
                  item.type === "folder" ? "bg-[#ffa500]" : "bg-[#c0c0c0]"
                } border border-[#808080] shadow-[inset_-1px_-1px_0_#000,inset_1px_1px_0_#dfdfdf]`}
              ></div>
              <span className="text-center text-xs">{item.name}</span>
            </div>
          ))
        ) : (
          <div className="text-gray-500">Dossier vide</div>
        )}
      </div>

      {/* Barre de statut */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] p-1 text-xs">
        {Object.values(currentPath.children).length} éléments
      </div>

      {/* Boîte de dialogue */}
      {showCreateDialog && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#c0c0c0] border-2 border-[#000080] shadow-[inset_0_0_0_1px_white] w-64">
          <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2 py-1 flex justify-between items-center">
            <span className="font-bold">Nouvel élément</span>
            <button
              onClick={() => setShowCreateDialog(false)}
              className="text-white"
            >
              ✕
            </button>
          </div>

          <div className="p-3">
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              className="w-full text-black mb-2 bg-white border border-[#808080] shadow-[inset_-1px_-1px_0_#000]"
            >
              <option value="file">Fichier</option>
              <option value="folder">Dossier</option>
            </select>

            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Nom"
              className="w-full px-1 text-black py-0.5 border border-[#808080] shadow-[inset_-1px_-1px_0_#000] mb-3"
              onKeyDown={(e) => e.key === "Enter" && handleCreateItem()}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCreateItem}
                className="px-3 py-0.5 bg-[#c0c0c0] border border-[#808080] shadow-[inset_-1px_-1px_0_#000,inset_1px_1px_0_#dfdfdf]"
              >
                Créer
              </button>
              <button
                onClick={() => setShowCreateDialog(false)}
                className="px-3 py-0.5 bg-[#c0c0c0] border border-[#808080] shadow-[inset_-1px_-1px_0_#000,inset_1px_1px_0_#dfdfdf]"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
