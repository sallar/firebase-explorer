import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "./Context";

interface CollectionProps {
  path: string;
}

const Collection: React.FunctionComponent<CollectionProps> = ({
  path
}) => {
  const [data, setData] = useState<any[]>([]);
  const { onSelectPath } = useContext(AppContext);

  useEffect(() => {
    const getData = async () => {
      // @ts-ignore
      const docs = await window.getCollection(path);
      setData(docs);
    };
    getData();
  }, [path]);
  return (
    <ul>
      {data.map(item => (
        <li key={item.id} onClick={() => onSelectPath(item.path)}>
          {item.id}
        </li>
      ))}
    </ul>
  );
};

export default Collection;
