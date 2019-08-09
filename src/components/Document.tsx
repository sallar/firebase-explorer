import React, { useEffect, useState, useContext } from "react";
// @ts-ignore
import { JsonEditor as Editor } from "jsoneditor-react";
import { AppContext } from "./Context";
import 'jsoneditor-react/es/editor.min.css';

interface DocumentProps {
  path: string;
}

const Document: React.FunctionComponent<DocumentProps> = ({ path }) => {
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
      <Editor
        value={data.data}
        mode="view"
        allowedModes={['tree', 'form']}
        onChange={(...args: any) => {
          console.log("bing", args);
        }}
      />
      <ul>
        {data.collections.map((col: any) => (
          <li key={col.id} onClick={() => onSelectPath(col.path)}>
            {col.id}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Document;
