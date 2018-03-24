//////////////// Text to Speech Converter
let speech = new p5.Speech();
speech.onLoad = voiceReady;
// speech.setVolume(4); // 0 - 1
// speech.setRate(1); // 2X faster 1-default
// speech.setPitch(1);  // 1-default
// speech.started(callbackfunction);
// speech.ended(callbackfunction);

function voiceReady(){
    let voices = speech.voices;
    let voice = voices.filter(i => i.name == 'Microsoft British English (Susan)');
    // Microsoft British English (Susan)
    // 'Google UK English Female'
    speech.setVoice(voice[0].name);
    console.log(speech.voices);
    speech.speak('You have 32 days of entitlement left this year.');
}

///////////  Speech Recognizer
let r = document.getElementById('result');

function startConverting(){
    if('webkitSpeechRecognition' in window) {
        let speechRecognizer = new webkitSpeechRecognition();
        speechRecognizer.continuous = true; // false-default
        speechRecognizer.interimResults = true; // make it false so when he stops speaking then its the end
        speechRecognizer.lang = 'en-IN';
        speechRecognizer.start();
    
        let finalTranscripts = '';
        speechRecognizer.onresult = function(event) {
            let interimTranscripts = '';
            for(let i = event.resultIndex; i < event.results.length; i++) {
                let transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<br>")
                if(event.results[i].isFinal){
                    finalTranscripts += transcript;
                } else {
                    interimTranscripts += transcript;
                }
            }
            r.innerHTML = finalTranscripts + '<span style="color:#999">' + interimTranscripts + '</span>'; 
        };
    
        speechRecognizer.onerror = function(event) {
    
        };
    } else {
        console.log('Speech Recognizer is not supported in your browser.');
    }    
}


