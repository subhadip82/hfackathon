// Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenuBtn.addEventListener('click', () => {
    const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    mobileMenuBtn.setAttribute('aria-expanded', !expanded);
    mobileMenu.classList.toggle('hidden');
    mobileMenuBtn.classList.toggle('active');
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
  const talkExpertBtns = [document.getElementById('talkExpertBtn'), document.getElementById('mobileTalkBtn')];
  talkExpertBtns.forEach(btn => {
    btn?.addEventListener('click', () => {
      alert('Connecting you to an expert...');
      // Here could be implementation for remote chat or call
    });
  });

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
  window.location.href = "D:\\hackthon\\singinpage\\singin.html";
});
