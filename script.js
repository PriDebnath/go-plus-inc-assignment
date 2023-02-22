

let form = document.getElementById("form")
let full_name = document.getElementById("full_name")
let email = document.getElementById("email")
let date_of_birth = document.getElementById("date_of_birth")
let male = document.getElementById("male")
let female = document.getElementById("female")
let other = document.getElementById("other")
let hobby = document.getElementById("hobby")
let country = document.getElementById("country")
let state = document.getElementById("state")
let city = document.getElementById("city")
let submit = document.getElementById("submit")



let API_TOKEN = "xqZ_dOwmKWtVp0b_yUN5w8DJEqRoRwYSKmHMpfwxxVQ4HOKI7cr0w8X0DMmennqmXvw"

let AUTH_TOKEN = ""
let GET_COUNTRIES = "https://www.universal-tutorial.com/api/countries/"
let GET_STATES = "https://www.universal-tutorial.com/api/states/"
let GET_CITIES = "https://www.universal-tutorial.com/api/cities/"

let GENERATE_TOKEN = "https://www.universal-tutorial.com/api/getaccesstoken"




// Fetching country list at page load
fetch(GENERATE_TOKEN, {
  headers: {
    "Accept": "application/json",
    "api-token": API_TOKEN,
    "user-email": "pritam.debnath@grorapid.com"
  }
}).then(res => {
  return res.json();
}).then(data => {
  AUTH_TOKEN = data.auth_token
  fetch(GET_COUNTRIES, {
    headers: {
      "Authorization": "Bearer " + AUTH_TOKEN,
      "Accept": "application/json"
    }

  }).then((res) => {
    return res.json()
  }).then((data) => {
    let output = "";
    data.forEach(country => {
      output += `<option  value="${country.country_name
        }">${country.country_name
        }</option>`;
    })
    country.innerHTML = `<option selected  disabled value=''>select country</option>  ${output}`;

  })
}).catch(err => {
  console.log(err);
})


// Fetching states whenever country changes
let getCountries = (e) => {
  fetch(GET_STATES + country.value, {
    headers: {
      "Authorization": "Bearer " + AUTH_TOKEN,
      "Accept": "application/json"
    }

  }).then((res) => {
    // console.log({ res });
    return res.json()
  }).then((data) => {
    // console.log({ data })
    let output = "";
    data.forEach(state => {
      output += `<option  value="${state.state_name
        }">${state.state_name
        }</option>`;
    })
    state.innerHTML = `<option selected disabled value=''>select state</option>  ${output}`;
  }).catch(err => {
    console.log(err);
  })

}



country.addEventListener("change", getCountries)

// Fetching cities whenever states changes

state.addEventListener("change", (e) => {
  fetch(GET_CITIES + state.value, {
    headers: {
      "Authorization": "Bearer " + AUTH_TOKEN,
      "Accept": "application/json"
    }

  }).then((res) => {
    // console.log({ res });
    return res.json()
  }).then((data) => {
    // console.log({ data })
    let output = "";
    data.forEach(city => {
      output += `<option  value="${city.city_name
        }">${city.city_name
        }</option>`;
    })
    city.innerHTML = `<option selected disabled value=''>select city</option>  ${output}`;
  }).catch(err => {
    console.log(err);
  })

})



const updateLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

const getDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}


let userList = document.getElementById("userList")
let users = getDataFromLocalStorage("users")
let editableIndex = null

// console.log(users)

if (users) {
  users.map((user, i) => {
    let tr = document.createElement("tr")
    tr.classList.add = "user"

    let nameTd = document.createElement("td")
    nameTd.innerText = user.full_name

    let emailTd = document.createElement("td")
    emailTd.innerText = user.email

    let dateOfBirthTd = document.createElement("td")
    dateOfBirthTd.innerText = user.date_of_birth

    let genderTd = document.createElement("td")
    genderTd.innerText = user.gender

    let hobbyTd = document.createElement("td")
    hobbyTd.innerText = user.hobby

    let countryTd = document.createElement("td")
    countryTd.innerText = user.country

    let stateTd = document.createElement("td")
    stateTd.innerText = user.state

    let cityTd = document.createElement("td")
    cityTd.innerText = user.city

    let editTd = document.createElement("td")
    editTd.innerHTML = "<button> Edit </button>"
    editTd.addEventListener("click", () => {
      submit.innerText = "Edit"
      editableIndex = i
      full_name.value = user.full_name
      email.value = user.email
      date_of_birth.value = user.date_of_birth
      switch (user.gender) {
        case "male": male.checked = true
          break;
        case "female": female.checked = true
          break;
        case "other": other.checked = true
          break;
        default:
          break;
      }

      hobby.value = user.hobby
      // country.childNodes.forEach((node) => {
      //   country.childNodes[0].selected = false
      //   if (node.value == user.country) node.selected = true
      // })
    })


    let deleteBtn = document.createElement("td")
    deleteBtn.innerHTML = "<button> Delete </button>"
    deleteBtn.addEventListener("click", (e) => {
      users.splice(i, 1)
      updateLocalStorage("users", users)
      location.reload()
    })

    tr.appendChild(nameTd)
    tr.appendChild(emailTd)
    tr.appendChild(dateOfBirthTd)
    tr.appendChild(genderTd)
    tr.appendChild(hobbyTd)
    tr.appendChild(countryTd)
    tr.appendChild(stateTd)
    tr.appendChild(cityTd)
    tr.appendChild(editTd)
    tr.appendChild(deleteBtn)
    userList.append(tr)
  })
}



form.addEventListener("submit", (e) => {
  e.preventDefault()
  const formData = new FormData(e.target);
  let formProps = Object.fromEntries(formData);
  console.log(formProps);

  if (submit.innerText == "Edit") {
    users.splice(editableIndex, 1, formProps)
    console.log({ users })
    updateLocalStorage("users", users)
  } else {
    updateLocalStorage("users", users ? [...users, formProps] : [formProps])
  }
  submit.innerText = "Add"


  location.reload();

})