import React, { useContext } from "react";
import { AppContext } from "./Context";
import { Document } from "./Document";

interface DocumentListProps {
  documents: Document[];
}

const DocumentList: React.FunctionComponent<DocumentListProps> = ({
  documents
}) => {
  const { onSelectPath } = useContext(AppContext);

  return (
    <ul>
      {documents.map(item => (
        <li key={item.id} onClick={() => onSelectPath(item.path)}>
          {item.id}
        </li>
      ))}
    </ul>
  );
};

export default DocumentList;
