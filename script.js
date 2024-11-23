document.getElementById("submit-order").addEventListener("click", function () {
    // التحقق من تحميل EmailJS
    if (typeof emailjs === 'undefined') {
        alert("خطأ في تحميل نظام الإرسال. يرجى تحديث الصفحة.");
        return;
    }

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();

    const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
    const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;
    const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
    const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;

    // تحقق أكثر صرامة من المدخلات
    if (!name || name.length < 2) {
        alert("يرجى إدخال اسم صحيح");
        return;
    }

    if (!phone || phone.length < 8) {
        alert("يرجى إدخال رقم جوال صحيح");
        return;
    }

    const totalMeals = beefQuantity + chickenQuantity;
    if (totalMeals === 0) {
        alert("يرجى اختيار وجبة واحدة على الأقل");
        return;
    }

    const totalSideDishes = sideDish1 + sideDish2;
    if (totalSideDishes > totalMeals) {
        alert("عدد الأطباق الجانبية لا يمكن أن يتجاوز عدد الوجبات");
        return;
    }

    // إظهار رسالة تحميل
    const submitButton = document.getElementById("submit-order");
    submitButton.disabled = true;
    submitButton.textContent = "جاري إرسال الطلب...";

    const templateParams = {
        from_name: name,
        phone: phone,
        beefQuantity: beefQuantity,
        chickenQuantity: chickenQuantity,
        sideDish1: sideDish1,
        sideDish2: sideDish2
    };

    emailjs.send("service_t9ogwct", "template_0hkm9zd", templateParams)
        .then(function (response) {
            alert("تم إرسال الطلب بنجاح!");
            // إعادة تعيين النموذج
            document.getElementById("order-form").reset();
        })
        .catch(function (error) {
            console.error("Error:", error);
            alert("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.");
        })
        .finally(function() {
            // إعادة تفعيل الزر
            submitButton.disabled = false;
            submitButton.textContent = "إرسال الطلب";
        });
});
