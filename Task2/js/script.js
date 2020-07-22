let allUsers = [];
let allFoundUsers = [];
let foundUsers = null;
let usersStatistics = null;
let txtSearch = null;
let btnSearch = null;
let numberFormat = null;

window.addEventListener('load', () => {
  foundUsers = document.querySelector('#foundUsers');
  usersStatistics = document.querySelector('#usersStatistics');
  txtSearch = document.querySelector('#txtSearch');
  txtSearch.disabled = true;
  btnSearch = document.querySelector('#btnSearch');
  btnSearch.disabled = true;

  numberFormat = Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

  doFetchAsync();
});

const doFetchAsync = async () => {
  const result = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const jsonResult = await result.json();
  allUsers = jsonResult.results.map(person => {
    const { name, picture, dob, gender } = person;
    return {
      name: `${name.first} ${name.last}`,
      picture,
      age: dob.age,
      gender
    };
  });

  txtSearch.disabled = false;
  txtSearch.addEventListener('keyup', event => {
    if (txtSearch.value === '') {
      btnSearch.disabled = true;
      allFoundUsers = [];
      render();
    } else {
      btnSearch.disabled = false;
    }
    if (event.key === 'Enter') {
      btnSearch.click();
    }
  });
  btnSearch.addEventListener('click', handleSearch);
  render();
};
const render = () => {
  renderUsersList();
  renderStatistics();
};

const renderUsersList = () => {
  foundUsers.innerHTML = '';
  let foundUsersHTML = null;
  if (allFoundUsers.length > 0) {
    foundUsersHTML = '<div>';
    allFoundUsers.forEach(person => {
      const personHTML = `<div>
        <img src="${person.picture.thumbnail}" alt="${person.name}">
        <label>${person.name}, ${person.age}</label>
      </div>`;
      foundUsersHTML += personHTML;
    });
    foundUsersHTML += '</div>';
  } else {
    foundUsersHTML = `<div>
        <h5>No user found</h5>
    </div>`;
  }
  foundUsers.innerHTML = foundUsersHTML;
};

const renderStatistics = () => {
  usersStatistics.innerHTML = '';
  if (allFoundUsers.length > 0) {
    const countM = allFoundUsers.filter(person => person.gender === 'male')
      .length;
    const countF = allFoundUsers.filter(person => person.gender === 'female')
      .length;
    const sumAgesCalc = allFoundUsers.reduce(
      (accumulator, current) => (accumulator += current.age),
      0
    );
    const meanAgesCalc = sumAgesCalc / allFoundUsers.length;
    const h5 = document.createElement('h5');
    h5.textContent = 'Statistics';
    const genderMale = document.createElement('h6');
    genderMale.textContent = `Gender male: ${countM}`;
    const genderFemale = document.createElement('h6');
    genderFemale.textContent = `Gender female: ${countF}`;
    const sumAges = document.createElement('h6');
    sumAges.textContent = `Sum Ages: ${formatNumber(sumAgesCalc)}`;
    const meanAges = document.createElement('h6');
    meanAges.textContent = `Mean Ages: ${formatNumber(meanAgesCalc)}`;
    usersStatistics.appendChild(h5);
    usersStatistics.appendChild(genderMale);
    usersStatistics.appendChild(genderFemale);
    usersStatistics.appendChild(sumAges);
    usersStatistics.appendChild(meanAges);
  } else {
    const h5 = document.createElement('h5');
    h5.textContent = 'No data to display';
    usersStatistics.appendChild(h5);
  }
};

const handleSearch = event => {
  allFoundUsers = allUsers.filter(person =>
    person.name.toLowerCase().includes(txtSearch.value.toLowerCase())
  );
  allFoundUsers.sort((a, b) => a.name.localeCompare(b.name));
  render();
};

const formatNumber = number => {
  return numberFormat.format(number);
};
