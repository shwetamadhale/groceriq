import { useState } from "react";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex">
      {/* Left Content Panel */}
      <div className="flex-1 p-8 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-2 leading-tight">
              Let's get to know you
            </h1>
            <div className="flex items-center gap-2 text-amber-700">
              <span className="text-sm font-medium">Step {step} of 5</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <div 
                    key={i}
                    className={`w-2 h-2 rounded-full ${i <= step ? 'bg-amber-600' : 'bg-amber-200'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          {step === 1 && (
            <div className="space-y-8">
              {/* Favorite Cuisines */}
              <div>
                <h2 className="text-xl font-semibold text-amber-900 mb-4">Favorite Cuisines?</h2>
                <div className="bg-amber-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-amber-100 font-medium">Select all that fit</span>
                    <svg className="w-4 h-4 text-amber-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Indian", "Italian", "Thai", "Mexican", "Japanese", "Korean", "Mediterranean", "Chinese"].map((cuisine) => (
                      <button
                        key={cuisine}
                        onClick={() => toggleSelection(cuisine, selectedCuisines, setSelectedCuisines)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedCuisines.includes(cuisine)
                            ? 'bg-amber-200 text-amber-900'
                            : 'bg-amber-700 text-amber-100 hover:bg-amber-600'
                        }`}
                      >
                        {cuisine}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Allergies */}
              <div>
                <h2 className="text-xl font-semibold text-amber-900 mb-4">Any Allergies?</h2>
                <div className="bg-amber-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-amber-100 font-medium">Select all that fit</span>
                    <svg className="w-4 h-4 text-amber-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Nuts", "Dairy", "Gluten", "Shellfish", "Eggs", "Soy", "Fish"].map((allergy) => (
                      <button
                        key={allergy}
                        onClick={() => toggleSelection(allergy, selectedAllergies, setSelectedAllergies)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedAllergies.includes(allergy)
                            ? 'bg-amber-200 text-amber-900'
                            : 'bg-amber-700 text-amber-100 hover:bg-amber-600'
                        }`}
                      >
                        {allergy}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Diet */}
              <div>
                <h2 className="text-xl font-semibold text-amber-900 mb-4">Any Diet?</h2>
                <div className="bg-amber-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-amber-100 font-medium">Select all that fit</span>
                    <svg className="w-4 h-4 text-amber-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Vegan", "Vegetarian", "Keto", "Paleo", "Mediterranean", "Low-carb"].map((diet) => (
                      <button
                        key={diet}
                        onClick={() => setSelectedDiet(selectedDiet === diet ? "" : diet)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedDiet === diet
                            ? 'bg-amber-200 text-amber-900'
                            : 'bg-amber-700 text-amber-100 hover:bg-amber-600'
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

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold text-amber-900 mb-8">Flavor Profile</h2>
              <div className="space-y-6">
                {[
                  { key: "spice", label: "Spice", icon: "🌶️" },
                  { key: "salt", label: "Salt", icon: "🧂" },
                  { key: "tang", label: "Tang", icon: "🍋" },
                  { key: "sweet", label: "Sweet", icon: "🍯" },
                  { key: "umami", label: "Umami", icon: "🍄" }
                ].map(({ key, label, icon }) => (
                  <div key={key} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{icon}</span>
                      <label className="text-lg font-medium text-amber-900">{label} Level</label>
                      <span className="ml-auto text-amber-700 font-semibold">{flavorLevels[key]}/10</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={flavorLevels[key]}
                      onChange={(e) => handleFlavorChange(key, e.target.value)}
                      className="w-full h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${flavorLevels[key] * 10}%, #fef3c7 ${flavorLevels[key] * 10}%, #fef3c7 100%)`
                      }}
                    />
                    <div className="flex justify-between text-sm text-amber-600 mt-2">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold text-amber-900 mb-8">Cooking Skills & Tools</h2>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-amber-900 mb-4">Your Cooking Skill</h3>
                  <div className="space-y-3">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <label key={level} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name="skill" 
                          value={level}
                          checked={cookingSkill === level}
                          onChange={(e) => setCookingSkill(e.target.value)}
                          className="w-4 h-4 text-amber-600"
                        />
                        <span className="text-amber-800">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-amber-900 mb-4">Available Equipment</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Stove", "Oven", "Microwave", "Blender", 
                      "Air Fryer", "Pressure Cooker", "Toaster", "Rice Cooker"
                    ].map((tool) => (
                      <label key={tool} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          value={tool}
                          checked={equipment.includes(tool)}
                          onChange={() => toggleSelection(tool, equipment, setEquipment)}
                          className="w-4 h-4 text-amber-600 rounded"
                        />
                        <span className="text-amber-800">{tool}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-semibold text-amber-900 mb-8">Budget Preferences</h2>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-amber-900">Your Budget</h3>
                    <span className="text-2xl font-bold text-amber-700">${budget}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    className="w-full h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(budget-10)/490 * 100}%, #fef3c7 ${(budget-10)/490 * 100}%, #fef3c7 100%)`
                    }}
                  />
                  <div className="flex justify-between text-sm text-amber-600 mt-2">
                    <span>$10</span>
                    <span>$250</span>
                    <span>$500</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-amber-900 mb-4">Budget Duration</h3>
                  <select 
                    value={budgetDuration}
                    onChange={(e) => setBudgetDuration(e.target.value)}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg bg-white text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Biweekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-2xl font-semibold text-amber-900 mb-4">You're all set!</h2>
              <p className="text-amber-700 mb-8 text-lg">
                Would you like GrocerIQ to give you smart suggestions on what to stock up
                on based on your preferences?
              </p>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => alert("Redirecting to suggestions...")}
                  className="w-full px-6 py-4 bg-amber-700 text-white rounded-xl hover:bg-amber-800 transition-colors font-semibold text-lg flex items-center justify-center gap-3"
                >
                  <span>✅</span>
                  Yes, show AI Suggestions
                </button>
                <button
                  type="button"
                  onClick={() => alert("Redirecting to dashboard...")}
                  className="w-full px-6 py-4 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl transition-colors font-semibold text-lg flex items-center justify-center gap-3"
                >
                  <span>🚪</span>
                  Skip, take me to Dashboard
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 flex justify-between">
            <button
              onClick={prev}
              disabled={step === 1}
              className="px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white text-amber-800 hover:bg-amber-50 border border-amber-200"
            >
              Back
            </button>
            {step < 5 ? (
              <button
                onClick={next}
                className="px-6 py-3 bg-amber-700 text-white rounded-xl hover:bg-amber-800 font-semibold transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => alert("Preferences saved!")}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold transition-colors"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Image Panel */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-amber-50/50 z-10"></div>
        <div className="h-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
          <div className="text-center text-amber-800">
            <div className="text-8xl mb-4">🍽️</div>
            <p className="text-xl font-medium">Delicious meals await!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;