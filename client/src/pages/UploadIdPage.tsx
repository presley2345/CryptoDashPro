import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { storage, BUCKET_ID } from '@/lib/appwrite';
import { ArrowLeft, Upload, CloudUpload, Loader2 } from 'lucide-react';

export function UploadIdPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);

  const handleFileSelect = (type: 'front' | 'back', file: File | null) => {
    if (type === 'front') {
      setFrontFile(file);
    } else {
      setBackFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!documentType || !frontFile || !backFile) {
      toast({
        title: "Missing information",
        description: "Please select document type and upload both front and back images.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      // Upload files to Appwrite Storage
      const frontUpload = await storage.createFile(BUCKET_ID, 'unique()', frontFile);
      const backUpload = await storage.createFile(BUCKET_ID, 'unique()', backFile);

      // Store document information in database
      // This would be implemented with actual database calls
      
      toast({
        title: "Documents uploaded successfully",
        description: "Your identification documents have been submitted for verification.",
        variant: "default"
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "An error occurred while uploading your documents.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const FileUploadArea = ({ 
    type, 
    file, 
    onFileSelect 
  }: { 
    type: 'front' | 'back';
    file: File | null;
    onFileSelect: (file: File | null) => void;
  }) => (
    <div>
      <Label className="text-soft-gray mb-2 block">
        {type === 'front' ? 'Front Page of Document' : 'Back Page of Document'}
      </Label>
      <div className="border-2 border-dashed border-border-dark rounded-lg p-8 text-center">
        <CloudUpload className="w-12 h-12 text-slate-blue mx-auto mb-2" />
        <p className="text-soft-gray mb-2">
          {file ? file.name : `Click to upload ${type} page`}
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
          className="hidden"
          id={`${type}-upload`}
        />
        <Button
          type="button"
          onClick={() => document.getElementById(`${type}-upload`)?.click()}
          className="bg-slate-blue hover:bg-slate-blue/80 text-white"
        >
          Choose File
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-deep-charcoal">
      <nav className="bg-dark-navy border-b border-border-dark px-4 py-3">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="text-soft-gray hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-xl font-bold text-white">Upload Identification</h1>
          <div></div>
        </div>
      </nav>

      <div className="p-4 max-w-2xl mx-auto">
        <Card className="bg-dark-navy border-border-dark">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Verify Your Identity
            </CardTitle>
            <p className="text-soft-gray">Please upload a clear photo of your government-issued ID</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-soft-gray">Document Type</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger className="bg-deep-charcoal border-border-dark text-white focus:border-slate-blue mt-1">
                    <SelectValue placeholder="Select Document Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-navy border-border-dark">
                    <SelectItem value="passport" className="text-white hover:bg-slate-blue/20">
                      Passport
                    </SelectItem>
                    <SelectItem value="drivers_license" className="text-white hover:bg-slate-blue/20">
                      Driver's License
                    </SelectItem>
                    <SelectItem value="national_id" className="text-white hover:bg-slate-blue/20">
                      National ID Card
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <FileUploadArea 
                type="front" 
                file={frontFile} 
                onFileSelect={(file) => handleFileSelect('front', file)} 
              />

              <FileUploadArea 
                type="back" 
                file={backFile} 
                onFileSelect={(file) => handleFileSelect('back', file)} 
              />

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full gradient-button text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying Account...
                  </>
                ) : (
                  'Verify Account'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
