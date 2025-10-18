
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