
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("form-quiz");
    const resultado = document.getElementById("resultado-quiz");

    // Verifica se o formulário existe na página
    if (!formulario || !resultado) {
        return;
    }

    // Respostas corretas conforme as alternativas do index.html
    const respostasCorretas = {
        q1: "b",
        q2: "c",
        q3: "a",
        q4: "a",
        q5: "b"
    };

    const totalPerguntas = Object.keys(respostasCorretas).length;

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        let pontuacao = 0;
        let respondidas = 0;

        for (const pergunta in respostasCorretas) {
            const selecionada = formulario.querySelector(
                'input[name="' + pergunta + '"]:checked'
            );

            if (selecionada) {
                respondidas++;

                if (selecionada.value === respostasCorretas[pergunta]) {
                    pontuacao++;
                }
            }
        }

        resultado.replaceChildren();

        // Exige que todas as perguntas sejam respondidas
        if (respondidas < totalPerguntas) {
            resultado.className = "resultado-quiz visivel atencao";

            resultado.textContent =
                "Você respondeu " + respondidas + " de " +
                totalPerguntas +
                " questões. Responda todas antes de conferir o resultado.";

            return;
        }

        const percentual = Math.round(
            (pontuacao / totalPerguntas) * 100
        );

        resultado.className =
            "resultado-quiz visivel " +
            (pontuacao >= 3 ? "sucesso" : "atencao");

        let mensagem;

        if (pontuacao === totalPerguntas) {
            mensagem = "Excelente! Você acertou todas as questões!";
        } else if (pontuacao >= 3) {
            mensagem = "Muito bem! Você demonstrou boa compreensão do conteúdo.";
        } else {
            mensagem = "Continue estudando! Revise o conteúdo e tente novamente.";
        }

        const titulo = document.createElement("h3");
        titulo.textContent =
            "Resultado: " + pontuacao + " de " +
            totalPerguntas + " acertos";

        const texto = document.createElement("p");
        texto.textContent =
            mensagem + " Sua pontuação foi de " +
            percentual + "%.";

        resultado.append(titulo, texto);
    });

    // Limpa o resultado quando o quiz é reiniciado
    formulario.addEventListener("reset", function () {
        resultado.className = "resultado-quiz";
        resultado.textContent = "";
    });
});
