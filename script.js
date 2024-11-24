document.addEventListener('DOMContentLoaded', function () {
    try {
        console.log("Initializing EmailJS...");
        emailjs.init("ghXddYA0ikWafyrWh"); // تأكد من أن المفتاح العام صحيح
        console.log("EmailJS initialized successfully.");
    } catch (error) {
        console.error("Error initializing EmailJS:", error);
    }
});

async function handleSubmit(event) {
    event.preventDefault();
    console.log("Started form submission...");

    const submitButton = document.getElementById("submit-order");
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");
    const loadingOverlay = document.getElementById("loading-overlay");

    errorMessage.style.display = "none";
    successMessage.style.display = "none";
    loadingOverlay.style.display = "flex";

    try {
        submitButton.disabled = true;

        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
        const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;
        const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
        const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;
        const pickupTime = document.getElementById("pickup-time").value;

        if (!name) {
            alert("يرجى إدخال الاسم");
            submitButton.disabled = false;
            loadingOverlay.style.display = "none";
            return;
        }

        if (!pickupTime) {
            alert("يرجى اختيار وقت الاستلام");
            submitButton.disabled = false;
            loadingOverlay.style.display = "none";
            return;
        }

        if (beefQuantity === 0 && chickenQuantity === 0) {
            alert("يرجى اختيار وجبة واحدة على الأقل");
            submitButton.disabled = false;
            loadingOverlay.style.display = "none";
            return;
        }

        const templateParams = {
            from_name: name,
            to_name: "BeetyFood Team",
            phone: phone || "لم يتم إدخال رقم هاتف",
            pickup_time: pickupTime,
            message: "طلب جديد من العميل",
            beefQuantity: beefQuantity,
            chickenQuantity: chickenQuantity,
            sideDish1: sideDish1,
            sideDish2: sideDish2,
        };

        console.log("Template Params:", templateParams);

        const response = await emailjs.send("service_t9ogwct", "template_0hkm9zd", templateParams);

        console.log("EmailJS Response:", response);

        if (response.status === 200) {
            successMessage.textContent = "تم إرسال الطلب بنجاح! شكراً لطلبك.";
            successMessage.style.display = "block";
            document.getElementById("orderForm").reset();
            updateTotal();
            updateSideDishes();
        } else {
            throw new Error(`فشل الإرسال: ${response.text}`);
        }
    } catch (error) {
        console.error("Error during form submission:", error);
        errorMessage.textContent = error.message || "حدث خطأ أثناء إرسال الطلب. يرجى التحقق من البيانات.";
        errorMessage.style.display = "block";
    } finally {
        submitButton.disabled = false;
        loadingOverlay.style.display = "none";
    }
}
