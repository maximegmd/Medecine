Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

var data = {
    Pharmaco : {
        data: [
            {cible: "Paroi bactérienne", classe: "Beta-lactames", microcible:"Transpeptidase"},
            {cible: "Paroi bactérienne", classe: "Glycopeptides", microcible:"Transpeptidase et transglycolases"},
            {cible: "Paroi bactérienne", classe: "Peptide cyclique", microcible:"Lipides membranes gram positifs"},
            {cible: "Synthèse protéique", classe: "Aminoglycosides", microcible:"Ribosomes"},
            {cible: "Synthèse protéique", classe: "Tétracyclines", microcible:"Ribosomes"},
            {cible: "Synthèse protéique", classe: "Macrolides", microcible:"Ribosomes"},
            {cible: "Synthèse protéique", classe: "Lincosamides", microcible:"Ribosomes"},
            {cible: "Synthèse protéique", classe: "Oxazolidinones", microcible:"Ribosomes"},
            {cible: "Synthèse protéique", classe: "Mupirocine", microcible:"tRNA synthetase"},
            {cible: "Acides nucléiques", classe: "Fluoroquinolones", microcible:"DNA gyrase et topoisomérase IV"},
            {cible: "Anti métabolites", classe: "Sulfamethazole + trimethoprim = cotrimazol", microcible:"Inhibition synthèse acide folique"},
            {cible: "Membrane céllulaire", classe: "Polypeptides cycliques", microcible:"Membrane lipidique"},
        ],
        generate: function() 
        {
            var correct = this.data.sample();

            var question = "Les molécules de la classe " + correct.classe + " ont pour cible :";
            var answer = "Les molécules de la classe " + correct.classe + " ont pour cible " + correct.cible;
            var answers = [];
            answers.push({ text: correct.cible, correct: true});

            while(answers.length < 5) {
                var sample = this.data.sample();
                if(answers.find(el => el.text == sample.cible) === undefined)
                    answers.push({ text: sample.cible, correct: false });
            }

            return { text: question, responses: shuffle(answers), correct: answer };           
        }
    },
    "Pathologie" : []
}

var quiz = [ ...Array(10).keys() ].map((i) => data.Pharmaco.generate());

var app = new Vue({ 
    el: '#app',
    data: {
        quiz: quiz,
        done: false,
        userResponses: Array(quiz.length).fill(-1)
    },
    methods: {
        next: function() {
          this.quiz = [ ...Array(10).keys() ].map((i) => data.Pharmaco.generate());
          this.done = false;
          this.userResponses = Array(this.quiz.length).fill(-1)
        },
        score: function() {
            this.done = true;
        }
      }
});