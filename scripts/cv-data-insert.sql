-- CV Data Insert Statements for Dr. Dorsa Ghasemi
-- Run this in your Supabase SQL Editor after running supabase-setup.sql

-- Research Publications
-- Published papers
INSERT INTO research (title, authors, publication_date, journal_name, description, link) VALUES
(
  'Immunohistochemical expression of PD-L1 and its correlation with microsatellite status in endometrial and ovarian clear cell carcinomas: a cross-sectional study',
  'Ghasemi Dorsa, Ameli F, Nili F, Edjtemaei R, Sheikhhasani S',
  '2022-12-29',
  'BMC cancer',
  'Cross-sectional study examining PD-L1 expression and microsatellite status in endometrial and ovarian clear cell carcinomas.',
  'https://bmccancer.biomedcentral.com/articles/10.1186/s12885-022-10430-9'
),
(
  'Pathogenic role of Twist-1 protein in hydatidiform molar pregnancies and investigation of its potential diagnostic utility in complete moles',
  'Jahanbin, B., Sarmadi, S., Ghasemi, D., Nili, F., Moradi, J. A., Ghasemi, S.',
  '2023-01-01',
  'Diagnostic Pathology',
  'Investigation of Twist-1 protein role in hydatidiform molar pregnancies and its diagnostic potential.',
  NULL
),
(
  'Post-pubertal ovarian yolk sac tumor with unusual follicular growth pattern, simulating struma ovarii',
  'Dorsa Ghasemi, Fatemeh Nili',
  '2022-06-01',
  'International Cancer Conference Journal',
  'Case report of an unusual ovarian yolk sac tumor presentation.',
  NULL
),
(
  'Malignant Melanoma Presenting as a Parotid Mass in a Middle-aged Woman with Metastasis to the Breast',
  'Fereshteh Ameli, Dorsa Ghasemi, Vahid Soleimani and Amirmohsen Jalaeefar',
  '2021-12-01',
  'Int J Cancer Manag',
  'Case report of malignant melanoma presenting atypically.',
  NULL
),
(
  'Menkes Disease',
  'Mahmoud Reza Ashrafi, Dorsa Ghasemi, Moeinadin Safavi',
  '2021-12-01',
  'Arch Iran Med',
  'Case report on Menkes disease.',
  NULL
),
(
  'Solitary metastases of lower extremity myxoid liposarcoma to breast: A case report and review of literature',
  'Ramesh Omranipour, Negar Manshoori, Behnaz Jahanbin, Dorsa Ghasemi',
  '2021-03-01',
  'Clinical Case Reports',
  'Rare case of myxoid liposarcoma metastasis to breast.',
  NULL
),
(
  'Comparison of Patient-collected and Lab Technician-collected Nasopharyngeal and Oropharyngeal Swabs for Detection of COVID-19 by RT-PCR',
  'Alireza Abdollahi, Abbas shakoori, Hoda Khoshnevis, Mohammad Arabzadeh, Seyed Ali Dehghan Manshadi, Esmaeil Mohammadnejad, Dorsa Ghasemi, et al.',
  '2020-07-01',
  'Iranian Journal of Pathology',
  'Study comparing patient-collected vs technician-collected swabs for COVID-19 detection.',
  NULL
),
(
  'Invasive micropapillary carcinoma in a young male patient',
  'Dorsa Ghasemi, Fereshteh Ameli, Behnaz Jahanbin',
  '2018-04-01',
  '20th Annual Conference and 3rd International Conference on Pathology and Laboratory Medicine',
  'Conference presentation on rare case of invasive micropapillary carcinoma.',
  NULL
),
(
  'An initial presentation of chronic myelogenous leukemia as myeloid sarcoma in a young female patient',
  'Dorsa Ghasemi, Fereshteh Ameli, Vahid Soleimani',
  '2018-04-01',
  '20th Annual Conference and 3rd International Conference on Pathology and Laboratory Medicine',
  'Conference presentation on unusual CML presentation.',
  NULL
);

-- Publications under review or in preparation
INSERT INTO research (title, authors, publication_date, journal_name, description, link) VALUES
(
  'Diagnostic and prognostic value of P53 and ATRX expression in uterine smooth muscle neoplasms: a comparative study',
  'Foroogh Maghsoudloo Jafari, Fatemeh Nili, Aysan Nozheh, Dorsa Ghasemi, Fereshteh Ameli',
  '2025-01-01',
  NULL,
  'Manuscript in preparation - Comparative study on P53 and ATRX expression in uterine smooth muscle neoplasms.',
  NULL
),
(
  'Primary Kidney Squamous Cell Carcinoma, Misdiagnosed As Xanthogranulomatous Pyelonephritis: A Case Report',
  'Dorsa Ghasemi, Milad Benam, Marjan Akhavan, Arman Musavi, Arash Sharghi, Soha Ghasemi',
  '2025-01-01',
  NULL,
  'Manuscript in preparation - Case report of misdiagnosed kidney squamous cell carcinoma.',
  NULL
),
(
  'Evaluation of p53 Expression by Immunohistochemistry in Non-M3 Acute Myeloid Leukemia (AML), Correlation with Induction Therapy Response and 1-Year Clinical Outcomes: A Retrospective Cohort Study',
  'Dorsa Ghasemi et al.',
  '2025-01-01',
  NULL,
  'Manuscript in preparation - Retrospective cohort study on p53 expression in AML.',
  NULL
),
(
  'Outcome of Acute Myeloid Leukemia Treatment and IDH Mutations: A Systematic Review and Meta-Analysis Study',
  'Fereshte Ameli, Alireza Abdollahi, Samaneh Saralvand, Dorsa Ghasemi',
  '2025-01-01',
  'International Journal of Hematology-Oncology and Stem Cell Research',
  'Systematic review and meta-analysis under review.',
  NULL
),
(
  'Lymphoproliferative Disorders',
  'Ameli F, Ghasemi D, Kosari F',
  '2025-07-17',
  'Handbook of Oral and Maxillofacial Surgery and Implantology',
  'Book chapter published by Springer Nature Switzerland.',
  NULL
);

