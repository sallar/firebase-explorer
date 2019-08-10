import React, { useContext } from "react";
import { AppContext } from "./Context";
import { Document } from "./Document";
import { normalizePath } from "../utils/path";

interface DocumentListProps {
  documents: Document[];
}

const DocumentList: React.FunctionComponent<DocumentListProps> = ({
  documents
}) => {
  const { onSelectPath, path } = useContext(AppContext);

  return (
    <ul>
      {documents.map(item => (
        <li
          key={item.id}
          onClick={() => onSelectPath(item.path)}
          style={{
            fontWeight: item.path === path ? "bold" : "normal"
          }}
        >
          {item.id}
        </li>
      ))}
    </ul>
  );
};

export default DocumentList;
