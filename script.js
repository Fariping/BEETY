document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form');
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (typeof emailjs === 'undefined') {
            console.error("EmailJS not loaded");
            alert("خطأ في تحميل نظام الإرسال. يرجى تحديث الصفحة.");
            return;
        }

        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
        const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;
        const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
        const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;

        // حساب السعر الإجمالي
        const totalPrice = (beefQuantity * 15) + (chickenQuantity * 8);

        const templateParams = {
            from_name: name,
            phone: phone,
            beefQuantity: beefQuantity,
            chickenQuantity: chickenQuantity,
            sideDish1: sideDish1,
            sideDish2: sideDish2,
            total_price: totalPrice
        };

        console.log("Sending data:", templateParams);

        const submitButton = document.getElementById("submit-order");
        submitButton.disabled = true;
        submitButton.textContent = "جاري إرسال الطلب...";

        emailjs.send("service_t9ogwct", "template_0hkm9zd", templateParams)
            .then(function(response) {
                console.log("SUCCESS!", response.status, response.text);
                alert("تم إرسال الطلب بنجاح!");
                orderForm.reset();
            })
            .catch(function(error) {
                console.error("FAILED...", error);
                console.log("Error details:", {
                    text: error.text,
                    status: error.status,
                    name: error.name
                });
                alert("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.");
            })
            .finally(function() {
                submitButton.disabled = false;
                submitButton.textContent = "إرسال الطلب";
            });
    });
});
