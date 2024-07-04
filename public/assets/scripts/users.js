$(document).ready(function() {
    $.ajax({
        url: `${serverURL}/users`,
        type: 'GET',
        success: function(users) {
            users.forEach(function(user) {
                var userElement = `
                    <div class="list-box column box" data-id="${user.id}">
                        <img src="../assets/img/usericon.jpg" class="user-image">
                        <div class="rating center">
                            <p>${user.rating}</p>
                        </div>
                        <div class="name">
                            <h2 class="txt-center">${user.name}</h2>
                            <p class="txt-center">@${user.username}</p>
                        </div>
                        <div class="center row">
                            ${Array.isArray(user.sports) ? user.sports.map(sport => `<div class="sport">${sport}</div>`).join('') : ''}
                        </div>
                    </div>
                `;
                $('#users').append(userElement);
            });

            // Adicione um evento de clique a cada elemento de usuário
            $('.list-box').click(function() {
                var userId = $(this).data('id');
                window.location.href = `/pages/user-profile.html?id=${userId}`;
            });
        },
        error: function(error) {
            console.error('Erro ao buscar usuários:', error);
        }
    });
});


document.querySelector('#search-input').addEventListener('input', filterList);

function filterList() {
    const searchInput = document.querySelector('#search-input').value.toLowerCase();
    const listItems = document.querySelectorAll('.list-box');

    listItems.forEach(item => {
        // Assuming you want to compare the text content of the item
        let text = item.textContent || item.innerText; // This gets the text content of the item

        if (text.toLowerCase().includes(searchInput)) { // Use searchInput directly
            item.style.display = ''; // Consider using 'block' or 'flex' depending on your layout
        } else {
            item.style.display = 'none';
        }
    });
}