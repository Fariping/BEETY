// في ملف JavaScript (script.js)
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form');
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // التحقق من وجود EmailJS
        if (typeof emailjs === 'undefined') {
            console.error("EmailJS not loaded");
            alert("خطأ في تحميل نظام الإرسال. يرجى تحديث الصفحة.");
            return;
        }

        // جمع البيانات
        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
        const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;
        const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
        const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;

        // طباعة البيانات للتحقق
        console.log("Form Data:", {
            name,
            phone,
            beefQuantity,
            chickenQuantity,
            sideDish1,
            sideDish2
        });

        const templateParams = {
            from_name: name,
            phone: phone,
            beef_quantity: beefQuantity,
            chicken_quantity: chickenQuantity,
            side_dish1: sideDish1,
            side_dish2: sideDish2,
            total_price: (beefQuantity + chickenQuantity) * 15
        };

        // طباعة البيانات التي سيتم إرسالها
        console.log("Sending data:", templateParams);

        const submitButton = document.getElementById("submit-order");
        submitButton.disabled = true;
        submitButton.textContent = "جاري إرسال الطلب...";

        // إرسال البريد مع تفاصيل الخطأ
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
                alert("حدث خطأ أثناء إرسال الطلب: " + error.text);
            })
            .finally(function() {
                submitButton.disabled = false;
                submitButton.textContent = "إرسال الطلب";
            });
    });
});
