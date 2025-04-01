async function getLongPolling(req, res) {
    try {
        let previousResponse = await fetch("http://localhost:8080/view-products");
        let previousData = await previousResponse.json();

        const checkForChanges = async () => {
            try {
                const response = await fetch("http://localhost:8080/view-products");
                const currentData = await response.json();

                if (JSON.stringify(previousData) !== JSON.stringify(currentData)) {
                    console.log("Se detectaron cambios en los productos.");
                    res.json(currentData);
                } else {
                    console.log("Sin cambios en los productos. Reintentando...");
                    setTimeout(checkForChanges, 3000); // Espera 3 segundos y vuelve a comprobar
                }
            } catch (error) {
                console.error("Error al obtener los datos de productos:", error);
                res.status(500).json({ error: "Error al obtener productos" });
            }
        };

        checkForChanges();
    } catch (error) {
        console.error("Error en la primera consulta:", error);
        res.status(500).json({ error: "Error en la consulta inicial" });
    }
}

module.exports = {
    getLongPolling
};
