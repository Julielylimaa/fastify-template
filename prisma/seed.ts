import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Iniciando o seed...')

    // Array de questões com pergunta, resposta correta e opções incorretas
    const questionsData = [
        ["Quem é considerado o pai da computação?", "Alan Turing", ["Bill Gates", "Steve Jobs", "Charles Babbage"]],
        ["Qual empresa desenvolveu o sistema operacional Windows?", "Microsoft", ["Apple", "Linux Foundation", "Google"]],
        ["O que significa a sigla 'URL'?", "Uniform Resource Locator", ["Universal Resource Link", "Uncoded Resource Logic", "User Resource Language"]],
        ["Qual linguagem é conhecida por ser usada na criação da web (HTML, CSS, JS)?", "JavaScript", ["Python", "C++", "Java"]],
        ["Qual dessas é uma linguagem de marcação?", "HTML", ["Python", "C#", "SQL"]],
        ["O que é um algoritmo?", "Conjunto de instruções para resolver um problema", ["Um tipo de vírus", "Programa antivírus", "Banco de dados"]],
        ["Quem fundou a Apple junto com Steve Jobs?", "Steve Wozniak", ["Bill Gates", "Tim Cook", "Elon Musk"]],
        ["O que é a nuvem (cloud computing)?", "Serviços e armazenamento de dados via internet", ["Espaço físico de servidores locais", "Tipo de inteligência artificial", "Software de backup manual"]],
        ["Qual desses é um banco de dados relacional?", "PostgreSQL", ["MongoDB", "Redis", "Elasticsearch"]],
        ["Em que ano o iPhone foi lançado?", "2007", ["2005", "2010", "2003"]],
        ["O que é um sistema operacional?", "Software que gerencia o hardware do computador", ["Antivírus", "Navegador", "Editor de texto"]],
        ["Qual empresa criou o Android?", "Google", ["Apple", "Microsoft", "Samsung"]],
        ["Para que serve o Git?", "Controle de versões de código", ["Criação de jogos", "Editar imagens", "Navegar na internet"]],
        ["Qual das seguintes é uma distribuição Linux?", "Ubuntu", ["Windows", "macOS", "ChromeOS"]],
        ["Qual linguagem é popular para inteligência artificial?", "Python", ["Ruby", "PHP", "Pascal"]],
        ["O que é um pixel?", "Menor unidade de uma imagem digital", ["Tipo de sensor", "Modelo de processador", "Rede de computadores"]],
        ["Qual foi o primeiro mecanismo de busca na internet?", "Archie", ["Google", "AltaVista", "Yahoo"]],
        ["Qual empresa criou o ChatGPT?", "OpenAI", ["Meta", "IBM", "Google"]],
        ["O que significa CPU?", "Central Processing Unit", ["Control Power Unit", "Central Program Utility", "Code Processing Utility"]],
        ["Qual dessas é uma tecnologia de blockchain?", "Ethereum", ["Netscape", "Tor", "React"]],
        ["O que é phishing?", "Golpe que engana usuários para roubar dados", ["Tipo de antivírus", "Software de proteção", "Ataque de força bruta"]],
        ["Qual é a principal linguagem para criar apps no Android?", "Kotlin", ["Swift", "C", "TypeScript"]],
        ["O que é um endereço IP?", "Identificador único de um dispositivo na rede", ["Código postal", "Senha de rede", "Extensão de navegador"]],
        ["Quem criou o Linux?", "Linus Torvalds", ["Richard Stallman", "Steve Jobs", "Mark Zuckerberg"]],
        ["O que significa HTTP?", "HyperText Transfer Protocol", ["High-Tech Transfer Protocol", "Host Text Transfer Package", "Hyperlink Transfer Process"]],
        ["Qual a função do navegador?", "Acessar e exibir páginas da web", ["Gerar IPs", "Proteger antivírus", "Codificar HTML"]],
        ["O que é uma VPN?", "Rede privada virtual que protege a conexão", ["Servidor web", "Antivírus", "Firewall"]],
        ["Para que serve a RAM?", "Memória temporária para execução de tarefas", ["Armazenamento permanente", "Proteção de dados", "Navegação segura"]],
        ["O que é um byte?", "Unidade de dados com 8 bits", ["Tipo de código", "Software de backup", "Nome de vírus"]],
        ["O que é machine learning?", "Aprendizado de máquina a partir de dados", ["Execução de tarefas manuais", "Codificação de hardware", "Compactação de arquivos"]],
        ["O que é um QR Code?", "Código visual escaneável com informações", ["Tipo de vírus", "ID de rede", "Código de backup"]],
        ["Qual dessas tecnologias é usada em redes Wi-Fi?", "IEEE 802.11", ["HTML5", "USB 3.0", "HDMI"]],
        ["Qual dessas linguagens é usada para banco de dados?", "SQL", ["CSS", "C#", "Go"]],
        ["Quem fundou a Microsoft?", "Bill Gates", ["Steve Jobs", "Larry Page", "Jeff Bezos"]],
        ["O que é um navegador web?", "Programa para acessar páginas da internet", ["Sistema operacional", "Editor de código", "Firewall"]],
        ["O que significa DNS?", "Domain Name System", ["Data Network Service", "Digital Number Server", "Device Naming Structure"]],
        ["O que é open source?", "Software com código-fonte aberto", ["Software gratuito", "Software de teste", "Software offline"]],
        ["Qual é o nome do assistente virtual da Amazon?", "Alexa", ["Siri", "Cortana", "Google Assistant"]],
        ["Qual dessas é uma rede social?", "LinkedIn", ["Slack", "Gmail", "Dropbox"]],
        ["O que é o metaverso?", "Ambiente virtual imersivo e interativo", ["Rede de e-mails", "Sistema de backup", "Assistente virtual"]],
        ["Qual é o nome do robô da Boston Dynamics que anda como humano?", "Atlas", ["Optimus", "Cheetah", "Neo"]],
        ["Qual linguagem é famosa por seu uso em front-end web?", "JavaScript", ["Java", "Swift", "Rust"]],
        ["O que é um SSD?", "Unidade de armazenamento de estado sólido", ["Placa de vídeo", "Tipo de processador", "Monitor de segurança"]],
        ["O que significa API?", "Interface de Programação de Aplicações", ["Aplicativo de Processamento Interno", "Associação de Protocolo Internet", "Arquivo de Página Inicial"]],
        ["Qual das seguintes é uma linguagem funcional?", "Haskell", ["Perl", "C", "Bash"]],
        ["O que é deepfake?", "Vídeo manipulado com IA para parecer real", ["Vídeo com filtros", "Animação 3D", "Áudio distorcido"]],
        ["Qual dessas empresas é conhecida por fabricar placas de vídeo?", "NVIDIA", ["Intel", "Cisco", "Logitech"]],
        ["O que é um bug?", "Erro ou falha em um sistema", ["Atualização", "Novo recurso", "Código seguro"]],
        ["Qual é a principal função do firewall?", "Proteger a rede contra acessos não autorizados", ["Armazenar dados", "Acelerar downloads", "Comprimir arquivos"]]
    ];

    // Função auxiliar para embaralhar array
    function shuffleArray(array: string[]): string[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    console.log('Inserindo questões...')

    // Processar cada questão
    for (const [question, correctAnswer, wrongOptions] of questionsData) {
        // Criar array com todas as opções (resposta correta + opções incorretas)
        const allOptions = [correctAnswer as string, ...(wrongOptions as string[])];
        
        // Embaralhar as opções para que a resposta correta não esteja sempre na primeira posição
        const shuffledOptions = shuffleArray(allOptions);

        await prisma.questions.create({
            data: {
                question: question as string,
                answer: correctAnswer as string,
                options: shuffledOptions,
            }
        });

        console.log(`✓ Questão inserida: "${question}"`)
    }

    console.log(`🎉 Seed finalizado! ${questionsData.length} questões inseridas com sucesso.`)
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
