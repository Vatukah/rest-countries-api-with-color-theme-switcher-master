let dropDown = document.getElementById("dropDown");
let inputSec = document.getElementById("inputSec");
let dropDownOption = document.getElementById("opts");
let options = document.querySelectorAll(".option");
let home = document.getElementById("home");
let details = document.getElementById("detailPage");
let search = document.getElementById("search");
let country = document.getElementById("name");
let countryInfo = document.getElementById("countryInfo");
let borderCountry = document.getElementById("BorderCountry");
let countryImage = document.getElementById("detail_Img");
let backBtn = document.getElementById("backBtn");
let modeSelector=document.getElementById("modeSelector");
let Body=document.getElementById("Body");
let header=document.getElementById("header");
//let countryContainer=document.querySelectorAll(".country");
//creating object of details of country for just readibilty
let countryDetail = {
  country,
  countryInfo,
  borderCountry,
  countryImage,
};
let myArr = [];
let arrContainer = myArr;
var click = 0;
dropDown.addEventListener("click", (e) => {
  if (click == 0) {
    dropDownOption.style.display = "block";
    click = 1;
  } else {
    dropDownOption.style.display = "none";
    click = 0;
  }
  let dropDownWidth = window
    .getComputedStyle(dropDown)
    .getPropertyValue("width");
  dropDownOption.style.width = parseFloat(dropDownWidth) + "px";
});
//function to select option
options.forEach((element) => {
  element.addEventListener("click", () => {
    dropDown.innerText = element.innerHTML;
    dropDownOption.style.display = "none";
    details.style.display = "none";
    home.style.display = "grid";
    click = 0;
  });
});

//fecthing json file
fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((Data) => {
    //pushing into an array for further process
    for (const key in Data) {
      myArr.push(Data[key]);
    }
    displayer(myArr);
    eventOnDiv();
  });

function displayer(arr) {
  for (i = 0; i < arr.length; i++) {
    //creating div element to contain each country
    let counrtyContainer = document.createElement("div");
    counrtyContainer.classList = "country";

    //element to contain each country's flag
    let flag = document.createElement("img");
    flag.src = arr[i].flags.png;

    //element to contain country name
    let countryName = document.createElement("p");
    countryName.classList = "countryName";
    countryName.innerText = arr[i].name;

    //element to contain population of a country
    let population = document.createElement("p");
    population.classList = "countryDetails";
    population.innerText = "Population:";

    //created element to contain the population value
    let populationVal = document.createElement("span");
    populationVal.innerText = arr[i].population;
    population.append(populationVal);

    //element to contain region of a country
    let region = document.createElement("p");
    region.innerText = "Region:";
    region.classList = "countryDetails";
    let regionVal = document.createElement("span");
    regionVal.innerText = arr[i].region;
    region.append(regionVal);

    //element to contain capital of a country
    let capital = document.createElement("p");
    capital.classList = "countryDetails";
    capital.innerText = "Capital:";
    let capitalVal = document.createElement("span");
    capitalVal.innerText = arr[i].capital;
    capital.append(capitalVal);

    //adding above created element in country's container
    counrtyContainer.append(flag);
    counrtyContainer.append(countryName);
    counrtyContainer.append(population);
    counrtyContainer.append(region);
    counrtyContainer.append(capital);

    //counrtyContainer.innerText=arr[i].name;
    home.appendChild(counrtyContainer);

    //console.log(arr[i])
  }
}
// function for filteration by region
function filterByRegion(regions) {
  //removing previous country's container
  while (home.firstChild) {
    home.removeChild(home.lastChild);
  }
  //creating array of filtered country
  var filteredArr = myArr.filter((element) => {
    if (element.region == regions) {
      return element;
    }
  });
  arrContainer = filteredArr;
  //displaying filtered countries
  displayer(filteredArr);
}

//clicking event on filter options
options.forEach((element) => {
  element.addEventListener("click", () => {
    search.value="";
    if (element.innerHTML == "All") {
      //removing element of previous viewed
      while (home.firstChild) {
        home.removeChild(home.lastChild);
      }
      displayer(myArr);
      eventOnDiv();
      arrContainer = myArr;
    } else {
      filterByRegion(element.innerHTML);
      eventOnDiv();
    }
  });
});

//search functionality
search.addEventListener("input", () => {
  while (home.firstChild) {
    home.removeChild(home.lastChild);
  }
  var filtered = arrContainer.filter((element) => {
    var name = element.name;
    name = name.toLowerCase();
    if (name.includes(search.value)) {
      return element;
    }
  });
  displayer(filtered);
  eventOnDiv();
});

