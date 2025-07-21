import { useState } from "react";
import CvForm from "@/components/cv-form";
import CvPreview from "@/components/cv-preview";
import CVForm from "@/components/CVForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FileText, Sparkles, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GeneratedCv } from "@shared/schema";

export default function Home() {
  const [generatedCv, setGeneratedCv] = useState<GeneratedCv | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [useNewForm, setUseNewForm] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-300">
      {/* Hero Header Section */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-indigo-100 dark:border-slate-700 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <img 
                src="/logo.png" 
                alt="Jobs-Insight Logo" 
                className="w-12 h-auto drop-shadow-md"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Jobs-Insight
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 transition-colors">Créez votre CV professionnel</p>
              </div>
            </div>

            {/* Toggle Form */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-200 dark:border-indigo-800 transition-colors">
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Générateur IA</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUseNewForm(!useNewForm)}
                className="flex items-center space-x-2"
              >
                {useNewForm ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                <span className="text-xs">{useNewForm ? 'FormData' : 'API'}</span>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-8">
            <img 
              src="/logo.png" 
              alt="Jobs-Insight Logo" 
              className="w-24 md:w-32 h-auto mb-6 drop-shadow-lg"
            />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Jobs-Insight
            </h2>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 transition-colors">
            Créez votre CV parfait en
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> quelques minutes</span>
          </h3>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto transition-colors">
            Générateur intelligent de CV avec design professionnel. Remplissez le formulaire et téléchargez votre CV en plusieurs formats.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {useNewForm ? (
          /* Nouveau formulaire avec FormData */
          <CVForm />
        ) : (
          /* Ancien formulaire avec API */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CvForm 
                onGenerated={setGeneratedCv} 
                isGenerating={isGenerating}
                setIsGenerating={setIsGenerating}
              />
            </div>
            <div className="lg:col-span-1">
              <CvPreview 
                generatedCv={generatedCv}
                isGenerating={isGenerating}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="p-1 bg-indigo-100 rounded-lg">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="font-semibold text-slate-800">CV Generator Pro</span>
            </div>
            <p className="text-slate-600 text-sm">
              © 2024 CV Generator Pro. Solution professionnelle pour créer des CV de qualité.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
