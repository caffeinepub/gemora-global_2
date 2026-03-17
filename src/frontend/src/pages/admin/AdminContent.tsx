import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../../components/AdminLayout";
import { useActor } from "../../hooks/useActor";

const CONTENT_KEYS = [
  { key: "hero_headline", label: "Hero Headline", multiline: false },
  { key: "hero_subtext", label: "Hero Subtext", multiline: false },
  { key: "about_intro", label: "About Company Intro", multiline: true },
  {
    key: "whatsapp_number",
    label: "WhatsApp Number (with country code)",
    multiline: false,
  },
];

function ContentField({
  contentKey,
  label,
  multiline,
}: { contentKey: string; label: string; multiline: boolean }) {
  const { actor } = useActor();
  const [value, setValue] = useState("");

  const { data } = useQuery({
    queryKey: ["content", contentKey],
    queryFn: () => actor!.getContent(contentKey),
    enabled: !!actor,
  });

  useEffect(() => {
    if (data !== undefined && data !== null) setValue(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: () => actor!.setContent(contentKey, value),
    onSuccess: () => toast.success(`${label} saved`),
    onError: () => toast.error("Failed to save"),
  });

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <Label>{label}</Label>
      {multiline ? (
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
        />
      ) : (
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
      )}
      <Button
        size="sm"
        className="bg-primary text-primary-foreground"
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}

export default function AdminContent() {
  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl font-bold mb-6">Content Editor</h1>
      <div className="space-y-4 max-w-2xl">
        {CONTENT_KEYS.map(({ key, label, multiline }) => (
          <ContentField
            key={key}
            contentKey={key}
            label={label}
            multiline={multiline}
          />
        ))}
      </div>
    </AdminLayout>
  );
}
