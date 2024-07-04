// Cadastrar time
$('#registerTeam').submit(function(e) {
    e.preventDefault();

    $.ajax({
        url: `${serverURL}/team-register`,
        type: 'POST',
        data: JSON.stringify({
            name: $("#name").val(),
            sports: $("#sport").val()
        }),
        contentType: 'application/json',
        success: function(response) {
            console.log('Time cadastrado com sucesso:', response);
            // Animação (InfoSubmit) para os campos de input
            ["name", "sport"].forEach(id => {
                $("#" + id).addClass("infoSubmit");
            });
        },
        error: function(error) {
            console.error('Erro ao cadastrar a arena:', error);
        }
    });
});

// Animação (InfoSubmit) para os campos de input
["name", "sport"].forEach(id => {
    $("#" + id).on("focus", function() {
        $(this).removeClass("infoSubmit");
    });
});


var choices = new Choices('#sport', {
    allowHTML: true,
    removeItemButton: false,
    searchEnabled: true,
    placeholder: true,
    placeholderValue: 'Cadastrar esportes',
    searchPlaceholderValue: 'Buscar esportes',
    itemSelectText: 'Selecionar',
    maxItemCount: 10,
    renderChoiceLimit: 10
});