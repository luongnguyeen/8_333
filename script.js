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
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalClose = document.getElementById("modal-close");
  
  // Lời chúc sẽ được hiển thị theo kiểu gõ chữ
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
      // Sau khi gõ chữ xong, hiển thị box ảnh 3D
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
  
  // Xử lý sự kiện click vào ảnh trong box ảnh (hiển thị modal)
  const photos = document.querySelectorAll(".photo-item");
  photos.forEach(photo => {
    photo.addEventListener("click", function() {
      modal.style.display = "flex";
      modalImg.src = this.src;
    });
  });
  
  // Đóng modal khi click vào nút close
  modalClose.addEventListener("click", function() {
    modal.style.display = "none";
  });
  
  // Chuyển sang Final Screen khi nhấn nút "Tiếp tục"
  nextButton.addEventListener("click", function() {
    greetingScreen.style.display = "none";
    finalScreen.style.display = "flex";
  });
});
