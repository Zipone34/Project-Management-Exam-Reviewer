const quizForm = document.getElementById("quizForm");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const timeDisplay = document.getElementById("time");

let timeLeft = 300; // 5 minutes
let timer;

startBtn.addEventListener("click", () => {
    // kunin yung value ng input
    const minutes = parseInt(document.getElementById("time-input").value) || 5;
    timeLeft = minutes * 60; // convert minutes to seconds

    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    buildQuiz();
    startTimer();
});


function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    timeDisplay.textContent = formatTime(timeLeft);
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function buildQuiz() {
    quizForm.innerHTML = ""; // clear form before building
    questions.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `
          <p>${index + 1}. ${item.q.replace(/^\d+\.\s*/, "")}</p>
          <label><input type="radio" name="q${index}" value="a" /> a) ${item.options.a}</label><br>
          <label><input type="radio" name="q${index}" value="b" /> b) ${item.options.b}</label><br>
          <label><input type="radio" name="q${index}" value="c" /> c) ${item.options.c}</label><br>
          <label><input type="radio" name="q${index}" value="d" /> d) ${item.options.d}</label>
        `;
        quizForm.appendChild(div);
    });

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit Quiz";
    quizForm.appendChild(submitBtn);
}


quizForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearInterval(timer);
    submitQuiz();
});

function submitQuiz() {
    let score = 0;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    const wrongAnswers = [];

    questions.forEach((item, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const correct = item.a;

        if (selected && selected.value === correct) {
            score++;
        } else {
            const yourAnswer = selected ? selected.value : "None";
            wrongAnswers.push({
                number: i + 1,
                question: item.q,
                yourAnswer: yourAnswer !== "None" ? `${yourAnswer}) ${item.options[yourAnswer]}` : "No answer selected",
                correctAnswer: `${correct}) ${item.options[correct]}`
            });
        }
    });

    resultDiv.innerHTML += `<p>✅ You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>.</p>`;

    if (wrongAnswers.length > 0) {
        resultDiv.innerHTML += `<h3>❌ Incorrect Answers:</h3>`;
        wrongAnswers.forEach(item => {
            resultDiv.innerHTML += `
            <div style="margin-bottom: 10px;">
              <strong>Q${item.number}:</strong> ${item.question}<br/>
              <span style="color: red;">Your Answer: ${item.yourAnswer}</span><br/>
              <span style="color: green;">Correct Answer: ${item.correctAnswer}</span>
            </div>
          `;
        });
    } else {
        resultDiv.innerHTML += `<p style="color: green;">🎉 Perfect score! Great job!</p>`;
    }

    quizForm.style.display = "none";
}

// Shuffle array (Fisher–Yates algorithm)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const randomizeBtn = document.getElementById("randomize-btn");

randomizeBtn.addEventListener("click", () => {
    shuffle(questions);
    alert("✅ Questions randomized! Now click Start Quiz.");
});


