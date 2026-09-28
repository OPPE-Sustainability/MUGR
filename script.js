
// ======================================================
// MU GREEN RANKING - DASHBOARD SCRIPT
// Compatible with latest Pasted code(1).html
// ======================================================


// ======================================================
// URL PARAMETERS
// ======================================================

const urlParams = new URLSearchParams(window.location.search);
const myToken = urlParams.get('token');


// ======================================================
// UNIT NAME MAPPING
// ======================================================

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
    "LI": "หอสมุดและคลังความรู้มหาวิทยาลัยมหิดล"
};


// ======================================================
// API CONFIGURATION
// ======================================================

const baseUrl =
    'https://script.google.com/macros/s/AKfycbxeShv6EV9ha8rBQ7x58_oQ1_byQDue2ZSyT4zS5gNjkWhGd8vcCIK-4ONfGJchK0jl/exec';


// ======================================================
// RATING SCALE
// Score intervals:
// 0 <= score < 20   Unacceptable
// 20 <= score < 40  Limited
// 40 <= score < 60  Moderate
// 60 <= score < 80  Good
// 80 <= score <=100 Best
// ======================================================

const ratingLevels = [
    {
        id: 'ratingRowUnacceptable',
        min: 0,
        max: 20,
        text: 'Unacceptable',
        color: '#c0392b'
    },
    {
        id: 'ratingRowLimited',
        min: 20,
        max: 40,
        text: 'Limited',
        color: '#d35400'
    },
    {
        id: 'ratingRowModerate',
        min: 40,
        max: 60,
        text: 'Moderate',
        color: '#f39c12'
    },
    {
        id: 'ratingRowGood',
        min: 60,
        max: 80,
        text: 'Good',
        color: '#2980b9'
    },
    {
        id: 'ratingRowBest',
        min: 80,
        max: 100,
        text: 'Best',
        color: '#27ae60'
    }
];


// ======================================================
// NORMALIZE SCORE
// ======================================================

function normalizeScore(value) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return 0;
    }

    return Math.max(0, Math.min(100, number));
}


// ======================================================
// GET RATING
// ======================================================

