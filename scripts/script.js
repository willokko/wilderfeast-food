// Carrega os dados do JSON
let ingredientes = [];
let ultimosIngredientes = {
    'Ligeiro': null,
    'Poderoso': null,
    'Preciso': null,
    'Sagaz': null
};

// Função para carregar os dados do JSON
async function carregarIngredientes() {
    try {
        const response = await fetch('data/alimentos_wilderfeast.json');
        ingredientes = await response.json();
    } catch (error) {
        console.error('Erro ao carregar ingredientes:', error);
    }
}

// Função para rolar um dado de 10 faces
function rolarD10() {
    return Math.floor(Math.random() * 10) + 1;
}

// Função para filtrar ingredientes por traço e estilo
function filtrarIngredientes(traco, estilo) {
    return ingredientes.filter(ing => 
        ing.tracos.includes(parseInt(traco)) && 
        ing.estilo.toLowerCase() === estilo.toLowerCase()
    );
}

// Função para adicionar efeito de highlight
function adicionarHighlight(row) {
    row.classList.add('highlight');
    setTimeout(() => {
        row.classList.remove('highlight');
    }, 1000);
}

// Função para atualizar a tabela com o ingrediente sorteado
function atualizarTabela(estilo, ingrediente) {
    const estiloLower = estilo.toLowerCase();
    const styleCell = document.querySelector(`.style-${estiloLower} .style-cell`);
    const row = document.querySelector(`.style-${estiloLower}`);
    
    // Remove a linha de variação anterior se existir
    const nextRow = row.nextElementSibling;
    if (nextRow && nextRow.classList.contains('variation-row')) {
        nextRow.remove();
    }

    if (!ingrediente) {
        styleCell.rowSpan = "1";
        row.querySelector('td:last-child').rowSpan = "1";
        row.querySelector('.nome-cell').textContent = 'Nenhum ingrediente encontrado';
        row.querySelector('.efeito-cell').textContent = '-';
        return;
    }

    // Adiciona efeito de highlight
    adicionarHighlight(row);

    // Verifica se tem algum tipo de variação
    const temVariacao = ingrediente.variacao_rolagem?.tem_variacao || ingrediente.variacao_rolagem_8?.tem_variacao;

    if (temVariacao) {
        // Configura rowspan para 2 nas células que precisam ocupar duas linhas
        styleCell.rowSpan = "2";
        row.querySelector('td:last-child').rowSpan = "2";

        let primeiraLinha, segundaLinha;
        
        // Verifica qual tipo de variação usar
        if (ingrediente.variacao_rolagem?.tem_variacao) {
            primeiraLinha = {
                prefixo: '[A] ≤ 4',
                nome: ingrediente.variacao_rolagem.abaixo_5.nome,
                descricao: ingrediente.variacao_rolagem.abaixo_5.descricao
            };
            segundaLinha = {
                prefixo: '[A] ≥ 5',
                nome: ingrediente.variacao_rolagem.acima_5.nome,
                descricao: ingrediente.variacao_rolagem.acima_5.descricao
            };
        } else if (ingrediente.variacao_rolagem_8?.tem_variacao) {
            primeiraLinha = {
                prefixo: '[A] ≤ 7',
                nome: ingrediente.variacao_rolagem_8.abaixo_8?.nome || ingrediente.nome,
                descricao: ingrediente.variacao_rolagem_8.abaixo_8?.descricao || ingrediente.descricao
            };
            segundaLinha = {
                prefixo: '[A] ≥ 8',
                nome: ingrediente.variacao_rolagem_8.acima_8?.nome || '',
                descricao: ingrediente.variacao_rolagem_8.acima_8?.descricao || ''
            };
        }

        // Atualiza primeira linha
        const nomeCompleto1 = `${primeiraLinha.prefixo} ${primeiraLinha.nome || ''}`.trim();
        const nomeCompleto2 = `${segundaLinha.prefixo} ${segundaLinha.nome || ''}`.trim();

        row.querySelector('.nome-cell').textContent = nomeCompleto1;
        row.querySelector('.efeito-cell').textContent = primeiraLinha.descricao || '';

        // Cria segunda linha
        const newRow = document.createElement('tr');
        newRow.classList.add('variation-row', `style-${estiloLower}`);
        newRow.innerHTML = `
            <td class="nome-cell">${nomeCompleto2}</td>
            <td class="efeito-cell">${segundaLinha.descricao || ''}</td>
        `;

        // Insere a nova linha após a linha atual
        row.after(newRow);
        
        // Adiciona highlight na nova linha também
        adicionarHighlight(newRow);
    } else {
        // Caso não tenha variação, mostra apenas uma linha
        styleCell.rowSpan = "1";
        row.querySelector('td:last-child').rowSpan = "1";
        row.querySelector('.nome-cell').textContent = ingrediente.nome || '';
        row.querySelector('.efeito-cell').textContent = ingrediente.descricao || '';
    }
}

// Função principal de sorteio
function sortearIngrediente(estilo) {
    const tracoSelecionado = document.getElementById('traco').value;
    const ingredientesFiltrados = filtrarIngredientes(tracoSelecionado, estilo);
    
    if (ingredientesFiltrados.length === 0) {
        atualizarTabela(estilo, null);
        return;
    }

    // Tenta até 3 vezes para evitar repetição do último ingrediente
    let tentativas = 0;
    let indiceAleatorio;
    let ingredienteSorteado;

    do {
        indiceAleatorio = Math.floor(Math.random() * ingredientesFiltrados.length);
        ingredienteSorteado = ingredientesFiltrados[indiceAleatorio];
        tentativas++;
    } while (
        tentativas < 3 && 
        ultimosIngredientes[estilo] && 
        ingredienteSorteado.id === ultimosIngredientes[estilo].id
    );

    // Atualiza o último ingrediente sorteado
    ultimosIngredientes[estilo] = ingredienteSorteado;
    
    atualizarTabela(estilo, ingredienteSorteado);
}

// Função para randomizar todos os estilos
function randomizarTodos() {
    const estilos = ['Ligeiro', 'Poderoso', 'Preciso', 'Sagaz'];
    estilos.forEach(estilo => {
        sortearIngrediente(estilo);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    await carregarIngredientes();

    // Adiciona listeners aos botões de dado
    document.querySelectorAll('.dice-button').forEach(button => {
        button.addEventListener('click', () => {
            const estilo = button.getAttribute('data-style');
            sortearIngrediente(estilo);
        });
    });

    // Adiciona listener ao botão de randomizar todos
    document.getElementById('random-all-button').addEventListener('click', randomizarTodos);
}); 