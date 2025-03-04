async function getShortPolling(req, res) {
    let previousResponse = null;
    
    try {
        const initialResponse = await fetch("http://localhost:8080/view-products");
        previousResponse = await initialResponse.json();
    } catch (error) {
        console.error("Error en la primera petición:", error);
        return;
    }

    setInterval(async () => {
        try {
            const response = await fetch("http://localhost:8080/view-products");
            const currentResponse = await response.json();

            if (JSON.stringify(previousResponse) !== JSON.stringify(currentResponse)) {
                console.log("Hay cambios en la base de datos.");
                previousResponse = currentResponse;
            } else {
                console.log("No hay cambios en los productos.");
            }
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    }, 3000); 
}

module.exports = {
    getShortPolling
};
