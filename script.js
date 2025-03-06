document.addEventListener("DOMContentLoaded", function() {
  // Lấy các phần tử cần thiết
  const startScreen = document.getElementById("start-screen");
  const greetingScreen = document.getElementById("greeting-screen");
  const finalScreen = document.getElementById("final-screen");
  const heartContainer = document.getElementById("heart-container");
  const startText = document.getElementById("start-text");
  const greetingTextElem = document.getElementById("greeting-text");
  const photoBox = document.getElementById("photo-box");
  const nextButton = document.getElementById("next-button");
  const cube = document.querySelector(".cube");
  
  // Lời chúc được hiển thị theo kiểu gõ chữ
  const greetingMessage = "Chúc em ngày 8/3 thật vui vẻ, tràn đầy yêu thương và hạnh phúc. Hy vọng ngày hôm nay sẽ là một ngày đặc biệt với những nụ cười và niềm vui.";
  let index = 0;
  
  // Ẩn box ảnh ban đầu
  photoBox.style.display = "none";
  
  // Hàm gõ chữ
  function typeGreeting() {
    if (index < greetingMessage.length) {
      greetingTextElem.innerHTML += greetingMessage.charAt(index);
      index++;
      setTimeout(typeGreeting, 50); // tốc độ gõ chữ (ms)
    } else {
      // Sau khi gõ xong, hiển thị box ảnh 3D
      photoBox.style.display = "block";
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
  
  // Xử lý sự kiện click vào ảnh: tạo overlay chứa ảnh phóng to
  const photos = document.querySelectorAll(".photo-item");
  let enlargedOverlay = null;
  
  photos.forEach(photo => {
    photo.addEventListener("click", function(event) {
      event.stopPropagation(); // ngăn click lan ra ngoài
      if (enlargedOverlay) return; // nếu đã có overlay thì không làm gì
      // Tạo overlay
      enlargedOverlay = document.createElement("div");
      enlargedOverlay.classList.add("enlarged-overlay");
      // Tạo phần tử ảnh với src giống ảnh được click
      const enlargedImg = document.createElement("img");
      enlargedImg.src = this.src;
      enlargedImg.style.maxWidth = "30vw"; // Giảm kích thước ảnh phóng to
      enlargedImg.style.maxHeight = "30vh";
      enlargedOverlay.appendChild(enlargedImg);
      document.body.appendChild(enlargedOverlay);
      // Dừng animation quay của cube
      cube.style.animationPlayState = "paused";
    });
  });
  
  // Khi click vào bất kỳ nơi nào ngoài overlay, thu nhỏ ảnh và khôi phục cube quay
  document.addEventListener("click", function() {
    if (enlargedOverlay) {
      document.body.removeChild(enlargedOverlay);
      enlargedOverlay = null;
      cube.style.animationPlayState = "running";
    }
  });
  
  // Chuyển sang Final Screen khi nhấn nút "Tiếp tục"
  nextButton.addEventListener("click", function() {
    greetingScreen.style.display = "none";
    finalScreen.style.display = "flex";
  });
});
