// Estrutura JSON atualizada para os alimentos do Wilderfeast
const exemploAlimento = {
  "id": 1, // ID único para cada alimento
  "nome": "Nome do Alimento", // Opcional se tem_variacao for true
  "estilo": "Ligeiro", // Ligeiro, Poderoso, Preciso ou Sagaz
  "descricao": "Descrição detalhada do alimento...", // Opcional se tem_variacao for true
  "tracos": [1, 3, 5], // IDs dos traços associados
  "variacao_rolagem": {
    "tem_variacao": true, // false se não tiver variação baseada em rolagem
    "abaixo_5": {
      "nome": "Nome da variação para rolagem abaixo de 5",
      "descricao": "Descrição da variação para rolagem abaixo de 5..."
    },
    "acima_5": {
      "nome": "Nome da variação para rolagem 5 ou mais",
      "descricao": "Descrição da variação para rolagem 5 ou mais..."
    }
  }
};

// Exemplo de alimento sem variação de rolagem
const exemploSemVariacao = {
  "id": 2,
  "nome": "Rabanete da Baía",
  "estilo": "Ligeiro",
  "descricao": "Um rabanete selvagem caracterizado por sua raiz bulbosa e branca. Firme, crocante e suave. Amoleça as folhas deixando-as no vinagre ou refogando-as antes de comê-las.",
  "tracos": [4, 6], // Beira D'Água, Clima Costeiro
  "variacao_rolagem": {
    "tem_variacao": false
  }
};

// Exemplo de alimento com variação de rolagem
const exemploComVariacao = {
  "id": 3,
  "nome": "", // Campo opcional quando tem variação
  "estilo": "Sagaz",
  "descricao": "", // Campo opcional quando tem variação
  "tracos": [3, 7], // Árido, Condições Extremas
  "variacao_rolagem": {
    "tem_variacao": true,
    "abaixo_5": {
      "nome": "Palma de Cacto",
      "descricao": "Se a refeição recuperar 8+ de Vigor, receba NÃO-ME-TOQUE (1). Acre, mas estranhamente viscoso. Retire cuidadosamente os espinhos e grelhe ou sele em uma frigideira. Use ácido generosamente se não gostar da sensação viscosa na boca."
    },
    "acima_5": {
      "nome": "Semente Difusora",
      "descricao": "Receba VOAR (1) ou (+1) em ATIRAR. Ervas Difusoras lançam suas sementes com força, para que possam cair e se dispersar pelos ventos do deserto."
    }
  }
};