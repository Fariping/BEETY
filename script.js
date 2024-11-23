document.addEventListener('DOMContentLoaded', function () {
    // استبدل YOUR_PUBLIC_KEY بالمفتاح الخاص بك من EmailJS
    emailjs.init("-_n0qbKnDcV32oAOP");
});

async function handleSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById("submit-order");
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "none"; // إخفاء رسالة الخطأ أولاً

    try {
        submitButton.disabled = true;

        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
        const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;
        const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
        const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;

        if (beefQuantity === 0 && chickenQuantity === 0) {
            throw new Error("يرجى اختيار وجبة واحدة على الأقل");
        }

        const templateParams = {
            from_name: name,
            phone: phone,
            beefQuantity,
            chickenQuantity,
            sideDish1,
            sideDish2
        };

        const response = await emailjs.send(
            "service_t9ogwct", 
            "template_0hkm9zd", 
            templateParams
        );

        if (response.status === 200) {
            alert("تم إرسال الطلب بنجاح!");
            document.getElementById("orderForm").reset();
        } else {
            throw new Error(`فشل الإرسال: ${response.text}`);
        }
    } catch (error) {
        console.error("Error details:", error);
        errorMessage.textContent = error.message || "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.";
        errorMessage.style.display = "block";
    } finally {
        submitButton.disabled = false;
    }
}
