document.addEventListener('DOMContentLoaded', function () {

            const summarizationSteps = [
                { title: "Passo 1: Leitura Atenta e Compreensão Profunda", content: "Leia o texto cuidadosamente para compreender seu significado e propósito completos. Não se apresse nesta fase; a compreensão é a base de tudo." },
                { title: "Passo 2: Identificação das Ideias Centrais", content: "Divida o texto em seções. Identifique a tese do autor e os argumentos centrais ou pontos principais em cada seção." },
                { title: "Passo 3: Diferenciação de Detalhes", content: "Discirna entre ideias principais (informações essenciais) e detalhes menores ou exemplos de apoio. Foque no que é crucial para a mensagem." },
                { title: "Passo 4: Remoção e Condensação", content: "Elimine detalhes e exemplos menores. Condense o texto com cuidado para não deturpar a intenção do autor. Preste atenção às palavras de transição para entender o fluxo lógico." },
                { title: "Passo 5: Reorganização e Redação", content: "Reorganize os pontos principais de forma lógica, utilizando suas próprias palavras e estrutura de frase. A reescrita força o processamento da informação." },
                { title: "Passo 6: Fidelidade e Citação", content: "Verifique se o resumo representa com precisão o significado da fonte. Se for para um trabalho acadêmico, cite apropriadamente." },
                { title: "Passo 7: Revisão e Abstenção de Opiniões", content: "Revise o resumo para clareza, concisão e precisão. Certifique-se de que opiniões pessoais foram completamente excluídas." }
            ];

            const accordionContainer = document.getElementById('accordion-container');
            summarizationSteps.forEach((step, index) => {
                const item = document.createElement('div');
                item.className = 'border border-gray-200 rounded-lg overflow-hidden';
                item.innerHTML = `
                    <button class="accordion-header w-full text-left p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none">
                        <div class="flex justify-between items-center">
                            <span class="font-semibold text-lg text-[#3D405B]">${step.title}</span>
                            <span class="text-xl text-[#E07A5F] transition-transform transform">+</span>
                        </div>
                    </button>
                    <div class="accordion-content bg-white">
                        <p class="p-4 text-gray-600">${step.content}</p>
                    </div>
                `;
                accordionContainer.appendChild(item);
            });

            const accordionHeaders = document.querySelectorAll('.accordion-header');
            accordionHeaders.forEach(header => {
                header.addEventListener('click', () => {
                    const content = header.nextElementSibling;
                    const icon = header.querySelector('span:last-child');

                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                        content.style.padding = "0px";
                        icon.classList.remove('rotate-45');
                    } else {
                        document.querySelectorAll('.accordion-content').forEach(c => {
                            c.style.maxHeight = null;
                            c.style.padding = "0px";
                            c.previousElementSibling.querySelector('span:last-child').classList.remove('rotate-45');
                        });
                        content.style.maxHeight = content.scrollHeight + "px";
                        content.style.padding = "1rem";
                        icon.classList.add('rotate-45');
                    }
                });
            });

            const bloomData = {
                labels: ['Lembrar', 'Compreender', 'Aplicar', 'Analisar', 'Avaliar', 'Criar'],
                datasets: [{
                    label: 'Nível Cognitivo',
                    data: [1, 2, 3, 4, 5, 6],
                    backgroundColor: [
                        '#81B29A', '#F2CC8F', '#E07A5F', '#3D405B', '#6D597A', '#B56576'
                    ],
                    borderColor: '#FDFBF5',
                    borderWidth: 2
                }]
            };

            const bloomDetailsData = [
                { level: "Lembrar", keywords: "Quem, o quê, identificar, recordar, listar, descrever.", purpose: "Memorizar e recordar fatos específicos.", examples: "Quem foi...? O que é...? Onde...? Como...?" },
                { level: "Compreender", keywords: "Interpretar, resumir, explicar, generalizar, prever.", purpose: "Organizar e selecionar fatos e ideias, interpretar significado.", examples: "Reconte em suas próprias palavras ____. Qual é a ideia principal de _____? O que significa...?" },
                { level: "Aplicar", keywords: "Construir, demonstrar, resolver, usar, aplicar, hipotetizar.", purpose: "Usar fatos e regras em novas situações.", examples: "Como ____ é um exemplo de_____? Como... poderia ser usado para...? Por que _____ é significativo?" },
                { level: "Analisar", keywords: "Decompor, comparar, organizar, desconstruir, qual a relação.", purpose: "Separar um todo em partes; examinar informações.", examples: "Classifique_____de acordo com_____. Quais são as características de_____? Como _____ se compara/contrasta com_____? Por que... é importante? Qual a diferença entre... e...? Quais são as implicações de...?" },
                { level: "Avaliar", keywords: "Julgar, defender, criticar, concluir, avaliar.", purpose: "Desenvolver opiniões e julgamentos com base em critérios.", examples: "Você concorda que_____? Explique. Quais critérios você usaria para avaliar? Qual é o melhor... e por quê? Como... afeta...? Por que... está acontecendo?" },
                { level: "Criar", keywords: "Criar, compor, projetar, planejar, produzir.", purpose: "Combinar ideias para formar um novo todo; gerar novas soluções.", examples: "Que soluções você sugeriria para _____? Como você projetaria um novo_____? O que você acha que causa...? Que ideias você pode adicionar a_____? Qual é a solução para o problema de...?" }
            ];

            const bloomDetailElement = document.getElementById('bloom-details');

            function updateBloomDetails(index) {
                if (index === undefined || index < 0 || index >= bloomDetailsData.length) return;
                const data = bloomDetailsData[index];
                bloomDetailElement.innerHTML = `
                    <h3 class="text-2xl font-bold text-[#3D405B]">${data.level}</h3>
                    <div class="mt-4">
                        <p><strong class="font-semibold text-gray-700">Propósito:</strong> ${data.purpose}</p>
                        <p class="mt-2"><strong class="font-semibold text-gray-700">Palavras-Chave:</strong> ${data.keywords}</p>
                        <p class="mt-2"><strong class="font-semibold text-gray-700">Exemplos de Perguntas:</strong> "${data.examples}"</p>
                    </div>
                `;
            }

            const ctx = document.getElementById('bloomChart').getContext('2d');
            const bloomChart = new Chart(ctx, {
                type: 'bar',
                data: bloomData,
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    },
                    scales: {
                        x: {
                            display: false,
                        },
                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 14,
                                    weight: '600'
                                }
                            }
                        }
                    },
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            const clickedIndex = elements[0].index;
                            updateBloomDetails(clickedIndex);

                            bloomChart.data.datasets[0].backgroundColor = bloomData.datasets[0].backgroundColor.map(c => c + '80');
                            bloomChart.data.datasets[0].backgroundColor[clickedIndex] = bloomData.datasets[0].backgroundColor[clickedIndex].slice(0, 7);
                            bloomChart.update();
                        }
                    }
                }
            });

            const navLinks = document.querySelectorAll('.nav-link');
            const mobileNav = document.getElementById('mobile-nav');
            const sections = document.querySelectorAll('.content-section');

            function switchTab(targetId) {
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetId) {
                        section.classList.add('active');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.target === targetId) {
                        link.classList.add('active');
                    }
                });

                if (mobileNav.value !== targetId) {
                    mobileNav.value = targetId;
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    switchTab(link.dataset.target);
                });
            });

            mobileNav.addEventListener('change', (e) => {
                switchTab(e.target.value);
            });

            // Gemini API: Summarization Assistant Logic
            const summaryInput = document.getElementById('summary-input');
            const generateSummaryBtn = document.getElementById('generate-summary-btn');
            const summaryOutput = document.getElementById('summary-output');
            const summaryText = document.getElementById('summary-text');
            const summaryLoading = document.getElementById('summary-loading');

            generateSummaryBtn.addEventListener('click', async () => {
                const prompt = `Resuma o seguinte texto de forma concisa e clara:\n\n${summaryInput.value}`;
                summaryLoading.classList.remove('hidden');
                summaryOutput.classList.add('hidden');
                summaryText.textContent = '';

                try {
                    let chatHistory = [];
                    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                    const payload = { contents: chatHistory };
                    // ATENÇÃO: Sua chave de API Gemini foi inserida aqui.
                    // Obtenha uma em https://aistudio.google.com/app/apikey
                    const apiKey = "AIzaSyCg6Fzn6AxzAEmfek_WMuG2X95WfB4ETEo";
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    const result = await response.json();

                    if (result.candidates && result.candidates.length > 0 &&
                        result.candidates[0].content && result.candidates[0].content.parts &&
                        result.candidates[0].content.parts.length > 0) {
                        const text = result.candidates[0].content.parts[0].text;
                        summaryText.innerHTML = text.replace(/\n/g, '<br>'); // Melhoria: preservar quebras de linha
                        summaryOutput.classList.remove('hidden');
                    } else {
                        summaryText.textContent = 'Erro ao gerar resumo. Tente novamente.';
                        summaryOutput.classList.remove('hidden');
                    }
                } catch (error) {
                    console.error('Erro na API Gemini:', error);
                    summaryText.textContent = 'Ocorreu um erro ao conectar com a API. Verifique sua conexão e se a chave de API está correta.';
                    summaryOutput.classList.remove('hidden');
                } finally {
                    summaryLoading.classList.add('hidden');
                }
            });

            // Gemini API: Question Generator Logic
            const questionInput = document.getElementById('question-input');
            const bloomLevelSelect = document.getElementById('bloom-level');
            const generateQuestionsBtn = document.getElementById('generate-questions-btn');
            const questionsOutput = document.getElementById('questions-output');
            const questionsList = document.getElementById('questions-list'); // Agora é <ol>
            const questionsLoading = document.getElementById('questions-loading');

            generateQuestionsBtn.addEventListener('click', async () => {
                const selectedLevel = bloomLevelSelect.value;
                let prompt = `Gere 3-5 questões de estudo com base no seguinte texto.`;
                if (selectedLevel) {
                    prompt += ` As questões devem focar no nível de aprendizado "${selectedLevel}" da Taxonomia de Bloom.`;
                }
                // Melhoria: Pedir para a IA não numerar, o HTML fará isso
                prompt += ` Formate cada questão em uma nova linha, sem numeração. Texto:\n\n${questionInput.value}`;

                questionsLoading.classList.remove('hidden');
                questionsOutput.classList.add('hidden');
                questionsList.innerHTML = '';

                try {
                    let chatHistory = [];
                    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                    const payload = { contents: chatHistory };
                    // ATENÇÃO: Sua chave de API Gemini foi inserida aqui.
                    // Obtenha uma em https://aistudio.google.com/app/apikey
                    const apiKey = "AIzaSyCg6Fzn6AxzAEmfek_WMuG2X95WfB4ETEo";
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    const result = await response.json();

                    if (result.candidates && result.candidates.length > 0 &&
                        result.candidates[0].content && result.candidates[0].content.parts &&
                        result.candidates[0].content.parts.length > 0) {
                        const text = result.candidates[0].content.parts[0].text;
                        const questions = text.split('\n').filter(q => q.trim() !== '');
                        questions.forEach(q => {
                            const li = document.createElement('li');
                            li.textContent = q.replace(/^\d+\.\s*/, ''); // Remove qualquer numeração que a IA possa ter adicionado
                            questionsList.appendChild(li);
                        });
                        questionsOutput.classList.remove('hidden');
                    } else {
                        questionsList.innerHTML = '<li>Erro ao gerar questões. Tente novamente.</li>';
                        questionsOutput.classList.remove('hidden');
                    }
                } catch (error) {
                    console.error('Erro na API Gemini:', error);
                    questionsList.innerHTML = '<li>Ocorreu um erro ao conectar com a API. Verifique sua conexão e se a chave de API está correta.</li>';
                    questionsOutput.classList.remove('hidden');
                } finally {
                    questionsLoading.classList.add('hidden');
                }
            });

            // Gemini API: Flashcard Generator Logic
            const flashcardInput = document.getElementById('flashcard-input');
            const generateFlashcardsBtn = document.getElementById('generate-flashcards-btn');
            const flashcardsOutput = document.getElementById('flashcards-output');
            const flashcardsLoading = document.getElementById('flashcards-loading');

            generateFlashcardsBtn.addEventListener('click', async () => {
                const text = flashcardInput.value;
                if (!text.trim()) {
                    alert('Por favor, insira um texto para gerar flashcards.');
                    return;
                }

                const prompt = `Gere 3-5 flashcards (pergunta e resposta) em formato JSON a partir do seguinte texto. Use o seguinte esquema:
                [
                    { "pergunta": "...", "resposta": "..." },
                    { "pergunta": "...", "resposta": "..." }
                ]
                Texto: ${text}`;

                flashcardsLoading.classList.remove('hidden');
                flashcardsOutput.classList.add('hidden');
                flashcardsOutput.innerHTML = '';

                try {
                    let chatHistory = [];
                    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                    const payload = {
                        contents: chatHistory,
                        generationConfig: {
                            responseMimeType: "application/json",
                            responseSchema: {
                                type: "ARRAY",
                                items: {
                                    type: "OBJECT",
                                    properties: {
                                        "pergunta": { "type": "STRING" },
                                        "resposta": { "type": "STRING" }
                                    },
                                    "propertyOrdering": ["pergunta", "resposta"]
                                }
                            }
                        }
                    };
                    // ATENÇÃO: Sua chave de API Gemini foi inserida aqui.
                    // Obtenha uma em https://aistudio.google.com/app/apikey
                    const apiKey = "AIzaSyCg6Fzn6AxzAEmfek_WMuG2X95WfB4ETEo";
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    const result = await response.json();

                    if (result.candidates && result.candidates.length > 0 &&
                        result.candidates[0].content && result.candidates[0].content.parts &&
                        result.candidates[0].content.parts.length > 0) {
                        const jsonString = result.candidates[0].content.parts[0].text;
                        const flashcards = JSON.parse(jsonString);

                        flashcards.forEach(card => {
                            const flashcardDiv = document.createElement('div');
                            flashcardDiv.className = 'flashcard';
                            flashcardDiv.innerHTML = `
                                <div class="flashcard-inner">
                                    <div class="flashcard-front">${card.pergunta}</div>
                                    <div class="flashcard-back">${card.resposta}</div>
                                </div>
                            `;
                            flashcardDiv.addEventListener('click', () => {
                                flashcardDiv.classList.toggle('flipped');
                            });
                            flashcardsOutput.appendChild(flashcardDiv);
                        });
                        flashcardsOutput.classList.remove('hidden');
                    } else {
                        flashcardsOutput.innerHTML = '<p class="text-red-500">Erro ao gerar flashcards. Tente novamente.</p>';
                        flashcardsOutput.classList.remove('hidden');
                    }
                } catch (error) {
                    console.error('Erro na API Gemini (Flashcards):', error);
                    flashcardsOutput.innerHTML = '<p class="text-red-500">Ocorreu um erro ao conectar com a API. Verifique sua conexão e se a chave de API está correta.</p>';
                    flashcardsOutput.classList.remove('hidden');
                } finally {
                    flashcardsLoading.classList.add('hidden');
                }
            });

            // Gemini API: Concept Explainer Logic
            const conceptInput = document.getElementById('concept-input');
            const explainConceptBtn = document.getElementById('explain-concept-btn');
            const conceptOutput = document.getElementById('concept-output');
            const conceptText = document.getElementById('concept-text');
            const conceptLoading = document.getElementById('concept-loading');

            explainConceptBtn.addEventListener('click', async () => {
                const concept = conceptInput.value;
                if (!concept.trim()) {
                    alert('Por favor, digite um conceito para explicar.');
                    return;
                }

                const prompt = `Explique o conceito de "${concept}" de forma clara, concisa e didática, como se estivesse explicando para um estudante universitário.`;

                conceptLoading.classList.remove('hidden');
                conceptOutput.classList.add('hidden');
                conceptText.textContent = '';

                try {
                    let chatHistory = [];
                    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                    const payload = { contents: chatHistory };
                    // ATENÇÃO: Sua chave de API Gemini foi inserida aqui.
                    // Obtenha uma em https://aistudio.google.com/app/apikey
                    const apiKey = "AIzaSyCg6Fzn6AxzAEmfek_WMuG2X95WfB4ETEo";
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    const result = await response.json();

                    if (result.candidates && result.candidates.length > 0 &&
                        result.candidates[0].content && result.candidates[0].content.parts &&
                        result.candidates[0].content.parts.length > 0) {
                        const text = result.candidates[0].content.parts[0].text;
                        conceptText.innerHTML = text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>'); // Melhoria: preservar formatação de parágrafos e quebras de linha
                        conceptOutput.classList.remove('hidden');
                    } else {
                        conceptText.textContent = 'Erro ao buscar explicação. Tente novamente.';
                        conceptOutput.classList.remove('hidden');
                    }
                } catch (error) {
                    console.error('Erro na API Gemini (Explicação de Conceito):', error);
                    conceptText.textContent = 'Ocorreu um erro ao conectar com a API. Verifique sua conexão e se a chave de API está correta.';
                    conceptOutput.classList.remove('hidden');
                } finally {
                    conceptLoading.classList.add('hidden');
                }
            });
        });
