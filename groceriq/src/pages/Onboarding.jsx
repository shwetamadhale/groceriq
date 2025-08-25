import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleFinish = () => {
    // Save preferences
    const preferences = {
      cuisines: selectedCuisines,
      allergies: selectedAllergies,
      diet: selectedDiet,
      flavorLevels,
      cookingSkill,
      equipment,
      budget,
      budgetDuration
    };
    
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    navigate('/dashboard');
  };

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
                  className={`w-3 h-3 rounded-full ${
                    i <= step ? 'bg-amber-600' : 'bg-amber-200'
                  }`}
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
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Favorite Cuisines?</h2>
              <div className="bg-amber-800 p-6 rounded-2xl mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-amber-100 font-medium">Select all that fit</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Indian", "Italian", "Thai", "Mexican", "Japanese", "Korean", "Mediterranean", "Chinese"].map((cuisine) => (
                    <button
                      key={cuisine}
                      onClick={() => toggleSelection(cuisine, selectedCuisines, setSelectedCuisines)}
                      className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        selectedCuisines.includes(cuisine)
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-amber-600 text-amber-100 hover:bg-amber-500'
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
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Any Allergies?</h2>
              <div className="bg-amber-800 p-6 rounded-2xl mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-amber-100 font-medium">Select all that fit</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Nuts", "Dairy", "Gluten", "Shellfish", "Eggs", "Soy", "Fish"].map((allergy) => (
                    <button
                      key={allergy}
                      onClick={() => toggleSelection(allergy, selectedAllergies, setSelectedAllergies)}
                      className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        selectedAllergies.includes(allergy)
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-amber-600 text-amber-100 hover:bg-amber-500'
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
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Any Diet?</h2>
              <div className="bg-amber-800 p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-amber-100 font-medium">Select all that fit</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Vegan", "Vegetarian", "Keto", "Paleo", "Mediterranean", "Low-carb"].map((diet) => (
                    <button
                      key={diet}
                      onClick={() => setSelectedDiet(selectedDiet === diet ? "" : diet)}
                      className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        selectedDiet === diet
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-amber-600 text-amber-100 hover:bg-amber-500'
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
            <h2 className="text-2xl font-bold text-amber-800 mb-6">Flavor Profile</h2>
            <div className="space-y-6">
              {[
                { key: "spice", label: "Spice", icon: "🌶️" },
                { key: "salt", label: "Salt", icon: "🧂" },
                { key: "tang", label: "Tang", icon: "🍋" },
                { key: "sweet", label: "Sweet", icon: "🍯" },
                { key: "umami", label: "Umami", icon: "🍄" }
              ].map(({ key, label, icon }) => (
                <div key={key} className="bg-white p-6 rounded-xl shadow-sm border border-amber-200">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{icon}</span>
                    <label className="text-xl font-semibold text-amber-800">{label} Level</label>
                    <span className="ml-auto text-amber-700 font-bold text-lg">{flavorLevels[key]}/10</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={flavorLevels[key]}
                    onChange={(e) => handleFlavorChange(key, e.target.value)}
                    className="w-full h-3 bg-amber-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-600"
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

        {/* Navigation */}
        <div className="mt-12 flex justify-between">
          <button
            onClick={prev}
            disabled={step === 1}
            className="px-8 py-3 bg-amber-200 text-amber-800 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-300 transition-colors"
          >
            Back
          </button>
          
          {step < 5 ? (
            <button
              onClick={next}
              className="px-8 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;