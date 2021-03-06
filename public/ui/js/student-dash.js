$(document).ready(function() {
  var user;
  user = localStorage.getItem("student_email");
  let studentId = localStorage.getItem("student_Id");
  $.ajax({
    type: "GET",
    url: `${baseUrl}students?id=${studentId}`,
    success: function(data) {
      let cgpa = data[0].cgpa;

      $("#name").text(`${data[0].firstname} ${data[0].lastname}`);
      $("tr #email").text(`${data[0].email}`);
      $("tr #matric").text(`${data[0].matric}`);
      $("tr #department").text(`${data[0].department}`);
      $("tr #faculty").text(`${data[0].faculty}`);
      $("tr #admission_year").text(`${data[0].adm_year}`);
      $("tr #graduation_year").text(`${data[0].grad_year}`);
      $("tr #gender").text(`${data[0].gender}`);

      if (cgpa >= 4.5) {
        class_of_degree = "First Class";
      } else if (cgpa >= 3.5 && cgpa < 4.5) {
        class_of_degree = "Second Class (upper)";
      } else if (cgpa >= 2.5 && cgpa < 3.5) {
        class_of_degree = "Second Class (lower)";
      } else if (cgpa >= 1.5 && cgpa < 2.5) {
        class_of_degree = "Third Class";
      } else {
        class_of_degree = "Fail";
      }
      $("tr #class_of_degree").text(class_of_degree);
    },
    error: function() {
      alert("something is wrong with the server, please reload the page");
    }
  });

  //   Payments Data
  $.get(
    `${baseUrl}payments?studentId=${studentId}&_expand=transcript&_sort=id&_order=desc`,
    function(data) {
      let tableBody = $("#payBody");
      let i = 0;
      for (const row of data) {
        let id = createNode("th", ++i);
        let email = createNode("td", row.transcript.email_to);
        let amount = createNode("td", formatAmt(row.amount));
        let date = createNode("td", formatDate(row.payment_date));

        let tableRow = createNode("tr");

        append(tableRow, id);
        append(tableRow, email);
        append(tableRow, amount);
        append(tableRow, date);

        // Append row to table body
        tableBody.append(tableRow);
      }
    }
  );

  // Transcripts Data
  $.get(`${baseUrl}transcripts?studentId=${studentId}&_sort=id&_order=desc`, function(data) {
    let tableBody = $("#transBody");
    let i = 0;
    for (const row of data) {
      let id = createNode("th", ++i);
      let email = createNode("td", row.email_to);
      let quantity = createNode("td", row.quantity);
      let date = createNode("td", formatDate(row.date_issued));

      let tableRow = createNode("tr");

      append(tableRow, id);
      append(tableRow, email);
      append(tableRow, quantity);
      append(tableRow, date);

      // Append row to table body
      tableBody.append(tableRow);
    }
  });

  $("#apply-btn").click(function() {
    event.preventDefault();
    window.location = "../student/transcript.html?user-login=" + user;
  });
});

// Create html element with textContent
function createNode(element, text) {
  let node = document.createElement(element);
  if (text) {
    node.innerHTML = `${text}`;
  }
  return node;
}
// Append child to parent
function append(parent, el) {
  return parent.appendChild(el);
}
// Format date
function formatDate(date) {
  if (date === "") {
    return "USER STILL LOGGED IN!";
  }
  if (date === undefined) {
    return;
  }
  let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };

  let dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", options);
}
// Format payments
function formatAmt(amt) {
  let currency = amt.slice(0, amt.length - 3);
  return currency.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
