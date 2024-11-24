document.addEventListener('DOMContentLoaded', function () {
    // استبدل YOUR_PUBLIC_KEY بالمفتاح الخاص بك من EmailJS
    emailjs.init("ghXddYA0ikWafyrWh");
});
async function handleSubmit(event) {
    event.preventDefault();
    const submitButton = document.getElementById("submit-order");
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");
    // إخفاء الرسائل السابقة
    errorMessage.style.display = "none";
    successMessage.style.display = "none";
    try {
        submitButton.disabled = true;
        // جمع البيانات
        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim(); // الهاتف اختياري
        const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
        const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;
        const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
        const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;
        // تحقق من إدخال الاسم فقط
        if (!name) {
            alert("يا تيس اكتب اسمك");
            submitButton.disabled = false;
            return;
        }
        // تحقق من وجود طلب على الأقل
        if (beefQuantity === 0 && chickenQuantity === 0) {
            alert("يرجى اختيار وجبة واحدة على الأقل");
            submitButton.disabled = false;
            return;
        }
        const templateParams = {
            from_name: name,
            to_name: "BeetyFood Team",
            phone: phone || "لم يتم إدخال رقم هاتف", // إذا لم يتم إدخال الهاتف، يُرسل نص افتراضي
            message: "طلب جديد من العميل",
            beefQuantity: beefQuantity,
            chickenQuantity: chickenQuantity,
            sideDish1: sideDish1,
            sideDish2: sideDish2
        };
        // إرسال الطلب عبر EmailJS
        const response = await emailjs.send(
            "service_t9ogwct", 
            "template_0hkm9zd", 
            templateParams
        );
        if (response.status === 200) {
            successMessage.textContent = "تم إرسال الطلب بنجاح! شكراً لطلبك.";
            successMessage.style.display = "block";
            document.getElementById("orderForm").reset();
        } else {
            throw new Error(فشل الإرسال: ${response.text});
        }
    } catch (error) {
        console.error("تفاصيل الخطأ:", error);
        errorMessage.textContent = error.message || "حدث خطأ أثناء إرسال الطلب. يرجى التحقق من البيانات.";
        errorMessage.style.display = "block";
    } finally {
        submitButton.disabled = false;
    }
}
