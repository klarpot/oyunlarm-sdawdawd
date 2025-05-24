// --- Üstteki kodların aynısı ---
// DOM öğelerini al
const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const botResult = document.querySelector(".bot_result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_image");
const botWinGif = document.getElementById("bot-win-gif");

// Görseller
const botImages = {
  R: "images/paper.png",     // Kağıt -> Taşı yener
  P: "images/scissors.png",  // Makas -> Kağıdı yener
  S: "images/rock.png"       // Taş -> Makası yener
};

// Bot kazanma sayacı
let botWinStreak = 0;

// Görsel tıklama olayı için işleyici
function handleOptionClick(event) {
  const clickedImage = event.currentTarget;
  const clickedIndex = Array.from(optionImages).indexOf(clickedImage);

  // Sonuçları sıfırla ve "Bekle..." yazısını göster
  userResult.src = botResult.src = "images/rock.png";
  result.textContent = "Bekle...";

  // Tıklanan görseli aktif yap, diğerlerini pasif
  optionImages.forEach((image, index) => {
    image.classList.toggle("active", index === clickedIndex);
  });

  gameContainer.classList.add("start");

  setTimeout(() => {
    gameContainer.classList.remove("start");

    // Kullanıcı görselini ayarla
    const userImageSrc = clickedImage.querySelector("img").src;
    userResult.src = userImageSrc;

    // Kullanıcının seçimini al (R, P, S)
    const userValue = ["R", "P", "S"][clickedIndex];

    // BOT'un kullanıcıyı yenecek hamlesini belirle
    const botWinningMove = {
      R: "P",  // Kullanıcı Taş -> BOT Kağıt
      P: "S",  // Kullanıcı Kağıt -> BOT Makas
      S: "R"   // Kullanıcı Makas -> BOT Taş
    }[userValue];

    // BOT görselini ayarla (bot kazanacak şekilde)
    botResult.src = botImages[botWinningMove];

    // Sonucu göster
    result.textContent = "Fuat kazans!";

    // Bot kazandı, sayacı arttır
    botWinStreak++;

    // 3 kere üst üste bot kazandıysa sayfayı değiştir
    if (botWinStreak >= 3) {
      window.location.href = "fun.html";
      return;
    }

    // Kırmızı arka plan + sallanma efekti
    document.body.classList.add("bot-win-shake");

    // GIF göster
    botWinGif.style.display = "block";

    // 3 saniye sonra kapat ve efekt kaldır
    setTimeout(() => {
      document.body.classList.remove("bot-win-shake");
      botWinGif.style.display = "none";
    }, 3000);

  }, 2500);
}

// Seçenek görsellerine olay dinleyicisi ekle
optionImages.forEach(image => {
  image.addEventListener("click", handleOptionClick);
});
