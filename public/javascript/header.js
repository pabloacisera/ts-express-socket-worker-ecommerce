import { categories } from "./categories.js";

function createList(data) {
    // Evita duplicados
    if ($(".list-categories").length) return;

    const $ul = $('<ul class="list-categories"></ul>');
    data.forEach(d => {
        const $li = $('<li class="list-link"></li>').text(d);
        $ul.append($li);
    });

    // Posicionar debajo del enlace “categorías”
    const $cat = $("#categories");
    const offset = $cat.offset();
    const height = $cat.outerHeight();

    $ul.css({
        top: offset.top + height + 5 + "px", // un poco más abajo
        left: offset.left + "px",
        width: "15rem",
        display: "none",
        position: "absolute",
        zIndex: 9999
    });

    $("body").append($ul);
    $ul.fadeIn(150);
}

function removeList() {
    $(".list-categories").stop(true, true).fadeOut(100, function () {
        $(this).remove();
    });
}

$(function () {
    let insideList = false;

    // Mostrar lista cuando se entra a “categorías”
    $("#categories").on("mouseenter", function () {
        createList(categories);
    });

    // Cuando el mouse entra/sale de la lista
    $(document).on("mouseenter", ".list-categories", function () {
        insideList = true;
    });

    $(document).on("mouseleave", ".list-categories", function () {
        insideList = false;
        removeList();
    });

    // Cuando el mouse sale del link “categorías”
    $("#categories").on("mouseleave", function (e) {
        const list = $(".list-categories");
        if (!list.length) return;

        const catRect = this.getBoundingClientRect();
        const listRect = list[0].getBoundingClientRect();
        const { clientX, clientY } = e;

        // Salida lateral (izquierda o derecha) ⇒ cerrar
        const lateralExit =
            clientX < catRect.left ||
            clientX > catRect.right ||
            clientY < catRect.top; // hacia arriba también se cierra

        // Pero si va hacia abajo dentro del rango horizontal, no cerrar
        const goingDownWithinRange =
            clientY > catRect.bottom && clientX >= catRect.left && clientX <= catRect.right;

        if (lateralExit && !goingDownWithinRange && !insideList) {
            removeList();
        }
    });

    // Si entro a otro link ⇒ cerrar
    $(".links p").not("#categories").on("mouseenter", function () {
        removeList();
    });

    // Clicks normales
    $(".links p").on("click", function () {
        console.log($(this).text());
    });

    $("#image-link").on("click", function () {
        window.location.href = "/";
    });

     $(document).on("click", ".list-link", function () {
        const value = $(this).text().trim();
        console.log("Categoría seleccionada:", value);

        // Aquí podés ejecutar lo que necesites:
        // Por ejemplo, redirigir, filtrar productos, etc.
        // window.location.href = `/categorias/${value}`;
        window.location.href=`http://localhost:3000/search/category?select=${value}`;

        removeList(); // opcional: cerrar después del click
    });
});
