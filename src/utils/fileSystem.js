export const createFileSystem = () => {
    return {
      root: {
        name: "C:",
        type: "drive",
        children: {
          Users: {
            name: "Users",
            type: "folder",
            children: {
              Documents: {
                name: "Documents",
                type: "folder",
                children: {
                  "Projet 1.pdf": {
                    name: "Projet 1.pdf",
                    type: "file",
                    content: "Contenu du projet 1"
                  },
                  "Projet 2.pdf": {
                    name: "Projet 2.pdf",
                    type: "file",
                    content: "Contenu du projet 2"
                  }
                }
              },
              Videos: {
                name: "Videos",
                type: "folder",
                children: {}
              }
            }
          }
        }
      }
    };
  };