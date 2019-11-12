window.onload = function() {
  
  /* ************************************************** Help window */
  
  var modal = document.getElementById("help-modal");
  var btn = document.getElementById("help-button");
  var span = document.getElementsByClassName("help-close")[0];
  
  btn.onclick = function() {
    modal.style.display = "block";
  };
  
  span.onclick = function() {
    modal.style.display = "none";
  };
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  
  /* ************************************************** Button to reset */
  
  var resetButton = document.getElementById("reset-button");
  
  resetButton.onclick = function() {
    dc.filterAll();
    dc.renderAll();
  };
};