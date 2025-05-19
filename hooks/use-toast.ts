import { toast } from "@/components/ui/use-toast";

export function useToast() {
  return {
    toast,
    dismiss: toast.dismiss,
  };
}