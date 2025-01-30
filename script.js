const dailyLuckyItems = {
    "Monday": { item: "พระเครื่อง", color: "สีเหลือง" },
    "Tuesday": { item: "หินนำโชค", color: "สีชมพู" },
    "Wednesday": { item: "เหรียญนำโชค", color: "สีเขียว" },
    "Thursday": { item: "น้ำหอมกลิ่นดอกไม้", color: "สีส้ม" },
    "Friday": { item: "กำไลหยก", color: "สีฟ้า" },
    "Saturday": { item: "กระเป๋าสตางค์แดง", color: "สีแดง" },
    "Sunday": { item: "เทียนหอม", color: "สีทอง" }
};

const fortunes = [
    // 🔥 โชคดีมาก
    { text: "ฟ้าส่งเสริม ดินสนับสนุน - สมหวังในสิ่งที่ตั้งใจ", type: "good" },
    { text: "โชคใหญ่กำลังมา - โอกาสดีทางการเงิน", type: "good" },
    { text: "ความรักสมหวัง - พบคู่แท้", type: "good" },
    { text: "สุขภาพแข็งแรง - หายจากโรคภัย", type: "good" },
    { text: "ข่าวดีจากแดนไกล - โอกาสใหม่กำลังมา", type: "good" },

    // ⚖️ โชคปานกลาง
    { text: "มีโอกาสแต่ต้องลงมือทำ - ต้องขยันจึงจะสำเร็จ", type: "neutral" },
    { text: "ความรักกำลังเติบโต - ค่อยๆ พัฒนาความสัมพันธ์", type: "neutral" },
    { text: "สุขภาพดีขึ้นตามลำดับ - อย่าลืมออกกำลังกาย", type: "neutral" },
    { text: "เงินทองมีเข้าแต่ก็มีออก - ใช้จ่ายอย่างรอบคอบ", type: "neutral" },
    { text: "อดทนแล้วจะเห็นผล - พยายามต่อไปจะสำเร็จ", type: "neutral" },

    // ❗ โชคร้ายเล็กน้อย
    { text: "ระวังอารมณ์ - อย่าหุนหันพลันแล่น", type: "bad" },
    { text: "มีคนอิจฉา - ระวังคนไม่หวังดี", type: "bad" },
    { text: "สุขภาพต้องดูแล - พักผ่อนให้พอ", type: "bad" },
    { text: "การเงินติดขัดเล็กน้อย - ควรประหยัด", type: "bad" },
    { text: "ระวังของหาย - จัดเก็บของให้ดี", type: "bad" },

    // ❌ โชคร้ายมาก
    { text: "ระวังเรื่องการเงิน - อาจมีปัญหาด้านการใช้จ่าย", type: "verybad" },
    { text: "ความรักมีปัญหา - อาจมีเรื่องเข้าใจผิด", type: "verybad" },
    { text: "การงานติดขัด - งานอาจมีอุปสรรค", type: "verybad" },
    { text: "เดินทางไม่สะดวก - อาจมีเหตุให้เดินทางล่าช้า", type: "verybad" },
    { text: "ต้องพึ่งพาตัวเอง - ช่วงนี้อาจไม่มีใครช่วย", type: "verybad" }
];

function getDayOfWeek() {
    return new Date().toLocaleDateString('en-US', { weekday: 'long' });
}

function canDrawFortune() {
    let lastDrawDate = localStorage.getItem("lastDrawDate");
    let today = new Date().toISOString().split("T")[0];
    return lastDrawDate !== today;
}

function drawFortune() {
    if (!canDrawFortune()) {
        alert("❗ คุณได้เสี่ยงเซียมซีไปแล้ววันนี้ กลับมาใหม่พรุ่งนี้!");
        return;
    }

    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let fortune = fortunes[randomIndex];
    let today = getDayOfWeek();
    let lucky = dailyLuckyItems[today];

    let message = `<p>${fortune.text}</p>`;
    message += `<p style="color: #FFD700;"><strong>🔮 ของนำโชค:</strong> ${lucky.item}</p>`;
    message += `<p style="color: #FFD700;"><strong>🎨 สีนำโชค:</strong> ${lucky.color}</p>`;

    if (fortune.type === "good") {
        showPopup("🎉 ยินดีด้วย! 🎉", message, "green");
    } else if (fortune.type === "neutral") {
        showPopup("🔮 คำทำนายของคุณ", message, "blue");
    } else {
        showPopup("😢 ไม่ต้องกังวล! 😢", message, "red");
    }

    localStorage.setItem("lastDrawDate", new Date().toISOString().split("T")[0]);
}

function showPopup(title, content, color) {
    let popup = document.getElementById("popup");
    document.getElementById("popupTitle").innerHTML = title;
    document.getElementById("popupContent").innerHTML = content;
    popup.style.backgroundColor = color === "green" ? "#4CAF50" : color === "blue" ? "#1E90FF" : "#B22222";
    popup.style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}