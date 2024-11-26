// Cria uma nova instância de XMLHttpRequest, que será usada para fazer a requisição HTTP
const MeuObjeto = new XMLHttpRequest();

// Seleciona o corpo da página (document.body) e, dentro dele, um elemento com a classe "lista"
// 'document.querySelector()' é um método que retorna o primeiro elemento que corresponde ao seletor CSS fornecido
const corpo = document.querySelector("body");  // Seleciona o corpo da página (onde todo o conteúdo da página está)
const lista = corpo.querySelector(".lista");   // Seleciona o elemento com a classe "lista" dentro do corpo da página

// Inicia uma requisição GET para o arquivo JSON hospedado no GitHub
MeuObjeto.open("GET", "https://raw.githubusercontent.com/DS-Senai/json/refs/heads/main/tecnologias.json");
// 'open' prepara a requisição HTTP. "GET" indica que estamos solicitando dados, e a URL é o local do arquivo JSON.

// Define o tipo de resposta que esperamos do servidor, no caso, um objeto JSON
MeuObjeto.responseType = "json";  // Especifica que a resposta do servidor será automaticamente convertida para um objeto JSON.

// Envia a requisição para o servidor
MeuObjeto.send();  // Envia a requisição ao servidor, mas o código continuará executando enquanto espera a resposta.

// A função a seguir é executada quando a requisição é concluída com sucesso (quando a resposta é recebida)
MeuObjeto.onload = () => { 
    // A resposta da requisição (o conteúdo do arquivo JSON) é atribuída à variável 'objeto'
    var objeto = MeuObjeto.response;  // A resposta do servidor (JSON) é armazenada na variável 'objeto'
    
    // Para cada tecnologia no array 'tecnologias' dentro do objeto JSON, usamos o método forEach.
    objeto.tecnologias.forEach((obj) => {
        // Dentro do 'forEach', iteramos sobre cada objeto de tecnologia e exibimos algumas de suas propriedades no console.
        console.log(obj.nome);                // 'obj.nome' acessa o nome da tecnologia (por exemplo: "JavaScript")
        console.log(obj.tipo);                // 'obj.tipo' acessa o tipo da tecnologia (por exemplo: "Linguagem de Programação")
        console.log(obj.categoria);           // 'obj.categoria' acessa a categoria da tecnologia (ex: "Frontend")
        console.log(obj.descricao);           // 'obj.descricao' acessa a descrição da tecnologia
        console.log(obj.popularidade);        // 'obj.popularidade' acessa a popularidade da tecnologia
        console.log(obj.ano_lancamento);      // 'obj.ano_lancamento' acessa o ano de lançamento da tecnologia
        console.log(obj.criador);             // 'obj.criador' acessa o criador da tecnologia
        console.log(obj.bibliotecas_populares[0]); // Acessa a primeira biblioteca popular associada a esta tecnologia (se houver)
    });

    // Aqui, usamos o 'for...in' para iterar sobre as chaves do primeiro objeto dentro do array 'tecnologias'.
    // O 'for...in' permite acessar as chaves do objeto.
    for (let chave in objeto.tecnologias[0]) {
        console.log(chave);  // Exibe o nome de cada chave (por exemplo, "nome", "tipo", "categoria", etc.)
    }

    // Agora, vamos iterar por todas as tecnologias no array novamente, mas dessa vez exibindo as propriedades na página HTML.
    objeto.tecnologias.forEach((obj) => {
        // Para cada chave no objeto de tecnologia (usamos 'for...in' para acessar cada chave dinamicamente)
        for(let chave in obj){
            // Condicional para verificar se a chave não é 'bibliotecas_populares', que é tratada separadamente.
            if(chave != "bibliotecas_populares") {
                // Se a chave não for 'bibliotecas_populares', exibe o nome da chave e seu valor em um parágrafo HTML
                lista.innerHTML+=
                `<p><strong>${chave}:</strong> ${obj[chave]} </p>`;  // Adiciona um parágrafo à lista HTML com a chave e o valor correspondente.
            } else {
                // Se a chave for 'bibliotecas_populares', percorre o array de bibliotecas associadas a essa tecnologia.
                obj.bibliotecas_populares.forEach((biblioteca) => {
                    // Dentro do array de bibliotecas populares, usamos o 'for...in' para acessar as chaves de cada biblioteca.
                    for(let chave_bibliotecas in biblioteca) {
                        // Para cada chave da biblioteca, cria um item de lista (um <ul>) que mostra o nome da chave e o valor da chave.
                        lista.innerHTML+=
                        `<ul><strong>${chave_bibliotecas}: </strong> ${biblioteca[chave_bibliotecas]}</ul>`;  
                    }
                });
            }
        }
        // Após exibir as bibliotecas de uma tecnologia, adiciona uma quebra de linha para separar visualmente as tecnologias na lista
        lista.innerHTML+=`<br>`;  // Adiciona uma quebra de linha para separar as tecnologias na lista HTML
    });
}
