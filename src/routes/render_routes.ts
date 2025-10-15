import { Router } from "express";
import { ProductsService } from "../services/ProductsService.js";

const r: Router = Router();

r.get("/", (req, res) => {
    const totalOffers = ProductsService.getOffers();

    // Si no hay ofertas, renderizamos igual para evitar errores
    const sixOffers = totalOffers.slice(0, 6);
    const firstOffer = sixOffers.length > 0 ? sixOffers[0] : null;
    const nextOffers = sixOffers.slice(1, 4); // 3 siguientes

    console.log(sixOffers)

    res.render("pages/home", {
        title: "FreeMarket - home",
        hasOffers: totalOffers.length > 0,
        firstOffer,
        sixOffers,
        nextOffers,
    });
});

export default r;
