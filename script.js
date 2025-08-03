function calculateGPA() {
  const subjects = [
    {
      name: "Medical Electronics",
      cpu: 4,
      components: {
        icq: { weight: 0.20 },
        theory: { weight: 0.20 },
        assign: { weight: 0.10 },
        project: { weight: 0.40 },
        part: { weight: 0.10 }
      }
    },
    {
      name: "Engineering Mathematics 3",
      cpu: 4,
      components: {
        icq: { weight: 0.10 },
        assign: { weight: 0.20 },
        term: { weight: 0.20 },
        online: { weight: 0.10 },
        part: { weight: 0.10 },
        exam: { weight: 0.30 }
      }
    },
    {
      name: "Microcontroller Applications",
      cpu: 5,
      components: {
        part: { weight: 0.10 },
        online: { weight: 0.15 },
        practical: { weight: 0.25 },
        project: { weight: 0.50 }
      }
    },
    {
      name: "Human Anatomy and Physiology",
      cpu: 4,
      components: {
        icq: { weight: 0.20 },
        practical: { weight: 0.25 },
        theory1: { weight: 0.15 },
        theory2: { weight: 0.15 },
        assign: { weight: 0.15 },
        part: { weight: 0.10 }
      }
    },
    {
      name: "Effective Communication",
      cpu: 3,
      components: {
        elearning: { weight: 0.05 },
        prom: { weight: 0.20 },
        article: { weight: 0.30 },
        seminar: { weight: 0.35 },
        part: { weight: 0.10 }
      }
    }
  ];

  let totalWeightedPoints = 0;
  let totalCPUs = 0;
  let output = "";

  subjects.forEach(sub => {
    let totalScore = 0;
    let remainingWeight = 0;

    for (let key in sub.components) {
      let inputName = `${sub.name.toLowerCase().replace(/ /g, "_")}_${key}`;
      let score = parseFloat(document.querySelector(`input[name="${inputName}"]`)?.value) || 0;
      let weight = sub.components[key].weight;

      totalScore += score * weight;
      if (!score) remainingWeight += weight;
    }

    let gpa = totalScore >= 80 ? 4 :
              totalScore >= 70 ? 3 :
              totalScore >= 60 ? 2 :
              totalScore >= 50 ? 1 : 0;

    let neededScore = remainingWeight > 0
      ? ((80 - totalScore) / remainingWeight).toFixed(2)
      : "All assessments complete";

    output += `
      <h3>${sub.name}</h3>
      <p>Total Score: ${totalScore.toFixed(2)}%</p>
      <p>GPA: ${gpa}</p>
      <p>Required average in remaining assessments for A: ${neededScore}</p>
    `;

    totalWeightedPoints += gpa * sub.cpu;
    totalCPUs += sub.cpu;
  });

  const overallGPA = (totalWeightedPoints / totalCPUs).toFixed(2);
  output += `<h2>Overall GPA: ${overallGPA}</h2>`;
  document.getElementById("results").innerHTML = output;
}
