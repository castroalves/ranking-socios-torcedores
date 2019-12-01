const RANKINGST = (() => {

    const clubes = [
        {
            nome: 'Barcelona',
            logo: 'barcelona.svg',
            socios: 220000
        },
        {
            nome: 'Bayern de Munique',
            logo: 'bayern-munich.svg',
            socios: 217000
        },
        {
            nome: 'Real Madrid',
            logo: 'real-madrid.svg',
            socios: 206000
        },
        {
            nome: 'Benfica',
            logo: 'benfica.svg',
            socios: 198000
        },
        {
            nome: 'Manchester United',
            logo: 'manchester-united.svg',
            socios: 190000
        },
        {
            nome: 'Schalke 04',
            logo: 'schalke-04.svg',
            socios: 156000
        },
        {
            nome: 'Borussia Dortmund',
            logo: 'borussia-dortmund.svg',
            socios: 154000
        },
        {
            nome: 'Flamengo',
            logo: 'flamengo.svg',
            socios: 145000
        },
        {
            nome: 'Internacional',
            logo: 'internacional.svg',
            socios: 130000
        },
        {
            nome: 'Vasco da Gama',
            logo: 'vasco.svg',
            socios: 124000
        }
    ];

    const clubesBr = [
        {
            nome: 'Flamengo',
            logo: 'flamengo.svg',
            socios: 145000
        },
        {
            nome: 'Internacional',
            logo: 'internacional.svg',
            socios: 130000
        },
        {
            nome: 'Vasco da Gama',
            logo: 'vasco.svg',
            socios: 124000
        },
        {
            nome: 'Atlético-MG',
            logo: 'atletico-mg.svg',
            socios: 110000
        },
        {
            nome: 'Grêmio',
            logo: 'gremio.svg',
            socios: 91000
        },
        {
            nome: 'Corinthians',
            logo: 'corinthians.svg',
            socios: 81000
        },
        {
            nome: 'Palmeiras',
            logo: 'palmeiras.svg',
            socios: 60000
        },
        {
            nome: 'Bahia',
            logo: 'bahia.svg',
            socios: 44000
        },
        {
            nome: 'Sport',
            logo: 'sport.svg',
            socios: 38000
        },
        {
            nome: 'São Paulo',
            logo: 'sao-paulo.svg',
            socios: 31000
        }
    ];

    const compare = (a, b) => {
        const teamA = a.socios;
        const teamB = b.socios;

        let comparison = 0;
        if (teamA >teamB) {
            comparison = 1;
        } else if (teamA < teamB) {
            comparison = -1;
        }
        return comparison * -1;
    };

    const atualizaRanking = (nome, numero) => {

        // Ranking Global
        for(let clube of clubes) {
            if (clube.nome.indexOf(nome) !== -1) {
                clube.socios = numero;
            }
        }

        // Ranking Brasil
        for(let clube of clubesBr) {
            if (clube.nome.indexOf(nome) !== -1) {
                clube.socios = numero;
            }
        }
    };

    const montaRankingMundo = () => {
        let html = '';
        const ranking = document.querySelector('.ranking-mundo dl');
        for (let clube of clubes) {
            html += `
            <dt>
                <img src="images/${clube.logo}" width="32" alt="${clube.nome}" class="club-logo">
                <span class="club">${clube.nome}</span>
            </dt>
            <dd>${clube.socios.format()}</dd>`;
        }
        ranking.innerHTML = html;
    };

    const montaRankingBrasil = () => {
        let html = '';
        const ranking = document.querySelector('.ranking-brasil dl');
        for (let clube of clubesBr) {
            html += `
            <dt>
                <img src="images/${clube.logo}" width="32" alt="${clube.nome}" class="club-logo">
                <span class="club">${clube.nome}</span>
            </dt>
            <dd>${clube.socios.format()}</dd>`;
        }
        ranking.innerHTML = html;
    };

    const contaSociosFlamengo = async () => {
        const api = await fetch('https://torcidometro.nrnoficial.com.br/v1/torcidometro?limit=1')
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                const total = result.data[0];
                const totalFla = total.total_socio_torcedor + total.total_socio_clube;
                atualizaRanking('Flamengo', totalFla);
            })
            .catch((error) => console.log(error));
    };

    

    const contaSociosVasco = async () => {
        const api = await fetch('https://api.sociogigante.com/v2/public/counter')
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                const totalVasco = result.res;
                // const totalVasco = parseInt( Math.random() * 100) * 10000;
                atualizaRanking('Vasco', totalVasco);
            })
            .catch((error) => console.log(error));
    };

    const init = async () => {

        // Pega socios atuais do Vasco
        await contaSociosVasco();

        // Pega socios atuais do Flamengo
        await contaSociosFlamengo();

        // Ordena o ranking mundial de acordo com o numero de sócios
        clubes.sort(compare);

        // Ordena o ranking Brasil de acordo com o numero de sócios
        clubesBr.sort(compare);

        // Monta Ranking Mundo atualizado
        montaRankingMundo();

        // Monta Ranking Brasil
        montaRankingBrasil();
    };

    Number.prototype.format = function() {
        return this.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "." );
    }

    return {
        init
    };

})();

RANKINGST.init();