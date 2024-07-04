$(document).ready(function() {
    // Obtenha o ID do usuário da URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    $.ajax({
        url: `${serverURL}/event-profile/${id}`,
        type: 'GET',
        success: function(arena) {
            $('#name').text(arena.name);
            $('#ownerUsername').text('@' + arena.ownerUsername);
            $('#country').text(arena.country);
            $('#state').text(arena.state);
            $('#city').text(arena.city);
            $('#neighborhood').text(arena.neighborhood);
            $('#likes').text(arena.likes);
            $('#dislikes').text(arena.dislikes);
            if (Array.isArray(arena.sports)) {
                $('#sports').empty(); // Limpa o conteúdo anterior
                arena.sports.forEach(function(sport) {
                    var sportCard = $('<div class="sports-box"></div>');
                    var cardBody = $('<div class="card-body"></div>').text(sport);
                    sportCard.append(cardBody);
                    $('#sports').append(sportCard);
                });
            } else {
                $('#sports').text('N/A');
            }
            $('#teams').text((Array.isArray(arena.teams) ? arena.teams.join(', ') : 'N/A'));
            $('#rating').text(arena.rating);
            // Adicione aqui o código para preencher os comentários e eventos do evento
        },
        error: function(error) {
            if (error.status === 404) {
                window.location.href = '../pages/404.html'; // substitua por sua URL da página 404
            } else {
                console.error('Erro ao buscar evento:', error);
            }
        }
    });
});