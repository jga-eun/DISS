// 번역 함수
async function translatePage(targetLang) {
  const apiKey = "";
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  document.querySelectorAll("body *").forEach(async (element) => {
    if (
      !element.classList.contains("no-translate") &&
      element.children.length === 0 &&
      element.textContent.trim() !== ""
    ) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q: element.textContent, target: targetLang }),
        });
        const data = await response.json();
        if (data.data && data.data.translations.length > 0) {
          element.textContent = data.data.translations[0].translatedText;
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
