document.addEventListener("DOMContentLoaded", function() {
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
  
  // Ẩn box ảnh, nút next ban đầu
  photoBox.style.display = "none";
  nextButton.style.display = "none";
  
// Mảng chứa đường dẫn các ảnh trong photo box
  const imageUrls = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg"];

  // Hàm preload ảnh: tạo đối tượng Image cho từng ảnh và đợi load xong
  function preloadImages(urls) {
    return Promise.all(urls.map(url => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = reject;
      img.src = url;
    })));
  }
  
  // Hàm gõ chữ
function typeGreeting() {
  if (index <= greetingMessage.length) {
    // Hiển thị đoạn văn bản đã gõ cộng thêm dấu gạch dưới nhấp nháy
    greetingTextElem.innerHTML = greetingMessage.substring(0, index) + '<span class="cursor">_</span>';
    index++;
    setTimeout(typeGreeting, 50); // tốc độ gõ chữ (ms)
  } else {
    // Sau khi gõ xong, xóa cursor và hiển thị box ảnh & nút "Tiếp tục"
    greetingTextElem.innerHTML = greetingMessage;
   // Preload ảnh trước khi hiển thị box ảnh
      preloadImages(imageUrls)
        .then(() => {
          photoBox.style.display = "block";
          nextButton.style.display = "block";
        })
        .catch((err) => {
          console.error("Error preloading images", err);
          // Nếu có lỗi, vẫn hiển thị box ảnh (có thể thiếu ảnh)
          photoBox.style.display = "block";
          nextButton.style.display = "block";
        });
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
