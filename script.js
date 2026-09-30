
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
        color: '#ff0000',
        textColor: '#ffffff'
    },
    {
        id: 'ratingRowLimited',
        min: 20,
        max: 40,
        text: 'Limited',
        color: '#f37021',
        textColor: '#ffffff'
    },
    {
        id: 'ratingRowModerate',
        min: 40,
        max: 60,
        text: 'Moderate',
        color: '#ffc000',
        textColor: '#0f172a'
    },
    {
        id: 'ratingRowGood',
        min: 60,
        max: 80,
        text: 'Good',
        color: '#92d050',
        textColor: '#0f172a'
    },
    {
        id: 'ratingRowBest',
        min: 80,
        max: 100,
        text: 'Best',
        color: '#00b050',
        textColor: '#ffffff'
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
            color: '#00b050',
            textColor: '#ffffff'
        };
    }

    if (score >= 60) {
        return {
            text: 'Good',
            color: '#92d050',
            textColor: '#0f172a'
        };
    }

    if (score >= 40) {
        return {
            text: 'Moderate',
            color: '#ffc000',
            textColor: '#0f172a'
        };
    }

    if (score >= 20) {
        return {
            text: 'Limited',
            color: '#f37021',
            textColor: '#ffffff'
        };
    }

    return {
        text: 'Unacceptable',
        color: '#ff0000',
        textColor: '#ffffff'
    };
}


// ======================================================
// UPDATE RATING SCALE TABLE
// ======================================================

