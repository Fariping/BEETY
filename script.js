
// تهيئةEmailJS


//  عند الضغط على زر الإرسال
document.getElementById("submit-order").addEventListener("click", function () {
    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;

    const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
    const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;

    const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
    const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;

    // التحقق من إدخال الاسم ورقم الهاتف
    if (!name || !phone) {
        alert("يرجى إدخال الاسم ورقم الجوال.");
        return;
    }

    // حساب إجمالي الأطباق الجانبية والوجبات
    const totalMeals = beefQuantity + chickenQuantity;
    const totalSideDishes = sideDish1 + sideDish2;

    // التحقق من أن الأطباق الجانبية لا تتجاوز عدد الوجبات
    if (totalSideDishes > totalMeals) {
        alert("عدد الأطباق الجانبية لا يمكن أن يتجاوز عدد الوجبات.");
        return;
    }

    // إعداد البيانات للإرسال
    const templateParams = {
        from_name: name,
        phone: phone,
        beefQuantity: beefQuantity,
        chickenQuantity: chickenQuantity,
        sideDish1: sideDish1,
        sideDish2: sideDish2,
    };

    emailjs.init("-_n0qbKnDcV32oAOP");
// إرسال البريد باستخدام EmailJS
    emailjs
        .send("service_t9ogwct", "template_default", templateParams)
        .then(function (response) {
            alert("تم إرسال الطلب بنجاح!");
        })
        .catch(function (error) {
            console.error("حدث خطأ أثناء إرسال الطلب:", error);
            alert("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.");
        });
});
