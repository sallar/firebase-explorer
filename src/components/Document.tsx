import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "./Context";

interface DocumentProps {
  path: string;
}

const Document: React.FunctionComponent<DocumentProps> = ({
  path
}) => {
  const [data, setData] = useState<any>(null);
  const { onSelectPath } = useContext(AppContext);

  useEffect(() => {
    const getData = async () => {
      // @ts-ignore
      const doc = await window.getDocument(path);
      setData(doc);
    };
    getData();
  }, [path]);
  if (!data) {
    return null;
  }
  return (
    <>
      <ul>
        {data.collections.map((col: any) => (
          <li key={col.id} onClick={() => onSelectPath(col.path)}>
            {col.id}
          </li>
        ))}
      </ul>
      <pre>{JSON.stringify(data.data, undefined, 2)}</pre>
    </>
  );
};

export default Document;
