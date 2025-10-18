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

r.get("/search_product", (req, res) => {
    // "/search_product?term=palabra que se busca"
    let searchTerm = String(req.query.term);

    if (!searchTerm || searchTerm === "") {
        return res.status(400).json({ message: "No ha enviado palabra para buscar." });
    }

    let result = ProductsService.getForTerm(searchTerm);

    //console.log("Resultado para enviar: ", result)

    res.render("pages/results_products", {
        numberProducts: result?.totalProducts,
        numberPages: result?.chunks,
        data_products: result?.productsDetails
    })
})

r.get("/search/category", (req, res) => {
    let category = String(req.query.select);
    console.log("Category requested:", category);

    let result = ProductsService.getByCategory(category);
    console.log("Products found:", result?.productsDetails.length);

    res.render("pages/results_products", {
        numberProducts: result?.totalProducts,
        numberPages: result?.chunks,
        data_products: result?.productsDetails
    })
})

export default r;