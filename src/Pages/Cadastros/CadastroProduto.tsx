import React, { useState } from "react";
import "../../Styles/CadastroProduto.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: {
    id: number;
    name: string;
  };
  image: File | null;
}

const CadastroProduto: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [product, setProduct] = useState<Product>({
    id: Math.floor(Math.random() * 1000),
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: { id: Math.floor(Math.random() * 1000), name: "" },
    image: null,
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Produto cadastrado:", product);
      // Aqui você pode enviar os dados (product) para a API via POST
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProduct({ ...product, image: e.target.files[0] });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <input
              type="text"
              placeholder="Nome"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Descrição"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Preço"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: parseFloat(e.target.value) })
              }
            />
            <input
              type="number"
              placeholder="Quantidade"
              value={product.quantity}
              onChange={(e) =>
                setProduct({ ...product, quantity: parseInt(e.target.value) })
              }
            />
          </div>
        );
      case 2:
        return (
          <div>
            <input
              type="text"
              placeholder="Categoria"
              value={product.category.name}
              onChange={(e) =>
                setProduct({
                  ...product,
                  category: { ...product.category, name: e.target.value },
                })
              }
            />
          </div>
        );
      case 3:
        return (
          <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="cadastro-produto">
      <h2 className="mb">Cadastro de Produto - Etapa {currentStep}</h2>
      {renderStepContent()}

      <div className="buttons">
        {currentStep > 1 && <button onClick={handlePrevious}>Voltar</button>}

        <button onClick={handleNext}>
          {currentStep < 3 ? "Próxima Etapa" : "Finalizar"}
        </button>
      </div>
    </div>
  );
};

export default CadastroProduto;
