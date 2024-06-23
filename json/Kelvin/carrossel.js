

window.onload = function () {
    fetch("https://0a9369f7-ba81-44c1-a5e2-61a8dfbe46c6-00-kjwc2bpyo9up.spock.replit.dev:3001/user")
        .then((req) => req.json())
        .then((data) => {
            document.getElementById('f1').innerHTML = `<a href="/json/Estilo/index.html?categoria=Tradicional Japanese"><img class="imagens-carrossel" src="${data[0].fotos[3]}" width="467px" height="500px"></a>`;
            document.getElementById('f2').innerHTML = `<a href="/json/Estilo/index.html?categoria=Black Work"><img class="imagens-carrossel" src="${data[1].fotos[3]}" width="467px" height="500px"></a>`;
            document.getElementById('f3').innerHTML = `<a href="/json/Estilo/index.html?categoria=Neo Trad"><img class="imagens-carrossel" src="${data[2].fotos[3]}" width="467px" height="500px"></a>`;
            document.getElementById('f4').innerHTML = `<a href="/json/Estilo/index.html?categoria=Old School"><img class="imagens-carrossel" src="${data[3].fotos[3]}" width="467px" height="500px"></a>`;
            document.getElementById('f5').innerHTML = `<a href="/json/Estilo/index.html?categoria=Realista"><img class="imagens-carrossel" src="${data[4].fotos[3]}" width="467px" height="500px"></a>`;
            document.getElementById('f6').innerHTML = `<a href="/json/Estilo/index.html?categoria=Tribal"><img class="imagens-carrossel" src="${data[5].fotos[3]}" width="467px" height="500px"></a>`;
        }


        )
        .catch((error) => {
            console.error("Erro ao carregar dados:", error);
            // Lidar com erros de requisição aqui
        });
};
