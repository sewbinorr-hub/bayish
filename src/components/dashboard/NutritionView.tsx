import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, Utensils } from "lucide-react";
import { getNutritionRecommendations } from "@/utils/nutritionData";

interface Nutrition {
  id: string;
  title: string;
  description: string;
  protein: number;
  vitamins: string;
  calories: number;
  carbs: number;
  fats: number;
  notes: string;
  created_at: string;
}

interface NutritionViewProps {
  bmi?: number | null;
}

export const NutritionView = ({ bmi }: NutritionViewProps) => {
  const [nutritionPlans, setNutritionPlans] = useState<Nutrition[]>([]);

  useEffect(() => {
    fetchNutrition();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('nutrition-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'nutrition'
        },
        () => {
          fetchNutrition();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNutrition = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase
      .from("nutrition")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (data) {
      setNutritionPlans(data);
    }
  };

  const bmiPlan = bmi ? getNutritionRecommendations(bmi) : null;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Apple className="w-5 h-5 text-primary" />
          My Nutrition Plans
        </CardTitle>
        <CardDescription>View your personalized nutrition plans</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* BMI Recommended Plan */}
        {bmiPlan && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 animate-fade-in">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-primary">
              <Utensils className="w-5 h-5" />
              Recommended Plan for Your BMI ({bmi})
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-background/80 p-3 rounded-lg border border-border/50">
                <span className="text-xs text-muted-foreground block mb-1">Calories</span>
                <span className="font-semibold text-sm">{bmiPlan.calories}</span>
              </div>
              <div className="bg-background/80 p-3 rounded-lg border border-border/50">
                <span className="text-xs text-muted-foreground block mb-1">Protein</span>
                <span className="font-semibold text-sm">{bmiPlan.protein}</span>
              </div>
              <div className="bg-background/80 p-3 rounded-lg border border-border/50">
                <span className="text-xs text-muted-foreground block mb-1">Carbs</span>
                <span className="font-semibold text-sm">{bmiPlan.carbs}</span>
              </div>
              <div className="bg-background/80 p-3 rounded-lg border border-border/50">
                <span className="text-xs text-muted-foreground block mb-1">Fats</span>
                <span className="font-semibold text-sm">{bmiPlan.fats}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">Suggested Meals</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {bmiPlan.meals.slice(0, 3).map((meal, idx) => (
                    <div key={idx} className="group relative overflow-hidden rounded-lg aspect-video">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-end p-2">
                        <p className="text-xs text-white font-medium line-clamp-2">{meal.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background/50 p-3 rounded-lg text-sm border border-border/50">
                <span className="font-medium text-primary">Tip: </span>
                {bmiPlan.advice}
              </div>
            </div>
          </div>
        )}

        {/* Existing Plans */}
        {nutritionPlans.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Assigned Plans</h3>
            {nutritionPlans.map((plan) => (
              <div
                key={plan.id}
                className="p-4 bg-secondary/30 rounded-lg border border-border hover:border-primary/30 transition-colors"
              >
                <h4 className="font-semibold text-lg mb-2">{plan.title}</h4>
                {plan.description && (
                  <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                )}

                <div className="grid grid-cols-2 gap-3 mb-3">
                  {plan.calories && (
                    <div className="bg-background/50 p-2 rounded">
                      <span className="text-xs text-muted-foreground">Calories</span>
                      <p className="font-semibold">{plan.calories} kcal</p>
                    </div>
                  )}
                  {plan.protein && (
                    <div className="bg-background/50 p-2 rounded">
                      <span className="text-xs text-muted-foreground">Protein</span>
                      <p className="font-semibold">{plan.protein}g</p>
                    </div>
                  )}
                  {plan.carbs && (
                    <div className="bg-background/50 p-2 rounded">
                      <span className="text-xs text-muted-foreground">Carbs</span>
                      <p className="font-semibold">{plan.carbs}g</p>
                    </div>
                  )}
                  {plan.fats && (
                    <div className="bg-background/50 p-2 rounded">
                      <span className="text-xs text-muted-foreground">Fats</span>
                      <p className="font-semibold">{plan.fats}g</p>
                    </div>
                  )}
                </div>

                {plan.vitamins && (
                  <div className="mb-2">
                    <span className="text-xs text-muted-foreground">Vitamins & Supplements:</span>
                    <p className="text-sm">{plan.vitamins}</p>
                  </div>
                )}

                {plan.notes && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">Notes:</span>
                    <p className="text-sm mt-1">{plan.notes}</p>
                  </div>
                )}

                <p className="text-xs text-muted-foreground mt-3">
                  Created: {new Date(plan.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {nutritionPlans.length === 0 && !bmi && (
          <p className="text-muted-foreground text-center py-8">
            Calculate your BMI above to get a personalized plan, or wait for your coach to assign one.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
