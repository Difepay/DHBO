// DOM
const number_inputs = document.querySelectorAll('[data-type]');
const reset_btns = document.querySelectorAll('[data-btn-reset]');
const save_btns = document.querySelectorAll('[data-btn-save]');
const task_input = document.querySelector('#task_input');
const form_task = document.querySelector('#form');
const answer_input = document.querySelector('#answer');

// Variable
var   firstUserNumber =   {dec: null, bin: null, hex: null, oct: null},
      secondUserNumber = {dec: null, bin: null, hex: null, oct: null};

const types = ['dec', 'bin', 'hex', 'oct'];
const hexVal = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const octVal = ['0', '1', '2', '3', '4', '5', '6', '7'];
const binVal = ['0', '1'];

let values = {
   bin: '',
   oct: '',
   dec: '',
   hex: ''
}


// Main
number_inputs.forEach(elem => {
   elem.addEventListener('input', () => {
      let $this = elem;
      let thisType = $this.getAttribute('data-type');

      convertNumbers(thisType, $this);
   });
});

reset_btns.forEach(item => {
   item.addEventListener('click', event => {
      event.preventDefault();
      
      let $this = event.target;
      let thisType = $this.getAttribute('data-btn-reset');

      if (thisType === 'inputs') {
         number_inputs.forEach(elem => {
            elem.value = '';
         });
      
         values.bin = '';
         values.oct = '';
         values.dec = '';
         values.hex = '';
      } else if (thisType === 'task') {
         task_input.value = '';
         answer_input.value = '';
      } else if (thisType === 'variables') {
         firstUserNumber = {dec: null, bin: null};
         secondUserNumber = {dec: null, bin: null};
      }
      
      showVariableBlock();
   });
});

save_btns.forEach(item => {
   item.addEventListener('click', event => {
      event.preventDefault();

      let $this = item;
      let thisIndex = $this.getAttribute('data-btn-save');
      const decimal_in = document.querySelector('#dec');
      const binary_in = document.querySelector('#bin');
      const hexadecimal_in = document.querySelector('#hex');
      const octal_in = document.querySelector('#oct');

      if (document.querySelector('#dec').value !== '') {
         if (thisIndex === '0') {
            firstUserNumber.dec = Number(decimal_in.value);
            firstUserNumber.bin = Number(binary_in.value);
            firstUserNumber.hex = hexadecimal_in.value;
            firstUserNumber.oct = Number(octal_in.value);
         } else {
            secondUserNumber.dec = Number(decimal_in.value);
            secondUserNumber.bin = Number(binary_in.value);
            secondUserNumber.hex = hexadecimal_in.value;
            secondUserNumber.oct = Number(octal_in.value);
         }
      }

      showVariableBlock();
   });
});

