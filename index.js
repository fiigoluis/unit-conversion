// DOM Selection

const enterValue = document.getElementById("enter-value")
const topOutput = document.getElementById("top-output")
const bottomOutput = document.getElementById("bottom-output")

const topLabel = document.getElementById("top-label")
const bottomLabel = document.getElementById("bottom-label")

const topUnit = document.getElementById("top-unit")
const bottomUnit = document.getElementById("bottom-unit")

const metrics = document.querySelectorAll(".metric-control")
const indicator = document.querySelector(".active-indicator")
const converterButton = document.getElementById("convert")

// State
let selectedMetric = "length"

// Conversion Data
const conversionData = {
    
    length: {
        topLabel: "Feet",
        bottomLabel: "Meter",
        topUnit: "ft",
        bottomUnit: "m",

        toTop: function(value) {
            return value * 3.281;
        },

        toBottom: function(value) {
            return value * 0.3048;
        }

    },

    volume: {
        topLabel: "Gallon",
        bottomLabel: "Liters",
        topUnit: "gal",
        bottomUnit: "L",

        toTop: function(value) {
            return value * 0.2642;
        },

        toBottom: function(value) {
            return value * 3.785;
        }
    },

    mass: {
        topLabel: "Pounds",
        bottomLabel: "Kilograms",
        topUnit: "lb",
        bottomUnit: "kg",

        toTop: function(value) {
            return value * 2.205;
        },

        toBottom: function(value) {
            return value * 0.4536;
        }
    },


}

// Functions
function updateConversionDisplay() {

    const data = conversionData[selectedMetric]

    topLabel.textContent = data.topLabel;
    bottomLabel.textContent = data.bottomLabel;

    topUnit.textContent = data.topUnit;
    bottomUnit.textContent = data.bottomUnit;

}

function convert() {


    let value = enterValue.value;

    // Don't allow empty input
    if (value === "") {
        return;
    }

    // Don't allow more than 5 digits
    const digits = value.replace(".", "");

    if (digits.length > 5) {
        value = value.slice(0, 5);
        enterValue.value = value;
    }

    const data = conversionData[selectedMetric];

    // Convert the entered value
    const result = data.toTop(value);

    // Update the two outputs
    animatedNumber (topOutput, value);
    animatedNumber(bottomOutput, result);
}


function animatedNumber(element, newValue) {

    const startValue = parseFloat(element.textContent) || 0;
    const duration = 400;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out
        const ease = 1 - Math.pow(1 - progress, 3);

        const currentValue = 
            startValue + (newValue - startValue) * ease;

        element.textContent = currentValue.toFixed(2);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Event Listeners

// Selected metric
metrics.forEach(function (metric, index) {

    metric.addEventListener("click", function(){

        //Remove active from all buttons
        metrics.forEach(function(item){
            item.classList.remove("active");
        });

        //Add active to the clicked button
        metric.classList.add("active");

        // Move indicator
        indicator.style.transform = `translateX(${index * 100}%)`;

        // Update selected metric
        selectedMetric = metric.id;

        // Update conversion display
        updateConversionDisplay();


    });
    

});




// Convert functions
converterButton.addEventListener("click", convert)




// Calculate

// Update labels

// Animate numbers

// Change button state
