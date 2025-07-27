
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  mobileMenuBtn?.addEventListener('click', () => {
    const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !expanded);
    mobileMenu.classList.toggle('hidden');
    mobileMenuBtn.classList.toggle('active');
  });
// Mobile menu toggle logic
   document.addEventListener('DOMContentLoaded', function() {
     const mobileMenuBtn = document.getElementById('mobileMenuBtn');
     const mobileMenu = document.getElementById('mobileMenu');
     mobileMenuBtn.addEventListener('click', function() {
       mobileMenu.classList.toggle('hidden');
       // Update aria-expanded for accessibility
       const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
       mobileMenuBtn.setAttribute('aria-expanded', !expanded);
     });
   });


  // Login simulation and UI update
  const loginBtn = document.getElementById('loginBtn');
  const profileImg = document.getElementById('profileImg');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  const mobileProfileImg = document.getElementById('mobileProfileImg');

  function login() {
    // Simulate login success
    loginBtn.style.display = 'none';
    profileImg.style.display = 'inline-block';
    // For mobile menu
    mobileLoginBtn.style.display = 'none';
    mobileProfileImg.style.display = 'inline-block';
  }

  loginBtn.addEventListener('click', () => {
    window.location.href = '/login';
  });

  mobileLoginBtn.addEventListener('click', () => {
    window.location.href = '/login';
  });

  // Since redirection is by default, for demo environment below we can simulate a login after delay
  // Uncomment the below lines to simulate login success for demo without redirect
  /*
  setTimeout(() => {
    login();
  }, 1500);
  */

  // Talk to expert buttons click event demo
  // const talkExpertBtns = [document.getElementById('talkExpertBtn'), document.getElementById('mobileTalkBtn')];
  // talkExpertBtns.forEach(btn => {
  //   btn?.addEventListener('click', () => {
  //     alert('Connecting you to an expert...');
  //     // Here could be implementation for remote chat or call
  //   });
  // });

  // Help section chat buttons (show alerts simulating the feature)
  const videoChatBtn = document.getElementById('videoChatBtn');
  const textChatBtn = document.getElementById('textChatBtn');

  videoChatBtn.addEventListener('click', () => {
    alert('Starting live video chat...');
    // Implementation for video chat integration goes here
  });
  textChatBtn.addEventListener('click', () => {
    alert('Starting text chat...');
    // Implementation for text chat integration goes here
  });

  // Keyboard accessibility for profile image to open profile or logout
  profileImg.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
      alert('Open user profile or logout');
    }
  });
  mobileProfileImg.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
      alert('Open user profile or logout');
    }
  });

// home.js

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  mobileMenuBtn.addEventListener("click", function () {
    // Toggle hamburger animation
    mobileMenuBtn.classList.toggle("active");

    // Toggle menu visibility
    if (mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.remove("hidden");
      mobileMenuBtn.setAttribute("aria-expanded", "true");
    } else {
      mobileMenu.classList.add("hidden");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    }
  });
});



// home.js

// Redirect Sign In button (desktop)
document.getElementById("loginBtn").addEventListener("click", () => {
  window.location.href = "singin.html";
});

// Redirect Sign In button (mobile)
document.getElementById("mobileLoginBtn").addEventListener("click", () => {
  window.location.href = "singin.html";
});


// Elements
const chatBox = document.getElementById('chatBox');
const closeChatBtn = document.getElementById('closeChatBtn');
const sendChatBtn = document.getElementById('sendChatBtn');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

// Open/Close Chat
const talkExpertBtns = [document.getElementById('talkExpertBtn'), document.getElementById('mobileTalkBtn')];
talkExpertBtns.forEach(btn => {
  btn?.addEventListener('click', () => chatBox.classList.remove('hidden'));
});
closeChatBtn.addEventListener('click', () => chatBox.classList.add('hidden'));

// Predefined Response Logic
function getFixedResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes('buy policy')) {
    return "To buy a policy, go to the 'Buy Policy' section, select your plan, and complete the payment process.";
  } else if (msg.includes('claim policy')) {
    return "To claim a policy, go to the 'Claim Policy' page and fill out the claim form with your policy number and details.";
  } else if (msg.includes('policy status')) {
    return "You can view your policy status under the 'Dashboard' after signing in.";
  } else if (msg.includes('contact') || msg.includes('support')) {
    return "You can reach our support team 24/7 via the 'Live Chat' or by emailing support@policyapp.com.";
  } else if (msg.includes('guideline')) {
    return "You can read all insurance guidelines under the 'Guideline' section on the homepage.";
  } else if (msg.includes('profile') || msg.includes('update details')) {
    return "To update your profile, go to the 'Profile' section after login and click 'Edit Details'.";
  } else {
    return "Thank you for your message. Our expert will reply shortly or visit the FAQ page for quick help.";
  }
}

// Send Message
sendChatBtn.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message !== '') {
    // Show user message
    const userMsg = document.createElement('p');
    userMsg.className = 'text-right text-blue-700';
    userMsg.textContent = `You: ${message}`;
    chatMessages.appendChild(userMsg);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Typing effect
    const loadingMsg = document.createElement('p');
    loadingMsg.className = 'text-left text-gray-600 italic';
    loadingMsg.textContent = `Expert is typing...`;
    chatMessages.appendChild(loadingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate delay and reply
    setTimeout(() => {
      loadingMsg.remove();
      const replyText = getFixedResponse(message);
      const reply = document.createElement('p');
      reply.className = 'text-left text-gray-600';
      reply.textContent = `Expert: ${replyText}`;
      chatMessages.appendChild(reply);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
  }
});

