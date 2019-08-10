// @ts-ignore
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import React from "react";
import CollectionList, { Collection } from "./CollectionList";

export interface Document {
  id: string;
  path: string;
}

interface DocumentData {
  data: Document;
  collections: Collection[];
}

interface DocumentViewProps {
  document: DocumentData;
}

const DocumentView: React.FunctionComponent<DocumentViewProps> = ({
  document
}) => {
  return (
    <>
      <Editor
        value={document.data}
        mode="view"
        allowedModes={["tree", "form"]}
        onChange={(...args: any) => {
          console.log("bing", args);
        }}
      />
      <CollectionList collections={document.collections} />
    </>
  );
};

export default DocumentView;
