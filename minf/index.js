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
            {cible: "la paroi bactérienne", classe: "Beta-lactames", microcible:"les transpeptidases"},
            {cible: "la paroi bactérienne", classe: "Glycopeptides", microcible:"les transpeptidase et transglycolases"},
            {cible: "la paroi bactérienne", classe: "Peptide cyclique", microcible:"les lipides membranaires des gram positifs"},
            {cible: "la synthèse protéique", classe: "Aminoglycosides", microcible:"les ribosomes"},
            {cible: "la synthèse protéique", classe: "Tétracyclines", microcible:"les ribosomes"},
            {cible: "la synthèse protéique", classe: "Macrolides", microcible:"les ribosomes"},
            {cible: "la synthèse protéique", classe: "Lincosamides", microcible:"les ribosomes"},
            {cible: "la synthèse protéique", classe: "Oxazolidinones", microcible:"les ribosomes"},
            {cible: "la synthèse protéique", classe: "Mupirocine", microcible:"la tRNA synthetase"},
            {cible: "les acides nucléiques", classe: "Fluoroquinolones", microcible:"la DNA gyrase et topoisomérase IV"},
            {cible: "les anti métabolites", classe: "Sulfamethazole + trimethoprim = cotrimazol", microcible:"l'inhibition synthèse acide folique"},
            {cible: "la membrane cellulaire", classe: "Polypeptides cycliques", microcible:"les membrane lipidiques"},
        ],
        generate: function() 
        {
            var correct = this.data.sample();

            var type = Math.floor(Math.random() * 2);
            switch(type)
            {
                case 0:
                {
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
                case 1:
                {
                    var question = "Laquelle de ces classes de molécules a pour cible " + correct.microcible;
                    var answer = "Les molécules de la classe " + correct.classe + " ont pour cible " + correct.microcible;
                    var answers = [];
                    answers.push({ text: correct.classe, correct: true});

                    while(answers.length < 5) {
                        var sample = this.data.sample();

                        if(sample.microcible == correct.microcible)
                            continue;

                        if(answers.find(el => el.text == sample.classe) === undefined)
                            answers.push({ text: sample.classe, correct: false });
                    }

                    return { text: question, responses: shuffle(answers), correct: answer };  
                }
                    
            }

                     
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