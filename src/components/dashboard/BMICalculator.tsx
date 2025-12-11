import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, CheckCircle } from "lucide-react";
import { getNutritionRecommendations } from "@/utils/nutritionData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BMICalculatorProps {
  onBMIChange?: (bmi: number) => void;
}

export const BMICalculator = ({ onBMIChange }: BMICalculatorProps) => {
  const { toast } = useToast();
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = (e?: React.FormEvent) => {
    e?.preventDefault();

    let h = parseFloat(height);
    let w = parseFloat(weight);

    if (unit === "imperial") {
      // Convert imperial to metric
      h = h * 2.54; // inches to cm
      w = w * 0.453592; // lbs to kg
    }

    h = h / 100; // convert cm to m

    if (h > 0 && w > 0) {
      const result = w / (h * h);
      const roundedBmi = Math.round(result * 10) / 10;
      setBmi(roundedBmi);
      if (onBMIChange) {
        onBMIChange(roundedBmi);
      }

      // Save to DB if first time (missing height/weight)
      saveToProfileIfMissing(h * 100, w); // Save as cm and kg
    }
  };

  const saveToProfileIfMissing = async (heightCm: number, weightKg: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('height, weight')
        .eq('user_id', user.id)
        .single();

      if (profile && (!profile.height || !profile.weight)) {
        const { error } = await supabase
          .from('profiles')
          .update({
            height: profile.height || heightCm,
            weight: profile.weight || weightKg
          })
          .eq('user_id', user.id);

        if (!error) {
          toast({
            title: "Profile Updated",
            description: "Your height and weight have been saved to your profile.",
          });
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: "Underweight", color: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-100 dark:bg-blue-900/50" };
    if (bmi < 25) return { text: "Normal Weight", color: "text-green-600 dark:text-green-400", bgColor: "bg-green-100 dark:bg-green-900/50" };
    if (bmi < 30) return { text: "Overweight", color: "text-yellow-600 dark:text-yellow-400", bgColor: "bg-yellow-100 dark:bg-yellow-900/50" };
    return { text: "Obese", color: "text-red-600 dark:text-red-400", bgColor: "bg-red-100 dark:bg-red-900/50" };
  };

  const getBMIPosition = (bmi: number) => {
    if (bmi < 18.5) return (bmi / 18.5) * 25;
    if (bmi < 25) return 25 + ((bmi - 18.5) / (25 - 18.5)) * 25;
    if (bmi < 30) return 50 + ((bmi - 25) / (30 - 25)) * 25;
    return Math.min(75 + ((bmi - 30) / 10) * 25, 98);
  };

  return (
    <Card className="glass-card col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          Body Mass Index (BMI) Calculator
        </CardTitle>
        <CardDescription>
          Easily calculate your BMI to understand your body composition and track your fitness progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <form onSubmit={calculateBMI} className="space-y-6">
            {/* Unit Toggle */}
            <div>
              <Label className="mb-2 block">Unit System</Label>
              <div className="grid grid-cols-2 gap-2 rounded-lg bg-secondary p-1">
                <button
                  type="button"
                  onClick={() => setUnit("metric")}
                  className={`rounded-md py-2 text-sm font-medium transition-all ${unit === "metric"
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-secondary-foreground/10"
                    }`}
                >
                  Metric
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("imperial")}
                  className={`rounded-md py-2 text-sm font-medium transition-all ${unit === "imperial"
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-secondary-foreground/10"
                    }`}
                >
                  Imperial
                </button>
              </div>
            </div>

            {/* Height Input */}
            <div>
              <Label htmlFor="bmi-height">Height</Label>
              <div className="relative mt-2">
                <Input
                  id="bmi-height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === "metric" ? "175" : "69"}
                  className="pr-12"
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-muted-foreground text-sm">
                    {unit === "metric" ? "cm" : "in"}
                  </span>
                </div>
              </div>
            </div>

            {/* Weight Input */}
            <div>
              <Label htmlFor="bmi-weight">Weight</Label>
              <div className="relative mt-2">
                <Input
                  id="bmi-weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === "metric" ? "70" : "154"}
                  className="pr-12"
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-muted-foreground text-sm">
                    {unit === "metric" ? "kg" : "lbs"}
                  </span>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <Button type="submit" className="w-full bg-gradient-primary hover-scale">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate BMI
            </Button>
          </form>

          {/* Right: Results */}
          <div className="flex flex-col items-center justify-center text-center bg-secondary/50 p-8 rounded-xl border border-border">
            {bmi === null ? (
              <div className="text-muted-foreground">
                <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Enter your details and click Calculate to see your BMI result</p>
              </div>
            ) : (
              <>
                <p className="text-sm font-medium text-muted-foreground">Your BMI Result</p>
                <p className="mt-2 text-6xl font-black text-gradient">{bmi}</p>
                <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${getBMICategory(bmi).bgColor} ${getBMICategory(bmi).color}`}>
                  <CheckCircle className="w-4 h-4" />
                  <span>{getBMICategory(bmi).text}</span>
                </div>

                {/* BMI Scale */}
                <div className="mt-6 w-full max-w-xs">
                  <p className="text-xs text-muted-foreground text-left mb-1">Underweight &lt;18.5</p>
                  <div className="relative h-2 w-full rounded-full bg-secondary mt-1">
                    <div className="absolute h-2 rounded-l-full bg-gradient-to-r from-blue-400 to-blue-500" style={{ width: "25%" }}></div>
                    <div className="absolute h-2 bg-green-500 left-[25%]" style={{ width: "25%" }}></div>
                    <div className="absolute h-2 bg-yellow-400 left-[50%]" style={{ width: "25%" }}></div>
                    <div className="absolute h-2 rounded-r-full bg-red-500 left-[75%]" style={{ width: "25%" }}></div>
                    <div
                      className="absolute top-1/2 -mt-2 w-4 h-4 rounded-full bg-background ring-2 ring-primary shadow-lg transition-all duration-300"
                      style={{ left: `calc(${getBMIPosition(bmi)}% - 8px)` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-muted-foreground">18.5</p>
                    <p className="text-xs text-muted-foreground">25</p>
                    <p className="text-xs text-muted-foreground">30</p>
                  </div>
                </div>


                <p className="mt-6 text-sm text-muted-foreground">
                  A healthy BMI range is between 18.5 and 24.9. Remember that BMI is a guide and doesn't account for muscle mass or body composition.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Nutrition Recommendations */}
        {bmi !== null && (
          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-gradient">Personalized Nutrition Plan</span>
            </h3>

            {/* Daily Targets */}
            <div className="glass-card p-6 rounded-xl mb-6">
              <h4 className="font-semibold mb-4 text-primary">Daily Nutritional Targets</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Calories</span>
                  <span className="font-semibold">{getNutritionRecommendations(bmi).calories} kcal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Protein</span>
                  <span className="font-semibold">{getNutritionRecommendations(bmi).protein}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Carbohydrates</span>
                  <span className="font-semibold">{getNutritionRecommendations(bmi).carbs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Fats</span>
                  <span className="font-semibold">{getNutritionRecommendations(bmi).fats}</span>
                </div>
              </div>
            </div>

            {/* Meal Suggestions */}
            <div className="glass-card p-6 rounded-xl col-span-full">
              <h4 className="font-semibold mb-4 text-primary">Recommended Meals</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {getNutritionRecommendations(bmi).meals.map((meal, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative h-32 rounded-lg overflow-hidden mb-2">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-xs text-center leading-tight">{meal.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Advice */}
            <div className="mt-6 bg-primary/10 border border-primary/20 rounded-xl p-6">
              <p className="text-sm leading-relaxed">
                <span className="font-semibold text-primary">💡 Expert Advice: </span>
                {getNutritionRecommendations(bmi).advice}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
