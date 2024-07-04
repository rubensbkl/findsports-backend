$(document).ready(function() {
    $.ajax({
        url: `${serverURL}/arenas`,
        type: 'GET',
        success: function(arenas) {
            arenas.forEach(function(arena) {
                var arenaElement = `
                    <div class="list-container" data-id="${arena.id}">
                        <h2 class="arena-name">${arena.name}</h2>
                        <div class="center row">
                            ${Array.isArray(arena.sports) ? arena.sports.map(sport => `<div class="sport">${sport}</div>`).join('') : ''}
                        </div>
                        <div class="row">
                            <div class="open">
                                <div class="primary black">Abre</div>
                                <div>${arena.opening}</div>
                            </div>
                            <div>
                                <div class="primary black">Fecha</div>
                                <div>${arena.closing}</div>
                            </div>
                        </div>
                    </div>
                `;
                $('#arenas').append(arenaElement);

                
            });

            // Adicione um evento de clique a cada elemento de usuário
            $('.list-container').click(function() {
                var arenaId = $(this).data('id');
                window.location.href = `/pages/arena-profile.html?id=${arenaId}`;
            });
        },
        error: function(error) {
            console.error('Erro ao buscar arenas:', error);
        }
    });
});

document.querySelector('#search-input').addEventListener('input', filterList);

function filterList() {
    const searchInput = document.querySelector('#search-input').value.toLowerCase();
    const listItems = document.querySelectorAll('.list-container');

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