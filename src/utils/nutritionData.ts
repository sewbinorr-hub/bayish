export interface NutritionPlan {
    calories: string;
    protein: string;
    carbs: string;
    fats: string;
    meals: { name: string; image: string }[];
    advice: string;
}

export const getNutritionRecommendations = (bmi: number): NutritionPlan => {
    if (bmi < 18.5) {
        return {
            calories: "2,500-3,000",
            protein: "1.6-2.0g per kg body weight",
            carbs: "50-60% of daily calories",
            fats: "25-30% of daily calories",
            meals: [
                { name: "Protein-rich breakfast with whole grains", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop" },
                { name: "Calorie-dense snacks (nuts, dried fruits)", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=300&fit=crop" },
                { name: "Lean meats with complex carbs for lunch", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop" },
                { name: "Healthy fats from avocados and olive oil", image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&h=300&fit=crop" },
                { name: "Protein shake post-workout", image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop" }
            ],
            advice: "Focus on nutrient-dense, calorie-rich foods to gain weight healthily. Eat frequent meals and include strength training."
        };
    } else if (bmi < 25) {
        return {
            calories: "2,000-2,500",
            protein: "1.2-1.6g per kg body weight",
            carbs: "45-55% of daily calories",
            fats: "20-30% of daily calories",
            meals: [
                { name: "Balanced breakfast with protein and fiber", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop" },
                { name: "Colorful salads with lean protein", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
                { name: "Whole grains and vegetables", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop" },
                { name: "Healthy snacks like fruits and yogurt", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop" },
                { name: "Lean protein with steamed vegetables", image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=300&fit=crop" }
            ],
            advice: "Maintain your healthy weight with balanced nutrition and regular exercise. Focus on whole foods and portion control."
        };
    } else if (bmi < 30) {
        return {
            calories: "1,500-2,000",
            protein: "1.6-2.0g per kg body weight",
            carbs: "40-45% of daily calories",
            fats: "20-25% of daily calories",
            meals: [
                { name: "High-protein, low-carb breakfast", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop" },
                { name: "Vegetable-heavy meals with lean protein", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop" },
                { name: "Portion-controlled whole grains", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop" },
                { name: "Low-calorie, high-volume snacks", image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=300&fit=crop" },
                { name: "Grilled fish or chicken with vegetables", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop" }
            ],
            advice: "Create a moderate calorie deficit through portion control and increased physical activity. Avoid processed foods and sugary drinks."
        };
    } else {
        return {
            calories: "1,200-1,800",
            protein: "1.8-2.2g per kg body weight",
            carbs: "35-40% of daily calories",
            fats: "20-25% of daily calories",
            meals: [
                { name: "Protein-rich breakfast (eggs, Greek yogurt)", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop" },
                { name: "Large portions of non-starchy vegetables", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop" },
                { name: "Lean proteins (chicken breast, fish, tofu)", image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop" },
                { name: "Limited whole grains, focus on vegetables", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
                { name: "Meal prep for portion control", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop" }
            ],
            advice: "Consult with a healthcare provider for a personalized weight loss plan. Focus on sustainable lifestyle changes, not quick fixes."
        };
    }
};
