async function handleSubmit(event) {
    event.preventDefault();
    const submitButton = document.getElementById("submit-order");
    submitButton.disabled = true;
    
    try {
        // جمع البيانات
        const from_name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const beefQuantity = parseInt(document.getElementById("beef-meal").value) || 0;
        const chickenQuantity = parseInt(document.getElementById("chicken-meal").value) || 0;
        const sideDish1 = parseInt(document.getElementById("side-dish-1").value) || 0;
        const sideDish2 = parseInt(document.getElementById("side-dish-2").value) || 0;

        // التحقق من البيانات
        if (!from_name || !phone) {
            throw new Error('يرجى تعبئة جميع الحقول المطلوبة');
        }

        // إعداد البيانات بنفس هيكل القالب
        const templateParams = {
            from_name,
            phone,
            beefQuantity,
            chickenQuantity,
            sideDish1,
            sideDish2,
            message: `
تفاصيل الطلب:
- وجبة لحم: ${beefQuantity}
- وجبة دجاج: ${chickenQuantity}
- سحاوق مع عشار: ${sideDish1}
- سلطة خيار مع زبادي: ${sideDish2}

السعر الإجمالي: ${(beefQuantity + chickenQuantity) * 15} ريال
            `
        };

        // إرسال البريد
        await emailjs.send(
            "service_t9ogwct",
            "template_0hkm9zd", 
            templateParams
        );

        // نجاح الإرسال
        alert('تم إرسال الطلب بنجاح!');
        document.getElementById("orderForm").reset();

    } catch (error) {
        console.error('Error details:', error);
        
        // إنشاء نص الطلب للنسخ الاحتياطي
        const orderDetails = `
            الاسم: ${from_name}
            رقم الجوال: ${phone}
            الطلب:
            - وجبة لحم: ${beefQuantity}
            - وجبة دجاج: ${chickenQuantity}
            - سحاوق مع عشار: ${sideDish1}
            - سلطة خيار مع زبادي: ${sideDish2}
            السعر الإجمالي: ${(beefQuantity + chickenQuantity) * 15} ريال
        `;

        // إنشاء زر واتساب مع تفاصيل الطلب
        const whatsappUrl = `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${encodeURIComponent(orderDetails)}`;
        
        alert(`
            عذراً، حدث خطأ أثناء إرسال الطلب.
            سنقوم بتحويلك إلى الواتساب لإكمال طلبك.
        `);

        // تحويل مباشر إلى الواتساب
        window.open(whatsappUrl, '_blank');
    } finally {
        submitButton.disabled = false;
    }
    
    return false;
}

// تهيئة EmailJS عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("-_n0qbKnDcV32oAOP");
});
