const { createApp } = Vue;

createApp({
    data() {
        return {
            cards: [],
            searchText: '',
            visibleCards: 50,
            increment: 20,
            cardsFetched: false // Nova propriedade para controlar quando as cartas foram buscadas
        };
    },
    computed: {
        filteredCards() {
            return this.cards.filter(card => 
                card.name.toLowerCase().includes(this.searchText.toLowerCase())
            ).slice(0, this.visibleCards); 
        }
    },
    methods: {
        fetchMoreCards() {
            this.visibleCards += this.increment;
        },
        fetchCards() {
            fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?language=pt')
                .then(response => response.json())
                .then(data => {
                    this.cards = data.data;
                    this.cardsFetched = true; // Atualiza a propriedade para indicar que as cartas foram buscadas
                })
                .catch(error => console.error('Error fetching cards:', error));
        },
        getTypeClass(type) {
            if (type.includes('Monster')) return 'monster';
            if (type.includes('Spell')) return 'spell';
            if (type.includes('Trap')) return 'trap';
            return '';
        }
    },
    mounted() {
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                this.fetchMoreCards();
            }
        });
    }
}).mount('#app');
