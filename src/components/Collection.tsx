import React, { useEffect, useState } from "react";

interface CollectionProps {
  path: string;
}

const Collection: React.FunctionComponent<CollectionProps> = ({ path }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      // @ts-ignore
      const col = await window.getCollection(path);
      setData(col);
    };
    getData();
  }, [path]);
  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.id}</li>
      ))}
    </ul>
  );
};

export default Collection;
