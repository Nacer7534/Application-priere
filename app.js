// prmiere methode =============================================================================================/
//=============================================================================================================/

let cards = document.querySelector(".cards");
let myHorloge = document.querySelector("#infos");
let heureActuel =  document.querySelector("#heure");

mawakiteSalate();

function mawakiteSalate() {
  fetch(
    "http://api.aladhan.com/v1/timingsByCity?city=Paris&country=France&method=8"
  )
    .then((res) => res.json())
    .then((data) => {
      let nomPriere =  data.data.timings;
     
      let myDate = data.data.date.readable;

      // afficher l'heure //
      console.log(cards);
      console.log(heureActuel);
      console.log(myDate);

      console.log(nomPriere);

      // console.log(times);

      //console.log(time)   // récupéraion noms de prieres
      //console.log(times[time]);    // récupération des horaires de prieres

      cards.innerHTML = `
       

       <div class="cards">
        <div class="isha">
        <span>العشاء </span>
         <span>${nomPriere.Isha} </span>
        <span id="time-awaite">+5</span>
       </div>

      <div class="maghrib">
      <span>المغرب</span>
        <span>${nomPriere.Maghrib}</span>
        <span id="time-awaite">+5</span>
     </div>

     <div class="asr">
     <span>العصر</span>
       <span>${nomPriere.Asr} </span>
       <span id="time-awaite">+5</span>
     
    </div>

   <div class="dhuhr">
   <span>الظهر</span>
      <span>${nomPriere.Dhuhr}</span>
      <span id="time-awaite">+5</span>
      
  </div>

  <div class="fajr">
  <span>الفجر</span>
     <span>${nomPriere.Fajr}</span>
     <span id="time-awaite">+5</span>
     
  </div>

</div>

       `;

      myHorloge.innerHTML = `
      <div id="infos">
      <div id="chourouk">
      <span>الشروق</span>
        <span>${nomPriere.Sunrise} </span>
      </div>
      
      <div id="horloge">
        <span id="heure"> ${heureTime()} </span>
        <span id="date">${myDate} </span>
      </div>
      <div id="ghouroub">
        <span>الغروب</span>
        <span>${nomPriere.Sunset} </span>
      </div>
    </div> 
      
       `;

      const MINUTES = 60;
      const HOURS = 60 * MINUTES;
      const DAYS = 24 * HOURS;

      function refreshCountDown() {
        const countdown = document.querySelector("#countdown");
        const lunchDate = Date.parse(countdown.dataset.time) / 1000;
      
        const difference = lunchDate - Date.now() / 1000;
        // console.log(difference);
     
        const diff = {
          days: Math.floor(difference / DAYS),
          hours: Math.floor((difference % DAYS) / HOURS),
          min: Math.floor((difference % HOURS) / MINUTES),
          sec: Math.floor(difference % MINUTES),
        };

        // const diffPrieres = {
        //   fajr :  parseFloat(heureActuel) ,
        //   asr :    parseFloat(nomPriere.Asr),
        //   maghrib : parseFloat(nomPriere.Maghrib),
        //   isha : parseFloat(difference - nomPriere.isha),
        // };

        // console.log(diffPrieres.fajr);
        // console.log(diff);
        document.getElementById(
          "countdown"
        ).innerText = ` salate el Asr dans ${diff.hours} : ${diff.min} : ${diff.sec}`;
        // console.log("tic-toc");
        window.setTimeout(() => {
          window.requestAnimationFrame(refreshCountDown); // pour faire arreter cette fonction qu'on on est pas sur cette page
        }, 1000);
      }

      refreshCountDown();
      // updateTime ()
    });
}

//affichage heure //

function affichZero(heure) {
  // cette fonction prend en paramètre un nombre
  // si ce nombre est inférieur à 10, on affiche 0 + ce nombre
  // Ex: il est 07h00
  return heure < 10 ? "0" + heure : heure;
}

function heureTime() {
  let heure = new Date();
  // let heureActuel = `${heure.getHours()}:${heure.getMinutes()}:${heure.getSeconds()}`;
  document.getElementById("heure").innerHTML =
    affichZero(heure.getHours()) +
    " : " +
    affichZero(heure.getMinutes()) +
    " : " +
    affichZero(heure.getSeconds());
  // setTimeout(heureTime);
  window.setTimeout(() => {
    window.requestAnimationFrame(heureTime); // pour faire arreter cette fonction qu'on on est pas sur cette page
  });
}
