import { useState } from "react";

const Onboarding = () => {
  const [step, setStep] = useState(1);

  const next = () => setStep((prev) => Math.min(prev + 1, 5));
  const prev = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-orange-700">
            Step {step} of 5
          </h1>
        </div>

        {/* STEP CONTENT */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Food Preferences</h2>
            <p className="mb-2">Select cuisines you like:</p>
            <div className="flex flex-wrap gap-2">
              {["Indian", "Italian", "Thai", "Mexican", "Japanese", "Korean"].map((cuisine) => (
                <button
                  key={cuisine}
                  className="px-3 py-1 rounded-full bg-orange-100 hover:bg-orange-200 text-sm"
                >
                  {cuisine}
                </button>
              ))}
            </div>

            <p className="mt-4 mb-2">Any allergies?</p>
            <input
              type="text"
              placeholder="e.g. peanuts, dairy"
              className="w-full px-4 py-2 border rounded-lg"
            />

            <p className="mt-4 mb-2">Following any diet?</p>
            <select className="w-full px-4 py-2 border rounded-lg">
              <option value="">None</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="keto">Keto</option>
              <option value="gluten-free">Gluten-Free</option>
            </select>
          </div>
        )}

        {/* NEXT STEPS... Placeholder */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Flavor Profile</h2>
            {["Spice", "Salt", "Tang", "Sweet", "Umami"].map((flavor) => (
              <div key={flavor} className="mb-6">
                <label className="block mb-2 font-medium">{flavor} Level</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  defaultValue="5"
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            ))}
          </div>
        )}

{step === 3 && (
  <div>
    <h2 className="text-xl font-semibold mb-6">Cooking Skills & Tools</h2>

    {/* Cooking Skill Radio Buttons */}
    <div className="mb-6">
      <label className="block mb-2 font-medium">Your Cooking Skill</label>
      <div className="flex gap-4">
        {["Beginner", "Intermediate", "Advanced"].map((level) => (
          <label key={level} className="flex items-center gap-2">
            <input type="radio" name="skill" value={level} className="accent-orange-500" />
            {level}
          </label>
        ))}
      </div>
    </div>

    {/* Equipment Checkboxes */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Available Equipment</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              "Stove",
              "Oven",
              "Microwave",
              "Blender",
              "Air Fryer",
              "Pressure Cooker",
              "Toaster",
              "Rice Cooker",
            ].map((tool) => (
              <label key={tool} className="flex items-center gap-2">
                <input type="checkbox" value={tool} className="accent-orange-500" />
                {tool}
              </label>
            ))}
          </div>
        </div>
      </div>
    )}
        {step === 4 && <p>💰 Budget & Duration (Step 4)</p>}
        {step === 5 && <p>🤖 AI Suggestions or Skip (Step 5)</p>}

        {/* NAVIGATION */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={prev}
            disabled={step === 1}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100 disabled:opacity-40"
          >
            Back
          </button>
          {step < 5 ? (
            <button
              onClick={next}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => alert("Preferences saved!")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
