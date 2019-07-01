function gotoAddPlace() {
  window.location.href = "/add-place.html";
}

function gotoGetPlaces() {
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

function getAllPlaces() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/places", true);

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE) {
      if (this.responseText && loadPlaces(JSON.parse(this.responseText)));
    }
  };
  xhr.send();
}

function loadPlaces(allPosts) {
  let allPostsDiv = document.getElementsByClassName("posts")[0];

  for (let i = 0; i < allPosts.length; i++) {
    let postDiv = document.createElement("div");
    postDiv.setAttribute("class", "post-card post-grid-row-height"); // postDiv.class = "";

    allPostsDiv.appendChild(postDiv);

    let totalKeys = Object.keys(allPosts[i]);
    let totalCols = totalKeys.length;

    for (let j = 0; j < totalCols; j++) {
      if (j == 1 || j == 2) {
        continue;
      }
      let postColDiv = document.createElement("div");
      postColDiv.setAttribute("class", "post-col ");
      postDiv.appendChild(postColDiv);

      let textNode = document.createTextNode(allPosts[i][totalKeys[j]]);
      postColDiv.appendChild(textNode);
    }

    let postColDiv = document.createElement("div");
    postColDiv.setAttribute("class", "post-col");
    // postDiv.appendChild(postColDiv);

    let postBtnColDiv = document.createElement("button");
    postBtnColDiv.innerHTML = "Add to fvrt";
    postBtnColDiv.addEventListener("click", function() {
      //addToFvrt(i, updateFvrts);
    });
    //postColDiv.appendChild(postBtnColDiv);
    // add to fvr button at the last column
  }
}

// geolocation code

var geocoder;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}
// Get the latitude and the longitude;
function successFunction(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  codeLatLng(lat, lng);
}

function errorFunction() {
  alert("Geocoder failed");
}

function initialize() {
  geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({ latLng: latlng }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        var arrAddress = results;
        console.log(results);
        $.each(arrAddress, function(i, address_component) {
          if (address_component.types[0] == "locality") {
            console.log(
              "City: " + address_component.address_components[0].long_name
            );
            itemLocality = address_component.address_components[0].long_name;
          }
        });
      } else {
        alert("No results found");
      }
    } else {
      alert("Geocoder failed due to: " + status);
    }
  });
}
