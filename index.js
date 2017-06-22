function getSala(idSala) {
    alert(idSala);
    $.get("localhost:3000/sala/buscarSala" + idSala, function(data, status) {
        alert(data);
        alert(status);
    });
}