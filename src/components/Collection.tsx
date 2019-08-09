import React, { useEffect, useState } from "react";
import { QueryDocumentSnapshot } from "@google-cloud/firestore";

interface CollectionProps {
  path: string;
}

const Collection: React.FunctionComponent<CollectionProps> = ({ path }) => {
  const [data, setData] = useState<QueryDocumentSnapshot[]>([]);

  useEffect(() => {
    const getData = async () => {
      // @ts-ignore
      const col = await window.getCollection(path);
      console.log(col);
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
