
// (function ($) {
//     "use strict";

    
//     /*==================================================================
//     [ Validate ]*/
//     var input = $('.validate-input .input100');

//     $('.validate-form').on('submit',function(){
//         var check = true;

//         for(var i=0; i<input.length; i++) {
//             if(validate(input[i]) == false){
//                 showValidate(input[i]);
//                 check=false;
//             }
//         }

//         return check;
//     });


//     $('.validate-form .input100').each(function(){
//         $(this).focus(function(){
//            hideValidate(this);
//         });
//     });

//     function validate (input) {
//         if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
//             if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
//                 return false;
//             }
//         }
//         else {
//             if($(input).val().trim() == ''){
//                 return false;
//             }
//         }
//     }

//     function showValidate(input) {
//         var thisAlert = $(input).parent();

//         $(thisAlert).addClass('alert-validate');
//     }

//     function hideValidate(input) {
//         var thisAlert = $(input).parent();

//         $(thisAlert).removeClass('alert-validate');
//     }
    
    

// })(jQuery);




// ...existing code...

// document.querySelector('.login100-form').addEventListener('submit', function(e) {
//   e.preventDefault();

//   // Set your valid credentials here
//   const validEmail = "admin@arahinfotech.com";
//   const validPassword = "Admin@123";

//   const email = this.email.value.trim();
//   const password = this.pass.value;

//   // Simple email format check
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (!emailPattern.test(email)) {
//     alert("Please enter a valid email address.");
//     return;
//   }

//   if (email !== validEmail || password !== validPassword) {
//     alert("Invalid email or password.");
//     return;
//   }

//   // On success, redirect to admin page
//   window.location.href = "/admin_career/admin.html";
// });

// document.querySelector('.login100-form').addEventListener('submit', function(e) {
//   e.preventDefault();

//   const defaultEmail = "admin@arahinfotech.com";
//   const defaultPassword = "Admin@123";

//   const savedPassword = localStorage.getItem("adminPassword") || defaultPassword;

//   const email = this.email.value.trim();
//   const password = this.pass.value;

//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (!emailPattern.test(email)) {
//     alert("Please enter a valid email address.");
//     return;
//   }

//   if (!(email === defaultEmail && password === savedPassword)) {
//     alert("Invalid email or password.");
//     return;
//   }

//   // ✅ Credentials match
//   window.location.href = "/admin_career/admin.html";
// });

document.querySelector('.login100-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const defaultEmail = "admin@arahinfotech.com";
  const defaultPassword = "Admin@123";
  const savedPassword = localStorage.getItem("adminPassword") || defaultPassword;

  const email = this.email.value.trim();
  const password = this.pass.value;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // ✅ Proper validation
  if (email !== defaultEmail || password !== savedPassword) {
    alert("Invalid email or password.");
    return;
  }

  // ✅ Redirect only if validation passes
  window.location.href = "/admin_career/admin.html";
});






// function promptResetByMobile() {
//   const correctMobile = "8919801095"; // ✅ Your registered admin number (without +91 or with it based on input format)
  
//   const enteredMobile = prompt("Enter your registered admin mobile number:"
//     + "\n\nNote: The mobile number shoul  d match the one registered Mobile Number(*******095)."
//   );

//   if (!enteredMobile) {
//     alert("Mobile number is required.");
//     return;
//   }

//   // Sanitize input (remove spaces, trim)
//   const cleaned = enteredMobile.trim().replace(/\s+/g, "");

//   if (cleaned === correctMobile || cleaned === "+91" + correctMobile) {
//     // ✅ Mobile matches — redirect to reset page
//     window.location.href = "/admin_career/login/admin_reset.html";
//   } else {
//     // ❌ Mobile number doesn't match
//     alert("Incorrect mobile number. Access denied.");
//   }
// }


function openMobileModal() {
  document.getElementById("mobileModal").style.display = "block";
}

function closeMobileModal() {
  document.getElementById("mobileModal").style.display = "none";
  document.getElementById("adminMobileInput").value = "";
  document.getElementById("mobileError").style.display = "none";
}

function validateAdminMobile() {
  const correctMobile = "8919801095"; // ✅ Your real admin mobile number
  const entered = document.getElementById("adminMobileInput").value.trim();
  const error = document.getElementById("mobileError");

  if (entered === correctMobile || correctMobile) {
    closeMobileModal();
    window.location.href = "/admin_career/login/admin_reset.html"; // ✅ Redirect if correct
  } else {
    error.style.display = "block";
  }
}

// Optional: Close modal if user clicks outside of it
window.onclick = function(event) {
  const modal = document.getElementById("mobileModal");
  if (event.target === modal) {
    closeMobileModal();
  }
}