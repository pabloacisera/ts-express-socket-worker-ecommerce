import { Product, products } from "../utils/productsData.js";
import { shuffleArray } from "../utils/suffleArray.js"; // o donde tengas la función

interface SearchResponse {
    totalProducts: number;
    chunks: number;
    productsDetails: Product[];
}

export class ProductsService {

    static getOffers(): Product[] {
        try {
            const offers = products.filter(p => p.ofert === true);
            if (!offers.length) throw new Error("No hay ofertas");
            return shuffleArray(offers);
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    static getMoreRated(): Product[] {
        try {
            const mostRated = products.filter(p => p.rating > 4.5);
            if (!mostRated.length)
                throw new Error("Error al encontrar los productos más valorados");
            return shuffleArray(mostRated);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static getForTerm(term: string): SearchResponse | null {
        try {
            const searchTerm = term.toLowerCase().trim();

            const productsFound = products.filter(p => 
                p.title.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm) ||
                p.category.toLowerCase().includes(searchTerm) ||
                (p.offer_data?.percent?.toString().includes(searchTerm))
            );

            if (!productsFound.length) {
                throw new Error("No se encontraron productos con el término solicitado");
            }

            const totalProducts = productsFound.length;
            const chunks = Math.ceil(totalProducts / 12);

            return {
                totalProducts,
                chunks,
                productsDetails: productsFound || []
            };
        } catch (err) {
            console.error("Error interno en el servidor:", err);
            return {
                totalProducts: 0,
                chunks: 0,
                productsDetails: []
            };
        }
    }
}
