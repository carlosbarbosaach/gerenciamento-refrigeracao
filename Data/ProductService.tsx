export const ProductService = {
    getProductsData() {
        return [
            {
                id: "01",
                name: "Geladeira Frost Free",
                description: "Geladeira com capacidade de 300 litros",
                image: "/images/geladeira-frost-free.jpg",
                price: 1500,
                quantity: 10,
                brand: "LG",
                inventoryStatus: "Em estoque",
                category: "Residencial",
            },
            {
                id: "1001",
                name: "Refrigerador Comercial",
                description: "Refrigerador com capacidade de 500 litros",
                image: "/images/refrigerador-comercial.jpg",
                price: 2500,
                quantity: 5,
                brand: "Samsung",
                inventoryStatus: "Baixo estoque",
                category: "Comercial",
            },
            {
                id: "1002",
                name: "Freezer Vertical",
                description: "Freezer vertical com capacidade de 200 litros",
                image: "/images/freezer-vertical.jpg",
                price: 1200,
                quantity: 20,
                brand: "Brastemp",
                inventoryStatus: "Em estoque",
                category: "Residencial",
            },
            {
                id: "1003",
                name: "Expositor de Bebidas",
                description: "Expositor de bebidas com capacidade de 100 litros",
                image: "/images/expositor-de-bebidas.jpg",
                price: 1500,
                quantity: 0,
                brand: "Consul",
                inventoryStatus: "Fora de estoque",
                category: "Comercial",
            },
            {
                id: "1004",
                name: "Câmara Frigorífica",
                description: "Câmara frigorífica com capacidade de 1.000 litros",
                image: "/images/camara-frigorifica.jpg",
                price: 5000,
                quantity: 10,
                brand: "Atlas",
                inventoryStatus: "Em estoque",
                category: "Industrial",
            },
            {
                id: "1005",
                name: "Geladeira para Vacinas",
                description: "Geladeira para armazenamento de vacinas",
                image: "/images/geladeira-para-vacinas.jpg",
                price: 10000,
                quantity: 5,
                brand: "Brastemp",
                inventoryStatus: "Baixo estoque",
                category: "Medical",
            },
            {
                id: "1006",
                name: "Freezer para Amostras Biológicas",
                description: "Freezer para armazenamento de amostras biológicas",
                image: "/images/freezer-para-amostras-biologicas.jpg",
                price: 12000,
                quantity: 0,
                brand: "Consul",
                inventoryStatus: "Fora de estoque",
                category: "Laboratorial",
            },
        ]
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData());
    },

    getCategories() {
        const products = this.getProductsData();
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        return uniqueCategories;
    }
};

