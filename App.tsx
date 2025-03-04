import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Brain, Heart, Shield } from 'lucide-react';

function App() {
  const [step, setStep] = useState(0);
  const [demographics, setDemographics] = useState({
    age: '',
    occupation: '',
    gender: '',
    education: '',
    maritalStatus: ''
  });
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState({
    subScore1: 0,
    subScore2: 0,
    subScore3: 0,
    totalScore: 0
  });

  const questions = [
    "เรื่องไม่สบายใจเล็กน้อย ทำให้ใจว้าวุ่นจนใช้ชีวิตได้ยาก",
    "ฉันมีโอกาสพบกับข่าวแย่ๆ",
    "เมื่อต้องตัดสินใจหลายอย่าง ฉันจะรู้สึกเครียด",
    "เวลาทำงาน ฉันมักจะรู้สึกไม่อยากทำ",
    "ความสามารถในการทำงานลดลง",
    "ฉันมักกังวลเกี่ยวกับอนาคต",
    "ฉันมีปัญหาการหลับ หรือหลับไม่สนิท",
    "ฉันมักรู้สึกหงุดหงิดง่าย",
    "ฉันมักมีความคิดในแง่ลบเกี่ยวกับตนเอง",
    "ฉันรู้สึกหมดหวังในการใช้ชีวิต",
    "ฉันสามารถเผชิญปัญหาต่างๆ ได้ดี",
    "ฉันรู้สึกว่ามีแรงบันดาลใจในการดำเนินชีวิต",
    "ฉันสามารถจัดการกับอารมณ์ของตัวเองได้",
    "ฉันมีความมั่นใจในตนเอง",
    "ฉันสามารถรับมือกับความเครียดได้ดี",
    "ฉันมองโลกในแง่ดีมากกว่าด้านลบ",
    "ฉันสามารถจัดการปัญหาในชีวิตได้",
    "ฉันรู้สึกพึงพอใจกับชีวิตของตนเอง",
    "ฉันสามารถขอความช่วยเหลือจากผู้อื่นเมื่อจำเป็น",
    "ฉันรู้สึกว่าชีวิตมีความหมายและเป้าหมาย"
  ];

  const handleDemographicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setDemographics(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleAnswerChange = (questionIndex: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const isFormComplete = () => {
    if (step === 0) {
      return Object.values(demographics).every(value => value !== '');
    } else {
      return Object.keys(answers).length === questions.length;
    }
  };

  const handleNext = () => {
    if (step === 0 && isFormComplete()) {
      setStep(1);
    } else if (step === 1 && isFormComplete()) {
      calculateScores();
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  const calculateScores = () => {
    let totalScore = 0;
    let subScore1 = 0;
    let subScore2 = 0;
    let subScore3 = 0;

    Object.entries(answers).forEach(([questionIndex, score]) => {
      const index = parseInt(questionIndex);
      totalScore += score;
      
      if (index < 10) subScore1 += score;
      else if (index < 15) subScore2 += score;
      else subScore3 += score;
    });

    setScores({
      subScore1,
      subScore2,
      subScore3,
      totalScore
    });

    setShowResults(true);
  };

  const getLevel = (score: number, low: number, high: number) => {
    if (score < low) return "ต่ำ";
    else if (score <= high) return "ปกติ";
    return "สูง";
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "ต่ำ": return "text-blue-600";
      case "ปกติ": return "text-green-600";
      case "สูง": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const resetForm = () => {
    setStep(0);
    setDemographics({
      age: '',
      occupation: '',
      gender: '',
      education: '',
      maritalStatus: ''
    });
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center flex items-center justify-center gap-2">
              <Brain className="h-8 w-8" /> แบบประเมินสุขภาพจิต
            </h1>
            {!showResults && (
              <div className="flex justify-center mt-4">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 0 ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'}`}>1</div>
                  <div className={`h-1 w-16 ${step === 0 ? 'bg-gray-300' : 'bg-white'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'}`}>2</div>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {!showResults ? (
              <>
                {step === 0 ? (
                  <div className="space-y-4 animate-fadeIn">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">ข้อมูลส่วนตัว</h2>
                    
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">อายุ</label>
                      <select 
                        id="age" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={demographics.age}
                        onChange={handleDemographicChange}
                      >
                        <option value="">กรุณาระบุอายุ</option>
                        <option value="0-12">0-12 ปี</option>
                        <option value="13-19">13-19 ปี</option>
                        <option value="20-25">20-25 ปี</option>
                        <option value="26-39">26-39 ปี</option>
                        <option value="40-59">40-59 ปี</option>
                        <option value="60+">60 ปีขึ้นไป</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">อาชีพ</label>
                      <select 
                        id="occupation" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={demographics.occupation}
                        onChange={handleDemographicChange}
                      >
                        <option value="">กรุณาระบุอาชีพ</option>
                        <option value="student">นักเรียน/นิสิต/นักศึกษา</option>
                        <option value="self-employed">ค้าขาย/รับจ้าง/ธุรกิจส่วนตัว</option>
                        <option value="employee">พนักงานบริษัท/ห้างร้าน</option>
                        <option value="government">รับราชการ/รัฐวิสาหกิจ</option>
                        <option value="housewife">งานบ้าน</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">เพศ</label>
                      <select 
                        id="gender" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={demographics.gender}
                        onChange={handleDemographicChange}
                      >
                        <option value="">กรุณาระบุเพศ</option>
                        <option value="male">ชาย</option>
                        <option value="female">หญิง</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">วุฒิการศึกษา</label>
                      <select 
                        id="education" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={demographics.education}
                        onChange={handleDemographicChange}
                      >
                        <option value="">กรุณาระบุวุฒิการศึกษา</option>
                        <option value="primary">ประถมศึกษา</option>
                        <option value="secondary">มัธยมศึกษา</option>
                        <option value="vocational">ปวช.</option>
                        <option value="diploma">ปวส./อนุปริญญา</option>
                        <option value="bachelor">ปริญญาตรี</option>
                        <option value="master">ปริญญาโท/เอก</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-1">สถานะภาพ</label>
                      <select 
                        id="maritalStatus" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={demographics.maritalStatus}
                        onChange={handleDemographicChange}
                      >
                        <option value="">กรุณาระบุสถานะภาพ</option>
                        <option value="single">โสด</option>
                        <option value="married">มีคู่</option>
                        <option value="widowed">หม้าย</option>
                        <option value="divorced">หย่าร้าง</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fadeIn">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">แบบประเมินสุขภาพจิต</h2>
                    <p className="text-gray-600 mb-4">กรุณาเลือกคำตอบที่ตรงกับความรู้สึกของคุณมากที่สุด</p>
                    
                    <div className="space-y-8">
                      {questions.map((question, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                          <p className="font-medium text-gray-800 mb-3">{index + 1}. {question}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {[
                              { value: 1, label: "ไม่จริง" },
                              { value: 2, label: "จริงบางครั้ง" },
                              { value: 3, label: "ค่อนข้างจริง" },
                              { value: 4, label: "จริงมาก" }
                            ].map((option) => (
                              <label 
                                key={option.value} 
                                className={`flex items-center p-2 rounded-md cursor-pointer transition-all ${
                                  answers[index] === option.value 
                                    ? 'bg-blue-100 border-blue-300 border' 
                                    : 'bg-white border border-gray-200 hover:border-blue-200'
                                }`}
                              >
                                <input 
                                  type="radio" 
                                  name={`q${index}`} 
                                  value={option.value} 
                                  checked={answers[index] === option.value}
                                  onChange={() => handleAnswerChange(index, option.value)}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm">{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  {step === 1 && (
                    <button 
                      onClick={() => setStep(0)} 
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      ย้อนกลับ
                    </button>
                  )}
                  <button 
                    onClick={handleNext} 
                    disabled={!isFormComplete()}
                    className={`px-6 py-3 rounded-lg transition-colors ${
                      isFormComplete() 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } ml-auto`}
                  >
                    {step === 0 ? 'ถัดไป' : 'ส่งแบบประเมิน'}
                  </button>
                </div>
              </>
            ) : (
              <div className="animate-fadeIn">
                <div className="flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-800">ผลการประเมิน</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <Shield className="h-5 w-5 text-blue-500 mr-2" />
                      <h3 className="font-semibold text-gray-800">ความทนต่อแรงกดดัน</h3>
                    </div>
                    <p className="text-3xl font-bold mb-1">{scores.subScore1}</p>
                    <p className={`font-medium ${getLevelColor(getLevel(scores.subScore1, 27, 34))}`}>
                      {getLevel(scores.subScore1, 27, 34)}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <Heart className="h-5 w-5 text-red-500 mr-2" />
                      <h3 className="font-semibold text-gray-800">ความหวังและกำลังใจ</h3>
                    </div>
                    <p className="text-3xl font-bold mb-1">{scores.subScore2}</p>
                    <p className={`font-medium ${getLevelColor(getLevel(scores.subScore2, 14, 19))}`}>
                      {getLevel(scores.subScore2, 14, 19)}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <Brain className="h-5 w-5 text-purple-500 mr-2" />
                      <h3 className="font-semibold text-gray-800">การต่อสู้เอาชนะอุปสรรค</h3>
                    </div>
                    <p className="text-3xl font-bold mb-1">{scores.subScore3}</p>
                    <p className={`font-medium ${getLevelColor(getLevel(scores.subScore3, 13, 18))}`}>
                      {getLevel(scores.subScore3, 13, 18)}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100 mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">คะแนนรวม: {scores.totalScore}</h3>
                  <p className={`text-lg font-medium ${getLevelColor(getLevel(scores.totalScore, 55, 69))}`}>
                    ระดับ: {getLevel(scores.totalScore, 55, 69)}
                  </p>
                </div>

                {scores.totalScore > 69 && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6 flex items-start">
                    <AlertTriangle className="h-6 w-6 text-red-500 mr-2 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-red-800">คะแนนความเครียดของคุณอยู่ในระดับสูง</p>
                      <p className="text-red-700 mt-1">โปรดขอรับคำปรึกษาสุขภาพจิตฟรี หรือโทรหากรมสุขภาพจิต <span className="font-bold">1323</span></p>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-center">
                  <button 
                    onClick={resetForm} 
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    ประเมินอีกครั้ง
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          © 2025 แบบประเมินสุขภาพจิต | เครื่องมือนี้ใช้เพื่อการคัดกรองเบื้องต้นเท่านั้น
        </div>
      </div>
    </div>
  );
}

export default App;