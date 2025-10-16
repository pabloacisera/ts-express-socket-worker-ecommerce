import { Product, products } from "../utils/productsData.js";
import { shuffleArray } from "../utils/suffleArray.js"; // o donde tengas la función

export class ProductsService {
    
    static getOffers(): Product[] {
        try {
            let offers = products.filter(p => p.ofert === true);

            if (!offers.length) {
                throw new Error("No hay ofertas");
            }

            return shuffleArray(offers); // Mezclar las ofertas

        } catch (err) {
            console.error(err);
            return [];
        }
    }

    static getMoreRated(): Product[] {
        try {
            let mostRated = products.filter(p => p.rating > 4.5);

            if (!mostRated.length) { // Corregí: debería ser .length
                throw new Error("Error al encontrar los productos mas valorados");
            }

            return shuffleArray(mostRated); // Mezclar los más valorados

        } catch (error) {
            console.error(error);
            return [];
        }
    }
}