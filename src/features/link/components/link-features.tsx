import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FEATURES } from "@/constants/link.constant";

export function LinkFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {FEATURES.map(({ icon: Icon, title, description }) => (
        <Card key={title} className="text-center bg-white border-[#5C636E]/20">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 bg-[#F96D00]/90">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-[#393E46] font-semibold">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#5C636E] text-sm">{description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
