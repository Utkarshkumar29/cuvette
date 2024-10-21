import { createContext, useState } from "react";

const idsContext = createContext();

const IdsProvider = ({ children }) => {
  
  const [userId,setUserId]=useState("")
  const [companyId,setCompanyId]=useState("")

  const idsDetails = {
      userId,
      setUserId,
      companyId,
      setCompanyId
  };

  return (
    <idsContext.Provider value={idsDetails}>
      {children}
    </idsContext.Provider>
  );
};

export { idsContext, IdsProvider };
