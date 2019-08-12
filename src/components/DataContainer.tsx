import "jsoneditor-react/es/editor.min.css";
import React, { useEffect, useRef, useState } from "react";
import CollectionList from "./CollectionList";
import DocumentView from "./Document";
import DocumentList from "./DocumentList";

declare global {
  interface Window {
    getDocument(path: string): Promise<any>;
    getCollection(path: string): Promise<any>;
    getRoot(): Promise<any>;
  }
}

enum DataType {
  Root = "root",
  Document = "document",
  Collection = "collection"
}

interface DocumentProps {
  path: string;
  type: DataType | string;
  currentId: string | null;
}

const DataContainer: React.FunctionComponent<DocumentProps> = ({
  path,
  type,
  currentId
}) => {
  const [data, setData] = useState<any>(null);
  const mountRef = useRef(true);

  useEffect(() => {
    if (mountRef.current === false) {
      return;
    }

    const getData = async () => {
      switch (type) {
        case DataType.Document:
          setData(await window.getDocument(path));
          break;
        case DataType.Collection:
          setData(await window.getCollection(path));
          break;
        case DataType.Root:
          setData(await window.getRoot());
          break;
      }
    };
    getData();

    return () => {
      mountRef.current = false;
    };
  }, [path]);

  if (!data) {
    return null;
  }

  return (
    <>
      {type === DataType.Document && (
        <DocumentView document={data} currentId={currentId} />
      )}
      {type === DataType.Collection && (
        <DocumentList documents={data} currentId={currentId} />
      )}
      {type === DataType.Root && (
        <CollectionList collections={data} currentId={currentId} />
      )}
    </>
  );
};

export default DataContainer;
