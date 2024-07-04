
// Cadastrar evento
$('#registerEvento').submit(function(e) {
    e.preventDefault();

    $.ajax({
        url: `${serverURL}/evento-register`,
        type: 'POST',
        data: JSON.stringify({
            name: $("#name").val(),
            arena: $("#arena").val(),
            sport: $("#sport").val(),
            datetime: $("#datetime").val(),
            description: $("#description").val(),
            ownerId: parseInt(sessionStorage.getItem('currentUserToken'), 10)
        }),
        contentType: 'application/json',
        success: function(response) {
            console.log('Evento cadastrada com sucesso:', response);
            // Animação (InfoSubmit) para os campos de input
            ["name", "address", "sport", "datetime", "description"].forEach(id => {
                $("#" + id).addClass("infoSubmit");
            });
        },
        error: function(error) {
            console.error('Erro ao cadastrar a evento:', error);
        }
    });
});

// Animação (InfoSubmit) para os campos de input
["name", "address", "sport", "datetime", "description"].forEach(id => {
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

var choices = new Choices('#arena', {
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