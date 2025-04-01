async function getPetLong(req, res) {
    try {
        let previousResponse = await fetch("http://localhost:8080/view-pets");
        let previousData = await previousResponse.json();

        const checkForChanges = async () => {
            try {
                const response = await fetch("http://localhost:8080/view-pets");
                const currentData = await response.json();

                if (JSON.stringify(previousData) !== JSON.stringify(currentData)) {
                    console.log("Se detectaron cambios en las mascotas.");
                    res.json(currentData);
                } else {
                    console.log("Sin cambios. Reintentando...");
                    setTimeout(checkForChanges, 3000); // Espera y vuelve a comprobar
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                res.status(500).json({ error: "Error al obtener datos de mascotas" });
            }
        };

        checkForChanges();
    } catch (error) {
        console.error("Error inicial:", error);
        res.status(500).json({ error: "Error en la primera consulta" });
    }
}

module.exports = {
    getPetLong
};