function updateRatingScale(score) {
    score = normalizeScore(score);

    // Reset all rating pills
    ratingLevels.forEach(level => {
        const row = document.getElementById(level.id);

        if (!row) return;

        row.style.background = '#ffffff';
        row.style.border = '1px solid #e2e8f0';
        row.style.color = '#64748b';
        row.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.02)';
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

    // Highlight active rating pill
    currentRow.style.background =
        `${currentLevel.color}20`;

    currentRow.style.border =
        `1.5px solid ${currentLevel.color}`;

    currentRow.style.color =
        currentLevel.textColor === '#0f172a' ? '#0f172a' : currentLevel.color;

    currentRow.style.boxShadow =
        `0 2px 8px ${currentLevel.color}40`;

    currentRow.style.fontWeight = '700';
}


// ======================================================
// UPDATE ANNUAL DISTRIBUTION STACKED ROW CHART
// ======================================================

const annualDistributionYears = ['2020', '2021', '2022', '2023', '2024', '2025'];

function updateAnnualStackedChart(selectedYear = '2025') {
    const canvas =
        document.getElementById('distStackedChart');

    if (!canvas) {
        console.warn('Stacked canvas #distStackedChart not found');
        return;
    }

    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }

    const selectedYearStr = String(selectedYear || '2025');

    // Destroy existing instance
    if (window.distStackedInstance) {
        window.distStackedInstance.destroy();
        window.distStackedInstance = null;
    }

    window.distStackedInstance = new Chart(
        canvas.getContext('2d'),
        {
            type: 'bar',
            data: {
                labels: annualDistributionYears,
                datasets: [
                    {
                        label: 'Best (80–100%)',
                        data: [12.82, 23.08, 12.82, 10.53, 23.68, 24.32],
                        backgroundColor: '#00b050',
                        hoverBackgroundColor: '#009443',
                        borderRadius: { topLeft: 4, bottomLeft: 4 },
                        borderWidth: annualDistributionYears.map(yr => yr === selectedYearStr ? 2 : 0),
                        borderColor: '#0f172a'
                    },
                    {
                        label: 'Good (60–79%)',
                        data: [35.90, 23.08, 33.33, 26.32, 21.05, 40.54],
                        backgroundColor: '#92d050',
                        hoverBackgroundColor: '#7dbb3e',
                        borderWidth: annualDistributionYears.map(yr => yr === selectedYearStr ? 2 : 0),
                        borderColor: '#0f172a'
                    },
                    {
                        label: 'Moderate (40–59%)',
                        data: [28.21, 33.33, 28.21, 31.58, 34.21, 27.03],
                        backgroundColor: '#ffc000',
                        hoverBackgroundColor: '#e0a800',
                        borderWidth: annualDistributionYears.map(yr => yr === selectedYearStr ? 2 : 0),
                        borderColor: '#0f172a'
                    },
                    {
                        label: 'Limited (20–39%)',
                        data: [20.51, 7.69, 20.51, 23.68, 15.79, 2.70],
                        backgroundColor: '#f37021',
                        hoverBackgroundColor: '#d95a12',
                        borderWidth: annualDistributionYears.map(yr => yr === selectedYearStr ? 2 : 0),
                        borderColor: '#0f172a'
                    },
                    {
                        label: 'Unacceptable (1–19%)',
                        data: [2.56, 12.82, 5.13, 7.89, 5.26, 5.41],
                        backgroundColor: '#ff0000',
                        hoverBackgroundColor: '#d60000',
                        borderRadius: { topRight: 4, bottomRight: 4 },
                        borderWidth: annualDistributionYears.map(yr => yr === selectedYearStr ? 2 : 0),
                        borderColor: '#0f172a'
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                barThickness: 16,
                maxBarThickness: 20,
                scales: {
                    x: {
                        stacked: true,
                        min: 0,
                        max: 100,
                        grid: {
                            color: '#e2e8f0'
                        },
                        ticks: {
                            color: '#64748b',
                            font: { family: 'Prompt', size: 10 },
                            callback: value => value + '%'
                        }
                    },
                    y: {
                        stacked: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: c => {
                                const yr = annualDistributionYears[c.index];
                                return yr === selectedYearStr ? '#059669' : '#64748b';
                            },
                            font: c => {
                                const yr = annualDistributionYears[c.index];
                                const isCurrent = (yr === selectedYearStr);
                                return {
                                    family: 'Prompt',
                                    size: isCurrent ? 12 : 11,
                                    weight: isCurrent ? '700' : '500'
                                };
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'end',
                        labels: {
                            color: '#475569',
                            font: { family: 'Prompt', size: 10 },
                            boxWidth: 8,
                            boxHeight: 8,
                            padding: 8,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.92)',
                        titleColor: '#ffffff',
                        bodyColor: '#e2e8f0',
                        borderColor: '#10b981',
                        borderWidth: 1,
                        padding: 10,
                        cornerRadius: 8,
                        titleFont: { family: 'Prompt', size: 11, weight: '600' },
                        bodyFont: { family: 'Prompt', size: 11 },
                        callbacks: {
                            label: context => {
                                const label = context.dataset.label || '';
                                const val = Number(context.parsed.x || 0);
                                return ` ${label}: ${val.toFixed(2)}%`;
                            }
                        }
                    }
                }
            }
        }
    );
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
                        '#e2e8f0'
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
                    backgroundColor: 'rgba(16, 185, 129, 0.22)',
                    borderColor: '#10b981',
                    borderWidth: 2.5,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4.5,
                    pointHoverRadius: 9,
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#10b981',
                    pointHoverBorderWidth: 3
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 750,
                    easing: 'easeOutQuart'
                },

                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        titleColor: '#ffffff',
                        bodyColor: '#cbd5e1',
                        borderColor: 'rgba(16, 185, 129, 0.35)',
                        borderWidth: 1,
                        padding: 10,
                        cornerRadius: 8,
                        titleFont: {
                            family: 'Prompt',
                            size: 12,
                            weight: '600'
                        },
                        bodyFont: {
                            family: 'Prompt',
                            size: 11
                        },
                        callbacks: {
                            label: context => {
                                const val = Number(context.raw || 0);
                                return ` คะแนน: ${val.toFixed(2)} / 100`;
                            }
                        }
                    }
                },

                scales: {
                    r: {
                        beginAtZero: true,
                        min: 0,
                        max: 100,

                        ticks: {
                            stepSize: 20,
                            font: {
                                family: 'Prompt',
                                size: 10
                            },
                            color: '#94a3b8',
                            backdropColor: 'transparent'
                        },

                        grid: {
                            color: 'rgba(148, 163, 184, 0.22)',
                            circular: false
                        },

                        angleLines: {
                            color: 'rgba(148, 163, 184, 0.22)'
                        },

                        pointLabels: {
                            font: {
                                family: 'Prompt',
                                size: 11.5,
                                weight: '600'
                            },
                            color: '#1e293b'
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
        const popupElement =
            document.getElementById(`popupScore${i}`);

        const value = details[i - 1];

        if (
            value === '' ||
            value === '-' ||
            value === null ||
            value === undefined
        ) {
            if (element) element.textContent = '-';
            if (popupElement) popupElement.textContent = '-';
            continue;
        }

        const number = Number(value);
        const textVal = Number.isFinite(number) ? number.toFixed(2) : '-';

        if (element) {
            element.textContent = textVal;
        }
        if (popupElement) {
            popupElement.textContent = Number.isFinite(number) ? `${textVal} / 100` : '-';
        }
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
        ratingBadge.style.color = rating.textColor || '#ffffff';
    }


    // --------------------------------------------------
    // UPDATE RATING SCALE & ANNUAL DISTRIBUTION
    // --------------------------------------------------

    updateRatingScale(score);
    updateAnnualStackedChart(selectedYear);


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
    updateAnnualStackedChart(selectedYear);

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

    const initialYear = yearSelect ? (yearSelect.value || '2025') : '2025';
    updateAnnualStackedChart(initialYear);

    // Interactive Radar Card bounce on click/touch
    const radarCard = document.getElementById('radarCardWrapper');
    if (radarCard) {
        radarCard.addEventListener('click', () => {
            radarCard.classList.toggle('is-popped');
            if (window.pieInstance) {
                window.pieInstance.render();
            }
        });
    }

    // Interactive Category Table Pop-Up linkage for Header and Score cells
    const catCells = document.querySelectorAll('#summaryTable .cat-col');
    catCells.forEach(cell => {
        const catId = cell.getAttribute('data-cat');
        if (!catId) return;

        cell.addEventListener('mouseenter', () => {
            document.querySelectorAll(`#summaryTable .cat-col[data-cat="${catId}"]`).forEach(colEl => {
                colEl.classList.add('is-hovered');
            });
        });

        cell.addEventListener('mouseleave', () => {
            document.querySelectorAll(`#summaryTable .cat-col[data-cat="${catId}"]`).forEach(colEl => {
                colEl.classList.remove('is-hovered');
            });
        });
    });

    if (yearSelect) {
        yearSelect.addEventListener('change', event => {
            loadCharts(event.target.value);
        });

        loadCharts(initialYear);
    } else {
        loadCharts('2025');
    }
});