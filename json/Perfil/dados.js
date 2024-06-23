
let perfilJson = JSON.parse(localStorage.getItem('user'))
let id = perfilJson.id;

function carregaPerfil() {
    fetch(`https://0a9369f7-ba81-44c1-a5e2-61a8dfbe46c6-00-kjwc2bpyo9up.spock.replit.dev:3001/user/${id}`)
        .then((req) => req.json())
        .then(data => {
            document.getElementById('nome1').innerHTML = `<h3>${data.nome}</h3>`;
            document.getElementById('estudio1').innerHTML = `<p>${data.estudio}</p>`;
            document.getElementById('exp1').innerHTML = `<p>${data.exp}</p>`;
            document.getElementById('end1').innerHTML = `<p>${data.end}</p>`;
            document.getElementById('bio1').innerHTML = `<p>${data.bio}</p>`;
            document.getElementById('insta1').innerHTML = `<a href="${data.insta}" class="endLink"><p>${data.insta}</p></a>`;
            document.getElementById('whats1').innerHTML = `<a href="${data.whats}" class="endLink"><p>${data.whats}</p></a>`;
            document.getElementById('e-mail1').innerHTML = `<p>${data.email}</p>`;
            document.getElementById('categoria').value = data.categoria;
            document.getElementById('foto-perfil').innerHTML = `<img id="ftPerfil" class="mb-5 mt-5" width="255" height="255" src="${data.fotoperfil}"
                    alt="FOTO DE PERFIL">`;

            const fotoTattoo1 = document.getElementById('fotos1');
            const fotoTattoo2 = document.getElementById('fotos2');
            fotoTattoo1.innerHTML = '';
            fotoTattoo2.innerHTML = '';
            for (let i = 0; i < data.fotos.length; i += 2) {
                fotoTattoo1.innerHTML += `<img src="${data.fotos[i]}" alt="Foto" width="260" class="foto-trabalhos">`;
            }

            for (let i = 1; i < data.fotos.length; i += 2) {
                fotoTattoo2.innerHTML += `<img src="${data.fotos[i]}" alt="Foto" width="260" class="foto-trabalhos">`;
            }
        }
        )
        .catch((error) => console.error('Erro ao buscar dados:', error));
}
carregaPerfil();

// Função para salvar o perfil editado no JSON Server
function editaPerfil() {
    const nome = document.getElementById('nome2').value;
    const bio = document.getElementById('bio2').value;
    const estudio = document.getElementById('estudio2').value;
    const exp = document.getElementById('exp2').value;
    const end = document.getElementById('end2').value;
    const insta = document.getElementById('insta2').value;
    const whats = document.getElementById('whats2').value;
    const email = document.getElementById('e-mail2').value;

    const url = `https://0a9369f7-ba81-44c1-a5e2-61a8dfbe46c6-00-kjwc2bpyo9up.spock.replit.dev:3001/user/${id}`;

    // Objeto com os dados atualizados do perfil
    let perfilAtualizado = {};

    if (nome != '') perfilAtualizado.nome = nome;
    if (email != '') perfilAtualizado.email = email;
    if (estudio != '') perfilAtualizado.estudio = estudio;
    if (bio != '') perfilAtualizado.bio = bio;
    if (end != '') perfilAtualizado.end = end;
    if (exp != '') perfilAtualizado.exp = exp;
    if (whats != '') perfilAtualizado.whats = whats;
    if (insta != '') perfilAtualizado.insta = insta;

    // Verifica se há alguma alteração
    if (Object.keys(perfilAtualizado).length > 0) {
        // Envia o perfil atualizado para o JSON Server
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(perfilAtualizado)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao salvar o perfil no JSON Server.');
                }
                return response.json();
            })
            .then(data => {
                alert('Perfil atualizado com sucesso!');
                console.log('Perfil atualizado:', data);
                carregaPerfil();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Erro ao salvar o perfil no JSON Server.');
            });
    } else {
        alert("Nenhuma alteração foi feita!");
    }
};

