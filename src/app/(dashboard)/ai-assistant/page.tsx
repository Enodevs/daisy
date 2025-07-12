@@ .. @@
-import { AIAssistantInterface } from "~/components/ui/ai-assistant-interface";
import { AIAssistantInterfaceV2 } from "~/components/ui/ai-assistant-interface-v2";

 export default function AIAssistantPage() {
   return (
     <div className="h-[calc(100vh-4rem)]">
      <AIAssistantInterfaceV2 />
+      <AIAssistantInterfaceEnhanced />
     </div>
   );
 }