const profitInput = document.getElementById("profitInput");
const mmkInput = document.getElementById("mmkInput");
const tbody = document.getElementById('tableBody');

const plans = [
  
  ['Weekly Pass',   '',           76], 
  ['Twilight Pass', '',           402.5], 
  ['86',            '78+8',       61.5],
  ['172',           '156+16',     122], 
  ['257',           '234+23',     177.5], 
  ['343',           '257+86',     239],
  ['429',           '257+172',    299.5], 
  ['514',           '257+257',    355], 
  ['600',           '514+86',     416.5],
  ['706',           '625+81',     480], 
  ['878',           '706+172',    602], 
  ['963',           '706+257',    657.5],
  ['1049',          '706+343',    719], 
  ['1135',          '706+429',    779.5],
  ['1412',          '706+706',    960],
  ['2195',          '1860+335',   1453], 
  ['2901',          '2195+706',   1933],
  ['3688',          '3099+589',   2424], 
  ['5532',          '4649+883',   3660],
  ['9288',          '7740+1548',  6079],

 
  ['50+',           '',           39], 
  ['150+',          '',           116.9],
  ['250+',          '',           187.5], 
  ['500+',          '',           385]
];


function createTable() {
  tbody.innerHTML = '';
  plans.forEach((plan, index) => {
    const tr = document.createElement('tr');
    if (plan[0] === '50+') {
      const td = document.createElement('td');
      td.colSpan = 7;
      td.className = 'double-dp';
      td.textContent = 'Double Dia Plan';
      const trBreak = document.createElement('tr');
      trBreak.appendChild(td);
      tbody.appendChild(trBreak);
    }

    const mmkResult = document.createElement('td');
mmkResult.className = 'col-result'; 

const profitCell = document.createElement('td');
profitCell.className = 'col-profit'; 

const totalCell = document.createElement('td');
totalCell.className = 'col-total'; 


    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${plan[0]}</td>
      <td>${plan[1]}</td>
      <td>${plan[2]}</td>
    `;
    tr.appendChild(mmkResult);
    tr.appendChild(profitCell);
    tr.appendChild(totalCell);
    tbody.appendChild(tr);
  });
}

function updateTable() {
  const mmk = parseFloat(mmkInput.value);
  const refBRL = 1000;
  const percent = parseFloat(profitInput.value) || 0; 
  const rows = tbody.querySelectorAll('tr');

  let dataIndex = 0;
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].children;
    // skip the "Double Dia Plan" header row
    if (cells.length < 7) continue;

    const coinPrice = parseFloat(plans[dataIndex][2]);
    const mmkValue = ((mmk / refBRL) * coinPrice).toFixed(2);
    const profit = (mmkValue * percent / 100).toFixed(2);
    const total = (parseFloat(mmkValue) + parseFloat(profit)).toFixed(2);

    cells[4].textContent = mmk ? mmkValue : '-';
    cells[5].textContent = mmk ? profit : '-';
    cells[6].textContent = mmk ? total : '-';

    dataIndex++;
  }
}

function setTheme(themeName) {
  document.body.className = themeName;
}

// Event Listeners
mmkInput.addEventListener('input', updateTable);
profitInput.addEventListener('input', updateTable);

// Initialize Table
createTable();
