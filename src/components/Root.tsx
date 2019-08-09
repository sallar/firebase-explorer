import React, { useEffect, useState } from "react";


const RootList: React.FunctionComponent = () => {
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
        <li key={item.id}>{item.id}</li>
      ))}
    </ul>
  );
};

export default RootList;
