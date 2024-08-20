var input = document.querySelector(".input>input");
var url = "https://api.dictionaryapi.dev/api/v2/entries/en/"; //API URL
var resultDiv = document.querySelector(".result");
var word = document.querySelector(".word>h1");
var noun = document.querySelector("#noun");
var sample = document.querySelector("#sample");
var defination = document.querySelector(".defination>p");
var sentence = document.querySelector(".sentence>p");

function normalizeSpaces(newInput) {
    //to delete the space between words to fetch data from API
    return newInput.replace(/\s+/g, '');
} 

function submitData(){
    if(input.value === ""){
        alert("Pls Enter Word");
    }
    else{
        var newInput = input.value;
        var result = normalizeSpaces(newInput);
        console.log(result);
        fetch(`${url}${result}`)
        .then((response) =>{ if (!response.ok) {
            throw new Error('Result not found');
        };

         return response.json();
        })
        .then((data) => {
            console.log(data);

            word.textContent = '';
            defination.textContent = '';
            sentence.textContent = '';

            if (data && data[0]) {
                const wordData = data[0];
                const samplelala = wordData.phonetic;
                const meanings = wordData.meanings[0];

                // Display word
                word.textContent = wordData.word;

                // Display noun or other part of speech
                noun.textContent = meanings.partOfSpeech || 'N/A';

                sample.textContent = samplelala;

                // Display definition
                defination.textContent = meanings.definitions[0]?.definition || 'No definition found';

                // Display example sentence
                sentence.textContent = meanings.definitions[0]?.example || 'No example sentence found';

                // Show the result div
                resultDiv.style.display = "flex";
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(error.message);
            resultDiv.style.display = "none";
        });
    }
    
}