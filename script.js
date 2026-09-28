const urlParams = new URLSearchParams(window.location.search);
const myToken = urlParams.get('token');

// ตารางแปลงชื่อย่อจาก Google Sheet ให้เป็นชื่อภาษาไทยแบบเต็ม
const unitNameMapping = {
    "OPNA": "วิทยาเขตนครสวรรค์ (OPNA)",
    "OPAM": "วิทยาเขตอำนาจเจริญ (OPAM)",
    "ICT": "คณะเทคโนโลยีสารสนเทศและการสื่อสาร (ICT)",
    "MT": "คณะเทคนิคการแพทย์ (MT)",
    "PY": "คณะเภสัชศาสตร์ (PY)",
    "TM": "คณะเวชศาสตร์เขตร้อน (TM)",
    "RA": "คณะแพทยศาสตร์โรงพยาบาลรามาธิบดี (RA)",
    "SI": "คณะแพทยศาสตร์ศิริราชพยาบาล (SI)",
    "PT": "คณะกายภาพบำบัด (PT)",
    "DT": "คณะทันตแพทยศาสตร์ (DT)",
    "NS": "คณะพยาบาลศาสตร์ (NS)",
    "SC": "คณะวิทยาศาสตร์ (SC)",
    "EG": "คณะวิศวกรรมศาสตร์ (EG)",
    "LA": "คณะศิลปศาสตร์ (LA)",
    "SH": "คณะสังคมศาสตร์และมนุษยศาสตร์ (SH)",
    "VS": "คณะสัตวแพทยศาสตร์ (VS)",
    "PH": "คณะสาธารณสุข (PH)",
    "EN": "คณะสิ่งแวดล้อมและทรัพยากรศาสตร์ (EN)",
    "GR": "บัณฑิตวิทยาลัย (GR)",
    "KA": "วิทยาเขตกาญจนบุรี (KA)",
    "CMMU": "วิทยาลัยการจัดการ (CMMU)",
    "MS": "วิทยาลัยดุริยางคศิลป์ (MS)",
    "IC": "วิทยาลัยนานาชาติ (IC)",
    "SS": "วิทยาลัยวิทยาศาสตร์และเทคโนโลยีการกีฬา (SS)",
    "CRS": "วิทยาลัยศาสนศึกษา (CRS)",
    "GJ": "ศูนย์การแพทย์กาญจนาภิเษก (GJ)",
    "AC": "ศูนย์สัตว์ทดลองแห่งชาติ (AC)",
    "CF": "สถาบันแห่งชาติเพื่อการพัฒนาเด็กและครอบครัว (CF)",
    "NU": "สถาบันโภชนาการ (NU)",
    "MB": "สถาบันชีววิทยาศาสตร์โมเลกุล (MB)",
    "IL": "สถาบันนวัตกรรมการเรียนรู้ (IL)",
    "AD": "สถาบันพัฒนาสุขภาพอาเซียน (AD)",
    "IPSR": "สถาบันวิจัยประชากรและสังคม (IPSR)",
    "LC": "สถาบันวิจัยภาษาและวัฒนธรรมเอเซีย (LC)",
    "DC": "สถาบันวิทยาศาสตร์การวิเคราะห์และตรวจสารในการกีฬา (DC)",
    "OP": "สำนักงานอธิการบดี (OP)",
    "LI": "หอสมุดและคลังความรู้มหาวิทยาลัยมหิดล (LI)"
};


// ======================================================
// LOAD DASHBOARD
// ======================================================

