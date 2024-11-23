// تهيئة EmailJS عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("-_n0qbKnDcV32oAOP");
});

async function handleSubmit(event) {
    event.preventDefault();
    
    // تعطيل زر الإرسال
    const submitButton = document.getElementById("submit-order");
    submitButton.disabled = true;
    
    try {
        // جمع البيانات
        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
        const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;
        const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
        const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;

        // التحقق من وجود طلب على الأقل
        if (beefQuantity === 0 && chickenQuantity === 0) {
            throw new Error("يرجى اختيار وجبة واحدة على الأقل");
        }

        // إعداد البيانات للإرسال
        const templateParams = {
            from_name: name,
            phone: phone,
            beefQuantity,
            chickenQuantity,
            sideDish1,
            sideDish2
        };

        // إرسال البريد
        const response = await emailjs.send(
            "service_t9ogwct", 
            "template_0hkm9zd", 
            templateParams
        );

        if (response.status === 200) {
            alert("تم إرسال الطلب بنجاح!");
            document.getElementById("orderForm").reset();
        }

    } catch (error) {
        console.error("Error:", error);
        alert(error.message || "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.");
    } finally {
        // إعادة تفعيل زر الإرسال
        submitButton.disabled = false;
    }
}

// دالة التحقق من الأطباق الجانبية
function validateSideDishes() {
    const beefQuantity = parseInt(document.getElementById('beef-meal').value) || 0;
    const chickenQuantity = parseInt(document.getElementById('chicken-meal').value) || 0;
    const sideDish1 = parseInt(document.getElementById('side-dish-1').value) || 0;
    const sideDish2 = parseInt(document.getElementById('side-dish-2').value) || 0;

    const totalMeals = beefQuantity + chickenQuantity;
    const totalSides = sideDish1 + sideDish2;

    if (totalSides > totalMeals) {
        alert('عدد الأطباق الجانبية لا يمكن أن يتجاوز عدد الوجبات');
        document.getElementById('side-dish-1').value = '';
        document.getElementById('side-dish-2').value = '';
    }
}
