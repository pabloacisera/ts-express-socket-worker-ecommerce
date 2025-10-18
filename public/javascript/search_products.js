// buscar y enviar productos
$(function () {
    let input = $("#searchTerm");
    let buttonSearch = $(".search-icon");

    function searchTerm(term) {
        if (term.trim() !== '') {
            window.location.href = `http://localhost:3000/search_product?term=${encodeURIComponent(term)}`;
        }
    }

    // Capturar la tecla Enter - CORREGIDO
    input.on("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevenir comportamiento por defecto
            searchTerm(input.val());
        }
    });

    buttonSearch.on("click", function () {
        searchTerm(input.val());
    });
});