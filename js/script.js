document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", function (e) {

            e.preventDefault();

            navbar.classList.toggle("active");

        });


        navbar.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navbar.classList.remove("active");

            });

        });

    }


    /* =========================================
       FAST SAME-PAGE SCROLL
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            e.preventDefault();

            const header = document.querySelector(".header");

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            const startPosition =
                window.pageYOffset;

            const distance =
                targetPosition - startPosition;

            const duration = Math.min(
                450,
                Math.max(
                    220,
                    Math.abs(distance) * 0.35
                )
            );

            const startTime =
                performance.now();


            function easeOutCubic(t) {

                return 1 - Math.pow(1 - t, 3);

            }


            function animateScroll(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );

                const easedProgress =
                    easeOutCubic(progress);


                window.scrollTo(
                    0,
                    startPosition +
                    (distance * easedProgress)
                );


                if (progress < 1) {

                    requestAnimationFrame(
                        animateScroll
                    );

                }

            }


            requestAnimationFrame(
                animateScroll
            );

        });

    });


    /* =========================================
       BOOKING FORM VALIDATION + EMAILJS
    ========================================= */

    const bookingForm =
        document.getElementById("bookingForm");


    if (bookingForm) {

        const nameInput =
            document.getElementById("from_name");

        const phoneInput =
            document.getElementById("phone");

        const emailInput =
            document.getElementById("email");

        const serviceInput =
            document.getElementById("service");

        const requirementsInput =
            document.getElementById("requirements");


        /* =========================================
           ERROR ELEMENTS
        ========================================= */

        const nameError =
            document.getElementById("nameError");

        const phoneError =
            document.getElementById("phoneError");

        const emailError =
            document.getElementById("emailError");

        const serviceError =
            document.getElementById("serviceError");

        const requirementsError =
            document.getElementById(
                "requirementsError"
            );


        /* =========================================
           VALIDATION FUNCTIONS
        ========================================= */

        function showError(input, errorElement, message) {

            input.classList.add("error");
            input.classList.remove("success");

            errorElement.innerText = message;
            errorElement.style.display = "block";

        }


        function showSuccess(input, errorElement) {

            input.classList.remove("error");
            input.classList.add("success");

            errorElement.innerText = "";
            errorElement.style.display = "none";

        }


        /* =========================================
           NAME VALIDATION
        ========================================= */

        function validateName() {

            const name =
                nameInput.value.trim();

            const namePattern =
                /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;


            if (name === "") {

                showError(
                    nameInput,
                    nameError,
                    "Please enter your full name."
                );

                return false;

            }


            if (name.length < 3) {

                showError(
                    nameInput,
                    nameError,
                    "Name must contain at least 3 characters."
                );

                return false;

            }


            if (!namePattern.test(name)) {

                showError(
                    nameInput,
                    nameError,
                    "Name should contain letters and spaces only."
                );

                return false;

            }


            showSuccess(
                nameInput,
                nameError
            );

            return true;

        }


        /* =========================================
           PHONE VALIDATION
        ========================================= */

        function validatePhone() {

            const phone =
                phoneInput.value.trim();

            const phonePattern =
                /^[6-9][0-9]{9}$/;


            if (phone === "") {

                showError(
                    phoneInput,
                    phoneError,
                    "Please enter your mobile number."
                );

                return false;

            }


            if (!/^[0-9]+$/.test(phone)) {

                showError(
                    phoneInput,
                    phoneError,
                    "Mobile number should contain digits only."
                );

                return false;

            }


            if (phone.length !== 10) {

                showError(
                    phoneInput,
                    phoneError,
                    "Mobile number must contain exactly 10 digits."
                );

                return false;

            }


            if (!phonePattern.test(phone)) {

                showError(
                    phoneInput,
                    phoneError,
                    "Please enter a valid Indian mobile number."
                );

                return false;

            }


            showSuccess(
                phoneInput,
                phoneError
            );

            return true;

        }


        /* =========================================
           EMAIL VALIDATION
        ========================================= */

        function validateEmail() {

            const email =
                emailInput.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


            if (email === "") {

                showError(
                    emailInput,
                    emailError,
                    "Please enter your email address."
                );

                return false;

            }


            if (!emailPattern.test(email)) {

                showError(
                    emailInput,
                    emailError,
                    "Please enter a valid email address."
                );

                return false;

            }


            showSuccess(
                emailInput,
                emailError
            );

            return true;

        }


        /* =========================================
           SERVICE VALIDATION
        ========================================= */

        function validateService() {

            if (serviceInput.value === "") {

                showError(
                    serviceInput,
                    serviceError,
                    "Please select a service."
                );

                return false;

            }


            showSuccess(
                serviceInput,
                serviceError
            );

            return true;

        }


        /* =========================================
           REQUIREMENTS VALIDATION
        ========================================= */

        function validateRequirements() {

            const requirements =
                requirementsInput.value.trim();


            if (requirements === "") {

                showError(
                    requirementsInput,
                    requirementsError,
                    "Please enter your travel requirements."
                );

                return false;

            }


            if (requirements.length < 10) {

                showError(
                    requirementsInput,
                    requirementsError,
                    "Please enter at least 10 characters."
                );

                return false;

            }


            showSuccess(
                requirementsInput,
                requirementsError
            );

            return true;

        }


        /* =========================================
           REAL-TIME VALIDATION
        ========================================= */

        nameInput.addEventListener(
            "input",
            validateName
        );

        phoneInput.addEventListener(
            "input",
            function () {

                // Only numbers
                this.value =
                    this.value.replace(/\D/g, "");

                validatePhone();

            }
        );

        emailInput.addEventListener(
            "input",
            validateEmail
        );

        serviceInput.addEventListener(
            "change",
            validateService
        );

        requirementsInput.addEventListener(
            "input",
            validateRequirements
        );


        /* =========================================
           EMAILJS INITIALIZATION
        ========================================= */

        if (typeof emailjs === "undefined") {

            console.error(
                "EmailJS CDN is not loaded."
            );

        } else {

            emailjs.init({

                publicKey:
                    "zqQmPdIzAW2PR3E8x"

            });

        }


        /* =========================================
           FORM SUBMIT
        ========================================= */

        bookingForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                /* Run all validation */

                const isNameValid =
                    validateName();

                const isPhoneValid =
                    validatePhone();

                const isEmailValid =
                    validateEmail();

                const isServiceValid =
                    validateService();

                const isRequirementsValid =
                    validateRequirements();


                /* Stop submission if invalid */

                if (
                    !isNameValid ||
                    !isPhoneValid ||
                    !isEmailValid ||
                    !isServiceValid ||
                    !isRequirementsValid
                ) {

                    return;

                }


                /* =================================
                   EMAILJS
                ================================= */

                const bookNowBtn =
                    document.getElementById(
                        "bookNowBtn"
                    );

                const bookingMessage =
                    document.getElementById(
                        "bookingMessage"
                    );


                if (bookNowBtn) {

                    bookNowBtn.disabled = true;

                    bookNowBtn.innerText =
                        "Sending...";

                }


                if (bookingMessage) {

                    bookingMessage.className =
                        "booking-message";

                    bookingMessage.innerText = "";

                }


                emailjs.sendForm(
                    "service_nblknqq",
                    "template_7c7inqs",
                    bookingForm
                )


                .then(function () {

                    console.log(
                        "Booking email sent successfully."
                    );


                    if (bookingMessage) {

                        bookingMessage.className =
                            "booking-message success";

                        bookingMessage.innerText =
                            "Thank you! Your booking enquiry has been sent successfully.";

                    }


                    alert(
                        "Thank you! Your booking enquiry has been sent successfully."
                    );


                    bookingForm.reset();


                    /* Remove green validation */

                    [
                        nameInput,
                        phoneInput,
                        emailInput,
                        serviceInput,
                        requirementsInput
                    ].forEach(function (input) {

                        input.classList.remove(
                            "success",
                            "error"
                        );

                    });


                    if (bookNowBtn) {

                        bookNowBtn.disabled = false;

                        bookNowBtn.innerText =
                            "Book Now";

                    }

                })


                .catch(function (error) {

                    console.error(
                        "EmailJS Error:",
                        error
                    );


                    if (bookingMessage) {

                        bookingMessage.className =
                            "booking-message error";

                        bookingMessage.innerText =
                            "Sorry! Your booking enquiry could not be sent. Please try again.";

                    }


                    alert(
                        "Sorry! Your booking enquiry could not be sent. Please try again."
                    );


                    if (bookNowBtn) {

                        bookNowBtn.disabled = false;

                        bookNowBtn.innerText =
                            "Book Now";

                    }

                });

            }
        );

    }

});