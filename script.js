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
  const greetingMessage = "Úm ba...la...ra..gì đây 😁 Chúc Emmm 8/3 lun xinh xắn, đáng iu & zuiii zẻ, chân cứng, đá mềm, đường xa ko mỏi...Mong Em sẽ lun là một cô bé Moew đầy năng lượng & cười nhiều hơn nhó...";
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
      setTimeout(typeGreeting, 60); // tốc độ gõ chữ (ms)
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
  
photoNextButton.addEventListener("click", function() {
  window.location.href = "another-page.html";

  });
});
