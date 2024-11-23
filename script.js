document.addEventListener('DOMContentLoaded', function () {
    // استبدل YOUR_PUBLIC_KEY بالمفتاح الخاص بك من EmailJS
    emailjs.init("ghXddYA0ikWafyrWh");
});

async function handleSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById("submit-order");
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "none"; // إخفاء رسالة الخطأ أولاً

    try {
        submitButton.disabled = true;

        // جمع البيانات من الحقول
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

        // إعداد المتغيرات للإرسال
        const templateParams = {
            from_name: name, // اسم العميل
            to_name: "BeetyFood Team", // اسم المستقبل (ثابت)
            phone: phone, // رقم الجوال
            message: "طلب جديد من العميل", // رسالة ثابتة
            beefQuantity: beefQuantity, // عدد وجبات اللحم
            chickenQuantity: chickenQuantity, // عدد وجبات الدجاج
            sideDish1: sideDish1, // الأطباق الجانبية 1
            sideDish2: sideDish2 // الأطباق الجانبية 2
        };

        // إرسال الطلب عبر EmailJS
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
        errorMessage.textContent = error.message || "حدث خطأ أثناء إرسال الطلب. يرجى التحقق من البيانات.";
        errorMessage.style.display = "block";
    } finally {
        submitButton.disabled = false;
    }
}
