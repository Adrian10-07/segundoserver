async function getPetShort(params) {
    let previousResponse = null;
    let change = 0;

    try {
        const initialResponse = await fetch("http://localhost:8080/view-pets");
        previousResponse = await initialResponse.json();
    } catch (error) {
        console.error("Error en la primera petición:", error);
        return;
    }

    setInterval(async () => {
        try {
            const response = await fetch("http://localhost:8080/view-pets");
            const currentResponse = await response.json();

            if (JSON.stringify(previousResponse) !== JSON.stringify(currentResponse)) {
                console.log("Hay cambios en los datos de las mascotas.");
                previousResponse = currentResponse;
            } else {
                console.log("No hay cambios.");
                console.log(previousResponse);

                change += 3;
            }
        } catch (error) {
            console.error("Error al obtener los datos de las mascotas:", error);
        }
    }, 3000);
}

module.exports = {
    getPetShort
};
