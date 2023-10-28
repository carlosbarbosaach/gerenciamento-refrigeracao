import React from "react";
import CadastroProduto from "./CadastroProduto";
import CadastroCategoria from "./CadastroCategoria";

const CadastroGeral = () => {
  return (
    <>
      <div className="flex">
        <div className="box mb">
          <CadastroProduto />
        </div>
      </div>
    </>
  );
};

export default CadastroGeral;
