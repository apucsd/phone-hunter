const loadData = async (searchText) => {
  const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(URL);
  const data = await res.json();

  displayPhone(data.data);
};

const displayPhone = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";
  const showAllBtn = document.getElementById("show-all");
  const showMsg = document.getElementById("show-msg");
  if (phones.length > 10) {
    showAllBtn.classList.remove("d-none");
    showMsg.classList.add("d-none");
    phones.slice(0, 10).forEach((phone) => {
      const phoneDiv = document.createElement("div");
      phoneDiv.classList.add("col");
      phoneDiv.innerHTML = `
                    <div class="card shadow-lg h-100">
                        <img src="${phone.image}" class="card-img-top p-2 w-50 text-center mx-auto" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                                <button onclick="showDetails('${phone.slug}')" type="button" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#details-modal">Show Details</button>
                        </div>
                    </div>
        
        `;
      phoneContainer.appendChild(phoneDiv);
      toggleSpinner(false);
      // console.log(phone);
    });
  } else {
    showAllBtn.classList.add("d-none");
    showMsg.classList.remove("d-none");
    toggleSpinner(false);
  }
};
const showDetails =async (id) => {
    const URL = `https://openapi.programming-hero.com/api/phone/${id}`
const res = await fetch(URL);
const data = await res.json();
const info = data.data;
console.log(info)
 document.getElementById('details-modal-title').innerText = info.name;
 const modalBody = document.getElementById('modal-body');
 modalBody.innerHTML = `
 <img class="p-2 w-50 text-center mx-auto"  src="${info.image}" alt="">
 <p class = "my-1"> Brand: ${info.brand}</p>
 <p class = "my-1">Release Date: ${info.releaseDate}</p>
 <p class = "my-1">Main Features: ${info.mainFeatures.chipSet}</p>
 <p class = "my-1">Memory: ${info.mainFeatures.memory}</p>
    
 
    
 `;

  
};
const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("show-spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
// key enter event

document.querySelector("#search-input").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    toggleSpinner(true);

    const searchField = document.getElementById("search-input");
    const searchText = searchField.value;
    searchField.value = "";

    loadData(searchText);

    // code for enter
  }
});
const searchPhoneBtn = () => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-input");
  const searchText = searchField.value;
  searchField.value = "";
  loadData(searchText);
};

loadData('samsung');
