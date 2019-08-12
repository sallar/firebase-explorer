import React, { useContext } from "react";
import { AppContext } from "./Context";
import { Document } from "./Document";
import { normalizePath } from "../utils/path";

interface DocumentListProps {
  documents: Document[];
  currentId: string | null;
}

const DocumentList: React.FunctionComponent<DocumentListProps> = ({
  documents,
  currentId
}) => {
  const { onSelectPath, path } = useContext(AppContext);

  return (
    <ul>
      {documents.map(item => (
        <li
          key={item.id}
          onClick={() => onSelectPath(item.path)}
          style={{ fontWeight: item.id === currentId ? "bold" : "normal" }}
        >
          {item.id}
        </li>
      ))}
    </ul>
  );
};

export default DocumentList;
