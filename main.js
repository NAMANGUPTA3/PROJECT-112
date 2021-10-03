prediction_1 = ""

Webcam.set({
    height: 300,
    width: 350,
    img_format: 'png',
    img_quality: 2160
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {

    Webcam.snap(function (data_uri) {
        document.getElementById("results").innerHTML = '<img id = "captured_image" src="' + data_uri + '">';

    });

}
console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/f1xCkjrVa/model.json", modelLoaded);

function modelLoaded() {
    console.log('ModelLoaded!');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_2 = " The prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check(){

img = document.getElementById('captured_image');
classifier.classify(img, gotResult);
}

function gotResult(error, results){

if (error) {
    console.error(error)
} else {
    console.log(results);
    document.getElementById("results_emotion_name").innerHTML = results[0].label;
    prediction_1 = results[0].label;  
    speak()
    if(results[0].label == "Good Sign")
    {
        document.getElementById("update_emoji").innerHTML = "&#128076;";
    }
    if(results[0].label == "Rocking Sign")
    {
        document.getElementById("update_emoji").innerHTML = "&#129304;";
    }
    if(results[0].label == "Thumbs UP")
    {
        document.getElementById("update_emoji").innerHTML = "&#128077;";
    }
}
}