form_task.addEventListener('submit', event => {
   event.preventDefault();

   let task = task_input.value;

   if (task.search('n1') !== -1 || task.search('n2') !== -1) {
      let whatIsUsed;

      if (task.search('n1') !== -1 && task.search('n2') === -1) {
         whatIsUsed = 'n1';
      } else if (task.search('n2') !== -1 && task.search('n1') === -1) {
         whatIsUsed = 'n2';
      } else {
         whatIsUsed = 'both';
      }

      if (
         (whatIsUsed === 'n1' && firstUserNumber.dec !== null) ||
         (whatIsUsed === 'n2' && secondUserNumber.dec !== null) ||
         (whatIsUsed === 'both' && firstUserNumber.dec !== null && secondUserNumber.dec !== null)
      )
      {
         do {
            task = task.replace('n1', firstUserNumber.dec);
         } while (task.search('n1') !== -1);
   
         do {
            task = task.replace('n2', secondUserNumber.dec);
         } while (task.search('n2') !== -1);
      }
   }

   if (task.search('h') !== -1 || task.search('o') !== -1 || task.search('b') !== -1)
   {
      let it = 0, ft = 0, dec = 0, currNum = [];
      task = task.split('');

      while (task.includes('h')) {
         it = task.indexOf('h');
         currNum = [];

         for (let i = (it - 1); hexVal.includes(task[i]); i--) {
            currNum.unshift(task[i]);
         }

         dec = parseInt(currNum.join(''), 16);
         ft = it - currNum.length;

         for (let i = ft; i <= it; i++) {
            task[i] = '';
         }
         task[ft] = dec.toString(10);
         task = task.filter(el => { return el !== ''; });
      }

      while (task.includes('o')) {
         it = task.indexOf('o');
         currNum = [];

         for (let i = (it - 1); octVal.includes(task[i]); i--) {
            currNum.unshift(task[i]);
         }

         dec = parseInt(currNum.join(''), 8);
         ft = it - currNum.length;

         for (let i = ft; i <= it; i++) {
            task[i] = '';
         }
         task[ft] = dec.toString(10);
         task = task.filter(el => { return el !== ''; });
      }
      
      while (task.includes('b')) {
         it = task.indexOf('b');
         currNum = [];

         for (let i = (it - 1); binVal.includes(task[i]); i--) {
            currNum.unshift(task[i]);
         }

         dec = parseInt(currNum.join(''), 2)
         ft = it - currNum.length;

         for (let i = ft; i <= it; i++) {
            task[i] = '';
         }
         task[ft] = dec;
         task = task.filter(el => { return el !== ''; });
      }

      task = task.join('');
   }

   let answer = eval(task);
   answer_input.value = `${answer} (bin: ${answer.toString(2)}, hex: ${answer.toString(16).toUpperCase()}, oct: ${answer.toString(8)})`;
});


//* Functions

function convertNumbers(type, el) {
   values[type] = el.value;

   if (type === 'bin') {
      values.dec = parseInt(values[type], 2);
   } else if (type === 'oct') {
      values.dec = parseInt(values[type], 8);
   } else if (type === 'hex') {
      values.dec = parseInt(values[type], 16);
   }

   values.dec = Number(values.dec.toString(10).toUpperCase());

   values.bin = Number(values.dec.toString(2).toUpperCase());
   values.oct = Number(values.dec.toString(8).toUpperCase());
   values.hex = values.dec.toString(16).toUpperCase();

   for (let item of number_inputs) {
      let thisType = item.getAttribute('data-type');

      item.value = '';
      item.value = values[thisType];
   }

   if (number_inputs[1].value === 'NaN') {
      document.querySelector('[data-btn-reset=\"inputs\"]').click();
   }
}

function showVariableBlock() {
   const first_number_block = document.querySelector('#first-number');
   const second_number_block = document.querySelector('#second-number');
   const parent = document.querySelector('#numbers-parent');

   if (firstUserNumber.dec !== null && secondUserNumber.dec === null) {
      first_number_block.style.display = 'block';
      first_number_block.innerHTML = `n1 = ${firstUserNumber.dec} (bin: ${firstUserNumber.bin}, hex: ${firstUserNumber.hex}, oct: ${firstUserNumber.oct})`;

      parent.classList.add('show');
   }
   
   else if (secondUserNumber.dec !== null && firstUserNumber.dec === null) {
      second_number_block.style.display = 'block'
      second_number_block.innerHTML = `n2 = ${secondUserNumber.dec} (bin: ${secondUserNumber.bin}, hex: ${secondUserNumber.hex}, oct: ${secondUserNumber.oct})`;

      parent.classList.add('show');
   }
   
   else if (secondUserNumber.dec !== null && firstUserNumber.dec !== null) {
      first_number_block.style.display = 'block';
      second_number_block.style.display = 'block';

      first_number_block.innerHTML = `n1 = ${firstUserNumber.dec} (bin: ${firstUserNumber.bin}, hex: ${firstUserNumber.hex}, oct: ${firstUserNumber.oct})`;
      second_number_block.innerHTML = `n2 = ${secondUserNumber.dec} (bin: ${secondUserNumber.bin}, hex: ${secondUserNumber.hex}, oct: ${secondUserNumber.oct})`;

      parent.classList.add('show');
   }
   
   else {
      first_number_block.style.display = 'none';
      second_number_block.style.display = 'none';

      parent.classList.remove('show');
   }
}