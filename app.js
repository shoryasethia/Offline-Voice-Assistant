const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const identity = [
    'I am your personal Assistant',
    'My name is innovoice. I have no father and mother. I was Created in IIT Bombay by Shorya, Garvit, Anuj, Parshav and, ',
    ' My aim is to make your experience better',
];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
    console.log('InnoVoice is activated, you can use the Microphone.');
};

recognition.onresult = function (event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    readOutLoud(transcript);
};

btn.addEventListener('click', () => {
    recognition.start();
});

function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();

    if (message.includes('who are you')) {
        const finalText = identity[Math.floor(Math.random() * identity.length)];
        speech.text = finalText;
    } else if (message.includes('intro')) {
        const finalText = identity[Math.floor(Math.random() * identity.length)];
        speech.text = finalText;


    } else if (message.includes('fan speed')) {
        const fanSpeed = parseInt(message.match(/\d+/));
        if (!isNaN(fanSpeed) && fanSpeed >= 0 && fanSpeed <= 5) {
            speech.text = `Setting fan speed to ${fanSpeed}`;
            console.log(fanSpeed);

           const sliderValue = (fanSpeed * 30) + 105;
            sendSliderValue(sliderValue);
        } else {
            speech.text = 'Invalid fan speed. Please choose a speed between 1 and 6.';
            console.log("Invalid Command");
        }
    } else if (message.includes('light brightness')) {
        const brightnessValue = parseInt(message.match(/\d+/));
        if (!isNaN(brightnessValue) && brightnessValue >= 0 && brightnessValue <= 100) {
            speech.text = `Setting light brightness to ${brightnessValue} percent`;
            console.log(brightnessValue);

            const sliderValue = brightnessValue ;
            sendSliderValue(sliderValue);

        } else {
            speech.text = 'Invalid brightness value. Please choose a value between 0 and 100.';
            console.log("Invalid Command");
        }
    } else if (message.includes('temperature')) {
        const temperatureValue = parseInt(message.match(/\d+/));
        if (!isNaN(temperatureValue) && temperatureValue >= 16 && temperatureValue <= 30) {
            speech.text = `Setting AC temperature to ${temperatureValue} degrees Celsius`;
            console.log(temperatureValue);
        } else {
            speech.text = 'Invalid temperature value. Please choose a value between 16 and 30 degrees Celsius.';
            console.log("Invalid Command");
        }
    } else if (message.includes('today\'s date')) {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('en-US', options);
        speech.text = `Today's date is ${formattedDate}`;
        console.log(formattedDate);
    } else if (message.includes('time')) {
        const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        speech.text = `The current time is ${currentTime}`;
        console.log(currentTime);
    } else if (message.includes('day')) {
        const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        speech.text = `Today is ${currentDay}`;
        console.log(currentDay);
    } else {
        speech.text = message;
    }

    speech.volume = 20; // Range: 0 to 1
    speech.rate = 0.8; // Range: 0.1 to 10
    speech.pitch = 1; // Range: 0 to 2

    window.speechSynthesis.speak(speech);
}


function sendSliderValue(value) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://192.168.43.119/slider?value=" + value, true);
    xhr.send();
}
