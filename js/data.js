/* Sample data (fictional) shared by all pages */
const DEPTS = [
 {slug:"cardiology",name:"Cardiology",icon:"heart",blurb:"Heart checks, rhythm care and rehabilitation.",
  about:"Our heart team looks after everything from a first blood-pressure check to emergency angioplasty, with non-invasive testing on site.",
  treats:["Chest pain and angina","High blood pressure","Heart rhythm problems","Heart failure follow-up","Cholesterol management"],
  procs:["ECG and 2D echo","Treadmill stress test","Holter monitoring","Angiography and angioplasty","Cardiac rehabilitation"]},
 {slug:"orthopaedics",name:"Orthopaedics",icon:"bone",blurb:"Bones, joints, sports injuries and physiotherapy.",
  about:"From fractures to joint replacement, we plan treatment with physiotherapy from day one so you get back to movement sooner.",
  treats:["Fractures and dislocations","Knee and hip arthritis","Back and neck pain","Sports injuries","Osteoporosis"],
  procs:["Fracture fixation","Knee and hip replacement","Arthroscopy","Spine consultation","Guided physiotherapy"]},
 {slug:"paediatrics",name:"Paediatrics",icon:"baby",blurb:"Newborn to adolescent care and vaccination.",
  about:"A child-friendly department with a separate waiting area, vaccination clinic and a round-the-clock newborn unit.",
  treats:["Fever and infections","Asthma and allergies","Growth and nutrition","Newborn jaundice","Developmental concerns"],
  procs:["Routine vaccination","Newborn screening","Nebulisation","Growth monitoring","Paediatric emergency care"]},
 {slug:"gynaecology",name:"Gynaecology & Obstetrics",icon:"flower",blurb:"Women's health, pregnancy and delivery.",
  about:"Antenatal care, safe delivery and women's health services delivered by a team that explains every step.",
  treats:["Pregnancy care","Irregular periods","PCOS","Menopause symptoms","Infertility concerns"],
  procs:["Antenatal check-ups","Normal and caesarean delivery","Ultrasound","Laparoscopic surgery","Family planning"]},
 {slug:"neurology",name:"Neurology",icon:"brain",blurb:"Brain, spine and nerve conditions.",
  about:"Rapid stroke response, epilepsy care and long-term management of migraine, neuropathy and movement disorders.",
  treats:["Stroke and TIA","Epilepsy","Migraine and headache","Nerve pain and numbness","Parkinson's disease"],
  procs:["EEG","Nerve conduction study","Stroke thrombolysis","Memory assessment","Botulinum injections for migraine"]},
 {slug:"medicine",name:"General Medicine",icon:"stetho",blurb:"First point of care and long-term conditions.",
  about:"Your first stop for fever, infections and ongoing conditions such as diabetes and thyroid disease.",
  treats:["Fever and infections","Diabetes","Thyroid disorders","Hypertension","Lifestyle conditions"],
  procs:["Complete health review","Diabetes education","Vaccination for adults","Day-care infusion","Referral coordination"]},
 {slug:"dermatology",name:"Dermatology",icon:"skin",blurb:"Skin, hair and nail care.",
  about:"Medical and minor-procedure care for skin, hair and nails, with allergy testing available on site.",
  treats:["Acne and scars","Eczema and allergies","Fungal infections","Hair loss","Pigmentation"],
  procs:["Patch allergy testing","Biopsy","Chemical peels","Wart and mole removal","Phototherapy"]},
 {slug:"emergency",name:"Emergency & Trauma",icon:"bolt",blurb:"Open every hour of every day.",
  about:"A triage-led emergency room with an ambulance bay, resuscitation beds and direct access to ICU and theatres.",
  treats:["Accidents and injuries","Heart attack and stroke","Breathing difficulty","Severe infections","Poisoning and burns"],
  procs:["Triage within minutes","Resuscitation bay","Trauma stabilisation","Emergency imaging","ICU transfer"]}
];
const LANGS_ALL=["English","Hindi","Gujarati"];
const DOCTORS = [
 {id:1,name:"Dr. Meera Shah",dept:"cardiology",qual:"MD, DM (Cardiology)",exp:16,days:[1,3,5],from:10,to:14,fee:800,langs:["English","Hindi","Gujarati"],bio:"Special interest in preventive cardiology and heart failure. Believes in explaining test results in plain language."},
 {id:2,name:"Dr. Kunal Bhatt",dept:"cardiology",qual:"MD, DNB (Cardiology)",exp:9,days:[2,4,6],from:15,to:18,fee:700,langs:["English","Hindi","Gujarati"],bio:"Runs the chest-pain clinic and the cardiac rehabilitation programme."},
 {id:3,name:"Dr. Rohan Desai",dept:"orthopaedics",qual:"MS (Ortho), Fellowship in Joint Replacement",exp:12,days:[2,4,6],from:11,to:15,fee:750,langs:["English","Hindi","Gujarati"],bio:"Performs knee and hip replacements and treats sports injuries in amateur and club athletes."},
 {id:4,name:"Dr. Farah Sheikh",dept:"orthopaedics",qual:"MS (Ortho)",exp:7,days:[1,3,5],from:9,to:12,fee:600,langs:["English","Hindi"],bio:"Focus on fracture care, spine pain and bone health in older adults."},
 {id:5,name:"Dr. Anjali Mehta",dept:"paediatrics",qual:"MD (Paediatrics)",exp:10,days:[1,2,3,4,5,6],from:9,to:13,fee:500,langs:["English","Hindi","Gujarati"],bio:"Cares for newborns to teenagers, with a gentle approach for anxious children and parents."},
 {id:6,name:"Dr. Vivek Chauhan",dept:"paediatrics",qual:"MD, Fellowship in Neonatology",exp:13,days:[1,3,5],from:14,to:17,fee:600,langs:["English","Hindi"],bio:"Leads the newborn unit and the high-risk follow-up clinic."},
 {id:7,name:"Dr. Kavita Joshi",dept:"gynaecology",qual:"MS (OBG), DGO",exp:14,days:[1,2,4],from:10,to:16,fee:700,langs:["English","Hindi","Gujarati"],bio:"Has supported thousands of deliveries and focuses on safe, informed birth choices."},
 {id:8,name:"Dr. Sneha Pandya",dept:"gynaecology",qual:"MD (OBG)",exp:8,days:[3,5,6],from:11,to:15,fee:600,langs:["English","Gujarati"],bio:"Interest in PCOS, adolescent health and minimally invasive surgery."},
 {id:9,name:"Dr. Sanjay Trivedi",dept:"neurology",qual:"MD, DM (Neurology)",exp:18,days:[3,5,6],from:12,to:16,fee:900,langs:["English","Hindi","Gujarati"],bio:"Leads the stroke programme and epilepsy clinic."},
 {id:10,name:"Dr. Pooja Patel",dept:"medicine",qual:"MD (Medicine)",exp:8,days:[1,2,3,4,5,6],from:9,to:17,fee:400,langs:["English","Hindi","Gujarati"],bio:"First-contact physician with a focus on diabetes and thyroid care."},
 {id:11,name:"Dr. Arjun Nair",dept:"medicine",qual:"MD, Fellowship in Critical Care",exp:11,days:[1,2,4,5],from:10,to:14,fee:500,langs:["English","Hindi"],bio:"Treats complex infections and manages patients who need ICU support."},
 {id:12,name:"Dr. Imran Qureshi",dept:"dermatology",qual:"MD (Dermatology, Venereology & Leprosy)",exp:9,days:[2,4,6],from:14,to:18,fee:600,langs:["English","Hindi","Gujarati"],bio:"Treats acne, eczema and hair problems and performs minor skin procedures."},
 {id:13,name:"Dr. Nirav Parikh",dept:"emergency",qual:"MD (Emergency Medicine)",exp:11,days:[0,1,2,3,4,5,6],from:9,to:17,fee:0,langs:["English","Hindi","Gujarati"],bio:"Heads the emergency room. Walk-ins are seen by triage priority, no appointment needed."}
];
const PACKAGES = [
 {id:"basic",name:"Essential Check",price:1499,pop:false,for:"Adults under 35",tests:["Complete blood count","Blood sugar (fasting)","Lipid profile","Kidney and liver panel","BMI and blood pressure","Doctor consultation"]},
 {id:"plus",name:"Complete Care",price:3499,pop:true,for:"Adults 35 to 50",tests:["Everything in Essential","Thyroid profile","HbA1c","ECG","Chest X-ray","Vitamin D and B12","Diet counselling"]},
 {id:"heart",name:"Heart Health",price:4999,pop:false,for:"Heart risk or family history",tests:["Everything in Complete Care","2D echo","Treadmill stress test","Advanced lipid markers","Cardiologist consultation"]},
 {id:"senior",name:"Senior Wellness",price:5499,pop:false,for:"Adults 60 and above",tests:["Everything in Complete Care","Bone density scan","Eye and hearing screen","Memory assessment","Physician and physiotherapy review"]}
];
const COMPARE=[["Blood and urine tests",1,1,1,1],["ECG",0,1,1,1],["Chest X-ray",0,1,1,1],["2D echo and stress test",0,0,1,0],["Bone density scan",0,0,0,1],["Specialist consultation",0,0,1,1],["Diet counselling",0,1,1,1]];
const TIPS = [
 {id:1,cat:"Heart",title:"Five habits that protect your heart",min:3,sum:"Small daily choices matter more than occasional big efforts.",body:["Walk briskly for 30 minutes on most days. Break it into three 10-minute walks if that is easier.","Cut back on salt and packaged snacks. Most of the salt we eat is hidden in processed food.","Do not ignore chest discomfort that spreads to the arm or jaw, or comes with sweating. Go to the emergency room straight away.","Check your blood pressure at least once a year after 30, and more often if it runs high."]},
 {id:2,cat:"Children",title:"Fever in children: when to worry",min:3,sum:"Most fevers are the body fighting infection, but some signs need quick attention.",body:["Dress your child lightly, offer fluids and let them rest. Do not use cold water or alcohol rubs.","Bring a baby under three months with any fever to a doctor the same day.","Seek urgent care for fits, a stiff neck, trouble breathing, a rash that does not fade when pressed, or a child who is very drowsy.","Give medicines only in the dose your doctor or the label advises for your child's weight."]},
 {id:3,cat:"Diabetes",title:"Eating well with diabetes",min:4,sum:"You do not need a special diet. You need a steady, balanced one.",body:["Fill half your plate with vegetables, a quarter with protein and a quarter with whole grains.","Eat at regular times. Skipping meals can cause swings in blood sugar.","Choose whole fruit over juice and limit sweet drinks.","Check your feet every day and tell your doctor about any cut that is slow to heal."]},
 {id:4,cat:"Bones",title:"Protect your knees and back",min:3,sum:"Strong muscles take pressure off joints.",body:["Strengthen the thighs and core with simple exercises, three times a week.","Avoid sitting for more than an hour at a time. Stand and stretch.","Keep a healthy weight. Every extra kilo adds several kilos of load on the knees.","See a doctor if pain wakes you at night or follows a fall."]},
 {id:5,cat:"Women",title:"A calm guide to antenatal visits",min:4,sum:"What usually happens at each stage of pregnancy care.",body:["Start folic acid before conception or as early as possible, as your doctor advises.","Expect regular check-ups, blood tests and scans at set weeks of pregnancy.","Report bleeding, severe headache, reduced baby movement or swelling of the face and hands without delay.","Ask questions about delivery choices early so there are no surprises later."]},
 {id:6,cat:"Mind",title:"Sleep: the cheapest medicine",min:3,sum:"Good sleep supports the heart, mood and immunity.",body:["Keep fixed sleep and wake times, even on weekends.","Keep screens out of the bedroom for the last hour before sleep.","Avoid caffeine after mid-afternoon and heavy meals late at night.","If you snore loudly or feel tired despite a full night, ask your doctor about a sleep assessment."]},
 {id:7,cat:"Skin",title:"Everyday skin care that works",min:2,sum:"A simple routine beats a shelf full of products.",body:["Use a gentle cleanser, a moisturiser and sunscreen of SPF 30 or more.","Do not squeeze pimples. It raises the chance of scars.","See a dermatologist for a mole that changes in size, shape or colour.","Patch-test a new product on your inner arm before using it on your face."]},
 {id:8,cat:"Emergency",title:"Know these emergency warning signs",min:2,sum:"Do not wait for an appointment if you see these.",body:["Chest pain, sudden weakness on one side, slurred speech or a drooping face.","Severe breathing difficulty, heavy bleeding or loss of consciousness.","A serious injury, burn or suspected poisoning.","Go straight to the emergency entrance or call your local emergency ambulance service."]}
];
const FAQS = [
 {c:"Appointments",q:"Do I need an appointment for OPD?",a:"Walk-ins are welcome, but booking online gives you a fixed time with your doctor and shorter waiting."},
 {c:"Appointments",q:"Can I reschedule or cancel?",a:"Yes. Use the booking ID on the Appointment page to view or cancel a booking, then choose a new slot."},
 {c:"Appointments",q:"How early should I arrive?",a:"Please arrive 15 minutes before your slot for registration and vitals."},
 {c:"Your visit",q:"What should I bring to my first visit?",a:"A photo ID, old reports and prescriptions, your insurance card if you have one, and a list of current medicines."},
 {c:"Your visit",q:"What are the visiting hours?",a:"General ward 5 PM to 7 PM, with two visitors at a time. ICU and NICU at 11 AM and 6 PM for 15 minutes, one visitor at a time."},
 {c:"Your visit",q:"Are children allowed to visit patients?",a:"Children under 12 are not allowed in wards or intensive care to protect them and the patients from infection."},
 {c:"Billing and insurance",q:"Do you accept health insurance?",a:"We work with most major insurers and government schemes. Bring your policy details and our help desk will confirm cashless eligibility before admission."},
 {c:"Billing and insurance",q:"Will I get an estimate before admission?",a:"Yes. For planned admissions and surgery we give a written estimate that explains what is and is not included."},
 {c:"Reports",q:"How do I collect my reports?",a:"Reports are ready within the time told at the counter. Collect them from the lab or the OPD desk with your registration number."},
 {c:"Reports",q:"Can I get a second opinion?",a:"Of course. We will provide copies of your records so another doctor can review them."}
];
function hueFor(n){return (n*47+160)%360}
function avatarStyle(id){return `background:linear-gradient(135deg,hsl(${hueFor(id)} 45% 34%),hsl(${(hueFor(id)+30)%360} 50% 24%))`}
function initials(name){return name.replace("Dr. ","").split(" ").map(w=>w[0]).join("").slice(0,2)}
function deptName(slug){const d=DEPTS.find(x=>x.slug===slug);return d?d.name:slug}
const DAYN=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
function fmtHour(h){const ap=h>=12?"PM":"AM";const x=h%12||12;return x+":00 "+ap}
function daysText(d){return d.length===7?"Every day":d.length===6&&!d.includes(0)?"Mon to Sat":d.map(i=>DAYN[i]).join(", ")}
function availableToday(doc){return doc.days.includes(new Date().getDay())}
const KEY="arogyaBookings";
function loadBk(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return []}}
function saveBk(l){try{localStorage.setItem(KEY,JSON.stringify(l))}catch(e){}}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