async function loadCharts(selectedYear = "2025") {

    try {

        // ------------------------------------------------
        // ตรวจสอบ Token
        // ------------------------------------------------

        if (!myToken) {
            alert("กรุณาระบุ Token ใน URL (เช่น ?token=OPNA123)");
            return;
        }


        // ------------------------------------------------
        // API
        // ------------------------------------------------

        const baseUrl =
            'https://script.google.com/macros/s/AKfycbxeShv6EV9ha8rBQ7x58_oQ1_byQDue2ZSyT4zS5gNjkWhGd8vcCIK-4ONfGJchK0jl/exec';

        const apiUrl =
            `${baseUrl}?year=${selectedYear}&token=${myToken}`;


        // ------------------------------------------------
        // Fetch API
        // ------------------------------------------------

        const response = await fetch(apiUrl);

        const result = await response.json();


        // ------------------------------------------------
        // ตรวจสอบผลลัพธ์
        // ------------------------------------------------

        if (result.status === "success") {

            const rawData = result.data;


            if (!rawData || rawData.length === 0) {

                alert(
                    "ไม่พบข้อมูลของหน่วยงานนี้ในปี " +
                    selectedYear
                );

                return;
            }


            // ==================================================
            // UPDATE DASHBOARD
            // ==================================================

            window.updateDashboard = function (index) {

                // ------------------------------------------------
                // Data
                // ------------------------------------------------

                const selectedData = rawData[index];

                const details =
                    selectedData.details || [];


                // ------------------------------------------------
                // แปลงคะแนนเป็นตัวเลข
                // ------------------------------------------------

                const score =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            Number(selectedData.value) || 0
                        )
                    );


                // ------------------------------------------------
                // คะแนนรายหมวด
                // ------------------------------------------------

                const pieScores = details
                    .slice(0, 7)
                    .map(val => {

                        if (
                            val === "" ||
                            val === "-" ||
                            val === null ||
                            val === undefined
                        ) {
                            return 0;
                        }

                        const number =
                            Number(val);

                        return isNaN(number)
                            ? 0
                            : number;
                    });


                // ------------------------------------------------
                // ชื่อหน่วยงาน
                // ------------------------------------------------

                const fullName =
                    unitNameMapping[selectedData.label] ||
                    selectedData.label;


                // ==================================================
                // UPDATE TITLE
                // ==================================================

                const pieTitle =
                    document.getElementById('pieTitle');

                if (pieTitle) {

                    pieTitle.textContent =
                        `ข้อมูล: ${fullName} (ปี ${selectedYear})`;
                }


                // ==================================================
                // UPDATE OVERALL SCORE
                // ==================================================

                const overallScoreText =
                    document.getElementById('overallScoreText');

                if (overallScoreText) {

                    overallScoreText.textContent =
                        score.toFixed(2) + '%';
                }


                // ==================================================
                // UPDATE RATING
                // ==================================================

                const rating =
                    getRatingRank(score);

                const badge =
                    document.getElementById('ratingBadge');


                if (badge) {

                    badge.textContent =
                        rating.text;

                    badge.style.backgroundColor =
                        rating.color;
                }


                // ==================================================
                // UPDATE SCORE 1-7
                // ==================================================

                for (let i = 1; i <= 7; i++) {

                    const element =
                        document.getElementById(`score${i}`);

                    if (!element) continue;


                    let val =
                        details[i - 1];


                    if (
                        val === 0 ||
                        val === "" ||
                        val === "-" ||
                        val === null ||
                        val === undefined
                    ) {

                        element.textContent = "-";

                    } else {

                        const number =
                            Number(val);

                        element.textContent =
                            isNaN(number)
                                ? "-"
                                : number.toFixed(2);
                    }
                }


                // ==================================================
                // GAUGE METER
                // ==================================================

                const gaugeCanvas =
                    document.getElementById('gaugeChart');


                if (gaugeCanvas) {

                    // ----------------------------------------------
                    // ลบ Gauge ตัวเก่าก่อน
                    // ----------------------------------------------

                    if (window.gaugeInstance) {

                        window.gaugeInstance.destroy();

                        window.gaugeInstance = null;
                    }


                    // ----------------------------------------------
                    // สร้าง Gauge ใหม่
                    // ----------------------------------------------

                    window.gaugeInstance =
                        new Chart(
                            gaugeCanvas.getContext('2d'),
                            {

                                type: 'doughnut',

                                data: {

                                    labels: [
                                        'Score',
                                        'Remaining'
                                    ],

                                    datasets: [
                                        {

                                            data: [
                                                score,
                                                100 - score
                                            ],

                                            backgroundColor: [
                                                rating.color,
                                                'rgba(255,255,255,0.12)'
                                            ],

                                            borderWidth: 0,

                                            hoverOffset: 0
                                        }
                                    ]
                                },


                                options: {

                                    responsive: true,

                                    maintainAspectRatio: false,

                                    rotation: -90,

                                    circumference: 180,

                                    cutout: '72%',


                                    animation: {

                                        animateRotate: true,

                                        duration: 900
                                    },


                                    plugins: {

                                        legend: {
                                            display: false
                                        },

                                        tooltip: {
                                            enabled: false
                                        }
                                    }
                                }
                            }
                        );
                }


                // ==================================================
                // RADAR CHART
                // ==================================================

                const pieCanvas =
                    document.getElementById('pieChart');


                if (pieCanvas) {

                    // ----------------------------------------------
                    // ลบ Radar ตัวเก่า
                    // ----------------------------------------------

                    if (window.pieInstance) {

                        window.pieInstance.destroy();

                        window.pieInstance = null;
                    }


                    // ----------------------------------------------
                    // สร้าง Radar Chart
                    // ----------------------------------------------

                    window.pieInstance =
                        new Chart(
                            pieCanvas.getContext('2d'),
                            {

                                type: 'radar',


                                data: {

                                    labels: [

                                        'หมวด 1 (องค์กร)',

                                        'หมวด 2 (วัตถุดิบ)',

                                        'หมวด 3 (พลังงาน)',

                                        'หมวด 4 (น้ำ)',

                                        'หมวด 5 (กากของเสีย)',

                                        'หมวด 6 (อาคาร)',

                                        'หมวด 7 (GHG)'

                                    ],


                                    datasets: [

                                        {

                                            label:
                                                'คะแนนแต่ละหมวด',

                                            data:
                                                pieScores,

                                            backgroundColor:
                                                'rgba(39, 174, 96, 0.25)',

                                            borderColor:
                                                '#27ae60',

                                            borderWidth: 2,

                                            pointBackgroundColor:
                                                '#27ae60',

                                            pointBorderColor:
                                                '#fff',

                                            pointHoverBackgroundColor:
                                                '#fff',

                                            pointHoverBorderColor:
                                                '#27ae60'
                                        }

                                    ]
                                },


                                options: {

                                    responsive: true,

                                    maintainAspectRatio: false,


                                    plugins: {

                                        legend: {

                                            display: false
                                        }
                                    },


                                    scales: {

                                        r: {

                                            beginAtZero: true,

                                            max: 100,


                                            ticks: {

                                                font: {

                                                    family: 'Prompt',

                                                    size: 10
                                                }
                                            },


                                            pointLabels: {

                                                font: {

                                                    family: 'Prompt',

                                                    size: 11,

                                                    weight: '500'
                                                },

                                                color:
                                                    '#2c3e50'
                                            }
                                        }
                                    }
                                }
                            }
                        );
                }

            };


            // ==================================================
            // UNIT SELECT
            // ==================================================

            const selectElement =
                document.getElementById('unitSelect');


            if (selectElement) {

                selectElement.innerHTML = '';


                rawData.forEach(
                    (item, index) => {

                        const option =
                            document.createElement('option');


                        option.value =
                            index;


                        option.textContent =
                            unitNameMapping[item.label] ||
                            item.label;


                        selectElement.appendChild(option);
                    }
                );


                // ----------------------------------------------
                // เมื่อเลือกหน่วยงาน
                // ----------------------------------------------

                selectElement.onchange =
                    (e) => {

                        updateDashboard(
                            Number(e.target.value)
                        );
                    };
            }


            // ==================================================
            // LOAD DATA ครั้งแรก
            // ==================================================

            updateDashboard(0);


        } else {

            alert(
                result.message ||
                "เกิดข้อผิดพลาดในการโหลดข้อมูล"
            );
        }


    } catch (error) {

        console.error(
            'Error loading dashboard:',
            error
        );

        alert(
            "เกิดข้อผิดพลาดในการโหลดข้อมูล"
        );
    }
}


// ======================================================
// RATING
// ======================================================

function getRatingRank(score) {

    score =
        Number(score) || 0;


    if (score >= 80) {

        return {
            text: 'Best',
            color: '#27ae60'
        };

    }


    if (score >= 60) {

        return {
            text: 'Good',
            color: '#2980b9'
        };

    }


    if (score >= 40) {

        return {
            text: 'Moderate',
            color: '#f39c12'
        };

    }


    if (score >= 20) {

        return {
            text: 'Limited',
            color: '#d35400'
        };

    }


    return {

        text: 'Unacceptable',

        color: '#c0392b'
    };
}


// ======================================================
// INITIAL LOAD
// ======================================================

loadCharts("2025");


// ======================================================
// YEAR SELECT
// ======================================================

const yearSelect =
    document.getElementById('yearSelect');


if (yearSelect) {

    yearSelect.onchange =
        (e) => {

            loadCharts(
                e.target.value
            );
        };
}