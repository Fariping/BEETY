// التحقق من اتصال EmailJS
document.addEventListener('DOMContentLoaded', function() {
    try {
        emailjs.init("YOUR_PUBLIC_KEY");
        
        // اختبار الاتصال
        emailjs.send("service_t9ogwct", "template_0hkm9zd", {
            test: "test"
        }).then(
            function(response) {
                console.log("تم الاتصال بنجاح:", response);
            },
            function(error) {
                console.error("خطأ في الاتصال:", error);
                // إضافة عنصر تنبيه للمستخدم
                const alert = document.createElement('div');
                alert.className = 'alert alert-warning';
                alert.textContent = 'جاري الصيانة، يرجى المحاولة لاحقاً';
                document.querySelector('.container').prepend(alert);
            }
        );
    } catch (error) {
        console.error("خطأ في تهيئة EmailJS:", error);
    }
});

// تعديل دالة إرسال الطلب لتتضمن المزيد من المعلومات التشخيصية
async function handleSubmit(event) {
    event.preventDefault();
    const submitButton = document.getElementById("submit-order");
    submitButton.disabled = true;
    
    try {
        // ... (الكود السابق)

        console.log("جاري إرسال البيانات:", templateParams);
        
        const response = await emailjs.send(
            "service_t9ogwct",
            "template_0hkm9zd",
            templateParams
        );

        console.log("استجابة الخادم:", response);
        
        if (response.status === 200) {
            alert("تم إرسال الطلب بنجاح!");
            document.getElementById("orderForm").reset();
        } else {
            throw new Error(`خطأ في الاستجابة: ${response.status}`);
        }

    } catch (error) {
        console.error("تفاصيل الخطأ:", {
            message: error.message,
            stack: error.stack,
            response: error.response
        });
        
        alert(error.message || "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.");
    } finally {
        submitButton.disabled = false;
    }
    
    return false;
}
