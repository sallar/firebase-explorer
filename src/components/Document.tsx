import React, { useEffect, useState } from "react";

interface DocumentProps {
  path: string;
}

const Document: React.FunctionComponent<DocumentProps> = ({ path }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      // @ts-ignore
      const doc = await window.getDocument(path);
      setData(doc);
    };
    getData();
  }, [path]);
  return (
    <pre>
      {JSON.stringify(data, undefined, 2)}
    </pre>
  );
};

export default Document;
