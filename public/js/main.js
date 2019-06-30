function gotoAddPlace() {
  window.location.href = "/add-place.html";
}

function getPlaces() {
  window.location.href = "/get-places.html";
}

function goback() {
  window.location.href = "/";
}

function submitPlace() {
  var placeData = {
    pname: document.getElementById("placename").value,
    tags: document.getElementById("tags").value
  };

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/places", true);

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      document.getElementById("action-result").style.display = "block";
      document.getElementById("action-result").innerHTML = this.responseText;
      setTimeout(function() {
        document.getElementById("action-result").style.display = "none";
      }, 3000);
    }
  };
  xhr.send(JSON.stringify(placeData));
}
