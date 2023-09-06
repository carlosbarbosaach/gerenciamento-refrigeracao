import InputEstoque from '../../Components/InputEstoque'
import SelectCategoria from '../../Components/SelectCategoria'
import ButtonPesquisar from '../../Components/ButtonPesquisar'
import { useEffect, useState } from 'react'
import { ProductService } from '../../../Data/ProductService'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import { Tag } from 'primereact/tag';

import '../../Style.css'
import StockNotification from '../../Components/StockNotification'

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

const Estoque = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('TodasCategorias');
  const [showLowStockNotification, setShowLowStockNotification] = useState(false);


  useEffect(() => {
    ProductService.getProductsMini()
      .then((data) => setProducts(data));
  }, []);

  console.log(products)

  useEffect(() => {
    const hasLowStockProducts = products.some(product => product.quantity < 5);

    if (hasLowStockProducts) {
      setShowLowStockNotification(true);
    } else {
      setShowLowStockNotification(false);
    }
  }, [products]);

  const handleCategoriaSelect = (categoria: string) => {
    setCategoriaSelecionada(categoria);
  };

  const filteredProducts = categoriaSelecionada === 'TodasCategorias'
    ? products
    : products.filter(product => product.category === categoriaSelecionada);

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', { style: "currency", currency: "BRL" });
  };

  const imageBodyTemplate = (product: Product) => {
    return <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="w-6rem shadow-2 border-round" />;
  };

  const priceBodyTemplate = (product: Product) => {
    return formatCurrency(product.price);
  };

  const statusBodyTemplate = (product: Product) => {
    return <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>;
  };

  const getSeverity = (product: Product) => {
    switch (product.inventoryStatus) {
      case 'Em estoque':
        return 'success';

      case 'Baixo estoque':
        return 'warning';

      case 'Fora de estoque':
        return 'danger';

      default:
        return null;
    }
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Produtos</span>
    </div>
  );
  const footer = `Total de produtos cadastrados: ${products ? products.length : 0}`;

  const quantityBodyTemplate = (product: Product) => {
    const quantityClassName = product.quantity === 0 ? 'product-zero-quantity' : '';
    return <span className={quantityClassName}>{product.quantity}</span>;
  };

  const customRowClassName = (rowData: Product) => {
    const statusSeverity = getSeverity(rowData);
    if (statusSeverity) {
      return `product-${statusSeverity}-status`;
    }
    return '';
  };

  return (
    <section>
      <StockNotification products={products} />
      <div className='flex mb'>
        <div className='box flex styleEstoque'>
          <InputEstoque />
          <div className='styleSelectBtn'>
            <SelectCategoria onSelectCategoria={handleCategoriaSelect} />
            <ButtonPesquisar />
          </div>
        </div>
      </div>
      <div className="card">
        <DataTable
          value={filteredProducts}
          header={header}
          footer={footer}
          paginator rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          rowClassName={customRowClassName}
          tableStyle={{ minWidth: '60rem' }}>
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Produto"></Column>
          <Column header="Imagem" body={imageBodyTemplate}></Column>
          <Column field="price" header="Preço" body={priceBodyTemplate}></Column>
          <Column field="category" header="Categoria"></Column>
          <Column field="brand" header="Marca"></Column>
          <Column field="quantity" header="Quantidade" body={quantityBodyTemplate}></Column>
          <Column header="Status" body={statusBodyTemplate}></Column>
        </DataTable>
      </div>
    </section>
  )
}

export default Estoque
