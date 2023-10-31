import React, { useState, useEffect } from "react";
import styles from "../../Styles/CadastroProduto.scss";

interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  categoria: {
    id: number;
    nome?: string;
  };
  idImagem?: string;
}

interface ImageDetails {
  id: number;
}

const Estoque: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [imageDetails, setImageDetails] = useState<ImageDetails | null>(null);

  useEffect(() => {
    fetch("http://45.235.53.125:8080/api/produto")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Erro ao obter os produtos:", error);
      });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const imageId = products[0].idImagem;
      if (imageId) {
        fetch(`http://45.235.53.125:8080/api/imagem/${imageId}`)
          .then((response) => response.json())
          .then((data: ImageDetails) => {
            setImageDetails(data);
          })
          .catch((error) => {
            console.error("Erro ao obter os detalhes da imagem:", error);
          });
      }
    }
  }, [products]);

  return (
    <div className="productList">
      <h2>Lista de Produtos</h2>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            <p>{product.nome}</p>
            <p>{product.descricao}</p>
            <p>{product.preco}</p>
            <p>{product.quantidade}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Estoque;
