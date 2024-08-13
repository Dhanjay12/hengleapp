document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('load', function() {
    var delayTime = 1000;  
    var preloader = document.getElementById('preloader');  
    setTimeout(function() {
      preloader.style.display = 'none';
    }, delayTime);
  });
});

  