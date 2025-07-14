document.addEventListener('DOMContentLoaded', () => {
    const coursesData = [
        // I SEMESTRE
        [cite_start]{ code: "LPR 134", name: "LABORATORIO DE PROYECTOS I", uc: 3, prerequisites: [], semester: 1 }, [cite: 2]
        [cite_start]{ code: "CEI 122", name: "CREATIVIDAD E INNOVACIÓN", uc: 2, prerequisites: [], semester: 1 }, [cite: 2]
        [cite_start]{ code: "IEM 123", name: "INGLÉS EMPRESARIAL I", uc: 2, prerequisites: [], semester: 1 }, [cite: 2]
        [cite_start]{ code: "DHC 123", name: "DESARROLLO DE HABILIDADES COMUNICACIONALES", uc: 2, prerequisites: [], semester: 1 }, [cite: 2]
        [cite_start]{ code: "DPE 122", name: "DESARROLLO PERSONAL", uc: 2, prerequisites: [], semester: 1 }, [cite: 2]

        // II SEMESTRE
        [cite_start]{ code: "LPR 234", name: "LABORATORIO DE PROYECTOS II", uc: 3, prerequisites: ["LPR 134"], semester: 2 }, [cite: 4]
        [cite_start]{ code: "EMP 233", name: "EMPRENDIMIENTO I", uc: 3, prerequisites: ["CEI 122"], semester: 2 }, [cite: 4]
        [cite_start]{ code: "IEM 223", name: "INGLÉS EMPRESARIAL II", uc: 2, prerequisites: ["IEM 123"], semester: 2 }, [cite: 4]
        [cite_start]{ code: "INF 223", name: "INFORMÁTICA", uc: 2, prerequisites: [], semester: 2 }, [cite: 4]
        [cite_start]{ code: "CON 223", name: "CONTABILIDAD BÁSICA", uc: 2, prerequisites: [], semester: 2 }, [cite: 4]

        // III SEMESTRE
        [cite_start]{ code: "LPR 334", name: "LABORATORIO DE PROYECTOS III", uc: 3, prerequisites: ["LPR 234"], semester: 3 }, [cite: 6]
        [cite_start]{ code: "EMP 333", name: "EMPRENDIMIENTO II", uc: 3, prerequisites: ["EMP 233"], semester: 3 }, [cite: 6]
        [cite_start]{ code: "IEM 323", name: "INGLÉS EMPRESARIAL III", uc: 2, prerequisites: ["IEM 223"], semester: 3 }, [cite: 6]
        [cite_start]{ code: "EST 433", name: "ESTADÍSTICA", uc: 3, prerequisites: [], semester: 3 }, [cite: 6]
        [cite_start]{ code: "SYC 322", name: "SOCIEDAD Y CULTURA", uc: 2, prerequisites: [], semester: 3 }, [cite: 6]

        // IV SEMESTRE
        [cite_start]{ code: "LPR 434", name: "LABORATORIO DE PROYECTOS IV", uc: 3, prerequisites: ["LPR 334"], semester: 4 }, [cite: 8]
        [cite_start]{ code: "ADE 433", name: "ADMINISTRACIÓN DE EMPRESAS", uc: 3, prerequisites: ["EMP 333"], semester: 4 }, [cite: 8]
        [cite_start]{ code: "INE 433", name: "INICIATIVA EMPRESARIAL", uc: 3, prerequisites: ["EMP 333"], semester: 4 }, [cite: 8]
        [cite_start]{ code: "SDI 334", name: "SISTEMAS DE INFORMACIÓN", uc: 3, prerequisites: ["INF 223"], semester: 4 }, [cite: 8]
        [cite_start]{ code: "PEC 433", name: "PRINCIPIOS DE ECONOMÍA", uc: 3, prerequisites: ["SYC 322"], semester: 4 }, [cite: 8]

        // V SEMESTRE
        [cite_start]{ code: "LPR 534", name: "LABORATORIO DE PROYECTOS V", uc: 3, prerequisites: ["LPR 434"], semester: 5 }, [cite: 11]
        [cite_start]{ code: "DOR 533", name: "DESARROLLO ORGANIZACIONAL", uc: 3, prerequisites: ["INE 433"], semester: 5 }, [cite: 11]
        [cite_start]{ code: "NEG 533", name: "NEGOCIOS", uc: 3, prerequisites: ["INE 433", "PEC 433"], semester: 5 }, [cite: 11]
        [cite_start]{ code: "PLA 533", name: "PLANIFICACIÓN", uc: 3, prerequisites: ["PEC 433"], semester: 5 }, [cite: 11]
        [cite_start]{ code: "SFG 522", name: "SEMINARIO DE FORMACIÓN GENERAL I", uc: 2, prerequisites: [], semester: 5 }, [cite: 11]

        // VI SEMESTRE
        [cite_start]{ code: "LPR 634", name: "LABORATORIO DE PROYECTOS VI", uc: 3, prerequisites: ["LPR 534"], semester: 6 }, [cite: 13]
        [cite_start]{ code: "ADF 622", name: "ADMINISTRACIÓN FINANCIERA", uc: 2, prerequisites: ["ADE 433"], semester: 6 }, [cite: 13]
        [cite_start]{ code: "EGE 633", name: "ESTRATEGIAS GERENCIALES", uc: 3, prerequisites: ["DOR 533"], semester: 6 }, [cite: 13]
        [cite_start]{ code: "MYP 633", name: "MERCADEO Y PUBLICIDAD", uc: 3, prerequisites: ["NEG 533"], semester: 6 }, [cite: 13]
        [cite_start]{ code: "SFG 622", name: "SEMINARIO DE FORMACIÓN GENERAL II", uc: 2, prerequisites: ["SFG 522"], semester: 6 }, [cite: 13]

        // VII SEMESTRE
        [cite_start]{ code: "SDG 734", name: "SEMINARIO DE GRADO I", uc: 3, prerequisites: ["76 U.C. APROBADAS"], semester: 7 }, [cite: 15]
        [cite_start]{ code: "CMI 733", name: "COMERCIO Y MERCADOS INTERNACIONALES", uc: 3, prerequisites: ["MYP 633"], semester: 7 }, [cite: 15]
        [cite_start]{ code: "ELE 722", name: "ELECTIVA I", uc: 2, prerequisites: [], semester: 7 }, [cite: 15]
        [cite_start]{ code: "SFG 722", name: "SEMINARIO DE FORMACIÓN GENERAL III", uc: 2, prerequisites: ["SFG 622"], semester: 7 }, [cite: 15]

        // VIII SEMESTRE
        [cite_start]{ code: "SDG 834", name: "SEMINARIO DE GRADO II", uc: 3, prerequisites: ["SDG 734"], semester: 8 }, [cite: 17]
        [cite_start]{ code: "ELE 822", name: "ELECTIVA II", uc: 2, prerequisites: ["ELE 722"], semester: 8 } [cite: 17]
    ];

    const courseCatalog = document.getElementById('course-catalog');

    // Initialize course states from localStorage or set all to not approved
    let approvedCourses = new Set(JSON.parse(localStorage.getItem('approvedCourses')) || []);

    // Function to render the courses
    function renderCourses() {
        courseCatalog.innerHTML = ''; // Clear existing content

        const semesters = {};
        coursesData.forEach(course => {
            if (!semesters[course.semester]) {
                semesters[course.semester] = [];
            }
            semesters[course.semester].push(course);
        });

        Object.keys(semesters).sort((a, b) => a - b).forEach(semesterNum => {
            const semesterSection = document.createElement('div');
            semesterSection.classList.add('semester-section');
            semesterSection.innerHTML = `<h3>Semestre ${semesterNum}</h3>`;

            semesters[semesterNum].forEach(course => {
                const courseCard = document.createElement('div');
                courseCard.classList.add('course-card');
                courseCard.dataset.code = course.code;

                const isApproved = approvedCourses.has(course.code);
                const hasPrerequisites = course.prerequisites.length > 0;
                let isLocked = false;

                if (hasPrerequisites) {
                    // Special handling for "76 U.C. APROBADAS"
                    [cite_start]if (course.code === "SDG 734") { [cite: 15]
                        const totalApprovedUC = coursesData
                            .filter(c => approvedCourses.has(c.code))
                            .reduce((sum, c) => sum + c.uc, 0);
                        [cite_start]if (totalApprovedUC < 76) { [cite: 15]
                            isLocked = true;
                        }
                    } else {
                        isLocked = course.prerequisites.some(preReq => !approvedCourses.has(preReq));
                    }
                }

                if (isApproved) {
                    courseCard.classList.add('approved');
                } else if (isLocked) {
                    courseCard.classList.add('locked');
                }

                let prereqText = 'Ninguno';
                if (hasPrerequisites) {
                    [cite_start]if (course.code === "SDG 734") { [cite: 15]
                        prereqText = `76 U.C. [cite_start]APROBADAS`; [cite: 15]
                    } else {
                        prereqText = course.prerequisites.join(', ');
                    }
                }

                courseCard.innerHTML = `
                    <h4>${course.code} - ${course.name}</h4>
                    <p>U.C.: ${course.uc}</p>
                    <p class="prerequisites">Prerequisitos: ${prereqText}</p>
                `;

                if (!isApproved && !isLocked) {
                    courseCard.addEventListener('click', () => toggleCourseApproval(course.code));
                } else if (isApproved) {
                    // Allow unapproving only if no other approved course depends on it
                    courseCard.addEventListener('click', () => {
                        const dependentCourses = coursesData.filter(c => c.prerequisites.includes(course.code) && approvedCourses.has(c.code));
                        if (dependentCourses.length === 0) {
                            toggleCourseApproval(course.code);
                        } else {
                            alert(`No puedes desaprobar "${course.name}" porque es prerrequisito para cursos ya aprobados como: ${dependentCourses.map(d => d.name).join(', ')}.`);
                        }
                    });
                }
                semesterSection.appendChild(courseCard);
            });
            courseCatalog.appendChild(semesterSection);
        });
    }

    // Function to toggle course approval status
    function toggleCourseApproval(courseCode) {
        if (approvedCourses.has(courseCode)) {
            approvedCourses.delete(courseCode);
        } else {
            approvedCourses.add(courseCode);
        }
        localStorage.setItem('approvedCourses', JSON.stringify(Array.from(approvedCourses))); // Save to localStorage
        renderCourses(); // Re-render to update states
    }

    // Initial render
    renderCourses();
});
