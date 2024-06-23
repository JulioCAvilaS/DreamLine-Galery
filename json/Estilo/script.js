const urlParametros = new URLSearchParams(window.location.search);
const cat = urlParametros.get('categoria');
window.onload = function () {
   

    // Verificar se o ID foi fornecido
    if (cat = null) {
       console.log("Estilo não encontrado.")
    } else {
        // Função para buscar detalhes do usuário
        async function fetchRepoDetails(cat) {
            try {
                const response = await fetch(`https://0a9369f7-ba81-44c1-a5e2-61a8dfbe46c6-00-kjwc2bpyo9up.spock.replit.dev:3001/user?categoria=${cat}`);
                if (!response.ok) {
                    throw new Error('Usuário não encontrado');
                }
                const data = await response.json();
                imprimeDados(data); // Chama a função imprimeDados com os dados obtidos
            } catch (error) {
                console.log(error.message);
            }
        }

        fetchRepoDetails(cat); // Chama a função para buscar os detalhes do usuário
    }
};

async function getJSONServer() {
    const estilos = document.getElementById('card');
    document.getElementById('nomeCat').innerHTML = `<h2 class="nomeCat">${cat}</h2>`;
    try {
        let res = await fetch(`https://0a9369f7-ba81-44c1-a5e2-61a8dfbe46c6-00-kjwc2bpyo9up.spock.replit.dev:3001/user?categoria=${cat}`);
        let data = await res.json();

        let cardsHTML = '';
        

        for (let item of data) {
            cardsHTML += `
            <a class="link-underline link-underline-opacity-0" href="/json/Julio/port.html?id=${item.id}">
                <div class="col">
                    <div class="card">
                        <div id="card1" class="row py-5">
                            <div class="col-5 ">
                                <img id="img1" src="${item.fotos[0]}" width="" height="" class="img-fluid" alt="foto1card1">
                            </div>
                            <div id="imagens" class="col-3">
                                <div class="divimg2">
                                    <img id="img2" src="${item.fotos[1]}" width="" height="" class="img-fluid" alt="foto2card1">
                                </div>
                                <div class="divimg3">
                                    <img id="img3" src="${item.fotos[2]}" width="" height="" class="img-fluid" alt="foto3card1">
                                </div>
                            </div>
                            <div class="col-1 order-first"></div>
                            <div class="col-1"></div>
                            <div class="col-1 order-first"></div>
                            <div class="col-1 order-last"></div>
                        </div>
                    </div>
                    <h5 id="titulo" class="card-title fw-light text-white">${item.nome}</h5>
                    <p id="subtitulo" class="card-text fw-light">${item.end}</p>
                </div>
            </a>
            `;
        }

        estilos.innerHTML = cardsHTML;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

window.onload = getJSONServer();