//Função de mudar a foto de perfil
function atualizarFotoPerfil() {
    const novaUrlPerfil = document.getElementById('urlPerfil').value;
    fetch(`https://0a9369f7-ba81-44c1-a5e2-61a8dfbe46c6-00-kjwc2bpyo9up.spock.replit.dev:3001/user/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fotoperfil: novaUrlPerfil
        })
    })
        .then(response => {
            if (response.ok) {
                document.getElementById('fotoperfil').src = novaUrlPerfil;
                alert('Foto de perfil atualizada com sucesso!');
            } else {
                alert('Erro ao atualizar a foto de perfil.');
            }
        })
};

document.getElementById('categoria').addEventListener('change', function() {
    const selectedStyle = this.value;
    fetch(`https://0a9369f7-ba81-44c1-a5e2-61a8dfbe46c6-00-kjwc2bpyo9up.spock.replit.dev:3001/user/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            categoria: selectedStyle
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Categoria alterada com sucesso!');
    })
    .catch((error) => {
        alert('Error:', error);
    });
});


function atualizarFotoPerfil() {
    const novaUrlPerfil = document.getElementById('urlPerfil').value;
    fetch(`https://0a9369f7-ba81-44c1-a5e2-61a8dfbe46c6-00-kjwc2bpyo9up.spock.replit.dev:3001/user/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fotoperfil: novaUrlPerfil
        })
    })
        .then(response => {
            if (response.ok) {
                carregaPerfil();
                alert('Foto de perfil atualizada com sucesso!');
            } else {
                alert('Erro ao atualizar a foto de perfil.');
            }
        })
};
document.getElementById('btnSalvar2').addEventListener('click', atualizarFotoPerfil);

// Função para adicionar a nova foto ao usuário
function adicionarFoto() {
    try {
        const file = document.getElementById('imageInput').value;
        if (!file) {
            alert('Por favor, insira uma url de imagem primeiro.');
            return;
        }

        fetch(`https://0a9369f7-ba81-44c1-a5e2-61a8dfbe46c6-00-kjwc2bpyo9up.spock.replit.dev:3001/user/${id}`)
            .then(responseGet => {
                if (!responseGet.ok) {
                    throw new Error('Erro ao obter dados do usuário: ' + responseGet.statusText);
                }
                return responseGet.json()
            })
            .then(userData => {
                userData.fotos.push(file);

                fetch(`https://0a9369f7-ba81-44c1-a5e2-61a8dfbe46c6-00-kjwc2bpyo9up.spock.replit.dev:3001/user/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                    .then(responseUpdate => {
                        if (!responseUpdate.ok) {
                            throw new Error('Erro ao atualizar dados do usuário: ' + responseUpdate.statusText);
                        }
                        return responseUpdate.json()
                    })
                alert('Foto adicionada com sucesso!');
                document.getElementById('imageInput').value = '';
                carregaPerfil();
            })
    }
    catch (error) {
        console.error('Erro:', error);
    };
};
document.getElementById('btnSalvar').addEventListener('click', adicionarFoto);


//////////------------------------------------- Parte da Giulia ------------------------------//////////

function DeletaPerfil() {
    fetch("https://0a9369f7-ba81-44c1-a5e2-61a8dfbe46c6-00-kjwc2bpyo9up.spock.replit.dev:3001/user/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                alert("Usuário excluído com sucesso!");
                // Atualizar interface do usuário
                window.location.href = "/json/Login/login.html";
            } else {
                switch (response.status) {
                    case 404:
                        alert("Usuário não encontrado!");
                        break;
                    case 403:
                        alert("Você não tem permissão para excluir este usuário!");
                        break;
                    default:
                        alert("Falha ao excluir usuário!");
                        console.error("Erro:", response.statusText);
                }
            }
        })
        .catch(error => {
            console.error("Erro na requisição:", error);
        });
}

function Deletar() {
    alert("oi")
    var confirmacao = confirm("Tem certeza que deseja deletar o seu perfil?");
    if (confirmacao) {
        DeletaPerfil();
    }
    else {
        alert("Cuidado da próxima vez :)")
    }

}









