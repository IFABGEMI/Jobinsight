import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Check, 
  Lightbulb,
  Loader2,
  FileType,
  Package,
  Eye,
  Sparkles,
  CheckCircle,
  Clock
} from "lucide-react";
import type { GeneratedCv } from "@shared/schema";

interface CvPreviewProps {
  generatedCv: GeneratedCv | null;
  isGenerating: boolean;
}

export default function CvPreview({ generatedCv, isGenerating }: CvPreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadZip = async () => {
    if (!generatedCv) return;

    setIsDownloading(true);
    try {
      const response = await fetch(`/api/download/${generatedCv.id}`);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CV_Package_${generatedCv.id}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="sticky top-28 space-y-6">
      {/* Status Card */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0 ring-1 ring-slate-200/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center space-x-2">
            <div className="p-1.5 bg-indigo-100 rounded-lg">
              <Eye className="h-4 w-4 text-indigo-600" />
            </div>
            <span>Aperçu & Téléchargement</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Generation in Progress */}
          {isGenerating && (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 border-indigo-200">
                  <Clock className="h-3 w-3 mr-1" />
                  Génération en cours
                </Badge>
                <p className="text-sm text-slate-600">
                  Création de votre CV professionnel...
                </p>
              </div>
            </div>
          )}

          {/* Generated CV Display */}
          {generatedCv && !isGenerating && (
            <div className="space-y-6">
              {/* Success Badge */}
              <div className="flex items-center justify-center">
                <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-2">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  CV généré avec succès !
                </Badge>
              </div>

              {/* Files Preview */}
              <div className="space-y-3">
                <h4 className="font-medium text-slate-700 flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>Fichiers générés</span>
                </h4>
                
                <div className="space-y-2">
                  {/* PDF File */}
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3">
                      <div className="p-1.5 bg-red-500 rounded text-white">
                        <FileType className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-800">PDF</p>
                        <p className="text-xs text-red-600">Format professionnel</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-red-700 border-red-300">
                      ✓
                    </Badge>
                  </div>

                  {/* DOCX File */}
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="p-1.5 bg-blue-500 rounded text-white">
                        <FileType className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-800">DOCX</p>
                        <p className="text-xs text-blue-600">Éditable</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-blue-700 border-blue-300">
                      ✓
                    </Badge>
                  </div>

                  {/* HTML File */}
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="p-1.5 bg-green-500 rounded text-white">
                        <FileType className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-800">HTML</p>
                        <p className="text-xs text-green-600">Web et email</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      ✓
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Summary Section */}
              <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                <h4 className="font-medium text-slate-800 mb-3 flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  <span>Résumé du CV généré</span>
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {generatedCv.summary}
                </p>
              </div>

              {/* Download Button */}
              <Button
                onClick={handleDownloadZip}
                disabled={isDownloading}
                size="lg"
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {isDownloading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Téléchargement...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Télécharger le package ZIP</span>
                  </div>
                )}
              </Button>
              
              <p className="text-center text-xs text-slate-500">
                Package complet avec CV en 3 formats
              </p>
            </div>
          )}

          {/* Empty State */}
          {!generatedCv && !isGenerating && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <FileText className="h-8 w-8 text-slate-400" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-600 font-medium">En attente de génération</p>
                <p className="text-sm text-slate-500">
                  Complétez le formulaire pour créer votre CV
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-indigo-800 flex items-center space-x-2">
            <div className="p-1.5 bg-indigo-200 rounded-lg">
              <Lightbulb className="h-4 w-4 text-indigo-700" />
            </div>
            <span>Conseils de pro</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <ul className="space-y-3 text-sm text-indigo-700">
            <li className="flex items-start space-x-3">
              <div className="mt-0.5">
                <Check className="h-4 w-4 text-indigo-600 flex-shrink-0" />
              </div>
              <span>Utilisez des <strong>verbes d'action</strong> pour décrire vos expériences</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-0.5">
                <Check className="h-4 w-4 text-indigo-600 flex-shrink-0" />
              </div>
              <span><strong>Quantifiez</strong> vos réalisations avec des chiffres précis</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-0.5">
                <Check className="h-4 w-4 text-indigo-600 flex-shrink-0" />
              </div>
              <span>Adaptez le <strong>style</strong> à votre secteur d'activité</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="mt-0.5">
                <Check className="h-4 w-4 text-indigo-600 flex-shrink-0" />
              </div>
              <span>Relisez et <strong>personnalisez</strong> selon l'offre visée</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
