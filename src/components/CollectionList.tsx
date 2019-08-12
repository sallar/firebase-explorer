import React, { useContext } from "react";
import { AppContext } from "./Context";

export interface Collection {
  id: string;
  path: string;
}

interface CollectionListProps {
  collections: Collection[];
  currentId: string | null;
}

const CollectionList: React.FunctionComponent<CollectionListProps> = ({
  collections,
  currentId
}) => {
  const { onSelectPath } = useContext(AppContext);

  return (
    <ul>
      {collections.map(item => (
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

export default CollectionList;
