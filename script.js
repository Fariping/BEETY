// تهيئة EmailJS
(function() {
    emailjs.init("your_user_id"); // استبدل `your_user_id` بمعرف EmailJS الخاص بك
})();

// دالة للتحقق من عدد الأطباق الجانبية
function validateSideDishes() {
    const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
    const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;
    const totalMeals = beefQuantity + chickenQuantity;

    const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
    const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;
    const totalSideDishes = sideDish1 + sideDish2;

    if (totalSideDishes > totalMeals) {
        alert(`يمكنك اختيار ${totalMeals} أطباق جانبية فقط بناءً على عدد الوجبات.`);
        return false;
    }

    return true;
}

// إرسال الطلب
document.getElementById("submit-order").addEventListener("click", function () {
    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;

    const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
    const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;

    const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
    const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;

    if (!name || !phone) {
        alert("يرجى إدخال الاسم ورقم الجوال.");
        return;
    }

    if (!validateSideDishes()) {
        return;
    }

    // إرسال البريد الإلكتروني
    const templateParams = {
        name: name,
        phone: phone,
        beefQuantity: beefQuantity,
        chickenQuantity: chickenQuantity,
        sideDish1: sideDish1,
        sideDish2: sideDish2
    };

    emailjs.send("service_id", "template_id", templateParams)
        .then(function(response) {
            alert("تم إرسال الطلب بنجاح!");
        }, function(error) {
            alert("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.");
        });
});
