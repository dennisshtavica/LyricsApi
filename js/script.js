const mySearch = document.getElementById("mysearch");
const dropDown = document.querySelector(".dropdown");
const form = document.getElementById("form");

const apiURL = "https://api.lyrics.ovh";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchValue = mySearch.value.trim();

  if (!searchValue) {
    alert("There is nothing to search");
  } else {
    searchSong(searchValue);
  }
});

async function searchSong(searchValue) {
  const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
  const data = await searchResult.json();

  // console.log(finaldata)
  showData(data);
}

// async function getData(apiKey, artist, track) {
//   return fetch(
//     "http://ws.audioscrobbler.com/2.0/?method=track.getInfo" +
//       "&artist=" +
//       artist +
//       "&track=" +
//       track +
//       "&api_key=" +
//       apiKey +
//       "&format=json"
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       return data;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

//display final result in DO
function showData(data) {
  dropDown.innerHTML = `
   
    <ul class="song-list">
      ${data.data
        .map(
          (song) => `<li>
                    <div>
                        <strong>${song.artist.name}</strong> - ${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</span>
                </li>`
        )
        .join("")}
    </ul>
  `;
  // document.getElementById('video').innerHTML = ''
}

//event listener in get lyrics button
dropDown.addEventListener("click", (e) => {
  const clickedElement = e.target;

  //checking clicked elemet is button or not
  if (clickedElement.tagName === "SPAN") {
    const artist = clickedElement.getAttribute("data-artist");
    const songTitle = clickedElement.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});

// Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);

  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  dropDown.innerHTML = ` 
      <div class="lyrics-page">
      <h2>${artist}</h2>
      <h4>${songTitle}</h4>
      <div class="lyricsParagraph">
        <p class="subtitle">${songTitle} Lyrics</p>
        <p class="">${lyrics}</p>
      </div>
      </div>
`;
}

let charts = {
  apiKey: "a55faac1ff74e8a2dc620241519f4b5e",

  fetchCharts: function (chart) {
    fetch(
      "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key= " +this.apiKey+ "&format=json"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        let chartRow = document.getElementById("chartRow");

        for (let i = 0; i < 4; i++) {
          let decimal = data.tracks.track[i].listeners;
          let decimalPoint = parseFloat(decimal)
            .toFixed(0)
            .substring(5)
            .padEnd(2, "M");

          let rowChart = `

      <div class="chart container"> 
        <div class="row_chart_number">
            <p>${i + 1}</p>
        </div>
        <div class="row_chart_image">
          <img src="${data.tracks.track[i].image[3]["#text"]}" alt="">
        </div>
         <div class="row_chart_title">
          <h3>${data.tracks.track[i].name}</h3>
          <p>${data.tracks.track[i].artist.name}</p>
        </div>
         <div class="row_chart_views">
           <img src="./img/eye.png" alt="">
             <listeners>${decimalPoint}</listeners>
        </div>
        </div>
        `;
          chartRow.innerHTML += rowChart;
        }
      });
  },
};


charts.fetchCharts();

let artist = {
  apiKey: "a55faac1ff74e8a2dc620241519f4b5e",

  fetchArtists: function (topArtist) {
    fetch(
      "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" +
        this.apiKey +
        "&format=json"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        let artistRow = document.getElementById("artistRow");

        for (let i = 0; i < 4; i++) {
          let rowArtist = `
        <div class="chart container"> 
        <div class="row_chart_number">
            <p>${i + 1}</p>
        </div>
        <div class="row_chart_image">
           <img src="${data.artists.artist[i].image[3]["#text"]}" alt="">
        </div>
         <div class="row_chart_title">
          <h3>${data.artists.artist[i].name}</h3>
        </div>
        </div>
        `;
          artistRow.innerHTML += rowArtist;
        }
      });
  },
};

artist.fetchArtists();

// --------------------------------------------------

let icon = document.querySelector(".icon");
let search = document.querySelector(".search");
// let navLogo = document.querySelector('.nav__logo');

icon.addEventListener("click", function () {
  search.classList.toggle("active");
  // navLogo.style.display = 'none';
});

// document.addEventListener("DOMContentLoaded", function () {
LottieInteractivity.create({
  mode: "scroll",
  player: "#firstLottie",
  actions: [
    {
      visibility: [0, 1],
      type: "seek",
      frames: [0, 90],
    },
  ],
});
// });
