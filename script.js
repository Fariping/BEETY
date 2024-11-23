document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('order-form');
    const submitButton = document.getElementById('submit-order');

    // دالة للتحقق من صحة رقم الهاتف
    function isValidPhone(phone) {
        // التحقق من أن رقم الهاتف يحتوي على أرقام فقط وطوله مناسب
        return /^[0-9]{9,10}$/.test(phone);
    }

    // دالة لتنظيف وتنسيق البيانات المدخلة
    function sanitizeInput(input) {
        return input.replace(/[&<>"'/]/g, '');
    }

    submitButton.addEventListener('click', function() {
        // التحقق من تحميل EmailJS
        if (typeof emailjs === 'undefined') {
            alert('خطأ في تحميل نظام الإرسال. يرجى تحديث الصفحة.');
            return;
        }

        // جمع البيانات من النموذج
        const name = sanitizeInput(document.getElementById('customer-name').value.trim());
        const phone = sanitizeInput(document.getElementById('customer-phone').value.trim());
        
        const beefQuantity = parseInt(document.getElementById('beef-meal').value) || 0;
        const chickenQuantity = parseInt(document.getElementById('chicken-meal').value) || 0;
        const sideDish1 = parseInt(document.getElementById('side-dish-1').value) || 0;
        const sideDish2 = parseInt(document.getElementById('side-dish-2').value) || 0;

        // التحقق من صحة البيانات
        if (!name || name.length < 2) {
            alert('يرجى إدخال اسم صحيح (حرفين على الأقل)');
            return;
        }

        if (!isValidPhone(phone)) {
            alert('يرجى إدخال رقم جوال صحيح (9-10 أرقام)');
            return;
        }

        const totalMeals = beefQuantity + chickenQuantity;
        if (totalMeals === 0) {
            alert('يرجى اختيار وجبة واحدة على الأقل');
            return;
        }

        const totalSideDishes = sideDish1 + sideDish2;
        if (totalSideDishes > totalMeals) {
            alert('عدد الأطباق الجانبية لا يمكن أن يتجاوز عدد الوجبات');
            return;
        }

        // تعطيل زر الإرسال وتغيير النص
        submitButton.disabled = true;
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'جاري إرسال الطلب...';

        // إعداد بيانات الطلب
        const order = {
            from_name: name,
            phone: phone,
            beefQuantity: beefQuantity,
            chickenQuantity: chickenQuantity,
            sideDish1: sideDish1,
            sideDish2: sideDish2,
            total_meals: totalMeals,
            total_side_dishes: totalSideDishes,
            timestamp: new Date().toLocaleString('ar-SA')
        };

        // إرسال الطلب
        emailjs.send('service_t9ogwct', 'template_default', order)
            .then(function(response) {
                alert('تم إرسال الطلب بنجاح!');
                form.reset(); // إعادة تعيين النموذج
            })
            .catch(function(error) {
                console.error('Error:', error);
                alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.');
            })
            .finally(function() {
                // إعادة تفعيل الزر وإرجاع النص الأصلي
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
    });

    // تحديد الحد الأقصى للكميات تلقائياً
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value > 15) {
                this.value = 15;
            }
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });
});
