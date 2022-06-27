import React, { useContext } from "react";

type InitContextProps = {
  children: React.ReactNode;
};

const InitContext: React.FC<InitContextProps> = ({ children }) => {
  return <div>:FC</div>;
};

export default InitContext;