//detail functionality
myArr.forEach((element) => {
  element.addEventListener("click", () => {
    alert("clicked" + element.children[0].innerHTML);
  });
});

function eventOnDiv() {
  let country = document.querySelectorAll(".country");
  if (country != null) {
    country.forEach((element) => {
      element.addEventListener("click", () => {
        detailPage(element);
      });
    });
  }
}

function detailPage(content) {
  let myCountry = myArr.filter((element) => {
    if (element.name == content.children[1].innerHTML) {
      return element;
    }
  });
  home.style.display = "none";
  details.style.display = "block";
  inputSec.style.display = "none";
  countryDetail.countryImage.src = content.children[0].src;
  countryDetail.country.innerHTML = content.children[1].innerHTML;
  //providing information to country attributes
  countryDetail.countryInfo.children[0].children[0].innerHTML =
    myCountry[0].nativeName;
  countryDetail.countryInfo.children[1].children[0].innerHTML =
    myCountry[0].topLevelDomain[0];
  countryDetail.countryInfo.children[2].children[0].innerHTML =
    myCountry[0].population;
  countryDetail.countryInfo.children[3].children[0].innerHTML =
    myCountry[0].currencies[0].name;
  countryDetail.countryInfo.children[4].children[0].innerHTML =
    myCountry[0].region;
  countryDetail.countryInfo.children[5].children[0].innerHTML =
    myCountry[0].languages[0].name;
  countryDetail.countryInfo.children[6].children[0].innerHTML =
    myCountry[0].subregion;
  countryDetail.countryInfo.children[7].children[0].innerHTML =
    myCountry[0].capital;

  //removing borderCountries of previous viewed Country
  while (countryDetail.borderCountry.firstChild) {
    countryDetail.borderCountry.removeChild(
      countryDetail.borderCountry.lastChild
    );
  }
  var Bcountry = new Array(); //array to store borderCountry's name
  //fetching country name with aplhaCode3
  for (i = 0; i < myCountry[0].borders.length; i++) {
    myArr.forEach((element) => {
      if (element.alpha3Code == myCountry[0].borders[i]) {
        Bcountry.push(element.name);
      }
    });
  }
  //appending borderCountries
  for (j = 0; j < Bcountry.length; j++) {
    var para = document.createElement("p");
    para.innerHTML = Bcountry[j];
    countryDetail.borderCountry.appendChild(para);
  }
}

//back button functionality
backBtn.addEventListener("click", () => {
  home.style.display = "grid";
  details.style.display = "none";
  inputSec.style.display = "flex";
});

//Mode switcher functionality
var mode="light";

modeSelector.addEventListener("click",()=>{
  if(mode=="light"){
    header.style.backgroundColor="hsl(209, 23%, 22%)";
    header.style.boxShadow="0px 2px 4px 1px rgba(0,0,0,0.233)";
    header.style.color="white";
    search.style.backgroundColor="hsl(209, 23%, 22%)";
    search.style.color="white";
    search.style.boxShadow="0px 0px 4px 1px rgba(0,0,0,0.233)"
    dropDown.style.backgroundColor="hsl(207, 26%, 17%)";
    dropDownOption.style.backgroundColor="hsl(207, 26%, 17%)";
    dropDown.style.color="white";
    dropDownOption.style.color="white";
    Body.style.backgroundColor=" hsl(207, 26%, 17%)";
  /*  for(i=0;i<home.childElementCount;i++){
      home.children[i].style.backgroundColor="hsl(209, 23%, 22%)";
    }*/
    mode="dark";
  }else{
    header.style.backgroundColor="hsl(0, 0%, 98%)";
    header.style.color="black";
    header.style.boxShadow="0px 2px 4px 1px rgba(128, 128, 128, 0.233)";
    search.style.backgroundColor="hsl(0, 0%, 98%)";
    search.style.boxShadow="0px 0px 4px 1px rgba(128, 128, 128, 0.233)";
    dropDown.style.backgroundColor="hsl(0, 0%, 98%)";
    dropDownOption.style.backgroundColor="hsl(0, 0%, 98%)";
    dropDown.style.color="black";
    dropDownOption.style.color="black";
    Body.style.backgroundColor="  hsl(0, 0%, 98%)";
    mode="light";
  }
})

