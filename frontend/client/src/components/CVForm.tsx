import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ProgressBar from "./ProgressBar";
import { ThemeToggle } from "./ThemeToggle";
import { 
  User, 
  Mail,
  Briefcase,
  Building2,
  GraduationCap, 
  Trophy, 
  Zap, 
  Globe, 
  Target, 
  Palette,
  Sparkles,
  Loader2,
  ChevronRight,
  Camera,
  Upload,
  Download,
  FileText,
  Check,
  ImageIcon
} from "lucide-react";

interface CVFormData {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  summary: string;
  experience: string;
  skills: string;
  education: string;
  languages: string;
  industry: string;
  style: string;
  includePhoto: boolean;
}

export default function CVForm() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CVFormData>({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    summary: "",
    experience: "",
    skills: "",
    education: "",
    languages: "",
    industry: "",
    style: "sober",
    includePhoto: false,
  });

  const handleInputChange = (field: keyof CVFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        setPhotoFile(file);
        toast({
          title: "Photo sélectionnée",
          description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
        });
      } else {
        toast({
          title: "Format non supporté",
          description: "Veuillez sélectionner un fichier JPG ou PNG.",
          variant: "destructive",
        });
        event.target.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Champs requis manquants",
        description: "Veuillez remplir le nom, prénom et email.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setDownloadUrl(null);

    try {
      const form = new FormData();
      
      // Ajouter les données du formulaire
      form.append('fullName', `${formData.firstName} ${formData.lastName}`);
      form.append('email', formData.email);
      form.append('targetPosition', formData.jobTitle);
      form.append('industry', formData.industry);
      form.append('education', formData.education);
      form.append('experience', formData.experience);
      form.append('skills', formData.skills);
      form.append('languages', formData.languages);
      form.append('objective', formData.summary);
      form.append('style', formData.style);
      form.append('includePhoto', formData.includePhoto.toString());

      // Ajouter la photo si elle est sélectionnée et la case cochée
      if (formData.includePhoto && photoFile) {
        form.append('photo', photoFile);
      }

      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        body: form,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la génération');
      }

      const result = await response.json();
      
      // Déclencher le téléchargement du ZIP
      const downloadResponse = await fetch(`http://localhost:5000/api/download/${result.id}`);
      if (!downloadResponse.ok) {
        throw new Error('Erreur lors du téléchargement');
      }

      const blob = await downloadResponse.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);

      // Téléchargement automatique
      const a = document.createElement('a');
      a.href = url;
      a.download = `CV_${formData.firstName}_${formData.lastName}_Package.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast({
        title: "🎉 CV généré avec succès !",
        description: "Votre CV a été créé et téléchargé automatiquement.",
      });

    } catch (error) {
      console.error('Erreur génération CV:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de la génération du CV.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const styleOptions = [
    { value: "sober", label: "Sobre", description: "Élégant et professionnel", color: "from-slate-500 to-slate-600" },
    { value: "design", label: "Design", description: "Moderne et créatif", color: "from-indigo-500 to-blue-600" },
    { value: "startup", label: "Startup", description: "Dynamique et innovant", color: "from-green-500 to-emerald-600" },
    { value: "academic", label: "Académique", description: "Structuré et formel", color: "from-purple-500 to-violet-600" },
    { value: "creative", label: "Créatif", description: "Artistique et original", color: "from-pink-500 to-rose-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 transition-all-smooth">
      <div className="max-w-6xl mx-auto">
        

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="flex flex-col items-center justify-center mb-6">
            <img 
              src="/logo.png" 
              alt="Jobs-Insight Logo" 
              className="w-32 h-auto mb-4 drop-shadow-lg transition-all-smooth hover:scale-105"
            />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Jobs-Insight
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg transition-colors">
            Créez votre CV parfait avec upload de photo et téléchargement ZIP
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Bar Sidebar */}
          <div className="lg:col-span-1 animate-slide-in-right">
            <div className="sticky top-8">
              <ProgressBar formData={formData} photoFile={photoFile} />
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2 animate-fade-in-up">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-xl border-0 ring-1 ring-slate-200/50 dark:ring-slate-700/50 transition-all-smooth">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-3 transition-colors">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg animate-pulse-glow">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <span>Informations pour votre CV</span>
                </CardTitle>
              </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Informations personnelles */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <User className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Informations personnelles</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-slate-700 font-medium flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Prénom *</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="ex: Jean"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="h-12 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastName" className="text-slate-700 font-medium flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Nom *</span>
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="ex: Dupont"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="h-12 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-slate-700 font-medium flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email *</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ex: jean.dupont@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="jobTitle" className="text-slate-700 font-medium flex items-center space-x-2">
                      <Briefcase className="h-4 w-4" />
                      <span>Titre professionnel</span>
                    </Label>
                    <Input
                      id="jobTitle"
                      placeholder="ex: Développeur Full Stack Senior"
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      className="h-12 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="industry" className="text-slate-700 font-medium flex items-center space-x-2">
                      <Building2 className="h-4 w-4" />
                      <span>Secteur d'activité</span>
                    </Label>
                    <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                      <SelectTrigger className="h-12 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl mt-2">
                        <SelectValue placeholder="Sélectionnez votre secteur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">🚀 Technologie & Innovation</SelectItem>
                        <SelectItem value="finance">💰 Finance & Banque</SelectItem>
                        <SelectItem value="healthcare">🏥 Santé & Médical</SelectItem>
                        <SelectItem value="education">🎓 Éducation & Formation</SelectItem>
                        <SelectItem value="marketing">📈 Marketing & Communication</SelectItem>
                        <SelectItem value="retail">🛍️ Commerce & Retail</SelectItem>
                        <SelectItem value="consulting">💼 Conseil & Stratégie</SelectItem>
                        <SelectItem value="other">✨ Autre secteur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Photo de profil */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Camera className="h-5 w-5 text-cyan-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Photo de profil</h3>
                  <span className="text-sm text-slate-500">Optionnel</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="includePhoto"
                      checked={formData.includePhoto}
                      onCheckedChange={(checked) => {
                        handleInputChange('includePhoto', checked as boolean);
                        if (!checked) {
                          setPhotoFile(null);
                        }
                      }}
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <Label htmlFor="includePhoto" className="text-slate-700 font-medium cursor-pointer">
                        Inclure une photo sur le CV
                      </Label>
                      <p className="text-sm text-slate-500">
                        Ajoutez une photo professionnelle à votre CV
                      </p>
                    </div>
                  </div>

                  {formData.includePhoto && (
                    <div className="mt-4 p-4 bg-cyan-50 rounded-xl border border-cyan-200 transition-all duration-300">
                      <div className="space-y-4">
                        <Label className="text-slate-700 font-medium flex items-center space-x-2">
                          <Upload className="h-4 w-4 text-cyan-600" />
                          <span>Sélectionner une photo (JPG ou PNG)</span>
                        </Label>
                        
                        <Input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="h-12 border-cyan-300 focus:border-cyan-500 focus:ring-cyan-500 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-cyan-100 file:text-cyan-700 hover:file:bg-cyan-200"
                        />

                        {photoFile && (
                          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-cyan-200">
                            <div className="p-2 bg-cyan-100 rounded">
                              <Check className="h-4 w-4 text-cyan-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-700">{photoFile.name}</p>
                              <p className="text-xs text-slate-500">
                                {(photoFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Résumé professionnel */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Résumé professionnel</h3>
                </div>
                
                <div>
                  <Label htmlFor="summary" className="text-slate-700 font-medium">Décrivez votre profil</Label>
                  <Textarea
                    id="summary"
                    placeholder="ex: Développeur passionné avec 3 ans d'expérience, spécialisé dans les technologies web modernes..."
                    rows={4}
                    value={formData.summary}
                    onChange={(e) => handleInputChange('summary', e.target.value)}
                    className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl resize-none mt-2"
                  />
                </div>
              </div>

              {/* Expériences */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Trophy className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Expériences professionnelles</h3>
                </div>
                
                <div>
                  <Label htmlFor="experience" className="text-slate-700 font-medium">Vos expériences</Label>
                  <Textarea
                    id="experience"
                    placeholder="ex:&#10;• Développeur Senior - TechCorp (2022-Présent)&#10;  - Développement d'applications web avec React&#10;  - Encadrement d'équipe de 3 développeurs"
                    rows={6}
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl resize-none mt-2"
                  />
                </div>
              </div>

              {/* Compétences et Formation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Zap className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">Compétences</h3>
                  </div>
                  
                  <div>
                    <Label htmlFor="skills" className="text-slate-700 font-medium">Technologies maîtrisées</Label>
                    <Textarea
                      id="skills"
                      placeholder="ex: JavaScript, React, Node.js, Python, Docker..."
                      rows={5}
                      value={formData.skills}
                      onChange={(e) => handleInputChange('skills', e.target.value)}
                      className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl resize-none mt-2"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">Formation</h3>
                  </div>
                  
                  <div>
                    <Label htmlFor="education" className="text-slate-700 font-medium">Diplômes et formations</Label>
                    <Textarea
                      id="education"
                      placeholder="ex: Master Informatique - Université de Paris (2020-2022)"
                      rows={5}
                      value={formData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl resize-none mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="languages" className="text-slate-700 font-medium flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>Langues</span>
                    </Label>
                    <Input
                      id="languages"
                      placeholder="ex: Français (natif), Anglais (courant)"
                      value={formData.languages}
                      onChange={(e) => handleInputChange('languages', e.target.value)}
                      className="h-12 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Style de rendu */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Palette className="h-5 w-5 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Style de rendu</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {styleOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`relative cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                        formData.style === option.value
                          ? 'ring-2 ring-indigo-500 ring-offset-2'
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => handleInputChange('style', option.value)}
                    >
                      <div className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                        formData.style === option.value
                          ? 'border-indigo-300 bg-indigo-50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}>
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center mb-4 shadow-lg`}>
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-slate-800 mb-2">{option.label}</h4>
                        <p className="text-sm text-slate-600">{option.description}</p>
                        {formData.style === option.value && (
                          <div className="absolute top-3 right-3">
                            <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bouton de génération */}
              <div className="pt-8 border-t border-slate-200">
                <Button
                  type="submit"
                  disabled={isGenerating}
                  size="lg"
                  className="w-full h-16 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-3">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Génération en cours...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Sparkles className="h-6 w-6" />
                      <span>Générer le CV</span>
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  )}
                </Button>
                
                {!isGenerating && (
                  <p className="text-center text-sm text-slate-500 mt-4">
                    Votre CV sera généré et téléchargé automatiquement en format ZIP
                  </p>
                )}

                {downloadUrl && (
                  <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Download className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-green-800">CV généré avec succès !</p>
                        <p className="text-sm text-green-600">Le téléchargement a commencé automatiquement</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}