//get speech api
var  synth = speechSynthesis;

//dom
var txtfrm = document.querySelector("form");
 var txtinput= document.getElementById("text-input");
var voiceSelect = document.querySelector("#voice-select")
 var rate = document.querySelector('#rate');
 var ratevalue = document.querySelector('#rate-value');
 var pitch = document.querySelector('#pitch');
 var pitchvalue = document.querySelector('#pitch-value');



// Init voices array
var voices = [];

function getVoices () {
  voices = synth.getVoices();

  // Loop through voices and create an option for each one
  voices.forEach(voice => {
    // Create option element
    var option = document.createElement('option');
    // Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};



 getVoices();
 if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}


// Speak
function speak  ()  {
  // Check if speaking
  if (synth.speaking) {
    console.error('Already speaking...');
    return;
  }
  

    // Get speak text
    const speakText = new SpeechSynthesisUtterance(txtinput.value);

    // Speak end
    speakText.onend = e => {
      console.log('Done speaking...');
      body.style.background = '#141414';
    };

    // Speak error
    speakText.onerror = e => {
      console.error('Something went wrong');
    };

    // Selected voice
 var  selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    );

    // Loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);
  }
// };

// EVENT LISTENERS

// Text form submit
txtfrm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  txtInput.blur();
});

// Rate value change
rate.addEventListener('change', e => (ratevalue.textContent = rate.value));

// Pitch value change
pitch.addEventListener('change', e => (pitchvalue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener('change', e => speak());
