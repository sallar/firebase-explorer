import React, { useEffect, useState } from "react";

interface DocumentProps {
  path: string;
  onSelectPath(path: string): any;
}

const Document: React.FunctionComponent<DocumentProps> = ({
  path,
  onSelectPath
}) => {
  const [data, setData] = useState<any>(null);

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
