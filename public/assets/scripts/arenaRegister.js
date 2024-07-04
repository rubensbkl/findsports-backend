// Cadastrar arena
$('#registerArena').submit(function(e) {
    e.preventDefault();

    $.ajax({
        url: `${serverURL}/arena-register`,
        type: 'POST',
        data: JSON.stringify({
            name: $("#name").val(),
            address: $("#address").val(),
            sports: $("#sports").val(),
            opening: $("#opening").val(),
            closing: $("#closing").val(),
            contact: {
                phone: $("#phone").val()
            },
            description: $("#description").val(),
        }),
        contentType: 'application/json',
        success: function(response) {
            console.log('Arena cadastrada com sucesso:', response);
            // Animação (InfoSubmit) para os campos de input
            ["name", "address", "sports", "opening", "closing", "phone", "description"].forEach(id => {
                $("#" + id).addClass("infoSubmit");
            });
        },
        error: function(error) {
            console.error('Erro ao cadastrar a arena:', error);
        }
    });
});

// Animação (InfoSubmit) para os campos de input
["name", "address", "sports", "opening", "closing", "phone", "description"].forEach(id => {
    $("#" + id).on("focus", function() {
        $(this).removeClass("infoSubmit");
    });
});

// Máscara para o campo de telefone
$(document).ready(function(){
    $('#phone').mask('(00)00000-0000');
});

var choices = new Choices('#sports', {
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