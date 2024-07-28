let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    document.querySelector('.carousel-inner').style.transform = `translateX(${-index * 100}%)`;
    currentIndex = index;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Auto slide every 3 seconds
setInterval(() => nextSlide(), 3000);


document.getElementById("disease-link").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("popup").style.display = "block";
});

document.getElementById("close-btn").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target === document.getElementById("popup")) {
        document.getElementById("popup").style.display = "none";
    }
});










document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const userInput = document.getElementById('user-input').value.trim();
  if (userInput === '') return;

  displayMessage(userInput, 'user-message');
  document.getElementById('user-input').value = '';

  getBotResponse(userInput);
}

function displayMessage(message, className) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.className = `message ${className}`;
  document.getElementById('chat-log').appendChild(messageElement);
  messageElement.scrollIntoView();
}

function getBotResponse(userInput) {
  let botResponse;

  // Simple chatbot logic with emojis
  if (userInput.toLowerCase().includes('hello')) {
    botResponse = '👋 Hi there!';
  } else if (userInput.toLowerCase().includes('how are you')) {
    botResponse = '😊 I am just a bot, but I am doing fine!';
  } 
  else if (userInput.toLowerCase().includes('what is smart farming')) {
    botResponse = ' Smart farming uses technologies like IoT, AI, and drones to improve agricultural productivity and sustainability. It involves precision techniques for optimizing crop yields and resource management. This approach reduces costs and environmental impact while boosting farm efficiency.';
  }
  
  else if (userInput.toLowerCase().includes('What are the benefits of using IoT in smart farming?')) {
    botResponse = '😏IoT provides real-time monitoring of soil, crops, and weather, improving decision-making and resource efficiency. Automated systems optimize irrigation and fertilization, increasing yields and sustainability. This reduces costs and environmental impact.';
  }


  else if (userInput.toLowerCase().includes('How AI helps in predicting crop yields and preventing diseases')) {
    botResponse = '😊 AI analyzes data to predict crop yields and detect diseases early. It uses image recognition and pattern analysis for timely interventions. This improves crop health and boosts productivity.';
  }








  else {
    botResponse = '🤖 Sorry, I do not understand that.';
  }

  setTimeout(() => {
    displayMessage(botResponse, 'bot-message');
  }, 1000);
}

function toggleChat() {
  const chatbot = document.getElementById('chatbot');
  if (chatbot.style.display === 'none' || chatbot.style.display === '') {
    chatbot.style.display = 'flex';
  } else {
    chatbot.style.display = 'none';
  }
}