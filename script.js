document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("ghXddYA0ikWafyrWh");
});
// تحديث عدد الأطباق الجانبية المتاحة
function updateSideDishes() {
    const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
    const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;
    const totalMeals = beefQuantity + chickenQuantity;
    
    const sideDish1 = document.getElementById("side-dish-1");
    const sideDish2 = document.getElementById("side-dish-2");
    
    // إعادة تعيين القيم
    sideDish1.value = "0";
    sideDish2.value = "0";
    
    if (totalMeals > 0) {
        sideDish1.max = totalMeals;
        sideDish2.max = totalMeals;
        sideDish1.disabled = false;
        sideDish2.disabled = false;
    } else {
        sideDish1.disabled = true;
        sideDish2.disabled = true;
    }
}

// تحديث النص الأصلي للـ handleSubmit مع إضافة وقت الاستلام
async function handleSubmit(event) {
    event.preventDefault();
    const submitButton = document.getElementById("submit-order");
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");
    const loadingOverlay = document.getElementById("loading-overlay");
    
    errorMessage.style.display = "none";
    successMessage.style.display = "none";
    loadingOverlay.style.display = "flex";
    
    try {
        submitButton.disabled = true;
        
        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
        const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;
        const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
        const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;
        const pickupTime = document.getElementById("pickup-time").value;
        
        if (!name) {
            alert("يرجى إدخال الاسم");
            return;
        }
        
        if (!pickupTime) {
            alert("يرجى اختيار وقت الاستلام");
            return;
        }
        
        if (beefQuantity === 0 && chickenQuantity === 0) {
            alert("يرجى اختيار وجبة واحدة على الأقل");
            return;
        }
        
        const templateParams = {
            from_name: name,
            to_name: "BeetyFood Team",
            phone: phone || "لم يتم إدخال رقم هاتف",
            pickup_time: pickupTime,
            message: "طلب جديد من العميل",
            beefQuantity: beefQuantity,
            chickenQuantity: chickenQuantity,
            sideDish1: sideDish1,
            sideDish2: sideDish2
        };
        
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
            throw new Error(`فشل الإرسال: ${response.text}`);
        }
    } catch (error) {
        console.error("تفاصيل الخطأ:", error);
        errorMessage.textContent = error.message || "حدث خطأ أثناء إرسال الطلب. يرجى التحقق من البيانات.";
        errorMessage.style.display = "block";
    } finally {
        submitButton.disabled = false;
        loadingOverlay.style.display = "none";
    }
}
