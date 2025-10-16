import { Router } from "express";
import { ProductsService } from "../services/ProductsService.js";

const r: Router = Router();

r.get("/", (req, res) => {
    const totalOffers = ProductsService.getOffers(); // Ya vienen mezcladas
    const moreRatedProducts = ProductsService.getMoreRated(); // Ya vienen mezcladas

    // Si no hay ofertas, renderizamos igual para evitar errores
    const sixOffers = totalOffers.slice(0, 6);
    const firstOffer = sixOffers.length > 0 ? sixOffers[0] : null;

    const firstRated = moreRatedProducts.length > 0 ? moreRatedProducts[0] : null;
    const sixRated = moreRatedProducts.slice(0, 6);

    res.render("pages/home", {
        title: "FreeMarket - home",
        hasOffers: totalOffers.length > 0,
        firstOffer,
        sixOffers,
        hasRated: moreRatedProducts.length > 0,
        firstRated,
        sixRated
    });
});

export default r;