function getRatingRank(score) {
    score = normalizeScore(score);

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
// UPDATE RATING SCALE TABLE
// ======================================================

function updateRatingScale(score) {
    score = normalizeScore(score);

    // Reset all rows
    ratingLevels.forEach(level => {
        const row = document.getElementById(level.id);

        if (!row) return;

        row.style.background = 'transparent';
        row.style.borderLeft = '3px solid transparent';
        row.style.boxShadow = 'none';
        row.style.fontWeight = '400';
    });

    // Find matching rating
    const currentLevel = score >= 80
        ? ratingLevels[4]
        : ratingLevels.find(level =>
            score >= level.min && score < level.max
        );

    if (!currentLevel) return;

    const currentRow =
        document.getElementById(currentLevel.id);

    if (!currentRow) return;

    // Highlight active rating
    currentRow.style.background =
        `${currentLevel.color}25`;

    currentRow.style.borderLeft =
        `3px solid ${currentLevel.color}`;

    currentRow.style.boxShadow =
        `inset 0 0 18px ${currentLevel.color}15`;

    currentRow.style.fontWeight = '700';
}


// ======================================================
// UPDATE GAUGE CHART
// ======================================================

function updateGaugeChart(score, rating) {
    const canvas =
        document.getElementById('gaugeChart');

    if (!canvas) {
        console.warn('Gauge canvas #gaugeChart not found');
        return;
    }

    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }

    // Destroy existing chart
    if (window.gaugeInstance) {
        window.gaugeInstance.destroy();
        window.gaugeInstance = null;
    }

    window.gaugeInstance = new Chart(
        canvas.getContext('2d'),
        {
            type: 'doughnut',

            data: {
                labels: ['Score', 'Remaining'],

                datasets: [{
                    data: [
                        score,
                        100 - score
                    ],

                    backgroundColor: [
                        rating.color,
                        'rgba(255,255,255,0.16)'
                    ],

                    borderWidth: 0,
                    hoverOffset: 0,
                    borderRadius: 0
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                rotation: -90,
                circumference: 180,
                cutout: '72%',

                animation: {
                    animateRotate: true,
                    duration: 800
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


// ======================================================
// UPDATE RADAR CHART
// ======================================================

function updateRadarChart(scores) {
    const canvas =
        document.getElementById('pieChart');

    if (!canvas) {
        console.warn('Radar canvas #pieChart not found');
        return;
    }

    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }

    // Destroy existing chart
    if (window.pieInstance) {
        window.pieInstance.destroy();
        window.pieInstance = null;
    }

    window.pieInstance = new Chart(
        canvas.getContext('2d'),
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

                datasets: [{
                    label: 'คะแนนแต่ละหมวด',
                    data: scores,

                    backgroundColor:
                        'rgba(39, 174, 96, 0.25)',

                    borderColor: '#27ae60',
                    borderWidth: 2,

                    pointBackgroundColor: '#27ae60',
                    pointBorderColor: '#ffffff',
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#27ae60'
                }]
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

                            color: '#2c3e50'
                        }
                    }
                }
            }
        }
    );
}


// ======================================================
// UPDATE CATEGORY SCORES
// ======================================================

function updateCategoryScores(details) {
    for (let i = 1; i <= 7; i++) {
        const element =
            document.getElementById(`score${i}`);

        if (!element) continue;

        const value = details[i - 1];

        if (
            value === '' ||
            value === '-' ||
            value === null ||
            value === undefined
        ) {
            element.textContent = '-';
            continue;
        }

        const number = Number(value);

        element.textContent =
            Number.isFinite(number)
                ? number.toFixed(2)
                : '-';
    }
}


// ======================================================
// UPDATE DASHBOARD
// ======================================================

function updateDashboard(index, rawData, selectedYear) {
    const selectedData = rawData[Number(index)];

    if (!selectedData) {
        console.warn('Selected unit data not found:', index);
        return;
    }

    const details = Array.isArray(selectedData.details)
        ? selectedData.details
        : [];

    const score = normalizeScore(selectedData.value);
    const rating = getRatingRank(score);

    const fullName =
        unitNameMapping[selectedData.label] ||
        selectedData.label ||
        'ไม่ระบุหน่วยงาน';

    // Prepare category scores for Radar Chart
    const categoryScores = details
        .slice(0, 7)
        .map(value => {
            if (
                value === '' ||
                value === '-' ||
                value === null ||
                value === undefined
            ) {
                return 0;
            }

            const number = Number(value);

            return Number.isFinite(number)
                ? number
                : 0;
        });


    // --------------------------------------------------
    // UPDATE TITLE
    // --------------------------------------------------

    const pieTitle =
        document.getElementById('pieTitle');

    if (pieTitle) {
        pieTitle.textContent =
            `ข้อมูล: ${fullName} (ปี ${selectedYear})`;
    }


    // --------------------------------------------------
    // UPDATE OVERALL SCORE
    // --------------------------------------------------

    const overallScoreText =
        document.getElementById('overallScoreText');

    if (overallScoreText) {
        overallScoreText.textContent =
            `${score.toFixed(2)}%`;
    }


    // --------------------------------------------------
    // UPDATE RATING BADGE
    // --------------------------------------------------

    const ratingBadge =
        document.getElementById('ratingBadge');

    if (ratingBadge) {
        ratingBadge.textContent = rating.text;
        ratingBadge.style.backgroundColor = rating.color;
    }


    // --------------------------------------------------
    // UPDATE RATING SCALE
    // --------------------------------------------------

    updateRatingScale(score);


    // --------------------------------------------------
    // UPDATE GAUGE
    // --------------------------------------------------

    updateGaugeChart(score, rating);


    // --------------------------------------------------
    // UPDATE CATEGORY TABLE
    // --------------------------------------------------

    updateCategoryScores(details);


    // --------------------------------------------------
    // UPDATE RADAR
    // --------------------------------------------------

    updateRadarChart(categoryScores);
}


// ======================================================
// LOAD CHARTS FROM API
// ======================================================

async function loadCharts(selectedYear = '2025') {
    if (!myToken) {
        alert('กรุณาระบุ Token ใน URL (เช่น ?token=OPNA123)');
        return;
    }

    const unitSelect =
        document.getElementById('unitSelect');

    const yearSelect =
        document.getElementById('yearSelect');

    if (unitSelect) {
        unitSelect.disabled = true;
    }

    if (yearSelect) {
        yearSelect.disabled = true;
    }

    try {
        const apiUrl =
            `${baseUrl}?year=${encodeURIComponent(selectedYear)}&token=${encodeURIComponent(myToken)}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        if (result.status !== 'success') {
            throw new Error(
                result.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล'
            );
        }

        const rawData = result.data;

        if (!Array.isArray(rawData) || rawData.length === 0) {
            alert(`ไม่พบข้อมูลของหน่วยงานนี้ในปี ${selectedYear}`);
            return;
        }


        // --------------------------------------------------
        // POPULATE UNIT SELECT
        // --------------------------------------------------

        if (unitSelect) {
            unitSelect.innerHTML = '';

            rawData.forEach((item, index) => {
                const option =
                    document.createElement('option');

                option.value = String(index);

                option.textContent =
                    unitNameMapping[item.label] ||
                    item.label ||
                    'ไม่ระบุหน่วยงาน';

                unitSelect.appendChild(option);
            });

            unitSelect.onchange = event => {
                updateDashboard(
                    Number(event.target.value),
                    rawData,
                    selectedYear
                );
            };
        }


        // --------------------------------------------------
        // SET YEAR SELECT
        // --------------------------------------------------

        if (yearSelect) {
            yearSelect.value = String(selectedYear);
        }


        // --------------------------------------------------
        // INITIAL DASHBOARD
        // --------------------------------------------------

        updateDashboard(0, rawData, selectedYear);

    } catch (error) {
        console.error('Error loading dashboard:', error);

        alert(
            'เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณาตรวจสอบ API และการเชื่อมต่อ'
        );

    } finally {
        if (unitSelect) {
            unitSelect.disabled = false;
        }

        if (yearSelect) {
            yearSelect.disabled = false;
        }
    }
}


// ======================================================
// INITIALIZE DASHBOARD
// ======================================================

document.addEventListener('DOMContentLoaded', () => {
    const yearSelect =
        document.getElementById('yearSelect');

    if (yearSelect) {
        yearSelect.addEventListener('change', event => {
            loadCharts(event.target.value);
        });

        loadCharts(yearSelect.value || '2025');
    } else {
        loadCharts('2025');
    }
});