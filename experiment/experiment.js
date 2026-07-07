const jsPsych = initJsPsych({

    on_finish: function(){


        /*
        zapis CSV
        */

        jsPsych.data
            .get()
            .filter({
                trial_type:
                "image-button-response"
            })
            .localSave(
                "csv",
                "experiment_results.csv"
            );


        document.body.innerHTML +=
        `
        <h2>
        Dziękujemy za udział!
        </h2>
        `;

    }

});



let participant_id = "";



let timeline = [];



/*
===================================
1. Id uczestnika
===================================
*/


let participant_form = {

    type:
    jsPsychSurveyText,


    questions:
    [
        {
            prompt:
            "Podaj identyfikator uczestnika:",

            name:
            "participant"
        }
    ],


    on_finish:
    function(data){

        participant_id =
        data.response.participant;


        jsPsych.data.addProperties(
        {
            participant:
            participant_id
        });

    }

};


timeline.push(
    participant_form
);





/*
===================================
2. Instrukcja
===================================
*/


let instructions = {


type:
jsPsychHtmlButtonResponse,


stimulus:

`
<h2>
Eksperyment rozpoznawania obrazów AI
</h2>


<p>
Za chwilę zobaczysz serię obrazów.
</p>


<p>
Dla każdego obrazu zdecyduj,
czy został wygenerowany przez AI,
czy pochodzi z rzeczywistego źródła.
</p>


<p>
Nie ma limitu czasu, choć czas jest mierzony: w czasie analizy zostanie porównany czas rozpoznawania obrazów AI od czasu rozpoznawania obrazów rzeczywistych.
</p>


<p>
Wybierz odpowiedź i przejdź dalej.
</p>

`,


choices:
[
    "Rozpocznij"
]

};


timeline.push(
    instructions
);





/*
===================================
3. Ładowanie manifestu
===================================
*/


fetch("manifest.json")

.then(response =>
    response.json()
)


.then(images => {



/*
===================================
4. Losowanie 50 AI + 50 REAL
===================================
*/


let ai =
images.filter(
    x => x.label === "AI"
);


let real =
images.filter(
    x => x.label === "REAL"
);



ai =
jsPsych.randomization.sampleWithoutReplacement(
    ai,
    50
);



real =
jsPsych.randomization.sampleWithoutReplacement(
    real,
    50
);



let selected =
ai.concat(real);



selected =
jsPsych.randomization.shuffle(
    selected
);




/*
===================================
5. Trial dla każdego obrazu
===================================
*/


selected.forEach((stimulus, index) => {


let trial = {


type:
jsPsychImageButtonResponse,


stimulus:
stimulus.file,


choices:
[
    "AI",
    "REAL"
],



prompt: `
<p><strong>Obraz ${index + 1} z ${selected.length}</strong></p>

<p>Pozostało: ${selected.length - index - 1} obrazów.</p>

<p>Czy ten obraz jest wygenerowany przez AI?</p>
`,



data:
{
    image:
    stimulus.file,

    ground_truth:
    stimulus.label
},



on_finish:
function(data){

    data.response_label =
        data.response === 0
        ? "AI"
        : "REAL";

}


};



timeline.push(
    trial
);



});



/*
start eksperymentu
*/

jsPsych.run(
timeline
);



});