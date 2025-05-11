
document.getElementById('submit').addEventListener('click', calculatePrice);

function calculatePrice () {
  const BASE = 100;
  let price = BASE;

  const educationCoeff = {
    bachelor:      1.5,
    college:       1.2,
    high_school:   1.05,
    middle_school: 0.9
  };

  const networthCoeff = {
    upper_class:   2,
    middle_class:  1.5,
    lower_class:   1.2
  };

  const casteBonus = {
    brahmin:   100,
    kshatriya:  50,
    vaishya:    20,
    shudra:     10,
    varna:     -50
  };

  const skillsBonus = {
    instrument: 10,
    cook:       20,
    easygoing:  15,
    sings:      10
  };

  const ageCoeff = {
    age18_23: 1.5,
    age24_27: 1.2,
    age28:    0.95
  };

  const reputationCoeff = {          
    gossip_parents:   0.85,
    gossip_character: 0.9
  };


  const education = document.getElementById('education').value;
  const networth  = document.getElementById('networth').value;
  const caste     = document.getElementById('caste').value;
  const age       = document.querySelector('input[name="age"]:checked')?.value;

  const skills = [...document.querySelectorAll('input[name="skills"]:checked')]
                 .map(el => el.value);

  const reputation = [...document.querySelectorAll('input[name="reputation"]:checked')]
                     .map(el => el.value);

  
  if (!education || !networth || !caste || !age) {
    alert('Please pick something for education, net-worth, caste and age.');
    return;
  }

  price *= educationCoeff[education];
  price *= networthCoeff[networth];
  price += casteBonus[caste];
  price *= ageCoeff[age];

  skills.forEach(s => price += skillsBonus[s]);

  reputation.forEach(r => {
    if (r === 'gossip_general') {
      price -= 20;
    } else {
      price *= reputationCoeff[r];
    }
  });

  price = Math.max(price, 0).toFixed(2); // non-negative, 2-dp

  const resultBox = document.getElementById('result');
  resultBox.innerHTML = `<h3>Final price: $${price}</h3>`;   // 1️⃣ HTML
  resultBox.style.backgroundColor = '#e9ffe7';               // 1️⃣ CSS
  resultBox.style.border          = '2px solid #28a745';

  document.querySelector('h1').textContent =
    'Dowry calculator • Result ready!';                      // 2️⃣ HTML

  document.getElementById('submit').textContent = 'Recalculate'; // 3️⃣ HTML
}
