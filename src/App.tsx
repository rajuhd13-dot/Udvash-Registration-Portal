/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, Facebook, Youtube, Instagram, Linkedin, ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

const TorchLogo = ({ color = "black", className = "" }: { color?: string, className?: string }) => {
  const [error, setError] = useState(false);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center">
        {!error ? (
          <img 
            src="/logo.png" 
            alt="Udvash Logo" 
            className={`w-[180px] h-auto object-contain ${color === 'white' ? 'brightness-0 invert' : ''}`}
            referrerPolicy="no-referrer"
            onError={() => {
              console.warn("Logo not found at /logo.png, using SVG fallback");
              setError(true);
            }}
          />
        ) : (
          <div className="flex items-center">
            {/* SVG Fallback */}
            <div className="w-[50px] h-[65px] relative mr-2">
              <svg viewBox="0 0 100 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="60" width="35" height="45" rx="8" fill={color === 'white' ? 'white' : 'black'} />
                <path d="M23 72V87C23 91 25 93 32 93C39 93 42 91 42 87V72H37V87C37 88 36 89 32 89C28 89 27 88 27 87V72H23Z" fill={color === 'white' ? 'black' : 'white'} />
                <path d="M35 15C30 25 25 35 28 45C32 40 35 30 38 18L35 15Z" fill="#8BC34A" />
                <path d="M30 45C25 55 20 65 25 75C30 70 33 60 35 48L30 45Z" fill="#EB2F36" />
                <path d="M40 8C38 20 38 30 42 45C45 35 45 25 43 12L40 8Z" fill="#FBC02D" />
                <path d="M45 15C48 25 50 35 48 45C52 40 55 30 52 18L45 15Z" fill="#7E57C2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className={`text-[36px] font-bold ${color === 'white' ? 'text-white' : 'text-[#EB2F36]'} leading-none mb-1`} style={{ fontFamily: '"Hind Siliguri", sans-serif' }}>উদ্ভাস</span>
              <span className={`text-[12px] font-bold ${color === 'white' ? 'text-slate-200' : 'text-slate-900'} tracking-tight whitespace-nowrap`} style={{ fontFamily: '"Hind Siliguri", sans-serif' }}>একাডেমিক এন্ড এডমিশন কেয়ার</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 md:px-24 py-4 bg-white border-b border-zinc-100 shadow-sm sticky top-0 z-50">
      <TorchLogo />

      <div className="hidden md:flex items-center gap-10">
        <div className="flex items-center gap-8 text-[15px] font-bold">
          <a href="#" className="text-slate-800 hover:text-udvash-red transition-colors">প্রোগ্রামসমূহ</a>
          <a href="#" className="text-udvash-red">সাফল্য ২০২৫</a>
          <a href="#" className="text-slate-800 hover:text-udvash-red transition-colors">শাখাসমূহ</a>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="w-10 h-10 rounded-full border border-zinc-400 flex items-center justify-center text-slate-800 cursor-pointer hover:bg-zinc-50 hover:border-zinc-500 transition-all">
            <Phone size={20} />
          </div>
          <button className="bg-linear-to-r from-udvash-red to-[#C62828] text-white px-10 py-3 rounded-full font-bold text-[16px] shadow-lg shadow-red-500/20 transition-all active:scale-95 cursor-pointer">
            Join Now
          </button>
        </div>
      </div>
    </nav>
  );
};

const subjects = [
  "Bangla", "English", "General Mathematics", "General Science", "Agriculture Studies", 
  "Home Science", "ICT", "Physical Education & Health", "Art and Crafts", 
  "Islam and Moral Education", "Hindu Religion and Moral Education", 
  "Christian Religion and Moral Education", "Buddhist Religion and Moral Education",
  "Mathematics", "Social Science", "Computer Study", "Biology", "Physics", "Chemistry", 
  "Higher Mathematics", "Statistics", "Architecture", "BGS", "C Programming", 
  "General Knowledge", "Mathematical Physics", "Mathematical Chemistry",
  "Bangla 1st Paper", "Bangla 2nd Paper", "Kormamukhi Shikkha", "English 1st Paper", 
  "English 2nd Paper", "Chemistry 1st Paper", "Chemistry 2nd Paper", "Physics 1st Paper", 
  "Physics 2nd Paper", "Higher Mathematics 1st Paper", "Higher Mathematics 2nd Paper", 
  "Biology 1st Paper", "Biology 2nd Paper", "Computer 1st Paper", "Computer 2nd Paper"
];

const scriptEvaluationSubjectsList = [
  "Bangla",
  "English",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "ICT"
];

const RegistrationCard = () => {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [userImage, setUserImage] = useState<File | null>(null);
  const [userImagePreview, setUserImagePreview] = useState<string>("");
  const [idCard, setIdCard] = useState<File | null>(null);
  const [idCardPreview, setIdCardPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [isShiftDropdownOpen, setIsShiftDropdownOpen] = useState(false);
  const shiftRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    nickName: "",
    institute: "",
    department: "",
    hscPassingYear: "0",
    religion: "",
    gender: "",
    mobileNumber2: "",
    email: "",
    facebookId: "",
    subjects: ["", "", "", ""],
    scriptSubjects: ["", "", "", ""],
    versionPriority: ["", ""],
    teachersPin: "",
    nagadNumber: "",
    teamsTelegram: "",
    admissionPosition: "",
    admissionUnit: "",
    hscRoll: "",
    hscRegistration: "",
    hscBoard: "",
    gpa: "",
    evaluationMethod: "",
    bengaliName: "",
    dob: "",
    bloodGroup: "",
    collegeName: "",
    fatherName: "",
    fatherOccupation: "",
    fatherMobile: "",
    motherName: "",
    motherOccupation: "",
    motherMobile: "",
    nid: "",
    presentArea: "",
    homeDistrict: "",
    campus: "",
    evaluationShift: [] as string[],
    isAcademicStudent: "No",
    whyJoin: "",
    mediumOfEducation: ""
  });

  useEffect(() => {
    return () => {
      if (userImagePreview) URL.revokeObjectURL(userImagePreview);
      if (idCardPreview) URL.revokeObjectURL(idCardPreview);
    };
  }, [userImagePreview, idCardPreview]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shiftRef.current && !shiftRef.current.contains(event.target as Node)) {
        setIsShiftDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (field: string, value: any) => {
    // Basic numeric validation for specific fields
    if (['hscRoll', 'hscRegistration', 'nagadNumber', 'fatherMobile', 'motherMobile', 'nid'].includes(field)) {
      const isOALevel = formData.mediumOfEducation === "English Medium (O/A Level)";
      const numericValue = value.replace(/[^0-9]/g, '');
      
      // Character limits
      if (field === 'hscRoll' && !isOALevel && numericValue.length > 6) return;
      if (field === 'hscRegistration' && !isOALevel && numericValue.length > 10) return;
      if (['nagadNumber', 'fatherMobile', 'motherMobile'].includes(field) && numericValue.length > 11) return;
      if (field === 'nid' && numericValue.length > 17) return;

      setFormData(prev => ({ ...prev, [field]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addSubject = () => {
    if (isScriptEvaluationActive) {
      if (formData.scriptSubjects.length < scriptEvaluationSubjectsList.length) {
        setFormData(prev => ({ ...prev, scriptSubjects: [...prev.scriptSubjects, ""] }));
      }
    } else {
      if (formData.subjects.length < 8) {
        setFormData(prev => ({ ...prev, subjects: [...prev.subjects, ""] }));
      }
    }
  };

  const handleNestedInputChange = (field: 'subjects' | 'scriptSubjects' | 'versionPriority', index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const isScriptEvaluationActive = choices.some(c => c === "Script Evaluation");
  const isStandardActivityActive = choices.some(c => 
    c !== "" && c !== "Script Evaluation"
  );
  const showStandardSubjects = !isScriptEvaluationActive || isStandardActivityActive;

  const handleSubmit = async () => {
    setShowErrors(true);
    // Validation
    const requiredFields: (keyof typeof formData)[] = [
      'fullName', 'nickName', 'institute', 'department', 'religion', 'gender', 'email', 'hscPassingYear', 'mobileNumber2'
    ];

    if (isScriptEvaluationActive) {
      if (!userImage) {
        alert("Please upload your Passport Size Photo");
        return;
      }
      if (!idCard) {
        alert("Please upload your University ID Card/Receipt");
        return;
      }
      const isOALevel = formData.mediumOfEducation === "English Medium (O/A Level)";
      const scriptRequiredFields: (keyof typeof formData)[] = [
        'teamsTelegram', 'admissionUnit', 'admissionPosition', 'hscRoll', 'hscRegistration',
        'gpa', 'evaluationMethod', 'bengaliName', 'dob', 'bloodGroup',
        'collegeName', 'fatherName', 'fatherOccupation', 'fatherMobile', 'motherName',
        'motherOccupation', 'motherMobile', 'nid', 'presentArea', 'homeDistrict',
        'campus', 'evaluationShift', 'mediumOfEducation'
      ];
      
      if (!isOALevel) {
        scriptRequiredFields.push('hscBoard');
      }

      requiredFields.push(...scriptRequiredFields);

      // Duplicate Script Subject Check
      const selectedScriptSubjects = formData.scriptSubjects.filter(s => s !== "");
      const uniqueScriptSubjects = new Set(selectedScriptSubjects);
      if (selectedScriptSubjects.length !== uniqueScriptSubjects.size) {
        alert("You have selected the same subject multiple times in Script Evaluation. Please select unique subjects.");
        return;
      }

      if (!isOALevel) {
        if (formData.hscRoll && formData.hscRoll.length !== 6) {
          alert("HSC Roll must be exactly 6 digits");
          return;
        }
        if (formData.hscRegistration && formData.hscRegistration.length !== 10) {
          alert("HSC Registration must be exactly 10 digits");
          return;
        }
      }
    }

    const missingFields = requiredFields.filter(f => {
      const val = formData[f];
      if (Array.isArray(val)) return val.length === 0;
      return !val || (typeof val === 'string' && val.trim() === '');
    });
    if (missingFields.length > 0) {
      alert("Please fill all required fields");
      return;
    }

    if (choices[0] === "") {
      alert("Please select at least one Teacher Activity choice");
      return;
    }
    
    // Validate Standard Subjects if standard activities are active
    if (showStandardSubjects && formData.subjects[0] === "") {
      alert("Please select at least one Subject choice for your activities");
      return;
    }
    
    // Validate Script Subjects if Script Evaluation is active
    if (isScriptEvaluationActive && formData.scriptSubjects[0] === "") {
      alert("Please select at least one Subject choice for Script Evaluation");
      return;
    }

    if (formData.versionPriority[0] === "") {
      alert("Please select Version Priority");
      return;
    }

    // Duplicate Teacher Activity Check
    const selectedActivities = choices.filter(c => c !== "");
    const uniqueActivities = new Set(selectedActivities);
    if (selectedActivities.length !== uniqueActivities.size) {
      alert("You have selected the same Activity multiple times. Please select unique activities.");
      return;
    }

    // Duplicate Subject Check
    const selectedSubjects = formData.subjects.filter(s => s !== "");
    const uniqueSubjects = new Set(selectedSubjects);
    if (selectedSubjects.length !== uniqueSubjects.size) {
      alert("You have selected the same Subject multiple times. Please select unique subjects.");
      return;
    }

    // Duplicate Version Priority Check
    const selectedVersionPriority = formData.versionPriority.filter(v => v !== "");
    const uniqueVersionPriority = new Set(selectedVersionPriority);
    if (selectedVersionPriority.length !== uniqueVersionPriority.size) {
      alert("You have selected the same Version multiple times in Version Priority. Please select unique versions.");
      return;
    }

    setIsSubmitting(true);
    console.log("Submitting formData:", formData);
    console.log("Bengali Name in formData:", formData.bengaliName);
    try {
      const dataToSubmit = {
        ...formData,
        mobileNumber1: mobileNumber,
        activities: choices, // Use the correct key for server mapping
        userImgName: userImage?.name || '',
        idCardName: idCard?.name || '',
        // Ensure bengaliName is explicitly passed if it somehow gets lost
        bengaliName: formData.bengaliName
      };
      console.log("Sending data to /api/submit:", dataToSubmit);

      let response: Response | undefined;
      let isFallbackUsed = false;

      try {
        response = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSubmit)
        });
      } catch (err) {
        console.warn("Express server submission failed or unavailable, trying direct Google Sheet fallback...", err);
      }

      if (!response || !response.ok) {
        isFallbackUsed = true;
        console.log("Using direct Google Sheet fallback...");

        const formatString = (val: any) => {
          if (val === undefined || val === null || val === '') return '';
          return `'${val}`;
        };

        const mappedData = {
          'Timestamp': new Date().toLocaleString('en-GB'),
          'Full Name': dataToSubmit.fullName || '',
          'Nick Name': dataToSubmit.nickName || '',
          'T-PIN': formatString(dataToSubmit.teachersPin),
          'Institute': dataToSubmit.institute || '',
          'Department': dataToSubmit.department || '',
          'HSC Passing Year': dataToSubmit.hscPassingYear || '',
          'Religion': dataToSubmit.religion || '',
          'Gender': dataToSubmit.gender || '',
          'Mobile Number 1': formatString(dataToSubmit.mobileNumber1),
          'Mobile Number 2': formatString(dataToSubmit.mobileNumber2),
          'Nagad Number': formatString(dataToSubmit.nagadNumber),
          'Email': dataToSubmit.email || '',
          'Facebook ID': dataToSubmit.facebookId || '',
          'Teacher Activity Choice 1': dataToSubmit.activities?.[0] || '',
          'Teacher Activity Choice 2': dataToSubmit.activities?.[1] || '',
          'Teacher Activity Choice 3': dataToSubmit.activities?.[2] || '',
          'Teacher Activity Choice 4': dataToSubmit.activities?.[3] || '',
          'Subjects': (() => {
            const subjects = (dataToSubmit.subjects || []).filter((s: any) => s && String(s).trim() !== '');
            const scriptSubjects = (dataToSubmit.scriptSubjects || [])
              .filter((s: any) => s && String(s).trim() !== '')
              .map((s: any) => `(Script E: ${s})`);
            return Array.from(new Set([...subjects, ...scriptSubjects])).join(', ');
          })(),
          'Version Priority Choice 1': dataToSubmit.versionPriority?.[0] || '',
          'Version Priority Choice 2': dataToSubmit.versionPriority?.[1] || '',
          'Medium of Study (HSC Level)': dataToSubmit.mediumOfEducation || '',
          'MS Teams Telegram': dataToSubmit.teamsTelegram || '',
          'Admition Unit': dataToSubmit.admissionUnit || '',
          'Admission Position': formatString(dataToSubmit.admissionPosition),
          'HSC Number': formatString(dataToSubmit.hscRoll),
          'HSC Reg Number': formatString(dataToSubmit.hscRegistration),
          'HSC Board': dataToSubmit.hscBoard || '',
          'HSC GPA': formatString(dataToSubmit.gpa),
          'Evaluation Method': dataToSubmit.evaluationMethod || '',
          'বাংলায় সম্পূর্ণ নাম': dataToSubmit.bengaliName || '',
          'Date of Birth': dataToSubmit.dob || '',
          'Blood Group': dataToSubmit.bloodGroup || '',
          'College Name': dataToSubmit.collegeName || '',
          'Fathers Name': dataToSubmit.fatherName || '',
          'Fathers Occupation': dataToSubmit.fatherOccupation || '',
          'Fathers Mobile': formatString(dataToSubmit.fatherMobile),
          'Mothers Name': dataToSubmit.motherName || '',
          'Mothers Occupation': dataToSubmit.motherOccupation || '',
          'Mothers Mobile': formatString(dataToSubmit.motherMobile),
          'National ID No': formatString(dataToSubmit.nid),
          'Present Area': dataToSubmit.presentArea || '',
          'Home District': dataToSubmit.homeDistrict || '',
          'Campus': dataToSubmit.campus || '',
          'Evaluation Shift': Array.isArray(dataToSubmit.evaluationShift) ? dataToSubmit.evaluationShift.join(', ') : (dataToSubmit.evaluationShift || ''),
          'Image File Name': dataToSubmit.userImgName || '',
          'ID Card File Name': dataToSubmit.idCardName || '',
          'Academic Student': dataToSubmit.isAcademicStudent || '',
          'Why Join': dataToSubmit.whyJoin || '',
          'Action': 'Pending',
          'action': 'registration'
        };

        const directUrl = (import.meta as any).env.VITE_GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbwTXbsmEtgztw83lVTZbByxFEeILxk9P43Mg44cKNLHSQduiZz9Tcjs6uBIUVEFuQKoCQ/exec";

        const fallbackResponse = await fetch(directUrl, {
          method: "POST",
          body: JSON.stringify(mappedData),
          headers: { "Content-Type": "text/plain" },
          mode: "cors"
        });

        if (!fallbackResponse.ok) {
          const errMsg = await fallbackResponse.text();
          throw new Error(`Direct fallback failed with status ${fallbackResponse.status}: ${errMsg}`);
        }

        const fallbackResult = await fallbackResponse.json();
        if (fallbackResult.success || fallbackResult.status === "success") {
          alert("Successfully submitted to Google Sheets!");
        } else {
          throw new Error(fallbackResult.error || "Direct submission failed");
        }
      } else {
        const result = await response.json();
        console.log("Result received:", result);
        if (result.success) {
          alert(result.message);
        } else {
          const errorMsg = result.details ? `${result.error}: ${result.details}` : (result.error || "Submission failed");
          alert(errorMsg);
        }
      }
    } catch (error: any) {
      console.error("Submission failed:", error);
      alert("Something went wrong! Error: " + (error?.message || "Please check browser console for details."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (mobileNumber.trim().length === 11 && /^\d+$/.test(mobileNumber)) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (mobileNumber.trim().length === 0) {
      alert("Please enter your mobile number");
    } else {
      alert("Mobile number must be exactly 11 digits");
    }
  };

  const choiceOptions = ["Teaching", "Script Evaluation", "Materials Development", "Question & Answer"];

  if (step === 1) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[850px] registration-container overflow-hidden"
        >
          <div className="bg-[#D9E1E5] py-5 text-center border-b border-slate-300">
            <h2 className="text-[22px] font-bold text-[#3E4E59] tracking-[0.3em]">REGISTRATION</h2>
          </div>
          <div className="p-20 md:p-32 flex flex-col items-center justify-center gap-10">
            <div className="w-full max-w-lg">
              <input 
                type="text" 
                value={mobileNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 11) {
                    setMobileNumber(val);
                  }
                }}
                placeholder="Enter Your Mobile Number"
                className="w-full px-6 py-4 border border-slate-300 rounded-[4px] focus:outline-none focus:border-udvash-pink text-center placeholder:text-slate-400 text-slate-700 text-[18px] transition-all bg-white"
              />
            </div>
            <button 
              onClick={handleNext}
              className="bg-linear-to-r from-[#F07A7F] to-[#ED508B] text-white font-bold py-4 px-20 rounded-full text-xl shadow-[0_8px_20px_rgba(237,80,139,0.3)] hover:shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              Next
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 mb-32 px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="registration-container shadow-2xl"
      >
        <div className="bg-[#CFD8DC] py-3 text-center border-b border-slate-300">
          <h2 className="text-[18px] font-bold text-slate-700 tracking-[0.2em]">REGISTRATION</h2>
        </div>
        
        <div className="p-6 md:p-10 bg-white">
          {/* Personal Info */}
          <section className="mb-10">
            <h3 className="text-[22px] font-bold text-slate-700 mb-6 border-b border-slate-200 pb-2">Personal Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Full Name</label>
                <div className="flex-1 flex flex-col gap-1">
                  <input 
                    type="text" 
                    placeholder="Enter Full Name" 
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                      showErrors && !formData.fullName 
                        ? 'border-red-500 focus:border-red-600 bg-red-50' 
                        : 'border-slate-300 focus:border-udvash-pink'
                    }`} 
                  />
                  {showErrors && !formData.fullName && (
                    <span className="text-[10px] text-red-500 font-medium">Full Name is required</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Nick Name</label>
                <div className="flex-1 flex flex-col gap-1">
                  <input 
                    type="text" 
                    placeholder="Enter Nick Name" 
                    value={formData.nickName}
                    onChange={(e) => handleInputChange('nickName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                      showErrors && !formData.nickName 
                        ? 'border-red-500 focus:border-red-600 bg-red-50' 
                        : 'border-slate-300 focus:border-udvash-pink'
                    }`} 
                  />
                  {showErrors && !formData.nickName && (
                    <span className="text-[10px] text-red-500 font-medium">Nick Name is required</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Institute</label>
                <div className="flex-1 flex flex-col gap-1">
                  <input 
                    type="text" 
                    placeholder="Enter Institute Name" 
                    value={formData.institute}
                    onChange={(e) => handleInputChange('institute', e.target.value)}
                    className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                      showErrors && !formData.institute 
                        ? 'border-red-500 focus:border-red-600 bg-red-50' 
                        : 'border-slate-300 focus:border-udvash-pink'
                    }`} 
                  />
                  {showErrors && !formData.institute && (
                    <span className="text-[10px] text-red-500 font-medium">Institute is required</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Department</label>
                <div className="flex-1 flex flex-col gap-1">
                  <input 
                    type="text" 
                    placeholder="Enter Department Name" 
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                      showErrors && !formData.department 
                        ? 'border-red-500 focus:border-red-600 bg-red-50' 
                        : 'border-slate-300 focus:border-udvash-pink'
                    }`} 
                  />
                  {showErrors && !formData.department && (
                    <span className="text-[10px] text-red-500 font-medium">Department is required</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">HSC Passing Year</label>
                <div className="flex-1 flex flex-col gap-1">
                  <input 
                    type="number" 
                    value={formData.hscPassingYear}
                    onChange={(e) => handleInputChange('hscPassingYear', e.target.value)}
                    className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                      showErrors && (!formData.hscPassingYear || formData.hscPassingYear === "0")
                        ? 'border-red-500 focus:border-red-600 bg-red-50' 
                        : 'border-slate-300 focus:border-udvash-pink'
                    }`} 
                  />
                  {showErrors && (!formData.hscPassingYear || formData.hscPassingYear === "0") && (
                    <span className="text-[10px] text-red-500 font-medium">HSC Passing Year is required</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Religion</label>
                <div className="flex-1 flex flex-col gap-1">
                  <select 
                    value={formData.religion}
                    onChange={(e) => handleInputChange('religion', e.target.value)}
                    className={`w-full px-3 py-2 border rounded outline-none text-sm bg-white transition-colors ${
                      showErrors && !formData.religion 
                        ? 'border-red-500 focus:border-red-600 bg-red-50' 
                        : 'border-slate-300 focus:border-udvash-pink'
                    }`}
                  >
                    <option value="">--Select Religion--</option>
                    <option value="Islam">Islam</option>
                    <option value="Hinduism">Hinduism</option>
                    <option value="Christianity">Christianity</option>
                    <option value="Buddhism">Buddhism</option>
                  </select>
                  {showErrors && !formData.religion && (
                    <span className="text-[10px] text-red-500 font-medium">Religion is required</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Gender</label>
                <div className="flex-1 flex flex-col gap-1">
                  <select 
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className={`w-full px-3 py-2 border rounded outline-none text-sm bg-white transition-colors ${
                      showErrors && !formData.gender 
                        ? 'border-red-500 focus:border-red-600 bg-red-50' 
                        : 'border-slate-300 focus:border-udvash-pink'
                    }`}
                  >
                    <option value="">--Select Gender--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {showErrors && !formData.gender && (
                    <span className="text-[10px] text-red-500 font-medium">Gender is required</span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <section className="mb-10">
            <h3 className="text-[22px] font-bold text-slate-700 mb-6 border-b border-slate-200 pb-2">Contact Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Mobile Number 1</label>
                <input type="text" readOnly value={mobileNumber} className="flex-1 px-3 py-2 border border-slate-300 rounded bg-slate-50 text-slate-500 text-sm" />
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Mobile Number 2</label>
                <div className="flex-1 flex flex-col gap-1">
                  <input 
                    type="text" 
                    placeholder="Enter Mobile Number" 
                    value={formData.mobileNumber2}
                    onChange={(e) => handleInputChange('mobileNumber2', e.target.value)}
                    className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                      showErrors && !formData.mobileNumber2 
                        ? 'border-red-500 focus:border-red-600 bg-red-50' 
                        : 'border-slate-300 focus:border-udvash-pink'
                    }`} 
                  />
                  {showErrors && !formData.mobileNumber2 && (
                    <span className="text-[10px] text-red-500 font-medium">Mobile Number is required</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Email</label>
                <div className="flex-1 flex flex-col gap-1">
                  <input 
                    type="email" 
                    placeholder="Enter Valid Email (abc@example.xyz)" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                      showErrors && !formData.email 
                        ? 'border-red-500 focus:border-red-600 bg-red-50' 
                        : 'border-slate-300 focus:border-udvash-pink'
                    }`} 
                  />
                  {showErrors && !formData.email && (
                    <span className="text-[10px] text-red-500 font-medium">Email is required</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Facebook ID</label>
                <input 
                  type="text" 
                  placeholder="Enter Facebook ID (Optional)" 
                  value={formData.facebookId}
                  onChange={(e) => handleInputChange('facebookId', e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded focus:border-udvash-pink outline-none text-sm" 
                />
              </div>
            </div>
          </section>

          {/* Teacher Activity */}
          <section className="mb-10">
            <h3 className="text-[22px] font-bold text-slate-700 mb-6 border-b border-slate-200 pb-2">Teacher Activity</h3>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Teacher Activity</label>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[0, 1, 2, 3].map((i) => {
                    const isDuplicate = choices[i] !== "" && choices.filter((c, idx) => idx !== i && c === choices[i]).length > 0;
                    return (
                      <select 
                        key={i}
                        value={choices[i]}
                        onChange={(e) => {
                          const newChoices = [...choices];
                          newChoices[i] = e.target.value;
                          setChoices(newChoices);
                        }}
                        className={`px-2 py-2 border rounded text-xs bg-white outline-none transition-colors ${
                          (showErrors && i === 0 && !choices[0]) || isDuplicate
                            ? 'border-red-500 focus:border-red-600 bg-red-50'
                            : 'border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                        }`}
                      >
                        <option value="">{i === 0 ? "--Choice 1--" : `--Choice ${i+1} (Optional)--`}</option>
                        {choiceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Subject</label>
                <div className="flex-1 flex flex-col gap-3">
                  {showStandardSubjects && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {formData.subjects.map((sub, i) => {
                        const isDuplicate = sub !== "" && formData.subjects.filter((s, idx) => idx !== i && s === sub).length > 0;
                        return (
                          <select 
                            key={i}
                            value={sub}
                            onChange={(e) => handleNestedInputChange('subjects', i, e.target.value)}
                            className={`px-2 py-2 border rounded text-xs bg-white outline-none transition-colors ${
                              (showErrors && i === 0 && !formData.subjects[0]) || isDuplicate
                                ? 'border-red-500 focus:border-red-600 bg-red-50'
                                : 'border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                            }`}
                          >
                            <option value="">{i === 0 ? "--Choice 1--" : `--Choice ${i+1} (Optional)--`}</option>
                            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        );
                      })}
                    </div>
                  )}

                  {isScriptEvaluationActive && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2"
                    >
                      {formData.scriptSubjects.map((sub, i) => {
                        const isDuplicate = sub !== "" && formData.scriptSubjects.filter(s => s === sub).length > 1;
                        return (
                          <select 
                            key={i}
                            value={sub}
                            onChange={(e) => handleNestedInputChange('scriptSubjects', i, e.target.value)}
                            className={`px-2 py-2 border rounded text-xs bg-white outline-none transition-colors ${
                              (showErrors && i === 0 && !formData.scriptSubjects[0]) || isDuplicate
                                ? 'border-red-500 focus:border-red-600 bg-red-50'
                                : 'border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                            }`}
                          >
                            <option value="">{i === 0 ? "Choice 1 (Script Evaluation)" : `--Choice ${i+1} (Optional)--`}</option>
                            {scriptEvaluationSubjectsList.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        );
                      })}
                    </motion.div>
                  )}

                  {isScriptEvaluationActive && formData.scriptSubjects.length < scriptEvaluationSubjectsList.length && (
                    <div className="flex">
                      <button 
                        onClick={addSubject}
                        className="w-full sm:w-auto px-6 py-2 border border-dashed border-udvash-pink rounded text-xs bg-pink-50 text-udvash-pink hover:bg-pink-100 flex items-center justify-center font-bold"
                      >
                        + Add Subject
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Version Priority</label>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                  {(isScriptEvaluationActive ? [0] : [0, 1]).map((i) => {
                    const isDuplicate = formData.versionPriority[i] !== "" && formData.versionPriority.filter((v, idx) => idx !== i && v === formData.versionPriority[i]).length > 0;
                    return (
                      <select 
                        key={i}
                        value={formData.versionPriority[i]}
                        onChange={(e) => handleNestedInputChange('versionPriority', i, e.target.value)}
                        className={`px-2 py-2 border rounded text-xs bg-white outline-none transition-colors ${
                          (showErrors && i === 0 && !formData.versionPriority[0]) || isDuplicate
                            ? 'border-red-500 focus:border-red-600 bg-red-50'
                            : 'border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
                        }`}
                      >
                        <option value="">{i === 0 ? (isScriptEvaluationActive ? "--Select Version--" : "--Choice 1--") : `--Choice ${i+1} (Optional)--`}</option>
                        <option value="Bangla">Bangla</option>
                        <option value="English">English</option>
                        {isScriptEvaluationActive && <option value="Both">Both</option>}
                      </select>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Script Evaluation Dynamic Fields */}
          {isScriptEvaluationActive && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <section className="mb-10">
                <h3 className="text-[22px] font-bold text-slate-700 mb-6 border-b border-slate-200 pb-2">Script Evaluation Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Academic & Professional Info (Column 1) */}
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Medium of Study (HSC Level)</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <select 
                        value={formData.mediumOfEducation}
                        onChange={(e) => handleInputChange('mediumOfEducation', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm bg-white transition-colors ${
                          showErrors && !formData.mediumOfEducation 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`}
                      >
                        <option value="">--Select Medium--</option>
                        <option value="Bangla Medium">Bangla Medium</option>
                        <option value="English Version">English Version</option>
                        <option value="English Medium (O/A Level)">English Medium (O/A Level)</option>
                      </select>
                      {showErrors && !formData.mediumOfEducation && (
                        <span className="text-[10px] text-red-500 font-medium">Medium of study is required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Teachers Pin (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="Teachers Pin (Optional)" 
                      value={formData.teachersPin}
                      onChange={(e) => handleInputChange('teachersPin', e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded focus:border-udvash-pink outline-none text-sm" 
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Nagad Number (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="Nagad Number (Optional)" 
                      value={formData.nagadNumber}
                      onChange={(e) => handleInputChange('nagadNumber', e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded focus:border-udvash-pink outline-none text-sm" 
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">MS Teams/Telegram</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder="ID or Username" 
                        value={formData.teamsTelegram}
                        onChange={(e) => handleInputChange('teamsTelegram', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.teamsTelegram 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.teamsTelegram && (
                        <span className="text-[10px] text-red-500 font-medium">ID or Username is required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Admission Unit</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder="Unit" 
                        value={formData.admissionUnit}
                        onChange={(e) => handleInputChange('admissionUnit', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.admissionUnit 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.admissionUnit && (
                        <span className="text-[10px] text-red-500 font-medium">Unit is required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Admission Position</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder="Position" 
                        value={formData.admissionPosition}
                        onChange={(e) => handleInputChange('admissionPosition', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.admissionPosition 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.admissionPosition && (
                        <span className="text-[10px] text-red-500 font-medium">Position is required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">
                      {formData.mediumOfEducation === "English Medium (O/A Level)" ? "Candidate Number" : "HSC Roll Number"}
                    </label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder={formData.mediumOfEducation === "English Medium (O/A Level)" ? "Candidate Number" : "HSC Roll"} 
                        value={formData.hscRoll}
                        onChange={(e) => handleInputChange('hscRoll', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          (showErrors && !formData.hscRoll) || (formData.mediumOfEducation !== "English Medium (O/A Level)" && formData.hscRoll && formData.hscRoll.length !== 6)
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.hscRoll && (
                        <span className="text-[10px] text-red-500 font-medium">
                          {formData.mediumOfEducation === "English Medium (O/A Level)" ? "Candidate Number is required" : "Roll is required"}
                        </span>
                      )}
                      {formData.mediumOfEducation !== "English Medium (O/A Level)" && formData.hscRoll && formData.hscRoll.length !== 6 && (
                        <span className="text-[10px] text-red-500 font-medium">Roll must be 6 digits</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">
                      {formData.mediumOfEducation === "English Medium (O/A Level)" ? "Center Number" : "HSC Reg Number"}
                    </label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder={formData.mediumOfEducation === "English Medium (O/A Level)" ? "Center Number" : "HSC Registration"} 
                        value={formData.hscRegistration}
                        onChange={(e) => handleInputChange('hscRegistration', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          (showErrors && !formData.hscRegistration) || (formData.mediumOfEducation !== "English Medium (O/A Level)" && formData.hscRegistration && formData.hscRegistration.length !== 10)
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.hscRegistration && (
                        <span className="text-[10px] text-red-500 font-medium">
                          {formData.mediumOfEducation === "English Medium (O/A Level)" ? "Center Number is required" : "Registration is required"}
                        </span>
                      )}
                      {formData.mediumOfEducation !== "English Medium (O/A Level)" && formData.hscRegistration && formData.hscRegistration.length !== 10 && (
                        <span className="text-[10px] text-red-500 font-medium">Registration must be 10 digits</span>
                      )}
                    </div>
                  </div>
                  {formData.mediumOfEducation !== "English Medium (O/A Level)" && (
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">HSC Board</label>
                      <div className="flex-1 flex flex-col gap-1">
                        <input 
                          type="text" 
                          placeholder="HSC Board" 
                          value={formData.hscBoard}
                          onChange={(e) => handleInputChange('hscBoard', e.target.value)}
                          className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                            showErrors && !formData.hscBoard 
                              ? 'border-red-500 focus:border-red-600 bg-red-50' 
                              : 'border-slate-300 focus:border-udvash-pink'
                          }`} 
                        />
                        {showErrors && !formData.hscBoard && (
                          <span className="text-[10px] text-red-500 font-medium">HSC Board is required</span>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">
                      {formData.mediumOfEducation === "English Medium (O/A Level)" ? "A Level Result" : "HSC G.P.A"}
                    </label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder={formData.mediumOfEducation === "English Medium (O/A Level)" ? "Grade / Result" : "GPA"} 
                        value={formData.gpa}
                        onChange={(e) => handleInputChange('gpa', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.gpa 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.gpa && (
                        <span className="text-[10px] text-red-500 font-medium">
                          {formData.mediumOfEducation === "English Medium (O/A Level)" ? "Result is required" : "GPA is required"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Evaluation Method</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <select 
                        value={formData.evaluationMethod}
                        onChange={(e) => handleInputChange('evaluationMethod', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm bg-white transition-colors ${
                          showErrors && !formData.evaluationMethod 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`}
                      >
                        <option value="">--Select Option--</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Both">Both</option>
                      </select>
                      {showErrors && !formData.evaluationMethod && (
                        <span className="text-[10px] text-red-500 font-medium">Required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0 pt-2">Evaluation Shift</label>
                    <div className="flex-1 flex flex-col gap-2 relative" ref={shiftRef}>
                       <div 
                         onClick={() => setIsShiftDropdownOpen(!isShiftDropdownOpen)}
                         className={`w-full px-3 py-2 border rounded cursor-pointer text-sm bg-white flex justify-between items-center transition-colors ${
                           showErrors && formData.evaluationShift.length === 0 
                             ? 'border-red-500 bg-red-50' 
                             : 'border-slate-300 hover:border-udvash-pink'
                         }`}
                       >
                         <span className={formData.evaluationShift.length === 0 ? 'text-slate-400' : 'text-slate-700'}>
                           {formData.evaluationShift.length === 0 
                             ? '--Select Shift--' 
                             : `${formData.evaluationShift.length} selected`}
                         </span>
                         <svg className={`w-4 h-4 text-slate-400 transition-transform ${isShiftDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                         </svg>
                       </div>
                       
                       {isShiftDropdownOpen && (
                         <div className="absolute top-full left-0 right-0 z-50 bg-white border border-slate-200 rounded mt-1 shadow-lg max-h-48 overflow-y-auto">
                           {["Morning (9:00AM)", "Day (3:00PM)", "Night (6:00PM)"].map((shift) => (
                             <label 
                               key={shift} 
                               className="flex items-center gap-2 p-2 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0"
                             >
                               <input 
                                 type="checkbox"
                                 checked={formData.evaluationShift.includes(shift)}
                                 onChange={(e) => {
                                   const checked = e.target.checked;
                                   let newShifts = [...formData.evaluationShift];
                                   if (checked) {
                                     if (newShifts.length < 2) {
                                       newShifts.push(shift);
                                     } else {
                                       alert("You can select up to 2 shifts only.");
                                       return;
                                     }
                                   } else {
                                     newShifts = newShifts.filter(s => s !== shift);
                                   }
                                   handleInputChange('evaluationShift', newShifts);
                                 }}
                                 className="accent-udvash-pink w-4 h-4"
                               />
                               <span className="text-xs text-slate-700">{shift}</span>
                             </label>
                           ))}
                         </div>
                       )}
                       {showErrors && formData.evaluationShift.length === 0 && (
                         <span className="text-[10px] text-red-500 font-medium">Please select at least one shift</span>
                       )}
                       <p className="text-[10px] text-slate-400 italic">Select any 2 shifts maximum</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Campus (Physical)</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <select 
                        value={formData.campus}
                        onChange={(e) => handleInputChange('campus', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm bg-white transition-colors ${
                          showErrors && !formData.campus 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`}
                      >
                        <option value="">Choose</option>
                        <option value="Farmgate Campus">Farmgate Campus</option>
                        <option value="Motijheel Campus">Motijheel Campus</option>
                        <option value="Bakshibazar Campus (Only for female)">Bakshibazar Campus (Only for female)</option>
                        <option value="Oxygen Mor Campus (ctg)">Oxygen Mor Campus (ctg)</option>
                        <option value="Khulna Campus">Khulna Campus</option>
                        <option value="Rajshahi Campus">Rajshahi Campus</option>
                        <option value="Mymensingh Campus">Mymensingh Campus</option>
                        <option value="Online Campus">Online Campus</option>
                      </select>
                      {showErrors && !formData.campus && (
                        <span className="text-[10px] text-red-500 font-medium">Campus is required</span>
                      )}
                    </div>
                  </div>

                  {/* Personal & Family Info (Column 2) */}
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">বাংলায় সম্পূর্ণ নাম</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder="বাংলায় নাম" 
                        value={formData.bengaliName}
                        onChange={(e) => handleInputChange('bengaliName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.bengaliName 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.bengaliName && (
                        <span className="text-[10px] text-red-500 font-medium">নাম আবশ্যক</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Date of Birth</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="date" 
                        value={formData.dob}
                        onChange={(e) => handleInputChange('dob', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.dob 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.dob && (
                        <span className="text-[10px] text-red-500 font-medium">DOB is required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Blood Group</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <select 
                        value={formData.bloodGroup}
                        onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm bg-white transition-colors ${
                          showErrors && !formData.bloodGroup 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`}
                      >
                        <option value="">--Select--</option>
                        <option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option>
                        <option value="O+">O+</option><option value="O-">O-</option><option value="AB+">AB+</option><option value="AB-">AB-</option>
                      </select>
                      {showErrors && !formData.bloodGroup && (
                        <span className="text-[10px] text-red-500 font-medium">Required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">College Name</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder="College Name" 
                        value={formData.collegeName}
                        onChange={(e) => handleInputChange('collegeName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.collegeName 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.collegeName && (
                        <span className="text-[10px] text-red-500 font-medium">College Name is required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Father's Name</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder="Father's Name" 
                        value={formData.fatherName}
                        onChange={(e) => handleInputChange('fatherName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.fatherName 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.fatherName && (
                        <span className="text-[10px] text-red-500 font-medium">Father's Name is required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Father's Occup.</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder="Occupation" 
                        value={formData.fatherOccupation}
                        onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.fatherOccupation 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.fatherOccupation && (
                        <span className="text-[10px] text-red-500 font-medium">Required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Father's Mobile</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder="Mobile No" 
                        value={formData.fatherMobile}
                        onChange={(e) => handleInputChange('fatherMobile', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.fatherMobile 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.fatherMobile && (
                        <span className="text-[10px] text-red-500 font-medium">Mobile No is required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Mother's Name</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder="Mother's Name" 
                        value={formData.motherName}
                        onChange={(e) => handleInputChange('motherName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.motherName 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.motherName && (
                        <span className="text-[10px] text-red-500 font-medium">Mother's Name is required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Mother's Occup.</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder="Occupation" 
                        value={formData.motherOccupation}
                        onChange={(e) => handleInputChange('motherOccupation', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.motherOccupation 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.motherOccupation && (
                        <span className="text-[10px] text-red-500 font-medium">Required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Mother's Mobile</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder="Mobile No" 
                        value={formData.motherMobile}
                        onChange={(e) => handleInputChange('motherMobile', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.motherMobile 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.motherMobile && (
                        <span className="text-[10px] text-red-500 font-medium">Mobile No is required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">National ID No</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder="NID No" 
                        value={formData.nid}
                        onChange={(e) => handleInputChange('nid', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.nid 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.nid && (
                        <span className="text-[10px] text-red-500 font-medium">NID is required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Present Area</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder="Area Name" 
                        value={formData.presentArea}
                        onChange={(e) => handleInputChange('presentArea', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.presentArea 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.presentArea && (
                        <span className="text-[10px] text-red-500 font-medium">Area is required</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label className="text-[15px] font-medium text-slate-600 w-[180px] shrink-0">Home District</label>
                    <div className="flex-1 flex flex-col gap-1">
                      <input 
                        type="text" 
                        placeholder="District Name" 
                        value={formData.homeDistrict}
                        onChange={(e) => handleInputChange('homeDistrict', e.target.value)}
                        className={`w-full px-3 py-2 border rounded outline-none text-sm transition-colors ${
                          showErrors && !formData.homeDistrict 
                            ? 'border-red-500 focus:border-red-600 bg-red-50' 
                            : 'border-slate-300 focus:border-udvash-pink'
                        }`} 
                      />
                      {showErrors && !formData.homeDistrict && (
                        <span className="text-[10px] text-red-500 font-medium">District is required</span>
                      )}
                    </div>
                  </div>

                  {/* Uploads */}
                  <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="flex flex-col gap-2">
                       <label className="text-[15px] font-bold text-slate-600">Passport Size Photo</label>
                       <label className={`border rounded overflow-hidden flex flex-col items-center justify-center transition-colors cursor-pointer group min-h-[140px] relative ${userImage ? 'border-green-500 bg-green-50' : (showErrors && !userImage ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50 hover:border-udvash-pink')}`}>
                          {userImagePreview ? (
                            <img src={userImagePreview} alt="Preview" className="w-full h-full object-contain max-h-[200px]" />
                          ) : (
                            <div className="p-4 flex flex-col items-center gap-2">
                              {/* Upload icon can be added here */}
                              <p className={`text-xs font-medium text-center ${showErrors && !userImage ? 'text-red-500' : 'text-slate-400 group-hover:text-udvash-pink'}`}>
                                Click to select image or drag and drop
                              </p>
                            </div>
                          )}
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                setUserImage(file);
                                if (userImagePreview) URL.revokeObjectURL(userImagePreview);
                                setUserImagePreview(URL.createObjectURL(file));
                              }
                            }}
                          />
                          {userImage && (
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setUserImage(null);
                                URL.revokeObjectURL(userImagePreview);
                                setUserImagePreview("");
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                       </label>
                       {userImage && <p className="text-[10px] text-green-600 font-medium">Selected: {userImage.name}</p>}
                       {showErrors && !userImage && (
                         <span className="text-[10px] text-red-500 font-medium tracking-tight">Passport photo is required</span>
                       )}
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-[15px] font-bold text-slate-600">University ID Card/Receipt</label>
                       <label className={`border rounded overflow-hidden flex flex-col items-center justify-center transition-colors cursor-pointer group min-h-[140px] relative ${
                         idCard 
                           ? 'border-green-500 bg-green-50' 
                           : showErrors 
                             ? 'border-red-500 bg-red-50 hover:border-red-600' 
                             : 'border-slate-300 bg-slate-50 hover:border-udvash-pink'
                       }`}>
                          {idCardPreview ? (
                            <img src={idCardPreview} alt="Preview" className="w-full h-full object-contain max-h-[200px]" />
                          ) : (
                            <div className="p-4 flex flex-col items-center gap-2">
                              <p className={`text-xs font-medium text-center leading-tight ${
                                showErrors 
                                  ? 'text-red-500' 
                                  : 'text-slate-400 group-hover:text-udvash-pink'
                              }`}>
                                Varsity/Medical ID, Library Hall Card or Payment Receipt
                              </p>
                            </div>
                          )}
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                setIdCard(file);
                                if (idCardPreview) URL.revokeObjectURL(idCardPreview);
                                setIdCardPreview(URL.createObjectURL(file));
                              }
                            }}
                          />
                          {idCard && (
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIdCard(null);
                                URL.revokeObjectURL(idCardPreview);
                                setIdCardPreview("");
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                       </label>
                       {idCard && <p className="text-[10px] text-green-600 font-medium">Selected: {idCard.name}</p>}
                       {showErrors && !idCard && (
                         <span className="text-[10px] text-red-500 font-medium">Identification is required</span>
                       )}
                     </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          <div className="mt-10 mb-8 border-t border-slate-100 pt-8 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <label className="text-[15px] font-medium text-slate-600">Are you an academic student of Udvash? :</label>
              <div className="flex items-center gap-4 text-sm font-medium">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input 
                    type="radio" 
                    name="student" 
                    value="Yes"
                    checked={formData.isAcademicStudent === "Yes"}
                    onChange={(e) => handleInputChange('isAcademicStudent', e.target.value)}
                    className="accent-blue-600 h-4 w-4" 
                  /> Yes
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input 
                    type="radio" 
                    name="student" 
                    value="No"
                    checked={formData.isAcademicStudent === "No"}
                    onChange={(e) => handleInputChange('isAcademicStudent', e.target.value)}
                    className="accent-blue-600 h-4 w-4" 
                  /> No
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <label className="text-[15px] font-medium text-slate-600 min-w-[210px]">Why you would like to join our team? :</label>
              <textarea 
                placeholder="Why you would like to join our team?"
                value={formData.whyJoin}
                onChange={(e) => handleInputChange('whyJoin', e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded focus:border-blue-400 outline-none text-sm min-h-[40px] resize-y"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`bg-linear-to-r from-udvash-red to-udvash-pink text-white px-12 py-3 rounded-full font-bold shadow-lg shadow-red-500/30 transition-all active:scale-95 cursor-pointer ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-udvash-purple text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-12 mb-20">
          <div className="flex flex-col gap-4">
            <p className="text-[12px] font-medium text-slate-200 italic mb-2">পরিবর্তনের প্রত্যয়ে নিরন্তর পথচলা...</p>
            <TorchLogo color="white" />
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6">Help</h3>
            <ul className="text-[14px] flex flex-col gap-4 text-slate-300 pr-4">
              <li className="footer-link">About Us</li>
              <li className="footer-link">Branch List</li>
              <li className="footer-link">Privacy Policy</li>
              <li className="footer-link">Terms & Conditions</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6">Explore</h3>
            <ul className="text-[14px] flex flex-col gap-4 text-slate-300">
              <li className="footer-link">Programs</li>
              <li className="footer-link">Teacher Registration</li>
              <li className="footer-link">Book Correction</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6">Get In Touch</h3>
            <div className="text-[13px] flex flex-col gap-5 text-slate-300 leading-relaxed mb-8">
              <p>Address: 78, Green Road (3rd Floor), Farmgate, Tejgaon, Dhaka-1205</p>
              <p>Helpline: 09666775566</p>
              <p>Email: info@udvash-unmesh.com</p>
            </div>
            <div className="flex gap-4">
              {[Facebook, Youtube, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-udvash-purple hover:bg-slate-200 transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-[12px] text-slate-300">
          <p>Copyright © Udvash Academic & Admission Care. All rights reserved. 2026</p>
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-8 w-11 h-11 bg-blue-600 text-white rounded-[4px] flex items-center justify-center shadow-lg transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <RegistrationCard />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

