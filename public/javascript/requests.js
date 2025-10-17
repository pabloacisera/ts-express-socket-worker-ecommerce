
export class Requests {

    static async get( url, method = "GET" ) {
        try {
            const result = await fetch(url, {
                method,
                headers: {"Content-Type" : "application/json"},
            })

            // Manejar errores HTTP (como 400)
            if (!result.ok) {
                const errorData = await result.json().catch(() => ({}));
                console.error("Error HTTP:", result.status, errorData.message || result.statusText);
                return { error: true, status: result.status, message: errorData.message || "Error desconocido" };
            }

            console.log("respuesta sin parsear: ", result)

            const response = await result.json();

            console.log("respuesta json: ", response);

            return response;
        } catch (error) {
            return { error: true, message: error.message };
        }
    }
}