import React, { useState, useEffect } from "react";

interface Category {
  id: number;
  nome: string;
}

const AddProduct: React.FC = () => {
  const [productData, setProductData] = useState({
    descricao: "",
    idImagem: "",
    nome: "",
    preco: 0,
    quantidade: 0,
  });

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = parseInt(e.target.value);
    const category = categories?.find((cat) => cat.id === selectedCategoryId);
    setSelectedCategory(category || null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: name === "preco" || name === "quantidade" ? Number(value) : value,
    });
  };

  const addProductToAPI = async () => {
    if (selectedCategory) {
      if (imageFile) {
        const imageData = new FormData();
        imageData.append("file", imageFile);

        try {
          const imageResponse = await fetch(
            "http://45.235.53.125:8080/api/imagem",
            {
              method: "POST",
              body: imageData,
            },
          );

          if (imageResponse.ok) {
            const responseData = await imageResponse.json();
            const { dadosImagem, id, nome, tipo } = responseData; // Adaptar conforme a estrutura da resposta

            setProductData({
              ...productData,
              idImagem: dadosImagem, // Supondo que 'dadosImagem' contém a URL da imagem
            });

            const dataToSend = {
              ...productData,
              categoria: selectedCategory,
            };

            try {
              const response = await fetch(
                "http://45.235.53.125:8080/api/produto",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(dataToSend),
                },
              );

              if (response.ok) {
                console.log("Produto adicionado com sucesso!");
                setProductData({
                  descricao: "",
                  idImagem: "",
                  nome: "",
                  preco: 0,
                  quantidade: 0,
                });
                setSelectedCategory(null);
              } else {
                console.error("Falha ao adicionar produto.");
              }
            } catch (error) {
              console.error("Erro ao adicionar produto:", error);
            }
          } else {
            console.error("Erro ao enviar imagem");
          }
        } catch (error) {
          console.error("Erro ao enviar imagem:", error);
        }
      } else {
        console.error("Por favor, selecione uma imagem.");
      }
    } else {
      console.error("Por favor, selecione uma categoria.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://45.235.53.125:8080/api/categoria");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Erro ao buscar categorias");
        }
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Adicionar Novo Produto</h2>
      <label>
        Nome do Produto:
        <input
          type="text"
          name="nome"
          value={productData.nome}
          onChange={handleChange}
        />
      </label>
      <label>
        Descrição:
        <input
          type="text"
          name="descricao"
          value={productData.descricao}
          onChange={handleChange}
        />
      </label>
      <label>
        Preço:
        <input
          type="number"
          name="preco"
          value={productData.preco}
          onChange={handleChange}
        />
      </label>
      <label>
        Quantidade:
        <input
          type="number"
          name="quantidade"
          value={productData.quantidade}
          onChange={handleChange}
        />
      </label>
      <label>
        Categoria:
        {categories ? (
          <select name="categoriaId" onChange={handleCategoryChange}>
            <option value="">Selecione uma categoria</option>
            {categories.map((category: Category) => (
              <option key={category.id} value={category.id}>
                {category.nome}
              </option>
            ))}
          </select>
        ) : (
          <p>Carregando categorias...</p>
        )}
      </label>
      <label>
        Foto do Produto:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      <button onClick={addProductToAPI}>Adicionar Produto</button>
    </div>
  );
};

export default AddProduct;
