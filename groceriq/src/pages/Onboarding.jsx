import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();
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
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleFlavorChange = (flavor, value) => {
    setFlavorLevels((prev) => ({
      ...prev,
      [flavor]: parseInt(value)
    }));
  };

  const handleFinish = () => {
    localStorage.setItem(
      "userPreferences",
      JSON.stringify({
        cuisines: selectedCuisines,
        allergies: selectedAllergies,
        diet: selectedDiet,
        flavorLevels,
        cookingSkill,
        equipment,
        budget,
        budgetDuration
      })
    );
    navigate("/dashboard");
  };

  // ... All your existing styles and content stay unchanged

  // 🔄 Replace ONLY this section at the bottom:
  return (
    <div style={containerStyle}>
      {/* ... Left and Right Panels stay unchanged */}
      <div style={navigationStyle}>
        <button
          onClick={prev}
          disabled={step === 1}
          style={backButtonStyle}
        >
          Back
        </button>
        {step < 5 ? (
          <button onClick={next} style={nextButtonStyle}>
            Next
          </button>
        ) : (
          <button
            onClick={handleFinish}
            style={{ ...nextButtonStyle, backgroundColor: "#16a34a" }}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
