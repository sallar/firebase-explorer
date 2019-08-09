import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "./Context";


const RootList: React.FunctionComponent = () => {
  const [data, setData] = useState<any[]>([]);
  const { onSelectPath } = useContext(AppContext);

  useEffect(() => {
    const getData = async () => {
      // @ts-ignore
      const cols = await window.getRoot();
      setData(cols);
    };
    getData();
  }, []);
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

export default RootList;
