import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState("");
  const [flavorLevels, setFlavorLevels] = useState({
    spice: 5,
    salt: 5,
    tang: 5,
    sweet: 5,
    umami: 5
  });
  const [cookingSkill, setCookingSkill] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [budget, setBudget] = useState(100);
  const [budgetDuration, setBudgetDuration] = useState("weekly");
  const [loading, setLoading] = useState(false);
  // Add name state
  const [userName, setUserName] = useState("");
  
  const navigate = useNavigate();

  const next = () => setStep((prev) => Math.min(prev + 1, 5));
  const prev = () => setStep((prev) => Math.max(prev - 1, 1));

  const toggleSelection = (item, list, setList) => {
    setList(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const handleFlavorChange = (flavor, value) => {
    setFlavorLevels(prev => ({
      ...prev,
      [flavor]: parseInt(value)
    }));
  };

  // Update the handleFinish function to save the name
  const handleFinish = async () => {
    setLoading(true);
    try {
      const preferences = {
        userName,
        cuisines: selectedCuisines,
        allergies: selectedAllergies,
        diet: selectedDiet,
        flavorLevels,
        cookingSkill,
        equipment,
        budget,
        budgetDuration,
        onboardingCompleted: true
      };
      
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: userName,
          preferences: JSON.stringify(preferences)
        });
      }
      
      navigate('/dashboard');
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setLoading(false);
    }
  };

  const cuisineOptions = ["Indian", "Italian", "Thai", "Mexican", "Japanese", "Korean", "Mediterranean", "Chinese", "American", "French"];
  const allergyOptions = ["Nuts", "Dairy", "Gluten", "Shellfish", "Eggs", "Soy", "Fish", "Sesame"];
  const dietOptions = ["Vegan", "Vegetarian", "Keto", "Paleo", "Mediterranean", "Low-carb", "Gluten-free"];
  const equipmentOptions = ["Stove", "Oven", "Microwave", "Blender", "Air Fryer", "Pressure Cooker", "Toaster", "Rice Cooker"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            Let's get to know you
          </h1>
          <div className="flex items-center gap-4 text-amber-700">
            <span className="text-lg font-medium">Step {step} of 5</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i <= step ? 'bg-amber-600' : 'bg-amber-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Step 1: Cuisines, Allergies, Diet */}
        {step === 1 && (
          <div className="space-y-8">
            {/* Add name field in Step 1 */}
            <div>
              <h2 className="text-2xl font-bold text-amber-800 mb-4">What should we call you?</h2>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-200">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-4 border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-lg"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Favorite Cuisines?</h2>
              <div className="bg-amber-800 p-6 rounded-2xl mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-amber-100 font-medium">Select all that apply</span>
                  <span className="text-amber-200 text-sm">{selectedCuisines.length} selected</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cuisineOptions.map((cuisine) => (
                    <button
                      key={cuisine}
                      onClick={() => toggleSelection(cuisine, selectedCuisines, setSelectedCuisines)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-200 transform ${
                        selectedCuisines.includes(cuisine)
                          ? 'bg-yellow-300 text-amber-900 shadow-lg scale-105 ring-2 ring-yellow-400'
                          : 'bg-amber-600 text-amber-100 hover:bg-amber-500 hover:scale-105'
                      }`}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Any Allergies?</h2>
              <div className="bg-amber-800 p-6 rounded-2xl mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-amber-100 font-medium">Select all that apply</span>
                  <span className="text-amber-200 text-sm">{selectedAllergies.length} selected</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allergyOptions.map((allergy) => (
                    <button
                      key={allergy}
                      onClick={() => toggleSelection(allergy, selectedAllergies, setSelectedAllergies)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-200 transform ${
                        selectedAllergies.includes(allergy)
                          ? 'bg-red-300 text-red-900 shadow-lg scale-105 ring-2 ring-red-400'
                          : 'bg-amber-600 text-amber-100 hover:bg-amber-500 hover:scale-105'
                      }`}
                    >
                      {allergy}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Dietary Preferences?</h2>
              <div className="bg-amber-800 p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-amber-100 font-medium">Select one that fits best</span>
                  <span className="text-amber-200 text-sm">
                    {selectedDiet ? selectedDiet : "None selected"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dietOptions.map((diet) => (
                    <button
                      key={diet}
                      onClick={() => setSelectedDiet(selectedDiet === diet ? "" : diet)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-200 transform ${
                        selectedDiet === diet
                          ? 'bg-green-300 text-green-900 shadow-lg scale-105 ring-2 ring-green-400'
                          : 'bg-amber-600 text-amber-100 hover:bg-amber-500 hover:scale-105'
                      }`}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Flavor Profile */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-amber-800 mb-6">What's Your Flavor Profile?</h2>
            <p className="text-amber-700 mb-8 text-lg">Help us understand your taste preferences</p>
            <div className="space-y-6">
              {[
                { key: "spice", label: "Spice", icon: "🌶️", desc: "How much heat do you like?" },
                { key: "salt", label: "Salt", icon: "🧂", desc: "Preference for salty flavors" },
                { key: "tang", label: "Tang", icon: "🍋", desc: "Do you enjoy sour/acidic tastes?" },
                { key: "sweet", label: "Sweet", icon: "🍯", desc: "How much do you like sweet flavors?" },
                { key: "umami", label: "Umami", icon: "🍄", desc: "Rich, savory, meaty flavors" }
              ].map(({ key, label, icon, desc }) => (
                <div key={key} className="bg-white p-6 rounded-xl shadow-sm border border-amber-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{icon}</span>
                    <div className="flex-1">
                      <label className="text-xl font-semibold text-amber-800">{label}</label>
                      <p className="text-amber-600 text-sm">{desc}</p>
                    </div>
                    <span className="text-amber-700 font-bold text-xl bg-amber-100 px-3 py-1 rounded-full">
                      {flavorLevels[key]}/10
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={flavorLevels[key]}
                      onChange={(e) => handleFlavorChange(key, e.target.value)}
                      className="w-full h-4 bg-amber-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #d97706 0%, #d97706 ${flavorLevels[key] * 10}%, #fde68a ${flavorLevels[key] * 10}%, #fde68a 100%)`
                      }}
                    />
                    <style jsx>{`
                      .slider::-webkit-slider-thumb {
                        appearance: none;
                        height: 24px;
                        width: 24px;
                        border-radius: 50%;
                        background: #d97706;
                        border: 3px solid white;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                        cursor: pointer;
                      }
                      .slider::-moz-range-thumb {
                        height: 24px;
                        width: 24px;
                        border-radius: 50%;
                        background: #d97706;
                        border: 3px solid white;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                        cursor: pointer;
                      }
                    `}</style>
                  </div>
                  <div className="flex justify-between text-sm text-amber-600 mt-2">
                    <span>None</span>
                    <span>Moderate</span>
                    <span>Love it!</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Cooking Skills & Tools */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-amber-800 mb-6">Cooking Skills & Kitchen Setup</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-200">
                <h3 className="text-xl font-semibold text-amber-800 mb-4">How would you rate your cooking skills?</h3>
                <div className="space-y-3">
                  {[
                    { level: "Beginner", desc: "I'm just starting out, simple recipes please!" },
                    { level: "Intermediate", desc: "I can handle most recipes with some guidance" },
                    { level: "Advanced", desc: "Bring on the complex techniques and flavors!" }
                  ].map(({ level, desc }) => (
                    <label key={level} className="flex items-start gap-3 cursor-pointer p-4 rounded-lg hover:bg-amber-50 transition-all duration-200 border-2 border-transparent hover:border-amber-200">
                      <input 
                        type="radio" 
                        name="skill" 
                        value={level}
                        checked={cookingSkill === level}
                        onChange={(e) => setCookingSkill(e.target.value)}
                        className="w-5 h-5 text-amber-600 focus:ring-amber-500 mt-1"
                      />
                      <div className={`flex-1 ${cookingSkill === level ? 'text-amber-900' : 'text-amber-700'}`}>
                        <span className={`text-lg font-medium ${cookingSkill === level ? 'font-bold' : 'font-normal'}`}>
                          {level}
                        </span>
                        <p className={`text-sm ${cookingSkill === level ? 'text-amber-700' : 'text-amber-600'}`}>
                          {desc}
                        </p>
                      </div>
                      {cookingSkill === level && (
                        <div className="text-amber-600 text-xl">✓</div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-200">
                <h3 className="text-xl font-semibold text-amber-800 mb-4">What kitchen equipment do you have?</h3>
                <p className="text-amber-600 mb-4">Select all that apply - this helps us suggest recipes you can actually make!</p>
                <div className="grid grid-cols-2 gap-4">
                  {equipmentOptions.map((tool) => (
                    <label key={tool} className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all duration-200 border-2 ${
                      equipment.includes(tool) 
                        ? 'bg-amber-100 border-amber-400 shadow-sm' 
                        : 'border-transparent hover:bg-amber-50 hover:border-amber-200'
                    }`}>
                      <input 
                        type="checkbox" 
                        value={tool}
                        checked={equipment.includes(tool)}
                        onChange={() => toggleSelection(tool, equipment, setEquipment)}
                        className="w-5 h-5 text-amber-600 focus:ring-amber-500 rounded"
                      />
                      <span className={`font-medium ${equipment.includes(tool) ? 'text-amber-900' : 'text-amber-700'}`}>
                        {tool}
                      </span>
                      {equipment.includes(tool) && (
                        <div className="ml-auto text-amber-600 text-lg">✓</div>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Budget Preferences */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-amber-800 mb-6">Budget & Shopping Preferences</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-amber-800">Your Grocery Budget</h3>
                  <div className="text-right bg-amber-100 px-4 py-2 rounded-lg">
                    <span className="text-3xl font-bold text-amber-700">${budget}</span>
                    <p className="text-amber-600 text-sm font-medium">per {budgetDuration}</p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="w-full h-4 bg-amber-200 rounded-lg appearance-none cursor-pointer budget-slider"
                    style={{
                      background: `linear-gradient(to right, #d97706 0%, #d97706 ${((budget - 10) / (500 - 10)) * 100}%, #fde68a ${((budget - 10) / (500 - 10)) * 100}%, #fde68a 100%)`
                    }}
                  />
                  <style jsx>{`
                    .budget-slider::-webkit-slider-thumb {
                      appearance: none;
                      height: 24px;
                      width: 24px;
                      border-radius: 50%;
                      background: #d97706;
                      border: 3px solid white;
                      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                      cursor: pointer;
                    }
                    .budget-slider::-moz-range-thumb {
                      height: 24px;
                      width: 24px;
                      border-radius: 50%;
                      background: #d97706;
                      border: 3px solid white;
                      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                      cursor: pointer;
                      border: none;
                    }
                  `}</style>
                </div>
                <div className="flex justify-between text-sm text-amber-600 mt-3">
                  <span>$10</span>
                  <span>$250</span>
                  <span>$500+</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-200">
                <h3 className="text-xl font-semibold text-amber-800 mb-4">How often do you shop?</h3>
                <select 
                  value={budgetDuration}
                  onChange={(e) => setBudgetDuration(e.target.value)}
                  className="w-full p-4 border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg bg-white shadow-sm transition-all duration-200 hover:border-amber-400"
                >
                  <option value="weekly">Weekly Shopping</option>
                  <option value="biweekly">Every Two Weeks</option>
                  <option value="monthly">Monthly Shopping</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Completion */}
        {step === 5 && (
          <div className="text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-amber-200 mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-amber-800 mb-4">You're all set!</h2>
              <p className="text-amber-700 text-lg mb-6">
                We've learned about your tastes, skills, and preferences. 
                Ready to start your smart grocery journey?
              </p>

              {/* Summary */}
              <div className="text-left bg-amber-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-amber-800 mb-2">Your Profile Summary:</h4>
                <ul className="text-amber-700 text-sm space-y-1">
                  <li>• Name: {userName || "Not specified"}</li>
                  <li>• Cuisines: {selectedCuisines.length > 0 ? selectedCuisines.join(", ") : "None selected"}</li>
                  <li>• Cooking Level: {cookingSkill || "Not specified"}</li>
                  <li>• Budget: ${budget} {budgetDuration}</li>
                  <li>• Equipment: {equipment.length} items selected</li>
                  {selectedAllergies.length > 0 && <li>• Allergies: {selectedAllergies.join(", ")}</li>}
                  {selectedDiet && <li>• Diet: {selectedDiet}</li>}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  handleFinish();
                  navigate('/suggest');
                }}
                disabled={loading}
                className="w-full bg-amber-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <span>✨</span>
                {loading ? "Setting up..." : "Yes, show AI Suggestions"}
              </button>
              <button
                onClick={handleFinish}
                disabled={loading}
                className="w-full bg-amber-100 text-amber-800 py-4 px-6 rounded-lg font-semibold text-lg hover:bg-amber-200 transition-colors flex items-center justify-center gap-3 border border-amber-300 disabled:opacity-50"
              >
                <span>🏠</span>
                Skip to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 flex justify-between">
          <button
            onClick={prev}
            disabled={step === 1 || loading}
            className="px-8 py-3 bg-amber-200 text-amber-800 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-300 transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
          
          {step < 5 ? (
            <button
              onClick={next}
              disabled={loading}
              className="px-8 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center gap-2"
            >
              Next →
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;