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

    // تحقق من المدخلات
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

    // حساب السعر الإجمالي
    const totalPrice = (beefQuantity * 15) + (chickenQuantity * 8);

    // إعداد نص الرسالة
    const messageContent = `طلب جديد بقيمة ${totalPrice} ريال`;

    const templateParams = {
        to_name: "BeetyFood",
        from_name: name,
        message: messageContent,
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

// تحديث السعر الإجمالي عند تغيير الكميات
function updateTotalPrice() {
    const beefQty = parseInt(document.getElementById("beef-meal").value) || 0;
    const chickenQty = parseInt(document.getElementById("chicken-meal").value) || 0;
    const totalPrice = (beefQty * 15) + (chickenQty * 8);
    
    // إذا كان لديك عنصر لعرض السعر الإجمالي
    const totalPriceElement = document.getElementById("total-price-display");
    if (totalPriceElement) {
        totalPriceElement.textContent = `السعر الإجمالي: ${totalPrice} ريال`;
    }
}

// إضافة مستمعي الأحداث لتحديث السعر
document.getElementById("beef-meal").addEventListener("input", updateTotalPrice);
document.getElementById("chicken-meal").addEventListener("input", updateTotalPrice);

// تحديث السعر عند تحميل الصفحة
updateTotalPrice();
