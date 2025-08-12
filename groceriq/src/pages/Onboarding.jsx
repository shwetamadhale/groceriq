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

  // Inline styles
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #fafaf9, #fef7ed, #fffbeb)',
    display: 'flex'
  };

  const contentStyle = {
    flex: 1,
    padding: '4rem 2rem',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: '4rem'
  };

  const headerStyle = {
    marginBottom: '3rem'
  };

  const titleStyle = {
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: '1.5rem',
    lineHeight: '1.2',
    fontFamily: 'Georgia, serif'
  };

  const progressStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#b45309'
  };

  const dotStyle = (active) => ({
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '50%',
    backgroundColor: active ? '#d97706' : '#fef3c7'
  });

  const sectionTitleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: '1.5rem',
    fontFamily: 'Georgia, serif'
  };

  const dropdownBoxStyle = {
    backgroundColor: '#78350f',
    borderRadius: '1.5rem',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  };

  const dropdownHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem'
  };

  const dropdownLabelStyle = {
    color: '#fef3c7',
    fontSize: '1.125rem',
    fontWeight: '500'
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem'
  };

  const getButtonStyle = (isSelected) => ({
    padding: '0.75rem 1.25rem',
    borderRadius: '9999px',
    fontSize: '1rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: isSelected ? '#fef3c7' : '#a16207',
    color: isSelected ? '#92400e' : '#fef3c7'
  });

  const whiteCardStyle = {
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #fef3c7'
  };

  const navigationStyle = {
    marginTop: '4rem',
    display: 'flex',
    justifyContent: 'space-between'
  };

  const backButtonStyle = {
    padding: '1rem 2rem',
    borderRadius: '1rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#e7e5e4',
    color: '#92400e',
    opacity: step === 1 ? 0.5 : 1,
    cursor: step === 1 ? 'not-allowed' : 'pointer'
  };

  const nextButtonStyle = {
    padding: '1rem 2rem',
    borderRadius: '1rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#a16207',
    color: 'white',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  const rightPanelStyle = {
    width: '50%',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(to bottom right, #fef3c7, #fed7aa)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const foodGridStyle = {
    position: 'relative',
    zIndex: 20,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    padding: '4rem'
  };

  const foodCircleStyle = (bgColor, marginTop = '0') => ({
    width: '12rem',
    height: '12rem',
    backgroundColor: bgColor,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    fontSize: '4rem',
    marginTop: marginTop
  });

  return (
    <div style={containerStyle}>
      {/* Left Content Panel */}
      <div style={contentStyle}>
        <div style={{ width: '100%', maxWidth: '48rem' }}>
          {/* Header */}
          <div style={headerStyle}>
            <h1 style={titleStyle}>
              Let's get to know you
            </h1>
            <div style={progressStyle}>
              <span style={{ fontSize: '1.125rem', fontWeight: '500' }}>Step {step} of 5</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1,2,3,4,5].map(i => (
                  <div key={i} style={dotStyle(i <= step)} />
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          {step === 1 && (
            <div>
              {/* Favorite Cuisines */}
              <div>
                <h2 style={sectionTitleStyle}>Favorite Cuisines?</h2>
                <div style={dropdownBoxStyle}>
                  <div style={dropdownHeaderStyle}>
                    <span style={dropdownLabelStyle}>Select all that fit</span>
                    <svg style={{ width: '1.25rem', height: '1.25rem', color: '#fcd34d' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div style={buttonContainerStyle}>
                    {["Indian", "Italian", "Thai", "Mexican", "Japanese", "Korean", "Mediterranean", "Chinese"].map((cuisine) => (
                      <button
                        key={cuisine}
                        onClick={() => toggleSelection(cuisine, selectedCuisines, setSelectedCuisines)}
                        style={getButtonStyle(selectedCuisines.includes(cuisine))}
                      >
                        {cuisine}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Allergies */}
              <div>
                <h2 style={sectionTitleStyle}>Any Allergies?</h2>
                <div style={dropdownBoxStyle}>
                  <div style={dropdownHeaderStyle}>
                    <span style={dropdownLabelStyle}>Select all that fit</span>
                    <svg style={{ width: '1.25rem', height: '1.25rem', color: '#fcd34d' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div style={buttonContainerStyle}>
                    {["Nuts", "Dairy", "Gluten", "Shellfish", "Eggs", "Soy", "Fish"].map((allergy) => (
                      <button
                        key={allergy}
                        onClick={() => toggleSelection(allergy, selectedAllergies, setSelectedAllergies)}
                        style={getButtonStyle(selectedAllergies.includes(allergy))}
                      >
                        {allergy}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Diet */}
              <div>
                <h2 style={sectionTitleStyle}>Any Diet?</h2>
                <div style={dropdownBoxStyle}>
                  <div style={dropdownHeaderStyle}>
                    <span style={dropdownLabelStyle}>Select all that fit</span>
                    <svg style={{ width: '1.25rem', height: '1.25rem', color: '#fcd34d' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div style={buttonContainerStyle}>
                    {["Vegan", "Vegetarian", "Keto", "Paleo", "Mediterranean", "Low-carb"].map((diet) => (
                      <button
                        key={diet}
                        onClick={() => setSelectedDiet(selectedDiet === diet ? "" : diet)}
                        style={getButtonStyle(selectedDiet === diet)}
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
              <h2 style={sectionTitleStyle}>Flavor Profile</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { key: "spice", label: "Spice", icon: "🌶️" },
                  { key: "salt", label: "Salt", icon: "🧂" },
                  { key: "tang", label: "Tang", icon: "🍋" },
                  { key: "sweet", label: "Sweet", icon: "🍯" },
                  { key: "umami", label: "Umami", icon: "🍄" }
                ].map(({ key, label, icon }) => (
                  <div key={key} style={whiteCardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                      <label style={{ fontSize: '1.25rem', fontWeight: '600', color: '#92400e' }}>{label} Level</label>
                      <span style={{ marginLeft: 'auto', color: '#b45309', fontWeight: 'bold', fontSize: '1.125rem' }}>{flavorLevels[key]}/10</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={flavorLevels[key]}
                      onChange={(e) => handleFlavorChange(key, e.target.value)}
                      style={{
                        width: '100%',
                        height: '0.75rem',
                        borderRadius: '0.5rem',
                        appearance: 'none',
                        cursor: 'pointer',
                        background: `linear-gradient(to right, #92400e 0%, #92400e ${flavorLevels[key] * 10}%, #fef3c7 ${flavorLevels[key] * 10}%, #fef3c7 100%)`
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#d97706', marginTop: '0.5rem' }}>
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
              <h2 style={sectionTitleStyle}>Cooking Skills & Tools</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={whiteCardStyle}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#92400e', marginBottom: '1.5rem' }}>Your Cooking Skill</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <label key={level} style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          name="skill" 
                          value={level}
                          checked={cookingSkill === level}
                          onChange={(e) => setCookingSkill(e.target.value)}
                          style={{ width: '1.25rem', height: '1.25rem', accentColor: '#d97706' }}
                        />
                        <span style={{ color: '#a16207', fontSize: '1.125rem' }}>{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={whiteCardStyle}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#92400e', marginBottom: '1.5rem' }}>Available Equipment</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {[
                      "Stove", "Oven", "Microwave", "Blender", 
                      "Air Fryer", "Pressure Cooker", "Toaster", "Rice Cooker"
                    ].map((tool) => (
                      <label key={tool} style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          value={tool}
                          checked={equipment.includes(tool)}
                          onChange={() => toggleSelection(tool, equipment, setEquipment)}
                          style={{ width: '1.25rem', height: '1.25rem', accentColor: '#d97706' }}
                        />
                        <span style={{ color: '#a16207', fontSize: '1.125rem' }}>{tool}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 style={sectionTitleStyle}>Budget Preferences</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={whiteCardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#92400e' }}>Your Budget</h3>
                    <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#b45309' }}>${budget}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      height: '0.75rem',
                      borderRadius: '0.5rem',
                      appearance: 'none',
                      cursor: 'pointer',
                      background: `linear-gradient(to right, #92400e 0%, #92400e ${(budget-10)/490 * 100}%, #fef3c7 ${(budget-10)/490 * 100}%, #fef3c7 100%)`
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#d97706', marginTop: '0.5rem' }}>
                    <span>$10</span>
                    <span>$250</span>
                    <span>$500</span>
                  </div>
                </div>

                <div style={whiteCardStyle}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#92400e', marginBottom: '1.5rem' }}>Budget Duration</h3>
                  <select 
                    value={budgetDuration}
                    onChange={(e) => setBudgetDuration(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '1rem 1.5rem',
                      border: '2px solid #fef3c7',
                      borderRadius: '0.75rem',
                      backgroundColor: 'white',
                      color: '#a16207',
                      fontSize: '1.125rem'
                    }}
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
              <h2 style={sectionTitleStyle}>You're all set!</h2>
              <p style={{ color: '#b45309', marginBottom: '2rem', fontSize: '1.25rem', lineHeight: '1.8' }}>
                Would you like GrocerIQ to give you smart suggestions on what to stock up
                on based on your preferences?
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => alert("Redirecting to suggestions...")}
                  style={{
                    width: '100%',
                    padding: '1.25rem 2rem',
                    backgroundColor: '#a16207',
                    color: 'white',
                    borderRadius: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <span>✅</span>
                  Yes, show AI Suggestions
                </button>
                <button
                  type="button"
                  onClick={() => alert("Redirecting to dashboard...")}
                  style={{
                    width: '100%',
                    padding: '1.25rem 2rem',
                    backgroundColor: '#fef3c7',
                    color: '#a16207',
                    borderRadius: '1rem',
                    border: '2px solid #fcd34d',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem'
                  }}
                >
                  <span>🚪</span>
                  Skip, take me to Dashboard
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={navigationStyle}>
            <button
              onClick={prev}
              disabled={step === 1}
              style={backButtonStyle}
            >
              Back
            </button>
            {step < 5 ? (
              <button
                onClick={next}
                style={nextButtonStyle}
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => alert("Preferences saved!")}
                style={{
                  ...nextButtonStyle,
                  backgroundColor: '#16a34a'
                }}
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Image Panel - Only show on larger screens */}
      {window.innerWidth > 1024 && (
        <div style={rightPanelStyle}>
          <div style={foodGridStyle}>
            <div style={foodCircleStyle('#78350f')}>
              <span>🍝</span>
            </div>
            <div style={foodCircleStyle('#c2410c', '4rem')}>
              <span>🥘</span>
            </div>
            <div style={foodCircleStyle('#b45309', '-2rem')}>
              <span>🍛</span>
            </div>
            <div style={foodCircleStyle('#ea580c', '2rem')}>
              <span>🥗</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;