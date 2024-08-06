`use strict`;


const radioMetricInp = document.querySelector(`#radio-metric`);
const radioImperilInp = document.querySelector(`#radio-imperial`);

const metricInputs = document.querySelector(`.metric-inputs`);
const imperialInputs = document.querySelector(`.imperial-inputs`);


const cmInput = document.querySelector(`#metric-height`);
const kgInput = document.querySelector(`#metric-weight`);

const ftInput = document.querySelector(`#foot-inp`);
const inchInput = document.querySelector(`#inch-inp`);
const stInput = document.querySelector(`#stones-inp`);
const lbsInput = document.querySelector(`#pound-inp`);


const displayBMI = document.querySelector(`.BMI`)

const afterCalculation = document.querySelector(`.after-calculation`);
const welcom = document.querySelector(`.welcom`);

const healthStatus = document.querySelector(`.health-status`);

const minimumWeight = document.querySelector(`.minimum-weight`);
const maximumWeight = document.querySelector(`.maximum-weight`);



const bmiHealthStatus = {
    underweight: 18.5, // less than
    healthyWeight: {
        from: 18.5,
        to: 24.9,
    },
    overweight: {
        from: 25,
        to: 29.9,
    },
    obese: 30, /// equal or more
};




///  this function determines wich measuring 
//      inputs should be displayed




// radioMetricInp.addEventListener(`click`, () => 
//     radioMetricInp.checked = true

//     // imperialInputs.classList.add(`display-none`)

//     // metricInputs.classList.remove(`display-none`)
//     // imperialInputs.classList.add(`display-none`)

//     // ftInput.value = ``;
//     // inchInput.value = ``;
//     // stInput.value =  ``;
//     // lbsInput.value = ``;
// )

// radioImperilInp.addEventListener(`click`, () => 

//     radioImperilInp.checked = true

//     // metricInputs.classList.add(`display-none`)
//     // imperialInputs.classList.remove(`display-none`)

//     // cmInput.value = ``;
//     // kgInput.value = ``; 
// )


// document.addEventListener(`keyup`, () => {
//     wichRadioIsChecked()
// })


const wichRadioIsChecked = function() {

    const radioInputs = [radioMetricInp, radioImperilInp];
    
    if(radioMetricInp) {
        imperialInputs.classList.add(`display-none`)

        
        document.addEventListener(`keyup`, () => {

            welcom.classList.add(`display-none`);
            afterCalculation.classList.remove(`display-none`);

            calculateMetricBMI();
            displayHeathStatus(calculateMetricBMI());
        })
    }

    radioInputs.forEach(el => {
        el.addEventListener(`click`, () => {   

            displayBMI.textContent = `0`
            minimumWeight.textContent = ``
            maximumWeight.textContent = ``
            
            if(radioMetricInp.checked) {
                metricInputs.classList.remove(`display-none`)
                imperialInputs.classList.add(`display-none`)

                ftInput.value = ``;
                inchInput.value = ``;
                stInput.value =  ``;
                lbsInput.value = ``;

                document.addEventListener(`keyup`, () => {

                    welcom.classList.add(`display-none`);
                    afterCalculation.classList.remove(`display-none`);
        
                    calculateMetricBMI();
                    displayHeathStatus(calculateMetricBMI());
                })


            } else {
                metricInputs.classList.add(`display-none`)
                imperialInputs.classList.remove(`display-none`)

                cmInput.value = ``;
                kgInput.value = ``; 



                
                document.addEventListener(`keyup`, () => {

                    welcom.classList.add(`display-none`);
                    afterCalculation.classList.remove(`display-none`);

                    calculateImperialBMI()
                    displayHeathStatus(calculateImperialBMI())
                })
                
                // calculateImperialBMI()
                // displayHeathStatus(calculateImperialBMI())
            }
        })
    })
}


wichRadioIsChecked();



/// this function calculates how many is bmi
/// and printing it on the screen;

const calculateMetricBMI = function() {

    const cmInputValue = Number(cmInput.value);
    const kgInputValue = Number(kgInput.value);

    const cmToM = cmInputValue / 100;
    const prebmi = kgInputValue / (cmToM * cmToM)
    const bmi = Math.trunc(prebmi * 100) / 100;

    if(bmi >= 0) {
        displayBMI.textContent = `${bmi}`;
    } else {
        displayBMI.textContent = `0`;
    }

    // console.log(bmi)

    idealWeight(cmToM)
    return bmi
};


const calculateImperialBMI = function () {

    const ftInputValue = Number(ftInput.value);
    const inchInputValue = Number(inchInput.value);
    const stInputValue = Number(stInput.value);
    const lbsInputValue = Number(lbsInput.value);

    const ftToCM = ftInputValue * 30.48;
    const inchToCM = inchInputValue * 2.54;
    const stToKG = stInputValue * 6.35;
    const lbsToKG = lbsInputValue * 0.45;

    const totalHeight = (ftToCM + inchToCM) / 100;
    const totalWeight = stToKG + lbsToKG;

    const prebmi = totalWeight / (totalHeight * totalHeight);
    const bmi = Math.trunc(prebmi * 100) / 100;

    if(bmi >= 0) {
        displayBMI.textContent = `${bmi}`;
    } else {
        displayBMI.textContent = `0`;
    }

    idealWeight(totalHeight)

    return bmi

}


//// calculates ideal weigh 

const idealWeight = function(cmToM) {

    const minWeight = (cmToM * cmToM )* bmiHealthStatus.healthyWeight.from;
    const maxWeight = (cmToM * cmToM ) * bmiHealthStatus.healthyWeight.to;

    const x = Math.trunc(minWeight * 10) / 10;
    const y = Math.trunc(maxWeight * 10) / 10;

    minimumWeight.textContent = `${x}`;
    maximumWeight.textContent = `${y}`;
};



/// this function prints health status

const displayHeathStatus = function(bmi) {
    if(bmi < bmiHealthStatus.underweight) {
        healthStatus.textContent = `Underweight`
    } else if (bmi >= bmiHealthStatus.healthyWeight.from && 
        bmi <= bmiHealthStatus.healthyWeight.to
    ) {
        healthStatus.textContent = `Healthy Weight`
    } else if (bmi >= bmiHealthStatus.overweight.from && 
        bmi <= bmiHealthStatus.overweight.to
    ) {
        healthStatus.textContent = `Overweight`
    } else {
        healthStatus.textContent = `Obese`
    }
};






// document.addEventListener(`click`, () => {

//     welcom.classList.add(`display-none`);
//     afterCalculation.classList.remove(`display-none`);

//     // wichRadioIsChecked();

//     // calculateMetricBMI();
//     displayHeathStatus(calculateMetricBMI());


//     // calculateImperialBMI()
//     displayHeathStatus(calculateImperialBMI())


//     console.log(radioMetricInp.checked)
//     // console.log(radioImperilInp.checked)


//     // if(radioMetricInp) {
//     //     calculateMetricBMI();
//     //     displayHeathStatus(calculateMetricBMI());
//     // } else if (radioImperilInp) {
//     //     calculateImperialBMI()
//     //     displayHeathStatus(calculateImperialBMI())

//     // }

// })


