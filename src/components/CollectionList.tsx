import React, { useContext } from "react";
import { AppContext } from "./Context";

export interface Collection {
  id: string;
  path: string;
}

interface CollectionListProps {
  collections: Collection[];
}

const CollectionList: React.FunctionComponent<CollectionListProps> = ({
  collections
}) => {
  const { onSelectPath } = useContext(AppContext);

  return (
    <ul>
      {collections.map(item => (
        <li key={item.id} onClick={() => onSelectPath(item.path)}>
          {item.id}
        </li>
      ))}
    </ul>
  );
};

export default CollectionList;