const questions = [

    {
        q: "1. What is the primary goal of Project Schedule Management?",
        options: {
            a: "To reduce project costs",
            b: "To ensure timely completion of the project",
            c: "To increase stakeholder engagement",
            d: "To improve product quality"
        },
        a: "b"
    },
    {
        q: "2. Which process involves establishing policies and procedures for schedule planning?",
        options: {
            a: "Define Activities",
            b: "Develop Schedule",
            c: "Plan Schedule Management",
            d: "Control Schedule"
        },
        a: "c"
    },
    {
        q: "3. What is the key output of the Define Activities process?",
        options: {
            a: "Schedule Baseline",
            b: "Activity List",
            c: "Milestone Chart",
            d: "Gantt Chart"
        },
        a: "b"
    },
    {
        q: "4. Which diagram shows logical relationships among project activities?",
        options: {
            a: "Bar Chart",
            b: "Milestone Chart",
            c: "Project Schedule Network Diagram",
            d: "Resource Histogram"
        },
        a: "c"
    },
    {
        q: "5. What is the most commonly used precedence relationship in scheduling?",
        options: {
            a: "Start-to-Finish",
            b: "Finish-to-Start",
            c: "Start-to-Start",
            d: "Finish-to-Finish"
        },
        a: "b"
    },
    {
        q: "6. What technique is used to estimate activity durations using historical data?",
        options: {
            a: "Bottom-Up Estimating",
            b: "Parametric Estimating",
            c: "Analogous Estimating",
            d: "Three-Point Estimating"
        },
        a: "c"
    },
    {
        q: "7. What does the critical path represent?",
        options: {
            a: "The shortest path through the project",
            b: "The path with the most resources",
            c: "The longest path determining project duration",
            d: "The path with the most milestones"
        },
        a: "c"
    },
    {
        q: "8. What is the purpose of resource leveling?",
        options: {
            a: "To reduce project scope",
            b: "To balance resource demand with availability",
            c: "To eliminate float",
            d: "To increase project cost"
        },
        a: "b"
    },
    {
        q: "9. Which estimating technique uses optimistic, pessimistic, and most likely durations?",
        options: {
            a: "Analogous Estimating",
            b: "Parametric Estimating",
            c: "Three-Point Estimating",
            d: "Bottom-Up Estimating"
        },
        a: "c"
    },
    {
        q: "10. What is a milestone?",
        options: {
            a: "A task with high cost",
            b: "A significant point or event in a project",
            c: "A resource allocation",
            d: "A float calculation"
        },
        a: "b"
    },
    {
        q: "11. What is the output of the Develop Schedule process?",
        options: {
            a: "Activity List",
            b: "Schedule Management Plan",
            c: "Project Schedule",
            d: "Resource Calendar"
        },
        a: "c"
    },
    {
        q: "12. What technique shortens the schedule by adding resources?",
        options: {
            a: "Fast Tracking",
            b: "Crashing",
            c: "Simulation",
            d: "Resource Smoothing"
        },
        a: "b"
    },
    {
        q: "13. What is the purpose of Control Schedule?",
        options: {
            a: "To define the scope baseline",
            b: "To monitor and manage schedule changes",
            c: "To allocate resources",
            d: "To develop the schedule"
        },
        a: "b"
    },
    {
        q: "14. Which chart tracks remaining work in an iteration?",
        options: {
            a: "Gantt Chart",
            b: "Milestone Chart",
            c: "Burndown Chart",
            d: "Network Diagram"
        },
        a: "c"
    },
    {
        q: "15. What is the formula for expected duration in triangular distribution?",
        options: {
            a: "(tO + tM + tP) / 3",
            b: "(tO + 4tM + tP) / 6",
            c: "(tM + tP) / 2",
            d: "(tO + tP) / 2"
        },
        a: "a"
    },
    {
        q: "16. What does rolling wave planning involve?",
        options: {
            a: "Planning all activities at once",
            b: "Planning near-term work in detail",
            c: "Ignoring future tasks",
            d: "Using only historical data"
        },
        a: "b"
    },
    {
        q: "17. Which process defines the logical sequence of work?",
        options: {
            a: "Estimate Activity Durations",
            b: "Control Schedule",
            c: "Sequence Activities",
            d: "Define Activities"
        },
        a: "c"
    },
    {
        q: "18. What is a lead in scheduling?",
        options: {
            a: "Delay between activities",
            b: "Time a successor can start before predecessor finishes",
            c: "Float time",
            d: "Resource constraint"
        },
        a: "b"
    },
    {
        q: "19. What is a lag in scheduling?",
        options: {
            a: "Time a successor is delayed after predecessor starts",
            b: "Time a predecessor is delayed",
            c: "Resource optimization",
            d: "Schedule compression"
        },
        a: "a"
    },
    {
        q: "20. What is the key benefit of the Estimate Activity Durations process?",
        options: {
            a: "It defines the cost baseline",
            b: "It determines the project scope",
            c: "It provides time estimates for activities",
            d: "It allocates resources"
        },
        a: "c"
    },
    {
        q: "21. What technique overlaps activities normally done in sequence?",
        options: {
            a: "Crashing",
            b: "Fast Tracking",
            c: "Simulation",
            d: "Resource Leveling"
        },
        a: "b"
    },
    {
        q: "22. What is the output of the Control Schedule process?",
        options: {
            a: "Activity List",
            b: "Schedule Forecasts",
            c: "Milestone Chart",
            d: "Resource Histogram"
        },
        a: "b"
    },
    {
        q: "23. What is the purpose of the Schedule Management Plan?",
        options: {
            a: "To define the cost baseline",
            b: "To guide schedule development and control",
            c: "To allocate resources",
            d: "To manage scope"
        },
        a: "b"
    },
    {
        q: "24. What is the term for the amount of time an activity can be delayed without affecting successor?",
        options: {
            a: "Total Float",
            b: "Free Float",
            c: "Lag",
            d: "Lead"
        },
        a: "b"
    },
    {
        q: "25. What is the purpose of simulation in schedule analysis?",
        options: {
            a: "To reduce scope",
            b: "To calculate cost",
            c: "To evaluate uncertainty and risks",
            d: "To assign resources"
        },
        a: "c"
    },
    {
        q: "26. What is the output of the Define Activities process?",
        options: {
            a: "Schedule Baseline",
            b: "Activity Attributes",
            c: "Resource Calendar",
            d: "Cost Estimate"
        },
        a: "b"
    },
    {
        q: "27. What is the role of the project manager in adaptive environments?",
        options: {
            a: "To eliminate scope changes",
            b: "To manage only predictive projects",
            c: "To apply tools and techniques effectively",
            d: "To avoid stakeholder engagement"
        },
        a: "c"
    },
    {
        q: "28. What is the key benefit of the Develop Schedule process?",
        options: {
            a: "It defines the cost baseline",
            b: "It creates the schedule model",
            c: "It allocates resources",
            d: "It monitors progress"
        },
        a: "b"
    },
    {
        q: "29. What is the purpose of resource smoothing?",
        options: {
            a: "To change the critical path",
            b: "To delay project completion",
            c: "To optimize resources without changing critical path",
            d: "To increase float"
        },
        a: "c"
    },
    {
        q: "30. What is the output that includes planned start and finish dates for activities?",
        options: {
            a: "Schedule Management Plan",
            b: "Project Schedule",
            c: "Milestone List",
            d: "Activity List"
        },
        a: "b"
    },
    //

    {
        q: "31. What is the primary goal of Project Cost Management?",
        options: {
            a: "To maximize profit",
            b: "To complete the project ahead of schedule",
            c: "To complete the project within the approved budget",
            d: "To minimize resource usage"
        },
        a: "c"
    },
    {
        q: "32. Which process defines how project costs will be estimated, budgeted, managed, monitored, and controlled?",
        options: {
            a: "Estimate Costs",
            b: "Determine Budget",
            c: "Control Costs",
            d: "Plan Cost Management"
        },
        a: "d"
    },
    {
        q: "33. What is the key benefit of the Estimate Costs process?",
        options: {
            a: "It defines the cost baseline",
            b: "It determines the monetary resources required",
            c: "It monitors cost performance",
            d: "It controls cost changes"
        },
        a: "b"
    },
    {
        q: "34. Which process aggregates estimated costs to establish an authorized cost baseline?",
        options: {
            a: "Estimate Costs",
            b: "Determine Budget",
            c: "Control Costs",
            d: "Plan Cost Management"
        },
        a: "b"
    },
    {
        q: "35. What is the purpose of Control Costs?",
        options: {
            a: "To create the cost management plan",
            b: "To update the cost baseline and manage changes",
            c: "To estimate contingency reserves",
            d: "To define funding sources"
        },
        a: "b"
    },
    {
        q: "36. Which tool is commonly used in all four cost management processes?",
        options: {
            a: "Parametric Estimating",
            b: "Expert Judgment",
            c: "Earned Value Analysis",
            d: "Reserve Analysis"
        },
        a: "b"
    },
    {
        q: "37. What is the formula for Schedule Variance (SV)?",
        options: {
            a: "SV = EV – AC",
            b: "SV = EV – PV",
            c: "SV = PV – AC",
            d: "SV = BAC – EAC"
        },
        a: "b"
    },
    {
        q: "38. What does CPI measure?",
        options: {
            a: "Schedule efficiency",
            b: "Cost efficiency",
            c: "Risk tolerance",
            d: "Budget accuracy"
        },
        a: "b"
    },
    {
        q: "39. Which estimating technique uses three values to define a cost range?",
        options: {
            a: "Parametric Estimating",
            b: "Analogous Estimating",
            c: "Bottom-Up Estimating",
            d: "Three-Point Estimating"
        },
        a: "d"
    },
    {
        q: "40. What is the formula for Beta distribution in Three-Point Estimating?",
        options: {
            a: "(cO + cM + cP) / 3",
            b: "(cO + 4cM + cP) / 6",
            c: "(cM + cP) / 2",
            d: "(cO + cP) / 2"
        },
        a: "b"
    },
    {
        q: "41. What is the cost baseline used for?",
        options: {
            a: "To define the project scope",
            b: "To compare actual results",
            c: "To determine funding sources",
            d: "To calculate CPI"
        },
        a: "b"
    },
    {
        q: "42. What does the acronym EAC stand for?",
        options: {
            a: "Estimated Actual Cost",
            b: "Earned Actual Cost",
            c: "Estimate at Completion",
            d: "Earned Allocation Cost"
        },
        a: "c"
    },
    {
        q: "43. Which document includes strategic funding choices and currency exchange procedures?",
        options: {
            a: "Cost Estimate",
            b: "Cost Management Plan",
            c: "Risk Register",
            d: "Project Charter"
        },
        a: "b"
    },
    {
        q: "44. What is the formula for TCPI based on BAC?",
        options: {
            a: "(BAC – EV) / (BAC – AC)",
            b: "(BAC – AC) / (BAC – EV)",
            c: "(EV – AC) / (BAC – EV)",
            d: "(BAC – EV) / (EAC – AC)"
        },
        a: "a"
    },
    {
        q: "45. What is the key benefit of the Plan Cost Management process?",
        options: {
            a: "It defines the cost baseline",
            b: "It provides guidance on managing costs",
            c: "It calculates contingency reserves",
            d: "It forecasts project completion"
        },
        a: "b"
    },
    {
        q: "46. Which estimating method uses historical data and variables?",
        options: {
            a: "Analogous Estimating",
            b: "Parametric Estimating",
            c: "Bottom-Up Estimating",
            d: "Three-Point Estimating"
        },
        a: "b"
    },
    {
        q: "47. What is the term for the authorized budget assigned to scheduled work?",
        options: {
            a: "Actual Cost",
            b: "Earned Value",
            c: "Planned Value",
            d: "Budget at Completion"
        },
        a: "c"
    },
    {
        q: "48. What is the formula for CPI?",
        options: {
            a: "CPI = EV / AC",
            b: "CPI = EV / PV",
            c: "CPI = AC / EV",
            d: "CPI = PV / AC"
        },
        a: "a"
    },
    {
        q: "49. What does the acronym SPI stand for?",
        options: {
            a: "Schedule Performance Index",
            b: "Strategic Planning Indicator",
            c: "Scope Performance Indicator",
            d: "Schedule Planning Index"
        },
        a: "a"
    },
    {
        q: "50. What is the formula for SPI?",
        options: {
            a: "SPI = EV / AC",
            b: "SPI = EV / PV",
            c: "SPI = PV / EV",
            d: "SPI = AC / EV"
        },
        a: "b"
    },
    {
        q: "51. What is the purpose of reserve analysis?",
        options: {
            a: "To calculate CPI",
            b: "To monitor contingency and management reserves",
            c: "To define the cost baseline",
            d: "To estimate project duration"
        },
        a: "b"
    },
    {
        q: "52. What is the term for the total funds authorized to execute the project?",
        options: {
            a: "Cost Baseline",
            b: "Project Budget",
            c: "Funding Limit",
            d: "Management Reserve"
        },
        a: "b"
    },
    {
        q: "53. What is the cost of work performed called?",
        options: {
            a: "Actual Cost",
            b: "Earned Value",
            c: "Planned Value",
            d: "Budget at Completion"
        },
        a: "a"
    },
    {
        q: "54. What is the formula for EAC when future work is performed at the budgeted rate?",
        options: {
            a: "EAC = BAC / CPI",
            b: "EAC = AC + (BAC – EV)",
            c: "EAC = AC + [(BAC – EV) / (CPI × SPI)]",
            d: "EAC = AC + Bottom-up ETC"
        },
        a: "b"
    },
    {
        q: "55. What is the formula for EAC using CPI?",
        options: {
            a: "EAC = BAC / CPI",
            b: "EAC = AC + (BAC – EV)",
            c: "EAC = AC + Bottom-up ETC",
            d: "EAC = AC + [(BAC – EV) / (CPI × SPI)]"
        },
        a: "a"
    },
    {
        q: "56. What is the formula for EAC using both CPI and SPI?",
        options: {
            a: "EAC = BAC / CPI",
            b: "EAC = AC + (BAC – EV)",
            c: "EAC = AC + Bottom-up ETC",
            d: "EAC = AC + [(BAC – EV) / (CPI × SPI)]"
        },
        a: "d"
    },
    {
        q: "57. What is the term for the budget at completion?",
        options: {
            a: "BAC",
            b: "EAC",
            c: "AC",
            d: "EV"
        },
        a: "a"
    },
    {
        q: "58. What is the term for the difference between EV and AC?",
        options: {
            a: "Schedule Variance",
            b: "Cost Variance",
            c: "Budget Variance",
            d: "Performance Index"
        },
        a: "b"
    },
    {
        q: "59. What is the term for the difference between EV and PV?",
        options: {
            a: "Cost Variance",
            b: "Schedule Variance",
            c: "Budget Variance",
            d: "Performance Index"
        },
        a: "b"
    },
    {
        q: "60. What is the purpose of the cost management plan?",
        options: {
            a: "To define the scope baseline",
            b: "To structure and control project costs",
            c: "To monitor project risks",
            d: "To allocate resources"
        },
        a: "b"
    }
];






