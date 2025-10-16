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

    static getMoreRated() : Product[]{
        try {
            let mostRated = products.filter(p => p.rating > 4.5);

            if(!mostRated) {
                throw new Error("Error al encontrar los productos mas valorados");
            }

            return mostRated;
        } catch (error) {
            console.error(error);
            return[];
        }
    }
}