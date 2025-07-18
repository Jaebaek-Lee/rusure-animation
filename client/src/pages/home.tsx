import EyeTrackingCharacter from "@/components/EyeTrackingCharacter";
import BackgroundParticles from "@/components/BackgroundParticles";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 overflow-hidden">
      <BackgroundParticles />
      <CustomCursor />
      <EyeTrackingCharacter />
    </div>
  );
}
