var nav_name = $("span#username");
var student_name = localStorage.getItem("student_name");
nav_name.text(student_name);

$(document).ready(function() {
  var selectedPurpose = "personal";
  var nos = 1;
  $("span#email_error_message").hide();
  var error_email = false;
  var email2 = "b@b.com";
  var email3 = "a@a.com";

  $("select.purpose").change(function() {
    selectedPurpose = $(this)
      .children("option:selected")
      .val();
    if (selectedPurpose == "academic") {
      nos = 1;
      $("#label").text("Email " + nos);
      $("#add-btn").css("display", "inline-block");
      $("div.hide-amount").text(nos);
    } else {
      $("tr#academic_2").remove();
      $("tr#academic_3").remove();
      $("#label").text("Email");
      $("#add-btn").css("display", "none");
      $("#add-btn").removeAttr("disabled");
      nos = 1;
      $("div.hide-amount").text(nos);
    }
    check_email();
  });

  $("#add-btn").click(function() {
    nos++;
    var tr =
      '<tr id="academic_' +
      nos +
      '"><td id="right"><label>Email ' +
      nos +
      '</label></td><td id="left"><input type="email" id="email-' +
      nos +
      '" name="email-' +
      nos +
      '" placeholder="abc@yahoo.com" autofocus></td></tr>';
    $(".apply-form table tbody").append(tr);
    $("div.hide-amount").text(nos);
    if (nos === 3) {
      $("#add-btn").attr("disabled", "disabled");
    }

    $("#payment-button-container").hide();
      $("#get-link").show();
  });

  $('input[type="email"]').focusout(function() {
    check_email();
  });
  $(document).on("focusout", "#email-2", function() {
    email2 = $(this).val();
    $("#payment-button-container").hide();
      $("#get-link").show();
    check_email();
  });
  $(document).on("focusout", "#email-3", function() {
    email3 = $(this).val();
    $("#payment-button-container").hide();
      $("#get-link").show();
    check_email();
  });

  function check_email() {
    var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var email = $('input[type="email"]').val();

    if(gomail){
      email2 = "b@b.com";
      email3 = "a@a.com";
    }

    if ((
      (pattern.test(email) &&
      email !== "") &&
      (pattern.test(email2) && email2 !== "") &&
      (pattern.test(email3) && email3 !== "")) && ((email!=email2)&&(email2!=email3)&&(email!=email3))
    ) {
      $("span#email_error_message").hide();
      $('input[type="email"]').css("border-bottom", "2px solid #34f458");
    } else {
      $("span#email_error_message").html("Invalid Email");
      $("span#email_error_message").show();
      $('input[type="email"]').css("border-bottom", "2px solid #F90A0A");

      $("#payment-button-container").hide();
      $("#get-link").show();
      error_email = true;
    }
  }

  $("#get-link").click(function() {
    error_email = false;
    check_email();
    if (error_email === false) {
      $("#payment-button-container").show();
      $("#get-link").hide();
    } else {
      swal({
        title: "Error!",
        text: "Invalid email(s) Please check and try again",
        icon: "error",
        button: "Close"
      });
    }
  });

  $('#trans-form :input').keyup(function(){
    $("#payment-button-container").hide();
      $("#get-link").show();
  });

});
