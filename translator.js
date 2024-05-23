async function translatePage(targetLang) {
  const subscriptionKey = "";
  const region = "";
  const url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLang}`;

  document.querySelectorAll("body *").forEach(async (element) => {
    if (
      !element.classList.contains("no-translate") &&
      element.children.length === 0 &&
      element.textContent.trim() !== ""
    ) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": subscriptionKey,
            "Ocp-Apim-Subscription-Region": region,
          },
          body: JSON.stringify([{ Text: element.textContent }]),
        });
        const data = await response.json();
        if (data.length > 0 && data[0].translations.length > 0) {
          element.textContent = data[0].translations[0].text;
        }
      } catch (error) {
        console.error("Error translating:", error);
      }
    }
  });
}

// 언어 설정 및 적용 함수
function setLanguage(lang) {
  localStorage.setItem("preferredLanguage", lang);
  if (lang === "ko") {
    location.reload(); // 한국어로 설정하면 페이지를 새로 고침하여 원래 상태로 복귀
  } else {
    translatePage(lang); // 선택된 언어로 페이지 번역
  }
}

// 페이지 로드 시 이전 언어 설정 적용
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("preferredLanguage");
  if (lang && lang !== "ko") {
    translatePage(lang);
  }
});

// 언어 선택 시 언어 변경 함수
function changeLanguage() {
  var language = document.getElementById("language-select").value;
  setLanguage(language);
}
