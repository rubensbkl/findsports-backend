$(document).ready(function() {
    // Obtenha o ID do usuário da URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    $.ajax({
        url: `${serverURL}/user-profile/${id}`,
        type: 'GET',
        success: function(user) {
            $('#name').text(user.name);
            $('#username').text('@' + user.username);
            $('#country').text(user.country);
            $('#state').text(user.state);
            $('#city').text(user.city);
            $('#neighborhood').text(user.neighborhood);
            $('#birthDate').text(user.birthDate);
            $('#gender').text(user.gender);
            $('#likes').text(user.likes);
            $('#dislikes').text(user.dislikes);
            // Ensure user.sports and user.teams are arrays before calling join
            $('#sports').text('Sports: ' + (Array.isArray(user.sports) ? user.sports.join(', ') : 'N/A'));
            $('#teams').text('Teams: ' + (Array.isArray(user.teams) ? user.teams.join(', ') : 'N/A'));
            $('#rating').text(user.rating);
            // Adicione aqui o código para preencher os comentários e eventos do usuário
        },
        error: function(error) {
            if (error.status === 404) {
                window.location.href = '../pages/404.html'; // substitua por sua URL da página 404
            } else {
                console.error('Erro ao buscar usuário:', error);
            }
        }
    });

    // Cadastrar comentário
    $('#registerComment').submit(function(e) {
        e.preventDefault();

        // Supondo que você tenha inputs com IDs: commentText, commenterId, commentedUserId
        const commentData = {
            content: document.getElementById("commentContent").value, // Conteúdo do comentário
            userId: parseInt(sessionStorage.getItem('currentUserToken'), 10), // ID do usuário que comenta
            profileId: id // ID do usuário que recebe o comentário
        };

        $.ajax({
            url: `${serverURL}/comment-register`, // Ajuste para o endpoint correto
            type: 'POST',
            data: JSON.stringify(commentData),
            contentType: 'application/json',
            success: function(response) {
                console.log('Comentário cadastrado com sucesso:', response);
                $("#commentContent").addClass("infoSubmit");
            },
            error: function(error) {
                console.error('Erro ao cadastrar o comentário:', error);
            }
        });
    });

    $("#name").on("focus", function() {
        $(this).removeClass("infoSubmit");
    });

    $.ajax({
        url: `${serverURL}comment-get/${id}`, // Ajuste para o endpoint correto
        type: 'GET',
        success: function(comments) {
            // Supondo que 'comments' seja um array de objetos de comentários
            comments.forEach(function(comment) {
                // Cria um elemento para cada comentário
                var commentElement = $('<div class="comment"></div>');
                commentElement.text(comment.content); // Supondo que cada comentário tenha uma propriedade 'content'

                // Adiciona o comentário à div de comentários
                $('#comments').append(commentElement);
            });
        },
        error: function(error) {
            console.error('Erro ao buscar comentários:', error);
        }
    });

});