-- Professional Experiences/Cases
-- date_to NULL = ongoing
INSERT INTO experiences (title, slug, description, content, hospital_name, date_from, date_to, category) VALUES
(
  'Laboratory Medical Directorship at Dr. Tahririan Medical Laboratory',
  'laboratory-director-tahririan',
  'Leading medical laboratory operations, quality control, and diagnostic services.',
  'Serving as Laboratory Medical Director at Dr. Tahririan Medical Laboratory since June 2022. Responsibilities include overseeing all laboratory operations, ensuring quality control standards, supervising diagnostic testing across multiple disciplines including hematology, biochemistry, serology, coagulation, blood bank, and microbiology. Providing expert consultation to physicians on test result interpretation and maintaining compliance with medical laboratory standards.',
  'Dr. Tahririan Medical Laboratory',
  '2022-06-01',
  NULL,
  'Laboratory Management'
),
(
  'Deputy Chief Physician of Hemovigilance',
  'hemovigilance-deputy-farabi',
  'Leading hemovigilance program and blood safety initiatives at Farabi Hospital.',
  'Served as Deputy Chief Physician of Hemovigilance at Farabi Hospital, Bastak, Iran from 2021-2024. Managed comprehensive hemovigilance program ensuring blood safety, monitoring adverse reactions, and implementing quality improvement initiatives. Collaborated with interdisciplinary teams to enhance patient safety in transfusion medicine.',
  'Farabi Hospital, Bastak',
  '2021-01-01',
  '2024-12-31',
  'Hemovigilance'
),
(
  'Laboratory Medical Directorship at Farabi Hospital',
  'laboratory-director-farabi',
  'Directing laboratory services and quality assurance at Farabi Hospital.',
  'Served as Laboratory Medical Director at Farabi Hospital, Bastak, Iran from 2021-2024. Managed comprehensive laboratory services including clinical pathology, hematology, biochemistry, microbiology, and blood bank operations. Implemented quality control programs, supervised laboratory staff, and ensured compliance with regulatory standards.',
  'Farabi Hospital, Bastak',
  '2021-01-01',
  '2024-12-31',
  'Laboratory Management'
),
(
  'Chief Resident in Pathology',
  'chief-resident-tehran',
  'Leading pathology residency program and educational activities.',
  'Served as Chief Resident at Tehran University of Medical Sciences from 2019-2020. Led residency program activities, coordinated educational sessions, mentored junior residents, and managed clinical pathology services. Recognized as Best Pathology Resident of Imam Khomeini Hospital Complex in 2018 and 2019.',
  'Tehran University of Medical Sciences',
  '2019-01-01',
  '2020-12-31',
  'Education'
),
(
  'Pathology Residency Training',
  'pathology-residency-tehran',
  'Comprehensive training in anatomical and clinical pathology.',
  'Completed residency in Anatomical and Clinical Pathology at Tehran University of Medical Sciences from 2017-2021. Gained extensive experience in surgical pathology, cytopathology, clinical pathology, and molecular diagnostics. Ranked 1st in Pathology Board examination (top 10%) in October 2021.',
  'Tehran University of Medical Sciences',
  '2017-01-01',
  '2021-12-31',
  'Education'
);

-- Supervision and Teaching
INSERT INTO supervision (title, description, institution, year, type) VALUES
(
  'Pathology Board Preparation Classes',
  'Conducted specialized board preparation classes for pathology residents, covering key topics in anatomical and clinical pathology, board examination strategies, and case-based learning.',
  'Tehran University of Medical Sciences',
  2022,
  'Teaching'
),
(
  'Resident Mentorship Program',
  'Mentored pathology residents during Chief Resident tenure, providing guidance on diagnostic pathology, case presentations, and professional development.',
  'Tehran University of Medical Sciences',
  2019,
  'Clinical Supervision'
),
(
  'COVID-19 Volunteer Medical Service',
  'Volunteered as doctor during COVID-19 pandemic at Imam Khomeini Hospital Complex, providing essential medical services and pathology consultation.',
  'Imam Khomeini Hospital Complex, Tehran',
  2020,
  'Volunteer'
);
