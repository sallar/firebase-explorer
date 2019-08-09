import React, { useEffect, useState } from "react";

interface CollectionProps {
  path: string;
  onSelectPath(path: string): any;
}

const Collection: React.FunctionComponent<CollectionProps> = ({
  path,
  onSelectPath
}) => {
  const [data, setData] = useState<any[]>([]);

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
