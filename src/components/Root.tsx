import React, { useEffect, useState } from "react";

interface RootListProps {
  onSelectPath(path: string): any;
}

const RootList: React.FunctionComponent<RootListProps> = ({ onSelectPath }) => {
  const [data, setData] = useState<any[]>([]);

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
