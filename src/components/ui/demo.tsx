import { AnimatedAIChat } from "~/components/ui/animated-ai-chat";

const suggestions = [
  "Clone a Screenshot",
  "Import from Figma",
  "Upload a Project",
  "Landing Page",
  "Sign Up Form",
];

export function Demo() {
  return (
    <div className="flex w-screen overflow-x-hidden">
      <AnimatedAIChat />
    </div>
  );
};
