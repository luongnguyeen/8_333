document.addEventListener("DOMContentLoaded", function() {
  // Lấy các phần tử cần thiết
  const startScreen = document.getElementById("start-screen");
  const greetingScreen = document.getElementById("greeting-screen");
  const photoScreen = document.getElementById("photo-screen");
  const finalScreen = document.getElementById("final-screen");
  
  const heartContainer = document.getElementById("heart-container");
  const startText = document.getElementById("start-text");
  
  const greetingTextElem = document.getElementById("greeting-text");
  const bouquet = document.getElementById("bouquet");
  const greetingNextButton = document.getElementById("greeting-next-button");
  
  const photoBox = document.getElementById("photo-box");
  const photoNextButton = document.getElementById("photo-next-button");
  const cube = document.querySelector(".cube");
  
  // Lời chúc được hiển thị theo kiểu gõ chữ có cursor nhấp nháy
  const greetingMessage = "Chúc em ngày 8/3 thật vui vẻ, tràn đầy yêu thương và hạnh phúc. Hy vọng ngày hôm nay sẽ là một ngày đặc biệt với những nụ cười và niềm vui.";
  let index = 0;
  
  // Ẩn các phần ban đầu
  greetingScreen.style.display = "none";
  photoScreen.style.display = "none";
  finalScreen.style.display = "none";
  
  // Hàm gõ chữ với cursor nhấp nháy
  function typeGreeting() {
    if (index <= greetingMessage.length) {
      greetingTextElem.innerHTML = greetingMessage.substring(0, index) + '<span class="cursor">_</span>';
      index++;
      setTimeout(typeGreeting, 50); // tốc độ gõ chữ (ms)
    } else {
      // Khi gõ xong, xóa cursor và hiển thị bó hoa, sau đó hiển thị nút "Tiếp tục"
      greetingTextElem.innerHTML = greetingMessage;
      bouquet.style.display = "block";
      greetingNextButton.style.display = "block";
    }
  }
  
  // Hàm chuyển từ Start Screen sang Greeting Screen
  function goToGreetingScreen() {
    startScreen.style.display = "none";
    greetingScreen.style.display = "flex";
    typeGreeting();
  }
  
  heartContainer.addEventListener("click", goToGreetingScreen);
  startText.addEventListener("click", goToGreetingScreen);
  
  // Khi nhấn nút "Tiếp tục" ở màn hình lời chúc, chuyển sang màn hình box ảnh
  greetingNextButton.addEventListener("click", function() {
    greetingScreen.style.display = "none";
    photoScreen.style.display = "flex";
  });
  
  // Xử lý sự kiện click vào ảnh trong photo box: tạo overlay chứa ảnh phóng to
  const photos = document.querySelectorAll(".photo-item");
  let enlargedOverlay = null;
  
  photos.forEach(photo => {
    photo.addEventListener("click", function(event) {
      event.stopPropagation();
      if (enlargedOverlay) return;
      enlargedOverlay = document.createElement("div");
      enlargedOverlay.classList.add("enlarged-overlay");
      const enlargedImg = document.createElement("img");
      enlargedImg.src = this.src;
      enlargedOverlay.appendChild(enlargedImg);
      document.body.appendChild(enlargedOverlay);
      cube.style.animationPlayState = "paused";
    });
  });
  
  // Khi click vào bất kỳ nơi nào ngoài overlay, ẩn overlay và khôi phục animation quay của cube
  document.addEventListener("click", function() {
    if (enlargedOverlay) {
      document.body.removeChild(enlargedOverlay);
      enlargedOverlay = null;
      cube.style.animationPlayState = "running";
    }
  });
  
  // Khi nhấn nút "Tiếp tục" ở màn hình photo box, chuyển sang Final Screen
  photoNextButton.addEventListener("click", function() {
    photoScreen.style.display = "none";
    finalScreen.style.display = "flex";
  });
});
