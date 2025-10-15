import { Product, products } from "../utils/productsData.js";

export class ProductsService {
    
    static getOffers(): Product[] {

        try {

            let offers = products.filter(p => p.ofert === true);

            if (!offers.length) {
                throw new Error("No hay ofertas")
            }

            return offers;

        } catch (err) {

            console.error(err);
            return [];

        }
    }
}