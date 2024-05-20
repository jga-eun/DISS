document.addEventListener("DOMContentLoaded", function () {
  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription("KEY", "REGION");
  speechConfig.speechSynthesisLanguage = "ko-KR";
  const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
  const synthesizer = new SpeechSDK.SpeechSynthesizer(
    speechConfig,
    audioConfig
  );

  function textToSpeech(text) {
    synthesizer.speakTextAsync(
      text,
      (result) => {
        if (
          result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted
        ) {
          console.log("Speech synthesized to speaker for text [" + text + "]");
        } else {
          console.error("Speech synthesis canceled, " + result.errorDetails);
        }
      },
      (error) => console.error(error)
    );
  }

  document.getElementById("speakButton").addEventListener("click", function () {
    const text = document.getElementById("textToRead").innerText;
    textToSpeech(text);
  });
});
