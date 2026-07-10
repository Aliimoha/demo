// Local Database State (Halkaan waxaa ku kaydsan xogta inta boggu furan yahay)
let studentsData = [
  {
    name: "Axmed Maxamed",
    username: "axmed10",
    code: "AX77",
    attendance: 92,
    exam: "88/100",
  },
  {
    name: "Deeqa Ismaaciil",
    username: "deeqa99",
    code: "DQ99",
    attendance: 45,
    exam: "Ma fariisin",
  },
];

let votes = { A: 0, B: 0 };

// 1. Bog Beddelka (Single Page Application Router)
function switchPage(pageId) {
  // Ka qaad firfircoonida dhamaan qaybaha
  document.querySelectorAll(".page-section").forEach((section) => {
    section.classList.remove("active");
  });
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Sii firfircoonida bogga la doortay
  document.getElementById(pageId).classList.add("active");

  // Raadi badhanka saxda ah si aad u saarto xariiqda firfircoon
  const clickedLink = Array.from(document.querySelectorAll(".nav-item")).find(
    (item) => item.getAttribute("onclick").includes(pageId),
  );
  if (clickedLink) clickedLink.classList.add("active");
}

// 2. Diiwaangelinta Ardayda Cusub
function registerStudent(event) {
  event.preventDefault();

  const name = document.getElementById("stu-name").value.trim();
  const username = document
    .getElementById("stu-username")
    .value.trim()
    .toLowerCase();
  const code = document.getElementById("stu-code").value.trim();

  // Hubi haddii username-ku horay u jiray
  if (studentsData.some((s) => s.username === username)) {
    alert("Username-kani waa la qaatay, fadlan mid kale dooro!");
    return;
  }

  // Ku dar liiska dhabta ah
  studentsData.push({
    name: name,
    username: username,
    code: code,
    attendance: 0, // Ku bilaabaysa eber
    exam: "Lama go'amin",
  });

  // Nadiifi foomka
  document.getElementById("add-student-form").reset();

  // Casriyeey UI-ga
  refreshAllVisuals();
  alert(`Ardayga ${name} waa la diiwaangeliyey!`);
}

// 3. Casriyeynta Xogta Ardayda (Attendance & Exam)
function updateStudentData(event) {
  event.preventDefault();

  const selectedUsername = document.getElementById("select-student").value;
  const attendanceVal = parseInt(
    document.getElementById("update-attendance").value,
  );
  const examVal = document.getElementById("update-exam").value.trim();

  const student = studentsData.find((s) => s.username === selectedUsername);
  if (student) {
    student.attendance = attendanceVal;
    student.exam = examVal;

    document.getElementById("update-student-form").reset();
    refreshAllVisuals();
    alert(`Xogta ardayga ${student.name} waa la casriyeeyay!`);
  }
}

// 4. Live Voting System (Codbixinta Tooska Ah)
function castVote(candidate) {
  if (candidate === "A") votes.A++;
  if (candidate === "B") votes.B++;

  refreshAllVisuals();
}

// 5. Student Portal Login Logic
function loginStudentPortal() {
  const userInp = document
    .getElementById("login-username")
    .value.trim()
    .toLowerCase();
  const codeInp = document.getElementById("login-code").value.trim();
  const errMsg = document.getElementById("login-error");

  const foundStudent = studentsData.find(
    (s) => s.username === userInp && s.code === codeInp,
  );

  if (foundStudent) {
    errMsg.innerText = "";
    document.getElementById("portal-login-box").style.display = "none";

    // Buuxi xogta gaarka ah ee profilka ardayga
    document.getElementById("profile-student-name").innerText =
      `Ardayga: ${foundStudent.name}`;
    document.getElementById("profile-attendance").innerText =
      `${foundStudent.attendance}%`;
    document.getElementById("profile-exam").innerText = foundStudent.exam;

    document.getElementById("portal-profile-box").style.display = "block";
  } else {
    errMsg.innerText = "Username ama Code khaldan! Fadlan mar kale isku day.";
  }
}

function logoutStudentPortal() {
  document.getElementById("login-username").value = "";
  document.getElementById("login-code").value = "";
  document.getElementById("portal-profile-box").style.display = "none";
  document.getElementById("portal-login-box").style.display = "block";
}

// 6. Refreshing UI Elements (Nadiifinta & Soo Gudbinta Xogta)
function refreshAllVisuals() {
  // 1. Shaxda Ardayda (Table)
  const tbody = document.getElementById("student-table-body");
  tbody.innerHTML = "";

  // 2. Select Option-ka Foomka Casriyeynta
  const selectDropdown = document.getElementById("select-student");
  selectDropdown.innerHTML = '<option value="">-- Dooro Arday --</option>';

  studentsData.forEach((student) => {
    // Ku dar shaxda
    const row = `<tr>
            <td><strong>${student.name}</strong></td>
            <td><code>${student.username}</code></td>
            <td><code>${student.code}</code></td>
            <td>${student.attendance}%</td>
            <td>${student.exam}</td>
        </tr>`;
    tbody.innerHTML += row;

    // Ku dar dropdown-ka
    const option = `<option value="${student.username}">${student.name} (${student.username})</option>`;
    selectDropdown.innerHTML += option;
  });

  // 3. Counter-ada Homepage-ka
  document.getElementById("total-students-count").innerText =
    studentsData.length;

  const totalVotes = votes.A + votes.B;
  document.getElementById("total-votes-count").innerText = totalVotes;

  // 4. Update Bars-ka Codbixinta
  const pctA = totalVotes === 0 ? 0 : Math.round((votes.A / totalVotes) * 100);
  const pctB = totalVotes === 0 ? 0 : Math.round((votes.B / totalVotes) * 100);

  document.getElementById("votes-a-text").innerText =
    `${votes.A} Cod (${pctA}%)`;
  document.getElementById("bar-a").style.width = `${pctA}%`;
  document.getElementById("bar-a").innerText = `${pctA}%`;

  document.getElementById("votes-b-text").innerText =
    `${votes.B} Cod (${pctB}% )`;
  document.getElementById("bar-b").style.width = `${pctB}%`;
  document.getElementById("bar-b").innerText = `${pctB}%`;
}

// Marka ugu horeysa ee bogg la furo nidaamka keen
window.onload = function () {
  refreshAllVisuals();
};
