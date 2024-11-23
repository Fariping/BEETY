// تهيئة EmailJS عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("-_n0qbKnDcV32oAOP");
});

// التحقق من صحة رقم الهاتف
function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

// التحقق من الكميات
function validateQuantities(beefQty, chickenQty, side1Qty, side2Qty) {
    const totalMeals = beefQty + chickenQty;
    const totalSides = side1Qty + side2Qty;
    
    if (totalMeals === 0) {
        throw new Error("يرجى اختيار وجبة واحدة على الأقل");
    }
    
    if (totalSides > totalMeals) {
        throw new Error("عدد الأطباق الجانبية لا يمكن أن يتجاوز عدد الوجبات");
    }
    
    return true;
}

// معالجة تقديم الطلب
async function handleSubmit(event) {
    event.preventDefault();
    
    // تعطيل زر الإرسال لمنع الإرسال المتكرر
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

        // التحقق من صحة البيانات
        if (!name) {
            throw new Error("يرجى إدخال الاسم");
        }
        
        if (!validatePhone(phone)) {
            throw new Error("يرجى إدخال رقم جوال صحيح مكون من 10 أرقام");
        }

        validateQuantities(beefQuantity, chickenQuantity, sideDish1, sideDish2);

        // إعداد البيانات للإرسال
        const templateParams = {
            from_name: name,
            phone: phone,
            beefQuantity: beefQuantity,
            chickenQuantity: chickenQuantity,
            sideDish1: sideDish1,
            sideDish2: sideDish2,
            total_price: (beefQuantity + chickenQuantity) * 15
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
        } else {
            throw new Error("حدث خطأ أثناء إرسال الطلب");
        }

    } catch (error) {
        alert(error.message || "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.");
        console.error("خطأ:", error);
    } finally {
        // إعادة تفعيل زر الإرسال
        submitButton.disabled = false;
    }
    
    return false;
}
