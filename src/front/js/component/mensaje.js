import React from "react";

const Mensaje = ({ children, tipo }) => {
  return (
    <>
      <div className={`container rounded col-5 py-3 my-1 ${tipo}`}>
        {children}
      </div>
    </>
  );
};

export default Mensaje;