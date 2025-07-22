import { useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

interface ProgressBarProps {
  formData: {
    fullName: string;
    email: string;
    targetPosition: string;
    industry: string;
    education: string;
    experience: string;
    skills: string;
    languages: string;
    objective: string;
    style: string;
    includePhoto: boolean;
  };
  photoFile: File | null;
}

export default function ProgressBar({ formData, photoFile }: ProgressBarProps) {
  const { completionPercentage, completedSteps, totalSteps } = useMemo(() => {
    const requiredFields = [
      { name: "Nom complet", value: formData.fullName },
      { name: "Email", value: formData.email },
    ];

    const optionalFields = [
      { name: "Poste visé", value: formData.targetPosition },
      { name: "Secteur", value: formData.industry },
      { name: "Formation", value: formData.education },
      { name: "Expérience", value: formData.experience },
      { name: "Compétences", value: formData.skills },
      { name: "Langues", value: formData.languages },
      { name: "Objectif", value: formData.objective },
      { name: "Style", value: formData.style },
      { name: "Photo", value: formData.includePhoto ? (photoFile ? "included" : "") : "not-required" },
    ];

    const allFields = [...requiredFields, ...optionalFields];
    const completed = allFields.filter(field => {
      if (field.name === "Photo") {
        return field.value === "not-required" || field.value === "included";
      }
      return field.value && field.value.trim().length > 0;
    }).length;

    const percentage = Math.round((completed / allFields.length) * 100);

    return {
      completionPercentage: percentage,
      completedSteps: completed,
      totalSteps: allFields.length,
    };
  }, [formData, photoFile]);

  const getProgressColor = () => {
    if (completionPercentage >= 80) return "bg-green-500";
    if (completionPercentage >= 50) return "bg-yellow-500";
    return "bg-indigo-500";
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${completionPercentage === 100 ? 'bg-green-100 dark:bg-green-900' : 'bg-indigo-100 dark:bg-indigo-900'}`}>
            <CheckCircle2 className={`h-5 w-5 ${completionPercentage === 100 ? 'text-green-600 dark:text-green-400' : 'text-indigo-600 dark:text-indigo-400'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Progression du CV</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {completedSteps}/{totalSteps} sections complétées
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-2xl font-bold ${getProgressColor().replace('bg-', 'text-')}`}>
            {completionPercentage}%
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {completionPercentage === 100 ? "Prêt à générer!" : "En cours..."}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Progress 
          value={completionPercentage} 
          className="h-3 bg-slate-200 dark:bg-slate-700"
        />
        
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Début</span>
          <span className="text-center">
            {completionPercentage < 50 ? "Continuez..." : 
             completionPercentage < 80 ? "Presque fini!" : 
             completionPercentage < 100 ? "Plus que quelques détails" : 
             "Parfait! 🎉"}
          </span>
          <span>Terminé</span>
        </div>
      </div>

      {completionPercentage >= 30 && completionPercentage < 100 && (
        <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <p className="text-sm text-indigo-700 dark:text-indigo-300">
            💡 <strong>Conseil:</strong> Plus vous ajoutez d'informations, plus votre CV sera complet et attractif.
          </p>
        </div>
      )}
    </div>
  );
}