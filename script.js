document.addEventListener('DOMContentLoaded', function () {
    // استبدل YOUR_PUBLIC_KEY بالمفتاح الخاص بك من EmailJS
    emailjs.init("ghXddYA0ikWafyrWh");
});

// تحديث إجمالي الأطباق الجانبية المسموح بها
function updateTotal() {
    const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
    const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;
    const totalMeals = beefQuantity + chickenQuantity;

    // تحديث الحد الأقصى للأطباق الجانبية
    document.getElementById("side-dish-1").max = totalMeals;
    document.getElementById("side-dish-2").max = totalMeals;

    // تحديث الإجمالي
    const totalAmount = (beefQuantity * 15) + (chickenQuantity * 8); // مثال لحساب السعر
    document.getElementById("total-amount").textContent = totalAmount;
}

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
// جمع البيانات
const name = document.getElementById("customer-name").value.trim();
const phone = document.getElementById("customer-phone").value.trim() || "لم يتم إدخال رقم هاتف";
const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;
const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;
const pickupTime = document.getElementById("pickup-time").value;

// تحقق من إدخال الاسم
if (!name) {
    alert("يرجى إدخال الاسم");
    submitButton.disabled = false;
    return;
}

// تحقق من وجود طلب على الأقل
if (beefQuantity === 0 && chickenQuantity === 0) {
    alert("يرجى اختيار وجبة واحدة على الأقل");
    submitButton.disabled = false;
    return;
}

// تحقق من اختيار وقت الاستلام
if (!pickupTime) {
    alert("يرجى اختيار وقت استلام الطلب");
    submitButton.disabled = false;
    return;
}

// التحقق من أن الأطباق الجانبية لا تتجاوز الحد المسموح به
const totalMeals = beefQuantity + chickenQuantity;
if (sideDish1 + sideDish2 > totalMeals) {
    alert(`لا يمكن اختيار أكثر من ${totalMeals} أطباق جانبية`);
    submitButton.disabled = false;
    return;
}

// متابعة العملية إذا كانت البيانات صحيحة
const templateParams = {
    from_name: name,
    phone: phone,
    pickup_time: pickupTime,
    beefQuantity: beefQuantity,
    chickenQuantity: chickenQuantity,
    sideDish1: sideDish1,
    sideDish2: sideDish2
};


        // إرسال الطلب عبر EmailJS
        const response = await emailjs.send(
            "service_t9ogwct",
            "template_0hkm9z",
            templateParams
        );

        if (response.status === 200) {
            document.getElementById("successModal").classList.add('show');
            document.getElementById("orderForm").reset();
             updateTotal(); // إعادة ضبط الإجمالي بعد الإرسال
        } else {
            throw new Error(`فشل الإرسال: ${response.text}`);
        }
    } catch (error) {
        console.error("تفاصيل الخطأ:", error);
        errorMessage.textContent = error.message || "نعتذر منكم نفذت الكميه ، ناخذ طلبكم السبت القادم";
        errorMessage.style.display = "block";
    } finally {
        submitButton.disabled = false;
    }
   
}
 function closeModal(){
        document.getElementById("successModal").classList.remove('show');
    }
