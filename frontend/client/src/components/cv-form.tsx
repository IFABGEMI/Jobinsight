import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertCvRequestSchema, type InsertCvRequest, type GeneratedCv } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  Image as ImageIcon
} from "lucide-react";

interface CvFormProps {
  onGenerated: (cv: GeneratedCv) => void;
  isGenerating: boolean;
  setIsGenerating: (loading: boolean) => void;
}

export default function CvForm({ onGenerated, isGenerating, setIsGenerating }: CvFormProps) {
  const { toast } = useToast();
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const form = useForm<InsertCvRequest>({
    resolver: zodResolver(insertCvRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      targetPosition: "",
      industry: "",
      education: "",
      experience: "",
      skills: "",
      languages: "",
      objective: "",
      style: "sober",
      includePhoto: false,
      photoFileName: "",
    },
  });

  const generateCvMutation = useMutation({
    mutationFn: async (data: InsertCvRequest) => {
      const response = await apiRequest("POST", "/api/generate", data);
      return response.json() as Promise<GeneratedCv>;
    },
    onSuccess: (data) => {
      onGenerated(data);
      setIsGenerating(false);
      toast({
        title: "🎉 CV généré avec succès !",
        description: "Votre CV professionnel est maintenant prêt à être téléchargé.",
      });
    },
    onError: (error) => {
      setIsGenerating(false);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération du CV. Veuillez réessayer.",
        variant: "destructive",
      });
      console.error("Error generating CV:", error);
    },
  });

  const onSubmit = (data: InsertCvRequest) => {
    // Include photo file name if photo is selected
    if (photoFile && data.includePhoto) {
      data.photoFileName = photoFile.name;
    }
    setIsGenerating(true);
    generateCvMutation.mutate(data);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        setPhotoFile(file);
        form.setValue('photoFileName', file.name);
      } else {
        toast({
          title: "Format de fichier non supporté",
          description: "Veuillez sélectionner un fichier JPG ou PNG.",
          variant: "destructive",
        });
        event.target.value = '';
      }
    }
  };

  // Style options with modern icons and descriptions
  const styleOptions = [
    { 
      value: "sober", 
      label: "Sobre", 
      description: "Élégant et professionnel",
      color: "from-slate-500 to-slate-600"
    },
    { 
      value: "design", 
      label: "Design", 
      description: "Moderne et créatif",
      color: "from-indigo-500 to-blue-600"
    },
    { 
      value: "startup", 
      label: "Startup", 
      description: "Dynamique et innovant",
      color: "from-green-500 to-emerald-600"
    },
    { 
      value: "academic", 
      label: "Académique", 
      description: "Structuré et formel",
      color: "from-purple-500 to-violet-600"
    },
    { 
      value: "creative", 
      label: "Créatif", 
      description: "Artistique et original",
      color: "from-pink-500 to-rose-600"
    },
  ];

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 ring-1 ring-slate-200/50">
      <CardHeader className="pb-8">
        <CardTitle className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
            <User className="h-6 w-6 text-white" />
          </div>
          <span>Informations pour votre CV</span>
        </CardTitle>
        <p className="text-slate-600 mt-2">
          Remplissez tous les champs pour générer un CV professionnel adapté à vos besoins
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Section 1: Informations personnelles */}
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg transition-colors">
                  <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 transition-colors">Informations personnelles</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Nom complet *</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="ex: Jean Dupont" 
                          className="h-12 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Adresse e-mail *</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="ex: jean.dupont@email.com" 
                          className="h-12 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetPosition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium flex items-center space-x-2">
                        <Briefcase className="h-4 w-4" />
                        <span>Poste visé</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="ex: Développeur Full Stack Senior" 
                          className="h-12 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium flex items-center space-x-2">
                        <Building2 className="h-4 w-4" />
                        <span>Secteur d'activité</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger className="h-12 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl">
                            <SelectValue placeholder="Sélectionnez votre secteur" />
                          </SelectTrigger>
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Section 2: Photo de profil */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Camera className="h-5 w-5 text-cyan-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Photo de profil</h3>
                <span className="text-sm text-slate-500">Optionnel</span>
              </div>

              <div className="space-y-4">
                {/* Checkbox pour inclure une photo */}
                <FormField
                  control={form.control}
                  name="includePhoto"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            if (!checked) {
                              setPhotoFile(null);
                              form.setValue('photoFileName', '');
                            }
                          }}
                          className="mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-slate-700 font-medium cursor-pointer">
                          Inclure une photo sur le CV
                        </FormLabel>
                        <p className="text-sm text-slate-500">
                          Ajoutez une photo professionnelle à votre CV
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Champ de fichier conditionnel */}
                {form.watch('includePhoto') && (
                  <div className="mt-4 p-4 bg-cyan-50 rounded-xl border border-cyan-200 transition-all duration-300 ease-in-out">
                    <div className="space-y-4">
                      <FormLabel className="text-slate-700 font-medium flex items-center space-x-2">
                        <Upload className="h-4 w-4 text-cyan-600" />
                        <span>Sélectionner une photo</span>
                      </FormLabel>
                      
                      <div className="relative">
                        <Input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="h-12 border-cyan-300 focus:border-cyan-500 focus:ring-cyan-500 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-cyan-100 file:text-cyan-700 hover:file:bg-cyan-200 file:cursor-pointer"
                        />
                      </div>

                      {photoFile && (
                        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-cyan-200">
                          <div className="p-2 bg-cyan-100 rounded">
                            <ImageIcon className="h-4 w-4 text-cyan-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-700">{photoFile.name}</p>
                            <p className="text-xs text-slate-500">
                              {(photoFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setPhotoFile(null);
                              form.setValue('photoFileName', '');
                              const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                              if (fileInput) fileInput.value = '';
                            }}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Supprimer
                          </Button>
                        </div>
                      )}

                      <div className="text-xs text-slate-500 space-y-1">
                        <p>• Formats acceptés : JPG, JPEG, PNG</p>
                        <p>• Taille recommandée : photo de type portrait professionnel</p>
                        <p>• La photo sera intégrée automatiquement selon le style choisi</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Parcours académique */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Parcours académique</h3>
              </div>
              
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Formation et diplômes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="ex:&#10;• Master en Informatique - Université de Paris (2020-2022)&#10;• Licence en Informatique - Université de Lyon (2017-2020)&#10;• Baccalauréat Scientifique - Mention Bien (2017)"
                        rows={5}
                        className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl resize-none"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <p className="text-sm text-slate-500">Listez vos diplômes du plus récent au plus ancien</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Section 3: Expérience professionnelle */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Trophy className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Expérience professionnelle</h3>
              </div>
              
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Postes et responsabilités</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="ex:&#10;• Développeur Senior - TechCorp (2022-Présent)&#10;  - Développement d'applications web avec React et Node.js&#10;  - Encadrement d'une équipe de 3 développeurs juniors&#10;  - Amélioration des performances des applications de 40%&#10;&#10;• Développeur Junior - StartupXYZ (2020-2022)&#10;  - Création d'interfaces utilisateur réactives&#10;  - Intégration d'APIs REST et GraphQL"
                        rows={8}
                        className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl resize-none"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <p className="text-sm text-slate-500">Décrivez vos expériences avec des résultats quantifiés</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Section 4: Compétences */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Compétences techniques</h3>
              </div>
              
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">Technologies et outils maîtrisés</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="ex:&#10;• Langages: JavaScript, TypeScript, Python, Java&#10;• Frontend: React, Vue.js, Angular, Tailwind CSS&#10;• Backend: Node.js, Express, Django, Spring Boot&#10;• Bases de données: PostgreSQL, MongoDB, Redis&#10;• DevOps: Docker, AWS, Git, CI/CD&#10;• Outils: Figma, Jira, VS Code"
                        rows={6}
                        className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl resize-none"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <p className="text-sm text-slate-500">Organisez vos compétences par catégorie</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Section 5: Langues et objectif */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Globe className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Langues</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="languages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Langues parlées</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="ex: Français (natif), Anglais (courant), Espagnol (intermédiaire)" 
                          className="h-12 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl"
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Target className="h-5 w-5 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Objectif</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="objective"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Objectif professionnel</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="ex: Développeur passionné avec 3 ans d'expérience, je cherche à rejoindre une équipe dynamique pour contribuer au développement d'applications web innovantes."
                          rows={4}
                          className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl resize-none"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Section 6: Style de rendu */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Palette className="h-5 w-5 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Style de rendu</h3>
                <span className="text-sm text-slate-500">Choisissez le style qui correspond à votre secteur</span>
              </div>
              
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {styleOptions.map((option) => (
                          <div
                            key={option.value}
                            className={`relative cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                              field.value === option.value
                                ? 'ring-2 ring-indigo-500 ring-offset-2'
                                : 'hover:shadow-lg'
                            }`}
                            onClick={() => field.onChange(option.value)}
                          >
                            <div className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                              field.value === option.value
                                ? 'border-indigo-300 bg-indigo-50'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}>
                              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center mb-4 shadow-lg`}>
                                <Sparkles className="h-6 w-6 text-white" />
                              </div>
                              <h4 className="font-semibold text-slate-800 mb-2">{option.label}</h4>
                              <p className="text-sm text-slate-600">{option.description}</p>
                              {field.value === option.value && (
                                <div className="absolute top-3 right-3">
                                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                                    <ChevronRight className="h-4 w-4 text-white" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-8 border-t border-slate-200">
              <Button
                type="submit"
                disabled={isGenerating}
                size="lg"
                className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
              >
                {isGenerating ? (
                  <div className="flex items-center space-x-3">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Génération en cours...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Sparkles className="h-6 w-6" />
                    <span>Générer mon CV professionnel</span>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                )}
              </Button>
              
              {!isGenerating && (
                <p className="text-center text-sm text-slate-500 mt-4">
                  Votre CV sera généré en PDF, DOCX et HTML dans un package ZIP
                </p>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}