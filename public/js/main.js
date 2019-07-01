let currLat = null;
let currLong = null;
getlocation();

function gotoAddPlace() {
  window.location.href = "/add-place.html";
}

function gotoGetPlaces() {
  window.location.href = "/get-places.html";
}

function goback() {
  window.location.href = "/";
}

function isEmpty(str) {
  if (str == "" || str == null || str == undefined) {
    return true;
  }
  return false;
}

function submitPlace() {
  let placename = document.getElementById("placename").value;
  let placetags = document.getElementById("tags").value;

  if (!isEmpty(placename) && !isEmpty(placetags)) {
    var placeData = {
      pname: placename,
      tags: placetags,
      lat: currLat,
      lng: currLong
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
  } else {
    alert("Place name and tags cannot be empty");
  }
}

function clearForm() {
  document.getElementById("placename").value = "";
  document.getElementById("tags").value = "";
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
  // getlocation();
  let allPostsDiv = document.getElementsByClassName("posts")[0];

  if (allPosts.length == 0) {
    let postDiv = document.createElement("div");
    textNode = document.createTextNode("No places added");
    //postDiv.setAttribute("style", "post-card post-grid-row-height"); // postDiv.class , = "";
    postDiv.appendChild(textNode);
    allPostsDiv.appendChild(postDiv);
  }

  for (let i = 0; i < allPosts.length; i++) {
    var placedistance = distance(
      currLat,
      currLong,
      allPosts[i].lattitude,
      allPosts[i].longitude,
      "K"
    );
    console.log(
      allPosts[i].lattitude,
      allPosts[i].longitude,
      placedistance.toFixed(1)
    );
    let postDiv = document.createElement("div");
    postDiv.setAttribute("class", "post-card post-grid-row-height"); // postDiv.class , = "";

    allPostsDiv.appendChild(postDiv);

    let totalKeys = Object.keys(allPosts[i]);
    let totalCols = totalKeys.length;

    for (let j = 0; j < totalCols; j++) {
      if (j >= 1 && j <= 3) {
        continue;
      }
      let postColDiv = document.createElement("div");

      let textNode = null;
      if (j == 4) {
        postColDiv.setAttribute("class", "post-col ");
        textNode = document.createTextNode(placedistance.toFixed(1) + " km");
      } else {
        postColDiv.setAttribute("class", "post-col grow-2");
        textNode = document.createTextNode(allPosts[i][totalKeys[j]]);
      }
      postDiv.appendChild(postColDiv);
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
  }
}

// geolocation code

var geocoder;

function getlocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }
}
// Get the latitude and the longitude;
function successFunction(position) {
  currLat = position.coords.latitude;
  currLong = position.coords.longitude;
  console.log(currLat, currLong);

  // codeLatLng(lat, lng);
}

function errorFunction() {
  console.log("Geocoder failed");
}

function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}
