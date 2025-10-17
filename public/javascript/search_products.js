import { Requests } from "./requests.js";

async function sendTerm(word) {
    window.location.href = `/search_product?term=${word}`;
}

$(function() {
    let searchInput = $("#searchTerm");
    let searchButton = $(".search-icon");

    searchInput.on("keydown", function(event) {
        
        if(event.key === "Enter") {
            event.preventDefault();

            let term = $(this).val();

            if(!term) {
                alert("No ha completado el campo de busqueda");
            }

            sendTerm(term);
        }
    })

    searchButton.on("click", function() {
        const term = searchInput.val().trim();
        if(!term) {
            alert("No ha completado el campo de busqueda");
        }
        sendTerm(term)
    });
    
});